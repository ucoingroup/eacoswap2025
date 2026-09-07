import React from 'react'

export default function LanguageSelector({ languages, selected, onSelect }) {
  return (
    <div className="language-selector">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`lang-option ${selected === lang.code ? 'active' : ''}`}
          onClick={() => onSelect(lang.code)}
        >
          <span className="lang-flag">{lang.flag}</span>
          <span className="lang-name">{lang.name}</span>
        </button>
      ))}
      <style>{`
        .language-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .lang-option.active {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }
        .lang-option:active {
          transform: scale(0.95);
        }
        .lang-flag {
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}
