/**
 * bot.js - Main entry point for EACO Swap Telegram Bot
 * Supports both WebHook and Polling modes
 */

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// Command handlers
const { handleStart } = require('./commands/start');
const { handleHelp } = require('./commands/help');
const { handleSwap, handleSwapCallback } = require('./commands/swap');
const { handleMarket, handleMarketCallback } = require('./commands/market');
const { handleFaq, handleFaqCallback } = require('./commands/faq');
const { handleAbout, handleAboutCallback } = require('./commands/about');
const { handleSettings, handleSettingsCallback } = require('./commands/settings');

// Utils
const { t } = require('./utils/i18n');
const { mainMenuKeyboard } = require('./utils/keyboards');
const { formatWelcome } = require('./utils/messages');
const { getUser } = require('./middleware/auth');

// Environment
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://example.com';
const PORT = parseInt(process.env.PORT || '8443', 10);
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const MODE = process.env.MODE || 'polling';

if (!BOT_TOKEN) {
  console.error('[Bot] Error: BOT_TOKEN is required. Set it in .env file.');
  process.exit(1);
}

// =========================
// Bot Initialization
// =========================

let bot;

if (MODE === 'webhook') {
  // WebHook mode: create bot without polling
  bot = new TelegramBot(BOT_TOKEN, { webHook: true });

  const webhookPath = new URL(WEBHOOK_URL || `http://localhost:${PORT}/webhook`).pathname;

  // Use existing webhook
  if (WEBHOOK_URL) {
    bot.setWebHook(WEBHOOK_URL).then(() => {
      console.log(`[Bot] WebHook set to: ${WEBHOOK_URL}`);
    }).catch(err => {
      console.error('[Bot] Failed to set webhook:', err.message);
    });
  }

  console.log(`[Bot] Running in WEBHOOK mode on port ${PORT}`);
} else {
  // Polling mode (default for development)
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('[Bot] Running in POLLING mode');
}

// =========================
// Bot Information
// =========================

bot.getMe().then(me => {
  console.log(`[Bot] Connected as @${me.username} (ID: ${me.id})`);

  // Set bot commands
  bot.setMyCommands([
    { command: 'start', description: 'Start the bot and open WebApp' },
    { command: 'help', description: 'Show available commands' },
    { command: 'swap', description: 'Launch token swap interface' },
    { command: 'market', description: 'View live market prices' },
    { command: 'faq', description: 'Frequently asked questions' },
    { command: 'about', description: 'About EACO project' },
    { command: 'settings', description: 'User preferences' }
  ]).then(() => {
    console.log('[Bot] Commands registered');
  }).catch(err => {
    console.error('[Bot] Failed to set commands:', err.message);
  });

  // Set menu button to WebApp
  bot.setChatMenuButton({
    menu_button: {
      type: 'web_app',
      text: process.env.MENU_BUTTON_TEXT || 'Open App',
      web_app: { url: WEBAPP_URL }
    }
  }).then(() => {
    console.log('[Bot] Menu button set to WebApp');
  }).catch(err => {
    console.error('[Bot] Failed to set menu button:', err.message);
  });
}).catch(err => {
  console.error('[Bot] Failed to get bot info:', err.message);
  process.exit(1);
});

// =========================
// Command Handlers
// =========================

// /start command - also handles deep links (startapp param)
bot.onText(/^\/start(?:\s+(.*))?$/, (msg, match) => {
  const startParam = match[1] || '';
  handleStart(bot, msg, startParam);
});

// /help command
bot.onText(/^\/help$/, (msg) => {
  handleHelp(bot, msg);
});

// /swap command
bot.onText(/^\/swap$/, (msg) => {
  handleSwap(bot, msg);
});

// /market command
bot.onText(/^\/market$/, (msg) => {
  handleMarket(bot, msg);
});

// /faq command
bot.onText(/^\/faq$/, (msg) => {
  handleFaq(bot, msg);
});

// /about command
bot.onText(/^\/about$/, (msg) => {
  handleAbout(bot, msg);
});

// /settings command
bot.onText(/^\/settings$/, (msg) => {
  handleSettings(bot, msg);
});

// =========================
// Callback Query Handler
// =========================

bot.on('callback_query', async (query) => {
  const data = query.data;

  // Route to specific handlers
  if (data.startsWith('faq_') || data === 'menu_faq') {
    await handleFaqCallback(bot, query);
  } else if (data.startsWith('about_') || data.startsWith('dex_page_') || data === 'menu_about') {
    await handleAboutCallback(bot, query);
  } else if (data.startsWith('settings_') || data.startsWith('lang_') || data.startsWith('theme_') || data.startsWith('notif_') || data === 'menu_settings') {
    await handleSettingsCallback(bot, query);
  } else if (data === 'menu_main') {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const user = getUser(userId, query.from);
    const lang = user.lang || 'en';

    try {
      await bot.editMessageText(formatWelcome(lang, query.from.first_name), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: mainMenuKeyboard(lang)
      });
      await bot.answerCallbackQuery(query.id);
    } catch (err) {
      console.error('[Main Menu] Error:', err.message);
    }
  } else if (data === 'market_refresh') {
    await handleMarketCallback(bot, query);
  } else {
    // Unknown callback
    await bot.answerCallbackQuery(query.id, { text: 'Action not recognized' });
  }
});

// =========================
// Message Handler (non-command)
// =========================

bot.on('message', (msg) => {
  // Ignore commands (handled by onText)
  if (msg.text && msg.text.startsWith('/')) return;

  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  // Echo or provide guidance for non-command text
  if (msg.text) {
    bot.sendMessage(chatId,
      `🤖 I didn't understand that.\n\n` +
      `Try one of these commands:\n` +
      `/start, /help, /swap, /market, /faq, /about, /settings`,
      {
        reply_markup: mainMenuKeyboard(lang)
      }
    ).catch(err => {
      console.error('[Message] Error:', err.message);
    });
  }
});

// =========================
// Error Handlers
// =========================

bot.on('polling_error', (err) => {
  console.error('[Bot] Polling error:', err.message);
});

bot.on('webhook_error', (err) => {
  console.error('[Bot] Webhook error:', err.message);
});

process.on('SIGINT', () => {
  console.log('\n[Bot] Shutting down gracefully...');
  if (MODE === 'polling') {
    bot.stopPolling();
  } else {
    bot.deleteWebHook();
  }
  process.exit(0);
});

console.log('[Bot] EACO Swap Bot is running!');

// Export for webhook server usage
module.exports = { bot };
