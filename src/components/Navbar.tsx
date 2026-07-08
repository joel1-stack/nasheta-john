"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiSearch, FiMenu, FiX, FiChevronDown } from "react-icons/fi"

interface NavChild {
  label: string
  href: string
  desc: string
}

interface NavItem {
  label: string
  href: string
  hasDropdown: boolean
  children?: NavChild[]
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", hasDropdown: false },
  {
    label: "News", href: "/news", hasDropdown: true,
    children: [
      { label: "Industry News", href: "/news/industry", desc: "Latest developments in African iGaming" },
      { label: "Regulation Watch", href: "/news/regulation", desc: "Regulatory changes across markets" },
    ],
  },
  { label: "Press Release", href: "/press", hasDropdown: false },
  {
    label: "Sports Betting", href: "/sports", hasDropdown: true,
    children: [
      { label: "Live Events", href: "/sports/live", desc: "Real-time odds and in-play betting" },
      { label: "Predictions and Tips", href: "/sports/predictions", desc: "Expert match predictions" },
      { label: "League Guides", href: "/sports/leagues", desc: "Premier League, La Liga, and more" },
      { label: "Betting Explained", href: "/sports/basics", desc: "Beginner-friendly betting guides" },
    ],
  },
  {
    label: "Casino Directory", href: "/casinos", hasDropdown: true,
    children: [
      { label: "New Casinos", href: "/casinos/new", desc: "Recently launched operators" },
      { label: "Best Casinos", href: "/casinos/best", desc: "Top-rated by our experts" },
      { label: "Mobile Casinos", href: "/casinos/mobile", desc: "Optimized for mobile betting" },
      { label: "Payment Methods", href: "/casinos/payments", desc: "M-Pesa, Airtel, and more" },
      { label: "By Market", href: "/casinos/market", desc: "Filter by Kenya, Nigeria, SA, Ghana, Global" },
    ],
  },
  {
    label: "Events", href: "/events", hasDropdown: true,
    children: [
      { label: "Upcoming Events", href: "/events/upcoming", desc: "Conferences and industry meetups" },
      { label: "Event Recaps", href: "/events/recaps", desc: "Highlights from past events" },
      { label: "Webinars and Panels", href: "/events/webinars", desc: "Expert discussions on demand" },
    ],
  },
  { label: "The Desk", href: "/the-desk", hasDropdown: false },
  { label: "About the Writer", href: "/about", hasDropdown: false },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl md:text-2xl font-bold" style={{ background: "linear-gradient(135deg, #E95420, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            iGamingUbuntu
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                      isActive(item.href)
                        ? "text-ubuntu-orange bg-ubuntu-orange/5"
                        : "text-text-primary hover:text-ubuntu-orange hover:bg-card"
                    }`}
                  >
                    {item.label}
                    <FiChevronDown className={`w-3.5 h-3.5 mt-0.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white border border-border rounded-xl shadow-xl py-4 px-4 z-50 min-w-[420px]"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block p-3 rounded-lg hover:bg-card transition group ${
                              isActive(child.href) ? "bg-ubuntu-orange/5" : ""
                            }`}
                          >
                            <span className={`font-medium text-sm ${isActive(child.href) ? "text-ubuntu-orange" : "text-text-primary group-hover:text-ubuntu-orange"} transition-colors`}>
                              {child.label}
                            </span>
                            <p className="text-xs text-text-muted mt-0.5">{child.desc}</p>
                          </Link>
                        ))}
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
          <Link href="/?search=1" className="text-text-muted hover:text-ubuntu-orange transition p-2">
            <FiSearch size={18} />
          </Link>
          <Link href="/contact" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition whitespace-nowrap">
            Hire Me
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
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                        isActive(item.href)
                          ? "text-ubuntu-orange bg-ubuntu-orange/5"
                          : "text-text-primary hover:bg-card"
                      }`}
                    >
                      {item.label}
                      <FiChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="ml-3 mt-1 space-y-1 pb-2 border-l-2 border-ubuntu-orange/20 pl-3">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition ${
                              isActive(child.href) ? "text-ubuntu-orange bg-ubuntu-orange/5 font-medium" : "text-text-secondary hover:bg-card"
                            }`}
                          >
                            <div>{child.label}</div>
                            <p className="text-xs text-text-muted mt-0.5">{child.desc}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive(item.href)
                        ? "text-ubuntu-orange bg-ubuntu-orange/5"
                        : "text-text-primary hover:bg-card"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-border pt-3 mt-3 space-y-2">
              <Link href="/contact" className="block text-center bg-ubuntu-orange text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
