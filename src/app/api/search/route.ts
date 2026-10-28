import { NextRequest, NextResponse } from "next/server"
import { getAllPublicArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"

export const revalidate = 300

/** Site search for the navbar: title, summary, tags and category, best matches first. */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase().slice(0, 80)
  if (q.length < 2) return NextResponse.json({ results: [] })

  const words = q.split(/\s+/).filter(Boolean)
  const articles = await getAllPublicArticles()
  const results = articles
    .map((a) => {
      const title = (a.title || "").toLowerCase()
      const rest = [a.excerpt, a.category, a.country, ...(a.tags || [])].join(" ").toLowerCase()
      if (!words.every((w) => title.includes(w) || rest.includes(w))) return null
      const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 1), title.includes(q) ? 5 : 0)
      return { a, score }
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .sort((x, y) => y.score - x.score)
    .slice(0, 8)
    .map(({ a }) => ({
      title: a.title,
      path: articlePath(a),
      category: a.category,
      date: a.createdAt,
      image: a.featuredImage || "",
    }))

  return NextResponse.json({ results }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } })
}
