import React from 'react'
import { useI18N } from '../utils/i18n.js'

export default function ThemeSelector({ themes, selected, onSelect }) {
  const { t } = useI18N()

  return (
    <div className="theme-selector">
      {themes.map(theme => (
        <button
          key={theme.key}
          className={`theme-option ${selected === theme.key ? 'active' : ''}`}
          style={{ '--preview-bg': theme.previewBg, '--preview-accent': theme.previewAccent }}
          onClick={() => onSelect(theme.key)}
        >
          <div className="theme-preview" />
          <span className="theme-name">{t(theme.labelKey)}</span>
        </button>
      ))}
      <style>{`
        .theme-selector {
          display: flex;
          gap: 10px;
        }
        .theme-option {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 8px;
          border-radius: 12px;
          border: 2px solid var(--border);
          background: var(--bg-tertiary);
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .theme-option.active {
          border-color: var(--accent);
        }
        .theme-option:active {
          transform: scale(0.96);
        }
        .theme-preview {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--preview-bg);
          border: 3px solid var(--preview-accent);
          box-shadow: 0 0 8px var(--preview-accent);
        }
        .theme-name {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .theme-option.active .theme-name {
          color: var(--accent);
        }
      `}</style>
    </div>
  )
}
