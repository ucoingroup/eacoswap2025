/**
 * about.js - /about command handler
 */

const { t } = require('../utils/i18n');
const { formatAbout, formatDexList, formatContractInfo } = require('../utils/messages');
const { aboutKeyboard, dexListKeyboard, backKeyboard } = require('../utils/keyboards');
const { getUser } = require('../middleware/auth');

/**
 * Handle /about command
 * @param {TelegramBot} bot
 * @param {Message} msg
 */
async function handleAbout(bot, msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  try {
    await bot.sendMessage(chatId, formatAbout(lang), {
      parse_mode: 'HTML',
      reply_markup: aboutKeyboard(lang),
      disable_web_page_preview: false
    });
  } catch (err) {
    console.error('[About] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

/**
 * Handle About callback queries
 * @param {TelegramBot} bot
 * @param {CallbackQuery} query
 */
async function handleAboutCallback(bot, query) {
  const userId = query.from.id;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = getUser(userId, query.from);
  const lang = user.lang || 'en';
  const data = query.data;

  try {
    if (data === 'about_dexlist') {
      await bot.editMessageText(formatDexList(0), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: dexListKeyboard(lang, 0),
        disable_web_page_preview: false
      });
    } else if (data === 'about_contract') {
      await bot.editMessageText(formatContractInfo(), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: backKeyboard(lang, 'menu_about'),
        disable_web_page_preview: false
      });
    } else if (data.startsWith('dex_page_')) {
      const page = parseInt(data.replace('dex_page_', ''), 10) || 0;
      await bot.editMessageText(formatDexList(page), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: dexListKeyboard(lang, page),
        disable_web_page_preview: false
      });
    } else if (data === 'menu_about') {
      await bot.editMessageText(formatAbout(lang), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: aboutKeyboard(lang),
        disable_web_page_preview: false
      });
    }

    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.error('[About Callback] Error:', err.message);
    await bot.answerCallbackQuery(query.id, { text: t('error_generic', lang) });
  }
}

module.exports = {
  handleAbout,
  handleAboutCallback
};
