/**
 * faq.js - /faq command handler
 */

const { t } = require('../utils/i18n');
const { formatFaq, formatFaqAnswer } = require('../utils/messages');
const { faqKeyboard, backKeyboard } = require('../utils/keyboards');
const { getUser } = require('../middleware/auth');

/**
 * Handle /faq command
 * @param {TelegramBot} bot
 * @param {Message} msg
 */
async function handleFaq(bot, msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  try {
    await bot.sendMessage(chatId, formatFaq(lang), {
      parse_mode: 'HTML',
      reply_markup: faqKeyboard(lang),
      disable_web_page_preview: true
    });
  } catch (err) {
    console.error('[FAQ] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

/**
 * Handle FAQ callback queries
 * @param {TelegramBot} bot
 * @param {CallbackQuery} query
 */
async function handleFaqCallback(bot, query) {
  const userId = query.from.id;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = getUser(userId, query.from);
  const lang = user.lang || 'en';
  const data = query.data;

  try {
    if (data.startsWith('faq_')) {
      const topic = data;
      const answer = formatFaqAnswer(topic, lang);

      await bot.editMessageText(answer, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: backKeyboard(lang, 'menu_faq'),
        disable_web_page_preview: true
      });
    } else if (data === 'menu_faq') {
      await bot.editMessageText(formatFaq(lang), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: faqKeyboard(lang),
        disable_web_page_preview: true
      });
    }

    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.error('[FAQ Callback] Error:', err.message);
    await bot.answerCallbackQuery(query.id, { text: t('error_generic', lang) });
  }
}

module.exports = {
  handleFaq,
  handleFaqCallback
};
