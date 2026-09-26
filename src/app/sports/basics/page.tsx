import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Betting Basics: Odds, Markets Explained",
  description:
    "Beginner-friendly guides to betting fundamentals, explaining odds, markets and strategies so new punters can bet with confidence from the very start.",
  alternates: { canonical: "/sports/basics" },
}

export default function BettingExplainedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Betting Explained"
        description="Beginner-friendly guides to betting fundamentals, odds, markets, and strategies."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Sports Betting", href: "/sports" }, { label: "Betting Explained" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/sports" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Sports Betting</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/sports/live" className="text-sm text-gray-500 hover:text-[#f59e0b]">Live Events</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/sports/predictions" className="text-sm text-gray-500 hover:text-[#f59e0b]">Predictions &amp; Tips</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/sports/leagues" className="text-sm text-gray-500 hover:text-[#f59e0b]">League Guides</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />
      <CategoryArticleList category="Sports Betting" />
    </div>
  )
}
