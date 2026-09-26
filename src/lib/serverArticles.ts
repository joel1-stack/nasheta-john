import { getDb } from "@/lib/firebase"
import { collection, getDocs, type DocumentSnapshot } from "firebase/firestore"
import type { Article } from "@/types"

function serializeDoc(d: DocumentSnapshot): Article {
  const data = d.data() || {}
  return {
    id: d.id,
    ...data,
    tags: data.tags || [],
    createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
  } as Article
}

export interface QueryOptions {
  category?: string
  search?: string
  page?: number
  perPage?: number
}

export interface QueryResult {
  articles: Article[]
  total: number
  hasMore: boolean
}

export async function queryArticles(opts: QueryOptions = {}): Promise<QueryResult> {
  const { category, search, page = 1, perPage = 12 } = opts
  const fb = getDb()
  if (!fb) return { articles: [], total: 0, hasMore: false }

  try {
    const snap = await getDocs(collection(fb, "articles"))
    let articles = snap.docs.map(serializeDoc).filter((a) => a.status === "published")

    if (category) {
      articles = articles.filter((a) => a.category === category)
    }
    if (search) {
      const s = search.toLowerCase()
      articles = articles.filter(
        (a) =>
          a.title?.toLowerCase().includes(s) ||
          a.excerpt?.toLowerCase().includes(s) ||
          a.tags?.some((t) => t.toLowerCase().includes(s))
      )
    }

    articles.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))

    const total = articles.length
    const start = (page - 1) * perPage
    const paged = articles.slice(start, start + perPage)
    const hasMore = start + perPage < total

    return { articles: paged, total, hasMore }
  } catch (err) {
    console.error("queryArticles failed:", err)
    return { articles: [], total: 0, hasMore: false }
  }
}
