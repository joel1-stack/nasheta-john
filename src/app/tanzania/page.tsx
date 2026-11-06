import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import ArticleGrid from "@/components/ArticleGrid"
import { queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tanzania Gambling Regulation and Betting Coverage",
  description:
    "Our coverage of Tanzania's gambling regulation: the Gaming Board of Tanzania, gaming tax, machine revenue and mobile-money payments.",
  alternates: { canonical: "/tanzania" },
}

export const revalidate = 300

export default async function TanzaniaPage() {
  const { articles } = await queryArticles({ country: "tanzania", perPage: 8 })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/full backgound.png" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <Image src="https://flagcdn.com/48x36/tz.png" alt="Tanzania" width={48} height={36} loading="lazy" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Tanzania iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Regulation, tax and licensing coverage for Tanzania.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#guides" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Tanzania Guides</Link>
        <Link href="#laws" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Tanzania Gambling Laws</Link>
        <Link href="/" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">All Articles</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div id="guides" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Tanzania iGaming Articles</h2>
        <ArticleGrid
          articles={articles}
          emptyMessage="No Tanzania articles have been published yet. Check back soon."
        />
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      <div id="laws" className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Tanzania Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Tanzania&apos;s gambling sector is overseen by the Gaming Board of Tanzania. We do not summarise the law on this page. Our explainers cover tax, revenue and enforcement, with sources.
        </p>
        <p className="text-text-secondary leading-relaxed">
          See <Link href="/news/industry/tanzania-drops-its-5-stake-tax-what-remains-for-casino-operators" className="text-[#409824] underline">the 5% stake duty change</Link>,{" "}
          <Link href="/news/regulation/tanzania-gaming-tax-revenue-2025-26" className="text-[#409824] underline">gaming tax revenue 2025-26</Link> and{" "}
          <Link href="/news/regulation/tanzania-gaming-machine-revenue-sharing-councils" className="text-[#409824] underline">gaming machine revenue sharing</Link>.
          The regulator is in the <Link href="/regulators" className="text-[#409824] underline">regulators directory</Link>.
        </p>
      </div>
    </div>
  )
}
