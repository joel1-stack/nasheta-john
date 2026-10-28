import type { Metadata } from "next"
import { redirect } from "next/navigation"
import BlogList, { newsCategories } from "@/components/BlogList"
import { getAllPublicArticles, getPopularArticles, queryArticles } from "@/lib/serverArticles"

export const dynamic = "force-dynamic"

const PER_PAGE = 12

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}

function parsePage(value?: string): number {
  const parsed = parseInt(value || "1", 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const page = parsePage(sp.page)
  const category = sp.category?.trim() || "All"
  const search = sp.search?.trim() || ""

  // Each paginated/filtered page canonicalises to itself (never to /blog).
  const params = new URLSearchParams()
  if (page > 1) params.set("page", String(page))
  if (category !== "All") params.set("category", category)
  if (search) params.set("search", search)
  const qs = params.toString()
  // Unfiltered page 1 is the same list as the front page.
  const canonical = qs ? `/blog?${qs}` : "/"

  const title =
    page > 1
      ? `All African iGaming News and Analysis – Page ${page}`
      : category !== "All"
        ? `${category} – African iGaming News`
        : "All African iGaming News and Analysis"
  const description =
    "Every iGamingUbuntu story on African betting, casino, regulation and payments, newest first, with filters by topic."

  return {
    title,
    description,
    alternates: { canonical },
    // Internal search result pages should not be indexed as thin content.
    robots: search ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.igamingubuntu.com${canonical}`,
    },
  }
}

export default async function BlogPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const page = parsePage(sp.page)
  const category = sp.category?.trim() || "All"
  const search = sp.search?.trim() || ""

  const { articles, total, totalPages } = await queryArticles({
    page,
    perPage: PER_PAGE,
    category: category === "All" ? undefined : category,
    search: search || undefined,
  })

  // A page past the end of an unfiltered list should not exist.
  if (!search && category === "All" && page > totalPages) {
    redirect(totalPages > 1 ? `/blog?page=${totalPages}` : "/blog")
  }

  const [all, popular] = await Promise.all([getAllPublicArticles(), getPopularArticles(5)])

  return (
    <BlogList
      articles={articles}
      popular={popular}
      total={total}
      page={page}
      totalPages={totalPages}
      category={category}
      search={search}
      categories={newsCategories(all)}
    />
  )
}
