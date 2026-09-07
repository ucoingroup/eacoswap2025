import React from 'react'
import { useI18N } from '../utils/i18n.js'
import { formatAmount } from '../utils/helpers.js'

export default function QuoteDisplay({ quote, fromToken, toToken }) {
  const { t } = useI18N()

  if (!quote) return null

  return (
    <div className="quote-display card">
      <h4 className="quote-title">{t('quote_output')}</h4>

      <div className="quote-row">
        <span className="quote-label">{t('quote_output')}</span>
        <span className="quote-value highlight">
          {formatAmount(quote.outAmount)} {toToken}
        </span>
      </div>

      <div className="quote-row">
        <span className="quote-label">{t('quote_slippage')}</span>
        <span className="quote-value">{quote.slippage || '0.5'}%</span>
      </div>

      <div className="quote-row">
        <span className="quote-label">{t('quote_route')}</span>
        <span className="quote-value route">
          {quote.route || `${fromToken} → Jupiter → ${toToken}`}
        </span>
      </div>

      <div className="quote-row">
        <span className="quote-label">{t('quote_price_impact')}</span>
        <span className={`quote-value ${(quote.priceImpact || 0) > 1 ? 'warning' : ''}`}>
          {(quote.priceImpact || 0).toFixed(2)}%
        </span>
      </div>

      <button
        className="button swap-execute-btn"
        onClick={() => {
          window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
          alert('Proceed to swap execution...')
        }}
      >
        {t('swap_now')}
      </button>

      <style>{`
        .quote-display {
          margin-top: 16px;
        }
        .quote-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .quote-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .quote-row:last-of-type {
          border-bottom: none;
        }
        .quote-label {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .quote-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .quote-value.highlight {
          color: var(--accent);
          font-size: 18px;
        }
        .quote-value.route {
          font-size: 12px;
          max-width: 160px;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .quote-value.warning {
          color: var(--warning);
        }
        .swap-execute-btn {
          width: 100%;
          margin-top: 12px;
        }
      `}</style>
    </div>
  )
}
