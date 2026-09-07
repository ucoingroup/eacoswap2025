import React from 'react'
import { useI18N } from '../utils/i18n.js'

export default function SwapInput({ value, onChange, token, label }) {
  const { t } = useI18N()

  return (
    <div className="swap-input-group">
      <div className="swap-input-header">
        <span className="swap-input-label">{label}</span>
        <button
          className="swap-max-btn"
          onClick={() => onChange('1000000')}
        >
          {t('max')}
        </button>
      </div>
      <div className="swap-input-wrapper">
        <input
          className="swap-amount-input"
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0.0"
          min="0"
          step="any"
        />
        <span className="swap-token-badge">{token}</span>
      </div>
      <style>{`
        .swap-input-group {
          margin-top: 8px;
        }
        .swap-input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .swap-input-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .swap-max-btn {
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid var(--accent);
          background: transparent;
          color: var(--accent);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .swap-max-btn:active {
          background: var(--accent);
          color: var(--bg-primary);
        }
        .swap-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 4px 4px 4px 14px;
        }
        .swap-amount-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 22px;
          font-weight: 600;
          outline: none;
          padding: 8px 0;
        }
        .swap-amount-input::placeholder {
          color: var(--text-muted);
        }
        .swap-token-badge {
          padding: 6px 12px;
          background: var(--bg-tertiary);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          color: var(--accent);
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}
