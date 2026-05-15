import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Zap, Crown, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    icon: Sparkles,
    iconColor: 'text-velora-gray-muted',
    bgColor: 'bg-velora-gray/30',
    borderColor: 'border-white/10',
    features: [
      'First 5 videos free',
      '8 seconds per video',
      '720p quality export',
      'Basic AI models',
      'Community support',
      'Watermark included',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Starter',
    price: '₹99',
    period: '/month',
    icon: Zap,
    iconColor: 'text-velora-green',
    bgColor: 'bg-velora-green/10',
    borderColor: 'border-velora-green/40',
    features: [
      '50 videos per month',
      'Up to 15 seconds each',
      '1080p HD export',
      'Faster rendering',
      'No watermark',
      'Email support',
      'Priority queue',
    ],
    cta: 'Start Trial',
    popular: true,
  },
  {
    name: 'Pro',
    price: '₹199',
    period: '/month',
    icon: Crown,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/40',
    features: [
      'Unlimited videos',
      'Up to 60 seconds each',
      '4K Ultra HD export',
      'Premium cinematic effects',
      'Priority rendering',
      '24/7 dedicated support',
      'API access',
      'Custom branding',
    ],
    cta: 'Go Pro',
    popular: false,
  },
]

const PricingSection = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-velora-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-velora-green/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-velora-green text-sm font-semibold tracking-wider uppercase mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-velora-gray-text text-base sm:text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const isHovered = hoveredPlan === index

            return (
              <div
                key={plan.name}
                className={`relative glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
                  plan.popular 
                    ? 'md:scale-105 md:-translate-y-2 border-velora-green/40 shadow-[0_0_40px_rgba(0,255,136,0.1)]' 
                    : 'border-white/10'
                } ${isHovered ? 'shadow-[0_0_30px_rgba(0,255,136,0.15)]' : ''}`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-velora-green text-velora-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${plan.bgColor} border ${plan.borderColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    <p className="text-xs text-velora-gray-muted">{plan.period === 'forever' ? 'Free forever' : 'Billed monthly'}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-velora-gray-muted text-sm ml-1">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-velora-green/20' : 'bg-white/5'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-velora-green' : 'text-velora-gray-muted'}`} />
                      </div>
                      <span className="text-sm text-velora-gray-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/dashboard"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-velora-green text-velora-black hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
