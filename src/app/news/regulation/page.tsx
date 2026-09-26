import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "iGaming Regulation and Compliance News",
  description:
    "Stay current on regulatory changes and compliance updates across African gambling markets, including licensing, taxation and player protection rules.",
  alternates: { canonical: "/news/regulation" },
}



export default function RegulationWatchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Regulation Watch"
        description="Regulatory changes and compliance updates across African markets."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "News", href: "/news" }, { label: "Regulation Watch" }]}
      />

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/news" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to News</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/news/industry" className="text-sm text-gray-500 hover:text-[#f59e0b]">Industry News</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Industry News" />
    </div>
  )
}
