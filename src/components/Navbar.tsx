"use client"

import { useState } from "react"
import Link from "next/link"
import { FiSearch, FiMenu, FiX } from "react-icons/fi"

const countries = [
  { name: "Kenya", slug: "kenya" },
  { name: "Nigeria", slug: "nigeria" },
  { name: "South Africa", slug: "south-africa" },
  { name: "Ghana", slug: "ghana" },
  { name: "Tanzania", slug: "tanzania" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #E95420, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            iGamingUbuntu
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-text-primary hover:text-ubuntu-orange transition">Home</Link>
          <Link href="/blog" className="text-text-primary hover:text-ubuntu-orange transition">Blog</Link>
          <Link href="/reviews" className="text-text-primary hover:text-ubuntu-orange transition">Reviews</Link>
          <Link href="/guides" className="text-text-primary hover:text-ubuntu-orange transition">Guides</Link>

          <div className="relative" onMouseEnter={() => setCountryOpen(true)} onMouseLeave={() => setCountryOpen(false)}>
            <button className="flex items-center gap-1 text-text-primary hover:text-ubuntu-orange transition cursor-pointer">
              Countries <span className="text-xs">▾</span>
            </button>
            {countryOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg py-2 w-44 z-50">
                {countries.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`} className="block px-4 py-2 text-sm hover:bg-card hover:text-ubuntu-orange transition">
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="text-text-primary hover:text-ubuntu-orange transition">About</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/?search=1" className="text-text-muted hover:text-ubuntu-orange transition">
            <FiSearch size={18} />
          </Link>
          <Link href="/contact" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            Hire Me
          </Link>
        </div>

        <button className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/blog" className="block text-sm font-medium" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/reviews" className="block text-sm font-medium" onClick={() => setMenuOpen(false)}>Reviews</Link>
          <Link href="/guides" className="block text-sm font-medium" onClick={() => setMenuOpen(false)}>Guides</Link>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">Countries</p>
            {countries.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="block text-sm py-1" onClick={() => setMenuOpen(false)}>
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/about" className="block text-sm font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="block text-sm font-medium text-ubuntu-orange" onClick={() => setMenuOpen(false)}>Hire Me</Link>
        </div>
      )}
    </nav>
  )
}
