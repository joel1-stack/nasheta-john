"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getAuthInstance } from "@/lib/firebase"
import { getArticleById, updateArticle, getAffiliateLinks, createAffiliateLink, updateAffiliateLink, deleteAffiliateLink } from "@/lib/firestoreService"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import type { AffiliateLink } from "@/types"

interface AffiliateField {
  id?: string
  operatorName: string
  url: string
  bonusText: string
  isNew?: boolean
}

export default function EditPostPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "Sports Betting",
    country: "kenya", featuredImage: "", tags: "", readTime: 5, status: "draft",
  })

  const [affiliates, setAffiliates] = useState<AffiliateField[]>([])

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push("/admin") } else { setUser(u) }
      setLoading(false)
      if (u && id) {
        const article = await getArticleById(id)
        if (article) {
          setForm({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            country: article.country,
            featuredImage: article.featuredImage,
            tags: Array.isArray(article.tags) ? article.tags.join(", ") : article.tags || "",
            readTime: article.readTime,
            status: article.status,
          })
        }
        const links = await getAffiliateLinks(id)
        if (links.length > 0) {
          setAffiliates(links.map((l: AffiliateLink) => ({ id: l.id, operatorName: l.operatorName, url: l.url, bonusText: l.bonusText })))
        }
      }
    })
    return () => unsub()
  }, [id, router])

  const addAffiliate = () => {
    setAffiliates((prev) => [...prev, { operatorName: "", url: "", bonusText: "", isNew: true }])
  }

  const removeAffiliate = async (i: number) => {
    const aff = affiliates[i]
    if (aff.id && !aff.isNew) {
      await deleteAffiliateLink(aff.id)
    }
    setAffiliates((prev) => prev.filter((_, idx) => idx !== i))
  }

  const updateAffiliate = (i: number, field: keyof AffiliateField, value: string) => {
    setAffiliates((prev) => prev.map((a, idx) => idx === i ? { ...a, [field]: value } : a))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const tags = form.tags?.split(",").map((t) => t.trim()).filter(Boolean) || []
      await updateArticle(id, {
        ...form,
        tags,
        status: form.status as "published" | "draft",
      })

      for (const aff of affiliates) {
        if (aff.operatorName && aff.url) {
          if (aff.isNew) {
            await createAffiliateLink({
              articleId: id,
              operatorName: aff.operatorName,
              url: aff.url,
              trackingId: `${id}-${aff.operatorName.toLowerCase().replace(/\s+/g, "-")}`,
              bonusText: aff.bonusText,
              clicks: 0,
            })
          } else if (aff.id) {
            await updateAffiliateLink(aff.id, {
              operatorName: aff.operatorName,
              url: aff.url,
              bonusText: aff.bonusText,
            })
          }
        }
      }

      router.push("/admin/dashboard")
    } catch (err) {
      alert("Failed to save. Check console.")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-text-muted">Loading...</div>
  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Edit Article</h1>
        <Link href="/admin/dashboard" className="text-sm text-ubuntu-orange hover:underline">← Back to Dashboard</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Read Time</label>
            <input type="number" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: +e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Content (HTML)</label>
          <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={15} className="w-full px-3 py-2 rounded-lg border border-border text-sm font-mono" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm">
              <option>Sports Betting</option>
              <option>Casino Reviews</option>
              <option>Bonuses</option>
              <option>Guides</option>
              <option>News</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Country</label>
            <select value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm">
              <option value="kenya">Kenya</option>
              <option value="nigeria">Nigeria</option>
              <option value="south-africa">South Africa</option>
              <option value="ghana">Ghana</option>
              <option value="tanzania">Tanzania</option>
              <option value="">General</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Tags (comma separated)</label>
          <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Featured Image URL</label>
          <input value={form.featuredImage} onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
        </div>

        {/* Affiliate Links */}
        <div className="border-t border-border pt-4">
          <h2 className="font-bold text-text-primary mb-3">Affiliate Links</h2>
          <p className="text-xs text-text-muted mb-4">Manage operator affiliate links for this article.</p>
          {affiliates.map((aff, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3 p-3 bg-card rounded-lg">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">Operator</label>
                <input value={aff.operatorName} onChange={(e) => updateAffiliate(i, "operatorName", e.target.value)} className="w-full px-2 py-1.5 rounded border border-border text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">Affiliate URL</label>
                <input value={aff.url} onChange={(e) => updateAffiliate(i, "url", e.target.value)} className="w-full px-2 py-1.5 rounded border border-border text-sm" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-text-primary mb-1">Bonus Text</label>
                  <input value={aff.bonusText} onChange={(e) => updateAffiliate(i, "bonusText", e.target.value)} className="w-full px-2 py-1.5 rounded border border-border text-sm" />
                </div>
                <button type="button" onClick={() => removeAffiliate(i)} className="text-ubuntu-red text-lg mt-5 cursor-pointer">×</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addAffiliate} className="text-sm text-ubuntu-orange font-medium hover:underline cursor-pointer">+ Add another operator</button>
        </div>

        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium text-text-primary mb-1">Status:</label>
          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="px-3 py-2 rounded-lg border border-border text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={saving} className="bg-ubuntu-orange text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
            {saving ? "Saving..." : "Update Article"}
          </button>
          <Link href="/admin/dashboard" className="border border-border text-text-secondary px-6 py-2.5 rounded-lg font-medium hover:text-text-primary transition">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
