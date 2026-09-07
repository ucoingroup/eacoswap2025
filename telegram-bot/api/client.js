/**
 * client.js - Backend API client for eacoswap-pro
 * Communicates with the existing backend service
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000/api';

/**
 * Make an HTTP request to the backend
 * @param {string} path - API path (without base URL)
 * @param {Object} options - Request options
 * @returns {Promise<Object>} Response data in { success, data } format
 */
function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path.replace(/^\//, ''), BACKEND_URL);
    const method = (options.method || 'GET').toUpperCase();
    const data = options.body ? JSON.stringify(options.body) : null;

    const reqOptions = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'EACO-Telegram-Bot/1.0',
        ...(options.headers || {})
      },
      timeout: options.timeout || 10000
    };

    if (data) {
      reqOptions.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const client = url.protocol === 'https:' ? https : http;

    const req = client.request(reqOptions, (res) => {
      let responseData = '';

      res.on('data', chunk => { responseData += chunk; });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            data: parsed.data || parsed,
            error: parsed.error || null
          });
        } catch {
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            data: responseData,
            error: null
          });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[API] Request failed: ${err.message}`);
      reject({
        success: false,
        statusCode: 0,
        data: null,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        success: false,
        statusCode: 0,
        data: null,
        error: 'Request timeout'
      });
    });

    if (data) req.write(data);
    req.end();
  });
}

// =========================
// API Endpoint Wrappers
// =========================

/**
 * Get token price
 * @param {string} symbol - Token symbol (SOL, EACO, USDC, etc.)
 * @returns {Promise<Object>}
 */
async function getTokenPrice(symbol) {
  try {
    return await request(`/prices/${symbol.toUpperCase()}`);
  } catch (err) {
    console.error(`[API] getTokenPrice(${symbol}) failed:`, err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to fetch price' };
  }
}

/**
 * Get all token prices
 * @returns {Promise<Object>}
 */
async function getAllPrices() {
  try {
    return await request('/prices');
  } catch (err) {
    console.error('[API] getAllPrices failed:', err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to fetch prices' };
  }
}

/**
 * Get swap quote
 * @param {string} fromToken - Source token symbol
 * @param {string} toToken - Target token symbol
 * @param {number} amount - Amount to swap
 * @returns {Promise<Object>}
 */
async function getSwapQuote(fromToken, toToken, amount) {
  try {
    return await request(`/swap/quote?from=${fromToken}&to=${toToken}&amount=${amount}`);
  } catch (err) {
    console.error('[API] getSwapQuote failed:', err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to get quote' };
  }
}

/**
 * Execute swap (requires wallet signature in real impl)
 * @param {Object} swapData - Swap parameters
 * @returns {Promise<Object>}
 */
async function executeSwap(swapData) {
  try {
    return await request('/swap/execute', {
      method: 'POST',
      body: swapData
    });
  } catch (err) {
    console.error('[API] executeSwap failed:', err.error || err);
    return { success: false, data: null, error: err.error || 'Swap execution failed' };
  }
}

/**
 * Get market overview data
 * @returns {Promise<Object>}
 */
async function getMarketOverview() {
  try {
    return await request('/market/overview');
  } catch (err) {
    console.error('[API] getMarketOverview failed:', err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to fetch market data' };
  }
}

/**
 * Get token info
 * @param {string} symbol - Token symbol
 * @returns {Promise<Object>}
 */
async function getTokenInfo(symbol) {
  try {
    return await request(`/tokens/${symbol.toUpperCase()}`);
  } catch (err) {
    console.error(`[API] getTokenInfo(${symbol}) failed:`, err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to fetch token info' };
  }
}

/**
 * Get DEX liquidity info
 * @returns {Promise<Object>}
 */
async function getDexLiquidity() {
  try {
    return await request('/dex/liquidity');
  } catch (err) {
    console.error('[API] getDexLiquidity failed:', err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to fetch DEX data' };
  }
}

/**
 * Get transaction history for an address
 * @param {string} address - Solana wallet address
 * @param {number} limit - Max results
 * @returns {Promise<Object>}
 */
async function getTransactions(address, limit = 10) {
  try {
    return await request(`/transactions?address=${address}&limit=${limit}`);
  } catch (err) {
    console.error('[API] getTransactions failed:', err.error || err);
    return { success: false, data: null, error: err.error || 'Failed to fetch transactions' };
  }
}

/**
 * Health check
 * @returns {Promise<Object>}
 */
async function healthCheck() {
  try {
    return await request('/health', { timeout: 5000 });
  } catch (err) {
    return { success: false, data: null, error: 'Backend unreachable' };
  }
}

module.exports = {
  request,
  getTokenPrice,
  getAllPrices,
  getSwapQuote,
  executeSwap,
  getMarketOverview,
  getTokenInfo,
  getDexLiquidity,
  getTransactions,
  healthCheck,
  BACKEND_URL
};
