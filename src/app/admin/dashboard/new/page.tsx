"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewPostPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "Sports Betting",
    country: "kenya", featuredImage: "", tags: "", readTime: 5, status: "draft",
  })

  useEffect(() => {
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) { router.push("/admin") } else { setUser(u) }
      setLoading(false)
    })
    return () => unsub()
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Article saved! (Firebase integration pending — will save to Firestore)")
    router.push("/admin/dashboard")
  }

  const autoSlug = (title: string) => {
    setForm((f) => ({ ...f, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }))
  }

  if (loading) return <div className="p-8 text-center text-text-muted">Loading...</div>
  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">New Article</h1>
        <Link href="/admin/dashboard" className="text-sm text-ubuntu-orange hover:underline">← Back to Dashboard</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
          <input
            value={form.title}
            onChange={(e) => autoSlug(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Read Time (min)</label>
            <input type="number" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: +e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-border text-sm" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Content (HTML)</label>
          <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={15} className="w-full px-3 py-2 rounded-lg border border-border text-sm font-mono" required />
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
          <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" placeholder="World Cup, Argentina, Betting" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Featured Image URL</label>
          <input value={form.featuredImage} onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border text-sm" placeholder="https://..." />
        </div>

        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium text-text-primary">Status:</label>
          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="px-3 py-2 rounded-lg border border-border text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" className="bg-ubuntu-orange text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition cursor-pointer">
            Save Article
          </button>
          <Link href="/admin/dashboard" className="border border-border text-text-secondary px-6 py-2.5 rounded-lg font-medium hover:text-text-primary transition">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
