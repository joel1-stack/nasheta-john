"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import type { Article, Country } from "@/types"

const sampleArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina came from 2-0 down to beat Egypt 3-2 in a thrilling World Cup Round of 16 match. Get the full result and best betting odds for the quarterfinal.",
    category: "Sports Betting", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    tags: ["World Cup", "Argentina", "Egypt", "Betting"],
    readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews & Bonuses",
    excerpt: "We review the best online casinos available in Kenya for 2026. Compare bonuses, game selection, M-Pesa support, and our expert ratings.",
    category: "Casino Reviews", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&q=80",
    tags: ["Kenya", "Casino", "Reviews"],
    readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites",
    excerpt: "Complete betting guide for the 2026 FIFA World Cup. Learn how to bet, where to get the best odds, and which betting sites to use in Africa.",
    category: "Betting Tips", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    tags: ["World Cup", "Betting", "Guide"],
    readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06",
  },
  {
    id: "4", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim Your 200% Match",
    excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus. Get 200% up to KES 5,000 on your first deposit. Terms and conditions explained.",
    category: "Bonuses", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    tags: ["SportPesa", "Bonus", "Kenya"],
    readTime: 5, author: "iGamingUbuntu", status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
  {
    id: "5", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026: Ranked & Reviewed",
    excerpt: "Find the best betting sites in Nigeria for 2026. Compare bonuses, odds, payment methods like Bank Transfer and our expert ratings.",
    category: "Sports Betting", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    tags: ["Nigeria", "Betting", "Reviews"],
    readTime: 10, author: "iGamingUbuntu", status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04",
  },
  {
    id: "6", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators Accepting Mobile Money",
    excerpt: "Complete list of betting sites that accept M-Pesa in 2026. Compare deposit limits, processing times, and welcome bonuses for mobile money users.",
    category: "Guides", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    tags: ["M-Pesa", "Kenya", "Mobile Money"],
    readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03",
  },
]

const countries: Country[] = [
  { id: "ke", name: "Kenya", slug: "kenya", flag: "", description: "Best betting sites, M-Pesa guides, and local operator reviews for Kenyan bettors.", articleCount: 120 },
  { id: "ng", name: "Nigeria", slug: "nigeria", flag: "", description: "Nigerian betting market, Naija bonuses, and sportsbook reviews for Nigerian players.", articleCount: 85 },
  { id: "za", name: "South Africa", slug: "south-africa", flag: "", description: "SA betting guides, Hollywoodbets reviews, and local regulations for South African bettors.", articleCount: 64 },
  { id: "gh", name: "Ghana", slug: "ghana", flag: "", description: "Ghana betting sites, Premier League tips, and mobile money guides for Ghanaian players.", articleCount: 42 },
  { id: "tz", name: "Tanzania", slug: "tanzania", flag: "", description: "Tanzania sports betting, casino reviews, and Tigo-Pesa guides for Tanzanian bettors.", articleCount: 38 },
]

const countryOrbColors: Record<string, string> = {
  kenya: "from-[#409824]/30 to-[#409824]/5",
  nigeria: "from-[#1B2385]/30 to-[#1B2385]/5",
  "south-africa": "from-[#D4AF37]/30 to-[#D4AF37]/5",
  ghana: "from-[#C7162B]/30 to-[#C7162B]/5",
  tanzania: "from-[#0E8420]/30 to-[#0E8420]/5",
}

