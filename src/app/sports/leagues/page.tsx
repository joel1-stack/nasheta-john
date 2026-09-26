import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Football League Betting Guides",
  description:
    "Betting guides for the Premier League, La Liga, NPFL, Ghana Premier League and more, with form analysis, odds previews and tips for every league.",
  alternates: { canonical: "/sports/leagues" },
}

export default function LeagueGuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="League Guides"
        description="Premier League, La Liga, EPL, NPFL, GPL and more — betting guides for every league."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Sports Betting", href: "/sports" }, { label: "League Guides" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/sports" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Sports Betting</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/sports/live" className="text-sm text-gray-500 hover:text-[#f59e0b]">Live Events</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/sports/predictions" className="text-sm text-gray-500 hover:text-[#f59e0b]">Predictions &amp; Tips</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/sports/basics" className="text-sm text-gray-500 hover:text-[#f59e0b]">Betting Explained</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />
      <CategoryArticleList category="Sports Betting" />
    </div>
  )
}
