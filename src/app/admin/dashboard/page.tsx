"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Article } from "@/types"

const sampleArticles: Article[] = [
  { id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result", excerpt: "Argentina came from 2-0 down to beat Egypt.", category: "Sports Betting", country: "kenya", featuredImage: "", tags: [], readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08" },
  { id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026", excerpt: "Best online casinos in Kenya.", category: "Casino Reviews", country: "kenya", featuredImage: "", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07" },
  { id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide", excerpt: "Complete betting guide for World Cup 2026.", category: "Guides", country: "nigeria", featuredImage: "", tags: [], readTime: 6, author: "iGamingUbuntu", status: "draft", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
]

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>(sampleArticles)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/admin")
      } else {
        setUser(u)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [router])

  if (loading) return <div className="p-8 text-center text-text-muted">Loading...</div>
  if (!user) return null

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
    setDeleteConfirm(null)
  }

  const toggleStatus = (id: string) => {
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === "published" ? "draft" : "published" as Article["status"] } : a))
  }

  const totalViews = articles.reduce((s, a) => s + a.views, 0)
  const publishedCount = articles.filter((a) => a.status === "published").length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-sm text-text-muted">Welcome back, {user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/dashboard/new" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            + New Post
          </Link>
          <button onClick={() => signOut(auth!)} className="border border-border text-text-secondary px-4 py-2 rounded-lg text-sm hover:text-ubuntu-red transition cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-text-muted">Total Posts</p>
          <p className="text-3xl font-bold text-text-primary">{articles.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-text-muted">Published</p>
          <p className="text-3xl font-bold text-ubuntu-green">{publishedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-text-muted">Total Views</p>
          <p className="text-3xl font-bold text-text-primary">{totalViews.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-card text-left">
                <th className="p-4 text-sm font-semibold text-text-primary">Title</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Category</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Status</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Views</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Date</th>
                <th className="p-4 text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="p-4">
                    <p className="font-medium text-text-primary">{a.title}</p>
                    <p className="text-xs text-text-muted">{a.slug}</p>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">{a.category}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${a.status === "published" ? "bg-ubuntu-green/10 text-ubuntu-green" : "bg-yellow-100 text-yellow-700"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">{a.views}</td>
                  <td className="p-4 text-sm text-text-muted">{a.createdAt}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/dashboard/edit/${a.id}`} className="text-sm text-ubuntu-orange hover:underline">Edit</Link>
                      <button onClick={() => toggleStatus(a.id)} className="text-sm text-text-secondary hover:text-text-primary cursor-pointer">
                        {a.status === "published" ? "Draft" : "Publish"}
                      </button>
                      {deleteConfirm === a.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(a.id)} className="text-sm text-ubuntu-red font-medium cursor-pointer">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-sm text-text-muted cursor-pointer">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(a.id)} className="text-sm text-ubuntu-red hover:underline cursor-pointer">Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
