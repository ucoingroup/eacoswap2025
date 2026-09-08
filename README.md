# EACOswap Pro - Solana DEX Navigation & EACO Exchange Hub

> Programmer-grade, production-ready multi-platform ecosystem for navigating Solana DEXs and exchanging EACO token.
> 
> **四端矩阵**: Web + Android + iOS + Telegram Mini App — 统一后端，多平台覆盖。

📖 **项目总览**: [EACOSWAP_MATRIX.md](EACOSWAP_MATRIX.md) — 完整的四端矩阵架构、统一数据契约和快速启动指南。

## Four-End Matrix 四端矩阵

| 端 | 技术栈 | 文件数 | 核心功能 |
|---|---|---|---|
| **Web** | HTML5 + CSS3 + Vanilla JS | 7 | DEX导航、兑换、市值排行、6语言、3主题、PWA |
| **Android** | Kotlin + WebView 混合 | 37 | 原生App、钱包deeplink、5Tab、离线页面 |
| **iOS** | Swift + WKWebView 混合 | 48 | 原生App、Universal Links、RTL支持、5Tab |
| **Telegram** | React + Vite + TMA SDK + Bot API | 55 | Mini App、Bot命令、TonConnect、深度链接 |
| **共享后端** | Node.js Express | 6 | API代理、Helius/CoinGecko/Birdeye/Jupiter |

**总文件数**: 157+（不含 node_modules）

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (bundled with Node.js)
- **Docker** (optional, for containerized deployment)

---

## Option A: Local Development

```bash
# 1. Clone or download this project
cd eacoswap-pro

# 2. Configure API keys
cp backend/.env.example backend/.env
# Edit backend/.env and fill in your Helius API key:
#   HELIUS_API_KEY=your_actual_key_here
#   BIRDEYE_API_KEY=your_birdeye_key_here  (optional)

# 3. Install backend dependencies
cd backend
npm install

# 4. Start the server
npm start

# 5. Open in browser
# http://localhost:3000
```

The backend serves both the API (`/api/*`) and the frontend static files, so you only need one server.

### Development Mode (with auto-reload)

```bash
cd backend
npm install   # first time only
npm run dev   # uses nodemon for auto-reload on file changes
```

---

## Option B: Docker Deployment

```bash
# 1. Configure API keys
cp backend/.env.example backend/.env
# Edit backend/.env with your keys

# 2. Build and start
docker compose up -d --build

# 3. Verify
curl http://localhost:3000/api/health
# Expected: {"status":"ok","services":{...}}

# 4. Open in browser
# http://localhost:3000

# Stop:
docker compose down
```

---

## Option C: Cloud Deployment

### Vercel / Netlify (Frontend + Serverless API)

The frontend is pure static HTML/CSS/JS and can be deployed directly. The backend API endpoints need to be converted to serverless functions for Vercel/Netlify:

1. **Frontend-only**: Deploy `frontend/` as a static site. API calls will fall back to direct public endpoints (CoinGecko free API, Solana public RPC).
2. **Full-stack on Vercel**: Move each `/api/*` route from `backend/routes/api.js` into separate files under `/api/[route].js` in the project root. Use `@vercel/node` as the runtime.

### Cloudflare Pages + Workers

1. Deploy `frontend/` to Cloudflare Pages.
2. Move backend API logic to Cloudflare Workers (compatible with `fetch` API).
3. Set API keys as Worker environment variables (secrets).

### Traditional VPS / Dedicated Server

```bash
# 1. Clone repo to server
git clone <your-repo> /opt/eacoswap
cd /opt/eacoswap

# 2. Configure
cp backend/.env.example backend/.env
nano backend/.env  # fill in keys

# 3. Docker
docker compose up -d --build

# 4. Nginx reverse proxy (recommended)
# Point your domain to localhost:3000
```

Example Nginx config:

