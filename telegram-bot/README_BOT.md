# EACO Swap Telegram Bot

A complete Telegram Mini App Bot for EACO Swap DEX integration on Solana.

## Features

- **7 Bot Commands**: /start, /help, /swap, /market, /faq, /about, /settings
- **WebApp Integration**: Every command launches the Mini App via Inline Keyboard buttons
- **Deep Linking**: Supports `https://t.me/{bot_username}?startapp={param}` for direct page routing
- **6 Languages**: English, Chinese, Spanish, Arabic, French, Russian
- **3 Themes**: Light, Dark, Auto
- **Dual Run Modes**: WebHook (production) and Polling (development)
- **Backend API**: Communicates with existing eacoswap-pro backend

## Prerequisites

- Node.js >= 18.0.0
- A Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- HTTPS domain for WebHook mode (required by Telegram Mini Apps)

## Installation

```bash
cd telegram-bot
npm install
```

## Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BOT_TOKEN` | Yes | Telegram bot token from BotFather |
| `WEBAPP_URL` | Yes | HTTPS URL of your Mini App |
| `BACKEND_URL` | Yes | eacoswap-pro backend API URL |
| `PORT` | No | Server port (default: 8443) |
| `WEBHOOK_URL` | For webhook | Full HTTPS URL for Telegram to POST updates |
| `MODE` | No | `polling` or `webhook` (default: polling) |
| `WEBHOOK_SECRET` | Recommended | Secret token for webhook validation |

## BotFather Setup

1. Create a bot via [@BotFather](https://t.me/BotFather)
2. Set the following:
   - `/setname` - EACO Swap Bot
   - `/setdescription` - Your gateway to decentralized trading on Solana
   - `/setabouttext` - Fast, secure, and community-driven DEX
   - `/setuserpic` - Upload EACO logo
   - `/setcommands` - Paste the command list below
   - `/setdomain` - Set your WebApp domain
   - `/setmenubutton` - Configure menu button to open WebApp

### Command List for BotFather

```
start - Start the bot and open WebApp
help - Show available commands
swap - Launch token swap interface
market - View live market prices
faq - Frequently asked questions
about - About EACO project
settings - User preferences
```

### WebApp Configuration

In BotFather, use `/setdomain` and `/setmenubutton`:

```
Menu Button Text: Open App
Menu Button URL: https://your-domain.com
```

## Running the Bot

### Development Mode (Polling)

```bash
npm run start:polling
# or
MODE=polling node bot.js
```

### Production Mode (WebHook)

```bash
npm run start:webhook
# or
MODE=webhook node bot.js
```

The webhook server will start on the configured `PORT`.

### WebHook Server Only

If you want to run the webhook server separately:

```bash
node webhook.js
```

## WebHook Configuration

### With a Reverse Proxy (Nginx)

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location /webhook {
        proxy_pass http://localhost:8443/webhook;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Cloudflare Tunnel (Quick Setup)

```bash
cloudflared tunnel --url http://localhost:8443
```

Then set `WEBHOOK_URL` to the tunnel URL + `/webhook`.

## Deep Linking

Users can be sent directly to specific pages:

| URL | Action |
|-----|--------|
| `https://t.me/{bot}?startapp=swap` | Opens Swap page |
| `https://t.me/{bot}?startapp=market` | Opens Market page |
| `https://t.me/{bot}?startapp=faq` | Opens FAQ page |
| `https://t.me/{bot}?startapp=settings` | Opens Settings page |

The `startapp` parameter is parsed in `middleware/auth.js` and routed accordingly.

## Project Structure

```
telegram-bot/
├── package.json
├── .env.example
├── .gitignore
├── bot.js              # Main bot entry point
├── webhook.js          # Express webhook server
├── README_BOT.md       # This file
├── commands/
│   ├── start.js        # /start handler + deep link parsing
│   ├── help.js         # /help handler
│   ├── swap.js         # /swap handler
│   ├── market.js       # /market handler
│   ├── faq.js          # /faq handler
│   ├── about.js        # /about handler
│   └── settings.js     # /settings handler
├── middleware/
│   └── auth.js         # User auth + start param parsing
├── utils/
│   ├── i18n.js         # 6-language translation system
│   ├── keyboards.js    # Inline keyboard generators
│   └── messages.js     # Message formatting utilities
└── api/
    └── client.js       # Backend API communication client
```

## EACO Constants

- **Contract**: `DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH`
- **OrbMarkets**: https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH
- **Charity**: https://ucoingroup.github.io/eacoweb3-2026/eaco-charity2025.html

## Supported Tokens

SOL, EACO, USDT, USDC, wETH, wBTC, wBNB, TRX, eCNH

## Supported DEXs

Jupiter, Raydium, Orca, Meteora, Phoenix, Lifinity, Drift, Zeta Markets, Crema Finance, Saros Finance

## Security Notes

1. **Never commit `.env`** - It contains your BOT_TOKEN
2. **Use WEBHOOK_SECRET** in production to validate webhook requests
3. **HTTPS required** for WebApp URL and WebHook URL
4. **Validate initData** in production using HMAC with BOT_TOKEN

## License

MIT
