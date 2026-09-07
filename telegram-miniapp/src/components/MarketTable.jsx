import React from 'react'
import { useI18N } from '../utils/i18n.js'
import { formatCurrency, formatCompact } from '../utils/helpers.js'

export default function MarketTable({ tokens, sortKey, sortDir, onSort }) {
  const { t } = useI18N()

  if (!tokens || tokens.length === 0) {
    return <div className="no-data">{t('no_results')}</div>
  }

  const SortIcon = ({ column }) => {
    if (sortKey !== column) return <span className="sort-icon">⇅</span>
    return <span className="sort-icon active">{sortDir === 'desc' ? '↓' : '↑'}</span>
  }

  return (
    <div className="market-table-container">
      <table className="market-table">
        <thead>
          <tr>
            <th className="col-rank">#</th>
            <th className="col-token" onClick={() => onSort('name')}>
              {t('token')} <SortIcon column="name" />
            </th>
            <th className="col-price" onClick={() => onSort('current_price')}>
              {t('price')} <SortIcon column="current_price" />
            </th>
            <th className="col-mcap" onClick={() => onSort('market_cap')}>
              {t('market_cap')} <SortIcon column="market_cap" />
            </th>
            <th className="col-change" onClick={() => onSort('price_change_percentage_24h')}>
              {t('change_24h')} <SortIcon column="price_change_percentage_24h" />
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => {
            const change = token.price_change_percentage_24h || 0
            const isPositive = change >= 0
            return (
              <tr key={token.id || index} onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}>
                <td className="col-rank">{index + 1}</td>
                <td className="col-token">
                  <div className="token-cell">
                    {token.image && (
                      <img src={token.image} alt={token.symbol} className="token-img" loading="lazy" />
                    )}
                    <div>
                      <div className="token-cell-name">{token.name}</div>
                      <div className="token-cell-symbol">{token.symbol?.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="col-price">{formatCurrency(token.current_price)}</td>
                <td className="col-mcap">{formatCompact(token.market_cap)}</td>
                <td className={`col-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? '+' : ''}{change.toFixed(2)}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <style>{`
        .market-table-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 0 -12px;
          padding: 0 12px;
        }
        .market-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .market-table thead th {
          text-align: left;
          padding: 10px 8px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid var(--border);
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
        }
        .market-table tbody tr {
          border-bottom: 1px solid var(--border-light);
          transition: background 0.15s ease;
        }
        .market-table tbody tr:active {
          background: var(--bg-tertiary);
        }
        .market-table tbody td {
          padding: 10px 8px;
          color: var(--text-primary);
        }
        .col-rank {
          width: 36px;
          text-align: center;
          color: var(--text-muted);
          font-weight: 600;
        }
        .col-token {
          min-width: 120px;
        }
        .token-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .token-img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .token-cell-name {
          font-weight: 600;
          font-size: 13px;
        }
        .token-cell-symbol {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .col-price, .col-mcap {
          white-space: nowrap;
          font-weight: 600;
        }
        .col-change {
          text-align: right;
          font-weight: 700;
          white-space: nowrap;
        }
        .col-change.positive {
          color: var(--success);
        }
        .col-change.negative {
          color: var(--error);
        }
        .sort-icon {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: 2px;
        }
        .sort-icon.active {
          color: var(--accent);
        }
        .no-data {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}
