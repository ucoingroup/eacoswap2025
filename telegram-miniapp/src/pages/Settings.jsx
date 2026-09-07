import React, { useState } from 'react'
import { useI18N, LANGUAGES } from '../utils/i18n.js'
import { THEME_KEYS, THEME_NAMES } from '../utils/themes.js'
import LanguageSelector from '../components/LanguageSelector.jsx'
import ThemeSelector from '../components/ThemeSelector.jsx'

export default function Settings({ theme, setTheme, lang, setLang, backendUrl, setBackendUrl }) {
  const { t } = useI18N()
  const [urlInput, setUrlInput] = useState(backendUrl)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleSaveUrl = () => {
    localStorage.setItem('eaco-backend-url', urlInput)
    setBackendUrl(urlInput)
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
    alert(t('saved'))
  }

  const handleReset = () => {
    localStorage.removeItem('eaco-theme')
    localStorage.removeItem('eaco-lang')
    localStorage.removeItem('eaco-backend-url')
    setTheme(THEME_KEYS.COSMIC)
    setLang('en')
    setBackendUrl(import.meta.env.VITE_BACKEND_URL || '')
    setShowResetConfirm(false)
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('heavy')
  }

  return (
    <div className="settings-page animate-fade-in">
      <h2 className="page-title">{t('settings_title')}</h2>

      {/* Language */}
      <section className="settings-section card">
        <h3 className="settings-label">{t('language')}</h3>
        <LanguageSelector
          languages={LANGUAGES}
          selected={lang}
          onSelect={(code) => {
            setLang(code)
            localStorage.setItem('eaco-lang', code)
            window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
          }}
        />
      </section>

      {/* Theme */}
      <section className="settings-section card">
        <h3 className="settings-label">{t('theme')}</h3>
        <ThemeSelector
          themes={THEME_NAMES}
          selected={theme}
          onSelect={(key) => {
            setTheme(key)
            localStorage.setItem('eaco-theme', key)
            window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
          }}
        />
      </section>

      {/* Server URL */}
      <section className="settings-section card">
        <h3 className="settings-label">{t('server_url')}</h3>
        <input
          className="input"
          type="text"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          placeholder="https://api.example.com"
        />
        <div className="settings-actions">
          <button className="button button-small" onClick={handleSaveUrl}>{t('save')}</button>
        </div>
      </section>

      {/* About */}
      <section className="settings-section card">
        <h3 className="settings-label">{t('about')}</h3>
        <div className="about-content">
          <p className="about-line"><strong>EACO Swap</strong></p>
          <p className="about-line">{t('version')}: 1.0.0</p>
          <p className="about-line">Solana DEX Navigation Hub</p>
          <p className="about-line">eaco for earth</p>
        </div>
      </section>

      {/* Reset */}
      <section className="settings-section">
        <button
          className="button button-secondary reset-button"
          onClick={() => setShowResetConfirm(true)}
        >
          {t('reset_settings')}
        </button>
      </section>

      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <p className="modal-text">{t('reset_confirm')}</p>
            <div className="modal-actions">
              <button className="button button-secondary" onClick={() => setShowResetConfirm(false)}>
                {t('cancel')}
              </button>
              <button className="button" onClick={handleReset}>
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .settings-page {
          padding-bottom: 20px;
        }
        .settings-section {
          margin-bottom: 12px;
        }
        .settings-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 12px;
        }
        .settings-actions {
          margin-top: 10px;
        }
        .about-content {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .about-line {
          margin-bottom: 4px;
        }
        .reset-button {
          width: 100%;
          background: rgba(248, 113, 113, 0.1);
          color: var(--error);
          border-color: var(--error);
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          max-width: 320px;
          width: 100%;
        }
        .modal-text {
          font-size: 15px;
          color: var(--text-primary);
          margin-bottom: 20px;
          text-align: center;
        }
        .modal-actions {
          display: flex;
          gap: 10px;
        }
        .modal-actions .button {
          flex: 1;
        }
      `}</style>
    </div>
  )
}
