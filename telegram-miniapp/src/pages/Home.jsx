import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18N } from '../utils/i18n.js'
import { DEX_LIST, TOKEN_LIST, EACO_CONTRACT, EACO_ORBMARKETS, CHARITY_LINK } from '../utils/constants.js'
import DexCard from '../components/DexCard.jsx'
import WalletButton from '../components/WalletButton.jsx'

export default function Home({ backendUrl }) {
  const { t } = useI18N()
  const navigate = useNavigate()

  const quickTokens = TOKEN_LIST.filter(t => ['SOL', 'USDT', 'USDC'].includes(t.symbol))

  return (
    <div className="home-page animate-fade-in">
      {/* Hero */}
      <section className="hero-section">
        <h1 className="hero-title">{t('home_title')}</h1>
        <p className="hero-subtitle">{t('home_subtitle')}</p>
        <WalletButton />
      </section>

      {/* EACO Banner */}
      <section className="eaco-banner card" onClick={() => window.Telegram?.WebApp?.openLink?.(EACO_ORBMARKETS)}>
        <div className="eaco-banner-content">
          <div className="eaco-icon">🌍</div>
          <div>
            <h3>{t('eaco_banner_title')}</h3>
            <p>{t('eaco_banner_desc')}</p>
            <span className="contract-addr">{EACO_CONTRACT.slice(0, 8)}...{EACO_CONTRACT.slice(-8)}</span>
          </div>
        </div>
      </section>

      {/* DEX Navigation Cards */}
      <section className="dex-section">
        <h2 className="section-title">{t('dex_nav_title')}</h2>
        <p className="section-desc">{t('dex_nav_desc')}</p>
        <div className="dex-grid">
          {DEX_LIST.map(dex => (
            <DexCard key={dex.id} dex={dex} />
          ))}
        </div>
      </section>

      {/* Quick Token Access */}
      <section className="token-section">
        <h2 className="section-title">{t('token_quick')}</h2>
        <div className="token-quick-list">
          {quickTokens.map(token => (
            <div
              key={token.symbol}
              className="token-quick-item"
              onClick={() => navigate('/exchange', { state: { toToken: token.symbol } })}
            >
              <span className="token-symbol">{token.symbol}</span>
              <span className="token-name">{token.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Charity Link */}
      <section className="charity-section">
        <button
          className="button button-secondary"
          onClick={() => window.Telegram?.WebApp?.openLink?.(CHARITY_LINK)}
        >
          🌱 EACO Public Welfare 2025
        </button>
      </section>

      <style>{`
        .hero-section {
          text-align: center;
          padding: 24px 0 16px;
        }
        .hero-title {
          font-size: 28px;
          font-weight: 800;
          color: var(--accent);
          margin-bottom: 8px;
        }
        .hero-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .eaco-banner {
          cursor: pointer;
        }
        .eaco-banner-content {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .eaco-icon {
          font-size: 40px;
          flex-shrink: 0;
        }
        .eaco-banner h3 {
          font-size: 16px;
          margin-bottom: 4px;
          color: var(--accent);
        }
        .eaco-banner p {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          line-height: 1.5;
        }
        .contract-addr {
          font-family: monospace;
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          margin: 20px 0 8px;
          color: var(--text-primary);
        }
        .section-desc {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        .dex-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .token-quick-list {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .token-quick-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .token-quick-item:active {
          transform: scale(0.96);
          border-color: var(--accent);
        }
        .token-symbol {
          font-weight: 700;
          color: var(--accent);
          font-size: 14px;
        }
        .token-name {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .charity-section {
          text-align: center;
          padding: 20px 0;
        }
      `}</style>
    </div>
  )
}
