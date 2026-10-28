import BlogList, { newsCategories } from "@/components/BlogList"
import { getAllPublicArticles, getPopularArticles, queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export const revalidate = 300

const PER_PAGE = 12

/** The front page is the news itself, newest first (like a newspaper). */
export default async function HomePage() {
  const [{ articles, total, totalPages }, all, popular] = await Promise.all([
    queryArticles({ page: 1, perPage: PER_PAGE }),
    getAllPublicArticles(),
    getPopularArticles(5),
  ])

  return (
    <BlogList
      frontPage
      articles={articles}
      popular={popular}
      total={total}
      page={1}
      totalPages={totalPages}
      category="All"
      search=""
      categories={newsCategories(all)}
    />
  )
}
