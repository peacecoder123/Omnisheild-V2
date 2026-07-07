import { syncAllPending } from './offlineDB.js'

let syncing = false

export function initSyncManager() {
  window.addEventListener('online', handleOnline)
}

export function destroySyncManager() {
  window.removeEventListener('online', handleOnline)
}

async function handleOnline() {
  if (syncing) return
  syncing = true
  try {
    const results = await syncAllPending()
    const total = results.reduce((sum, r) => sum + r.synced, 0)
    if (total > 0) {
      showSyncToast(`Synced ${total} offline record(s) successfully`)
    }
  } catch (err) {
    console.error('Sync failed:', err)
  } finally {
    syncing = false
  }
}

function showSyncToast(message) {
  const el = document.createElement('div')
  el.className = 'fixed top-16 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium'
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 4000)
}
