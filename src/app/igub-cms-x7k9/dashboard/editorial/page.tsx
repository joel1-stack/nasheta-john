"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getArticles, updateArticle } from "@/lib/firestoreService"
import StatCard from "@/components/cms/StatCard"
import type { Article, ArticleStatus } from "@/types"

const stages: { key: string; label: string; statuses: ArticleStatus[]; color: string }[] = [
  { key: "draft", label: "Drafts", statuses: ["draft"], color: "#F59E0B" },
  { key: "review", label: "In Review", statuses: ["review"], color: "#E95420" },
  { key: "scheduled", label: "Scheduled", statuses: ["scheduled"], color: "#3B82F6" },
  { key: "published", label: "Published", statuses: ["published", "sponsored", "press-release"], color: "#409824" },
]

const statusColors: Record<string, string> = {
  published: "bg-green-500/20 text-green-400",
  draft: "bg-yellow-500/20 text-yellow-400",
  review: "bg-orange-500/20 text-orange-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  sponsored: "bg-purple-500/20 text-purple-400",
  "press-release": "bg-cyan-500/20 text-cyan-400",
}

export default function EditorialPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [busyId, setBusyId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    ;(async () => {
      setArticles(await getArticles())
      setLoading(false)
    })()
  }, [user])

  const promote = async (a: Article, next: ArticleStatus) => {
    setBusyId(a.id)
    try {
      await updateArticle(a.id, { status: next })
      setArticles((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: next } : x)))
    } finally {
      setBusyId(null)
    }
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  const counts = stages.map((s) => ({
    ...s,
    items: articles.filter((a) => s.statuses.includes(a.status)),
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Editorial Pipeline</h1>
          <p className="text-gray-400 mt-1">Draft → Review → Scheduled → Published</p>
        </div>
        <Link
          href="/igub-cms-x7k9/dashboard/new"
          className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition text-sm"
        >
          + New Article
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {counts.map((s) => (
          <StatCard key={s.key} title={s.label} value={s.items.length} color={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {counts.map((stage) => (
          <div key={stage.key} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
              <h2 className="font-bold text-white text-sm">{stage.label}</h2>
              <span className="ml-auto text-xs text-gray-500 bg-white/10 px-2 py-0.5 rounded-full">{stage.items.length}</span>
            </div>
            <div className="space-y-3 min-h-[120px]">
              {stage.items.map((a) => (
                <div key={a.id} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <Link
                    href={`/igub-cms-x7k9/dashboard/edit/${a.id}`}
                    className="font-medium text-white text-sm hover:text-[#E95420] block truncate"
                  >
                    {a.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {a.category} • {a.updatedAt || a.createdAt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>
                      {a.status}
                    </span>
                    {stage.key === "draft" && (
                      <button
                        disabled={busyId === a.id}
                        onClick={() => promote(a, "review")}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 disabled:opacity-50"
                      >
                        → Review
                      </button>
                    )}
                    {stage.key === "review" && (
                      <>
                        <button
                          disabled={busyId === a.id}
                          onClick={() => promote(a, "scheduled")}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 disabled:opacity-50"
                        >
                          → Schedule
                        </button>
                        <button
                          disabled={busyId === a.id}
                          onClick={() => promote(a, "published")}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 disabled:opacity-50"
                        >
                          → Publish
                        </button>
                      </>
                    )}
                    {stage.key === "scheduled" && (
                      <button
                        disabled={busyId === a.id}
                        onClick={() => promote(a, "published")}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 disabled:opacity-50"
                      >
                        → Publish now
                      </button>
                    )}
                    {stage.key === "published" && a.status === "published" && (
                      <button
                        disabled={busyId === a.id}
                        onClick={() => promote(a, "draft")}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 disabled:opacity-50"
                      >
                        → Unpublish
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {stage.items.length === 0 && (
                <p className="text-xs text-gray-600 text-center py-6">Empty</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
