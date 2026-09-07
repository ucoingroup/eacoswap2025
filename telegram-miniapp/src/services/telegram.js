import { useEffect } from 'react'

export function initTelegram() {
  const tg = window.Telegram?.WebApp
  if (!tg) {
    throw new Error('Telegram WebApp not available')
  }

  // Initialize
  tg.ready()

  // Expand to full screen
  tg.expand()

  // Set header color to match app
  tg.setHeaderColor(tg.colorScheme === 'dark' ? '#0a1628' : '#f5f0e8')
  tg.setBackgroundColor(tg.colorScheme === 'dark' ? '#0a1628' : '#f5f0e8')

  // Enable closing confirmation if needed
  tg.enableClosingConfirmation()

  // Set up haptic feedback on all buttons
  setupHapticFeedback()

  console.log('[TMA] Initialized:', tg.initDataUnsafe?.user?.username || 'unknown')
}

export function syncTheme() {
  const tg = window.Telegram?.WebApp
  if (!tg) return

  const themeParams = tg.themeParams
  if (themeParams) {
    const root = document.documentElement
    if (themeParams.bg_color) root.style.setProperty('--tg-bg-color', themeParams.bg_color)
    if (themeParams.secondary_bg_color) root.style.setProperty('--tg-secondary-bg-color', themeParams.secondary_bg_color)
    if (themeParams.text_color) root.style.setProperty('--tg-text-color', themeParams.text_color)
    if (themeParams.hint_color) root.style.setProperty('--tg-hint-color', themeParams.hint_color)
    if (themeParams.button_color) root.style.setProperty('--tg-button-color', themeParams.button_color)
    if (themeParams.button_text_color) root.style.setProperty('--tg-button-text-color', themeParams.button_text_color)
    if (themeParams.section_separator_color) root.style.setProperty('--tg-section-separator-color', themeParams.section_separator_color)
  }

  // Listen for theme changes
  tg.onEvent('themeChanged', () => {
    syncTheme()
  })
}

export function useTelegramViewport() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    const handleViewport = () => {
      const safeAreaInset = tg.viewportStableHeight ? (tg.viewportHeight - tg.viewportStableHeight) : 0
      document.documentElement.style.setProperty('--tg-bottom-height', `${safeAreaInset + 56}px`)
      document.documentElement.style.setProperty('--tg-header-height', '56px')
    }

    tg.onEvent('viewportChanged', handleViewport)
    handleViewport()

    return () => {
      tg.offEvent?.('viewportChanged', handleViewport)
    }
  }, [])
}

export function setupHapticFeedback() {
  const tg = window.Telegram?.WebApp
  if (!tg?.HapticFeedback) return

  const buttons = document.querySelectorAll('button, [role="button"]')
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      tg.HapticFeedback.impactOccurred('light')
    })
  })
}

export function showMainButton(text, onClick) {
  const tg = window.Telegram?.WebApp
  if (!tg?.MainButton) return

  tg.MainButton.setText(text)
  tg.MainButton.show()
  tg.MainButton.onClick(() => {
    tg.HapticFeedback?.impactOccurred('medium')
    onClick()
  })
}

export function hideMainButton() {
  const tg = window.Telegram?.WebApp
  if (!tg?.MainButton) return
  tg.MainButton.hide()
  tg.MainButton.offClick?.()
}

export function showBackButton(onClick) {
  const tg = window.Telegram?.WebApp
  if (!tg?.BackButton) return
  tg.BackButton.show()
  tg.BackButton.onClick(() => {
    tg.HapticFeedback?.impactOccurred('light')
    onClick()
  })
}

export function hideBackButton() {
  const tg = window.Telegram?.WebApp
  if (!tg?.BackButton) return
  tg.BackButton.hide()
  tg.BackButton.offClick?.()
}

export function openTelegramLink(url) {
  const tg = window.Telegram?.WebApp
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(url)
  } else if (tg?.openLink) {
    tg.openLink(url)
  } else {
    window.open(url, '_blank')
  }
}

export function openExternalLink(url) {
  const tg = window.Telegram?.WebApp
  if (tg?.openLink) {
    tg.openLink(url)
  } else {
    window.open(url, '_blank')
  }
}

export function shareApp() {
  const tg = window.Telegram?.WebApp
  const botUsername = import.meta.env.VITE_BOT_USERNAME || 'eacoswap_bot'
  const text = 'Check out EACO Swap - Solana DEX Navigation Hub!'
  const url = `https://t.me/${botUsername}`

  if (tg?.switchInlineQuery) {
    tg.switchInlineQuery(text)
  } else if (tg?.openTelegramLink) {
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
  }
}

export function closeApp() {
  const tg = window.Telegram?.WebApp
  if (tg?.close) {
    tg.close()
  }
}

export function getUserInfo() {
  const tg = window.Telegram?.WebApp
  return tg?.initDataUnsafe?.user || null
}

export function isTelegram() {
  return !!window.Telegram?.WebApp
}
