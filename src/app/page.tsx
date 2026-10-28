import BlogList, { NEWS_PER_PAGE } from "@/components/BlogList"
import { getPopularArticles, queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export const revalidate = 300

/** The front page is the news itself, newest first (like a newspaper). */
export default async function HomePage() {
  const [{ articles, total, totalPages }, popular] = await Promise.all([
    queryArticles({ page: 1, perPage: NEWS_PER_PAGE }),
    getPopularArticles(5),
  ])

  return <BlogList articles={articles} popular={popular} total={total} page={1} totalPages={totalPages} />
}
