import { openDB } from 'idb'
import { api } from './api.js'

const DB_NAME = 'omnishield_offline'
const DB_VERSION = 1
const STORES = ['pendingScans', 'pendingVitals', 'pendingResults', 'pendingAppointments']

const STORE_ENDPOINTS = {
  pendingScans: '/patients/scan',
  pendingVitals: '/vitals',
  pendingResults: null, // handled per record
  pendingAppointments: '/appointments',
}

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        STORES.forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id', autoIncrement: true })
          }
        })
      },
    })
  }
  return dbPromise
}

export async function addPendingRecord(storeName, data) {
  const db = await getDB()
  return db.add(storeName, { ...data, createdAt: Date.now() })
}

export async function getPendingRecords(storeName) {
  const db = await getDB()
  return db.getAll(storeName)
}

export async function clearPendingRecords(storeName) {
  const db = await getDB()
  return db.clear(storeName)
}

export async function syncAllPending() {
  const results = []
  for (const store of STORES) {
    const records = await getPendingRecords(store)
    if (records.length === 0) continue
    const endpoint = STORE_ENDPOINTS[store]
    if (!endpoint) continue
    try {
      for (const record of records) {
        const { id, createdAt, ...data } = record
        await api.post(endpoint, data)
      }
      await clearPendingRecords(store)
      results.push({ store, synced: records.length })
    } catch (err) {
      console.error(`Failed to sync ${store}:`, err)
    }
  }
  return results
}
