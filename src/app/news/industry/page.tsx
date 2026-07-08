import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function IndustryNewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=80" alt="Industry News" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Industry News</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Latest industry developments and market analysis across Africa.</p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/news" className="text-sm text-ubuntu-orange hover:underline font-medium">&larr; Back to News</Link>
        <span className="text-sm text-text-secondary mx-1">|</span>
        <Link href="/news/regulation" className="text-sm text-text-secondary hover:text-ubuntu-orange">Regulation Watch</Link>
      </nav>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Industry News" />
    </div>
  )
}
