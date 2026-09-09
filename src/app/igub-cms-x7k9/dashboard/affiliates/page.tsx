"use client"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getAuthInstance } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getDocs, collection, query, orderBy } from "firebase/firestore"
import { getDb } from "@/lib/firebase"

interface AffiliateStats {
  id: string
  articleId: string
  operatorName: string
  url: string
  bonusText: string
  clicks: number
}

interface ArticleTitle {
  id: string
  title: string
}

export default function AffiliateStatsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AffiliateStats[]>([])
  const [articleTitles, setArticleTitles] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) { router.push("/igub-cms-x7k9") } else { setUser(u) }
      setLoading(false)
    })
    return () => unsub()
  }, [router])

  useEffect(() => {
    if (!user) return
    const fetchStats = async () => {
      const fb = getDb()
      if (!fb) return
      const snap = await getDocs(query(collection(fb, "affiliateLinks"), orderBy("clicks", "desc")))
      const links = snap.docs.map((d) => ({ id: d.id, ...d.data() } as AffiliateStats))
      setStats(links)

      const articleIds = [...new Set(links.map((l) => l.articleId).filter(Boolean))]
      if (articleIds.length > 0) {
        const articleSnap = await getDocs(collection(fb, "articles"))
        const titles: Record<string, string> = {}
        articleSnap.docs.forEach((d) => {
          if (articleIds.includes(d.id)) {
            titles[d.id] = d.data().title || "Untitled"
          }
        })
        setArticleTitles(titles)
      }
    }
    fetchStats()
  }, [user])

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  const totalClicks = stats.reduce((sum, s) => sum + (s.clicks || 0), 0)
  const topOperators = stats.slice(0, 10)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Affiliate Performance</h1>
        <Link href="/igub-cms-x7k9/dashboard" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Dashboard</Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 text-center">
          <p className="text-3xl font-bold text-white">{totalClicks.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Total Clicks</p>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 text-center">
          <p className="text-3xl font-bold text-white">{stats.length}</p>
          <p className="text-xs text-gray-400 mt-1">Active Links</p>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 text-center">
          <p className="text-3xl font-bold text-white">{stats.length > 0 ? Math.round(totalClicks / stats.length) : 0}</p>
          <p className="text-xs text-gray-400 mt-1">Avg Clicks/Link</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-bold text-white">Top Affiliate Links</h2>
        </div>
        {topOperators.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No affiliate links found.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {topOperators.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition">
                <div>
                  <p className="font-medium text-white text-sm">{s.operatorName}</p>
                  {s.articleId && articleTitles[s.articleId] && (
                    <p className="text-xs text-gray-500 mt-0.5">in: {articleTitles[s.articleId]}</p>
                  )}
                  <p className="text-xs text-gray-400 truncate max-w-xs">{s.bonusText || s.url}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#f59e0b]">{(s.clicks || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">clicks</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
