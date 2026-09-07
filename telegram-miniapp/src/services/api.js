import axios from 'axios'

const DEFAULT_TIMEOUT = 15000

function getBaseURL() {
  return localStorage.getItem('eaco-backend-url') || import.meta.env.VITE_BACKEND_URL || ''
}

const apiClient = axios.create({
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(config => {
  const base = getBaseURL()
  if (base && !config.url.startsWith('http')) {
    config.baseURL = base
  }
  return config
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.resolve({ data: { success: false, error: error.response.data?.error || `HTTP ${error.response.status}` } })
    }
    if (error.request) {
      return Promise.resolve({ data: { success: false, error: 'Network error - check connection' } })
    }
    return Promise.resolve({ data: { success: false, error: error.message } })
  }
)

export async function apiGet(url, params = {}) {
  try {
    const response = await apiClient.get(url, { params })
    return response.data
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export async function apiPost(url, data = {}) {
  try {
    const response = await apiClient.post(url, data)
    return response.data
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export async function fetchWithTimeout(url, options = {}, timeout = 15000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(id)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}
