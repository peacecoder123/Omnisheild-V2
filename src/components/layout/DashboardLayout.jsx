import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import OfflineBanner from '../common/OfflineBanner.jsx'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <OfflineBanner />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
