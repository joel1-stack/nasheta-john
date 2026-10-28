"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX } from "react-icons/fi"

import { IgubFullLogo } from "./IgubLogo"

const navItems = [
  { label: "Latest News", href: "/" },
  { label: "Regulation", href: "/news/regulation" },
  { label: "Markets", href: "/guides" },
  { label: "Events", href: "/events" },
  { label: "Who We Are", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) => {
    const active = isActive(href)
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
    if (active) return `${base} text-ubuntu-orange bg-ubuntu-orange/10`
    return `${base} text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5`
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#110B18]/95 border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <IgubFullLogo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/advertise"
            className="bg-[#409824] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition hover:bg-[#409824]/90 shadow-lg shadow-[#409824]/20 hover:shadow-lg"
          >
            Advertise
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
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5">
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3">
              <Link href="/advertise" onClick={() => setMenuOpen(false)} className="block text-center bg-[#409824] text-white px-4 py-3 rounded-lg text-sm font-bold">
                Advertise
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
