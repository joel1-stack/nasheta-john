import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import type { Article } from "@/types"

const guides: Article[] = [
  { id: "g1", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites", excerpt: "Complete betting guide for the 2026 FIFA World Cup. Team analysis, predictions, and where to bet.", category: "Guides", country: "", featuredImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
  { id: "g2", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators", excerpt: "Complete list of betting sites that accept M-Pesa. Fast deposits and withdrawals.", category: "Guides", country: "", featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", tags: [], readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03" },
  { id: "g3", slug: "1xbet-registration-guide-kenya", title: "1xBet Registration Guide Kenya: Step by Step", excerpt: "How to register at 1xBet in Kenya. Complete walkthrough with screenshots.", category: "Guides", country: "", featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1876, content: "", createdAt: "2026-07-01", updatedAt: "2026-07-01" },
  { id: "g4", slug: "how-to-bet-on-football", title: "How to Bet on Football: Beginner's Guide 2026", excerpt: "Learn the basics of football betting. Understand odds, markets, and strategies.", category: "Guides", country: "", featuredImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 2134, content: "", createdAt: "2026-06-28", updatedAt: "2026-06-28" },
  { id: "g5", slug: "understanding-betting-odds", title: "Understanding Betting Odds: Decimal, Fractional & American", excerpt: "Learn how to read, compare, and calculate betting odds across all formats.", category: "Guides", country: "", featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 1987, content: "", createdAt: "2026-06-25", updatedAt: "2026-06-25" },
]

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80" alt="Betting guides" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Betting Guides & Tips</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Learn how to bet smarter. Beginner-friendly guides, expert tips, and winning strategies for African punters.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <Link key={g.slug} href={`/blog/${g.slug}`} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={g.featuredImage} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                <span className="bg-card px-2 py-0.5 rounded font-medium text-ubuntu-orange">Guide</span>
                <span>{g.readTime} min read</span>
                <span>· {g.views.toLocaleString()} views</span>
              </div>
              <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition mb-1">{g.title}</h3>
              <p className="text-sm text-text-secondary">{g.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <AdSlot position="in-content-1" className="mt-12 rounded-xl overflow-hidden" />
    </div>
  )
}
