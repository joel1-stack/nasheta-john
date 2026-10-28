import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import SectionHeader from "@/components/SectionHeader"
import ArticleGrid from "@/components/ArticleGrid"
import { getLatestArticles, queryArticles } from "@/lib/serverArticles"
import type { Article } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Betting Guides, Tips and Strategies",
  description:
    "Learn how to bet smarter with beginner-friendly betting guides, expert tips and winning strategies for African punters, covering odds, markets and more.",
  alternates: { canonical: "/guides" },
}

export const revalidate = 300

/** Categories that hold how-to material. */
const GUIDE_CATEGORIES = ["Guides", "Betting Tips", "Payments", "Sports Betting"]

export default async function GuidesPage() {
  // Prefer genuine how-to articles; if none are published yet, fall back to the
  // newest published articles instead of showing an empty page.
  let articles: Article[] = []
  for (const category of GUIDE_CATEGORIES) {
    const result = await queryArticles({ category, perPage: 9 })
    articles = result.articles
    if (articles.length > 0) break
  }

  const usingFallback = articles.length === 0
  if (usingFallback) {
    articles = await getLatestArticles(9)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16">
      <SectionHeader
        title="Betting Guides & Tips"
        description="Learn how to bet smarter. Beginner-friendly guides, expert tips, and winning strategies for African punters."
        crumbs={[{ label: "Home", href: "/" }, { label: "All News", href: "/blog" }, { label: "Guides" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      {usingFallback && (
        <p className="text-sm text-gray-500 mb-6">
          Latest guides and explainers from the editorial desk.
        </p>
      )}

      <ArticleGrid
        articles={articles}
        columns={3}
        emptyMessage="No betting guides have been published yet. New how-to guides are added every week."
      />

      <div className="mt-8 text-center">
        <Link href="/blog" className="text-sm font-medium text-[#f59e0b] hover:underline">
          Browse every article →
        </Link>
      </div>

      <AdSlot position="in-content-1" className="mt-12 rounded-xl overflow-hidden" />
    </div>
  )
}
