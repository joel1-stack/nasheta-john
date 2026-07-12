import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function WebinarsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/sports betting analytics.png" alt="Webinars" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Webinars & Panels</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Expert discussions and panels on demand.</p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/events" className="text-sm text-ubuntu-orange hover:underline font-medium">&larr; Back to Events</Link>
        <span className="text-sm text-text-secondary mx-1">|</span>
        <Link href="/events/upcoming" className="text-sm text-text-secondary hover:text-ubuntu-orange">Upcoming Events</Link>
        <span className="text-sm text-text-secondary">|</span>
        <Link href="/events/recaps" className="text-sm text-text-secondary hover:text-ubuntu-orange">Event Recaps</Link>
      </nav>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Events" />
    </div>
  )
}
