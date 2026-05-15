import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CreditCard, Crown, Zap, Wallet, TrendingUp, Shield,
  Check, ArrowRight, AlertCircle, Loader2, Gem, AdBadge
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const creditPackages = [
  { credits: 10, price: 49, popular: false },
  { credits: 50, price: 199, popular: true },
  { credits: 200, price: 599, popular: false },
  { credits: 1000, price: 2499, popular: false },
]

const subscriptionPlans = [
  {
    name: 'Starter',
    price: 99,
    period: 'month',
    features: ['50 videos/month', '1080p export', 'No watermark', 'Faster rendering'],
    icon: Zap,
    color: 'velora-green',
  },
  {
    name: 'Pro',
    price: 199,
    period: 'month',
    features: ['Unlimited videos', '4K export', 'Premium effects', 'Priority support', 'API access'],
    icon: Crown,
    color: 'amber-400',
  },
]

const EarningsPage = () => {
  const { user } = useAuth()
  const [selectedCredits, setSelectedCredits] = useState<number | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<'credits' | 'subscriptions' | 'watermark' | 'ads'>('credits')

  const handlePurchase = async (type: 'credits' | 'plan') => {
    if (!user) {
      toast.error('Please sign in to make a purchase')
      return
    }

    setLoading(true)

    // Simulate Razorpay integration
    // In production, this would open Razorpay checkout
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success(type === 'credits' ? 'Credits added successfully!' : 'Subscription activated!')
    setLoading(false)
    setSelectedCredits(null)
    setSelectedPlan(null)
  }

  const sections = [
    { id: 'credits' as const, label: 'Buy Credits', icon: CreditCard },
    { id: 'subscriptions' as const, label: 'Subscriptions', icon: Crown },
    { id: 'watermark' as const, label: 'Remove Watermark', icon: Shield },
    { id: 'ads' as const, label: 'Ad Revenue', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Earnings & Monetization</h1>
          <p className="text-velora-gray-text max-w-xl mx-auto">
            Manage your credits, subscriptions, and monetization options to maximize your video creation potential.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-velora-green/20 text-velora-green border border-velora-green/30'
                    : 'bg-white/5 text-velora-gray-text border border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            )
          })}
        </div>

        {/* Credits Section */}
        {activeSection === 'credits' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">Purchase Extra Credits</h2>
              <p className="text-sm text-velora-gray-text">Buy credits to generate more videos without upgrading your plan</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.credits}
                  onClick={() => setSelectedCredits(pkg.credits)}
                  className={`relative glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedCredits === pkg.credits
                      ? 'border-velora-green/50 shadow-[0_0_20px_rgba(0,255,136,0.15)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-velora-green text-velora-black text-[10px] font-bold rounded-full">
                      BEST VALUE
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-velora-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-velora-green" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{pkg.credits}</div>
                    <div className="text-sm text-velora-gray-muted mb-4">credits</div>
                    <div className="text-2xl font-bold text-velora-green">₹{pkg.price}</div>
                    <div className="text-xs text-velora-gray-muted mt-1">
                      ₹{(pkg.price / pkg.credits).toFixed(1)}/credit
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCredits && (
              <div className="glass-card rounded-2xl p-6 gradient-border text-center">
                <p className="text-sm text-velora-gray-text mb-4">
                  You are purchasing <span className="text-velora-green font-semibold">{selectedCredits} credits</span> for{' '}
                  <span className="text-velora-green font-semibold">
                    ₹{creditPackages.find(p => p.credits === selectedCredits)?.price}
                  </span>
                </p>
                <button
                  onClick={() => handlePurchase('credits')}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                  {loading ? 'Processing...' : 'Pay with Razorpay'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Subscriptions Section */}
        {activeSection === 'subscriptions' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">Subscription Plans</h2>
              <p className="text-sm text-velora-gray-text">Upgrade to unlock premium features and higher limits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {subscriptionPlans.map((plan) => {
                const Icon = plan.icon
                return (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`glass-card rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan.name
                        ? 'border-velora-green/50 shadow-[0_0_30px_rgba(0,255,136,0.15)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-${plan.color === 'velora-green' ? 'velora-green/10' : 'amber-500/10'} border border-${plan.color === 'velora-green' ? 'velora-green/30' : 'amber-500/30'} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${plan.color === 'velora-green' ? 'text-velora-green' : 'text-amber-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                        <p className="text-xs text-velora-gray-muted">Monthly billing</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                      <span className="text-velora-gray-muted text-sm">/{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className={`w-4 h-4 ${plan.color === 'velora-green' ? 'text-velora-green' : 'text-amber-400'}`} />
                          <span className="text-sm text-velora-gray-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            {selectedPlan && (
              <div className="glass-card rounded-2xl p-6 gradient-border text-center max-w-md mx-auto">
                <p className="text-sm text-velora-gray-text mb-4">
                  Subscribe to <span className="text-velora-green font-semibold">{selectedPlan} Plan</span> for{' '}
                  <span className="text-velora-green font-semibold">
                    ₹{subscriptionPlans.find(p => p.name === selectedPlan)?.price}/month
                  </span>
                </p>
                <button
                  onClick={() => handlePurchase('plan')}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Watermark Removal Section */}
        {activeSection === 'watermark' && (
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-6 sm:p-8 gradient-border text-center">
              <div className="w-16 h-16 bg-velora-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-velora-green" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">Remove Watermark</h2>
              <p className="text-velora-gray-text text-sm mb-6 max-w-md mx-auto">
                Watermark removal is included with Starter (₹99/month) and Pro (₹199/month) plans. 
                Upgrade now to remove watermarks from all your videos.
              </p>

              <div className="bg-white/5 rounded-xl p-5 mb-6 text-left">
                <h4 className="text-sm font-semibold text-white mb-3">What's included:</h4>
                <ul className="space-y-2">
                  {[
                    'No Velora watermark on all exports',
                    'Custom branding options',
                    'Clean professional output',
                    'Works with all video types',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-velora-gray-text">
                      <Check className="w-4 h-4 text-velora-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/pricing" className="btn-primary inline-flex items-center gap-2">
                View Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Ad Revenue Section */}
        {activeSection === 'ads' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 gradient-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-velora-green/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-velora-green" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Ad Revenue Program</h2>
                  <p className="text-sm text-velora-gray-muted">Earn from your creative content</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total Earnings', value: '₹0', icon: Wallet },
                  { label: 'This Month', value: '₹0', icon: TrendingUp },
                  { label: 'Pending', value: '₹0', icon: Gem },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-4 text-center">
                      <Icon className="w-5 h-5 text-velora-green mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-velora-gray-muted">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-velora-green/5 border border-velora-green/20 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-velora-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Coming Soon</h4>
                    <p className="text-sm text-velora-gray-text">
                      Our ad revenue sharing program is launching soon. Pro plan users will be eligible 
                      to earn from ad placements on their public video pages. Stay tuned for updates!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">How it will work:</h4>
                {[
                  'Publish videos to your public profile',
                  'Enable monetization on eligible videos',
                  'Earn revenue from ad impressions',
                  'Withdraw earnings to your bank account',
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-velora-gray-text">
                    <div className="w-6 h-6 bg-velora-green/20 rounded-full flex items-center justify-center text-xs text-velora-green font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EarningsPage
