import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import ArticleGrid from "@/components/ArticleGrid"
import { queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nigeria Betting Guide: Sites, Bonuses and Tips",
  description:
    "Your complete guide to betting in Nigeria. Compare the best betting sites, welcome bonuses, Naira payments and expert tips for Nigerian players.",
  alternates: { canonical: "/nigeria" },
}

export const revalidate = 300

export default async function NigeriaPage() {
  const { articles } = await queryArticles({ country: "nigeria", perPage: 8 })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/full backgound.png" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <Image src="https://flagcdn.com/48x36/ng.png" alt="Nigeria" width={48} height={36} loading="lazy" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Nigeria iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in Nigeria. Best sites, bonuses, odds, and local tips for Naija punters.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#guides" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Nigeria Guides</Link>
        <Link href="#laws" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Nigeria Gambling Laws</Link>
        <Link href="/blog" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">All Articles</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div id="guides" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Nigeria iGaming Articles</h2>
        <ArticleGrid
          articles={articles}
          emptyMessage="No Nigeria articles have been published yet. New market guides and operator reviews are added every week."
        />
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      <div id="laws" className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nigeria Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Nigeria&apos;s gambling industry is regulated by the National Lottery Regulatory Commission (NLRC) and state-level bodies such as the Lagos State Lotteries and Gaming Authority.
          The legal betting age is 18. Online sports betting is legal and widely popular, with Lagos and Abuja being the largest markets.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Popular payment methods include bank transfers, cards, and mobile money. Always verify that a betting site holds a valid Nigerian license before depositing.
        </p>
      </div>

      <AdSlot position="in-content-2" className="rounded-xl overflow-hidden" />
    </div>
  )
}
