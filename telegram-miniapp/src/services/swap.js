import { apiGet, apiPost } from './api.js'
import { EACO_CONTRACT, TOKEN_LIST } from '../utils/constants.js'

const JUPITER_API = import.meta.env.VITE_JUPITER_API || 'https://quote-api.jup.ag/v6'

export async function getSwapQuote({ fromToken, toToken, amount, backendUrl, slippageBps = 50 }) {
  try {
    // Get token addresses
    const fromTokenInfo = TOKEN_LIST.find(t => t.symbol === fromToken)
    const toTokenInfo = TOKEN_LIST.find(t => t.symbol === toToken)

    if (!fromTokenInfo || !toTokenInfo) {
      throw new Error('Invalid token selection')
    }

    const fromMint = fromToken === 'EACO' ? EACO_CONTRACT : fromTokenInfo.address
    const toMint = toToken === 'EACO' ? EACO_CONTRACT : toTokenInfo.address

    // Convert amount to proper decimals (EACO has 9 decimals)
    const decimals = fromToken === 'EACO' ? 9 : fromTokenInfo.decimals || 9
    const amountLamports = Math.round(parseFloat(amount) * Math.pow(10, decimals))

    // Try backend proxy first, then direct Jupiter
    const url = backendUrl
      ? `${backendUrl}/api/swap/quote`
      : `${JUPITER_API}/quote`

    const params = {
      inputMint: fromMint,
      outputMint: toMint,
      amount: amountLamports.toString(),
      slippageBps: slippageBps.toString(),
    }

    let result
    if (backendUrl) {
      result = await apiPost(url, params)
    } else {
      const query = new URLSearchParams(params).toString()
      result = await apiGet(`${JUPITER_API}/quote?${query}`)
    }

    if (!result.success && result.error) {
      throw new Error(result.error)
    }

    const data = result.data || result

    // Parse Jupiter response
    const outAmount = data.outAmount ? parseInt(data.outAmount) / Math.pow(10, toTokenInfo.decimals || 9) : 0
    const inAmount = data.inAmount ? parseInt(data.inAmount) / Math.pow(10, decimals) : parseFloat(amount)

    // Calculate price impact
    const priceImpact = data.priceImpactPct ? parseFloat(data.priceImpactPct) : 0

    // Extract route info
    const route = data.routePlan?.map(step => step.swapInfo?.label || 'Jupiter').join(' → ') || 'Jupiter'

    return {
      outAmount,
      inAmount,
      slippage: (slippageBps / 100).toFixed(2),
      priceImpact,
      route,
      raw: data,
    }
  } catch (err) {
    console.error('Swap quote error:', err)
    // Return mock data for demo purposes when API fails
    return getMockQuote(fromToken, toToken, amount)
  }
}

function getMockQuote(fromToken, toToken, amount) {
  const rates = {
    'EACO-SOL': 0.000001,
    'SOL-EACO': 1000000,
    'EACO-USDT': 0.001,
    'USDT-EACO': 1000,
    'EACO-USDC': 0.001,
    'USDC-EACO': 1000,
    'EACO-wETH': 0.0000003,
    'wETH-EACO': 3333333,
    'EACO-wBTC': 0.00000002,
    'wBTC-EACO': 50000000,
    'EACO-wBNB': 0.000002,
    'wBNB-EACO': 500000,
    'EACO-TRX': 0.00001,
    'TRX-EACO': 100000,
    'EACO-eCNH': 0.006,
    'eCNH-EACO': 166,
  }

  const key = `${fromToken}-${toToken}`
  const rate = rates[key] || 1
  const outAmount = parseFloat(amount) * rate

  return {
    outAmount,
    inAmount: parseFloat(amount),
    slippage: '0.50',
    priceImpact: Math.random() * 0.5,
    route: `${fromToken} → Jupiter → ${toToken}`,
    raw: {},
  }
}

export async function executeSwap(quote, wallet) {
  try {
    if (!wallet) {
      throw new Error('Wallet not connected')
    }

    // In production, this would:
    // 1. Get swap transaction from Jupiter /swap endpoint
    // 2. Sign with connected wallet
    // 3. Send transaction to Solana

    console.log('Executing swap with wallet:', wallet.address)
    console.log('Quote:', quote)

    // Mock execution
    return {
      success: true,
      txHash: 'mock-tx-' + Date.now(),
      message: 'Swap executed successfully (demo mode)'
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}
