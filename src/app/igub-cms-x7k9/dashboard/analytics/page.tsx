"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getArticles } from "@/lib/firestoreService"
import type { Article } from "@/types"

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    if (!user) return
    const fetchArticles = async () => {
      const data = await getArticles()
      setArticles(data)
      setLoading(false)
    }
    fetchArticles()
  }, [user])

  if (authLoading || loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  const published = articles.filter(a => a.status === "published")
  const totalViews = articles.reduce((s, a) => s + (a.views || 0), 0)
  const avgViews = published.length ? Math.round(totalViews / published.length) : 0
  
  const byCategory = articles.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const byCountry = articles.reduce((acc, a) => {
    acc[a.country] = (acc[a.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10)

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Content performance overview</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Articles" value={articles.length} color="#E95420" />
        <StatCard title="Published" value={published.length} color="#409824" />
        <StatCard title="Total Views" value={totalViews.toLocaleString()} color="#F59E0B" />
        <StatCard title="Avg Views/Article" value={avgViews.toLocaleString()} color="#772953" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <h2 className="font-bold text-white mb-4">Top Performing Articles</h2>
          <div className="space-y-3">
            {topArticles.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                <span className="text-2xl font-bold text-gray-600 w-10 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <Link href={`/blog/${a.slug}`} target="_blank" className="font-medium text-white hover:text-[#E95420] truncate block">
                    {a.title}
                  </Link>
                  <p className="text-xs text-gray-400">{a.category} • {a.country}</p>
                </div>
                <span className="font-bold text-[#f59e0b] text-lg">{(a.views || 0).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <h2 className="font-bold text-white mb-4">By Category</h2>
          <div className="space-y-3">
            {Object.entries(byCategory)
              .sort(([,a], [,b]) => b - a)
              .map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="font-medium text-white capitalize">{cat}</span>
                  <span className="font-bold text-[#f59e0b]">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 lg:col-span-2">
          <h2 className="font-bold text-white mb-4">By Country</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(byCountry)
              .sort(([,a], [,b]) => b - a)
              .map(([country, count]) => (
                <div key={country} className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-2xl font-bold text-[#f59e0b]">{count}</p>
                  <p className="text-sm text-gray-400 capitalize mt-1">{country || "Global"}</p>
                </div>
              ))}
          </div>
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