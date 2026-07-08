import Link from "next/link"
import Newsletter from "./Newsletter"

function getFlagUrl(slug: string): string {
  const map: Record<string, string> = {
    kenya: "ke", nigeria: "ng", "south-africa": "za",
    ghana: "gh", tanzania: "tz", uganda: "ug",
  }
  return `https://flagcdn.com/20x15/${map[slug] || slug}.png`
}

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
  {
    label: "Telegram", href: "#",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  },
  {
    label: "YouTube", href: "#",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white">
      {/* Full background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/95 via-[#2d1b4e]/90 to-[#1a0a2e]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/40 to-transparent" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-ubuntu-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-ubuntu-purple/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Top: Brand + Description + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 animate-fade-up">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #FFD700, #E95420)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                iGamingUbuntu
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg">
              Africa's trusted iGaming content authority. Expert betting site reviews, 
              affiliate guides, and industry news across Kenya, Nigeria, South Africa, Ghana, Tanzania, and beyond.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ubuntu-orange hover:scale-125 hover:shadow-lg hover:shadow-ubuntu-orange/30 transition-all duration-300 text-white/60 hover:text-white" title={s.label}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 animate-fade-up delay-2">
            <div className="bg-white/5 rounded-xl p-5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition">
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            {
              title: "Navigate",
              links: [
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
                { label: "Press Release", href: "/press" },
                { label: "Sports Betting", href: "/sports" },
                { label: "Casino Directory", href: "/casinos" },
                { label: "Events", href: "/events" },
                { label: "The Desk", href: "/the-desk" },
                { label: "About", href: "/about" },
              ],
            },
            {
              title: "Markets",
              isMarkets: true,
              links: [
                { label: "Kenya", slug: "kenya" },
                { label: "Nigeria", slug: "nigeria" },
                { label: "South Africa", slug: "south-africa" },
                { label: "Ghana", slug: "ghana" },
                { label: "Tanzania", slug: "tanzania" },
                { label: "Uganda", slug: "uganda" },
              ],
            },
            {
              title: "Categories",
              links: [
                { label: "Industry News", href: "/news/industry" },
                { label: "Regulation Watch", href: "/news/regulation" },
                { label: "Casino Reviews", href: "/casinos" },
                { label: "Sports Betting", href: "/sports" },
                { label: "Bonus Guides", href: "/guides" },
                { label: "Responsible Gambling", href: "/guides" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About the Writer", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ],
            },
          ].map((col, i) => (
            <div key={col.title} className={`animate-fade-up delay-${i + 1}`}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gold/80 mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-gold/50">
                {col.title}
              </h4>
              <div className="space-y-2.5 mt-4">
                {(col.links as any[]).map((l: any) => (
                  <Link
                    key={l.label}
                    href={l.href || (l.slug === "uganda" ? "#" : `/${l.slug}`)}
                    className="group block text-sm text-white/50 hover:text-white transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      {col.isMarkets && <img src={getFlagUrl(l.slug)} alt="" className="w-4 h-3 rounded object-cover" />}
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold/60 group-hover:w-full transition-all duration-300" />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="border-t border-white/10 pt-8 mb-8 animate-fade-up delay-4">
          <p className="text-xs text-white/30 text-center mb-6 uppercase tracking-widest">Trusted Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/20">
            {["SportPesa", "1xBet", "Betika", "Betway", "22Bet", "Melbet", "HollywoodBets", "Bet9ja"].map((p, i) => (
              <span
                key={p}
                className="text-sm font-semibold tracking-wider opacity-40 hover:opacity-100 hover:text-white hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/30 animate-fade-up delay-5">
          <p className="mb-2 max-w-3xl mx-auto text-xs leading-relaxed">
            <span className="text-gold/80">Affiliate Disclosure:</span> This site contains affiliate links. We may earn a commission when you sign up through our links at no extra cost to you. 
            All opinions and reviews are our own based on independent research.
          </p>
          <p className="text-xs mt-3">
            <span className="text-ubuntu-red font-semibold">18+ Only.</span> Please gamble responsibly. If you or someone you know needs help, contact your local responsible gambling organization.
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} iGamingUbuntu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
