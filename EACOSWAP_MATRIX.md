# EACOswap 四端矩阵总览

## 项目仓库
- **GitHub**: https://github.com/ucoingroup/eacoswap2025
- **当前 Commit**: `84590fe` (main 分支)
- **总文件数**: 157+ (不含 node_modules)

---

## 四端矩阵架构

| 端 | 技术栈 | 文件数 | 核心功能 | 用户场景 |
|---|---|---|---|---|
| **Web** | HTML5 + CSS3 + Vanilla JS | 7 | DEX导航、代币兑换、市值排行、6语言、3主题、PWA | 浏览器即开即用 |
| **Android** | Kotlin + WebView 混合 | 37 | 原生App、钱包deeplink、5Tab、离线页面 | Android用户 |
| **iOS** | Swift + WKWebView 混合 | 48 | 原生App、Universal Links、RTL支持、5Tab | iOS用户 |
| **Telegram** | React + Vite + TMA SDK + Bot API | 55(18+37) | TMA Mini App、Bot命令、深度链接、TonConnect | Telegram用户 |

**共享后端**: Node.js Express (`backend/` 6 文件) — API代理、Helius/CoinGecko/Birdeye/Jupiter

---

## 统一数据契约

### EACO 合约地址
```
DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH
```

### 9 种支持代币
| 代币 | 合约地址 | OrbMarkets |
|---|---|---|
| EACO | DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH | [查看](https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH) |
| SOL | So11111111111111111111111111111111111111112 | — |
| USDT | Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB | [查看](https://orbmarkets.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB) |
| USDC | EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v | [查看](https://orbmarkets.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v) |
| wETH | 7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs | [查看](https://orbmarkets.io/token/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs) |
| wBTC | 3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh | [查看](https://orbmarkets.io/token/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh) |
| wBNB | 9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa | [查看](https://orbmarkets.io/token/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa) |
| TRX | GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc | [查看](https://orbmarkets.io/token/GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc) |
| eCNH | 7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5 | [查看](https://orbmarkets.io/token/7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5) |

### 10 大 DEX
Jupiter, Raydium, Orca, Meteora, Phoenix, Lifinity, Drift, Zeta Markets, Crema Finance, Saros Finance

### 公益链接
```
https://ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html
```

---

## 后端 API 端点 (统一响应格式: `{ success: true, data: {...} }`)

| 端点 | 说明 |
|---|---|
| `GET /api/health` | 健康检查 |
| `GET /api/config` | 前端配置（不含敏感Key） |
| `GET /api/sol-price` | SOL 实时价格 |
| `GET /api/tokens/market-cap` | 代币市值排行 |
| `GET /api/jupiter/quote` | Jupiter 兑换报价 |
| `POST /api/helius/rpc` | Helius RPC 代理 |
| `GET /api/helius/das/assets-by-owner/:owner` | 用户资产查询 |
| `GET /api/birdeye/token/:address` | Birdeye 代币详情 |
| `GET /api/birdeye/price/:address` | Birdeye 实时价格 |

---

## 多语言支持 (6 种)

| 代码 | 语言 | 状态 |
|---|---|---|
| en | English | ✅ 完整 |
| zh | 华语 | ✅ 完整 |
| es | Español | ✅ 完整 |
| ar | العربية | ✅ 完整 (含 RTL) |
| fr | Français | ✅ 完整 |
| ru | Русский | ✅ 完整 |

---

## 三套主题

| 主题 | 主背景 | 强调色 | 适用场景 |
|---|---|---|---|
| **Cosmic** 宇宙蓝 | `#0a1628` | `#64ffda` | 科技感、夜间 |
| **Army** 军绿 | `#1b2a1b` | `#c3b091` | 沉稳、护眼 |
| **Classic** 米黄古典 | `#f5f0e8` | `#8b0000` | 传统、日间 |

---

## 各端快速启动

### Web 端
```bash
cd frontend
# 直接用浏览器打开 index.html，或使用任意 HTTP 服务器
npx serve .
```

### Android
```bash
cd eacoswap-android
# Android Studio: File -> Open -> 选择 eacoswap-android 目录
# 或命令行:
./gradlew assembleDebug
```

### iOS
```bash
cd eacoswap-ios
open EACOswap.xcodeproj
# Xcode 中 ⌘+R 运行
```

### Telegram Mini App
```bash
# 前端
cd telegram-miniapp
cp .env.example .env
npm install
npm run build
# 部署 dist/ 到 CDN

# 后端 Bot
cd telegram-bot
cp .env.example .env
npm install
node bot.js        # 长轮询模式
# 或
node webhook.js    # WebHook 模式
```

### 后端服务
```bash
cd backend
cp .env.example .env
npm install
node server.js     # 端口 3000

# Docker 部署
cd ..
docker compose up -d --build
```

---

## 安全规范

- ❌ **禁止**在任何源码文件中硬编码 API Key / Bot Token / 私钥
- ✅ 所有敏感配置通过 `.env` 注入
- ✅ `.env` 已加入 `.gitignore`
- ✅ 后端 `.env.example` 仅含占位符
- ✅ Helius/Birdeye/CoinGecko Key 仅存在于服务端

---

## 文件结构树

```
eacoswap-pro/
├── backend/                  # Node.js Express 后端 (6文件)
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── routes/
│       └── api.js
├── frontend/                 # Web 前端 (7文件)
│   ├── index.html
│   ├── styles.css
│   ├── faq.html
│   ├── js/app.js
│   ├── manifest.json
│   └── sw.js
├── eacoswap-android/         # Android App (37文件)
│   ├── app/build.gradle.kts
│   ├── app/src/main/
│   │   ├── java/com/eaco/swap/
│   │   │   ├── MainActivity.kt
│   │   │   ├── WebAppInterface.kt
│   │   │   ├── WalletManager.kt
│   │   │   ├── ApiService.kt
│   │   │   ├── ThemeManager.kt
│   │   │   ├── LocaleManager.kt
│   │   │   └── SettingsFragment.kt
│   │   └── res/values-*/     # 6语言 strings.xml
│   └── README_ANDROID.md
├── eacoswap-ios/             # iOS App (48文件)
│   ├── EACOswap/
│   │   ├── AppDelegate.swift
│   │   ├── MainViewController.swift
│   │   ├── WebViewBridge.swift
│   │   ├── WalletManager.swift
│   │   ├── ApiService.swift
│   │   └── Localizable.strings  # 6语言
│   ├── EACOswap.xcodeproj/
│   └── README_IOS.md
├── telegram-bot/              # TMA Bot (18文件)
│   ├── bot.js
│   ├── webhook.js
│   ├── package.json
│   ├── .env.example
│   ├── commands/             # 7个命令
│   ├── utils/                # i18n/keyboards/messages
│   ├── middleware/auth.js
│   ├── api/client.js
│   └── README_BOT.md
├── telegram-miniapp/          # TMA 前端 (37文件)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/            # 5页面
│   │   ├── components/       # 14组件
│   │   ├── services/         # api/telegram/wallet/swap
│   │   ├── utils/            # i18n/constants/themes/helpers
│   │   └── data/faq.js       # 100问答
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── README_TMA.md
├── Dockerfile
├── docker-compose.yml
├── README.md
└── eacoswap2025.md          # 程序员部署文档
```

---

## 版本历史

| Commit | 内容 | 日期 |
|---|---|---|
| `384c0dc` | 初始全栈工程 | 2026-09-07 |
| `1ffca89` | FAQ 100问答 + Docker | 2026-09-07 |
| `14123a4` | 部署文档 eacoswap2025.md | 2026-09-07 |
| `b4aa4cc` | API响应格式修复 | 2026-09-07 |
| `dc8095e` | Android + iOS App | 2026-09-07 |
| `84590fe` | Telegram Mini App (Bot + Frontend) | 2026-09-07/08 |

---

*EACOswap — Connecting Global Surplus Labor Through Value Exchange*
