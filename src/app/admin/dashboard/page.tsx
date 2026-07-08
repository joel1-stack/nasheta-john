"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { getAuthInstance } from "@/lib/firebase"
import { getArticles, deleteArticle } from "@/lib/firestoreService"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Article } from "@/types"

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [firebaseReady, setFirebaseReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) {
      setLoading(false)
      return
    }
    setFirebaseReady(true)
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/admin")
      } else {
        setUser(u)
        loadArticles()
      }
      setLoading(false)
    })
    return () => unsub()
  }, [router])

  const loadArticles = async () => {
    const data = await getArticles()
    setArticles(data)
  }

  const handleDelete = async (id: string) => {
    await deleteArticle(id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
    setDeleteId(null)
  }

  const totalViews = articles.reduce((s, a) => s + (a.views || 0), 0)
  const publishedCount = articles.filter((a) => a.status === "published").length

  if (loading) return <div className="p-8 text-center text-text-muted">Loading...</div>
  if (!user) return null

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
          <button onClick={() => signOut(getAuthInstance()!)} className="border border-border text-text-secondary px-4 py-2 rounded-lg text-sm hover:text-ubuntu-red transition cursor-pointer">
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
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-text-muted">
                    <svg className="w-12 h-12 mx-auto mb-3 text-text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <p className="font-medium mb-1">No articles yet</p>
                    <p className="text-sm mb-4">Create your first article to get started.</p>
                    <Link href="/admin/dashboard/new" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition inline-block">
                      + Create First Article
                    </Link>
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
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
                    <td className="p-4 text-sm text-text-secondary">{a.views || 0}</td>
                    <td className="p-4 text-sm text-text-muted">{a.createdAt}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/dashboard/edit/${a.id}`} className="text-sm text-ubuntu-orange hover:underline">Edit</Link>
                        {deleteId === a.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => handleDelete(a.id)} className="text-sm text-ubuntu-red font-medium cursor-pointer">Confirm</button>
                            <button onClick={() => setDeleteId(null)} className="text-sm text-text-muted cursor-pointer">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteId(a.id)} className="text-sm text-ubuntu-red hover:underline cursor-pointer">Delete</button>
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
