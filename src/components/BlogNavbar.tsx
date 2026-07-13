"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FiMenu, FiX, FiChevronDown, FiSearch } from "react-icons/fi"

const blogSections = [
  {
    label: "News", href: "/news",
    children: [
      { label: "Industry News", href: "/news/industry", desc: "Latest developments across African iGaming markets" },
      { label: "Regulation Watch", href: "/news/regulation", desc: "Regulatory changes and compliance updates" },
      { label: "Press Release", href: "/press", desc: "Submitted releases and partner announcements" },
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
    label: "Casino Reviews", href: "/reviews",
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

const flatLinks = [
  { label: "The Desk", href: "/the-desk" },
  { label: "About the Writer", href: "/about" },
]

export default function BlogNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileChild, setMobileChild] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileChild(null)
    setSearchOpen(false)
    setSearchQuery("")
  }, [pathname])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const isActive = (href: string) => pathname.startsWith(href)

  const linkClass = (href: string) => {
    const active = isActive(href)
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
    if (active) return `${base} text-[#f59e0b] bg-[#f59e0b]/10`
    return `${base} text-[#6B7280] hover:text-[#111827] hover:bg-gray-100`
  }

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 shadow-sm border-b border-gray-200" : "bg-white border-b border-gray-200"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2 shrink-0 group">
          <span className="text-lg font-bold text-[#111827] group-hover:text-[#f59e0b] transition-colors">iGamingUbuntu</span>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Blog</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {blogSections.map((section) => (
            <div key={section.label} className="relative" onMouseEnter={() => handleEnter(section.label)} onMouseLeave={handleLeave}>
              <Link href={section.href} className={linkClass(section.href)}>
                {section.label}
                <FiChevronDown className={`w-3.5 h-3.5 mt-0.5 inline ml-0.5 transition-transform ${openDropdown === section.label ? "rotate-180" : ""}`} />
              </Link>
              {openDropdown === section.label && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-xl p-4 z-50 min-w-[250px]" onMouseEnter={() => handleEnter(section.label)} onMouseLeave={handleLeave}>
                  <div className="space-y-1">
                    {section.children.map((ch) => (
                      <Link key={ch.href} href={ch.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-amber-50 transition group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        <div>
                          <span className="font-medium text-sm text-[#111827] group-hover:text-[#f59e0b] transition-colors">{ch.label}</span>
                          <p className="text-xs text-gray-400 mt-0.5">{ch.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {flatLinks.map((link) => (
            <Link key={link.label} href={link.href} className={linkClass(link.href)}>{link.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-1">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-44 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b]"
              />
              <button type="submit" className="p-1.5 text-gray-400 hover:text-[#f59e0b] cursor-pointer"><FiSearch size={18} /></button>
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery("") }} className="p-1.5 text-gray-400 hover:text-gray-600 text-sm cursor-pointer">✕</button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-400 hover:text-[#f59e0b] transition cursor-pointer" title="Search articles">
              <FiSearch size={20} />
            </button>
          )}

          <button className="lg:hidden cursor-pointer p-2 text-gray-500 hover:text-[#111827]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {blogSections.map((section) => (
              <div key={section.label}>
                <button onClick={() => setMobileChild(mobileChild === section.label ? null : section.label)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-[#111827] hover:bg-gray-100 cursor-pointer">
                  {section.label}
                  <FiChevronDown className={`w-4 h-4 transition-transform ${mobileChild === section.label ? "rotate-180" : ""}`} />
                </button>
                {mobileChild === section.label && (
                  <div className="ml-3 space-y-1 border-l-2 border-[#f59e0b]/30 pl-3 mt-1">
                    {section.children.map((ch) => (
                      <Link key={ch.href} href={ch.href} className="block px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-[#111827] hover:bg-gray-100">{ch.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {flatLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-[#111827] hover:bg-gray-100">{link.label}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
