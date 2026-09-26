import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "iGaming Webinars and Expert Panels",
  description:
    "Watch expert discussions and panels on demand. Our webinar library covers regulation, affiliate strategy, payments and market trends across iGaming.",
  alternates: { canonical: "/events/webinars" },
}

export default function WebinarsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Webinars & Panels"
        description="Expert discussions and panels on demand."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Events", href: "/events" }, { label: "Webinars & Panels" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/events" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Events</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/events/upcoming" className="text-sm text-gray-500 hover:text-[#f59e0b]">Upcoming Events</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/events/recaps" className="text-sm text-gray-500 hover:text-[#f59e0b]">Event Recaps</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />
      <CategoryArticleList category="Events" />
    </div>
  )
}
