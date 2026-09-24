import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"

export default function IndustryNewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Industry News"
        description="Latest industry developments and market analysis across Africa."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "News", href: "/news" }, { label: "Industry News" }]}
      />

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/news" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to News</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/news/regulation" className="text-sm text-gray-500 hover:text-[#f59e0b]">Regulation Watch</Link>
      </nav>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Industry News" />
    </div>
  )
}
