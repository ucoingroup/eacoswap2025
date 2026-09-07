import React from 'react'

export default function LoadingSpinner({ size = 'medium', fullScreen = false }) {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60,
  }
  const px = sizeMap[size] || 40

  const spinner = (
    <div className="spinner" style={{ width: px, height: px }}>
      <svg viewBox="0 0 50 50" className="spinner-svg">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="60"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="spinner-fullscreen">
        {spinner}
        <style>{`
          .spinner-fullscreen {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: var(--bg-primary);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="spinner-container">
      {spinner}
      <style>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          padding: 40px 0;
        }
        .spinner-svg {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