```nginx
server {
    listen 80;
    server_name eacoswap.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## API Key Configuration

All API keys are stored **server-side only** in `backend/.env`. They are **never** hardcoded in frontend code, never exposed in network responses, and never included in Docker images.

### Required Keys

| Key | Where to Get | Free Tier | Purpose |
|-----|-------------|-----------|---------|
| `HELIUS_API_KEY` | [dashboard.helius.dev](https://dashboard.helius.dev) | 1M credits/month | Solana RPC, DAS API, token account queries |
| `BIRDEYE_API_KEY` | [birdeye.so](https://birdeye.so) | Limited requests/day | Token metadata, price data (optional) |

### Optional Keys

| Key | Where to Get | Purpose |
|-----|-------------|---------|
| `JUPITER_API_KEY` | [jup.ag](https://jup.ag) | Enhanced rate limits for Jupiter quote API (basic quotes are free) |

### Not Required (Free APIs)

- **CoinGecko**: Market cap rankings, SOL price — no key needed
- **Jupiter**: Swap quote aggregator — basic API is free
- **Solana Public RPC**: Fallback when Helius is not configured

### `.env` Reference

See `backend/.env.example` for the full template:

```env
PORT=3000
HELIUS_API_KEY=YOUR_HELIUS_API_KEY_HERE
BIRDEYE_API_KEY=YOUR_BIRDEYE_API_KEY_HERE
RATE_LIMIT_PER_MINUTE=60
CORS_ORIGINS=*
CACHE_TTL=60
```

---

## Project Structure

```
eacoswap-pro/
|-- Dockerfile                  # Multi-stage Docker build
|-- docker-compose.yml          # Container orchestration
|-- .dockerignore               # Docker build exclusions
|-- README.md                   # This file
|
|-- backend/                    # Node.js + Express API proxy
|   |-- server.js               # Main server entry (helmet, CORS, rate-limit, static serve)
|   |-- package.json            # Dependencies & scripts
|   |-- .env.example            # Environment variable template
|   |-- .env                    # Your actual keys (gitignored, not in Docker image)
|   |-- .gitignore
|   |-- routes/
|       |-- api.js              # 10 API endpoints (Helius, CoinGecko, Birdeye, Jupiter)
|
|-- frontend/                   # Static PWA frontend
    |-- index.html              # Single-page app (443 lines)
    |-- styles.css             # 3 themes (cosmic/army/classic) + responsive (280 lines)
    |-- manifest.json           # PWA manifest
    |-- sw.js                   # Service worker (offline cache)
    |-- js/
        |-- app.js              # Core logic (1017 lines): i18n, wallet, swap quote, market cap
