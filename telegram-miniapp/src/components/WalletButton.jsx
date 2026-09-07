import React, { useState } from 'react'
import { useI18N } from '../utils/i18n.js'
import { connectPhantom, connectSolflare, connectBackpack, isWalletAvailable } from '../services/wallet.js'

export default function WalletButton() {
  const { t } = useI18N()
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const wallets = [
    { id: 'phantom', name: 'Phantom', icon: '👻', check: () => isWalletAvailable('phantom'), connect: connectPhantom },
    { id: 'solflare', name: 'Solflare', icon: '🔥', check: () => isWalletAvailable('solflare'), connect: connectSolflare },
    { id: 'backpack', name: 'Backpack', icon: '🎒', check: () => isWalletAvailable('backpack'), connect: connectBackpack },
  ]

  const handleConnect = async (wallet) => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
    try {
      const result = await wallet.connect()
      if (result?.address) {
        setAddress(result.address)
        setConnected(true)
        setShowModal(false)
      }
    } catch (err) {
      alert('Wallet connection failed: ' + err.message)
    }
  }

  const handleDisconnect = () => {
    setConnected(false)
    setAddress(null)
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
  }

  if (connected) {
    return (
      <button className="wallet-btn connected" onClick={handleDisconnect}>
        <span className="wallet-dot" /> {address.slice(0, 4)}...{address.slice(-4)}
      </button>
    )
  }

  return (
    <>
      <button className="wallet-btn" onClick={() => setShowModal(true)}>
        {t('connect_wallet')}
      </button>
      {showModal && (
        <div className="wallet-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="wallet-modal" onClick={e => e.stopPropagation()}>
            <h3>{t('wallet_connect_title')}</h3>
            <div className="wallet-list">
              {wallets.map(wallet => (
                <button
                  key={wallet.id}
                  className="wallet-option"
                  disabled={!wallet.check()}
                  onClick={() => handleConnect(wallet)}
                >
                  <span className="wallet-icon">{wallet.icon}</span>
                  <span>{wallet.name}</span>
                  {!wallet.check() && <span className="wallet-not-installed">Not installed</span>}
                </button>
              ))}
            </div>
            <button className="wallet-close" onClick={() => setShowModal(false)}>{t('close')}</button>
          </div>
        </div>
      )}
      <style>{`
        .wallet-btn {
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid var(--accent);
          background: var(--accent);
          color: var(--bg-primary);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .wallet-btn.connected {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border-color: var(--success);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .wallet-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          display: inline-block;
        }
        .wallet-btn:active {
          transform: scale(0.96);
        }
        .wallet-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .wallet-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 340px;
        }
        .wallet-modal h3 {
          margin-bottom: 16px;
          font-size: 18px;
          color: var(--text-primary);
        }
        .wallet-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        .wallet-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .wallet-option:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .wallet-option:active:not(:disabled) {
          border-color: var(--accent);
          transform: scale(0.98);
        }
        .wallet-icon {
          font-size: 24px;
        }
        .wallet-not-installed {
          margin-left: auto;
          font-size: 11px;
          color: var(--text-muted);
        }
        .wallet-close {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: none;
          color: var(--text-secondary);
          font-size: 14px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
