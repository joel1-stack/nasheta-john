import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"

export default function NewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="iGaming News"
        description="Latest developments, regulatory updates, and industry news across African iGaming markets."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "News" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/news/industry" className="bg-[#f59e0b] text-white px-4 py-1.5 rounded-full text-sm font-medium">Industry News</Link>
        <Link href="/news/regulation" className="bg-white text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium hover:text-[#111827] hover:bg-gray-100 border border-gray-200 shadow-sm transition">Regulation Watch</Link>
      </div>

      <CategoryArticleList category="Industry News" />
    </div>
  )
}
