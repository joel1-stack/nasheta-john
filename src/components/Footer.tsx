"use client"

import Link from "next/link"
import { useState } from "react"
import { IgubFullLogo } from "./IgubLogo"

const NEON = "#00FF41"

const socialLinks = [
  {
    label: "Email",
    href: "mailto:info@igamingubuntu.com",
    svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nashetajohnigaming/",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: "X",
    href: "https://x.com/SalvageNasheta",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
]

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
]

const marketRegions = [
  { label: "East", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda"] },
  { label: "West", countries: ["Nigeria", "Ghana", "Ivory Coast", "Senegal"] },
  { label: "Central", countries: ["Cameroon", "DRC", "Gabon", "Congo"] },
  { label: "North", countries: ["Morocco", "Egypt", "Algeria", "Tunisia"] },
  { label: "Southern", countries: ["South Africa", "Zambia", "Zimbabwe", "Botswana"] },
]

const marketHref = (name: string) => {
  const slug = name
    .toLowerCase()
    .replace(/\bdr congo\b/, "dr-congo")
    .replace(/\bivory coast\b/, "ivory-coast")
    .replace(/\s+/g, "-")
  return `/${slug}`
}

const companyLinks = [
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Advertise", href: "/advertise" },
  { label: "Editorial Team", href: "/editorial-team" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "How We Review", href: "/how-we-review" },
  { label: "Responsible Gambling", href: "/responsible-gambling" },
  { label: "Corrections", href: "/corrections" },
  { label: "Newsletter", href: "/newsletter/confirm" },
]

const blogCompanyLinks = [
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "How We Review", href: "/how-we-review" },
  { label: "Responsible Gambling", href: "/responsible-gambling" },
  { label: "Newsletter", href: "/newsletter/confirm" },
]

const WAVE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Cpath d='M0 20 C15 8 35 8 50 20 S85 32 100 20 S135 8 150 20' fill='none' stroke='%2300FF41' stroke-width='1.2'/%3E%3C/svg%3E\")"

const WAVE_UNDERLINE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='6' viewBox='0 0 40 6'%3E%3Cpath d='M0 3 C5 0 10 6 15 3 S25 0 30 3 S40 6 40 3' fill='none' stroke='%2300FF41' stroke-width='1.5'/%3E%3C/svg%3E\")"

function WaveLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block text-sm text-white/60 hover:text-[#00FF41] transition-colors duration-200 wave-link"
    >
      {children}
    </Link>
  )
}

function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`w-full h-8 md:h-10 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 24 C120 48 240 0 360 24 C480 48 600 0 720 24 C840 48 960 0 1080 24 C1200 48 1320 0 1440 24 L1440 48 L0 48 Z"
        fill="rgba(0,255,65,0.06)"
      />
      <path
        d="M0 24 C120 48 240 0 360 24 C480 48 600 0 720 24 C840 48 960 0 1080 24 C1200 48 1320 0 1440 24"
        fill="none"
        stroke={NEON}
        strokeWidth="1.5"
        opacity="0.55"
      />
      <path
        d="M0 32 C120 56 240 8 360 32 C480 56 600 8 720 32 C840 56 960 8 1080 32 C1200 56 1320 8 1440 32"
        fill="none"
        stroke={NEON}
        strokeWidth="1"
        opacity="0.25"
      />
    </svg>
  )
}

function TopographicWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M-20 ${80 + i * 48} C120 ${40 + i * 48} 240 ${120 + i * 48} 400 ${80 + i * 48} C560 ${40 + i * 48} 680 ${120 + i * 48} 820 ${80 + i * 48}`}
          fill="none"
          stroke={NEON}
          strokeWidth={1.2 - i * 0.12}
          opacity={0.18 - i * 0.02}
        />
      ))}
      <circle cx="620" cy="200" r="40" fill="none" stroke={NEON} strokeWidth="1" opacity="0.12" />
      <circle cx="620" cy="200" r="70" fill="none" stroke={NEON} strokeWidth="1" opacity="0.08" />
      <circle cx="620" cy="200" r="100" fill="none" stroke={NEON} strokeWidth="1" opacity="0.05" />
    </svg>
  )
}

interface FooterProps {
  hideNav?: boolean
}

