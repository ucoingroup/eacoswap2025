import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useI18N } from '../utils/i18n.js'

const TABS = [
  { path: '/', label: 'nav_home', icon: '🏠' },
  { path: '/exchange', label: 'nav_exchange', icon: '⇄' },
  { path: '/market', label: 'nav_market', icon: '📈' },
  { path: '/faq', label: 'nav_faq', icon: '❓' },
  { path: '/settings', label: 'nav_settings', icon: '⚙️' },
]

export default function BottomNav({ activeTab }) {
  const navigate = useNavigate()
  const { t } = useI18N()

  return (
    <nav className="bottom-nav">
      {TABS.map((tab, index) => (
        <button
          key={tab.path}
          className={`nav-item ${index === activeTab ? 'active' : ''}`}
          onClick={() => {
            window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
            navigate(tab.path)
          }}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{t(tab.label)}</span>
        </button>
      ))}
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding-bottom: env(safe-area-inset-bottom, 0px);
          z-index: 100;
          height: calc(56px + env(safe-area-inset-bottom, 0px));
        }
        .nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 6px 0;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: color 0.2s ease;
        }
        .nav-item.active {
          color: var(--accent);
        }
        .nav-icon {
          font-size: 20px;
          line-height: 1;
        }
        .nav-label {
          font-size: 10px;
          font-weight: 600;
        }
      `}</style>
    </nav>
  )
}
