"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown, FiSearch } from "react-icons/fi"

const navGroups = [
  {
    label: "Industry News", href: "/news",
    children: [
      { label: "Regulatory", href: "/news/regulation", desc: "Regulatory changes and compliance updates" },
      { label: "M&A", href: "/news", desc: "Mergers, acquisitions and partnerships" },
      { label: "Market Updates", href: "/news/industry", desc: "Latest market developments" },
    ],
  },
  {
    label: "Betting IQ", href: "/sports",
    children: [
      { label: "Tips", href: "/sports/predictions", desc: "Expert betting tips and strategies" },
      { label: "Guides", href: "/guides", desc: "Beginner-friendly how-to content" },
      { label: "Predictions", href: "/sports/predictions", desc: "Data-driven match forecasts" },
    ],
  },
  {
    label: "The Desk", href: "/the-desk",
    children: [
      { label: "Behind the Scenes", href: "/the-desk", desc: "How we research and write" },
      { label: "Writer Profiles", href: "/the-desk", desc: "Meet the iGamingUbuntu team" },
      { label: "Editorial Process", href: "/the-desk", desc: "Our editorial standards" },
    ],
  },
]

const flatLinks = [
  { label: "Casino Directory", href: "/casinos" },
  { label: "Events", href: "/events" },
]

export default function BlogNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileChild, setMobileChild] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
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

  const isActive = (href: string) => pathname.startsWith(href)

  const linkClass = (href: string) => {
    const active = isActive(href)
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
    if (active) return `${base} text-[#10b981] bg-[#10b981]/10`
    return `${base} text-[#94a3b8] hover:text-white hover:bg-white/5`
  }

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2 shrink-0 group">
          <span className="text-base font-bold text-white group-hover:text-[#10b981] transition-colors">iGamingUbuntu</span>
          <span className="text-[10px] font-semibold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Blog</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navGroups.map((group) => (
            <div key={group.label} className="relative" onMouseEnter={() => handleEnter(group.label)} onMouseLeave={handleLeave}>
              <button onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)} className={linkClass(group.href)}>
                {group.label} <FiChevronDown className="w-3 h-3 mt-0.5 inline ml-0.5" />
              </button>
              {openDropdown === group.label && (
                <div className="absolute top-full left-0 mt-1 bg-[#1a1a2e] border border-white/10 shadow-xl rounded-xl p-4 z-50 min-w-[240px]" onMouseEnter={() => handleEnter(group.label)} onMouseLeave={handleLeave}>
                  <div className="space-y-1">
                    {group.children.map((ch) => (
                      <Link key={ch.href + ch.label} href={ch.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#10b981]/10 transition group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        <div>
                          <span className="font-medium text-sm text-white group-hover:text-[#10b981] transition-colors">{ch.label}</span>
                          <p className="text-xs text-[#94a3b8] mt-0.5">{ch.desc}</p>
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
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." autoFocus className="w-40 px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-white/10 text-white placeholder-[#94a3b8] text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/50" />
              <button type="submit" className="p-1.5 text-[#94a3b8] hover:text-[#10b981] cursor-pointer"><FiSearch size={18} /></button>
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery("") }} className="p-1.5 text-[#94a3b8] hover:text-white text-sm cursor-pointer">✕</button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 text-[#94a3b8] hover:text-white transition cursor-pointer" title="Search">
              <FiSearch size={20} />
            </button>
          )}

          <Link href="/work-with-me" className="hidden lg:inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#0a0a0f] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#f59e0b]/90 transition shadow-lg shadow-[#f59e0b]/20">
            Get a Project Estimate
          </Link>

          <button className="lg:hidden cursor-pointer p-2 text-[#94a3b8] hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a0a0f] border-t border-white/10 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navGroups.map((group) => (
              <div key={group.label}>
                <button onClick={() => setMobileChild(mobileChild === group.label ? null : group.label)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 cursor-pointer">
                  {group.label} <FiChevronDown className={`w-4 h-4 transition-transform ${mobileChild === group.label ? "rotate-180" : ""}`} />
                </button>
                {mobileChild === group.label && (
                  <div className="ml-3 space-y-1 border-l-2 border-[#10b981]/30 pl-3 mt-1">
                    {group.children.map((ch) => (
                      <Link key={ch.href + ch.label} href={ch.href} className="block px-3 py-2 rounded-lg text-sm text-[#94a3b8] hover:text-white hover:bg-white/5">{ch.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {flatLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5">{link.label}</Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3">
              <Link href="/work-with-me" className="block text-center bg-[#f59e0b] text-[#0a0a0f] px-4 py-2.5 rounded-lg text-sm font-bold">Get a Project Estimate</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
