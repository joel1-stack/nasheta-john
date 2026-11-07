import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleGrid from "@/components/ArticleGrid"
import { queryArticles } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nigeria Gambling Regulation and Betting Coverage",
  description:
    "Our coverage of Nigeria's betting and gambling regulation: who licenses operators, state and federal rules, payments and compliance.",
  alternates: { canonical: "/nigeria" },
}

export const revalidate = 300

export default async function NigeriaPage() {
  const { articles } = await queryArticles({ country: "nigeria", perPage: 8 })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Country Guides", href: "/countries" }]} current="Nigeria" path="/nigeria" />
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/full backgound.png" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <Image src="https://flagcdn.com/48x36/ng.png" alt="Nigeria" width={48} height={36} loading="lazy" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Nigeria iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Regulation, licensing and payments coverage for Nigeria.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#guides" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Nigeria Guides</Link>
        <Link href="#laws" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Nigeria Gambling Laws</Link>
        <Link href="/" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">All Articles</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div id="guides" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Nigeria iGaming Articles</h2>
        <ArticleGrid
          articles={articles}
          emptyMessage="No Nigeria articles have been published yet. Check back soon."
        />
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      <div id="laws" className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nigeria Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Gambling in Nigeria is regulated at federal and state level, and the rules differ by state. We do not summarise the law on this page.
          Our explainers cover it in detail, with sources.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Start with <Link href="/news/regulation/who-regulates-betting-in-nigeria-2026" className="text-[#409824] underline">who regulates betting in Nigeria</Link>,{" "}
          <Link href="/news/regulation/is-betting-legal-in-nigeria-2026" className="text-[#409824] underline">is betting legal in Nigeria</Link> and{" "}
          <Link href="/news/regulation/who-can-legally-power-a-sportsbook-in-nigeria-in-2026" className="text-[#409824] underline">who can legally power a sportsbook</Link>.
          Regulator websites are in the <Link href="/regulators" className="text-[#409824] underline">regulators directory</Link>.
        </p>
      </div>

      <AdSlot position="in-content-2" className="rounded-xl overflow-hidden" />
    </div>
  )
}