function getFlagUrl(slug: string): string {
  const map: Record<string, string> = { kenya: "ke", nigeria: "ng", "south-africa": "za", ghana: "gh", tanzania: "tz" }
  return `https://flagcdn.com/48x36/${map[slug] || slug}.png`
}

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null!)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible] as const
}

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) { setCount(0); return }
    const startTime = performance.now()
    let raf: number
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return count
}

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useScrollReveal(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function StatItem({ target, label }: { target: number; label: string }) {
  const [ref, visible] = useScrollReveal(0.5)
  const count = useCountUp(target, visible)
  return (
    <div ref={ref} className="text-center">
      <span className="text-3xl md:text-4xl font-light text-[#FCFBFB] tabular-nums">{count}{target >= 100 ? "+" : "+"}</span>
      <p className="text-xs text-[#56525E] uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  useEffect(() => { setHeroLoaded(true) }, [])

  return (
    <div className="bg-[#110B18] min-h-screen overflow-hidden">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#772953]/15 blur-[120px] animate-orb-drift" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#409824]/8 blur-[80px] animate-orb-drift" style={{ animationDelay: "-10s" }} />

        {/* Gold particles */}
        <div className="particle" style={{ top: "20%", left: "10%", animation: "particle-drift 12s ease-in-out infinite" }} />
        <div className="particle" style={{ top: "40%", left: "80%", animation: "particle-drift 15s ease-in-out infinite 2s" }} />
        <div className="particle" style={{ top: "60%", left: "20%", animation: "particle-drift 18s ease-in-out infinite 4s" }} />
        <div className="particle" style={{ top: "80%", left: "70%", animation: "particle-drift 14s ease-in-out infinite 1s" }} />
        <div className="particle" style={{ top: "30%", left: "50%", animation: "particle-drift 20s ease-in-out infinite 3s" }} />

        <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 pt-20 lg:pt-0">
              {/* Label */}
              <div className={`transition-all duration-700 delay-200 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.2em]">
                  Africa's iGaming Content Authority
                </span>
              </div>

              {/* Headline with stagger */}
              <h1 className="mt-6 space-y-2">
                {[
                  { text: "iGaming Content", delay: 400 },
                  { text: "That Ranks", delay: 600 },
                ].map((part) => (
                  <span
                    key={part.text}
                    className={`block text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-[#FCFBFB] transition-all duration-700 ease-out ${
                      heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${part.delay}ms` }}
                  >
                    {part.text}
                  </span>
                ))}
                <span
                  className={`block text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight transition-all duration-700 ease-out ${
                    heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <span className="bg-gradient-to-r from-[#409824] to-[#FCFBFB] bg-clip-text text-transparent">&amp;</span> Converts
                </span>
              </h1>

              {/* Subhead */}
              <p className={`text-base md:text-lg text-[#56525E] max-w-md mt-6 leading-relaxed transition-all duration-700 ease-out ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`} style={{ transitionDelay: "1000ms" }}>
                I write the articles that drive players to betting sites, casinos, and sportsbooks across Africa.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 mt-8 transition-all duration-700 ease-out ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`} style={{ transitionDelay: "1200ms" }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg animate-btn-glow hover:shadow-[#409824]/50"
                >
                  Read Latest Tips
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
                <Link
                  href="/work-with-me"
                  className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:border-[#B5ABB3]/60 transition-all duration-200"
                >
                  Work With Me
                </Link>
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/5 transition-all duration-700 ease-out ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`} style={{ transitionDelay: "1400ms" }}>
                <StatItem target={10} label="Years Experience" />
                <StatItem target={500} label="Articles Written" />
                <StatItem target={50} label="Operator Partners" />
                <StatItem target={15} label="Markets Covered" />
              </div>
            </div>

            {/* Right side - abstract content engine */}
            <div className={`flex-1 hidden lg:flex justify-center transition-all duration-700 ease-out ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`} style={{ transitionDelay: "600ms" }}>
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full bg-[#409824]/5 blur-3xl animate-orb-pulse" />
                <div className="absolute inset-4 rounded-full border border-white/5 glass-card" />
                <div className="absolute inset-8 rounded-full border border-white/5" />
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 320 320" style={{ animation: "spin 30s linear infinite" }}>
                  <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#409824" />
                      <stop offset="100%" stopColor="#772953" />
                    </linearGradient>
                  </defs>
                  <circle cx="160" cy="160" r="120" fill="none" stroke="url(#arcGrad)" strokeWidth="1" strokeDasharray="8 8" opacity="0.3" />
                  <circle cx="160" cy="160" r="80" fill="none" stroke="url(#arcGrad)" strokeWidth="1" strokeDasharray="4 6" opacity="0.2" />
                  <circle cx="160" cy="160" r="40" fill="none" stroke="url(#arcGrad)" strokeWidth="0.5" opacity="0.15" />
                  <circle cx="160" cy="40" r="3" fill="#409824" />
                  <circle cx="160" cy="280" r="3" fill="#409824" />
                  <circle cx="40" cy="160" r="3" fill="#772953" />
                  <circle cx="280" cy="160" r="3" fill="#772953" />
                  <circle cx="80" cy="80" r="2" fill="#D4AF37" />
                  <circle cx="240" cy="240" r="2" fill="#D4AF37" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-[#B5ABB3] tracking-widest uppercase">Content Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSlot position="leaderboard-top" className="max-w-6xl mx-auto px-4 mb-8" />

      {/* ===== SECTION 2: TRUST BAR ===== */}
      <section className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs text-[#56525E] uppercase tracking-widest mb-6">Trusted by 50+ Operators</p>
          <div className="overflow-hidden">
            <div className="flex animate-marquee gap-16 w-max">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex gap-16 items-center">
                  {["SportPesa", "Betika", "1xBet", "Betway", "22Bet", "Melbet", "HollywoodBets", "Bet9ja"].map((brand) => (
                    <span key={brand} className="text-lg font-bold text-[#56525E] opacity-60 hover:opacity-100 hover:text-[#FCFBFB] transition-all duration-300 whitespace-nowrap">
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: WHAT IS iGAMINGUBUNTU ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#772953]/8 blur-[100px] -translate-y-1/2 animate-orb-drift-slow" />
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.15em]">About iGamingUbuntu</span>
              <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] mt-3 mb-6 tracking-tight">What is iGamingUbuntu?</h2>
              <div className="space-y-4 text-[#56525E] leading-relaxed max-w-3xl">
                <p>
                  <span className="text-[#B5ABB3]">iGaming</span>, short for internet gaming, is the business of online betting, casino gaming, and sports wagering. It is a multi-billion dollar industry growing faster in Africa than anywhere else in the world.
                </p>
                <p>
                  <span className="text-[#B5ABB3]">iGamingUbuntu</span> exists to help betting operators, affiliate site owners, and content agencies capture that growth through expert-written content. Every article is researched for the specific African market it targets, from M-Pesa deposit guides in Kenya to Bet9ja comparisons in Nigeria.
                </p>
                <p className="text-[#B5ABB3]">
                  We do not write generic gambling content. We write content that ranks in Google, converts readers into depositing players, and builds trust with African betting audiences.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {["Kenya", "Nigeria", "South Africa", "Ghana", "Tanzania", "UK / US / Canada"].map((m) => (
                  <span key={m} className="text-xs font-medium text-[#56525E] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-[#409824] hover:text-white hover:scale-105 transition-all duration-300 cursor-default">
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src="/images/nasheta.png" alt="Nasheta" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-[#FCFBFB] font-medium">Nasheta - iGaming Content Specialist</p>
                  <Link href="/about" className="text-xs text-[#409824] hover:underline inline-flex items-center gap-1">
                    Read my full story &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AdSlot position="in-content-1" className="max-w-6xl mx-auto px-4 mb-8" />

      {/* ===== SECTION 4: SERVICES ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-[#0E1358]/10 blur-[100px] animate-orb-drift" />
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.15em]">What I Write</span>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] mt-3 tracking-tight">Services & Content Types</h2>
            <p className="text-[#56525E] max-w-lg mx-auto mt-3">Content types that drive traffic, engagement, and affiliate revenue across every African iGaming market.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Match Result Articles", desc: "SEO-optimised match reports with integrated betting odds and affiliate CTAs.", icon: "⚽" },
              { title: "Casino & Betting Reviews", desc: "In-depth operator reviews with comparison tables and bonus breakdowns.", icon: "🎰" },
              { title: "Betting Guides & Tutorials", desc: "Beginner-friendly how-to content that converts readers into depositing players.", icon: "📖" },
              { title: "Industry News & Press Releases", desc: "Timely coverage of regulatory changes, market launches, and operator announcements.", icon: "📰" },
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <Link href="/services" className="group block glass-card rounded-2xl p-6 hover:border-[#409824]/40 hover:-translate-y-1 transition-all duration-300">
                  <span className="text-2xl mb-4 block">{s.icon}</span>
                  <h3 className="text-lg font-medium text-[#FCFBFB] group-hover:text-[#409824] transition-colors mb-2">{s.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{s.desc}</p>
                  <span className="text-xs text-[#409824] font-medium mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Learn more &rarr;
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: WHY WORK WITH ME ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.15em]">Why Choose Me</span>
                <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] mt-3 tracking-tight mb-10">Why Work With Me</h2>
              </ScrollReveal>
              <div className="space-y-8">
                {[
                  { num: "01", title: "Speed Without Sacrifice", desc: "Need 50 articles this week? I deliver high-quality, researched content at scale. No plagiarism, no shortcuts, no missed deadlines." },
                  { num: "02", title: "Deep Market Knowledge", desc: "I understand African betting audiences. M-Pesa, local leagues, regulatory nuances, and what makes a Kenyan bettor different from a Nigerian one." },
                  { num: "03", title: "Native + Global Perspective", desc: "I write for African readers with global standards. Articles are localised, compliant with international regulations, and built for global affiliate programmes." },
                ].map((item, i) => (
                  <ScrollReveal key={item.num} delay={i * 100}>
                    <div className="flex gap-5">
                      <span className="text-3xl font-light text-[#409824] shrink-0 w-12">{item.num}</span>
                      <div>
                        <div className="h-px bg-white/10 mb-4" />
                        <h3 className="text-lg font-medium text-[#FCFBFB] mb-2">{item.title}</h3>
                        <p className="text-sm text-[#56525E] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <ScrollReveal delay={200}>
                <div className="glass-card rounded-3xl p-8">
                  <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.15em]">How It Works</span>
                  <div className="mt-6 space-y-6">
                    {[
                      { step: "01", title: "Brief", desc: "You share the topic, target market, and affiliate links" },
                      { step: "02", title: "Research", desc: "I research odds, regulations, and competitor content" },
                      { step: "03", title: "Write & Optimise", desc: "I write with SEO, readability, and conversion baked in" },
                      { step: "04", title: "Deliver", desc: "Finished article ready to publish or CMS-deployed" },
                    ].map((p) => (
                      <div key={p.step} className="flex items-start gap-4">
                        <span className="text-xs font-bold text-[#409824] bg-[#409824]/10 px-2 py-1 rounded">{p.step}</span>
                        <div>
                          <p className="text-sm font-medium text-[#FCFBFB]">{p.title}</p>
                          <p className="text-xs text-[#56525E]">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: LATEST ARTICLES ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.15em]">Latest iGaming Insights</span>
              <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] mt-2 tracking-tight">Fresh from the Editorial Desk</h2>
            </div>
            <Link href="/blog" className="text-sm text-[#409824] font-medium hover:underline hidden sm:block">
              View All &rarr;
            </Link>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleArticles.slice(0, 3).map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 100}>
                <Link href={`/blog/${article.slug}`} className="group block rounded-2xl overflow-hidden border border-white/5 hover:border-[#409824]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 bg-[#0E1358]/20">
                    <div className="flex items-center gap-3 text-xs text-[#56525E] mb-2">
                      <span className="text-[#409824] font-medium">{article.category}</span>
                      <span>&middot;</span>
                      <span>{article.createdAt}</span>
                      <span>&middot;</span>
                      <span>{article.readTime} min read</span>
                    </div>
                    <h3 className="text-base font-medium text-[#FCFBFB] group-hover:text-[#409824] transition-colors leading-snug mb-2 line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#56525E] mt-3">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      <span>{article.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="text-sm text-[#409824] font-medium hover:underline">View All Articles &rarr;</Link>
          </div>
        </div>
      </section>

      <AdSlot position="in-content-1" className="max-w-6xl mx-auto px-4 mb-8" />

      {/* ===== SECTION 7: COUNTRY HUBS ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#772953]/8 blur-[100px] -translate-y-1/2 animate-orb-drift-slow" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <span className="text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.15em]">Explore by Country</span>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] mt-3 tracking-tight">Country-Specific Betting Guides</h2>
            <p className="text-[#56525E] max-w-lg mx-auto mt-3">Tailored content for each African market with local operators, payment methods, and regulations.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {countries.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 80}>
                <Link
                  href={`/${c.slug}`}
                  className="group flex flex-col items-center text-center glass-card rounded-2xl p-6 hover:scale-105 hover:border-[#409824]/30 transition-all duration-300"
                >
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${countryOrbColors[c.slug] || "from-[#409824]/20 to-[#409824]/5"} flex items-center justify-center mb-4 group-hover:animate-orb-pulse`}>
                    <img src={getFlagUrl(c.slug)} alt={c.name} className="w-10 h-7 rounded shadow-sm object-cover" />
                  </div>
                  <h3 className="text-base font-medium text-[#FCFBFB] group-hover:text-[#409824] transition-colors">{c.name}</h3>
                  <p className="text-xs text-[#56525E] mt-1">{c.articleCount} articles</p>
                  <span className="text-xs text-[#409824] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: CTA + NEWSLETTER ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#110B18] via-[#0E1358]/20 to-[#110B18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(64,152,36,0.08)_0%,_transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light text-[#FCFBFB] tracking-tight leading-tight">
              Ready to Scale Your<br />iGaming Content?
            </h2>
            <p className="text-[#56525E] text-lg mt-4 mb-8 max-w-md mx-auto">
              Let's talk about your content needs. I will send you a tailored proposal within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/work-with-me"
                className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg animate-btn-glow"
              >
                Work With Me <span>&rarr;</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
              >
                View Sample Work
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-16 pt-10 border-t border-white/5">
              <p className="text-xs text-[#B5ABB3] uppercase tracking-widest mb-4">Stay Ahead of the Game</p>
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setSubscribed(true)
      setEmail("")
    }
  }

  if (subscribed) {
    return (
      <div className="glass-card rounded-xl p-5 max-w-md mx-auto">
        <p className="text-[#409824] text-sm font-medium">Thanks for subscribing!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FCFBFB] placeholder-[#56525E] focus:outline-none focus:border-[#409824]/50 transition-colors"
      />
      <button
        type="submit"
        className="bg-[#409824] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#409824]/90 transition cursor-pointer whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
