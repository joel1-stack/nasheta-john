"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const groups: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/igub-cms-x7k9/dashboard", label: "Overview" }],
  },
  {
    label: "Content",
    items: [
      { href: "/igub-cms-x7k9/dashboard/articles", label: "Articles" },
      { href: "/igub-cms-x7k9/dashboard/new", label: "New Article" },
      { href: "/igub-cms-x7k9/dashboard/categories", label: "Categories" },
      { href: "/igub-cms-x7k9/dashboard/editorial", label: "Editorial" },
    ],
  },
  {
    label: "Commercial",
    items: [
      { href: "/igub-cms-x7k9/dashboard/operators", label: "Operators" },
      { href: "/igub-cms-x7k9/dashboard/affiliate-links", label: "Affiliate Links" },
    ],
  },
  {
    label: "SEO",
    items: [{ href: "/igub-cms-x7k9/dashboard/seo", label: "SEO Overview" }],
  },
  {
    label: "Media & Data",
    items: [
      { href: "/igub-cms-x7k9/dashboard/media", label: "Media" },
      { href: "/igub-cms-x7k9/dashboard/analytics", label: "Analytics" },
      { href: "/igub-cms-x7k9/dashboard/messages", label: "Messages" },
    ],
  },
  {
    label: "System",
    items: [{ href: "/igub-cms-x7k9/dashboard/settings", label: "Settings" }],
  },
]

export default function CmsSidebar({ onNavigate }: { onNavigate?: () => void }) {
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
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-[#E95420] text-white w-12 h-12 rounded-full shadow-lg shadow-[#E95420]/40 flex items-center justify-center text-xl font-bold cursor-pointer"
        aria-label="Toggle navigation"
      >
        {open ? "×" : "≡"}
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0C0714] border-r border-white/10 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-5 h-16 flex items-center border-b border-white/10">
          <Link
            href="/igub-cms-x7k9/dashboard"
            onClick={() => setOpen(false)}
            className="text-lg font-bold bg-gradient-to-r from-[#E95420] to-[#FFD700] bg-clip-text text-transparent"
          >
            iGUB CMS
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm transition ${
                        active
                          ? "bg-[#E95420]/15 text-[#E95420] font-semibold border border-[#E95420]/30"
                          : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <a
            href="/"
            className="block px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition"
          >
            ← View Site
          </a>
        </div>
      </aside>
    </>
  )
}
