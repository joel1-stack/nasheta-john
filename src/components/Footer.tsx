import Link from "next/link"
import { IgubFullLogo } from "./IgubLogo"

const EMAIL = "info@igamingubuntu.com"
const TELEGRAM = "https://t.me/nashetajohn"

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
    label: "Telegram",
    href: TELEGRAM,
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
  },
]

const directoryLinks = [
  { label: "Sports Betting", href: "/sports" },
  { label: "Casino Reviews", href: "/reviews" },
  { label: "Best Casinos", href: "/casinos/best" },
  { label: "Payment Methods", href: "/casinos/payments" },
  { label: "Betting Guides", href: "/guides" },
]

const links = [
  { label: "Industry News", href: "/news/industry" },
  { label: "Regulation Watch", href: "/news/regulation" },
  { label: "Events", href: "/events" },
  { label: "The Desk", href: "/the-desk" },
  { label: "Who We Are", href: "/about" },
  { label: "Our Team", href: "/editorial-team" },
  { label: "Partners", href: "/partners" },
  { label: "Contact Us", href: "/contact" },
  { label: "Press", href: "/press" },
]

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Responsible Gambling", href: "/responsible-gambling" },
  { label: "Corrections", href: "/corrections" },
]

interface FooterProps {
  hideNav?: boolean
  light?: boolean
}

export default function Footer({ light = false }: FooterProps) {
  const t = light
    ? { bg: "bg-white border-t border-gray-200", heading: "text-brand-deep", text: "text-[#6B7280]", hover: "hover:text-brand-deep", line: "border-gray-200", pill: "bg-brand-teal/10 text-brand-teal-dark hover:bg-brand-teal/20" }
    : { bg: "bg-brand-ink", heading: "text-white", text: "text-white/60", hover: "hover:text-white", line: "border-white/10", pill: "bg-brand-lime/10 text-brand-lime hover:bg-brand-lime/20" }

  return (
    <footer className={`relative z-10 w-full ${t.bg}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_0.8fr_1fr] gap-10">
          <div className="min-w-0">
            <Link href="/" className="inline-block mb-4">
              <IgubFullLogo />
            </Link>
            <p className={`text-sm leading-relaxed mb-5 max-w-sm ${t.text}`}>
              Independent news and analysis on betting, casino, regulation and payments across Africa.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Link href="/advertise" className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${t.pill}`}>
                Advertise With Us
              </Link>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${t.pill}`}>
                Join Us on Telegram
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className={`font-bold mb-4 ${t.heading}`}>Contact Info</h4>
            <a href={`mailto:${EMAIL}`} className={`block text-sm mb-4 break-all transition-colors ${t.text} ${t.hover}`}>
              {EMAIL}
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  className="text-brand-lime hover:opacity-80 transition"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h4 className={`font-bold mb-4 ${t.heading}`}>Links</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`text-sm transition-colors ${t.text} ${t.hover}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className={`font-bold mb-4 ${t.heading}`}>iGaming Directory</h4>
            <ul className="space-y-2.5">
              {directoryLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`text-sm transition-colors ${t.text} ${t.hover}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`border-t ${t.line}`}>
        <div className={`mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] ${t.text}`}>
          <span>© {new Date().getFullYear()} iGamingUbuntu. All rights reserved. 18+ only. Gamble responsibly.</span>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`transition-colors ${t.hover}`}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
