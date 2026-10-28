import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import ArticleGrid from "@/components/ArticleGrid"
import { queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "South Africa Betting Guide: Sites and Bonuses",
  description:
    "Your complete guide to betting in South Africa. Compare the best betting sites, welcome bonuses, rand payments and expert local tips for players.",
  alternates: { canonical: "/south-africa" },
}

export const revalidate = 300

export default async function SouthAfricaPage() {
  const { articles } = await queryArticles({ country: "south-africa", perPage: 8 })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-purple">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/full backgound.png" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <Image src="https://flagcdn.com/48x36/za.png" alt="South Africa" width={48} height={36} loading="lazy" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">South Africa iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in South Africa. Best sites, bonuses, and local regulations for SA punters.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#guides" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">SA Guides</Link>
        <Link href="#laws" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">SA Gambling Laws</Link>
        <Link href="/" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">All Articles</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div id="guides" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Latest South Africa iGaming Articles</h2>
        <ArticleGrid
          articles={articles}
          emptyMessage="No South Africa articles have been published yet. New market guides and operator reviews are added every week."
        />
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      <div id="laws" className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">SA Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          South Africa&apos;s gambling is regulated by the National Gambling Board (NGB) and provincial authorities.
          Online sports betting is legal and licensed. Online casinos operate in a grey area — only licensed land-based casinos may offer online casino games.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The legal betting age is 18. Popular payment methods include EFT, Visa, Mastercard, and Ozow. Always check for a valid provincial license before depositing.
        </p>
      </div>
    </div>
  )
}
