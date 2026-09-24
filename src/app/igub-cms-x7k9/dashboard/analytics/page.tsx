"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getArticles, getAllAffiliateLinks, getClickEvents } from "@/lib/firestoreService"
import StatCard from "@/components/cms/StatCard"
import type { Article, AffiliateLink, ClickEvent } from "@/types"

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [links, setLinks] = useState<AffiliateLink[]>([])
  const [clicks, setClicks] = useState<ClickEvent[]>([])

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const [a, l, c] = await Promise.all([getArticles(), getAllAffiliateLinks(), getClickEvents(500)])
      setArticles(a)
      setLinks(l)
      setClicks(c)
      setLoading(false)
    })()
  }, [user])

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  const published = articles.filter((a) => a.status === "published")
  const totalViews = articles.reduce((s, a) => s + (a.views || 0), 0)
  const avgViews = published.length ? Math.round(totalViews / published.length) : 0
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0)
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0"

  const byCategory = articles.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const byCountry = articles.reduce((acc, a) => {
    acc[a.country] = (acc[a.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const byPlacement = clicks.reduce((acc, c) => {
    const key = c.placement || "direct"
    try {
      const u = new URL(key)
      acc[u.hostname] = (acc[u.hostname] || 0) + 1
    } catch {
      acc[key] = (acc[key] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const topArticles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10)

  const linkById = new Map(links.map((l) => [l.id, l]))
  const contentPerformance = topArticles.map((a) => {
    const articleLinks = links.filter((l) => l.articleId === a.id)
    const clicksForArticle = articleLinks.reduce((s, l) => s + (l.clicks || 0), 0)
    const articleViews = a.views || 0
    return {
      article: a,
      clicks: clicksForArticle,
      articleCtr: articleViews > 0 ? ((clicksForArticle / articleViews) * 100).toFixed(1) : "0.0",
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Content performance and affiliate funnel</p>
        </div>
        <Link href="/igub-cms-x7k9/dashboard/affiliate-links" className="text-sm text-[#f59e0b] hover:underline">
          Manage affiliate links →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Articles" value={articles.length} color="#E95420" />
        <StatCard title="Published" value={published.length} color="#409824" />
        <StatCard title="Total Views" value={totalViews.toLocaleString()} color="#F59E0B" />
        <StatCard title="Avg Views/Article" value={avgViews.toLocaleString()} color="#772953" />
        <StatCard title="Affiliate Clicks" value={totalClicks.toLocaleString()} color="#FFD700" />
        <StatCard title="Outbound CTR" value={`${ctr}%`} color="#3B82F6" hint={`${clicks.length} tracked events`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 lg:col-span-2">
          <h2 className="font-bold text-white mb-4">Content Performance (views → affiliate clicks)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-3 text-left text-sm font-semibold text-white">Article</th>
                  <th className="p-3 text-left text-sm font-semibold text-white">Views</th>
                  <th className="p-3 text-left text-sm font-semibold text-white">Affiliate Clicks</th>
                  <th className="p-3 text-left text-sm font-semibold text-white">CTR</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformance.map(({ article, clicks: c, articleCtr }) => (
                  <tr key={article.id} className="border-b border-white/5">
                    <td className="p-3">
                      <Link href={`/blog/${article.slug}`} target="_blank" className="text-sm text-white hover:text-[#E95420]">
                        {article.title}
                      </Link>
                    </td>
                    <td className="p-3 text-sm text-gray-300">{(article.views || 0).toLocaleString()}</td>
                    <td className="p-3 text-sm font-semibold text-[#f59e0b]">{c.toLocaleString()}</td>
                    <td className="p-3 text-sm text-gray-300">{articleCtr}%</td>
                  </tr>
                ))}
                {contentPerformance.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-500 text-sm">
                      No articles yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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
                  <p className="text-xs text-gray-400">
                    {a.category} • {a.country}
                  </p>
                </div>
                <span className="font-bold text-[#f59e0b] text-lg">{(a.views || 0).toLocaleString()}</span>
              </div>
            ))}
            {topArticles.length === 0 && <p className="text-sm text-gray-500">No data yet.</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h2 className="font-bold text-white mb-4">Top Affiliate Links</h2>
            <div className="space-y-3">
              {[...links]
                .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
                .slice(0, 8)
                .map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{l.operatorName}</p>
                      <p className="text-xs text-gray-500 truncate">{l.campaign || l.url}</p>
                    </div>
                    <span className="font-bold text-[#f59e0b]">{(l.clicks || 0).toLocaleString()}</span>
                  </div>
                ))}
              {links.length === 0 && <p className="text-sm text-gray-500">No affiliate links yet.</p>}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h2 className="font-bold text-white mb-4">Click Sources</h2>
            <div className="space-y-2">
              {Object.entries(byPlacement)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg text-sm">
                    <span className="text-gray-300 truncate mr-2">{source}</span>
                    <span className="font-semibold text-white">{count}</span>
                  </div>
                ))}
              {Object.keys(byPlacement).length === 0 && (
                <p className="text-sm text-gray-500">No tracked clicks yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <h2 className="font-bold text-white mb-4">By Category</h2>
          <div className="space-y-3">
            {Object.entries(byCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="font-medium text-white capitalize">{cat}</span>
                  <span className="font-bold text-[#f59e0b]">{count}</span>
                </div>
              ))}
            {Object.keys(byCategory).length === 0 && <p className="text-sm text-gray-500">No data.</p>}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <h2 className="font-bold text-white mb-4">By Country</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(byCountry)
              .sort(([, a], [, b]) => b - a)
              .map(([country, count]) => (
                <div key={country} className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-2xl font-bold text-[#f59e0b]">{count}</p>
                  <p className="text-sm text-gray-400 capitalize mt-1">{country || "Global"}</p>
                </div>
              ))}
            {Object.keys(byCountry).length === 0 && (
              <p className="text-sm text-gray-500 col-span-full">No data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
