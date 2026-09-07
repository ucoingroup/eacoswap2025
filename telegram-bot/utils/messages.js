/**
 * messages.js - Message formatting utilities for EACO Swap Bot
 */

const { t } = require('./i18n');

const EACO_CONTRACT = 'DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH';
const EACO_ORBMARKETS = 'https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH';
const CHARITY_LINK = 'https://ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html';

const TOKENS = {
  SOL: { symbol: 'SOL', name: 'Solana' },
  EACO: { symbol: 'EACO', name: 'EACO Token', contract: 'DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH' },
  USDT: { symbol: 'USDT', name: 'Tether USD', contract: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
  USDC: { symbol: 'USDC', name: 'USD Coin', contract: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
  WETH: { symbol: 'wETH', name: 'Wrapped ETH', contract: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs' },
  WBTC: { symbol: 'wBTC', name: 'Wrapped BTC', contract: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh' },
  WBNB: { symbol: 'wBNB', name: 'Wrapped BNB', contract: '9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa' },
  TRX: { symbol: 'TRX', name: 'TRON', contract: 'GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc' },
  ECNH: { symbol: 'eCNH', name: 'eCNH Stablecoin', contract: '7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5' }
};

const DEX_LIST = [
  { name: 'Jupiter', url: 'https://jup.ag', desc: 'Best price routing aggregator' },
  { name: 'Raydium', url: 'https://raydium.io', desc: 'AMM + orderbook DEX' },
  { name: 'Orca', url: 'https://orca.so', desc: 'Concentrated liquidity AMM' },
  { name: 'Meteora', url: 'https://meteora.ag', desc: 'Dynamic liquidity marketplace' },
  { name: 'Phoenix', url: 'https://phoenix.trade', desc: 'Central limit orderbook' },
  { name: 'Lifinity', url: 'https://lifinity.io', desc: 'Proactive market maker' },
  { name: 'Drift', url: 'https://drift.trade', desc: 'Perpetuals + spot DEX' },
  { name: 'Zeta Markets', url: 'https://zeta.markets', desc: 'Options + perps DEX' },
  { name: 'Crema Finance', url: 'https://crema.finance', desc: 'Concentrated liquidity DEX' },
  { name: 'Saros Finance', url: 'https://saros.finance', desc: 'Super app DEX' }
];

/**
 * Format welcome message
 */
function formatWelcome(lang = 'en', userName = '') {
  const greeting = userName ? `👋 Hello, ${userName}!\n\n` : '';
  return (
    `${greeting}` +
    `🚀 <b>${t('welcome_title', lang)}</b>\n\n` +
    `${t('welcome_desc', lang)}\n\n` +
    `📊 <b>EACO Contract:</b>\n` +
    `<code>${EACO_CONTRACT}</code>\n\n` +
    `💡 Use the buttons below to navigate or type /help for commands.`
  );
}

/**
 * Format help message
 */
function formatHelp(lang = 'en') {
  return (
    `📖 <b>${t('help_title', lang)}</b>\n\n` +
    `${t('help_desc', lang)}\n\n` +
    `• /start — ${t('cmd_start', lang)}\n` +
    `• /help — ${t('cmd_help', lang)}\n` +
    `• /swap — ${t('cmd_swap', lang)}\n` +
    `• /market — ${t('cmd_market', lang)}\n` +
    `• /faq — ${t('cmd_faq', lang)}\n` +
    `• /about — ${t('cmd_about', lang)}\n` +
    `• /settings — ${t('cmd_settings', lang)}\n\n` +
    `🌐 <b>WebApp:</b> Open the Mini App for full DEX experience\n` +
    `🔗 <b>Deep Link:</b> https://t.me/{bot}?startapp=swap`
  );
}

/**
 * Format swap message
 */
function formatSwap(lang = 'en') {
  return (
    `⚡ <b>${t('swap_title', lang)}</b>\n\n` +
    `${t('swap_desc', lang)}\n\n` +
    `🔥 <b>Popular Pairs:</b>\n` +
    `• SOL → EACO\n` +
    `• USDC → EACO\n` +
    `• USDT → EACO\n\n` +
    `💡 Tap a pair below to launch the swap interface.`
  );
}

/**
 * Format market message
 */
function formatMarket(lang = 'en', data = null) {
  let msg = `📈 <b>${t('market_title', lang)}</b>\n\n`;
  msg += `${t('market_desc', lang)}\n\n`;

  if (data && data.prices) {
    for (const [symbol, price] of Object.entries(data.prices)) {
      const token = TOKENS[symbol];
      if (token) {
        const change = data.changes?.[symbol] || '0.00';
        const arrow = change >= 0 ? '🟢' : '🔴';
        msg += `${arrow} <b>${symbol}:</b> $${price} (${change}%)\n`;
      }
    }
  } else {
    msg += `🔄 <i>${t('loading', lang)}</i>\n`;
  }

  msg += `\n📊 Data sourced from Jupiter, Raydium & more.`;
  return msg;
}

/**
 * Format FAQ message
 */
function formatFaq(lang = 'en') {
  return (
    `❓ <b>${t('faq_title', lang)}</b>\n\n` +
    `${t('faq_desc', lang)}\n\n` +
    `1️⃣ <b>What is EACO?</b>\n` +
    `EACO is a community-driven token on Solana blockchain.\n\n` +
    `2️⃣ <b>How do I swap?</b>\n` +
    `Tap /swap or open the Mini App to trade tokens instantly.\n\n` +
    `3️⃣ <b>Which wallets are supported?</b>\n` +
    `Phantom, Solflare, Backpack, and any Solana wallet.\n\n` +
    `4️⃣ <b>What are the fees?</b>\n` +
    `Network fees only — EACO Swap charges 0% platform fee.\n\n` +
    `5️⃣ <b>Is my funds safe?</b>\n` +
    `Yes. EACO Swap uses audited smart contracts via Jupiter/Raydium.`
  );
}

/**
 * Format about message
 */
function formatAbout(lang = 'en') {
  return (
    `🌟 <b>${t('about_title', lang)}</b>\n\n` +
    `${t('about_desc', lang)}\n\n` +
    `📋 <b>Contract Address:</b>\n` +
    `<code>${EACO_CONTRACT}</code>\n\n` +
    `🔗 <b>Links:</b>\n` +
    `• <a href="${EACO_ORBMARKETS}">OrbMarkets</a>\n` +
    `• <a href="${CHARITY_LINK}">EACO Charity 2025</a>\n\n` +
    `🤝 <b>Powered by:</b> Solana + Jupiter\n` +
    `💚 <b>Community:</b> @eacoswap`
  );
}

/**
 * Format settings message
 */
function formatSettings(lang = 'en', prefs = {}) {
  const currentLang = prefs.lang || lang;
  const theme = prefs.theme || 'auto';
  const notif = prefs.notifications !== false ? 'On' : 'Off';

  return (
    `⚙️ <b>${t('settings_title', lang)}</b>\n\n` +
    `${t('settings_desc', lang)}\n\n` +
    `🌐 <b>${t('settings_lang', lang)}:</b> ${currentLang.toUpperCase()}\n` +
    `🎨 <b>${t('settings_theme', lang)}:</b> ${theme}\n` +
    `🔔 <b>${t('settings_notifications', lang)}:</b> ${notif}\n\n` +
    `💡 Your preferences are saved per-user.`
  );
}

/**
 * Format DEX list message
 */
function formatDexList(page = 0) {
  const pageSize = 5;
  const start = page * pageSize;
  const end = start + pageSize;
  const pageItems = DEX_LIST.slice(start, end);

  let msg = `🌐 <b>Supported DEXs</b> (${start + 1}-${Math.min(end, DEX_LIST.length)} of ${DEX_LIST.length})\n\n`;

  for (const dex of pageItems) {
    msg += `• <b><a href="${dex.url}">${dex.name}</a></b> — ${dex.desc}\n`;
  }

  return msg;
}

/**
 * Format contract info message
 */
function formatContractInfo() {
  return (
    `📋 <b>EACO Contract</b>\n\n` +
    `<code>${EACO_CONTRACT}</code>\n\n` +
    `🔗 <a href="${EACO_ORBMARKETS}">View on OrbMarkets</a>\n\n` +
    `💡 Tap to copy the address above.`
  );
}

/**
 * Format deep link welcome message
 */
function formatDeepLinkWelcome(lang = 'en', param = '') {
  let msg = `🎯 <b>${t('deep_link_welcome', lang)}</b>\n\n`;

  if (param) {
    msg += `📍 <b>Page:</b> <code>${param}</code>\n\n`;
  }

  msg += `⚡ Opening EACO Swap Mini App...`;
  return msg;
}

/**
 * Format FAQ answer
 */
function formatFaqAnswer(topic, lang = 'en') {
  const answers = {
    faq_what: (
      `❓ <b>What is EACO?</b>\n\n` +
      `EACO is a community-driven cryptocurrency token built on the Solana blockchain. ` +
      `It aims to provide transparent, fair, and accessible DeFi tools for everyone.`
    ),
    faq_safety: (
      `🔒 <b>Is EACO Swap safe?</b>\n\n` +
      `Yes. EACO Swap routes through audited DEX protocols like Jupiter and Raydium. ` +
      `We do not hold your funds — all swaps happen directly on-chain via your wallet.`
    ),
    faq_buy: (
      `💰 <b>How do I buy EACO?</b>\n\n` +
      `1. Connect your Solana wallet\n` +
      `2. Select a trading pair (e.g., SOL/EACO)\n` +
      `3. Enter amount and confirm the swap\n\n` +
      `You can also buy via Jupiter, Raydium, or other supported DEXs.`
    ),
    faq_wallet: (
      `🔗 <b>Wallet Setup</b>\n\n` +
      `Recommended wallets:\n` +
      `• Phantom (phantom.app)\n` +
      `• Solflare (solflare.com)\n` +
      `• Backpack (backpack.app)\n\n` +
      `Install the wallet, create or import an account, then connect to EACO Swap.`
    ),
    faq_fees: (
      `📉 <b>Slippage & Fees</b>\n\n` +
      `• Platform fee: 0%\n` +
      `• Network fee: ~0.000005 SOL\n` +
      `• Slippage: Adjustable (default 0.5%)\n\n` +
      `Fees go to Solana validators, not EACO Swap.`
    ),
    faq_community: (
      `🤝 <b>Community</b>\n\n` +
      `Join our community channels:\n` +
      `• Telegram: @eacoswap\n` +
      `• Twitter/X: @eacoswap\n\n` +
      `We welcome feedback, suggestions, and contributions!`
    )
  };

  return answers[topic] || t('error_generic', lang);
}

/**
 * Escape markdown characters for Telegram HTML mode
 * Actually we use HTML parse mode, so only need to escape HTML special chars
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = {
  formatWelcome,
  formatHelp,
  formatSwap,
  formatMarket,
  formatFaq,
  formatAbout,
  formatSettings,
  formatDexList,
  formatContractInfo,
  formatDeepLinkWelcome,
  formatFaqAnswer,
  escapeHtml,
  TOKENS,
  DEX_LIST,
  EACO_CONTRACT,
  EACO_ORBMARKETS,
  CHARITY_LINK
};
