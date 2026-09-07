/**
 * webhook.js - Express server for Telegram WebHook mode
 * Receives updates from Telegram and forwards to the bot
 */

require('dotenv').config();

const express = require('express');
const { bot } = require('./bot');

const app = express();
const PORT = parseInt(process.env.PORT || '8443', 10);
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'eacoswap-telegram-bot',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// WebHook endpoint for Telegram updates
app.post('/webhook', (req, res) => {
  // Verify secret token if configured (recommended for production)
  if (WEBHOOK_SECRET) {
    const secretHeader = req.headers['x-telegram-bot-api-secret-token'];
    if (secretHeader !== WEBHOOK_SECRET) {
      console.warn('[Webhook] Secret token mismatch');
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
  }

  // Process the update
  bot.processUpdate(req.body);

  // Always return 200 quickly to Telegram
  res.status(200).json({ ok: true });
});

// Optional: API endpoints for WebApp backend integration
app.get('/api/user/:userId', (req, res) => {
  const { getUser } = require('./middleware/auth');
  const user = getUser(parseInt(req.params.userId, 10));

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  res.json({ success: true, data: user });
});

app.get('/api/health/backend', async (req, res) => {
  const { healthCheck } = require('./api/client');
  const result = await healthCheck();
  res.status(result.success ? 200 : 503).json(result);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Webhook Server] Error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`[Webhook Server] Listening on port ${PORT}`);
  console.log(`[Webhook Server] Webhook endpoint: POST /webhook`);
  console.log(`[Webhook Server] Health check: GET /health`);

  if (WEBHOOK_SECRET) {
    console.log('[Webhook Server] Secret token protection: ENABLED');
  } else {
    console.warn('[Webhook Server] Warning: No WEBHOOK_SECRET set. It is recommended to set one in production.');
  }
});

module.exports = { app };
