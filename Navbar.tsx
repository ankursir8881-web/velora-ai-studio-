import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles, User, LogOut, Zap } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { logOut } from '@/lib/firebase'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, userData } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success('Logged out successfully')
      navigate('/')
    } catch {
      toast.error('Failed to logout')
    }
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/earnings', label: 'Earnings' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-velora-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10">
              <div className="absolute inset-0 bg-velora-green/20 rounded-xl blur-md group-hover:bg-velora-green/30 transition-all" />
              <div className="relative w-full h-full bg-velora-black border border-velora-green/40 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-velora-green" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight">
                Velora
              </span>
              <span className="text-[10px] sm:text-xs text-velora-gray-muted -mt-0.5">
                AI Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-velora-green bg-velora-green/10'
                    : 'text-velora-gray-text hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {userData && (
                  <div className="flex items-center gap-1.5 bg-velora-gray/50 px-3 py-1.5 rounded-lg border border-white/5">
                    <Zap className="w-3.5 h-3.5 text-velora-green" />
                    <span className="text-xs font-semibold text-velora-green">{userData.credits || 0}</span>
                    <span className="text-[10px] text-velora-gray-muted">credits</span>
                  </div>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-velora-green/10 border border-velora-green/30 rounded-lg text-sm font-medium text-velora-green hover:bg-velora-green/20 transition-all"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-velora-gray-muted hover:text-white hover:bg-white/5 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-velora-gray-text hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-velora-gray-text hover:text-white hover:bg-white/5 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-velora-black/95 backdrop-blur-xl border-b border-white/5 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-velora-green bg-velora-green/10'
                  : 'text-velora-gray-text hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-velora-green bg-velora-green/10"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center btn-primary text-sm py-3"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
