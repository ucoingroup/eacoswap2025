/**
 * help.js - /help command handler
 */

const { t } = require('../utils/i18n');
const { formatHelp } = require('../utils/messages');
const { helpKeyboard } = require('../utils/keyboards');
const { getUser } = require('../middleware/auth');

/**
 * Handle /help command
 * @param {TelegramBot} bot
 * @param {Message} msg
 */
async function handleHelp(bot, msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  try {
    await bot.sendMessage(chatId, formatHelp(lang), {
      parse_mode: 'HTML',
      reply_markup: helpKeyboard(lang),
      disable_web_page_preview: true
    });
  } catch (err) {
    console.error('[Help] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

module.exports = { handleHelp };
