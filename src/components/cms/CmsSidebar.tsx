"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type { IconType } from "react-icons"
import {
  FiBarChart2,
  FiBriefcase,
  FiEdit3,
  FiExternalLink,
  FiFileText,
  FiFolder,
  FiGrid,
  FiImage,
  FiLayers,
  FiLink,
  FiMail,
  FiMenu,
  FiMonitor,
  FiSearch,
  FiSettings,
  FiX,
  FiCalendar,
} from "react-icons/fi"
import { IgubFullLogo } from "@/components/IgubLogo"

export const CMS_NAV: { label: string; items: { href: string; label: string; icon: IconType }[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/igub-cms-x7k9/dashboard", label: "Dashboard", icon: FiGrid }],
  },
  {
    label: "Content",
    items: [
      { href: "/igub-cms-x7k9/dashboard/articles", label: "Articles", icon: FiFileText },
      { href: "/igub-cms-x7k9/dashboard/new", label: "New Article", icon: FiEdit3 },
      { href: "/igub-cms-x7k9/dashboard/categories", label: "Categories", icon: FiFolder },
      { href: "/igub-cms-x7k9/dashboard/editorial", label: "Editorial", icon: FiCalendar },
    ],
  },
  {
    label: "Commercial",
    items: [
      { href: "/igub-cms-x7k9/dashboard/operators", label: "Operators", icon: FiBriefcase },
      { href: "/igub-cms-x7k9/dashboard/affiliate-links", label: "Affiliate Links", icon: FiLink },
      { href: "/igub-cms-x7k9/dashboard/banners", label: "Banners", icon: FiMonitor },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/igub-cms-x7k9/dashboard/seo", label: "SEO Overview", icon: FiSearch },
      { href: "/igub-cms-x7k9/dashboard/analytics", label: "Analytics", icon: FiBarChart2 },
    ],
  },
  {
    label: "Library",
    items: [
      { href: "/igub-cms-x7k9/dashboard/media", label: "Media", icon: FiImage },
      { href: "/igub-cms-x7k9/dashboard/messages", label: "Messages", icon: FiMail },
      { href: "/igub-cms-x7k9/dashboard/settings", label: "Settings", icon: FiSettings },
    ],
  },
]

export default function CmsSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/igub-cms-x7k9/dashboard") return pathname === href
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-[#A7F432] text-[#0F1F16] w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        aria-label="Toggle navigation"
      >
        {open ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {open && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />}

      <aside
        className={`cms-raw fixed top-0 left-0 z-50 h-full w-64 bg-[#0F1F16] flex flex-col transition-transform duration-200 shadow-[8px_0_30px_-12px_rgba(0,0,0,0.5)] ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-5 h-16 flex items-center gap-2">
          <Link href="/igub-cms-x7k9/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <IgubFullLogo />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7F432] bg-[#A7F432]/10 px-2 py-0.5 rounded">
              CMS
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
          {CMS_NAV.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href)
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                        active
                          ? "bg-[#A7F432] text-[#0F1F16] font-semibold shadow-[0_6px_18px_-6px_rgba(167,244,50,0.55)]"
                          : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <Icon size={17} className="shrink-0" />
                      {label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition"
          >
            <FiExternalLink size={16} /> View site
            <FiLayers size={14} className="ml-auto opacity-40" />
          </a>
        </div>
      </aside>
    </>
  )
}
