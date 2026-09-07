import React from 'react'

export default function FAQItem({ item, isExpanded, onToggle }) {
  return (
    <div className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span className="faq-q-mark">Q</span>
        <span className="faq-q-text">{item.question}</span>
        <span className="faq-chevron">{isExpanded ? '−' : '+'}</span>
      </button>
      {isExpanded && (
        <div className="faq-answer">
          <span className="faq-a-mark">A</span>
          <p>{item.answer}</p>
        </div>
      )}
      <style>{`
        .faq-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .faq-item.expanded {
          border-color: var(--accent);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: none;
          border: none;
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .faq-q-mark {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent);
          color: var(--bg-primary);
          border-radius: 50%;
          font-size: 12px;
          font-weight: 800;
        }
        .faq-q-text {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }
        .faq-chevron {
          flex-shrink: 0;
          font-size: 18px;
          color: var(--text-secondary);
          font-weight: 300;
        }
        .faq-answer {
          display: flex;
          gap: 10px;
          padding: 0 16px 16px;
          animation: fadeIn 0.2s ease-out;
        }
        .faq-a-mark {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          color: var(--accent);
          border-radius: 50%;
          font-size: 12px;
          font-weight: 800;
        }
        .faq-answer p {
          flex: 1;
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }
      `}</style>
    </div>
  )
}