export default function Footer({ hideNav }: FooterProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed")
      setSubscribed(true)
      setEmail("")
    } catch {
      setError("Failed to subscribe. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative overflow-hidden text-white bg-[#0D1117]">
      <style jsx global>{`
        .footer-wave-link {
          background-image: ${WAVE_UNDERLINE};
          background-repeat: repeat-x;
          background-position: 0 100%;
          background-size: 40px 6px;
          padding-bottom: 4px;
        }
        .footer-wave-link:hover {
          animation: footerWaveScroll 0.6s linear infinite;
        }
        .footer-markets::-webkit-scrollbar {
          display: none;
        }
        .footer-markets {
          scrollbar-width: none;
        }
        @keyframes footerWaveScroll {
          from { background-position-x: 0; }
          to { background-position-x: 40px; }
        }
      `}</style>

      {/* Top wave entry from page content */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,48 C180,80 360,0 540,40 C720,80 900,8 1080,44 C1260,80 1380,20 1440,36 L1440,0 L0,0 Z"
            fill="#0D1117"
          />
          <path
            d="M0,48 C180,80 360,0 540,40 C720,80 900,8 1080,44 C1260,80 1380,20 1440,36"
            fill="none"
            stroke={NEON}
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Faint repeating wave field across whole footer */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{ backgroundImage: WAVE_BG, backgroundSize: "120px 40px" }}
        aria-hidden="true"
      />

      <div className="absolute top-32 right-0 w-72 h-72 bg-[#00FF41]/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-[#00FF41]/4 rounded-full blur-3xl" aria-hidden="true" />

      {/* Newsletter banner */}
      <section className="relative z-10 border-b border-white/10">
        <TopographicWaves className="opacity-100" />
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p
                className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3"
                style={{ color: NEON }}
              >
                Stay Ahead of the Game
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold leading-snug text-white mb-6">
                Get the latest iGaming insights delivered to{" "}
                <span style={{ color: NEON }}>your inbox.</span>
              </h2>
              {subscribed ? (
                <p className="text-sm font-medium" style={{ color: NEON }}>
                  Thanks for subscribing — you&apos;re on the list.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-[#11161C] border border-white/15 text-white placeholder-white/35 text-sm focus:outline-none focus:border-[#00FF41]/60 focus:ring-2 focus:ring-[#00FF41]/25"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 rounded-lg text-sm font-bold bg-[#00FF41] text-[#0D1117] hover:brightness-110 transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {loading ? "..." : "Subscribe →"}
                  </button>
                </form>
              )}
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-white/10">
              <p className="text-sm text-white/50 leading-relaxed">
                Weekly regulatory moves, operator launches, payment rails, and B2B analysis across
                Africa&apos;s fastest-growing iGaming markets — written for founders, affiliates, and
                compliance teams who need signal, not noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider className="relative z-10 -mt-px" />

      {/* 4-column footer */}
      <div className="max-w-6xl mx-auto px-4 pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <IgubFullLogo />
            </Link>
            <p
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: NEON }}
            >
              Africa&apos;s iGaming Publication
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Expert reporting on sports betting, casino, and fintech regulation across the continent.
            </p>
            <a
              href="mailto:info@igamingubuntu.com"
              className="inline-block text-sm text-white/60 hover:text-[#00FF41] transition-colors mb-5 wave-link footer-wave-link"
            >
              info@igamingubuntu.com
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-[#0D1117] hover:bg-[#00FF41] hover:border-[#00FF41] hover:scale-110 transition-all duration-300"
                  title={s.label}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <WaveLink href={l.href}>{l.label}</WaveLink>
                </li>
              ))}
            </ul>
          </div>

          {/* African Markets — mobile swipe carousel, desktop grid */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
                African Markets
              </h4>
              <span
                className="text-[10px] lg:hidden font-medium"
                style={{ color: NEON }}
              >
                swipe →
              </span>
            </div>
            <div className="footer-markets flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0">
              {marketRegions.map((region) => (
                <div
                  key={region.label}
                  className="min-w-[140px] snap-start rounded-xl border border-white/10 bg-white/[0.03] p-3 relative overflow-hidden"
                >
                  <div
                    className="absolute bottom-0 left-0 w-full h-3 opacity-30"
                    style={{ backgroundImage: WAVE_BG, backgroundSize: "60px 20px" }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-2 relative"
                    style={{ color: NEON }}
                  >
                    {region.label}
                  </p>
                  <ul className="space-y-1.5 relative">
                    {region.countries.map((c) => (
                      <li key={c}>
                        <Link
                          href={marketHref(c)}
                          className="block text-[13px] text-white/55 hover:text-[#00FF41] transition-colors wave-link footer-wave-link"
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/90">
              Company
            </h4>
            <ul className="space-y-3">
              {(hideNav ? blogCompanyLinks : companyLinks).map((l) => (
                <li key={l.href}>
                  <WaveLink href={l.href}>{l.label}</WaveLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <WaveDivider className="mt-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <span className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} iGamingUbuntu. All rights reserved.
          </span>
          <div className="flex items-center gap-3 text-xs text-white/45">
            <span
              className="w-7 h-7 rounded-full border flex items-center justify-center font-bold text-[10px]"
              style={{ borderColor: NEON, color: NEON }}
            >
              18+
            </span>
            <span>18+ Only. Gamble Responsibly.</span>
          </div>
        </div>
      </div>

      {/* Trailing neon wave baseline */}
      <div className="relative z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="w-full h-4">
          <path
            d="M0 12 C120 24 240 0 360 12 C480 24 600 0 720 12 C840 24 960 0 1080 12 C1200 24 1320 0 1440 12"
            fill="none"
            stroke={NEON}
            strokeWidth="1.5"
            opacity="0.35"
          />
        </svg>
      </div>
    </footer>
  )
}
