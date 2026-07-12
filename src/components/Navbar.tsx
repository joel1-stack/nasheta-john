"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"

const contentTypes = [
  { label: "SEO Content Writing", href: "/seo-content-writing", desc: "Data-led editorial content that ranks and converts" },
  { label: "Translation", href: "/translation-services", desc: "Maintain voice and SEO across multiple languages" },
  { label: "Editing", href: "/editing-services", desc: "Polish tone, remove errors, ensure brand consistency" },
  { label: "Link Building", href: "/link-building-services", desc: "Build authoritative backlinks that boost rankings" },
]

const markets = [
  { label: "Kenya", href: "/kenya", desc: "M-Pesa, BCLB-regulated operators, local leagues" },
  { label: "Nigeria", href: "/nigeria", desc: "Naija betting culture, Bank Transfer, Bet9ja market" },
  { label: "South Africa", href: "/south-africa", desc: "HollywoodBets, ZAR support, NGB compliance" },
  { label: "Ghana", href: "/ghana", desc: "MTN MoMo, Gaming Commission, Premier League focus" },
  { label: "Tanzania", href: "/tanzania", desc: "Tigo-Pesa, Gaming Board, Swahili audience" },
  { label: "Global", href: "/global", desc: "UK, US, Canada — regulated markets, English-first" },
]

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

const standaloneBlogItems = [
  { label: "Press Release", href: "/press" },
  { label: "The Desk", href: "/the-desk" },
  { label: "About the Writer", href: "/about" },
]

