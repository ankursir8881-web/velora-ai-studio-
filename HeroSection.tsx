import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowRight, Sparkles } from 'lucide-react'

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      speed: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15))
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0.03)')
      gradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.01)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx * p.speed
        p.y += p.vy * p.speed

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-velora-green/5 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-velora-green/3 rounded-full blur-[100px] animate-glow-pulse animate-delay-500" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-velora-green/10 border border-velora-green/20 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-velora-green" />
          <span className="text-sm font-medium text-velora-green">AI-Powered Video Generation</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
          <span className="text-white">Create AI Videos</span>
          <br />
          <span className="text-velora-green neon-text">in Seconds</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-velora-gray-text max-w-2xl mx-auto mb-10 animate-slide-up animate-delay-200">
          Generate cinematic AI videos from text, images, and prompts. 
          Professional quality, lightning fast.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-300">
          <Link to="/dashboard" className="btn-primary flex items-center gap-2 text-base px-8 py-4 w-full sm:w-auto justify-center">
            Generate Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="btn-secondary flex items-center gap-2 text-base px-8 py-4 w-full sm:w-auto justify-center">
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto mt-16 animate-fade-in animate-delay-400">
          {[
            { value: '10K+', label: 'Videos Created' },
            { value: '4.9', label: 'User Rating' },
            { value: '< 30s', label: 'Avg. Generation' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-velora-gray-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-velora-green/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-velora-green rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
