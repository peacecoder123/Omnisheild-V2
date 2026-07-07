import { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'

export default function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine)
  const [showSyncing, setShowSyncing] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true)
      setShowSyncing(true)
      setTimeout(() => setShowSyncing(false), 3000)
    }
    const handleOffline = () => {
      setOnline(false)
      setShowSyncing(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (online && !showSyncing) return null

  if (showSyncing) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
        <Wifi className="w-4 h-4" />
        Back online — syncing offline data...
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium animate-pulse">
      <WifiOff className="w-4 h-4" />
      You are offline — changes will be saved locally and synced when reconnected
    </div>
  )
}
