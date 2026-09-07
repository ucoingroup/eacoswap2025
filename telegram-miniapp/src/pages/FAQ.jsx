import React, { useState, useMemo } from 'react'
import { useI18N } from '../utils/i18n.js'
import { FAQ_DATA, FAQ_CATEGORIES } from '../data/faq.js'
import FAQItem from '../components/FAQItem.jsx'
import SearchBar from '../components/SearchBar.jsx'

export default function FAQ() {
  const { t } = useI18N()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    let result = FAQ_DATA
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(item =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      )
    }
    return result
  }, [searchQuery, activeCategory])

  const handleToggle = (id) => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="faq-page animate-fade-in">
      <h2 className="page-title">{t('faq_title')}</h2>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t('faq_search')}
      />

      {/* Category Filter */}
      <div className="category-chips">
        {FAQ_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              setActiveCategory(cat.id)
            }}
          >
            {t(`faq_${cat.id}`)}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="faq-list">
        {filtered.length === 0 ? (
          <div className="no-results">{t('no_results')}</div>
        ) : (
          filtered.map(item => (
            <FAQItem
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))
        )}
      </div>

      <style>{`
        .faq-page {
          padding-bottom: 20px;
        }
        .category-chips {
          display: flex;
          gap: 8px;
          margin: 12px 0 16px;
          flex-wrap: wrap;
        }
        .category-chip {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .category-chip.active {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }
        .category-chip:active {
          transform: scale(0.95);
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}
