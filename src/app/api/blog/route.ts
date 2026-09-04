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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action") || "popular"
  const category = searchParams.get("category") || ""
  const slug = searchParams.get("slug") || ""

  const fb = getDb()
  if (!fb) return NextResponse.json({ articles: [] })

  try {
    if (action === "popular") {
      // Get top articles by views
      const q = query(
        collection(fb, "articles"),
        where("status", "==", "published"),
        orderBy("views", "desc"),
        fbLimit(10)
      )
      const snap = await getDocs(q)
      const articles = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          ...data,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
          updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
        }
      })
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
        .map((d) => {
          const data = d.data()
          return {
            id: d.id,
            ...data,
            tags: data.tags || [],
            createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
            updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
          }
        })
        .filter((a: any) => a.slug !== slug)
        .slice(0, 3)
      return NextResponse.json({ articles })
    }

    return NextResponse.json({ articles: [] })
  } catch {
    return NextResponse.json({ articles: [] })
  }
}
