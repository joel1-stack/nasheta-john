"use client"

import { FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import {
  getAllAffiliateLinks,
  createAffiliateLink,
  updateAffiliateLink,
  deleteAffiliateLink,
  getArticles,
  getOperators,
} from "@/lib/firestoreService"
import StatCard from "@/components/cms/StatCard"
import type { AffiliateLink, Article, Operator } from "@/types"

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 transition"
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

const emptyForm = {
  operatorName: "",
  articleId: "",
  url: "",
  trackingId: "",
  bonusText: "",
  ctaLabel: "Claim Offer",
  campaign: "",
  network: "",
  destination: "/register",
  country: "",
  placement: "",
  status: "active" as "active" | "paused" | "expired",
}

export default function AffiliateLinksPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState<AffiliateLink[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [operators, setOperators] = useState<Operator[]>([])
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const [l, a, o] = await Promise.all([getAllAffiliateLinks(), getArticles(), getOperators()])
      setLinks(l)
      setArticles(a)
      setOperators(o)
      setLoading(false)
    })()
  }, [user])

  const filtered = links.filter(
    (l) =>
      !search ||
      (l.operatorName || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.campaign || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.url || "").toLowerCase().includes(search.toLowerCase())
  )

  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0)
  const active = links.filter((l) => (l.status || "active") === "active").length
  const avg = links.length ? Math.round(totalClicks / links.length) : 0

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const startEdit = (link: AffiliateLink) => {
    setEditingId(link.id)
    setForm({
      operatorName: link.operatorName || "",
      articleId: link.articleId || "",
      url: link.url || "",
      trackingId: link.trackingId || "",
      bonusText: link.bonusText || "",
      ctaLabel: link.ctaLabel || "Claim Offer",
      campaign: link.campaign || "",
      network: link.network || "",
      destination: link.destination || "",
      country: link.country || "",
      placement: link.placement || "",
      status: (link.status || "active") as any,
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.operatorName.trim() || !form.url.trim()) return
    setSaving(true)
    try {
      const payload = {
        articleId: form.articleId,
        operatorName: form.operatorName.trim(),
        url: form.url.trim(),
        trackingId: form.trackingId.trim(),
        bonusText: form.bonusText,
        ctaLabel: form.ctaLabel,
        campaign: form.campaign,
        network: form.network,
        destination: form.destination,
        country: form.country,
        placement: form.placement,
        status: form.status,
        clicks: 0,
      }
      if (editingId) {
        const { clicks: _keepClicks, ...payloadForUpdate } = payload
        await updateAffiliateLink(editingId, payloadForUpdate)
        setLinks((prev) => prev.map((l) => (l.id === editingId ? { ...l, ...payload } : l)))
      } else {
        const id = await createAffiliateLink(payload)
        if (id) setLinks((prev) => [{ id, ...payload }, ...prev])
      }
      resetForm()
    } catch (err) {
      console.error(err)
      alert("Failed to save link")
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this affiliate link?")) return
    await deleteAffiliateLink(id)
    setLinks((prev) => prev.filter((l) => l.id !== id))
    setDeleteId(null)
  }

  const generateTracking = () => {
    const base = form.operatorName.toLowerCase().replace(/[^a-z0-9]+/g, "") || "op"
    const camp = form.campaign.toLowerCase().replace(/[^a-z0-9]+/g, "") || "gen"
    set("trackingId", `${base}-${camp}-${Date.now().toString(36)}`)
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Affiliate Links</h1>
          <p className="text-gray-400 mt-1">Track operator campaigns without hardcoding URLs in articles</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 text-sm"
        >
          {showForm ? "Close" : "+ New Link"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Clicks" value={totalClicks.toLocaleString()} color="#FFD700" />
        <StatCard title="Links" value={links.length} color="#E95420" />
        <StatCard title="Active" value={active} color="#409824" />
        <StatCard title="Avg Clicks/Link" value={avg.toLocaleString()} color="#772953" />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">{editingId ? "Edit Link" : "New Affiliate Link"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Operator *</label>
              <input
                className={inputClass}
                list="operators-list"
                value={form.operatorName}
                onChange={(e) => set("operatorName", e.target.value)}
                placeholder="BetX"
                required
              />
              <datalist id="operators-list">
                {operators.map((o) => (
                  <option key={o.id} value={o.name} />
                ))}
              </datalist>
            </div>
            <div>
              <label className={labelClass}>Campaign</label>
              <input className={inputClass} value={form.campaign} onChange={(e) => set("campaign", e.target.value)} placeholder="Kenya-2026" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Destination URL *</label>
              <input className={inputClass} value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="https://operator.com/?ref=..." required />
            </div>
            <div>
              <label className={labelClass}>Tracking ID / Sub ID</label>
              <div className="flex gap-2">
                <input className={inputClass} value={form.trackingId} onChange={(e) => set("trackingId", e.target.value)} placeholder="betx-kenya-abc" />
                <button
                  type="button"
                  onClick={generateTracking}
                  className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 whitespace-nowrap"
                >
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Related article</label>
              <select className={inputClass + " bg-[#0F0A1A]"} value={form.articleId} onChange={(e) => set("articleId", e.target.value)}>
                <option value="">— None (site-wide) —</option>
                {articles.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Network</label>
              <input className={inputClass} value={form.network} onChange={(e) => set("network", e.target.value)} placeholder="Income Access, custom..." />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input className={inputClass} value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Kenya" />
            </div>
            <div>
              <label className={labelClass}>Placement</label>
              <input className={inputClass} value={form.placement} onChange={(e) => set("placement", e.target.value)} placeholder="sidebar, table, banner..." />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass + " bg-[#0F0A1A]"} value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Bonus text</label>
              <input className={inputClass} value={form.bonusText} onChange={(e) => set("bonusText", e.target.value)} placeholder="100% welcome bonus" />
            </div>
            <div>
              <label className={labelClass}>CTA label</label>
              <input className={inputClass} value={form.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#E95420] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#CC4A1C] transition disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Link" : "Create Link"}
            </button>
            <button type="button" onClick={resetForm} className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h2 className="font-bold text-white">All Links</h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search links..."
            className="w-full md:w-64 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-left text-sm font-semibold text-white">Operator</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">Campaign</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Destination</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Clicks</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-400">
                    No affiliate links yet. Create one to start tracking.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4">
                      <p className="font-medium text-white">{l.operatorName}</p>
                      {l.bonusText && <p className="text-xs text-gray-500">{l.bonusText}</p>}
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-300">{l.campaign || "—"}</td>
                    <td className="p-4">
                      <a
                        href={`/go/${l.id}`}
                        target="_blank"
                        className="text-xs text-[#f59e0b] hover:underline break-all max-w-xs inline-block"
                      >
                        {l.url}
                      </a>
                      <p className="text-[10px] text-gray-600">/go/{l.id}</p>
                    </td>
                    <td className="p-4 font-semibold text-white">{(l.clicks || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          (l.status || "active") === "active"
                            ? "bg-green-500/20 text-green-400"
                            : (l.status || "active") === "paused"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {l.status || "active"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(l)} className="text-sm text-[#f59e0b] font-medium cursor-pointer">
                          Edit
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/go/${l.id}`)}
                          className="text-sm text-gray-400 hover:text-white cursor-pointer"
                        >
                          Copy
                        </button>
                        {deleteId === l.id ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleDelete(l.id)} className="text-sm text-red-400 font-semibold cursor-pointer">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteId(null)} className="text-sm text-gray-400 cursor-pointer">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteId(l.id)} className="text-sm text-red-400 hover:text-red-300 cursor-pointer">
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
