import React, { useState } from 'react'
import { TOKEN_LIST } from '../utils/constants.js'

export default function TokenSelector({ selected, onSelect, exclude }) {
  const [open, setOpen] = useState(false)
  const selectedToken = TOKEN_LIST.find(t => t.symbol === selected)

  const available = TOKEN_LIST.filter(t => t.symbol !== exclude)

  return (
    <div className="token-selector">
      <button className="token-selector-trigger" onClick={() => setOpen(!open)}>
        <span className="token-icon">{selectedToken?.icon || '🪙'}</span>
        <span className="token-symbol">{selected}</span>
        <span className="token-chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="token-dropdown">
          {available.map(token => (
            <button
              key={token.symbol}
              className={`token-option ${token.symbol === selected ? 'active' : ''}`}
              onClick={() => {
                onSelect(token.symbol)
                setOpen(false)
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}
            >
              <span className="token-icon">{token.icon}</span>
              <div className="token-info">
                <span className="token-name">{token.symbol}</span>
                <span className="token-desc">{token.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <style>{`
        .token-selector {
          position: relative;
        }
        .token-selector-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .token-icon {
          font-size: 20px;
        }
        .token-symbol {
          flex: 1;
          text-align: left;
        }
        .token-chevron {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .token-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 10px;
          z-index: 50;
          max-height: 280px;
          overflow-y: auto;
          box-shadow: 0 8px 24px var(--shadow);
        }
        .token-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: none;
          border: none;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-primary);
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }
        .token-option:last-child {
          border-bottom: none;
        }
        .token-option.active {
          background: var(--bg-tertiary);
        }
        .token-option:active {
          background: var(--bg-tertiary);
        }
        .token-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .token-name {
          font-weight: 600;
          font-size: 14px;
        }
        .token-desc {
          font-size: 12px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  )
}
