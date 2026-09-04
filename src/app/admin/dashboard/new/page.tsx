"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getAuthInstance } from "@/lib/firebase"
import { createArticle, createAffiliateLink } from "@/lib/firestoreService"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface AffiliateField {
  operatorName: string
  url: string
  bonusText: string
}

export default function NewPostPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "Sports Betting",
    country: "kenya", featuredImage: "", tags: "", readTime: 5, status: "draft",
  })

  const [affiliates, setAffiliates] = useState<AffiliateField[]>([
    { operatorName: "", url: "", bonusText: "" },
  ])

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) { router.push("/admin") } else { setUser(u) }
      setLoading(false)
    })
    return () => unsub()
  }, [router])

  const autoSlug = (title: string) => {
    setForm((f) => ({ ...f, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }))
  }

  const addAffiliate = () => {
    setAffiliates((prev) => [...prev, { operatorName: "", url: "", bonusText: "" }])
  }

  const removeAffiliate = (i: number) => {
    setAffiliates((prev) => prev.filter((_, idx) => idx !== i))
  }

  const updateAffiliate = (i: number, field: keyof AffiliateField, value: string) => {
    setAffiliates((prev) => prev.map((a, idx) => idx === i ? { ...a, [field]: value } : a))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const id = await createArticle({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        country: form.country,
        featuredImage: form.featuredImage,
        tags: form.tags.split(",").map((t) => t.trim()),
        readTime: form.readTime,
        author: "iGamingUbuntu",
        status: form.status as "published" | "draft",
        views: 0,
      })

      if (id) {
        for (const aff of affiliates) {
          if (aff.operatorName && aff.url) {
            await createAffiliateLink({
              articleId: id,
              operatorName: aff.operatorName,
              url: aff.url,
              trackingId: `${id}-${aff.operatorName.toLowerCase().replace(/\s+/g, "-")}`,
              bonusText: aff.bonusText,
              clicks: 0,
            })
          }
        }
      }

      router.push("/admin/dashboard")
    } catch (err) {
      alert("Failed to save. Check console for error.")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 transition"
  const selectClass = "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 transition"

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">New Article</h1>
        <Link href="/admin/dashboard" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Dashboard</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
          <input value={form.title} onChange={(e) => autoSlug(e.target.value)} className={inputClass} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Read Time (min)</label>
            <input type="number" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: +e.target.value }))} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className={inputClass} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Content (HTML)</label>
          <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={15} className={`${inputClass} font-mono`} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={selectClass}>
              <option value="Sports Betting" className="bg-[#0F0A1A]">Sports Betting</option>
              <option value="Casino Reviews" className="bg-[#0F0A1A]">Casino Reviews</option>
              <option value="Bonuses" className="bg-[#0F0A1A]">Bonuses</option>
              <option value="Betting Tips" className="bg-[#0F0A1A]">Betting Tips</option>
              <option value="Guides" className="bg-[#0F0A1A]">Guides</option>
              <option value="Industry News" className="bg-[#0F0A1A]">Industry News</option>
              <option value="Events" className="bg-[#0F0A1A]">Events</option>
              <option value="Events" className="bg-[#0F0A1A]">Events</option>
              <option value="News" className="bg-[#0F0A1A]">News</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Country</label>
            <select value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} className={selectClass}>
              <option value="kenya" className="bg-[#0F0A1A]">Kenya</option>
              <option value="nigeria" className="bg-[#0F0A1A]">Nigeria</option>
              <option value="south-africa" className="bg-[#0F0A1A]">South Africa</option>
              <option value="ghana" className="bg-[#0F0A1A]">Ghana</option>
              <option value="tanzania" className="bg-[#0F0A1A]">Tanzania</option>
              <option value="global" className="bg-[#0F0A1A]">Global</option>
              <option value="" className="bg-[#0F0A1A]">General</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Tags (comma separated)</label>
          <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className={inputClass} placeholder="World Cup, Argentina, Betting" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Featured Image URL</label>
          <input value={form.featuredImage} onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))} className={inputClass} placeholder="https://..." />
        </div>

        {/* Affiliate Links */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="font-bold text-white mb-3">Affiliate Links</h2>
          <p className="text-xs text-gray-400 mb-4">Add operator affiliate links that will appear in this article.</p>
          {affiliates.map((aff, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3 p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Operator</label>
                <input value={aff.operatorName} onChange={(e) => updateAffiliate(i, "operatorName", e.target.value)} className={inputClass} placeholder="SportPesa" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Affiliate URL</label>
                <input value={aff.url} onChange={(e) => updateAffiliate(i, "url", e.target.value)} className={inputClass} placeholder="https://..." />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Bonus Text</label>
                  <input value={aff.bonusText} onChange={(e) => updateAffiliate(i, "bonusText", e.target.value)} className={inputClass} placeholder="200% bonus" />
                </div>
                {affiliates.length > 1 && (
                  <button type="button" onClick={() => removeAffiliate(i)} className="text-red-400 text-lg mt-5 hover:text-red-300 cursor-pointer">&times;</button>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={addAffiliate} className="text-sm text-[#f59e0b] font-semibold hover:underline cursor-pointer">+ Add another operator</button>
        </div>

        <div className="flex items-center gap-3">
          <label className="block text-sm font-medium text-gray-300">Status:</label>
          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={`${selectClass} w-auto`}>
            <option value="draft" className="bg-[#0F0A1A]">Draft</option>
            <option value="published" className="bg-[#0F0A1A]">Published</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button type="submit" disabled={saving} className="bg-[#E95420] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CC4A1C] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-[#E95420]/20">
            {saving ? "Saving..." : "Save Article"}
          </button>
          <Link href="/admin/dashboard" className="bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
