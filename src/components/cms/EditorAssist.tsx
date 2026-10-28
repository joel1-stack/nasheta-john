"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { FiCheck, FiClock, FiRotateCcw, FiX } from "react-icons/fi"
import { auditArticle } from "@/lib/seoAudit"
import { getRevisions, type Revision } from "@/lib/revisions"
import { Gauge } from "@/components/cms/charts"
import type { Article } from "@/types"

/** The editor form fields the helpers below need (both New and Edit pages). */
export interface EditorFields {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  featuredImageAlt: string
  tags: string
  seoTitle: string
  metaDescription: string
  noindex: boolean
}

const SITE = "https://www.igamingubuntu.com"

function toArticle(f: EditorFields): Article {
  return {
    ...(f as unknown as Article),
    tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
  }
}

/** Live SEO checklist with a Google result preview and a share-card preview. */
export function SeoCoach({ fields }: { fields: EditorFields }) {
  const result = useMemo(() => auditArticle(toArticle(fields)), [fields])
  const title = (fields.seoTitle || fields.title || "Your article title").trim()
  const meta = (fields.metaDescription || fields.excerpt || "Add a meta description so Google shows a clear summary.").trim()
  const url = `${SITE}/news/${fields.slug || "your-article"}`

  return (
    <section className="rounded-2xl border border-[#E1EAE0] bg-[#F7FAF6] p-5 space-y-5">
      <div className="flex items-center gap-5">
        <Gauge value={result.score} label="SEO score" size={110} />
        <div>
          <h3 className="font-bold text-[#0F1F16]">SEO coach</h3>
          <p className="text-sm text-[#5F7068] mt-1">
            {result.failed.length === 0
              ? "Everything checks out."
              : `${result.failed.length} thing${result.failed.length === 1 ? "" : "s"} to improve before you publish.`}
          </p>
          <p className="text-xs text-[#8A9A92] mt-1">
            {result.words} words · title {title.length} chars · meta {(fields.metaDescription || "").length} chars
          </p>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
        {result.checks.map((c) => (
          <li key={c.id} className="flex items-start gap-2 text-sm">
            <span
              className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                c.pass ? "bg-[#3B8F7B] text-white" : "bg-[#FDE68A] text-[#92400E]"
              }`}
            >
              {c.pass ? <FiCheck size={11} /> : <FiX size={11} />}
            </span>
            <span className={c.pass ? "text-[#33433B]" : "text-[#92400E] font-medium"}>{c.pass ? c.label : c.problem}</span>
          </li>
        ))}
      </ul>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5F7068] mb-2">Google preview</p>
          <div className="bg-white rounded-xl border border-[#E1EAE0] p-4">
            <p className="text-xs text-[#4D5156] truncate">{url.replace("https://", "")}</p>
            <p className="text-[#1A0DAB] text-lg leading-snug mt-1 line-clamp-2">{title}</p>
            <p className="text-sm text-[#4D5156] mt-1 line-clamp-2">{meta}</p>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5F7068] mb-2">Share preview (WhatsApp, LinkedIn, X)</p>
          <div className="bg-white rounded-xl border border-[#E1EAE0] overflow-hidden">
            {fields.featuredImage ? (
              <img src={fields.featuredImage} alt="" className="w-full aspect-[1.91/1] object-cover" />
            ) : (
              <div className="w-full aspect-[1.91/1] bg-[#EEF4EC] flex items-center justify-center text-xs text-[#8A9A92]">No image yet</div>
            )}
            <div className="p-3">
              <p className="text-[11px] uppercase text-[#8A9A92]">igamingubuntu.com</p>
              <p className="text-sm font-semibold text-[#0F1F16] line-clamp-2">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Editor safety net: keeps a local copy of unsaved work every few seconds,
 * offers to restore it after a crash or closed tab, warns before leaving
 * with unsaved changes, and saves with Ctrl+S / Cmd+S.
 */
export function useEditorGuards<T>({
  storageKey,
  data,
  dirty,
  onSave,
  ready = true,
}: {
  storageKey: string
  data: T
  dirty: boolean
  onSave: () => void
  ready?: boolean
}) {
  // Any copy left from an earlier visit, read once when the editor opens.
  const [restorable, setRestorable] = useState<{ data: T; savedAt: string } | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [lastLocalSave, setLastLocalSave] = useState<string>("")
  const onSaveRef = useRef(onSave)
  useEffect(() => {
    onSaveRef.current = onSave
  }, [onSave])

  // Autosave locally while there are unsaved changes.
  useEffect(() => {
    if (!ready || !dirty || restorable) return
    const t = setTimeout(() => {
      try {
        const savedAt = new Date().toISOString()
        localStorage.setItem(storageKey, JSON.stringify({ data, savedAt }))
        setLastLocalSave(savedAt)
      } catch {}
    }, 3000)
    return () => clearTimeout(t)
  }, [data, dirty, ready, restorable, storageKey])

  // Warn before closing or reloading with unsaved changes.
  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  // Ctrl+S / Cmd+S saves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        onSaveRef.current()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const clear = () => {
    try {
      localStorage.removeItem(storageKey)
    } catch {}
    setRestorable(null)
  }

  return { restorable, dismissRestore: clear, clearLocal: clear, lastLocalSave }
}

/** "You have unsaved work from ..." banner. */
export function RestoreBanner({ savedAt, onRestore, onDiscard }: { savedAt: string; onRestore: () => void; onDiscard: () => void }) {
  return (
    <div className="relative z-10 mb-4 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-[#A7F432] text-[#0F1F16] px-5 py-4 shadow-lg">
      <FiRotateCcw className="shrink-0" />
      <p className="text-sm font-medium flex-1">
        You have unsaved work from {new Date(savedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}.
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={onRestore} className="bg-[#0F1F16] text-[#A7F432] text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer">
          Restore it
        </button>
        <button type="button" onClick={onDiscard} className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/10 cursor-pointer">
          Discard
        </button>
      </div>
    </div>
  )
}

/** Small status line: autosave time and the Ctrl+S hint. */
export function SaveHint({ dirty, lastLocalSave }: { dirty: boolean; lastLocalSave: string }) {
  return (
    <p className="text-xs text-[#8A9A92] flex items-center gap-1.5">
      <FiClock size={12} />
      {dirty
        ? lastLocalSave
          ? `Unsaved changes, backed up on this computer at ${new Date(lastLocalSave).toLocaleTimeString("en-GB", { timeStyle: "short" })}`
          : "Unsaved changes"
        : "All changes saved"}
      <span className="ml-2 px-1.5 py-0.5 rounded bg-[#EEF4EC] text-[#5F7068] font-mono">Ctrl+S</span> to save
    </p>
  )
}

/** Version history drawer for the Edit page. */
export function RevisionHistory({
  articleId,
  open,
  onClose,
  onRestore,
}: {
  articleId: string
  open: boolean
  onClose: () => void
  onRestore: (rev: Revision) => void
}) {
  const [revisions, setRevisions] = useState<Revision[] | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) return
    let cancelled = false
    getRevisions(articleId)
      .then((r) => !cancelled && setRevisions(r))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Could not load history"))
    return () => {
      cancelled = true
    }
  }, [articleId, open])

  if (!open) return null
  return (
    <div className="cms-raw fixed inset-0 z-[60] flex justify-end bg-black/40" onClick={onClose}>
      <aside className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E1EAE0]">
          <div>
            <h3 className="font-bold text-[#0F1F16]">Version history</h3>
            <p className="text-xs text-[#8A9A92]">Saved before each update. Restoring fills the editor; nothing changes until you save.</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-[#EEF4EC] flex items-center justify-center text-[#33433B] cursor-pointer" aria-label="Close">
            <FiX />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {error && <p className="text-sm text-[#B91C1C]">{error}</p>}
          {!error && revisions === null && <p className="text-sm text-[#5F7068]">Loading...</p>}
          {revisions?.length === 0 && <p className="text-sm text-[#5F7068]">No earlier versions yet. One is kept every time you update this article.</p>}
          {revisions?.map((r) => (
            <div key={r.id} className="rounded-xl border border-[#E1EAE0] p-4">
              <p className="text-xs text-[#8A9A92]">
                {r.savedAt ? new Date(r.savedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Just now"}
                {r.savedBy ? ` · ${r.savedBy}` : ""}
              </p>
              <p className="text-sm font-semibold text-[#0F1F16] mt-1">{String(r.title || "Untitled")}</p>
              <p className="text-xs text-[#5F7068] mt-1 line-clamp-2">
                {String(r.content || "").replace(/<[^>]+>/g, " ").slice(0, 160)}
              </p>
              <button
                onClick={() => onRestore(r)}
                className="mt-3 text-xs font-semibold bg-[#0F1F16] text-[#A7F432] px-3 py-1.5 rounded-lg hover:bg-[#173D33] transition cursor-pointer"
              >
                Restore this version
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
