import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { initTelegram, syncTheme, useTelegramViewport } from './services/telegram.js'
import { I18NProvider } from './utils/i18n.js'
import { THEME_KEYS, applyTheme } from './utils/themes.js'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import Home from './pages/Home.jsx'
import Exchange from './pages/Exchange.jsx'
import Market from './pages/Market.jsx'
import FAQ from './pages/FAQ.jsx'
import Settings from './pages/Settings.jsx'

const TAB_ROUTES = ['/', '/exchange', '/market', '/faq', '/settings']

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tgReady, setTgReady] = useState(false)
  const [tgError, setTgError] = useState(null)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('eaco-theme')
    return saved || THEME_KEYS.COSMIC
  })
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('eaco-lang')
    const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code
    return saved || (tgLang && ['en','zh','es','ar','fr','ru'].includes(tgLang) ? tgLang : 'en')
  })
  const [backendUrl, setBackendUrl] = useState(() => {
    return localStorage.getItem('eaco-backend-url') || import.meta.env.VITE_BACKEND_URL || ''
  })

  // Initialize Telegram WebApp
  useEffect(() => {
    try {
      initTelegram()
      setTgReady(true)
    } catch (err) {
      console.warn('Telegram init failed, running in standalone mode:', err)
      setTgError('Telegram WebApp not available. Running in standalone mode.')
      setTgReady(true)
    }
  }, [])

  // Theme sync
  useEffect(() => {
    applyTheme(theme)
    if (theme === 'telegram') {
      syncTheme()
    }
  }, [theme])

  // Viewport adaptation
  useTelegramViewport()

  // Show/hide Telegram BackButton based on route
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg?.BackButton) return
    const isRoot = location.pathname === '/'
    if (isRoot) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
      tg.BackButton.onClick(() => {
        navigate(-1)
        tg.HapticFeedback?.impactOccurred('light')
      })
    }
    return () => {
      tg.BackButton.offClick?.()
    }
  }, [location.pathname, navigate])

  if (!tgReady) {
    return <LoadingSpinner fullScreen />
  }

  const currentTab = TAB_ROUTES.indexOf(location.pathname)

  return (
    <I18NProvider value={{ lang, setLang, t: (key) => key }}>
      <div className="app-container" data-theme={theme}>
        <Header />
        {tgError && <ErrorMessage message={tgError} dismissible />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home backendUrl={backendUrl} />} />
            <Route path="/exchange" element={<Exchange backendUrl={backendUrl} />} />
            <Route path="/market" element={<Market backendUrl={backendUrl} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/settings" element={
              <Settings
                theme={theme}
                setTheme={setTheme}
                lang={lang}
                setLang={setLang}
                backendUrl={backendUrl}
                setBackendUrl={setBackendUrl}
              />
            } />
          </Routes>
        </main>
        <BottomNav activeTab={currentTab >= 0 ? currentTab : 0} />
      </div>
    </I18NProvider>
  )
}
