import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function SportsBettingPage() {
  const subs = [
    { title: "Live Events", href: "/sports/live", desc: "Real-time odds, in-play betting and match coverage" },
    { title: "Predictions & Tips", href: "/sports/predictions", desc: "Expert match predictions and betting tips" },
    { title: "League Guides", href: "/sports/leagues", desc: "Premier League, La Liga, EPL and more" },
    { title: "Betting Explained", href: "/sports/basics", desc: "Beginner-friendly guides to betting fundamentals" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80" alt="Sports Betting" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Sports Betting</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Sports betting guides, tips, and market coverage.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {subs.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-border rounded-xl p-4 hover:shadow-md hover:border-ubuntu-orange/30 transition-all group">
            <h3 className="font-semibold text-text-primary group-hover:text-ubuntu-orange transition">{s.title}</h3>
            <p className="text-sm text-text-secondary mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Articles</h2>
      <CategoryArticleList category="Sports Betting" />
    </div>
  )
}
