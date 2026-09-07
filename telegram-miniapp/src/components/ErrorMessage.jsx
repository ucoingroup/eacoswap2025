import React from 'react'
import { useI18N } from '../utils/i18n.js'

export default function ErrorMessage({ message, onRetry, dismissible }) {
  const { t } = useI18N()
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) return null

  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{message}</span>
        {dismissible && (
          <button className="error-dismiss" onClick={() => setDismissed(true)}>✕</button>
        )}
      </div>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          {t('retry')}
        </button>
      )}
      <style>{`
        .error-message {
          margin: 12px 0;
          padding: 14px 16px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid var(--error);
          border-radius: 12px;
        }
        .error-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .error-icon {
          font-size: 18px;
          flex-shrink: 0;
        }
        .error-text {
          flex: 1;
          font-size: 13px;
          color: var(--error);
          line-height: 1.4;
        }
        .error-dismiss {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error-retry {
          margin-top: 10px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--error);
          background: transparent;
          color: var(--error);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .error-retry:active {
          background: var(--error);
          color: var(--bg-primary);
        }
      `}</style>
    </div>
  )
}
