import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "iGaming Event Recaps and Takeaways",
  description:
    "Read highlights and key takeaways from past iGaming industry events, conferences and webinars. Catch up on what was said without attending in person.",
  alternates: { canonical: "/events/recaps" },
}



export default function EventRecapsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Event Recaps"
        description="Highlights and key takeaways from past industry events."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Events", href: "/events" }, { label: "Event Recaps" }]}
      />

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/events" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Events</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/events/upcoming" className="text-sm text-gray-500 hover:text-[#f59e0b]">Upcoming Events</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/events/webinars" className="text-sm text-gray-500 hover:text-[#f59e0b]">Webinars &amp; Panels</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Events" />
    </div>
  )
}
