import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function NewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=80" alt="iGaming News" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">iGaming News</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Latest developments, regulatory updates, and industry news across African iGaming markets.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/news/industry" className="bg-ubuntu-orange text-white px-4 py-1.5 rounded-full text-sm font-medium">Industry News</Link>
        <Link href="/news/regulation" className="bg-card text-text-secondary px-4 py-1.5 rounded-full text-sm font-medium hover:text-ubuntu-orange transition">Regulation Watch</Link>
      </div>

      <CategoryArticleList category="Industry News" />
    </div>
  )
}
