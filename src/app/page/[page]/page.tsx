import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import BlogList, { NEWS_PER_PAGE } from "@/components/BlogList"
import { getPopularArticles, queryArticles } from "@/lib/serverArticles"

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

/** Older front-page stories: /page/2, /page/3 ... (page 1 is the homepage). */
export default async function NewsPage({ params }: PageProps) {
  const { page } = await params
  const n = parsePage(page)
  if (!n) notFound()
  if (n === 1) redirect("/")

  const [{ articles, total, totalPages }, popular] = await Promise.all([
    queryArticles({ page: n, perPage: NEWS_PER_PAGE }),
    getPopularArticles(5),
  ])
  if (n > totalPages) notFound()

  return <BlogList articles={articles} popular={popular} total={total} page={n} totalPages={totalPages} />
}
