import { Link } from 'react-router-dom'
import { Sparkles, Github, Twitter, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Text to Video', href: '/dashboard' },
      { label: 'Image to Video', href: '/dashboard' },
      { label: 'AI Animation', href: '/dashboard' },
      { label: 'Thumbnail Generator', href: '/dashboard' },
      { label: 'Pricing', href: '/pricing' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Community', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <footer className="relative bg-velora-darker border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-velora-black border border-velora-green/40 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-velora-green" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">Velora</span>
                <span className="text-[10px] text-velora-gray-muted -mt-0.5">AI Studio</span>
              </div>
            </Link>
            <p className="text-sm text-velora-gray-muted mb-6 max-w-xs">
              Create stunning AI-generated videos in seconds. Professional quality, beginner-friendly.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-velora-gray-muted hover:text-velora-green hover:border-velora-green/30 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-velora-gray-muted hover:text-velora-green transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-velora-gray-muted">
            © {currentYear} Velora AI Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-velora-green rounded-full animate-pulse" />
            <span className="text-xs text-velora-gray-muted">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
