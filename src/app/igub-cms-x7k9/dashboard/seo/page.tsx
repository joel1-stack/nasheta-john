"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getArticles, getAllAffiliateLinks } from "@/lib/firestoreService"
import StatCard from "@/components/cms/StatCard"
import type { Article } from "@/types"

function seoScore(a: Article): number {
  let score = 0
  if (a.metaDescription && a.metaDescription.length >= 50) score += 25
  else if (a.metaDescription) score += 10
  if (a.seoTitle) score += 20
  if (a.featuredImage) score += 15
  if (a.excerpt && a.excerpt.length >= 80) score += 15
  if (!a.noindex) score += 10
  else score -= 20
  if (a.tags && a.tags.length > 0) score += 5
  return Math.max(0, Math.min(100, score))
}

export default function SeoPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [linkArticleIds, setLinkArticleIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const [a, l] = await Promise.all([getArticles(), getAllAffiliateLinks()])
      setArticles(a)
      setLinkArticleIds(new Set(l.map((x) => x.articleId).filter(Boolean)))
      setLoading(false)
    })()
  }, [user])

  const diagnostics = useMemo(() => {
    const published = articles.filter((a) => a.status === "published")
    const missingMeta = articles.filter((a) => !a.metaDescription)
    const missingOg = articles.filter((a) => !a.ogImage && !a.featuredImage)
    const noindex = articles.filter((a) => a.noindex)
    const noFeatured = articles.filter((a) => !a.featuredImage)
    const slugMissing = articles.filter((a) => !a.slug)

    const titleMap = new Map<string, number>()
    articles.forEach((a) => {
      const t = (a.seoTitle || a.title || "").toLowerCase().trim()
      if (t) titleMap.set(t, (titleMap.get(t) || 0) + 1)
    })
    const dupTitles = Array.from(titleMap.entries()).filter(([, n]) => n > 1).map(([t]) => t)

    const ninety = Date.now() - 90 * 24 * 60 * 60 * 1000
    const stale = articles.filter((a) => {
      const t = Date.parse(a.updatedAt || a.createdAt || "")
      return a.status === "published" && t && t < ninety
    })

    const scored = articles
      .map((a) => ({ article: a, score: seoScore(a) }))
      .sort((x, y) => x.score - y.score)

    return {
      published,
      missingMeta,
      missingOg,
      noindex,
      noFeatured,
      slugMissing,
      dupTitles,
      stale,
      scored,
      needsAttention: scored.filter((s) => s.score < 70),
    }
  }, [articles])

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  const avgScore = diagnostics.scored.length
    ? Math.round(diagnostics.scored.reduce((s, x) => s + x.score, 0) / diagnostics.scored.length)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">SEO Overview</h1>
        <p className="text-gray-400 mt-1">Internal diagnostics — not Google ranking scores</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Published" value={diagnostics.published.length} color="#409824" />
        <StatCard title="Avg SEO Score" value={avgScore} color="#E95420" />
        <StatCard title="Missing Meta" value={diagnostics.missingMeta.length} color="#F59E0B" />
        <StatCard title="Missing Image" value={diagnostics.noFeatured.length} color="#772953" />
        <StatCard title="Stale 90d+" value={diagnostics.stale.length} color="#C7162B" />
        <StatCard title="Duplicate Titles" value={diagnostics.dupTitles.length} color="#3B82F6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <h2 className="font-bold text-white mb-4">Content Health (lowest first)</h2>
          <div className="space-y-2 max-h-[480px] overflow-y-auto">
            {diagnostics.scored.map(({ article, score }) => (
              <div key={article.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/igub-cms-x7k9/dashboard/edit/${article.id}`}
                    className="font-medium text-white hover:text-[#E95420] truncate block text-sm"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs text-gray-500">{article.status}</p>
                </div>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span
                  className={`text-sm font-bold w-8 text-right ${
                    score >= 80 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400"
                  }`}
                >
                  {score}
                </span>
              </div>
            ))}
            {diagnostics.scored.length === 0 && (
              <p className="text-sm text-gray-500 py-6 text-center">No articles to audit yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h2 className="font-bold text-white mb-4">Issues</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Missing meta description</span>
                <span className="font-bold text-yellow-400">{diagnostics.missingMeta.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Missing featured/OG image</span>
                <span className="font-bold text-yellow-400">{diagnostics.noFeatured.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Noindex articles</span>
                <span className="font-bold text-orange-400">{diagnostics.noindex.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Missing slug</span>
                <span className="font-bold text-red-400">{diagnostics.slugMissing.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Stale (90+ days)</span>
                <span className="font-bold text-yellow-400">{diagnostics.stale.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Missing meta / image</span>
                <span className="font-bold text-yellow-400">{diagnostics.missingMeta.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Missing OG image</span>
                <span className="font-bold text-yellow-400">{diagnostics.missingOg.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Stale 90d+</span>
                <span className="font-bold text-yellow-400">{diagnostics.stale.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Duplicate titles</span>
                <span className="font-bold text-blue-400">{diagnostics.dupTitles.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Noindex articles</span>
                <span className="font-bold text-orange-400">{diagnostics.noindex.length}</span>
              </li>
              <li className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-gray-300">Score below 70</span>
                <span className="font-bold text-red-400">{diagnostics.needsAttention.length}</span>
              </li>
            </ul>
          </div>

          {diagnostics.dupTitles.length > 0 && (
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <h2 className="font-bold text-white mb-3">Duplicate Titles</h2>
              <ul className="space-y-2 text-sm text-gray-300">
                {diagnostics.dupTitles.map((t) => (
                  <li key={t} className="p-2 bg-white/5 rounded-lg">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <h2 className="font-bold text-white mb-3">Freshness warnings</h2>
        {diagnostics.stale.length === 0 ? (
          <p className="text-sm text-gray-400">All published articles were updated within the last 90 days.</p>
        ) : (
          <div className="space-y-2">
            {diagnostics.stale.slice(0, 12).map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-sm">
                <Link href={`/igub-cms-x7k9/dashboard/edit/${a.id}`} className="text-white hover:text-[#E95420]">
                  {a.title}
                </Link>
                <span className="text-yellow-400 text-xs">Updated {a.updatedAt || a.createdAt}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
