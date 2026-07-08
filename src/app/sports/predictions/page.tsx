import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function PredictionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80" alt="Predictions" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Predictions & Tips</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Expert match predictions and betting tips across African and international leagues.</p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/sports" className="text-sm text-ubuntu-orange hover:underline font-medium">&larr; Back to Sports Betting</Link>
        <span className="text-sm text-text-secondary mx-1">|</span>
        <Link href="/sports/live" className="text-sm text-text-secondary hover:text-ubuntu-orange">Live Events</Link>
        <span className="text-sm text-text-secondary">|</span>
        <Link href="/sports/leagues" className="text-sm text-text-secondary hover:text-ubuntu-orange">League Guides</Link>
        <span className="text-sm text-text-secondary">|</span>
        <Link href="/sports/basics" className="text-sm text-text-secondary hover:text-ubuntu-orange">Betting Explained</Link>
      </nav>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <CategoryArticleList category="Sports Betting" />
    </div>
  )
}
