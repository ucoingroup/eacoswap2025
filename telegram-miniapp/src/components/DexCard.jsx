import React from 'react'

export default function DexCard({ dex }) {
  const handleClick = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
    if (dex.url) {
      window.Telegram?.WebApp?.openLink?.(dex.url)
    }
  }

  return (
    <div className="dex-card" onClick={handleClick}>
      <div className="dex-icon">{dex.icon}</div>
      <div className="dex-info">
        <div className="dex-name">{dex.name}</div>
        <div className="dex-desc">{dex.description}</div>
      </div>
      <style>{`
        .dex-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .dex-card:active {
          transform: scale(0.98);
          border-color: var(--accent);
        }
        .dex-icon {
          font-size: 28px;
          flex-shrink: 0;
        }
        .dex-info {
          flex: 1;
          min-width: 0;
        }
        .dex-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .dex-desc {
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  )
}
