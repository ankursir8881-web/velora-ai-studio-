import { useRef, useEffect, useState } from 'react'
import { Type, Image, Wand2, Layout, Film, ArrowRight } from 'lucide-react'

const tools = [
  {
    icon: Type,
    title: 'Text to Video',
    description: 'Transform your text prompts into stunning cinematic videos with AI-powered generation.',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Image,
    title: 'Image to Video',
    description: 'Bring your static images to life with smooth AI animations and transitions.',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Wand2,
    title: 'AI Animation',
    description: 'Create fluid animations and motion graphics using advanced AI models.',
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
  {
    icon: Layout,
    title: 'Thumbnail Generator',
    description: 'Generate eye-catching thumbnails optimized for engagement and clicks.',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
  },
  {
    icon: Film,
    title: 'Cinematic Effects',
    description: 'Apply premium cinematic effects, color grading, and professional filters.',
    color: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'border-rose-500/30',
    iconColor: 'text-rose-400',
  },
]

const AIToolsSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-velora-black via-velora-dark to-velora-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-velora-green text-sm font-semibold tracking-wider uppercase mb-3 block">
            AI Tools
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful AI Video Tools
          </h2>
          <p className="text-velora-gray-text text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to create professional videos with the power of artificial intelligence.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            const isVisible = visibleCards.has(index)

            return (
              <div
                key={tool.title}
                ref={(el) => { cardRefs.current[index] = el }}
                data-index={index}
                className={`group relative glass-card p-6 sm:p-8 card-hover gradient-border cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${tool.color} border ${tool.borderColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${tool.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-velora-green transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm sm:text-base text-velora-gray-text leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium text-velora-green opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    Try Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AIToolsSection
