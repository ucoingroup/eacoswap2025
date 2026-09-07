/**
 * keyboards.js - Inline Keyboard generators for EACO Swap Bot
 */

const { t } = require('./i18n');

const WEBAPP_URL = process.env.WEBAPP_URL || 'https://example.com';
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
 * Main menu keyboard with WebApp button
 */
function mainMenuKeyboard(lang = 'en', startParam = '') {
  const url = startParam
    ? `${WEBAPP_URL}?startapp=${startParam}`
    : WEBAPP_URL;

  return {
    inline_keyboard: [
      [
        { text: t('btn_swap', lang), web_app: { url: `${WEBAPP_URL}/swap` } },
        { text: t('btn_market', lang), web_app: { url: `${WEBAPP_URL}/market` } }
      ],
      [
        { text: t('btn_faq', lang), web_app: { url: `${WEBAPP_URL}/faq` } },
        { text: t('btn_settings', lang), web_app: { url: `${WEBAPP_URL}/settings` } }
      ],
      [
        { text: t('btn_open_app', lang), web_app: { url } }
      ]
    ]
  };
}

/**
 * Swap command keyboard with trading pairs
 */
function swapKeyboard(lang = 'en') {
  const pairs = [
    ['SOL/EACO', 'USDC/EACO'],
    ['USDT/EACO', 'SOL/USDC'],
    ['SOL/USDT', 'wETH/USDC']
  ];

  const rows = pairs.map(row =>
    row.map(pair => ({
      text: `⚡ ${pair}`,
      web_app: { url: `${WEBAPP_URL}/swap?pair=${encodeURIComponent(pair)}` }
    }))
  );

  rows.push([
    { text: `↩️ ${t('back', lang)}`, callback_data: 'menu_main' }
  ]);

  return { inline_keyboard: rows };
}

/**
 * Market command keyboard
 */
function marketKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        { text: `📊 SOL`, web_app: { url: `${WEBAPP_URL}/market?token=SOL` } },
        { text: `📊 EACO`, web_app: { url: `${WEBAPP_URL}/market?token=EACO` } }
      ],
      [
        { text: `📊 USDC`, web_app: { url: `${WEBAPP_URL}/market?token=USDC` } },
        { text: `📊 USDT`, web_app: { url: `${WEBAPP_URL}/market?token=USDT` } }
      ],
      [
        { text: `🔄 ${t('refresh', lang)}`, callback_data: 'market_refresh' }
      ],
      [
        { text: `↩️ ${t('back', lang)}`, callback_data: 'menu_main' }
      ]
    ]
  };
}

/**
 * FAQ keyboard with topic buttons
 */
function faqKeyboard(lang = 'en') {
  const topics = [
    { text: '❓ What is EACO?', callback_data: 'faq_what' },
    { text: '🔒 Is it safe?', callback_data: 'faq_safety' },
    { text: '💰 How to buy?', callback_data: 'faq_buy' },
    { text: '🔗 Wallet setup', callback_data: 'faq_wallet' },
    { text: '📉 Slippage & fees', callback_data: 'faq_fees' },
    { text: '🤝 Community', callback_data: 'faq_community' }
  ];

  const rows = [];
  for (let i = 0; i < topics.length; i += 2) {
    rows.push(topics.slice(i, i + 2));
  }

  rows.push([
    { text: t('btn_open_app', lang), web_app: { url: `${WEBAPP_URL}/faq` } }
  ]);
  rows.push([
    { text: `↩️ ${t('back', lang)}`, callback_data: 'menu_main' }
  ]);

  return { inline_keyboard: rows };
}

/**
 * About keyboard with external links
 */
function aboutKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        { text: '🔍 OrbMarkets', url: EACO_ORBMARKETS },
        { text: '💝 Charity 2025', url: CHARITY_LINK }
      ],
      [
        { text: '🌐 DEX List', callback_data: 'about_dexlist' },
        { text: '📋 Contract', callback_data: 'about_contract' }
      ],
      [
        { text: t('btn_open_app', lang), web_app: { url: WEBAPP_URL } }
      ],
      [
        { text: `↩️ ${t('back', lang)}`, callback_data: 'menu_main' }
      ]
    ]
  };
}

/**
 * DEX list pagination keyboard
 */
function dexListKeyboard(lang = 'en', page = 0) {
  const pageSize = 5;
  const start = page * pageSize;
  const end = start + pageSize;
  const pageItems = DEX_LIST.slice(start, end);

  const rows = pageItems.map(dex => [
    { text: `🔄 ${dex.name}`, url: dex.url }
  ]);

  const navRow = [];
  if (page > 0) {
    navRow.push({ text: '⬅️ Prev', callback_data: `dex_page_${page - 1}` });
  }
  if (end < DEX_LIST.length) {
    navRow.push({ text: 'Next ➡️', callback_data: `dex_page_${page + 1}` });
  }
  if (navRow.length) rows.push(navRow);

  rows.push([
    { text: `↩️ ${t('back', lang)}`, callback_data: 'menu_about' }
  ]);

  return { inline_keyboard: rows };
}

/**
 * Settings keyboard with language and theme options
 */
function settingsKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        { text: `🌐 ${t('settings_lang', lang)}`, callback_data: 'settings_lang' }
      ],
      [
        { text: `🎨 ${t('settings_theme', lang)}: Light`, callback_data: 'theme_light' },
        { text: `Dark`, callback_data: 'theme_dark' },
        { text: `Auto`, callback_data: 'theme_auto' }
      ],
      [
        { text: `🔔 ${t('settings_notifications', lang)}: On`, callback_data: 'notif_on' },
        { text: `Off`, callback_data: 'notif_off' }
      ],
      [
        { text: t('btn_open_app', lang), web_app: { url: `${WEBAPP_URL}/settings` } }
      ],
      [
        { text: `↩️ ${t('back', lang)}`, callback_data: 'menu_main' }
      ]
    ]
  };
}

/**
 * Language selection keyboard
 */
function languageKeyboard(currentLang = 'en') {
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const rows = languages.map(l => [
    {
      text: `${l.flag} ${l.name}${l.code === currentLang ? ' ✓' : ''}`,
      callback_data: `lang_${l.code}`
    }
  ]);

  rows.push([
    { text: '↩️ Back', callback_data: 'menu_settings' }
  ]);

  return { inline_keyboard: rows };
}

/**
 * Help keyboard
 */
function helpKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        { text: t('btn_swap', lang), web_app: { url: `${WEBAPP_URL}/swap` } },
        { text: t('btn_market', lang), web_app: { url: `${WEBAPP_URL}/market` } }
      ],
      [
        { text: t('btn_open_app', lang), web_app: { url: WEBAPP_URL } }
      ]
    ]
  };
}

/**
 * Simple back button keyboard
 */
function backKeyboard(lang = 'en', target = 'menu_main') {
  return {
    inline_keyboard: [
      [
        { text: `↩️ ${t('back', lang)}`, callback_data: target }
      ]
    ]
  };
}

module.exports = {
  mainMenuKeyboard,
  swapKeyboard,
  marketKeyboard,
  faqKeyboard,
  aboutKeyboard,
  dexListKeyboard,
  settingsKeyboard,
  languageKeyboard,
  helpKeyboard,
  backKeyboard,
  TOKENS,
  DEX_LIST,
  EACO_CONTRACT,
  EACO_ORBMARKETS,
  CHARITY_LINK,
  WEBAPP_URL
};
