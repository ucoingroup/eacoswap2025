/**
 * auth.js - User authentication and start parameter parsing middleware
 */

const { detectLanguage } = require('../utils/i18n');

// In-memory user preferences store (replace with DB in production)
const userStore = new Map();

// Valid startapp parameters for routing
const VALID_STARTAPP_PAGES = ['swap', 'market', 'faq', 'settings', 'about', 'help'];

/**
 * Parse Telegram WebApp init data and validate
 * @param {string} initData - Raw initData string from WebApp
 * @returns {Object|null} Parsed user data or null if invalid
 */
function parseWebAppInitData(initData) {
  if (!initData) return null;

  try {
    const params = new URLSearchParams(initData);
    const data = {};

    for (const [key, value] of params) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    }

    // Validate hash if BOT_TOKEN is available (production)
    const botToken = process.env.BOT_TOKEN;
    if (botToken && data.hash) {
      const crypto = require('crypto');
      const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
      const checkString = Object.keys(data)
        .filter(k => k !== 'hash')
        .sort()
        .map(k => `${k}=${data[k]}`)
        .join('\n');
      const hash = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

      if (hash !== data.hash) {
        console.warn('[Auth] WebApp initData hash mismatch');
        return null;
      }
    }

    return data;
  } catch (err) {
    console.error('[Auth] Failed to parse initData:', err.message);
    return null;
  }
}

/**
 * Parse start parameter from Telegram deep link
 * t.me/{bot}?start={param} or t.me/{bot}?startapp={param}
 * @param {string} param - Raw start parameter
 * @returns {Object} Parsed route and extra data
 */
function parseStartParam(param = '') {
  if (!param) {
    return { page: 'home', extra: {} };
  }

  // URL-safe base64 decode attempt
  let decoded = param;
  try {
    // Replace URL-safe chars
    const base64 = param.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    decoded = Buffer.from(padded, 'base64').toString('utf8');
  } catch {
    decoded = param;
  }

  // Try JSON parse
  try {
    const json = JSON.parse(decoded);
    if (VALID_STARTAPP_PAGES.includes(json.page)) {
      return { page: json.page, extra: json };
    }
  } catch {
    // Not JSON, treat as plain string
  }

  // Check if it's a valid page name directly
  const page = decoded.split('_')[0];
  if (VALID_STARTAPP_PAGES.includes(page)) {
    return { page, extra: { raw: decoded } };
  }

  // Default fallback
  return { page: 'home', extra: { raw: param } };
}

/**
 * Build startapp parameter for deep linking
 * @param {string} page - Target page
 * @param {Object} extra - Extra parameters
 * @returns {string} URL-safe base64 string
 */
function buildStartParam(page, extra = {}) {
  const payload = JSON.stringify({ page, ...extra, ts: Date.now() });
  return Buffer.from(payload)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Get or create user preferences
 * @param {number} userId - Telegram user ID
 * @param {Object} userInfo - Telegram user object
 * @returns {Object} User preferences
 */
function getUser(userId, userInfo = {}) {
  if (!userStore.has(userId)) {
    const detectedLang = detectLanguage(userInfo);
    userStore.set(userId, {
      userId,
      lang: detectedLang,
      theme: 'auto',
      notifications: true,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      ...userInfo
    });
  } else {
    // Update last active
    const user = userStore.get(userId);
    user.lastActive = new Date().toISOString();
    userStore.set(userId, user);
  }

  return userStore.get(userId);
}

/**
 * Update user preference
 * @param {number} userId - Telegram user ID
 * @param {string} key - Preference key
 * @param {any} value - Preference value
 * @returns {Object} Updated user
 */
function updateUserPref(userId, key, value) {
  const user = userStore.get(userId);
  if (!user) return null;

  user[key] = value;
  user.updatedAt = new Date().toISOString();
  userStore.set(userId, user);
  return user;
}

/**
 * Get all stored users (admin/debug)
 * @returns {Array} Users array
 */
function getAllUsers() {
  return Array.from(userStore.values());
}

/**
 * Express middleware to attach user to request
 */
function authMiddleware(req, res, next) {
  const initData = req.headers['x-telegram-init-data'] || req.query.initData;

  if (initData) {
    const parsed = parseWebAppInitData(initData);
    if (parsed && parsed.user) {
      req.telegramUser = parsed.user;
      req.user = getUser(parsed.user.id, parsed.user);
    }
  }

  next();
}

/**
 * Check if user is authorized (basic check)
 */
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Please open via Telegram WebApp.'
    });
  }
  next();
}

module.exports = {
  parseWebAppInitData,
  parseStartParam,
  buildStartParam,
  getUser,
  updateUserPref,
  getAllUsers,
  authMiddleware,
  requireAuth,
  VALID_STARTAPP_PAGES,
  userStore
};
