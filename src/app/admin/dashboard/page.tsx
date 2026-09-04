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

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome back, {user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/dashboard/new"
            className="bg-[#E95420] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20"
          >
            + New Post
          </Link>
          <button
            onClick={() => signOut(getAuthInstance()!)}
            className="bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600/80 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-white">{articles.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Published</p>
          <p className="text-3xl font-bold text-[#409824]">{publishedCount}</p>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Total Views</p>
          <p className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-left text-sm font-semibold text-white">Title</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Views</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium mb-1 text-white">No articles yet</p>
                    <p className="text-sm mb-4">Create your first article to get started.</p>
                    <Link
                      href="/admin/dashboard/new"
                      className="bg-[#E95420] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#CC4A1C] transition inline-block shadow-lg shadow-[#E95420]/20"
                    >
                      + Create First Article
                    </Link>
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
                  <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4">
                      <p className="font-medium text-white">{a.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{a.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-300 bg-white/10 px-2.5 py-1 rounded-full">{a.category}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        a.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300 font-medium">{(a.views || 0).toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-400">{a.createdAt || "—"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/dashboard/edit/${a.id}`}
                          className="text-sm text-[#f59e0b] hover:text-[#f59e0b]/80 font-medium transition"
                        >
                          Edit
                        </Link>
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
