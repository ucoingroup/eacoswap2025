export const THEME_KEYS = {
  COSMIC: 'cosmic',
  ARMY: 'army',
  CLASSIC: 'classic',
  TELEGRAM: 'telegram',
}

export const THEME_NAMES = [
  { key: THEME_KEYS.COSMIC, labelKey: 'theme_cosmic', previewBg: '#0a1628', previewAccent: '#64ffda' },
  { key: THEME_KEYS.ARMY, labelKey: 'theme_army', previewBg: '#1b2a1b', previewAccent: '#c3b091' },
  { key: THEME_KEYS.CLASSIC, labelKey: 'theme_classic', previewBg: '#f5f0e8', previewAccent: '#8b0000' },
  { key: THEME_KEYS.TELEGRAM, labelKey: 'theme_telegram', previewBg: '#000000', previewAccent: '#2481cc' },
]

export function applyTheme(themeKey) {
  const root = document.documentElement
  const body = document.body

  // Remove old data-theme
  body.setAttribute('data-theme', themeKey)

  // For telegram theme, sync with Telegram colors
  if (themeKey === THEME_KEYS.TELEGRAM) {
    const tg = window.Telegram?.WebApp
    if (tg?.themeParams) {
      const p = tg.themeParams
      root.style.setProperty('--bg-primary', p.bg_color || '#0a1628')
      root.style.setProperty('--bg-secondary', p.secondary_bg_color || '#0d2137')
      root.style.setProperty('--accent', p.button_color || '#64ffda')
      root.style.setProperty('--text-primary', p.text_color || '#e6f1ff')
      root.style.setProperty('--text-secondary', p.hint_color || '#8892b0')
      root.style.setProperty('--border', p.section_separator_color || '#1d3557')
    }
  }

  // Set meta theme-color for mobile browser chrome
  const metaTheme = document.querySelector('meta[name="theme-color"]')
  const colors = {
    cosmic: '#0a1628',
    army: '#1b2a1b',
    classic: '#f5f0e8',
    telegram: '#000000',
  }
  if (metaTheme) {
    metaTheme.setAttribute('content', colors[themeKey] || '#0a1628')
  }
}
