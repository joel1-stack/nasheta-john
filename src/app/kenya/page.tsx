import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import ArticleGrid from "@/components/ArticleGrid"
import { queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kenya Betting Guide: Sites, Bonuses and M-Pesa",
  description:
    "Everything you need to bet legally and safely in Kenya. Compare top betting sites, welcome bonuses and M-Pesa deposits with expert local guidance.",
  alternates: { canonical: "/kenya" },
}

export const revalidate = 300

export default async function KenyaPage() {
  const { articles } = await queryArticles({ country: "kenya", perPage: 8 })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/full backgound.png" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <Image src="https://flagcdn.com/48x36/ke.png" alt="Kenya" width={48} height={36} loading="lazy" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Kenya iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Everything you need to bet legally and safely in Kenya.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#guides" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Kenya Guides</Link>
        <Link href="#laws" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Kenya Gambling Laws</Link>
        <Link href="/casinos/payments"className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">M-Pesa Guides</Link>
        <Link href="/" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">All Articles</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div id="guides" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Kenya iGaming Articles</h2>
        <ArticleGrid
          articles={articles}
          emptyMessage="No Kenya articles have been published yet. New market guides and operator reviews are added every week."
        />
      </div>

      <AdSlot position="in-content-1" className="mb-12" />

      <div id="laws" className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Kenya Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Kenya&apos;s betting industry is regulated by the Betting, Lotteries and Gaming Act, enforced by the Betting Control and Licensing Board (BCLB).
          All operators must hold a valid license from the BCLB. The legal betting age in Kenya is 18. Online betting is legal and regulated.
        </p>
        <p className="text-text-secondary leading-relaxed">
          In 2026, new tax regulations require operators to deduct 20% withholding tax on winnings above KES 5,000.
          Always verify that a betting site holds a valid BCLB license before depositing.
        </p>
      </div>
    </div>
  )
}
