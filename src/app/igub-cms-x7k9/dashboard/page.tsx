"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { getArticles, deleteArticle } from "@/lib/firestoreService"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Article } from "@/types"

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "sponsored" | "press-release">("all")
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    loadArticles()
  }, [user])

  const loadArticles = async () => {
    setLoading(true)
    const data = await getArticles()
    setArticles(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article permanently?")) return
    await deleteArticle(id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
    setDeleteId(null)
  }

  const filteredArticles = articles.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === "published").length,
    draft: articles.filter(a => a.status === "draft").length,
    sponsored: articles.filter(a => a.status === "sponsored").length,
    totalViews: articles.reduce((s, a) => s + (a.views || 0), 0),
  }

  if (authLoading || loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  const statusColors: Record<string, string> = {
    published: "bg-green-500/20 text-green-400",
    draft: "bg-yellow-500/20 text-yellow-400",
    sponsored: "bg-purple-500/20 text-purple-400",
    "press-release": "bg-blue-500/20 text-blue-400",
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.email?.split("@")[0]}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/igub-cms-x7k9/dashboard/new" className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20">
            + New Article
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Articles" value={stats.total} color="#E95420" />
        <StatCard title="Published" value={stats.published} color="#409824" />
        <StatCard title="Drafts" value={stats.draft} color="#F59E0B" />
        <StatCard title="Total Views" value={stats.totalViews.toLocaleString()} color="#772953" />
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {(["all", "published", "draft", "sponsored", "press-release"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f 
                    ? "bg-[#E95420] text-white shadow-lg shadow-[#E95420]/30" 
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-64 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 pl-10"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-left text-sm font-semibold text-white">Article</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-white hidden lg:table-cell">Country</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Views</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Updated</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium text-white mb-1">No articles found</p>
                    <p className="text-sm text-gray-400 mb-4">Create your first article to get started.</p>
                    <Link href="/igub-cms-x7k9/dashboard/new" className="bg-[#E95420] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#CC4A1C] transition inline-block shadow-lg shadow-[#E95420]/20">
                      + Create First Article
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredArticles.map((a) => (
                  <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4">
                      <Link href={`/igub-cms-x7k9/dashboard/edit/${a.id}`} className="font-medium text-white hover:text-[#E95420] transition">
                        {a.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{a.slug}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-300 bg-white/10 px-2.5 py-1 rounded-full">{a.category}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-400 capitalize">{a.country}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[a.status] || "bg-gray-500/20 text-gray-400"}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300 font-medium">{(a.views || 0).toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-400">{a.updatedAt || a.createdAt || "—"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link href={`/igub-cms-x7k9/dashboard/edit/${a.id}`} className="text-sm text-[#f59e0b] hover:text-[#f59e0b]/80 font-medium transition">
                          Edit
                        </Link>
                        <Link href={`/blog/${a.slug}`} target="_blank" className="text-sm text-gray-400 hover:text-white transition">
                          View
                        </Link>
                        {deleteId === a.id ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleDelete(a.id)} className="text-sm text-red-400 font-semibold hover:text-red-300 cursor-pointer">Confirm</button>
                            <button onClick={() => setDeleteId(null)} className="text-sm text-gray-400 hover:text-white cursor-pointer">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteId(a.id)} className="text-sm text-red-400 hover:text-red-300 font-medium cursor-pointer">Delete</button>
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

function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white" style={{ color }}>{value}</p>
    </div>
  )
}