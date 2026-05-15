import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import HomePage from '@/pages/HomePage'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'
import PricingPage from '@/pages/PricingPage'
import EarningsPage from '@/pages/EarningsPage'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-velora-black text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/earnings" element={<EarningsPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
