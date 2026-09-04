import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as fbLimit,
} from "firebase/firestore"

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
  if (!fb) return NextResponse.json({ articles: [], total: 0, hasMore: false })

  try {
    if (action === "popular") {
      const q = query(
        collection(fb, "articles"),
        where("status", "==", "published"),
        orderBy("views", "desc"),
        fbLimit(10)
      )
      const snap = await getDocs(q)
      const articles = snap.docs.map(serializeDoc)
      return NextResponse.json({ articles })
    }

    if (action === "related" && category) {
      const q = query(
        collection(fb, "articles"),
        where("status", "==", "published"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        fbLimit(10)
      )
      const snap = await getDocs(q)
      const articles = snap.docs
        .map(serializeDoc)
        .filter((a: any) => a.slug !== slug)
        .slice(0, 3)
      return NextResponse.json({ articles })
    }

    const allQ = query(
      collection(fb, "articles"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc")
    )
    const snap = await getDocs(allQ)
    let articles = snap.docs.map(serializeDoc)

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

    const total = articles.length
    const start = (page - 1) * perPage
    const paged = articles.slice(start, start + perPage)
    const hasMore = start + perPage < total

    return NextResponse.json({ articles: paged, total, hasMore, page, perPage })
  } catch (err: any) {
    return NextResponse.json({ articles: [], total: 0, hasMore: false, error: err.message })
  }
}
