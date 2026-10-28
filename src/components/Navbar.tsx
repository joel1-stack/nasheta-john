"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"

import { IgubFullLogo } from "./IgubLogo"
import { DIRECTORY_LINKS, MARKET_LINKS } from "@/lib/navigation"

const directoryPaths = [...DIRECTORY_LINKS, ...MARKET_LINKS].map((l) => l.href)

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dirOpen, setDirOpen] = useState(false)
  const [mobileDirOpen, setMobileDirOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  const openDir = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDirOpen(true)
  }
  const closeDir = () => {
    timeoutRef.current = setTimeout(() => setDirOpen(false), 150)
  }
  const closeAll = () => {
    setDirOpen(false)
    setMenuOpen(false)
    setMobileDirOpen(false)
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))
  const dirActive = directoryPaths.some((p) => pathname.startsWith(p))

  const linkClass = (active: boolean) => {
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
    if (active) return `${base} text-ubuntu-orange bg-ubuntu-orange/10`
    return `${base} text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5`
  }
  const mobileLink = "block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5"

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#110B18]/95 border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <IgubFullLogo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/" className={linkClass(isActive("/"))}>Home</Link>
          <Link href="/news" className={linkClass(isActive("/news") && !pathname.startsWith("/news/regulation"))}>News</Link>

          <div className="relative" onMouseEnter={openDir} onMouseLeave={closeDir}>
            <button
              // Hover already opens it on desktop; a click must not close it again.
              onClick={openDir}
              onKeyDown={(e) => e.key === "Escape" && setDirOpen(false)}
              aria-expanded={dirOpen}
              className={linkClass(dirActive)}
            >
              iGaming Directory
              <FiChevronDown className={`w-3.5 h-3.5 mt-0.5 inline ml-0.5 transition-transform ${dirOpen ? "rotate-180" : ""}`} />
            </button>
            {dirOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#1B1426] border border-white/10 shadow-xl shadow-black/40 rounded-xl p-5 z-50 min-w-[420px] grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ubuntu-orange mb-2">Directory</p>
                  {DIRECTORY_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} onClick={closeAll} className="block px-2 py-2 rounded-lg text-sm text-[#FCFBFB] hover:text-ubuntu-orange hover:bg-white/5 transition">
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ubuntu-orange mb-2">Markets</p>
                  {MARKET_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} onClick={closeAll} className="block px-2 py-2 rounded-lg text-sm text-[#FCFBFB] hover:text-ubuntu-orange hover:bg-white/5 transition">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/events" className={linkClass(isActive("/events"))}>Events</Link>
          <Link href="/about" className={linkClass(isActive("/about"))}>Who We Are</Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/advertise"
            className="bg-[#409824] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition hover:bg-[#409824]/90 shadow-lg shadow-[#409824]/20 hover:shadow-lg"
          >
            Advertise
          </Link>
        </div>

        <button className="lg:hidden cursor-pointer p-2 text-[#FCFBFB]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden bg-[#110B18] border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={closeAll} className={mobileLink}>Home</Link>
            <Link href="/news" onClick={closeAll} className={mobileLink}>News</Link>
            <div>
              <button
                onClick={() => setMobileDirOpen((v) => !v)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5 cursor-pointer"
              >
                iGaming Directory
                <FiChevronDown className={`w-4 h-4 transition-transform ${mobileDirOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileDirOpen && (
                <div className="ml-3 mt-1 space-y-1 pb-2 border-l-2 border-ubuntu-orange/20 pl-3">
                  {[...DIRECTORY_LINKS, ...MARKET_LINKS].map((l) => (
                    <Link key={l.href} href={l.href} onClick={closeAll} className="block px-3 py-2 rounded-lg text-sm text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/events" onClick={closeAll} className={mobileLink}>Events</Link>
            <Link href="/about" onClick={closeAll} className={mobileLink}>Who We Are</Link>
            <div className="border-t border-white/10 pt-3 mt-3">
              <Link href="/advertise" onClick={closeAll} className="block text-center bg-[#409824] text-white px-4 py-3 rounded-lg text-sm font-bold">
                Advertise
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
