"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi"

import { IgubFullLogo } from "./IgubLogo"
import { DIRECTORY_LINKS, EVENTS_LINKS, NEWS_LINKS, type NavLink } from "@/lib/navigation"

type MenuKey = "news" | "directory" | "events"

const MENUS: { key: MenuKey; label: string; items: NavLink[] }[] = [
  { key: "news", label: "News", items: NEWS_LINKS },
  { key: "directory", label: "iGaming Directory", items: DIRECTORY_LINKS },
  { key: "events", label: "Events", items: EVENTS_LINKS },
]

/** Every path a menu covers, including sub-menu pages (for the active state). */
function menuPaths(items: NavLink[]): string[] {
  return items.flatMap((i) => [i.href, ...(i.children ? menuPaths(i.children) : [])])
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState<MenuKey | null>(null)
  const [subOpen, setSubOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState<string | null>(null)
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

  const openMenu = (key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(key)
  }
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(null)
      setSubOpen(null)
    }, 150)
  }
  const closeAll = () => {
    setOpen(null)
    setSubOpen(null)
    setMenuOpen(false)
    setMobileOpen(null)
  }

  const isActive = (paths: string[]) => paths.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)))

  const linkClass = (active: boolean) => {
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer inline-flex items-center"
    if (active) return `${base} text-ubuntu-orange bg-ubuntu-orange/10`
    return `${base} text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5`
  }
  const itemClass = "block px-3 py-2.5 rounded-lg hover:bg-white/5 transition group"
  const mobileLink = "block px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5"

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#110B18]/95 border-b border-white/10 shadow-lg shadow-black/20" : "bg-[#110B18] border-b border-white/5"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <IgubFullLogo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/" className={linkClass(pathname === "/" || pathname.startsWith("/page/"))}>Home</Link>

          {MENUS.map((menu) => (
            <div key={menu.key} className="relative" onMouseEnter={() => openMenu(menu.key)} onMouseLeave={closeMenu}>
              {/* A dropdown only: the label is not a link to a listing page. */}
              <button
                onClick={() => openMenu(menu.key)}
                onKeyDown={(e) => e.key === "Escape" && closeAll()}
                aria-expanded={open === menu.key}
                aria-haspopup="true"
                className={linkClass(isActive(menuPaths(menu.items)))}
              >
                {menu.label}
                <FiChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${open === menu.key ? "rotate-180" : ""}`} />
              </button>

              {open === menu.key && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-[#1B1426] border border-white/10 shadow-xl shadow-black/40 rounded-xl p-2 z-50">
                  {menu.items.map((item) => (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setSubOpen(item.children ? item.href : null)}
                    >
                      <Link href={item.href} onClick={closeAll} className={itemClass}>
                        <span className="flex items-center justify-between font-medium text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">
                          {item.label}
                          {item.children && <FiChevronRight className="w-3.5 h-3.5" />}
                        </span>
                        {item.desc && <span className="block text-xs text-[#8A8494] mt-0.5">{item.desc}</span>}
                      </Link>

                      {item.children && subOpen === item.href && (
                        <div className="absolute top-0 left-full ml-1 w-72 bg-[#1B1426] border border-white/10 shadow-xl shadow-black/40 rounded-xl p-2">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} onClick={closeAll} className={itemClass}>
                              <span className="block font-medium text-sm text-[#FCFBFB] group-hover:text-ubuntu-orange transition-colors">{child.label}</span>
                              {child.desc && <span className="block text-xs text-[#8A8494] mt-0.5">{child.desc}</span>}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/about" className={linkClass(isActive(["/about"]))}>Who We Are</Link>
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

            {MENUS.map((menu) => (
              <div key={menu.key}>
                <button
                  onClick={() => setMobileOpen((v) => (v === menu.key ? null : menu.key))}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#B5ABB3] hover:text-[#FCFBFB] hover:bg-white/5 cursor-pointer"
                >
                  {menu.label}
                  <FiChevronDown className={`w-4 h-4 transition-transform ${mobileOpen === menu.key ? "rotate-180" : ""}`} />
                </button>
                {mobileOpen === menu.key && (
                  <div className="ml-3 mt-1 space-y-1 pb-2 border-l-2 border-ubuntu-orange/20 pl-3">
                    {menu.items.map((item) => (
                      <div key={item.href}>
                        <Link href={item.href} onClick={closeAll} className="block px-3 py-2 rounded-lg text-sm text-[#FCFBFB] hover:bg-white/5">
                          {item.label}
                        </Link>
                        {item.children?.map((child) => (
                          <Link key={child.href} href={child.href} onClick={closeAll} className="block pl-7 pr-3 py-1.5 rounded-lg text-sm text-[#8A8494] hover:text-[#FCFBFB] hover:bg-white/5">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

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
