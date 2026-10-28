"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FiArrowRight, FiSearch, FiX } from "react-icons/fi"
import { formatDate } from "@/lib/utils"

interface Result {
  title: string
  path: string
  category: string
  date: string
  image: string
}

/** Navbar search: a button that opens a full-width search panel with live results. */
export default function SiteSearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // "/" opens search from anywhere (except while typing in a field); Esc closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && !!e.target.closest("input, textarea, [contenteditable='true']")
      if (e.key === "/" && !typing && !open) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Live results, debounced.
  useEffect(() => {
    const term = q.trim()
    if (term.length < 2) return
    const ctrl = new AbortController()
    const t = setTimeout(() => {
      setLoading(true)
      fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d) => {
          setResults(d.results || [])
          setActive(0)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, 200)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [q])

  const shown = q.trim().length >= 2 ? results : []

  const go = (r?: Result) => {
    if (!r) return
    setOpen(false)
    setQ("")
    router.push(r.path)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-[#B5ABB3] hover:text-white hover:bg-white/10 transition cursor-pointer ${className}`}
        aria-label="Search articles"
        title="Search (press /)"
      >
        <FiSearch size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] bg-[#0F1F16]/70 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-w-2xl mx-auto mt-[10vh] px-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 border-b border-[#E1EAE0]">
                <FiSearch className="text-[#3B8F7B] shrink-0" size={20} />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault()
                      setActive((i) => Math.min(i + 1, shown.length - 1))
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault()
                      setActive((i) => Math.max(i - 1, 0))
                    } else if (e.key === "Enter") {
                      e.preventDefault()
                      go(shown[active])
                    }
                  }}
                  placeholder="Search news, regulation, markets..."
                  aria-label="Search articles"
                  className="flex-1 h-16 bg-transparent text-lg text-[#0F1F16] placeholder-[#8A9A92] focus:outline-none"
                />
                <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full hover:bg-[#EEF4EC] flex items-center justify-center text-[#5F7068] cursor-pointer" aria-label="Close search">
                  <FiX />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {q.trim().length < 2 && (
                  <div className="px-5 py-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#5F7068] mb-3">Try</p>
                    <div className="flex flex-wrap gap-2">
                      {["Kenya tax", "Nigeria", "South Africa", "licence", "M-Pesa", "Ghana"].map((t) => (
                        <button key={t} onClick={() => setQ(t)} className="text-sm bg-[#EEF4EC] text-[#173D33] px-3 py-1.5 rounded-full hover:bg-[#A7F432]/40 transition cursor-pointer">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {q.trim().length >= 2 && !loading && shown.length === 0 && (
                  <p className="px-5 py-8 text-center text-sm text-[#5F7068]">No stories match &ldquo;{q}&rdquo;.</p>
                )}
                <ul className="p-2">
                  {shown.map((r, i) => (
                    <li key={r.path}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r)}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl text-left transition cursor-pointer ${i === active ? "bg-[#EEF4EC]" : ""}`}
                      >
                        {r.image ? (
                          <img src={r.image} alt="" className="w-16 h-11 rounded-lg object-cover shrink-0" />
                        ) : (
                          <span className="w-16 h-11 rounded-lg bg-[#EEF4EC] shrink-0" />
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-[#0F1F16] line-clamp-2">{r.title}</span>
                          <span className="block text-xs text-[#5F7068] mt-0.5">
                            <span className="text-[#2C6E5E] font-medium">{r.category}</span> · {formatDate(r.date)}
                          </span>
                        </span>
                        {i === active && <FiArrowRight className="text-[#3B8F7B] shrink-0" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-center text-xs text-white/70 mt-3">Press / to search from anywhere · Esc to close</p>
          </div>
        </div>
      )}
    </>
  )
}
