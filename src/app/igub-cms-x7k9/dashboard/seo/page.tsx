"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { FiAlertTriangle, FiCheckCircle, FiExternalLink } from "react-icons/fi"
import { useAuth } from "@/lib/auth-context"
import { getArticles } from "@/lib/firestoreService"
import { auditArticle, type SeoResult } from "@/lib/seoAudit"
import { BarChart, BarLabels, ChartCard, Gauge, HBars } from "@/components/cms/charts"
import type { Article } from "@/types"
import { articlePath } from "@/lib/navigation"

type Row = { article: Article; result: SeoResult }
type Filter = "fix" | "all"

function grade(score: number): { label: string; tone: string } {
  if (score >= 90) return { label: "Excellent", tone: "bg-[#A7F432]/30 text-[#173D33]" }
  if (score >= 75) return { label: "Good", tone: "bg-[#3B8F7B]/15 text-[#2C6E5E]" }
  if (score >= 60) return { label: "Fair", tone: "bg-[#FEF3C7] text-[#92400E]" }
  return { label: "Needs work", tone: "bg-[#FEE2E2] text-[#B91C1C]" }
}

export default function SeoPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [filter, setFilter] = useState<Filter>("fix")
  // Read the clock once per visit, not on every render.
  const [now] = useState(() => Date.now())

  useEffect(() => {
    if (!user) return
    ;(async () => {
      setArticles(await getArticles())
      setLoading(false)
    })()
  }, [user])

  const data = useMemo(() => {
    const rows: Row[] = articles
      .filter((a) => a.status !== "draft")
      .map((article) => ({ article, result: auditArticle(article) }))
      .sort((x, y) => x.result.score - y.result.score)

    const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.result.score, 0) / rows.length) : 0

    const buckets = [
      { label: "0–49", value: rows.filter((r) => r.result.score < 50).length },
      { label: "50–69", value: rows.filter((r) => r.result.score >= 50 && r.result.score < 70).length },
      { label: "70–89", value: rows.filter((r) => r.result.score >= 70 && r.result.score < 90).length },
      { label: "90–100", value: rows.filter((r) => r.result.score >= 90).length },
    ]

    // How many articles fail each check, most common first.
    const issueCounts = new Map<string, number>()
    rows.forEach((r) => r.result.failed.forEach((c) => issueCounts.set(c.problem, (issueCounts.get(c.problem) || 0) + 1)))
    const issues = [...issueCounts.entries()].sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }))

    const titleMap = new Map<string, Article[]>()
    rows.forEach(({ article }) => {
      const t = (article.seoTitle || article.title || "").toLowerCase().trim()
      if (t) titleMap.set(t, [...(titleMap.get(t) || []), article])
    })
    const duplicates = [...titleMap.values()].filter((list) => list.length > 1)

    const ninety = now - 90 * 24 * 60 * 60 * 1000
    const stale = rows
      .map((r) => r.article)
      .filter((a) => {
        const t = Date.parse(a.updatedAt || a.createdAt || "")
        return a.status === "published" && t && t < ninety
      })

    return { rows, avg, buckets, issues, duplicates, stale, perfect: rows.filter((r) => r.result.failed.length === 0).length }
  }, [articles, now])

  if (authLoading || loading)
    return (
      <div className="p-8 text-center">
        <div className="w-10 h-10 border-4 border-[#3B8F7B]/20 border-t-[#3B8F7B] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  const g = grade(data.avg)
  const shown = filter === "fix" ? data.rows.filter((r) => r.result.score < 90) : data.rows

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C6E5E]">Growth</p>
        <h1 className="text-3xl font-extrabold text-[#0F1F16] tracking-tight">SEO Overview</h1>
        <p className="text-[#5F7068] mt-1 text-sm">
          Our own on-page checks for every live article. A guide to what to fix, not a Google ranking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Site SEO score" subtitle={`Average of ${data.rows.length} live articles`}>
          <div className="flex flex-col items-center">
            <Gauge value={data.avg} label="out of 100" />
            <span className={`mt-3 text-sm font-semibold px-3 py-1 rounded-full ${g.tone}`}>{g.label}</span>
            <p className="text-xs text-[#8A9A92] mt-3 text-center">
              {data.perfect} article{data.perfect === 1 ? "" : "s"} pass every check
            </p>
          </div>
        </ChartCard>

        <ChartCard title="Score spread" subtitle="How many articles fall in each range">
          <BarChart data={data.buckets} height={170} highlightLast={false} />
          <BarLabels labels={data.buckets.map((b) => `${b.label} (${b.value})`)} />
        </ChartCard>

        <ChartCard title="Most common issues" subtitle="Articles failing each check">
          {data.issues.length ? (
            <HBars data={data.issues.slice(0, 6)} color="#E2B93B" max={Math.max(1, data.rows.length)} />
          ) : (
            <p className="text-sm text-[#5F7068] flex items-center gap-2">
              <FiCheckCircle className="text-[#3B8F7B]" /> No issues found.
            </p>
          )}
        </ChartCard>
      </div>

      <ChartCard
        title="Articles to improve"
        subtitle="Lowest scores first. Open an article to fix it."
        action={
          <div className="flex bg-[#EEF4EC] rounded-xl p-1 text-xs font-semibold">
            {(["fix", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${filter === f ? "bg-white text-[#0F1F16] shadow-sm" : "text-[#5F7068]"}`}
              >
                {f === "fix" ? `Below 90 (${data.rows.filter((r) => r.result.score < 90).length})` : `All (${data.rows.length})`}
              </button>
            ))}
          </div>
        }
      >
        <div className="divide-y divide-[#E1EAE0] max-h-[560px] overflow-y-auto -mx-2">
          {shown.map(({ article, result }) => {
            const tone = grade(result.score).tone
            return (
              <div key={article.id} className="flex flex-col md:flex-row md:items-center gap-3 px-2 py-3.5">
                <span className={`shrink-0 w-12 text-center text-sm font-extrabold py-1 rounded-lg ${tone}`}>{result.score}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0F1F16] text-sm truncate">{article.title}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {result.failed.length === 0 ? (
                      <span className="text-[11px] text-[#2C6E5E] font-medium">All checks pass</span>
                    ) : (
                      result.failed.map((c) => (
                        <span key={c.id} className="text-[11px] font-medium bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-md">
                          {c.problem}
                        </span>
                      ))
                    )}
                    <span className="text-[11px] text-[#8A9A92]">{result.words} words</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/igub-cms-x7k9/dashboard/edit/${article.id}`}
                    className="text-xs font-semibold bg-[#0F1F16] text-[#A7F432] px-3 py-1.5 rounded-lg hover:bg-[#173D33] transition"
                  >
                    Fix
                  </Link>
                  {article.slug && (
                    <a
                      href={articlePath(article)}
                      target="_blank"
                      rel="noopener"
                      className="text-xs font-semibold text-[#2C6E5E] px-2 py-1.5 rounded-lg hover:bg-[#EEF4EC] transition inline-flex items-center gap-1"
                    >
                      View <FiExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
          {shown.length === 0 && (
            <p className="text-sm text-[#5F7068] py-8 text-center flex items-center justify-center gap-2">
              <FiCheckCircle className="text-[#3B8F7B]" /> Every live article scores 90 or more.
            </p>
          )}
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Duplicate titles" subtitle="Two articles competing for the same search">
          {data.duplicates.length === 0 ? (
            <p className="text-sm text-[#5F7068] flex items-center gap-2">
              <FiCheckCircle className="text-[#3B8F7B]" /> No duplicates.
            </p>
          ) : (
            <ul className="space-y-3">
              {data.duplicates.map((list) => (
                <li key={list[0].id} className="p-3 rounded-xl bg-[#EEF4EC]">
                  <p className="text-sm font-semibold text-[#0F1F16]">{list[0].seoTitle || list[0].title}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {list.map((a) => (
                      <Link key={a.id} href={`/igub-cms-x7k9/dashboard/edit/${a.id}`} className="text-xs text-[#2C6E5E] hover:underline">
                        Edit /{a.slug}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ChartCard>

        <ChartCard title="Freshness" subtitle="Live articles not updated in 90+ days">
          {data.stale.length === 0 ? (
            <p className="text-sm text-[#5F7068] flex items-center gap-2">
              <FiCheckCircle className="text-[#3B8F7B]" /> Everything was updated in the last 90 days.
            </p>
          ) : (
            <ul className="space-y-2">
              {data.stale.slice(0, 10).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FEF3C7]/60 text-sm">
                  <span className="flex items-center gap-2 min-w-0">
                    <FiAlertTriangle className="text-[#B45309] shrink-0" />
                    <Link href={`/igub-cms-x7k9/dashboard/edit/${a.id}`} className="text-[#0F1F16] hover:underline truncate">
                      {a.title}
                    </Link>
                  </span>
                  <span className="text-xs text-[#92400E] shrink-0">{a.updatedAt || a.createdAt}</span>
                </li>
              ))}
            </ul>
          )}
        </ChartCard>
      </div>
    </div>
  )
}
