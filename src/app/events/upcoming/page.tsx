import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upcoming iGaming Conferences and Meetups",
  description:
    "Plan ahead with our calendar of upcoming iGaming conferences, summits and industry meetups across Africa, with dates, venues and registration details.",
  alternates: { canonical: "/events/upcoming" },
}



export default function UpcomingEventsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Upcoming Events"
        description="Conferences, summits and industry meetups across Africa."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Events", href: "/events" }, { label: "Upcoming Events" }]}
      />

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/events" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Events</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/events/recaps" className="text-sm text-gray-500 hover:text-[#f59e0b]">Event Recaps</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/events/webinars" className="text-sm text-gray-500 hover:text-[#f59e0b]">Webinars &amp; Panels</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Events" />
    </div>
  )
}
