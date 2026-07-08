import Link from "next/link"

const socialLinks = [
  {
    label: "Email",
    href: "mailto:hello@igamingubuntu.com",
    svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  },
  {
    label: "LinkedIn", href: "#",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "Twitter", href: "#",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white">
      {/* Curved S-wave top separator */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-auto">
          <path d="M0,60 C240,120 480,0 720,50 C960,100 1200,20 1440,60 L1440,0 L0,0 Z" fill="#1a0a2e" />
        </svg>
      </div>

      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=85" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/95 via-[#2d1b4e]/90 to-[#1a0a2e]/95" />
      </div>

      {/* Animated orbs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-ubuntu-orange/10 rounded-full blur-3xl -translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl translate-x-1/3 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-ubuntu-purple/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10 pb-10 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <span className="text-xl font-bold" style={{ background: "linear-gradient(135deg, #FFD700, #E95420)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                iGamingUbuntu
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Africa's iGaming content authority — expert writing that ranks and converts.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ubuntu-orange hover:scale-125 transition-all duration-300 text-white/60 hover:text-white shadow-lg shadow-ubuntu-orange/10" title={s.label}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-semibold text-gold tracking-widest uppercase mb-4">Navigate</h4>
            <div className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Blogs", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-white/50 hover:text-gold hover:translate-x-1 transition-all duration-300">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-xs font-semibold text-gold tracking-widest uppercase mb-4">Markets</h4>
            <div className="space-y-2.5">
              {[
                { label: "Kenya", href: "/kenya" },
                { label: "Nigeria", href: "/nigeria" },
                { label: "South Africa", href: "/south-africa" },
                { label: "Ghana", href: "/ghana" },
                { label: "Tanzania", href: "/tanzania" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-white/50 hover:text-gold hover:translate-x-1 transition-all duration-300">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-gold tracking-widest uppercase mb-4">Company</h4>
            <div className="space-y-2.5">
              {[
                { label: "Work With Me", href: "/work-with-me" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
                { label: "Newsletter", href: "/newsletter/confirm" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-white/50 hover:text-gold hover:translate-x-1 transition-all duration-300">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <span className="text-white/30 text-xs">&copy; {new Date().getFullYear()} iGamingUbuntu. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>18+ Only</span>
            <span>Gamble Responsibly</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
