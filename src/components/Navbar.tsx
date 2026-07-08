"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"

const contentTypes = [
  { label: "Match Result Articles", href: "/services#match-articles", desc: "SEO-optimised match reports with affiliate CTAs" },
  { label: "Casino & Betting Reviews", href: "/services#casino-reviews", desc: "In-depth operator reviews with comparison tables" },
  { label: "Betting Guides & Tutorials", href: "/services#betting-guides", desc: "Beginner-friendly how-to content" },
  { label: "Industry News & Press Releases", href: "/services#industry-news", desc: "Timely coverage of market developments" },
]

const markets = [
  { label: "Kenya", href: "/services#kenya", desc: "M-Pesa, BCLB-regulated operators, local leagues" },
  { label: "Nigeria", href: "/services#nigeria", desc: "Naija betting culture, Bank Transfer, Bet9ja market" },
  { label: "South Africa", href: "/services#south-africa", desc: "HollywoodBets, ZAR support, NGB compliance" },
  { label: "Ghana", href: "/services#ghana", desc: "MTN MoMo, Gaming Commission, Premier League focus" },
  { label: "Tanzania", href: "/services#tanzania", desc: "Tigo-Pesa, Gaming Board, Swahili audience" },
  { label: "Global", href: "/services#global", desc: "UK, US, Canada — regulated markets, English-first" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileServices(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/images/nasheta.png" alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-lg md:text-xl font-bold" style={{ background: "linear-gradient(135deg, #E95420, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            iGamingUbuntu
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Services", href: "/services", hasDropdown: true },
            { label: "Blogs", href: "/blog" },
            { label: "Contact Us", href: "/contact" },
          ].map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleMouseEnter()}
              onMouseLeave={handleMouseLeave}
            >
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                      isActive(item.href)
                        ? "text-ubuntu-orange bg-ubuntu-orange/5"
                        : "text-text-primary hover:text-ubuntu-orange hover:bg-card"
                    }`}
                  >
                    {item.label}
                    <FiChevronDown className={`w-3.5 h-3.5 mt-0.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {servicesOpen && (
                    <div
                      ref={servicesRef}
                      className="absolute top-full left-0 mt-1 bg-white border border-border rounded-xl shadow-xl p-6 z-50 min-w-[600px]"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-ubuntu-orange mb-3">Content Types</h4>
                          <div className="space-y-2">
                            {contentTypes.map((ct) => (
                              <Link key={ct.label} href={ct.href} className="block p-3 rounded-lg hover:bg-card transition group">
                                <span className="font-medium text-sm text-text-primary group-hover:text-ubuntu-orange transition-colors">{ct.label}</span>
                                <p className="text-xs text-text-muted mt-0.5">{ct.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-ubuntu-orange mb-3">Markets</h4>
                          <div className="space-y-2">
                            {markets.map((m) => (
                              <Link key={m.label} href={m.href} className="block p-3 rounded-lg hover:bg-card transition group">
                                <span className="font-medium text-sm text-text-primary group-hover:text-ubuntu-orange transition-colors">{m.label}</span>
                                <p className="text-xs text-text-muted mt-0.5">{m.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive(item.href)
                      ? "text-ubuntu-orange bg-ubuntu-orange/5"
                      : "text-text-primary hover:text-ubuntu-orange hover:bg-card"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/work-with-me"
            className="bg-ubuntu-orange text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-ubuntu-orange/90 transition shadow-md shadow-ubuntu-orange/20 hover:shadow-lg hover:shadow-ubuntu-orange/30"
          >
            Work With Me
          </Link>
        </div>

        <button className="lg:hidden cursor-pointer p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-primary hover:bg-card">Home</Link>
            <Link href="/about" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-primary hover:bg-card">About Us</Link>
            <div>
              <button
                onClick={() => setMobileServices(!mobileServices)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-primary hover:bg-card cursor-pointer"
              >
                Services
                <FiChevronDown className={`w-4 h-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} />
              </button>
              {mobileServices && (
                <div className="ml-3 mt-1 space-y-1 pb-2 border-l-2 border-ubuntu-orange/20 pl-3">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-ubuntu-orange uppercase tracking-wider mb-2">Content Types</p>
                    {contentTypes.map((ct) => (
                      <Link key={ct.label} href={ct.href} className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-card">
                        {ct.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ubuntu-orange uppercase tracking-wider mb-2">Markets</p>
                    {markets.map((m) => (
                      <Link key={m.label} href={m.href} className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-card">
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/blog" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-primary hover:bg-card">Blogs</Link>
            <Link href="/contact" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-primary hover:bg-card">Contact Us</Link>
            <div className="border-t border-border pt-3 mt-3">
              <Link href="/work-with-me" className="block text-center bg-ubuntu-orange text-white px-4 py-3 rounded-lg text-sm font-bold">
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
