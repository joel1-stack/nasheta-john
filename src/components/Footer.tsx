"use client"

import Link from "next/link"
import { useState } from "react"
import { IgubFullLogo } from "./IgubLogo"

const GREEN = "#22C55E"

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/SalvageNasheta",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nashetajohnigaming/",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
  {
    label: "Telegram",
    href: "https://t.me/",
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
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
  { label: "East Africa", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda"] },
  { label: "West Africa", countries: ["Nigeria", "Ghana", "Ivory Coast", "Senegal"] },
  { label: "Central Africa", countries: ["Cameroon", "DRC", "Gabon", "Congo"] },
  { label: "North Africa", countries: ["Morocco", "Egypt", "Algeria", "Tunisia"] },
  { label: "Southern Africa", countries: ["South Africa", "Zambia", "Zimbabwe", "Botswana"] },
]

const marketHref = (name: string) =>
  `/${name.toLowerCase().replace(/\s+/g, "-")}`

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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="text-lg font-bold text-white">{children}</h4>
      <div className="mt-2 h-0.5 w-10 bg-[#22C55E]" />
    </div>
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
    <footer className="w-full bg-[#0A0D14] text-white">
      {/* Newsletter CTA */}
      <section className="relative overflow-hidden border-b border-white/5">
        <svg
          className="absolute right-0 top-0 h-full w-1/3 pointer-events-none"
          viewBox="0 0 400 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M400 0 C280 40 220 120 300 240"
            fill="none"
            stroke={GREEN}
            strokeWidth="2"
            opacity="0.15"
          />
          <path
            d="M400 20 C300 60 250 130 320 240"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.5"
            opacity="0.1"
          />
        </svg>

        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: GREEN }}
              >
                Stay Ahead of the Game
              </p>
              <h2 className="text-[26px] md:text-[30px] font-bold leading-snug text-white mb-6 max-w-xl">
                Get the latest iGaming insights delivered to{" "}
                <span style={{ color: GREEN }}>your inbox.</span>
              </h2>
              {subscribed ? (
                <p className="text-sm font-medium" style={{ color: GREEN }}>
                  Thanks for subscribing!
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-xl"
                >
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full rounded-full border border-white/20 bg-transparent py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E]/60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full px-7 py-3 text-sm font-bold text-black bg-[#22C55E] hover:brightness-110 transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {loading ? "..." : "Subscribe →"}
                  </button>
                </form>
              )}
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>

            <div className="lg:col-span-5 lg:pl-10 lg:border-l border-white/10">
              <p className="text-[13px] text-[#9CA3AF] leading-relaxed">
                News, analysis and expert insights on Africa&apos;s iGaming industry,
                straight to your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-block mb-4">
              <IgubFullLogo />
            </Link>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: GREEN }}
            >
              Africa&apos;s iGaming Publication
            </p>
            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5">
              Africa&apos;s iGaming content authority — expert writing that ranks and
              converts.
            </p>
            <a
              href="mailto:info@igamingubuntu.com"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-[#22C55E] transition-colors mb-6"
            >
              <svg
                className="w-4 h-4"
                style={{ color: GREEN }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@igamingubuntu.com
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/80 hover:border-[#22C55E] hover:text-[#22C55E] transition-colors"
                  title={s.label}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:px-8 lg:border-l border-white/10">
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="space-y-3.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* African Markets */}
          <div className="lg:px-8 lg:border-l border-white/10">
            <SectionHeading>African Markets</SectionHeading>
            <div className="space-y-4">
              {marketRegions.map((region) => (
                <div key={region.label}>
                  <p
                    className="text-[11px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: GREEN }}
                  >
                    {region.label}
                  </p>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {region.countries.map((c, i) => (
                      <span key={c}>
                        <Link
                          href={marketHref(c)}
                          className="hover:text-white transition-colors"
                        >
                          {c}
                        </Link>
                        {i < region.countries.length - 1 && (
                          <span className="mx-1.5 text-white/30">•</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="lg:pl-8 lg:border-l border-white/10">
            <SectionHeading>Company</SectionHeading>
            <ul className="space-y-3.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {hideNav && null}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1F2937]">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#9CA3AF]">
            © {new Date().getFullYear()} iGamingUbuntu. All rights reserved.
          </span>
          <div className="flex items-center gap-3 text-[13px] text-[#9CA3AF]">
            <span
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
              style={{ borderColor: GREEN, color: GREEN }}
            >
              18+
            </span>
            <span>18+ Only</span>
            <span className="text-white/20">|</span>
            <span>Gamble Responsibly</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
