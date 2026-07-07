const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('omnishield_token')
}

function buildHeaders(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra }
  const token = getToken()
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...options,
      headers: buildHeaders(options.headers),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }))
      throw new Error(err.message || 'Request failed')
    }
    return res.json()
  } catch (err) {
    if (!navigator.onLine) {
      throw Object.assign(err, { offline: true })
    }
    throw err
  }
}

export const api = {
  get:    (path)       => request(path),
  post:   (path, body) => request(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (path, body) => request(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (path)       => request(path, { method: 'DELETE' }),
}

export const API_BASE = BASE
