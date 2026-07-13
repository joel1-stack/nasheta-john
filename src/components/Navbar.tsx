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

interface DropdownState {
  services: boolean
}
interface MobileState {
  services: boolean
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState<DropdownState>({ services: false })
  const [mobile, setMobile] = useState<MobileState>({ services: false })
  const [scrolled, setScrolled] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
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

  const handleEnter = (key: "services") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen((prev) => ({ ...prev, [key]: true }))
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen({ services: false }), 150)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobile({ services: false })
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
            { label: "Blogs", href: "/blog" },
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
                    <p className="text-xs font-semibold text-ubuntu-orange uppercase tracking-wider mb-2">Content Types</p>
                    {contentTypes.map((ct) => (
                      <Link key={ct.label} href={ct.href} className="block px-3 py-2 rounded-lg text-sm text-[#56525E] hover:text-[#B5ABB3] hover:bg-white/5">{ct.label}</Link>
                    ))}
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
