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
    seoTitle: "", metaDescription: "", canonicalUrl: "", noindex: false, ogImage: "",
    authorName: "", authorBio: "", authorPhoto: "",
    isSponsored: false, sponsorName: "", isPressRelease: false, pressReleaseSource: "",
  })

  const [affiliates, setAffiliates] = useState<AffiliateField[]>([])

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push("/igub-cms-x7k9") } else { setUser(u) }
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
            seoTitle: article.seoTitle || "",
            metaDescription: article.metaDescription || "",
            canonicalUrl: article.canonicalUrl || "",
            noindex: article.noindex || false,
            ogImage: article.ogImage || "",
            authorName: article.authorName || "",
            authorBio: article.authorBio || "",
            authorPhoto: article.authorPhoto || "",
            isSponsored: article.status === "sponsored",
            sponsorName: article.sponsorName || "",
            isPressRelease: article.status === "press-release",
            pressReleaseSource: article.pressReleaseSource || "",
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
      const status = form.isSponsored ? "sponsored" : form.isPressRelease ? "press-release" : form.status as "published" | "draft"
      await updateArticle(id, {
        ...form,
        tags,
        status,
        seoTitle: form.seoTitle,
        metaDescription: form.metaDescription,
        canonicalUrl: form.canonicalUrl,
        noindex: form.noindex,
        ogImage: form.ogImage,
        authorName: form.authorName,
        authorBio: form.authorBio,
        authorPhoto: form.authorPhoto,
        sponsorName: form.isSponsored ? form.sponsorName : "",
        pressReleaseSource: form.isPressRelease ? form.pressReleaseSource : "",
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

      router.push("/igub-cms-x7k9/dashboard")
    } catch (err) {
      alert("Failed to save. Check console.")
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
        <h1 className="text-2xl font-bold text-white">Edit Article</h1>
        <Link href="/igub-cms-x7k9/dashboard" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Dashboard</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputClass} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Read Time</label>
            <input type="number" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: +e.target.value }))} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Content (HTML)</label>
          <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={15} className={`${inputClass} font-mono`} />
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
          <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Featured Image URL</label>
          <input value={form.featuredImage} onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))} className={inputClass} />
        </div>

        {/* SEO Section */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="font-bold text-white mb-3">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">SEO Title</label>
              <input value={form.seoTitle} onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))} className={inputClass} placeholder="Custom title for search engines" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Meta Description</label>
              <textarea value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} rows={2} className={inputClass} placeholder="Custom description for search results" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Canonical URL</label>
                <input value={form.canonicalUrl} onChange={(e) => setForm((f) => ({ ...f, canonicalUrl: e.target.value }))} className={inputClass} placeholder="Leave empty for default" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">OG Image URL</label>
                <input value={form.ogImage} onChange={(e) => setForm((f) => ({ ...f, ogImage: e.target.value }))} className={inputClass} placeholder="Social sharing image URL" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="noindex" checked={form.noindex} onChange={(e) => setForm((f) => ({ ...f, noindex: e.target.checked }))} className="rounded border-white/10 bg-white/5 text-[#E95420] focus:ring-[#E95420]/50" />
              <label htmlFor="noindex" className="text-sm text-gray-300">Hide from search engines</label>
            </div>
          </div>
        </div>

        {/* Affiliate Links */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="font-bold text-white mb-3">Affiliate Links</h2>
          <p className="text-xs text-gray-400 mb-4">Manage operator affiliate links for this article.</p>
          {affiliates.map((aff, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3 p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Operator</label>
                <input value={aff.operatorName} onChange={(e) => updateAffiliate(i, "operatorName", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Affiliate URL</label>
                <input value={aff.url} onChange={(e) => updateAffiliate(i, "url", e.target.value)} className={inputClass} />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Bonus Text</label>
                  <input value={aff.bonusText} onChange={(e) => updateAffiliate(i, "bonusText", e.target.value)} className={inputClass} />
                </div>
                <button type="button" onClick={() => removeAffiliate(i)} className="text-red-400 text-lg mt-5 hover:text-red-300 cursor-pointer">&times;</button>
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

        {/* Article Type Section */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="font-bold text-white mb-3">Article Type</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isSponsored" checked={form.isSponsored} onChange={(e) => setForm((f) => ({ ...f, isSponsored: e.target.checked }))} className="rounded border-white/10 bg-white/5 text-[#E95420] focus:ring-[#E95420]/50" />
              <label htmlFor="isSponsored" className="text-sm text-gray-300">This is a sponsored/paid article</label>
            </div>
            {form.isSponsored && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Sponsor Name</label>
                <input value={form.sponsorName} onChange={(e) => setForm((f) => ({ ...f, sponsorName: e.target.value }))} className={inputClass} placeholder="Sponsor name" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isPressRelease" checked={form.isPressRelease} onChange={(e) => setForm((f) => ({ ...f, isPressRelease: e.target.checked }))} className="rounded border-white/10 bg-white/5 text-[#E95420] focus:ring-[#E95420]/50" />
              <label htmlFor="isPressRelease" className="text-sm text-gray-300">This is a press release</label>
            </div>
            {form.isPressRelease && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Press Release Source</label>
                <input value={form.pressReleaseSource} onChange={(e) => setForm((f) => ({ ...f, pressReleaseSource: e.target.value }))} className={inputClass} placeholder="Source/PR agency" />
              </div>
            )}
          </div>
        </div>

        {/* Author Section */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="font-bold text-white mb-3">Author</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Name</label>
              <input value={form.authorName} onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))} className={inputClass} placeholder="Author name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Bio</label>
              <textarea value={form.authorBio} onChange={(e) => setForm((f) => ({ ...f, authorBio: e.target.value }))} rows={2} className={inputClass} placeholder="Brief author bio" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Photo URL</label>
              <input value={form.authorPhoto} onChange={(e) => setForm((f) => ({ ...f, authorPhoto: e.target.value }))} className={inputClass} placeholder="Author photo URL" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button type="submit" disabled={saving} className="bg-[#E95420] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CC4A1C] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-[#E95420]/20">
            {saving ? "Saving..." : "Update Article"}
          </button>
          <Link href="/igub-cms-x7k9/dashboard" className="bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
