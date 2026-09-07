/**
 * settings.js - /settings command handler
 */

const { t, getSupportedLanguages } = require('../utils/i18n');
const { formatSettings } = require('../utils/messages');
const { settingsKeyboard, languageKeyboard, backKeyboard, mainMenuKeyboard } = require('../utils/keyboards');
const { getUser, updateUserPref } = require('../middleware/auth');

/**
 * Handle /settings command
 * @param {TelegramBot} bot
 * @param {Message} msg
 */
async function handleSettings(bot, msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = getUser(userId, msg.from);
  const lang = user.lang || 'en';

  try {
    await bot.sendMessage(chatId, formatSettings(lang, user), {
      parse_mode: 'HTML',
      reply_markup: settingsKeyboard(lang),
      disable_web_page_preview: true
    });
  } catch (err) {
    console.error('[Settings] Error:', err.message);
    await bot.sendMessage(chatId, t('error_generic', lang));
  }
}

/**
 * Handle Settings callback queries
 * @param {TelegramBot} bot
 * @param {CallbackQuery} query
 */
async function handleSettingsCallback(bot, query) {
  const userId = query.from.id;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = getUser(userId, query.from);
  const lang = user.lang || 'en';
  const data = query.data;

  try {
    if (data === 'settings_lang') {
      // Show language selection
      const langList = getSupportedLanguages();
      const langText = langList
        .map(l => `${l.flag} ${l.name} ${l.code === lang ? '✓' : ''}`)
        .join('\n');

      await bot.editMessageText(
        `🌐 <b>Select Language</b>\n\n${langText}\n\nTap a language below:`,
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
          reply_markup: languageKeyboard(lang)
        }
      );
    } else if (data.startsWith('lang_')) {
      const newLang = data.replace('lang_', '');
      updateUserPref(userId, 'lang', newLang);

      const updatedUser = getUser(userId);
      await bot.editMessageText(
        `✅ ${t('lang_changed', newLang)}\n\n${formatSettings(newLang, updatedUser)}`,
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
          reply_markup: settingsKeyboard(newLang)
        }
      );
    } else if (data.startsWith('theme_')) {
      const theme = data.replace('theme_', '');
      updateUserPref(userId, 'theme', theme);

      const updatedUser = getUser(userId);
      await bot.editMessageText(formatSettings(updatedUser.lang || 'en', updatedUser), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: settingsKeyboard(updatedUser.lang || 'en')
      });

      await bot.answerCallbackQuery(query.id, { text: `Theme: ${theme}` });
      return;
    } else if (data.startsWith('notif_')) {
      const notifState = data.replace('notif_', '') === 'on';
      updateUserPref(userId, 'notifications', notifState);

      const updatedUser = getUser(userId);
      await bot.editMessageText(formatSettings(updatedUser.lang || 'en', updatedUser), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: settingsKeyboard(updatedUser.lang || 'en')
      });

      await bot.answerCallbackQuery(query.id, {
        text: `Notifications: ${notifState ? 'On' : 'Off'}`
      });
      return;
    } else if (data === 'menu_settings') {
      await bot.editMessageText(formatSettings(lang, user), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: settingsKeyboard(lang)
      });
    } else if (data === 'menu_main') {
      await bot.editMessageText(
        require('../utils/messages').formatWelcome(lang, query.from.first_name),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
          reply_markup: mainMenuKeyboard(lang)
        }
      );
    }

    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.error('[Settings Callback] Error:', err.message);
    await bot.answerCallbackQuery(query.id, { text: t('error_generic', lang) });
  }
}

module.exports = {
  handleSettings,
  handleSettingsCallback
};
