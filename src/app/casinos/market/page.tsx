import Link from "next/link"
import Image from "next/image"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online Casinos by Country and Market",
  description:
    "Filter online casinos by your country: Kenya, Nigeria, South Africa, Ghana, Tanzania and global markets. Find licensed operators that accept local payments.",
  alternates: { canonical: "/casinos/market" },
}

export default function ByMarketPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Casinos by Market"
        description="Filter online casinos by your country — Kenya, Nigeria, South Africa, Ghana, and more."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Casinos", href: "/casinos" }, { label: "By Market" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Casino Directory</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/casinos/new" className="text-sm text-gray-500 hover:text-[#f59e0b]">New Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/best" className="text-sm text-gray-500 hover:text-[#f59e0b]">Best Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/mobile" className="text-sm text-gray-500 hover:text-[#f59e0b]">Mobile Casinos</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {[
          { name: "Kenya", slug: "kenya", flag: "ke" },
          { name: "Nigeria", slug: "nigeria", flag: "ng" },
          { name: "South Africa", slug: "south-africa", flag: "za" },
          { name: "Ghana", slug: "ghana", flag: "gh" },
          { name: "Tanzania", slug: "tanzania", flag: "tz" },
        ].map((market) => (
          <Link
            key={market.slug}
            href={`/casinos?country=${market.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md hover:border-[#f59e0b]/30 transition-all group"
          >
            <Image src={`https://flagcdn.com/48x36/${market.flag}.png`} alt={market.name} width={48} height={36} loading="lazy" className="w-10 h-7.5 mx-auto mb-2 rounded object-cover" />
            <p className="text-sm font-medium text-[#111827] group-hover:text-[#f59e0b] transition">{market.name}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">Latest Casino Reviews</h2>
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
