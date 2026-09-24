import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"

export default function BestCasinosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Best Casinos"
        description="Top-rated online casinos reviewed by our expert team."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Casinos", href: "/casinos" }, { label: "Best Casinos" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Casino Directory</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/casinos/new" className="text-sm text-gray-500 hover:text-[#f59e0b]">New Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/mobile" className="text-sm text-gray-500 hover:text-[#f59e0b]">Mobile Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/payments" className="text-sm text-gray-500 hover:text-[#f59e0b]">Payment Methods</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
