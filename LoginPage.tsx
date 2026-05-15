import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Loader2 } from 'lucide-react'
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/firebase'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      toast.success('Welcome to Velora AI Studio!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password)
        toast.success('Account created successfully!')
      } else {
        await signInWithEmail(email, password)
        toast.success('Welcome back!')
      }
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      {/* Background */}
      <div className="fixed inset-0 bg-velora-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-velora-green/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-velora-green/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-velora-black border border-velora-green/40 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-velora-green" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white leading-tight">Velora</span>
              <span className="text-xs text-velora-gray-muted -mt-0.5">AI Studio</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-velora-gray-text text-sm">
            {isSignUp ? 'Start creating AI videos today' : 'Sign in to continue creating'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 gradient-border">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium text-sm hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Chrome className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-velora-gray-muted uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-velora-gray-text mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-velora-gray-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-velora-gray-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-velora-gray-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-velora-gray-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-velora-gray-text mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-velora-green font-medium hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
