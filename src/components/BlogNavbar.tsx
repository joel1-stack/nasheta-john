"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"

const blogSections = [
  {
    label: "News", href: "/news",
    children: [
      { label: "Industry News", href: "/news/industry", desc: "Latest developments across African iGaming markets" },
      { label: "Regulation Watch", href: "/news/regulation", desc: "Regulatory changes and compliance updates" },
    ],
  },
  {
    label: "Sports Betting", href: "/sports",
    children: [
      { label: "Live Events", href: "/sports/live", desc: "Real-time odds, in-play betting and match coverage" },
      { label: "Predictions & Tips", href: "/sports/predictions", desc: "Expert match predictions and betting tips" },
      { label: "League Guides", href: "/sports/leagues", desc: "Premier League, La Liga, EPL and more" },
      { label: "Betting Explained", href: "/sports/basics", desc: "Beginner-friendly guides to betting fundamentals" },
    ],
  },
  {
    label: "Casino Directory", href: "/casinos",
    children: [
      { label: "New Casinos", href: "/casinos/new", desc: "Recently launched operators reviewed" },
      { label: "Best Casinos", href: "/casinos/best", desc: "Top-rated casinos by our expert team" },
      { label: "Mobile Casinos", href: "/casinos/mobile", desc: "Optimised for mobile betting on the go" },
      { label: "Payment Methods", href: "/casinos/payments", desc: "M-Pesa, Airtel, Bank Transfer and more" },
      { label: "By Market", href: "/casinos/market", desc: "Filter by Kenya, Nigeria, SA, Ghana, Global" },
    ],
  },
  {
    label: "Events", href: "/events",
    children: [
      { label: "Upcoming Events", href: "/events/upcoming", desc: "Conferences, summits and industry meetups" },
      { label: "Event Recaps", href: "/events/recaps", desc: "Highlights and key takeaways from past events" },
      { label: "Webinars & Panels", href: "/events/webinars", desc: "Expert discussions and panels on demand" },
    ],
  },
]

const standaloneItems = [
  { label: "Press Release", href: "/press" },
  { label: "The Desk", href: "/the-desk" },
  { label: "About the Writer", href: "/about" },
]

export default function BlogNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileChild, setMobileChild] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileChild(null)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) => {
    const active = isActive(href)
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
    if (active) return `${base} text-[#409824] bg-[#409824]/10`
    return `${base} text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5`
  }

  const dropdownClass = "absolute top-full left-0 mt-1 bg-[#1B2385]/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 rounded-xl p-6 z-50 min-w-[280px]"

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#110B18]/95 border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2 shrink-0">
          <svg className="w-5 h-5 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          <span className="text-lg font-bold text-[#FCFBFB]">iGamingUbuntu</span>
          <span className="text-[10px] font-semibold text-[#409824] bg-[#409824]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Blog</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {blogSections.map((section) => (
            <div key={section.label} className="relative" onMouseEnter={() => handleEnter(section.label)} onMouseLeave={handleLeave}>
              <button onClick={() => setOpenDropdown(openDropdown === section.label ? null : section.label)} className={linkClass(section.href)}>
                {section.label}
                <FiChevronDown className={`w-3.5 h-3.5 mt-0.5 inline ml-0.5 transition-transform ${openDropdown === section.label ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === section.label && (
                <div className={dropdownClass} onMouseEnter={() => handleEnter(section.label)} onMouseLeave={handleLeave}>
                  <div className="space-y-2">
                    {section.children.map((ch) => (
                      <Link key={ch.href} href={ch.href} className="block p-3 rounded-lg hover:bg-white/5 transition group">
                        <span className="font-medium text-sm text-[#FCFBFB] group-hover:text-[#409824] transition-colors">{ch.label}</span>
                        <p className="text-xs text-[#56525E] mt-0.5">{ch.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {standaloneItems.map((item) => (
            <Link key={item.label} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/blog" className="bg-[#409824] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition hover:bg-[#409824]/90 shadow-lg shadow-[#409824]/20">
            View All Articles
          </Link>
        </div>

        <button className="lg:hidden cursor-pointer p-2 text-[#FCFBFB]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#110B18] border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {blogSections.map((section) => (
              <div key={section.label}>
                <button onClick={() => setMobileChild(mobileChild === section.label ? null : section.label)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5 cursor-pointer">
                  {section.label}
                  <FiChevronDown className={`w-4 h-4 transition-transform ${mobileChild === section.label ? "rotate-180" : ""}`} />
                </button>
                {mobileChild === section.label && (
                  <div className="ml-3 space-y-1 border-l-2 border-[#409824]/20 pl-3">
                    {section.children.map((ch) => (
                      <Link key={ch.href} href={ch.href} className="block px-3 py-2 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">{ch.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {standaloneItems.map((item) => (
              <Link key={item.label} href={item.href} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">{item.label}</Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3">
              <Link href="/blog" className="block text-center bg-[#409824] text-white px-4 py-3 rounded-lg text-sm font-bold">View All Articles</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
