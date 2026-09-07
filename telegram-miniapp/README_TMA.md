# EACO Swap Telegram MiniApp

## Deployment Guide

### 1. BotFather Setup

1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Create a new bot or select existing: `/newbot` or `/mybots`
3. Set MiniApp menu button: `/setmenubutton`
4. Configure WebApp URL with your hosted URL
5. Enable inline mode if needed: `/setinline`

### 2. Build & Deploy

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# The build output will be in ./dist/
```

### 3. Hosting Options

#### Option A: Static Hosting (Cloudflare Pages / Vercel / Netlify)
- Build: `npm run build`
- Upload `dist/` folder to your hosting provider
- Set environment variables in hosting dashboard

#### Option B: Self-hosted with Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name tma.eacoswap.example.com;
    
    root /var/www/eacoswap-tma/dist;
    index index.html;
    
    # Security headers for Telegram WebApp
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Content-Security-Policy "frame-ancestors https://web.telegram.org https://*.telegram.org;" always;
    
    # SPA routing - fallback to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API proxy to backend
    location /api/ {
        proxy_pass https://api.eacoswap.example.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
VITE_BACKEND_URL=https://your-api-domain.com
VITE_BOT_USERNAME=your_bot_username
```

### 5. Telegram WebApp Requirements

- Must be served over HTTPS
- Must allow framing from `*.telegram.org`
- Must call `Telegram.WebApp.ready()` after load
- Must handle `viewportChanged` events for safe areas

### 6. Testing

1. Open your bot in Telegram
2. Click the menu button to launch MiniApp
3. Or use direct link: `https://t.me/your_bot_username/app`

### 7. Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank screen | Check browser console for JS errors; verify `base: './'` in vite.config.js |
| Theme not syncing | Ensure `Telegram.WebApp.ready()` is called before theme reads |
| Wallet won't connect | Verify `allowedHosts` in vite.config.js includes your domain |
| API 403 errors | Check CORS settings on backend; verify API keys |

### Architecture

```
telegram-miniapp/
├── public/           # Static assets (if any)
├── src/
│   ├── main.jsx      # Entry point
│   ├── App.jsx       # Router + Telegram init
│   ├── index.css     # Global styles + themes
│   ├── pages/        # 5 core pages
│   ├── components/   # Reusable components
│   ├── services/     # API, Telegram, Wallet, Swap
│   ├── utils/        # i18n, constants, themes, helpers
│   └── data/         # FAQ data
├── index.html        # HTML entry with Telegram SDK
├── vite.config.js    # Vite config (base: './')
└── package.json      # Dependencies
```
