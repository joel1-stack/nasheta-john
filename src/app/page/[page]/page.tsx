import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import BlogList, { NEWS_PER_PAGE } from "@/components/BlogList"
import { getAllPublicArticles, getPopularArticles } from "@/lib/serverArticles"
import { HOME_STORY_COUNT } from "@/lib/navigation"

export const revalidate = 300

interface PageProps {
  params: Promise<{ page: string }>
}

function parsePage(value: string): number | null {
  if (!/^\d+$/.test(value)) return null
  const n = parseInt(value, 10)
  return n > 0 ? n : null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params
  const n = parsePage(page) ?? 1
  return {
    title: `Latest African iGaming News, Page ${n}`,
    description: "Earlier iGamingUbuntu stories on African betting, casino, regulation and payments, newest first.",
    alternates: { canonical: `/page/${n}` },
  }
}

/**
 * Older stories: /page/2, /page/3 ... Page 1 is the homepage, which shows the
 * first HOME_STORY_COUNT stories, so page 2 starts right after them.
 */
export default async function NewsPage({ params }: PageProps) {
  const { page } = await params
  const n = parsePage(page)
  if (!n) notFound()
  if (n === 1) redirect("/")

  const [all, popular] = await Promise.all([getAllPublicArticles(), getPopularArticles(5)])
  const older = all.slice(HOME_STORY_COUNT)
  const totalPages = 1 + Math.ceil(older.length / NEWS_PER_PAGE)
  if (n > totalPages) notFound()

  const start = (n - 2) * NEWS_PER_PAGE
  const articles = older.slice(start, start + NEWS_PER_PAGE)

  return <BlogList articles={articles} popular={popular} total={all.length} page={n} totalPages={totalPages} />
}
