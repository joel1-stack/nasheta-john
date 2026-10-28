"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getArticles, deleteArticle, getAllAffiliateLinks, updateArticle, createArticle } from "@/lib/firestoreService"
import { submitToIndexNow } from "@/lib/indexnow"
import { auditArticle } from "@/lib/seoAudit"
import type { Article } from "@/types"

type StatusFilter = "all" | "published" | "draft" | "review" | "scheduled" | "sponsored" | "press-release"

export default function ArticlesPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [linkArticleIds, setLinkArticleIds] = useState<Set<string>>(new Set())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<StatusFilter>("all")
  const [category, setCategory] = useState("all")
  const [country, setCountry] = useState("all")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const [data, links] = await Promise.all([getArticles(), getAllAffiliateLinks()])
      setArticles(data)
      setLinkArticleIds(new Set(links.map((l) => l.articleId).filter(Boolean)))
      setLoading(false)
    })()
  }, [user])

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category).filter(Boolean))).sort(),
    [articles]
  )
  const countries = useMemo(
    () => Array.from(new Set(articles.map((a) => a.country).filter(Boolean))).sort(),
    [articles]
  )

  const filtered = articles.filter((a) => {
    // Articles with no status field are drafts (legacy records).
    const articleStatus = a.status || "draft"
    if (filter !== "all" && articleStatus !== filter) return false
    if (category !== "all" && a.category !== category) return false
    if (country !== "all" && a.country !== country) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article permanently?")) return
    await deleteArticle(id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
    setDeleteId(null)
  }

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const allShownSelected = filtered.length > 0 && filtered.every((a) => selected.has(a.id))
  const toggleAll = () => setSelected(allShownSelected ? new Set() : new Set(filtered.map((a) => a.id)))
  const chosen = articles.filter((a) => selected.has(a.id))

  const setStatus = async (status: "draft" | "published") => {
    setBusy(true)
    await Promise.all(chosen.map((a) => updateArticle(a.id, { status })))
    setArticles((prev) => prev.map((a) => (selected.has(a.id) ? { ...a, status } : a)))
    if (status === "published") submitToIndexNow(chosen.filter((a) => a.slug && !a.noindex).map((a) => `/news/${a.slug}`))
    setNotice(`${chosen.length} article${chosen.length === 1 ? "" : "s"} set to ${status}.`)
    setSelected(new Set())
    setBusy(false)
  }

  const notifyGoogle = () => {
    const urls = chosen.filter((a) => a.slug && !a.noindex && a.status === "published").map((a) => `/news/${a.slug}`)
    submitToIndexNow(urls)
    setNotice(`Search engines notified about ${urls.length} published article${urls.length === 1 ? "" : "s"}.`)
    setSelected(new Set())
  }

  const deleteChosen = async () => {
    if (!confirm(`Delete ${chosen.length} article${chosen.length === 1 ? "" : "s"} permanently?`)) return
    setBusy(true)
    await Promise.all(chosen.map((a) => deleteArticle(a.id)))
    setArticles((prev) => prev.filter((a) => !selected.has(a.id)))
    setNotice(`${chosen.length} article${chosen.length === 1 ? "" : "s"} deleted.`)
    setSelected(new Set())
    setBusy(false)
  }

  /** Copy an article as a new draft and open it. */
  const duplicate = async (a: Article) => {
    setBusy(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, ...rest } = a
    const newId = await createArticle({
      ...rest,
      title: `Copy of ${a.title}`,
      slug: `${a.slug}-copy-${Date.now().toString(36)}`,
      status: "draft",
      views: 0,
    })
    setBusy(false)
    if (newId) router.push(`/igub-cms-x7k9/dashboard/edit/${newId}`)
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  const statusColors: Record<string, string> = {
    published: "bg-green-500/20 text-green-400",
    draft: "bg-yellow-500/20 text-yellow-400",
    review: "bg-orange-500/20 text-orange-400",
    scheduled: "bg-blue-500/20 text-blue-400",
    sponsored: "bg-purple-500/20 text-purple-400",
    "press-release": "bg-cyan-500/20 text-cyan-400",
  }

  // Drafts saved before the status field existed have no value at all,
  // which used to render an empty badge.
  const statusLabel = (status?: string) => {
    if (!status) return "Draft"
    return status
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const statusKey = (status?: string) => status || "draft"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Articles</h1>
          <p className="text-gray-400 mt-1">{filtered.length} of {articles.length} articles</p>
        </div>
        <Link
          href="/igub-cms-x7k9/dashboard/new"
          className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 text-sm"
        >
          + New Article
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {(["all", "published", "draft", "review", "scheduled", "sponsored", "press-release"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? "bg-[#E95420] text-white shadow-lg shadow-[#E95420]/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 bg-[#0F0A1A]"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 bg-[#0F0A1A]"
            >
              <option value="all">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {notice && (
          <p className="mb-4 text-sm bg-[#EEF4EC] text-[#173D33] rounded-xl px-4 py-3 flex justify-between gap-3">
            {notice}
            <button onClick={() => setNotice("")} className="text-xs font-semibold cursor-pointer">Dismiss</button>
          </p>
        )}

        {selected.size > 0 && (
          <div className="cms-raw sticky top-20 z-20 mb-4 flex flex-wrap items-center gap-2 rounded-2xl bg-[#0F1F16] text-white px-4 py-3 shadow-xl">
            <span className="text-sm font-semibold mr-2">{selected.size} selected</span>
            <button disabled={busy} onClick={() => setStatus("published")} className="text-xs font-semibold bg-[#A7F432] text-[#0F1F16] px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50">Publish</button>
            <button disabled={busy} onClick={() => setStatus("draft")} className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 cursor-pointer disabled:opacity-50">Move to draft</button>
            <button disabled={busy} onClick={notifyGoogle} className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 cursor-pointer disabled:opacity-50">Tell Google now</button>
            <button disabled={busy} onClick={deleteChosen} className="text-xs font-semibold bg-[#7F1D1D] px-3 py-1.5 rounded-lg hover:bg-[#991B1B] cursor-pointer disabled:opacity-50">Delete</button>
            <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-white/70 hover:text-white cursor-pointer">Clear</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 w-10">
                  <input type="checkbox" checked={allShownSelected} onChange={toggleAll} aria-label="Select all shown articles" className="w-4 h-4 accent-[#3B8F7B] cursor-pointer" />
                </th>
                <th className="p-4 text-left text-sm font-semibold text-white">Article</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden lg:table-cell">Country</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">SEO</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">Affiliate</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Views</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Updated</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-12 text-center">
                    <p className="font-medium text-white mb-1">No articles found</p>
                    <p className="text-sm text-gray-400 mb-4">Create your first article to get started.</p>
                    <Link
                      href="/igub-cms-x7k9/dashboard/new"
                      className="bg-[#E95420] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#CC4A1C] transition inline-block"
                    >
                      + Create First Article
                    </Link>
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className={`border-b border-white/5 hover:bg-white/5 transition ${selected.has(a.id) ? "bg-[#A7F432]/10" : ""}`}>
                    <td className="p-4">
                      <input type="checkbox" checked={selected.has(a.id)} onChange={() => toggle(a.id)} aria-label={`Select ${a.title}`} className="w-4 h-4 accent-[#3B8F7B] cursor-pointer" />
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/igub-cms-x7k9/dashboard/edit/${a.id}`}
                        className="font-medium text-white hover:text-[#E95420] transition"
                      >
                        {a.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{a.slug}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-300 bg-white/10 px-2.5 py-1 rounded-full">{a.category}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-400 capitalize">{a.country}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          statusColors[statusKey(a.status)] || "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {statusLabel(a.status)}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {(() => {
                        const r = auditArticle(a)
                        const tone = r.score >= 90 ? "bg-[#A7F432]/30 text-[#173D33]" : r.score >= 75 ? "bg-[#3B8F7B]/15 text-[#2C6E5E]" : r.score >= 60 ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#FEE2E2] text-[#B91C1C]"
                        return (
                          <span title={r.failed.map((c) => c.problem).join(", ") || "All checks pass"} className={`text-xs font-bold px-2 py-1 rounded-md ${tone}`}>
                            {r.score}
                          </span>
                        )
                      })()}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-lg" title={linkArticleIds.has(a.id) ? "Has affiliate links" : "No affiliate links"}>
                        {linkArticleIds.has(a.id) ? "🟢" : "—"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300 font-medium">{(a.views || 0).toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-400">{a.updatedAt || a.createdAt || "—"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/igub-cms-x7k9/dashboard/edit/${a.id}`}
                          className="text-sm text-[#f59e0b] hover:text-[#f59e0b]/80 font-medium transition"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/news/${a.slug}`}
                          target="_blank"
                          className="text-sm text-gray-400 hover:text-white transition"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => duplicate(a)}
                          disabled={busy}
                          className="text-sm text-gray-400 hover:text-white transition cursor-pointer disabled:opacity-50"
                        >
                          Duplicate
                        </button>
                        {deleteId === a.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="text-sm text-red-400 font-semibold hover:text-red-300 cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteId(null)}
                              className="text-sm text-gray-400 hover:text-white cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteId(a.id)}
                            className="text-sm text-red-400 hover:text-red-300 font-medium cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
