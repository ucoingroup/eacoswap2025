import React, { useState } from 'react'
import { useI18N } from '../utils/i18n.js'
import { TOKEN_LIST } from '../utils/constants.js'
import TokenSelector from '../components/TokenSelector.jsx'
import SwapInput from '../components/SwapInput.jsx'
import QuoteDisplay from '../components/QuoteDisplay.jsx'
import { getSwapQuote } from '../services/swap.js'

export default function Exchange({ backendUrl }) {
  const { t } = useI18N()
  const [fromToken, setFromToken] = useState('EACO')
  const [toToken, setToToken] = useState('SOL')
  const [amount, setAmount] = useState('')
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGetQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    setLoading(true)
    setError(null)
    try {
      const q = await getSwapQuote({ fromToken, toToken, amount, backendUrl })
      setQuote(q)
      // Set Telegram MainButton for confirmation
      const tg = window.Telegram?.WebApp
      if (tg?.MainButton) {
        tg.MainButton.setText(`Swap ${amount} ${fromToken} → ${toToken}`)
        tg.MainButton.show()
        tg.MainButton.onClick(() => handleExecuteSwap(q))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleExecuteSwap = async (quoteData) => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
    // Execute swap through backend or Jupiter directly
    alert('Swap execution would proceed with: ' + JSON.stringify(quoteData))
  }

  return (
    <div className="exchange-page animate-fade-in">
      <h2 className="page-title">{t('exchange_title')}</h2>

      <div className="swap-card card">
        <div className="swap-section">
          <label className="swap-label">{t('from_token')}</label>
          <TokenSelector
            selected={fromToken}
            onSelect={setFromToken}
            exclude={toToken}
          />
          <SwapInput
            value={amount}
            onChange={setAmount}
            token={fromToken}
            label={t('amount')}
          />
        </div>

        <div className="swap-divider">
          <button className="swap-arrow" onClick={() => {
            setFromToken(toToken)
            setToToken(fromToken)
            setQuote(null)
          }}>⇅</button>
        </div>

        <div className="swap-section">
          <label className="swap-label">{t('to_token')}</label>
          <TokenSelector
            selected={toToken}
            onSelect={setToToken}
            exclude={fromToken}
          />
        </div>

        <button
          className="button quote-button"
          onClick={handleGetQuote}
          disabled={loading || !amount}
        >
          {loading ? t('loading') : t('get_quote')}
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {quote && (
        <QuoteDisplay quote={quote} fromToken={fromToken} toToken={toToken} />
      )}

      <style>{`
        .exchange-page {
          padding-bottom: 20px;
        }
        .page-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .swap-card {
          padding: 20px;
        }
        .swap-section {
          margin-bottom: 12px;
        }
        .swap-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .swap-divider {
          display: flex;
          justify-content: center;
          margin: 8px 0;
        }
        .swap-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--border);
          background: var(--bg-tertiary);
          color: var(--accent);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .swap-arrow:active {
          transform: rotate(180deg);
          border-color: var(--accent);
        }
        .quote-button {
          width: 100%;
          margin-top: 16px;
        }
        .quote-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .error-box {
          margin-top: 12px;
          padding: 12px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid var(--error);
          border-radius: 10px;
          color: var(--error);
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}
