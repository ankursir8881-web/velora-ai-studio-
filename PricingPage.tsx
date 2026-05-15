import PricingSection from '@/components/PricingSection'
import { Check, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'Can I upgrade or downgrade my plan anytime?',
    a: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle.',
  },
  {
    q: 'What happens if I run out of credits?',
    a: 'You can purchase additional credits from the Earnings page, or upgrade to a higher plan for more monthly credits.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'We offer a 7-day money-back guarantee for all paid plans. No questions asked.',
  },
  {
    q: 'Can I use the videos commercially?',
    a: 'Yes! All videos generated on Starter and Pro plans can be used for commercial purposes. Free plan videos include a watermark.',
  },
  {
    q: 'How long are videos stored?',
    a: 'Videos are stored for 30 days on the Free plan, 90 days on Starter, and indefinitely on Pro.',
  },
]

const PricingPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-10">
      <PricingSection />

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-velora-gray-text">Everything you need to know about our pricing</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-xl p-5 sm:p-6 gradient-border">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-velora-green flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-velora-gray-text leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PricingPage
