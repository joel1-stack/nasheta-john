import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import type { Article } from "@/types"

const guides: Article[] = [
  { id: "g1", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites", excerpt: "Complete betting guide for the 2026 FIFA World Cup.", category: "Guides", country: "", featuredImage: "", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
  { id: "g2", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators", excerpt: "List of betting sites that accept M-Pesa.", category: "Guides", country: "", featuredImage: "", tags: [], readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03" },
  { id: "g3", slug: "1xbet-registration-guide-kenya", title: "1xBet Registration Guide Kenya", excerpt: "How to register at 1xBet.", category: "Guides", country: "", featuredImage: "", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1876, content: "", createdAt: "2026-07-01", updatedAt: "2026-07-01" },
  { id: "g4", slug: "how-to-bet-on-football", title: "How to Bet on Football: Beginner's Guide", excerpt: "Learn the basics of football betting.", category: "Guides", country: "", featuredImage: "", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 2134, content: "", createdAt: "2026-06-28", updatedAt: "2026-06-28" },
  { id: "g5", slug: "understanding-betting-odds", title: "Understanding Betting Odds: Decimal, Fractional & American", excerpt: "Learn how to read and compare betting odds.", category: "Guides", country: "", featuredImage: "", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 1987, content: "", createdAt: "2026-06-25", updatedAt: "2026-06-25" },
]

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Betting Guides & Tips</h1>
      <p className="text-text-secondary mb-8">Learn how to bet smarter. Beginner-friendly guides, tips, and strategies.</p>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <Link key={g.slug} href={`/blog/${g.slug}`} className="group bg-white border border-border rounded-xl p-6 hover:shadow-md transition">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
              <span className="bg-card px-2 py-0.5 rounded">{g.category}</span>
              <span>{g.readTime} min read</span>
            </div>
            <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition mb-2">{g.title}</h3>
            <p className="text-sm text-text-secondary">{g.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
