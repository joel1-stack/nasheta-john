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
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        path="/guides"
      />

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      {usingFallback && (
        <p className="text-sm text-gray-500 mb-6">
          Latest guides and explainers from the editorial desk.
        </p>
      )}

      <p className="max-w-3xl text-gray-600 mb-8">
        Our guides explain how betting and casino rules work in African markets: who regulates, what a licence involves,
        how tax and payments are handled, and where newer products such as prediction markets stand. Looking up a regulator?
        Use the <Link href="/regulators" className="text-[#409824] hover:underline">regulators directory</Link>. Following a theme?
        See <Link href="/topics/prediction-markets" className="text-[#409824] hover:underline">prediction markets</Link>,{" "}
        <Link href="/topics/national-lotteries" className="text-[#409824] hover:underline">national lotteries</Link> or{" "}
        <Link href="/topics/uganda" className="text-[#409824] hover:underline">Uganda</Link>. Country rules are in our{" "}
        <Link href="/kenya" className="text-[#409824] hover:underline">Kenya</Link>,{" "}
        <Link href="/nigeria" className="text-[#409824] hover:underline">Nigeria</Link> and{" "}
        <Link href="/south-africa" className="text-[#409824] hover:underline">South Africa</Link> hubs.
      </p>

      <ArticleGrid
        articles={articles}
        columns={3}
        emptyMessage="No betting guides have been published yet. New how-to guides are added every week."
      />

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm font-medium text-[#f59e0b] hover:underline">
          Browse every article →
        </Link>
      </div>

      <AdSlot position="in-content-1" className="mt-12 rounded-xl overflow-hidden" />
    </div>
  )
}
