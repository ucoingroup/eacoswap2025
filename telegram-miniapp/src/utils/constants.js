// ===== EACO Contract & Links =====
export const EACO_CONTRACT = 'DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH'
export const EACO_ORBMARKETS = 'https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH'
export const CHARITY_LINK = 'https://ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html'

// ===== 9 Supported Tokens =====
export const TOKEN_LIST = [
  { symbol: 'EACO', name: 'Earth Coin', address: EACO_CONTRACT, decimals: 9, icon: '🌍', orbmarkets: EACO_ORBMARKETS, type: 'native' },
  { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112', decimals: 9, icon: '◎', orbmarkets: 'https://orbmarkets.io/token/So11111111111111111111111111111111111111112', type: 'native' },
  { symbol: 'USDT', name: 'Tether USD', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6, icon: '💵', orbmarkets: 'https://orbmarkets.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', type: 'stable' },
  { symbol: 'USDC', name: 'USD Coin', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6, icon: '💲', orbmarkets: 'https://orbmarkets.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', type: 'stable' },
  { symbol: 'wETH', name: 'Wrapped Ethereum', address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', decimals: 8, icon: '⟠', orbmarkets: 'https://orbmarkets.io/token/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', type: 'wrapped' },
  { symbol: 'wBTC', name: 'Wrapped Bitcoin', address: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh', decimals: 8, icon: '₿', orbmarkets: 'https://orbmarkets.io/token/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh', type: 'wrapped' },
  { symbol: 'wBNB', name: 'Wrapped BNB', address: '9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa', decimals: 8, icon: '🟡', orbmarkets: 'https://orbmarkets.io/token/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa', type: 'wrapped' },
  { symbol: 'TRX', name: 'Wrapped TRON', address: 'GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc', decimals: 6, icon: '🔺', orbmarkets: 'https://orbmarkets.io/token/GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc', type: 'wrapped' },
  { symbol: 'eCNH', name: 'eCNH Stable', address: '7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5', decimals: 6, icon: '¥', orbmarkets: 'https://orbmarkets.io/token/7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5', type: 'stable' },
]

// ===== 10 Top Solana DEXs =====
export const DEX_LIST = [
  { id: 'jupiter', name: 'Jupiter', description: 'Best price routing aggregator', icon: '🪐', url: 'https://jup.ag', type: 'aggregator' },
  { id: 'raydium', name: 'Raydium', description: 'AMM + CLMM liquidity', icon: '☀️', url: 'https://raydium.io', type: 'amm' },
  { id: 'orca', name: 'Orca', description: 'Concentrated liquidity Whirlpool', icon: '🐋', url: 'https://orca.so', type: 'amm' },
  { id: 'meteora', name: 'Meteora', description: 'Dynamic DLMM pools', icon: '☄️', url: 'https://meteora.ag', type: 'amm' },
  { id: 'phoenix', name: 'Phoenix', description: 'Orderbook DEX', icon: '🔥', url: 'https://phoenix.finance', type: 'orderbook' },
  { id: 'lifinity', name: 'Lifinity', description: 'Proactive market maker', icon: '💧', url: 'https://lifinity.io', type: 'amm' },
  { id: 'drift', name: 'Drift', description: 'Perpetuals + spot', icon: '🌊', url: 'https://drift.trade', type: 'perps' },
  { id: 'zeta', name: 'Zeta', description: 'Options + perps', icon: '⚡', url: 'https://zeta.markets', type: 'perps' },
  { id: 'crema', name: 'Crema', description: 'Concentrated liquidity', icon: '🧪', url: 'https://crema.finance', type: 'amm' },
  { id: 'saros', name: 'Saros', description: 'Super DEX with staking', icon: '🚀', url: 'https://saros.finance', type: 'amm' },
]

// ===== Solana Explorers =====
export const EXPLORER_LIST = [
  { name: 'Solscan', url: 'https://solscan.io', icon: '🔍' },
  { name: 'SolanaFM', url: 'https://solana.fm', icon: '📻' },
  { name: 'Helius', url: 'https://helius.xyz', icon: '☀️' },
  { name: 'OrbMarkets', url: 'https://orbmarkets.io', icon: '🌐' },
  { name: 'Birdeye', url: 'https://birdeye.so', icon: '👁️' },
  { name: 'DexScreener', url: 'https://dexscreener.com', icon: '📊' },
  { name: 'CoinGecko', url: 'https://coingecko.com', icon: '🦎' },
  { name: 'CoinMarketCap', url: 'https://coinmarketcap.com', icon: '📈' },
]

// ===== App Constants =====
export const APP_VERSION = '1.0.0'
export const APP_NAME = 'EACO Swap'
export const SUPPORTED_LANGUAGES = ['en', 'zh', 'es', 'ar', 'fr', 'ru']
