import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

function serializeDoc(d: any) {
  const data = d.data()
  return {
    id: d.id,
    ...data,
    tags: data.tags || [],
    createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action") || "list"
  const category = searchParams.get("category") || ""
  const slug = searchParams.get("slug") || ""
  const search = searchParams.get("search") || ""
  const page = parseInt(searchParams.get("page") || "1", 10)
  const perPage = 12

  const fb = getDb()
  if (!fb) {
    return NextResponse.json({ articles: [], total: 0, hasMore: false, error: "No Firebase" })
  }

  try {
    const snap = await getDocs(collection(fb, "articles"))
    let articles = snap.docs.map(serializeDoc).filter((a: any) => a.status === "published")

    if (action === "popular") {
      articles.sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
      return NextResponse.json({ articles: articles.slice(0, 10) })
    }

    if (action === "related" && category) {
      articles = articles.filter((a: any) => a.category === category && a.slug !== slug)
      articles.sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
      return NextResponse.json({ articles: articles.slice(0, 3) })
    }

    if (category) {
      articles = articles.filter((a: any) => a.category === category)
    }
    if (search) {
      const s = search.toLowerCase()
      articles = articles.filter(
        (a: any) =>
          a.title?.toLowerCase().includes(s) ||
          a.excerpt?.toLowerCase().includes(s) ||
          a.tags?.some((t: string) => t.toLowerCase().includes(s))
      )
    }

    articles.sort((a: any, b: any) => {
      const da = a.createdAt || ""
      const db = b.createdAt || ""
      return db.localeCompare(da)
    })

    const total = articles.length
    const start = (page - 1) * perPage
    const paged = articles.slice(start, start + perPage)
    const hasMore = start + perPage < total

    return NextResponse.json({ articles: paged, total, hasMore, page, perPage })
  } catch (err: any) {
    return NextResponse.json({ articles: [], total: 0, hasMore: false, error: err.message })
  }
}
