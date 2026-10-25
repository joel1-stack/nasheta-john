import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import ArticleGrid from "@/components/ArticleGrid"
import { queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ghana Betting Guide: Sites, Bonuses and MoMo",
  description:
    "Your complete guide to betting in Ghana. Compare the best betting sites, claim bonuses, and learn how to deposit and withdraw with MTN Mobile Money.",
  alternates: { canonical: "/ghana" },
}

export const revalidate = 300

export default async function GhanaPage() {
  const { articles } = await queryArticles({ country: "ghana", perPage: 8 })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-gold/80 to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/full backgound.png" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <Image src="https://flagcdn.com/48x36/gh.png" alt="Ghana" width={48} height={36} loading="lazy" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Ghana iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in Ghana. Best sites, bonuses, and MTN MoMo betting tips.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#guides" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Ghana Guides</Link>
        <Link href="#laws" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Ghana Gambling Laws</Link>
        <Link href="/blog" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">All Articles</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div id="guides" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Ghana iGaming Articles</h2>
        <ArticleGrid
          articles={articles}
          emptyMessage="No Ghana articles have been published yet. New market guides and operator reviews are added every week."
        />
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      <div id="laws" className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Ghana Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Ghana&apos;s gambling is regulated by the Gaming Commission of Ghana. Sports betting and lottery are legal and licensed.
          Mobile money (MTN MoMo, Vodafone Cash) is widely accepted for deposits and withdrawals.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The legal betting age in Ghana is 18. Always verify that a betting site holds a valid Ghana Gaming Commission license before playing.
        </p>
      </div>
    </div>
  )
}
