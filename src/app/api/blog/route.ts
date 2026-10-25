import { NextRequest, NextResponse } from "next/server"
import { queryArticles } from "@/lib/serverArticles"
import { REMOVED_DEMO_SLUG_SET } from "@/lib/site"
import type { Article } from "@/types"

/**
 * Article feed for client-side widgets.
 * It reuses the same server query layer as the pages, so removed demo posts
 * and non-public statuses can never leak back in through the API.
 */
function filterPublic(articles: Article[]): Article[] {
  return articles.filter((a) => a.slug && !REMOVED_DEMO_SLUG_SET.has(a.slug))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action") || "list"
  const category = searchParams.get("category") || ""
  const slug = searchParams.get("slug") || ""
  const search = searchParams.get("search") || ""
  const page = parseInt(searchParams.get("page") || "1", 10) || 1
  const perPage = 12

  try {
    if (action === "popular" || action === "related") {
      const source =
        action === "popular"
          ? await queryArticles({ page: 1, perPage: 20, sort: "popular" })
          : await queryArticles({ page: 1, perPage: 20, category, excludeSlug: slug })

      const articles = filterPublic(source.articles)
      if (action === "popular") {
        return NextResponse.json({ articles: articles.filter((a) => (a.views || 0) > 0).slice(0, 10) })
      }
      return NextResponse.json({ articles: articles.slice(0, 4) })
    }

    const result = await queryArticles({
      category: category || undefined,
      search: search || undefined,
      page,
      perPage,
    })

    return NextResponse.json({ ...result, articles: filterPublic(result.articles), page, perPage })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ articles: [], total: 0, hasMore: false, error: message })
  }
}
