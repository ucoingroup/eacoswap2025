/**
 * market.js - /market command handler
 */

const { t } = require('../utils/i18n');
const { formatMarket } = require('../utils/messages');
const { marketKeyboard } = require('../utils/keyboards');
const { getUser } = require('../middleware/auth');
const { getAllPrices, getMarketOverview } = require('../api/client');

/**
 * Handle /market command
 * @param {TelegramBot} bot
 * @param {Message} msg
 */
async function handleMarket(bot, msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  try {
    // Fetch market data from backend
    const [pricesResult, overviewResult] = await Promise.all([
      getAllPrices().catch(() => ({ success: false })),
      getMarketOverview().catch(() => ({ success: false }))
    ]);

    const marketData = {
      prices: pricesResult.success ? pricesResult.data : null,
      changes: overviewResult.success ? overviewResult.data?.changes : null
    };

    const messageText = formatMarket(lang, marketData);

    await bot.sendMessage(chatId, messageText, {
      parse_mode: 'HTML',
      reply_markup: marketKeyboard(lang),
      disable_web_page_preview: true
    });
  } catch (err) {
    console.error('[Market] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

/**
 * Handle market callback queries
 * @param {TelegramBot} bot
 * @param {CallbackQuery} query
 */
async function handleMarketCallback(bot, query) {
  const userId = query.from.id;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = getUser(userId, query.from);
  const lang = user.lang || 'en';
  const data = query.data;

  try {
    if (data === 'market_refresh') {
      // Refresh market data
      await bot.answerCallbackQuery(query.id, { text: t('loading', lang) });

      const [pricesResult, overviewResult] = await Promise.all([
        getAllPrices().catch(() => ({ success: false })),
        getMarketOverview().catch(() => ({ success: false }))
      ]);

      const marketData = {
        prices: pricesResult.success ? pricesResult.data : null,
        changes: overviewResult.success ? overviewResult.data?.changes : null
      };

      await bot.editMessageText(formatMarket(lang, marketData), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: marketKeyboard(lang),
        disable_web_page_preview: true
      });
      return;
    } else if (data === 'menu_main') {
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
    console.error('[Market Callback] Error:', err.message);
    await bot.answerCallbackQuery(query.id, { text: t('error_generic', lang) });
  }
}

module.exports = {
  handleMarket,
  handleMarketCallback
};
