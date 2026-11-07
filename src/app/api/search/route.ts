import { NextRequest, NextResponse } from "next/server"
import { searchArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"

export const revalidate = 300

/** Site search for the navbar: title, summary, tags and category, best matches first. */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || ""
  const hits = await searchArticles(q, 8)
  const results = hits.map(({ article: a }) => ({
    title: a.title,
    path: articlePath(a),
    category: a.category,
    date: a.createdAt,
    image: a.featuredImage || "",
  }))
  return NextResponse.json({ results }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } })
}
