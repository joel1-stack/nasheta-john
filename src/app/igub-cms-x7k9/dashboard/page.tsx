"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  getArticles,
  getOperators,
  getAllAffiliateLinks,
  getClickEvents,
  getContactMessages,
} from "@/lib/firestoreService"
import StatCard from "@/components/cms/StatCard"
import type { Article, Operator, AffiliateLink, ClickEvent, ContactMessage } from "@/types"

export default function OverviewPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [operators, setOperators] = useState<Operator[]>([])
  const [links, setLinks] = useState<AffiliateLink[]>([])
  const [clicks, setClicks] = useState<ClickEvent[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const [a, o, l, c, m] = await Promise.all([
        getArticles(),
        getOperators(),
        getAllAffiliateLinks(),
        getClickEvents(500),
        getContactMessages(),
      ])
      setArticles(a)
      setOperators(o)
      setLinks(l)
      setClicks(c)
      setMessages(m)
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
  const drafts = articles.filter((a) => a.status === "draft")
  const inReview = articles.filter((a) => a.status === "review")
  const scheduled = articles.filter((a) => a.status === "scheduled")
  const totalViews = articles.reduce((s, a) => s + (a.views || 0), 0)
  const totalLinkClicks = links.reduce((s, l) => s + (l.clicks || 0), 0)
  const activeLinks = links.filter((l) => (l.status || "active") === "active")
  const unreadMessages = messages.filter((m) => !m.read)
  const activeOperators = operators.filter((o) => o.status === "active")

  const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000
  const staleArticles = articles.filter((a) => {
    const t = Date.parse(a.updatedAt || a.createdAt || "")
    return a.status === "published" && t && t < ninetyDaysAgo
  })

  const topArticles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
  const topLinks = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5)
  const recentArticles = articles.slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const name = user?.email?.split("@")[0] || "Admin"

  const outboundCtr =
    totalViews > 0 ? ((totalLinkClicks / totalViews) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {greeting}, {name}
          </h1>
          <p className="text-gray-400 mt-1">Here&apos;s what&apos;s happening with iGamingUbuntu.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/igub-cms-x7k9/dashboard/new"
            className="bg-[#E95420] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 text-sm"
          >
            + New Article
          </Link>
          <Link
            href="/igub-cms-x7k9/dashboard/operators/new"
            className="bg-white/10 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition text-sm"
          >
            + Operator
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Articles" value={articles.length} color="#E95420" hint={`${published.length} published`} />
        <StatCard title="Drafts" value={drafts.length} color="#F59E0B" hint={`${inReview.length} in review`} />
        <StatCard title="Scheduled" value={scheduled.length} color="#3B82F6" />
        <StatCard title="Operators" value={operators.length} color="#409824" hint={`${activeOperators.length} active`} />
        <StatCard title="Affiliate Clicks" value={totalLinkClicks.toLocaleString()} color="#FFD700" hint={`${links.length} links`} />
        <StatCard title="Total Views" value={totalViews.toLocaleString()} color="#772953" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Top Content</h2>
            <Link href="/igub-cms-x7k9/dashboard/analytics" className="text-sm text-[#f59e0b] hover:underline">
              View analytics →
            </Link>
          </div>
          <div className="space-y-3">
            {topArticles.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <span className="text-lg font-bold text-gray-600 w-6 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/igub-cms-x7k9/dashboard/edit/${a.id}`}
                    className="font-medium text-white hover:text-[#E95420] truncate block"
                  >
                    {a.title}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {a.category} • {a.country} • {a.status}
                  </p>
                </div>
                <span className="font-bold text-[#f59e0b]">{(a.views || 0).toLocaleString()}</span>
              </div>
            ))}
            {topArticles.length === 0 && (
              <p className="text-sm text-gray-500 py-6 text-center">No articles yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Affiliate Performance</h2>
            <Link href="/igub-cms-x7k9/dashboard/affiliate-links" className="text-sm text-[#f59e0b] hover:underline">
              Manage →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Clicks</p>
              <p className="text-xl font-bold text-white">{totalLinkClicks.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Outbound CTR</p>
              <p className="text-xl font-bold text-white">{outboundCtr}%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Active Links</p>
              <p className="text-xl font-bold text-white">{activeLinks.length}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Tracked Events</p>
              <p className="text-xl font-bold text-white">{clicks.length}</p>
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Top links</p>
          <div className="space-y-2">
            {topLinks.map((l) => (
              <div key={l.id} className="flex items-center justify-between text-sm p-2 bg-white/5 rounded-lg">
                <span className="text-gray-300 truncate mr-2">{l.operatorName || "Untitled"}</span>
                <span className="text-[#f59e0b] font-semibold">{l.clicks || 0}</span>
              </div>
            ))}
            {topLinks.length === 0 && <p className="text-sm text-gray-500">No affiliate links yet.</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Needs Attention</h2>
            <Link href="/igub-cms-x7k9/dashboard/seo" className="text-sm text-[#f59e0b] hover:underline">
              SEO →
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 font-bold">⚠</span>
              <span className="text-gray-300">
                {staleArticles.length} published article{staleArticles.length === 1 ? "" : "s"} not updated in 90+ days
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <span className="text-orange-400 font-bold">⚠</span>
              <span className="text-gray-300">
                {drafts.length + inReview.length} draft{drafts.length + inReview.length === 1 ? "" : "s"} waiting in the pipeline
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 font-bold">✉</span>
              <span className="text-gray-300">
                {unreadMessages.length} unread message{unreadMessages.length === 1 ? "" : "s"}
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-purple-400 font-bold">⚙</span>
              <span className="text-gray-300">
                {operators.filter((o) => !o.lastVerified).length} operators missing last-verified date
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Recent Articles</h2>
            <Link href="/igub-cms-x7k9/dashboard/articles" className="text-sm text-[#f59e0b] hover:underline">
              All articles →
            </Link>
          </div>
          <div className="space-y-3">
            {recentArticles.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/igub-cms-x7k9/dashboard/edit/${a.id}`}
                    className="font-medium text-white hover:text-[#E95420] truncate block"
                  >
                    {a.title}
                  </Link>
                  <p className="text-xs text-gray-400">{a.updatedAt || a.createdAt}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    a.status === "published"
                      ? "bg-green-500/20 text-green-400"
                      : a.status === "draft"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : a.status === "review"
                          ? "bg-orange-500/20 text-orange-400"
                          : a.status === "scheduled"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
            {recentArticles.length === 0 && (
              <p className="text-sm text-gray-500 py-6 text-center">Nothing published yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