```

---

## API Endpoints

All endpoints are prefixed with `/api`. The backend acts as a secure proxy — it injects API keys server-side and never exposes them to the client.

| Method | Path | Description | Key Needed |
|--------|------|-------------|------------|
| GET | `/api/sol-price` | SOL current price (CoinGecko) | No |
| GET | `/api/tokens/market-cap?range=top100` | SOL chain token rankings (CoinGecko) | No |
| POST | `/api/helius/rpc` | Forward Solana JSON-RPC calls | Helius |
| GET | `/api/helius/das/assets-by-owner?owner=...` | Get assets by owner (DAS API) | Helius |
| GET | `/api/helius/token-accounts?mint=...` | Count token holders by mint | Helius |
| GET | `/api/birdeye/token/:address` | Token metadata (Birdeye, CoinGecko fallback) | Birdeye (optional) |
| GET | `/api/birdeye/price/:address` | Token price (Birdeye, CoinGecko fallback) | Birdeye (optional) |
| GET | `/api/jupiter/quote?inputMint=...&outputMint=...&amount=...` | Jupiter v6 swap quote | No |
| GET | `/api/health` | Server health & key configuration status | No |
| GET | `/api/config` | Frontend-safe configuration (no keys exposed) | No |

### Health Check Response

```bash
curl http://localhost:3000/api/health
```

```json
{
  "status": "ok",
  "timestamp": "2026-09-07T12:00:00.000Z",
  "services": {
    "helius": "configured",
    "birdeye": "not configured",
    "coingecko": "available",
    "jupiter": "available"
  }
}
```

---

## Frontend Features

### Core Capabilities

- **Top 10 Solana DEX Navigation**: Jupiter, Raydium, Orca, Meteora, Phoenix, Lifinity, Drift, Zeta, Crema, Saros
- **EACO Exchange Hub**: Swap paths for SOL, USDT, USDC, wBNB, TRX, wETH, wBTC, eCNH (all on Solana chain)
- **EACO Swap Quote Calculator**: Input EACO amount, get Jupiter v6 best route, output amount, slippage, price impact
- **Solana Wallet Connection**: Phantom, Solflare, Backpack (native `window` API, no SDK dependency)
- **Market Cap Rankings**: Top 100 / Top 1000 / Top 10000 SPL tokens, daily/weekly/monthly updates
- **10 Block Explorers**: Solscan, SolanaFM, Solana Explorer, Birdeye, DexScreener, OrbMarkets, etc.
- **Developer Tools Panel**: Helius RPC endpoint, EACO contract info, OrbMarkets integration links

### Multi-language (6 languages with auto-detect)

| Code | Language | RTL |
|------|----------|-----|
| `en` | English | No |
| `zh` | 华语 (Huáyǔ) | No |
| `es` | Spanish | No |
| `ar` | Arabic | Yes |
| `fr` | French | No |
| `ru` | Russian | No |

Language preference is saved in `localStorage` and auto-detected from browser on first visit.

### Multi-theme (3 design styles)

| Theme | Key | Description |
|-------|-----|-------------|
| Cosmic Blue | `cosmic` | Deep space gradient, starfield background |
| Army Green | `army` | Military olive, tactical aesthetic |
| Classic Beige | `classic` | Warm parchment, vintage typography |

Theme preference is saved in `localStorage`.

### PWA Support

- **Installable**: Add to home screen on mobile/desktop
- **Offline capable**: Core pages cached by service worker
- **Auto-update**: New versions detected on next visit

---

## Key Constants

```
EACO Contract:  DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH
EACO on OrbMarkets:  https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH
EACO Charity 2025:  https://ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html
```

### EACO Exchange Pairs (OrbMarkets links)

| Token | Contract (Solana) | OrbMarkets |
|-------|-------------------|------------|
| eCNH | 7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5 | [Link](https://orbmarkets.io/token/7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5) |
| TRX | GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc | [Link](https://orbmarkets.io/token/GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc) |
| wBTC | 3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh | [Link](https://orbmarkets.io/token/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh) |
| wBNB | 9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa | [Link](https://orbmarkets.io/token/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa) |
| USDC | EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v | [Link](https://orbmarkets.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v) |
| USDT | Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB | [Link](https://orbmarkets.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB) |
| wETH | 7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs | [Link](https://orbmarkets.io/token/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs) |

---

## Security Notes

1. **API Keys**: Never hardcoded in frontend. Stored only in `backend/.env` (gitignored). In Docker, injected via `env_file` or `-e` flags; the `.dockerignore` excludes `.env` from the image.
2. **Helmet**: Sets security headers (CSP, X-Frame-Options, etc.).
3. **Rate Limiting**: Default 60 requests/minute per IP (configurable).
4. **CORS**: Configurable via `CORS_ORIGINS` environment variable.
5. **Non-root Docker**: Production container runs as `appuser`.

---

## Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version  # must be >= 18

# Check if port 3000 is in use
lsof -i :3000    # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Try a different port
PORT=8080 npm start
```

### Frontend shows "API temporarily unavailable"
- Backend is not running: start with `npm start` in `backend/`
- CORS issue: ensure `CORS_ORIGINS` in `.env` includes your origin
- Rate limit exceeded: increase `RATE_LIMIT_PER_MINUTE` in `.env`

