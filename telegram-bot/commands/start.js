/**
 * start.js - /start command handler
 * Supports deep link startapp parameter parsing
 */

const { t } = require('../utils/i18n');
const { formatWelcome, formatDeepLinkWelcome } = require('../utils/messages');
const { mainMenuKeyboard } = require('../utils/keyboards');
const { getUser, parseStartParam } = require('../middleware/auth');

/**
 * Handle /start command with optional deep link parameter
 * @param {TelegramBot} bot
 * @param {Message} msg
 * @param {string} startParam - Deep link parameter from /start command
 */
async function handleStart(bot, msg, startParam = '') {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';
  const userName = msg.from.first_name || msg.from.username || '';

  try {
    let messageText;
    let keyboard;

    // Parse start parameter (e.g., startapp=swap)
    if (startParam) {
      const parsed = parseStartParam(startParam);
      const page = parsed.page || 'home';

      messageText = formatDeepLinkWelcome(lang, page);
      keyboard = mainMenuKeyboard(lang, page);

      // Send a follow-up with the actual page content if needed
      await bot.sendMessage(chatId, messageText, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
        disable_web_page_preview: true
      });

      // If it's a specific page, send a second message with that page's content
      if (page !== 'home') {
        const pageMessages = {
          swap: require('../utils/messages').formatSwap(lang),
          market: require('../utils/messages').formatMarket(lang),
          faq: require('../utils/messages').formatFaq(lang),
          settings: require('../utils/messages').formatSettings(lang, user),
          about: require('../utils/messages').formatAbout(lang)
        };

        const pageKeyboards = {
          swap: require('../utils/keyboards').swapKeyboard(lang),
          market: require('../utils/keyboards').marketKeyboard(lang),
          faq: require('../utils/keyboards').faqKeyboard(lang),
          settings: require('../utils/keyboards').settingsKeyboard(lang),
          about: require('../utils/keyboards').aboutKeyboard(lang)
        };

        if (pageMessages[page]) {
          await bot.sendMessage(chatId, pageMessages[page], {
            parse_mode: 'HTML',
            reply_markup: pageKeyboards[page],
            disable_web_page_preview: true
          });
        }
      }
    } else {
      // Regular start
      messageText = formatWelcome(lang, userName);
      keyboard = mainMenuKeyboard(lang);

      await bot.sendMessage(chatId, messageText, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
        disable_web_page_preview: true
      });
    }
  } catch (err) {
    console.error('[Start] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

module.exports = { handleStart };
