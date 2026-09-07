import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18N } from '../utils/i18n.js'

const PAGE_TITLES = {
  '/': 'home_title',
  '/exchange': 'exchange_title',
  '/market': 'market_title',
  '/faq': 'faq_title',
  '/settings': 'settings_title',
}

export default function Header() {
  const { t } = useI18N()
  const location = useLocation()
  const [headerColor, setHeaderColor] = useState('var(--bg-secondary)')

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg?.headerColor) {
      setHeaderColor(tg.headerColor)
    }
  }, [])

  const titleKey = PAGE_TITLES[location.pathname] || 'home_title'

  return (
    <header className="app-header" style={{ backgroundColor: headerColor }}>
      <div className="header-content">
        <span className="header-icon">🌍</span>
        <h1 className="header-title">{t(titleKey)}</h1>
      </div>
      <style>{`
        .app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          padding: env(safe-area-inset-top, 0px) 16px 10px;
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(10px);
        }
        .header-content {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 44px;
        }
        .header-icon {
          font-size: 22px;
        }
        .header-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
      `}</style>
    </header>
  )
}
