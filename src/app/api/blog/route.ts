import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { collection, getDocs, type DocumentSnapshot } from "firebase/firestore"
import { queryArticles } from "@/lib/serverArticles"
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
    if (action === "popular" || action === "related") {
      const snap = await getDocs(collection(fb, "articles"))
      let articles = snap.docs.map(serializeDoc).filter((a) => a.status === "published")

      if (action === "popular") {
        articles.sort((a, b) => (b.views || 0) - (a.views || 0))
        return NextResponse.json({ articles: articles.slice(0, 10) })
      }

      articles = articles.filter((a) => a.category === category && a.slug !== slug)
      articles.sort((a, b) => (b.views || 0) - (a.views || 0))
      return NextResponse.json({ articles: articles.slice(0, 3) })
    }

    const result = await queryArticles({
      category: category || undefined,
      search: search || undefined,
      page,
      perPage,
    })

    return NextResponse.json({ ...result, page, perPage })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ articles: [], total: 0, hasMore: false, error: message })
  }
}
