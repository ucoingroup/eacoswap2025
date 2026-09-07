import React, { useState, useEffect, useCallback } from 'react'
import { useI18N } from '../utils/i18n.js'
import { apiGet } from '../services/api.js'
import MarketTable from '../components/MarketTable.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

const TIERS = [100, 1000, 10000]

export default function Market({ backendUrl }) {
  const { t } = useI18N()
  const [tier, setTier] = useState(100)
  const [tokens, setTokens] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortKey, setSortKey] = useState('market_cap')
  const [sortDir, setSortDir] = useState('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const fetchData = useCallback(async (refresh = false) => {
    if (!refresh) setLoading(true)
    setError(null)
    try {
      const perPage = Math.min(tier, 250)
      const page = 1
      const url = `${backendUrl}/api/tokens/market-cap?per_page=${perPage}&page=${page}`
      const res = await apiGet(url)
      if (res.success) {
        setTokens(res.data || [])
      } else {
        setError(res.error || 'Failed to load market data')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [tier, backendUrl])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    let result = [...tokens]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(t =>
        (t.name && t.name.toLowerCase().includes(q)) ||
        (t.symbol && t.symbol.toLowerCase().includes(q))
      )
    }
    result.sort((a, b) => {
      const av = a[sortKey] || 0
      const bv = b[sortKey] || 0
      return sortDir === 'desc' ? bv - av : av - bv
    })
    setFiltered(result.slice(0, tier))
  }, [tokens, searchQuery, sortKey, sortDir, tier])

  const handleSort = (key) => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
    if (sortKey === key) {
      setSortDir(prev => prev === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e) => {
    if (!touchStart || isRefreshing) return
    const diff = e.touches[0].clientY - touchStart
    if (diff > 100 && window.scrollY <= 0) {
      setIsRefreshing(true)
      fetchData(true)
      setTouchStart(null)
    }
  }

  return (
    <div className="market-page animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <h2 className="page-title">{t('market_title')}</h2>

      {/* Tier Tabs */}
      <div className="tier-tabs">
        {TIERS.map(t => (
          <button
            key={t}
            className={`tier-tab ${tier === t ? 'active' : ''}`}
            onClick={() => {
              window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              setTier(t)
            }}
          >
            {t === 100 ? t('top_100') : t === 1000 ? t('top_1000') : t('top_10000')}
          </button>
        ))}
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t('search_token')}
      />

      {isRefreshing && (
        <div className="refresh-indicator">
          <LoadingSpinner size="small" />
          <span>{t('refreshing')}</span>
        </div>
      )}

      {loading && !isRefreshing ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchData(true)} />
      ) : (
        <MarketTable
          tokens={filtered}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      )}

      <style>{`
        .market-page {
          padding-bottom: 20px;
        }
        .tier-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .tier-tab {
          flex: 1;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tier-tab.active {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }
        .tier-tab:active {
          transform: scale(0.96);
        }
        .refresh-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          color: var(--text-secondary);
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}
