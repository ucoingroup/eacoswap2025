/**
 * swap.js - /swap command handler
 */

const { t } = require('../utils/i18n');
const { formatSwap } = require('../utils/messages');
const { swapKeyboard } = require('../utils/keyboards');
const { getUser } = require('../middleware/auth');
const { getSwapQuote, getAllPrices } = require('../api/client');

/**
 * Handle /swap command
 * @param {TelegramBot} bot
 * @param {Message} msg
 */
async function handleSwap(bot, msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  try {
    // Fetch latest prices to show in the message
    const pricesResult = await getAllPrices();
    let marketData = null;
    if (pricesResult.success) {
      marketData = pricesResult.data;
    }

    const messageText = formatSwap(lang);

    await bot.sendMessage(chatId, messageText, {
      parse_mode: 'HTML',
      reply_markup: swapKeyboard(lang),
      disable_web_page_preview: true
    });
  } catch (err) {
    console.error('[Swap] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

/**
 * Handle swap callback queries
 * @param {TelegramBot} bot
 * @param {CallbackQuery} query
 */
async function handleSwapCallback(bot, query) {
  const userId = query.from.id;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = getUser(userId, query.from);
  const lang = user.lang || 'en';
  const data = query.data;

  try {
    if (data === 'menu_main') {
      await bot.editMessageText(
        require('../utils/messages').formatWelcome(lang, query.from.first_name),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
          reply_markup: require('../utils/keyboards').mainMenuKeyboard(lang)
        }
      );
    }

    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.error('[Swap Callback] Error:', err.message);
    await bot.answerCallbackQuery(query.id, { text: t('error_generic', lang) });
  }
}

module.exports = {
  handleSwap,
  handleSwapCallback
};
