"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FiCornerDownLeft, FiFileText, FiPlus, FiSearch } from "react-icons/fi"
import { getArticles } from "@/lib/firestoreService"
import { CMS_NAV } from "@/components/cms/CmsSidebar"
import type { Article } from "@/types"

interface Item {
  key: string
  label: string
  hint: string
  href: string
  icon: React.ReactNode
}

/**
 * Ctrl+K / Cmd+K: jump to any CMS page or article by typing.
 * Articles load the first time the palette opens.
 */
export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === "Escape" && open) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    if (articles === null) getArticles().then(setArticles).catch(() => setArticles([]))
  }, [open, articles])

  const items = useMemo<Item[]>(() => {
    const q = query.trim().toLowerCase()
    const pages: Item[] = [
      { key: "new", label: "Write a new article", hint: "Action", href: "/igub-cms-x7k9/dashboard/new", icon: <FiPlus /> },
      ...CMS_NAV.flatMap((g) =>
        g.items.map(({ href, label, icon: Icon }) => ({ key: href, label, hint: g.label, href, icon: <Icon /> })),
      ),
    ]
    const pageHits = pages.filter((p) => !q || p.label.toLowerCase().includes(q))
    const articleHits = q
      ? (articles || [])
          .filter((a) => a.title.toLowerCase().includes(q) || (a.slug || "").includes(q))
          .slice(0, 8)
          .map((a) => ({
            key: a.id,
            label: a.title,
            hint: a.status || "draft",
            href: `/igub-cms-x7k9/dashboard/edit/${a.id}`,
            icon: <FiFileText />,
          }))
      : []
    return [...articleHits, ...pageHits].slice(0, 12)
  }, [query, articles])

  if (!open) return null

  const go = (item?: Item) => {
    if (!item) return
    setOpen(false)
    setQuery("")
    router.push(item.href)
  }

  return (
    <div className="cms-raw fixed inset-0 z-[70] bg-[#0F1F16]/50 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 border-b border-[#E1EAE0]">
          <FiSearch className="text-[#5F7068]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setActive((i) => Math.min(i + 1, items.length - 1))
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setActive((i) => Math.max(i - 1, 0))
              } else if (e.key === "Enter") {
                e.preventDefault()
                go(items[active])
              }
            }}
            placeholder="Search articles and pages..."
            className="flex-1 h-14 bg-transparent text-[#0F1F16] placeholder-[#8A9A92] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-[#5F7068] bg-[#EEF4EC] px-1.5 py-0.5 rounded">Esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {items.map((item, i) => (
            <li key={item.key}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer ${
                  i === active ? "bg-[#A7F432]/25" : ""
                }`}
              >
                <span className="text-[#2C6E5E]">{item.icon}</span>
                <span className="flex-1 min-w-0 text-sm text-[#0F1F16] truncate">{item.label}</span>
                <span className="text-[11px] text-[#8A9A92] capitalize">{item.hint}</span>
                {i === active && <FiCornerDownLeft className="text-[#5F7068]" size={13} />}
              </button>
            </li>
          ))}
          {items.length === 0 && <li className="px-3 py-6 text-sm text-center text-[#5F7068]">Nothing matches &ldquo;{query}&rdquo;.</li>}
        </ul>
      </div>
    </div>
  )
}