### Helius RPC fails
- Check if `HELIUS_API_KEY` is set in `backend/.env`
- Verify key at [dashboard.helius.dev](https://dashboard.helius.dev)
- The app falls back to Solana public RPC automatically

### Docker build fails
```bash
# Rebuild from scratch
docker compose build --no-cache
docker compose up -d
```

### PWA not installing
- Serve over HTTPS (or `localhost`) — service workers require secure context
- Check browser console for SW registration errors
- Ensure `manifest.json` and `sw.js` are in the `frontend/` directory

---

## Mobile Apps 移动应用

### Android App

位于 `eacoswap-android/` 目录，完整 Kotlin + WebView 混合方案。

```bash
cd eacoswap-android
# Android Studio: File -> Open -> 选择 eacoswap-android 目录
# 或命令行:
./gradlew assembleDebug
```

**功能**: 5 Tab导航（首页/兑换/行情/FAQ/设置）、钱包连接（Phantom/Solflare/Backpack deeplink）、6语言、3主题、离线页面、PWA兼容。

**详见**: [eacoswap-android/README_ANDROID.md](eacoswap-android/README_ANDROID.md)

### iOS App

位于 `eacoswap-ios/` 目录，完整 Swift + WKWebView 混合方案。

```bash
cd eacoswap-ios
open EACOswap.xcodeproj
# Xcode 中 ⌘+R 运行
```

**功能**: 5 Tab导航、钱包连接（Universal Links）、RTL阿拉伯语支持、6语言、3主题、离线页面、原生性能。

**详见**: [eacoswap-ios/README_IOS.md](eacoswap-ios/README_IOS.md)

---

## Telegram Mini App

位于 `telegram-bot/`（Bot后端）和 `telegram-miniapp/`（前端）目录。

### Bot 后端启动

```bash
cd telegram-bot
cp .env.example .env
# 编辑 .env: BOT_TOKEN=your_bot_token, WEBAPP_URL=your_webapp_url
npm install

# 长轮询模式（开发）
node bot.js

# WebHook 模式（生产）
node webhook.js
```

### Mini App 前端构建

```bash
cd telegram-miniapp
cp .env.example .env
# 编辑 .env: VITE_BACKEND_URL=https://your-backend.com
npm install
npm run build
# 部署 dist/ 目录到 CDN 或静态托管
```

**BotFather 配置**:
1. `/newbot` 创建 Bot，获取 Token
2. `/mybots` -> 选择 Bot -> Bot Settings -> Menu Button -> Configure menu button
3. 设置 Menu Button URL 为你的 WebApp 托管地址
4. `/setcommands` 设置命令列表

**功能**: TMA SDK v8+ 集成、TonConnect 2.0 + WalletConnect、5 Tab、100 FAQ、6语言、3主题、深度链接启动、原生交互（Haptic/BackButton/MainButton）。

**详见**: 
- [telegram-bot/README_BOT.md](telegram-bot/README_BOT.md)
- [telegram-miniapp/README_TMA.md](telegram-miniapp/README_TMA.md)

---

## Static Version

A standalone single-file HTML version (no backend required) is available as `eacoswap.html` in the parent directory. It uses CoinGecko free API directly and falls back to Solana public RPC when Helius key is not provided.

---

## GitHub Repository

- **仓库**: https://github.com/ucoingroup/eacoswap2025
- **分支**: main
- **提交历史**: 
  - `84590fe` — Telegram Mini App (Bot + Frontend)
  - `dc8095e` — Android + iOS App
  - `14123a4` — 部署文档 eacoswap2025.md
  - `1ffca89` — FAQ 100问答 + Docker
  - `384c0dc` — 初始全栈工程

---

## License

Open source. EACO token is a community project on Solana blockchain.

## Links

- EACO on OrbMarkets: [orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH](https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH)
- EACO Charity 2025: [ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html](https://ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html)

---

> ⚠️ **声明**：本项目由 eaco europe group 内部测试使用。**安全第一，仅供参考。** 所有代码、配置和部署文档均为技术研究和学习用途，不构成任何投资建议。使用本系统产生的任何后果由使用者自行承担。
