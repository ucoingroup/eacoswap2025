// ===== Formatting Utilities =====

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(value, decimals = 4) {
  if (value === undefined || value === null) return '-'
  const num = parseFloat(value)
  if (isNaN(num)) return '-'

  if (num >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return '$' + (num / 1e3).toFixed(2) + 'K'
  if (num >= 1) return '$' + num.toFixed(decimals)
  if (num >= 0.01) return '$' + num.toFixed(4)
  if (num > 0) return '$' + num.toExponential(2)
  return '$0.00'
}

/**
 * Format large numbers in compact notation
 */
export function formatCompact(value) {
  if (value === undefined || value === null) return '-'
  const num = parseFloat(value)
  if (isNaN(num)) return '-'

  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  return num.toFixed(2)
}

/**
 * Format token amounts
 */
export function formatAmount(value, decimals = 4) {
  if (value === undefined || value === null) return '0'
  const num = parseFloat(value)
  if (isNaN(num)) return '0'
  if (num === 0) return '0'

  if (num >= 1e9) return num.toExponential(2)
  if (num >= 1) return num.toFixed(decimals).replace(/\.?0+$/, '')
  if (num >= 0.0001) return num.toFixed(6)
  return num.toExponential(3)
}

/**
 * Truncate blockchain address for display
 */
export function truncateAddress(address, startChars = 6, endChars = 4) {
  if (!address || address.length < startChars + endChars + 3) return address || ''
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * Format percentage change with sign and color indicator
 */
export function formatChange(value, decimals = 2) {
  if (value === undefined || value === null) return '-'
  const num = parseFloat(value)
  if (isNaN(num)) return '-'
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(decimals)}%`
}

/**
 * Format timestamp to readable date/time
 */
export function formatDate(timestamp) {
  if (!timestamp) return '-'
  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function timeAgo(timestamp) {
  if (!timestamp) return '-'
  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(timestamp)
}

/**
 * Parse URL parameters
 */
export function parseQueryParams(url) {
  const params = new URLSearchParams(url.split('?')[1] || '')
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

/**
 * Debounce function
 */
export function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

/**
 * Detect if device is mobile
 */
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || (window.innerWidth < 768)
}

/**
 * Generate a unique ID
 */
export function generateId(prefix = '') {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}