interface DropdownState {
  services: boolean
  blogs: boolean
}
interface MobileState {
  services: boolean
  blogs: boolean
  blogChild: string | null
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState<DropdownState>({ services: false, blogs: false })
  const [mobile, setMobile] = useState<MobileState>({ services: false, blogs: false, blogChild: null })
  const [scrolled, setScrolled] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const blogsRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleEnter = (key: "services" | "blogs") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen((prev) => ({ ...prev, [key]: true }))
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen({ services: false, blogs: false }), 150)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobile({ services: false, blogs: false, blogChild: null })
  }, [pathname])

  const linkClass = (href: string) => {
    const active = isActive(href)
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
    if (active) return `${base} text-ubuntu-orange bg-ubuntu-orange/10`
    return `${base} text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5`
  }

  const dropdownClass = "absolute top-full left-0 mt-1 bg-[#1B2385]/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 rounded-xl p-6 z-50"

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#110B18]/95 border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/images/nasheta.png" alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-lg md:text-xl font-bold text-[#FCFBFB]">
            iGamingUbuntu
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Services", href: "/services", hasDropdown: true, key: "services" as const },
            { label: "Blogs", href: "/blog", hasDropdown: true, key: "blogs" as const },
            { label: "Contact Us", href: "/contact" },
          ].map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleEnter(item.key!)}
              onMouseLeave={handleLeave}
            >
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setOpen((prev) => ({ ...prev, [item.key!]: !prev[item.key!] }))}
                    className={linkClass(item.href)}
                  >
                    {item.label}
                    <FiChevronDown className={`w-3.5 h-3.5 mt-0.5 inline ml-0.5 transition-transform ${open[item.key!] ? "rotate-180" : ""}`} />
                  </button>

                  {/* Services dropdown */}
                  {item.key === "services" && open.services && (
                    <div
                      ref={servicesRef}
                      className={`${dropdownClass} min-w-[600px]`}
                      onMouseEnter={() => handleEnter("services")}
                      onMouseLeave={handleLeave}
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-ubuntu-orange mb-3">Content Types</h4>
                          <div className="space-y-2">
                            {contentTypes.map((ct) => (
                              <Link key={ct.label} href={ct.href} className="block p-3 rounded-lg hover:bg-white/5 transition group">
                                <span className="font-medium text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">{ct.label}</span>
                                <p className="text-xs text-[#56525E] mt-0.5">{ct.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-ubuntu-orange mb-3">Markets</h4>
                          <div className="space-y-2">
                            {markets.map((m) => (
                              <Link key={m.label} href={m.href} className="block p-3 rounded-lg hover:bg-white/5 transition group">
                                <span className="font-medium text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">{m.label}</span>
                                <p className="text-xs text-[#56525E] mt-0.5">{m.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Blogs mega-menu dropdown */}
                  {item.key === "blogs" && open.blogs && (
                    <div
                      ref={blogsRef}
                      className={`${dropdownClass} min-w-[720px]`}
                      onMouseEnter={() => handleEnter("blogs")}
                      onMouseLeave={handleLeave}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {/* Column 1: News + Press Release + Sports Betting */}
                        <div>
                          <Link href="/news" className="block mb-2 group">
                            <span className="font-semibold text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">News</span>
                          </Link>
                          <div className="space-y-1 mb-4 ml-2 border-l-2 border-ubuntu-orange/20 pl-3">
                            {blogSections[0].children.map((ch) => (
                              <Link key={ch.href} href={ch.href} className="block py-1.5 group">
                                <span className="text-sm text-[#B5ABB3] group-hover:text-ubuntu-orange transition-colors">{ch.label}</span>
                                <p className="text-xs text-[#56525E]">{ch.desc}</p>
                              </Link>
                            ))}
                          </div>
                          <Link href="/press" className="block mb-4 group">
                            <span className="font-semibold text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">Press Release</span>
                            <p className="text-xs text-[#56525E]">Submitted releases and partner announcements</p>
                          </Link>
                          <Link href="/sports" className="block mb-2 group">
                            <span className="font-semibold text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">Sports Betting</span>
                          </Link>
                          <div className="space-y-1 ml-2 border-l-2 border-ubuntu-orange/20 pl-3">
                            {blogSections[1].children.map((ch) => (
                              <Link key={ch.href} href={ch.href} className="block py-1.5 group">
                                <span className="text-sm text-[#B5ABB3] group-hover:text-ubuntu-orange transition-colors">{ch.label}</span>
                                <p className="text-xs text-[#56525E]">{ch.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Casino Directory + Events */}
                        <div>
                          <Link href="/casinos" className="block mb-2 group">
                            <span className="font-semibold text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">Casino Directory</span>
                          </Link>
                          <div className="space-y-1 mb-6 ml-2 border-l-2 border-ubuntu-orange/20 pl-3">
                            {blogSections[2].children.map((ch) => (
                              <Link key={ch.href} href={ch.href} className="block py-1.5 group">
                                <span className="text-sm text-[#B5ABB3] group-hover:text-ubuntu-orange transition-colors">{ch.label}</span>
                                <p className="text-xs text-[#56525E]">{ch.desc}</p>
                              </Link>
                            ))}
                          </div>
                          <Link href="/events" className="block mb-2 group">
                            <span className="font-semibold text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">Events</span>
                          </Link>
                          <div className="space-y-1 ml-2 border-l-2 border-ubuntu-orange/20 pl-3">
                            {blogSections[3].children.map((ch) => (
                              <Link key={ch.href} href={ch.href} className="block py-1.5 group">
                                <span className="text-sm text-[#B5ABB3] group-hover:text-ubuntu-orange transition-colors">{ch.label}</span>
                                <p className="text-xs text-[#56525E]">{ch.desc}</p>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Standalone items */}
                        <div>
                          {standaloneBlogItems.map((item) => (
                            <Link key={item.label} href={item.href} className="block p-3 rounded-lg hover:bg-white/5 transition group mb-2">
                              <span className="font-semibold text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">{item.label}</span>
                            </Link>
                          ))}
                          <div className="mt-6 pt-4 border-t border-white/10">
                            <Link href="/blog" className="block text-center bg-gradient-to-r from-ubuntu-orange to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition shadow-md">
                              View All Articles
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/work-with-me"
            className="bg-[#409824] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition hover:bg-[#409824]/90 shadow-lg shadow-[#409824]/20 hover:shadow-lg"
          >
            Work With Me
          </Link>
        </div>

        <button className="lg:hidden cursor-pointer p-2 text-[#FCFBFB]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden bg-[#110B18] border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">Home</Link>
            <Link href="/about" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">About Us</Link>

            {/* Services mobile */}
            <div>
              <button
                onClick={() => setMobile((prev) => ({ ...prev, services: !prev.services }))}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5 cursor-pointer"
              >
                Services
                <FiChevronDown className={`w-4 h-4 transition-transform ${mobile.services ? "rotate-180" : ""}`} />
              </button>
              {mobile.services && (
                <div className="ml-3 mt-1 space-y-1 pb-2 border-l-2 border-ubuntu-orange/20 pl-3">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-ubuntu-orange uppercase tracking-wider mb-2">Content Types</p>
                    {contentTypes.map((ct) => (
                      <Link key={ct.label} href={ct.href} className="block px-3 py-2 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">{ct.label}</Link>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ubuntu-orange uppercase tracking-wider mb-2">Markets</p>
                    {markets.map((m) => (
                      <Link key={m.label} href={m.href} className="block px-3 py-2 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">{m.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blogs mobile with full subsite nav */}
            <div>
              <button
                onClick={() => setMobile((prev) => ({ ...prev, blogs: !prev.blogs, blogChild: prev.blogs ? null : prev.blogChild }))}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5 cursor-pointer"
              >
                Blogs
                <FiChevronDown className={`w-4 h-4 transition-transform ${mobile.blogs ? "rotate-180" : ""}`} />
              </button>
              {mobile.blogs && (
                <div className="ml-3 mt-1 space-y-2 pb-2">
                  <div>
                    <Link href="/news" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">News</Link>
                    <div className="ml-3 space-y-1 border-l-2 border-ubuntu-orange/20 pl-3">
                      <Link href="/news/industry" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Industry News</Link>
                      <Link href="/news/regulation" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Regulation Watch</Link>
                    </div>
                  </div>
                  <Link href="/press" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">Press Release</Link>
                  <div>
                    <Link href="/sports" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">Sports Betting</Link>
                    <div className="ml-3 space-y-1 border-l-2 border-ubuntu-orange/20 pl-3">
                      <Link href="/sports/live" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Live Events</Link>
                      <Link href="/sports/predictions" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Predictions & Tips</Link>
                      <Link href="/sports/leagues" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">League Guides</Link>
                      <Link href="/sports/basics" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Betting Explained</Link>
                    </div>
                  </div>
                  <div>
                    <Link href="/casinos" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">Casino Directory</Link>
                    <div className="ml-3 space-y-1 border-l-2 border-ubuntu-orange/20 pl-3">
                      <Link href="/casinos/new" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">New Casinos</Link>
                      <Link href="/casinos/best" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Best Casinos</Link>
                      <Link href="/casinos/mobile" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Mobile Casinos</Link>
                      <Link href="/casinos/payments" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Payment Methods</Link>
                      <Link href="/casinos/market" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">By Market</Link>
                    </div>
                  </div>
                  <div>
                    <Link href="/events" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">Events</Link>
                    <div className="ml-3 space-y-1 border-l-2 border-ubuntu-orange/20 pl-3">
                      <Link href="/events/upcoming" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Upcoming Events</Link>
                      <Link href="/events/recaps" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Event Recaps</Link>
                      <Link href="/events/webinars" className="block px-3 py-1.5 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">Webinars & Panels</Link>
                    </div>
                  </div>
                  <Link href="/the-desk" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">The Desk</Link>
                  <Link href="/about" className="block px-3 py-2 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">About the Writer</Link>
                  <Link href="/blog" className="block text-center bg-gradient-to-r from-ubuntu-orange to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold mt-2">
                    View All Articles
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">Contact Us</Link>
            <div className="border-t border-white/10 pt-3 mt-3">
              <Link href="/work-with-me" className="block text-center bg-[#409824] text-white px-4 py-3 rounded-lg text-sm font-bold">
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
