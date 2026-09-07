/**
 * EACOswap API Proxy Routes
 * Securely proxies requests to Solana data providers
 * API Keys are read from server environment variables only
 */
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// ===== Configuration =====
const HELIUS_KEY = process.env.HELIUS_API_KEY;
const BIRDEYE_KEY = process.env.BIRDEYE_API_KEY;
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '60'); // seconds

// Simple in-memory cache
const cache = new Map();

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data, ttl = CACHE_TTL) {
  cache.set(key, { data, expires: Date.now() + ttl * 1000 });
}

// ===== Helper: Forward request with error handling =====
async function proxyRequest(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status}: ${body.slice(0, 200)}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    clearTimeout(timeout);
    return { success: false, error: err.message };
  }
}

// ===== 1. SOL Price & Market Data (CoinGecko - Free, No Key) =====
router.get('/sol-price', async (req, res) => {
  const cacheKey = 'sol-price';
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  const result = await proxyRequest(
    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_vol=true&include_market_cap=true&include_24hr_change=true'
  );
  
  if (result.success) {
    setCache(cacheKey, result.data, 60); // Cache 60s
  }
  res.json(result);
});

// ===== 2. Top SPL Tokens by Market Cap (CoinGecko Free API) =====
router.get('/tokens/market-cap', async (req, res) => {
  const perPage = Math.min(parseInt(req.query.per_page) || 100, 250);
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const vs = req.query.vs_currency || 'usd';
  
  const cacheKey = `tokens-mcap-${perPage}-${page}-${vs}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs}&category=solana-ecosystem&order=market_cap_desc&sparkline=false&price_change_percentage=1h,24h,7d,30d&per_page=${perPage}&page=${page}`;
  
  const result = await proxyRequest(url);
  if (result.success) {
    setCache(cacheKey, result.data, 300); // Cache 5min
  }
  res.json(result);
});

// ===== 3. Helius RPC Proxy (Solana On-chain Data) =====
router.post('/helius/rpc', async (req, res) => {
  if (!HELIUS_KEY) {
    return res.status(503).json({ 
      success: false, 
      error: 'Helius API not configured on server. Please contact admin or use frontend localStorage key.' 
    });
  }
  
  const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
  const body = req.body;
  
  // Log for monitoring (don't log sensitive data in production)
  console.log(`[Helius RPC] Method: ${body?.method || 'unknown'}`);
  
  const result = await proxyRequest(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  res.json(result);
});

// ===== 4. Helius DAS API (Token Metadata & Holders) =====
router.get('/helius/das/assets-by-owner', async (req, res) => {
  if (!HELIUS_KEY) {
    return res.status(503).json({ 
      success: false, 
      error: 'Helius API not configured on server' 
    });
  }
  
  const owner = req.query.owner;
  if (!owner) {
    return res.status(400).json({ success: false, error: 'Missing owner parameter' });
  }
  
  const cacheKey = `helius-assets-${owner}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  const url = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
  const result = await proxyRequest(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'das-assets',
      method: 'getAssetsByOwner',
      params: { ownerAddress: owner, page: 1 }
    })
  });
  
  if (result.success) {
    setCache(cacheKey, result.data, 120); // Cache 2min
  }
  res.json(result);
});

// ===== 5. Token Account Info (Helius) =====
router.get('/helius/token-accounts', async (req, res) => {
  if (!HELIUS_KEY) {
    return res.status(503).json({ success: false, error: 'Helius API not configured' });
  }
  
  const mint = req.query.mint;
  if (!mint) {
    return res.status(400).json({ success: false, error: 'Missing mint parameter' });
  }
  
  const cacheKey = `token-accts-${mint}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  const url = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
  const result = await proxyRequest(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getProgramAccounts',
      params: [
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        {
          encoding: 'base64',
          filters: [
            { dataSize: 165 },
            { memcmp: { offset: 0, bytes: mint } }
          ]
        }
      ]
    })
  });
  
  if (result.success) {
    const count = result.data?.result?.length || 0;
    setCache(cacheKey, { ...result.data, holderCount: count }, 300); // Cache 5min
  }
  res.json(result);
});

// ===== 6. Birdeye Token Data (Optional, requires key) =====
router.get('/birdeye/token/:address', async (req, res) => {
  if (!BIRDEYE_KEY) {
    return res.status(503).json({ 
      success: false, 
      error: 'Birdeye API not configured on server' 
    });
  }
  
  const address = req.params.address;
  const cacheKey = `birdeye-${address}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  const url = `https://public-api.birdeye.so/public/v1/token/${address}`;
  const result = await proxyRequest(url, {
    headers: { 'X-API-KEY': BIRDEYE_KEY }
  });
  
  if (result.success) {
    setCache(cacheKey, result.data, 60);
  }
  res.json(result);
});

// ===== 7. Birdeye Price (Free tier available) =====
router.get('/birdeye/price/:address', async (req, res) => {
  const address = req.params.address;
  const cacheKey = `birdeye-price-${address}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  // Try Birdeye first if key available
  if (BIRDEYE_KEY) {
    const url = `https://public-api.birdeye.so/public/v1/price?address=${address}`;
    const result = await proxyRequest(url, {
      headers: { 'X-API-KEY': BIRDEYE_KEY }
    });
    if (result.success) {
      setCache(cacheKey, result.data, 30);
      return res.json(result);
    }
  }
  
  // Fallback to CoinGecko
  const result = await proxyRequest(
    `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${address}&vs_currencies=usd&include_24hr_change=true`
  );
  
  if (result.success) {
    setCache(cacheKey, result.data, 60);
  }
  res.json(result);
});

// ===== 8. Jupiter Quote (Swap Route Preview) =====
router.get('/jupiter/quote', async (req, res) => {
  const inputMint = req.query.inputMint || 'So11111111111111111111111111111111111111112'; // SOL
  const outputMint = req.query.outputMint;
  const amount = req.query.amount; // in lamports
  
  if (!outputMint || !amount) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing outputMint or amount parameter' 
    });
  }
  
  const cacheKey = `jupiter-quote-${inputMint}-${outputMint}-${amount}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);
  
  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;
  const result = await proxyRequest(url);
  
  if (result.success) {
    setCache(cacheKey, result.data, 15); // Cache 15s (quotes expire fast)
  }
  res.json(result);
});

// ===== 9. Health Check =====
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      coingecko: true,
      helius: !!HELIUS_KEY,
      birdeye: !!BIRDEYE_KEY,
      jupiter: true
    },
    uptime: process.uptime()
  });
});

// ===== 10. Server Config Info (safe to expose) =====
router.get('/config', (req, res) => {
  res.json({
    heliusConfigured: !!HELIUS_KEY,
    birdeyeConfigured: !!BIRDEYE_KEY,
    cacheTtl: CACHE_TTL,
    version: '1.0.0'
  });
});

module.exports = router;
