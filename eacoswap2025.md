# EACOswap 2025 — Programmer Deployment Guide

> **EACOswap** is a production-ready Solana DEX navigation hub and EACO token exchange aggregator. This guide covers complete setup on local machines, VPS nodes, Docker, and cloud platforms.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Local Development Setup](#3-local-development-setup)
4. [VPS / Dedicated Server Deployment](#4-vps--dedicated-server-deployment)
5. [Docker Deployment](#5-docker-deployment)
6. [Environment Configuration](#6-environment-configuration)
7. [API Keys & Data Sources](#7-api-keys--data-sources)
8. [Production Checklist](#8-production-checklist)
9. [Health Monitoring & Logs](#9-health-monitoring--logs)
10. [Troubleshooting](#10-troubleshooting)
11. [Security Best Practices](#11-security-best-practices)
12. [Developer FAQ](#12-developer-faq)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     EACOswap v1.1.0                      │
├─────────────────────────────────────────────────────────┤
│  Frontend (Pure HTML/CSS/JS)      │  Backend (Node.js)   │
│  ─────────────────────────────    │  ─────────────────   │
│  • index.html — Main page         │  • Express server    │
│  • faq.html — 100 Q&A (6 langs)   │  • API proxy routes  │
│  • styles.css — 3 themes          │  • Helius/CoinGecko  │
│  • app.js — i18n, wallet, swap    │  • Jupiter/Birdeye   │
│  • manifest.json + sw.js — PWA    │  • Rate limiting     │
│                                   │  • In-memory cache   │
├─────────────────────────────────────────────────────────┤
│  Data Sources: CoinGecko (free) │ Jupiter (free)        │
│                Helius (optional) │ Birdeye (optional)    │
│                OrbMarkets (link) │ Solana RPC (public)   │
└─────────────────────────────────────────────────────────┘
```

**Key Design Principles:**
- API keys are **never** exposed to the frontend — all sensitive keys live in backend `.env`
- Works out-of-the-box with **zero configuration** using free public APIs
- Optional enhanced performance with Helius/Birdeye paid APIs
- 6 languages (EN / 华语 / ES / AR / FR / RU) + 3 themes (Cosmic / Army / Classic)

---

## 2. Prerequisites

| Component | Minimum Version | Recommended |
|-----------|----------------|-------------|
| Node.js   | 18.x           | 20.x LTS    |
| npm       | 9.x            | 10.x        |
| Docker    | 20.x (optional)| Latest      |
| Git       | 2.x            | Latest      |
| OS        | Linux/Windows/macOS | Ubuntu 22.04 LTS |

---

## 3. Local Development Setup

### 3.1 Clone the Repository

```bash
git clone https://github.com/ucoingroup/eacoswap2025.git
cd eacoswap2025/eacoswap-pro
```

### 3.2 Configure Environment

```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Edit with your API keys (optional — app works without them)
nano backend/.env
```

Example `.env`:
```
# Server
PORT=3000
NODE_ENV=development

# Optional API Keys (enhanced performance)
HELIUS_API_KEY=your_helius_key_here
BIRDEYE_API_KEY=your_birdeye_key_here

# Security
CORS_ORIGINS=*
RATE_LIMIT_PER_MINUTE=60
CACHE_TTL=60
```

### 3.3 Install & Start

```bash
cd backend
npm install
npm start
```

**Access:**
- Main site: http://localhost:3000
- API health: http://localhost:3000/api/health
- FAQ page: http://localhost:3000/faq.html

### 3.4 Development Mode (Auto-reload)

```bash
cd backend
npm install   # first time only
npm run dev   # uses nodemon
```

---

## 4. VPS / Dedicated Server Deployment

### 4.1 Fresh Ubuntu 22.04 Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node -v   # v20.x.x
npm -v    # 10.x.x

# Install PM2 for process management
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

### 4.2 Deploy Application

```bash
# Create app directory
sudo mkdir -p /opt/eacoswap
sudo chown $USER:$USER /opt/eacoswap
cd /opt/eacoswap

# Clone repo
git clone https://github.com/ucoingroup/eacoswap2025.git .

# Install dependencies
cd eacoswap-pro/backend
npm install --production

# Configure environment
cp .env.example .env
nano .env
# Edit: PORT=3000, add HELIUS_API_KEY if available
```

### 4.3 PM2 Process Management

```bash
# Start with PM2
cd /opt/eacoswap/eacoswap-pro/backend
pm2 start server.js --name eacoswap \
  --env PORT=3000 \
  --env NODE_ENV=production

# Save PM2 config
pm2 save
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

# Monitor
pm2 status
pm2 logs eacoswap
pm2 monit
```

### 4.4 Nginx Reverse Proxy (Recommended)

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/eacoswap
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/eacoswap /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# HTTPS with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 4.5 Firewall Setup

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

---

## 5. Docker Deployment

### 5.1 Quick Start with Docker Compose

```bash
cd eacoswap-pro

# Edit environment
cp backend/.env.example backend/.env
nano backend/.env

# Build and start
docker compose up -d --build

# Verify
curl http://localhost:3000/api/health
# Expected: {"status":"ok","services":{...}}

# View logs
docker compose logs -f

# Stop
docker compose down
```

### 5.2 Production Docker on VPS

```bash
cd /opt/eacoswap/eacoswap-pro

# Build optimized image
docker build -t eacoswap:prod .

# Run with restart policy
docker run -d \
  --name eacoswap \
  --restart unless-stopped \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e HELIUS_API_KEY=your_key_here \
  -e BIRDEYE_API_KEY=your_key_here \
  eacoswap:prod

# Check status
docker ps
docker logs eacoswap
```

### 5.3 Docker Hub Push / Pull

```bash
# Tag and push (requires Docker Hub login)
docker tag eacoswap:prod your-dockerhub-username/eacoswap:latest
docker login
docker push your-dockerhub-username/eacoswap:latest

# On target server, pull and run
docker pull your-dockerhub-username/eacoswap:latest
docker run -d --name eacoswap -p 3000:3000 \
  -e HELIUS_API_KEY=your_key \
  your-dockerhub-username/eacoswap:latest
```

### 5.4 Offline Deployment (No Internet on Target)

```bash
# On build machine with internet
cd eacoswap-pro
docker build -t eacoswap:prod .
docker save eacoswap:prod | gzip > eacoswap-prod.tar.gz

# Transfer to target server (USB, scp, etc.)
scp eacoswap-prod.tar.gz user@vps-server:/opt/

# On target server (offline)
cd /opt
docker load < eacoswap-prod.tar.gz
docker run -d --name eacoswap -p 3000:3000 eacoswap:prod
```

---

## 6. Environment Configuration

### 6.1 Complete `.env` Reference

```bash
# ===== Server =====
PORT=3000                    # Server port
NODE_ENV=production          # development | production

# ===== Optional API Keys =====
# Helius: https://helius.xyz (Free tier: 1M credits/month)
HELIUS_API_KEY=              # Enhanced Solana RPC + DAS API

# Birdeye: https://birdeye.so (Optional for advanced token analytics)
BIRDEYE_API_KEY=             # Token market data + price feeds

# ===== Security =====
CORS_ORIGINS=*               # Comma-separated allowed origins, or * for all
RATE_LIMIT_PER_MINUTE=60     # Max API requests per minute per IP
CACHE_TTL=60                 # Response cache time in seconds

# ===== Logging =====
# LOG_LEVEL=info             # debug | info | warn | error
```

### 6.2 Configuration Priority

1. **Environment variables** (highest priority)
2. `.env` file in backend directory
3. Default values in server code (lowest priority)

---

## 7. API Keys & Data Sources

### 7.1 Free Tier (No Keys Required)

| Service | Endpoint | Rate Limit | Usage |
|---------|----------|-----------|-------|
| CoinGecko | `/api/sol-price` | ~50 calls/min | SOL price, market cap, top tokens |
| Jupiter | `/api/jupiter/quote` | ~100 calls/min | Swap quotes, routing |
| Solana Public RPC | Direct | Shared | Basic RPC calls |

### 7.2 Enhanced Tier (With API Keys)

| Service | Key Type | Benefit | Get Key |
|---------|----------|---------|---------|
| Helius | RPC API | 1M credits/month, enhanced NFT/token APIs, higher rate limits | [helius.xyz](https://helius.xyz) |
| Birdeye | X-API-KEY | Real-time token prices, advanced analytics | [birdeye.so](https://birdeye.so) |

### 7.3 API Endpoint Reference

```
GET  /api/health              — Health check & service status
GET  /api/config              — Server configuration (safe info only)
GET  /api/sol-price           — SOL price in USD (CoinGecko)
GET  /api/tokens/market-cap   — Top SPL tokens by market cap
POST /api/helius/rpc          — Solana RPC proxy (requires key)
GET  /api/helius/das/assets-by-owner — Token accounts by wallet
GET  /api/birdeye/token/:addr — Token details (requires key)
GET  /api/birdeye/price/:addr — Token price (free fallback to CoinGecko)
GET  /api/jupiter/quote       — Swap quote preview
```

### 7.4 Health Check Response

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-09-07T07:55:22.521Z",
  "services": {
    "coingecko": true,
    "helius": false,
    "birdeye": false,
    "jupiter": true
  },
  "uptime": 1234.56
}
```

---

## 8. Production Checklist

Before going live:

- [ ] `NODE_ENV=production` set in `.env`
- [ ] `HELIUS_API_KEY` configured (optional but recommended)
- [ ] `CORS_ORIGINS` restricted to actual domain(s)
- [ ] `RATE_LIMIT_PER_MINUTE` adjusted for expected traffic
- [ ] Nginx reverse proxy configured with HTTPS
- [ ] Firewall (ufw) enabled, only ports 22, 80, 443 open
- [ ] PM2 auto-start configured (`pm2 startup`)
- [ ] Domain DNS pointing to server IP
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Log rotation configured (`pm2 install pm2-logrotate`)
- [ ] Server monitoring (optional: UptimeRobot, Pingdom)

---

## 9. Health Monitoring & Logs

### 9.1 PM2 Monitoring

```bash
pm2 status              # Process status
pm2 logs eacoswap      # Real-time logs
pm2 logs eacoswap --lines 100   # Last 100 lines
pm2 monit              # Interactive monitor
pm2 reload eacoswap    # Zero-downtime restart
```

### 9.2 Log Rotation

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 10
```

### 9.3 Custom Health Check Script

```bash
#!/bin/bash
# /opt/eacoswap/health-check.sh

HEALTH=$(curl -s http://localhost:3000/api/health | grep -o '"status":"ok"')
if [ -z "$HEALTH" ]; then
    echo "$(date): EACOswap is DOWN, restarting..." >> /var/log/eacoswap-health.log
    pm2 restart eacoswap
else
    echo "$(date): EACOswap is healthy" >> /var/log/eacoswap-health.log
fi
```

Add to crontab:
```bash
crontab -e
# Add: */5 * * * * /opt/eacoswap/health-check.sh
```

---

## 10. Troubleshooting

### 10.1 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Port 3000 already in use | Another process using the port | `sudo lsof -i :3000` then `kill <PID>` or change PORT in .env |
| npm install fails | Node version too old | Upgrade to Node 18+: `nvm install 20` |
| API returns 503 | Missing API key | Check `.env` has required keys, or use fallback free APIs |
| CORS errors | Wrong CORS_ORIGINS | Set `CORS_ORIGINS=*` for development, or specify exact domain |
| Rate limited (429) | Too many requests | Increase `RATE_LIMIT_PER_MINUTE` or implement client caching |
| Frontend not loading | Wrong static path | Verify `backend/../frontend` path is correct |
| Docker build fails | Network / mirror issue | Use `docker.m.daocloud.io/library/node:20-alpine` for China |

### 10.2 Reset Everything

```bash
cd /opt/eacoswap/eacoswap-pro/backend
pm2 delete eacoswap
rm -rf node_modules package-lock.json
npm install
pm2 start server.js --name eacoswap
```

---

## 11. Security Best Practices

1. **Never commit `.env` files** — they are in `.gitignore` by default
2. **Never expose API keys in frontend** — all keys stay in backend `.env`
3. **Use HTTPS in production** — Let's Encrypt free certificates
4. **Restrict CORS** — Set `CORS_ORIGINS=https://your-domain.com` not `*`
5. **Rate limit aggressively** — Default 60/min is conservative
6. **Keep dependencies updated** — Run `npm audit` regularly
7. **Use non-root user** — Dockerfile already runs as `appuser`
8. **Monitor logs** — Watch for unusual traffic patterns

---

## 12. Developer FAQ

**Q: Can I run EACOswap without any API keys?**
> Yes. The app works out-of-the-box using free public APIs (CoinGecko, Jupiter, Solana public RPC). API keys only enhance performance and unlock advanced features.

**Q: What's the minimum server spec?**
> 1 CPU core, 512MB RAM, 5GB disk. EACOswap is lightweight — Node.js + static files.

**Q: Can I deploy on shared hosting?**
> Yes, if it supports Node.js. Otherwise deploy frontend-only to any static host (GitHub Pages, Netlify, Vercel) and use public APIs directly.

**Q: How do I add a new language?**
> Edit `frontend/js/app.js` — add a new key under `I18N` object, then add corresponding translations. Also update `frontend/faq.html` T object.

**Q: How do I add a new DEX?**
> Edit `frontend/js/app.js` — add to the `DEXS` array with name, URL, description, and icon.

**Q: Can I use a different theme color?**
> Edit `frontend/styles.css` — each theme is a CSS custom property block under `[data-theme="name"]`.

**Q: How do I update the FAQ content?**
> Edit `frontend/faq.html` — the T object contains all 100 Q&A pairs in 6 languages.

**Q: What about database?**
> EACOswap is stateless — no database required. All data comes from external APIs or is cached in-memory.

**Q: How do I backup?**
> Just backup the repository + `.env` file. No database to dump.

---

## Quick Reference Card

```bash
# One-liner deploy on Ubuntu VPS
git clone https://github.com/ucoingroup/eacoswap2025.git /opt/eacoswap && \
cd /opt/eacoswap/eacoswap-pro/backend && \
npm install --production && \
cp .env.example .env && \
pm install -g pm2 && \
pm2 start server.js --name eacoswap && \
pm2 save && \
pm2 startup

# Docker one-liner
cd eacoswap-pro && docker compose up -d --build

# Verify deployment
curl -s http://localhost:3000/api/health | jq .
```

---

**EACO Contract:** `DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH`

**Repository:** https://github.com/ucoingroup/eacoswap2025

**License:** MIT
