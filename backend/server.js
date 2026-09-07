/**
 * EACOswap Backend Server
 * Secure API Proxy for Solana DEX Navigation
 * 
 * Features:
 * - Securely proxies Helius, CoinGecko, Birdeye, Jupiter APIs
 * - API Keys stored server-side (never exposed to frontend)
 * - Rate limiting & CORS protection
 * - Response caching for performance
 * - Health monitoring
 * 
 * Environment Variables:
 *   PORT, HELIUS_API_KEY, BIRDEYE_API_KEY, RATE_LIMIT_PER_MINUTE, CORS_ORIGINS
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

// ===== Configuration =====
const PORT = process.env.PORT || 3000;
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '*').split(',').map(s => s.trim());
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT_PER_MINUTE || '60');

const app = express();

// ===== Security Middleware =====
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https:", "http:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
    },
  },
}));

// ===== CORS =====
app.use(cors({
  origin: CORS_ORIGINS.includes('*') ? true : CORS_ORIGINS,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ===== Rate Limiting =====
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: RATE_LIMIT,
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ===== Body Parsing =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== Compression =====
app.use(compression());

// ===== Request Logging =====
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ===== API Routes =====
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// ===== Static Frontend Serving (Production) =====
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== Fallback to index.html for SPA routes =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('  EACOswap Backend Server v1.0.0');
  console.log('========================================');
  console.log(`  Port:        ${PORT}`);
  console.log(`  CORS:        ${CORS_ORIGINS.join(', ')}`);
  console.log(`  Rate Limit:  ${RATE_LIMIT} req/min`);
  console.log(`  Helius:      ${process.env.HELIUS_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`  Birdeye:     ${process.env.BIRDEYE_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`  CoinGecko:   Available (free)`);
  console.log(`  Jupiter:     Available (free)`);
  console.log('----------------------------------------');
  console.log(`  API Base:    http://localhost:${PORT}/api`);
  console.log(`  Health:      http://localhost:${PORT}/api/health`);
  console.log('========================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
