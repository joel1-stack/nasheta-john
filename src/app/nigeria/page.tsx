import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article } from "@/types"

const topSites = [
  { operatorName: "Betway Nigeria", bonusText: "Up to $50 in Free Bets — Trusted Global Brand", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "1xBet Nigeria", bonusText: "100% Bonus + $100 Free Bet + Naija Support", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "22Bet Nigeria", bonusText: "100% Welcome Bonus + Daily Enhanced Odds", url: "https://22bet.com/?btag=igamingubuntu" },
  { operatorName: "Bet9ja", bonusText: "Nigeria's #1 Betting Site — Competitive Odds", url: "https://bet9ja.com/?ref=igamingubuntu" },
]

const nigeriaArticles: Article[] = [
  { id: "n1", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026", excerpt: "Compare bonuses, odds, payment methods, and our expert ratings.", category: "Sports Betting", country: "nigeria", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 10, author: "iGamingUbuntu", status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04" },
  { id: "n2", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites", excerpt: "Complete betting guide for the 2026 FIFA World Cup with Nigeria perspective.", category: "Guides", country: "nigeria", featuredImage: "/images/Green Data Network (ABSTRACT + TECH).png", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
  { id: "n3", slug: "naija-betting-tips-premier-league", title: "Naija Premier League Betting Tips 2026/27", excerpt: "Expert EPL betting tips for Nigerian punters. Enhance your wins!", category: "Betting Tips", country: "nigeria", featuredImage: "/images/full backgound.png", tags: [], readTime: 7, author: "iGamingUbuntu", status: "published", views: 2156, content: "", createdAt: "2026-07-02", updatedAt: "2026-07-02" },
  { id: "n4", slug: "nigeria-sportpesa-vs-bet9ja", title: "SportPesa vs Bet9ja Nigeria: Which is Better in 2026?", excerpt: "Head-to-head comparison of Nigeria's biggest betting brands.", category: "Sports Betting", country: "nigeria", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 9, author: "iGamingUbuntu", status: "published", views: 2890, content: "", createdAt: "2026-06-29", updatedAt: "2026-06-29" },
]

export default function NigeriaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Hero section with image */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/full backgound.png" alt="Nigeria betting" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <img src="https://flagcdn.com/48x36/ng.png" alt="Nigeria" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Nigeria iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in Nigeria. Best sites, bonuses, odds, and local tips for Naija punters.</p>
          </div>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Nigeria</h2>
        <AffiliateBox title="Best Nigeria Betting Sites 2026" offers={topSites} />
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {nigeriaArticles.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={a.featuredImage} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <span className="text-xs text-ubuntu-orange font-medium bg-ubuntu-orange/10 px-2 py-0.5 rounded">{a.category}</span>
              <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition mt-2 mb-1">{a.title}</h3>
              <p className="text-sm text-text-secondary">{a.excerpt}</p>
              <p className="text-xs text-text-muted mt-2">{a.readTime} min read · {a.views.toLocaleString()} views</p>
            </div>
          </Link>
        ))}
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      <div className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nigeria Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Nigeria's gambling industry is regulated by the National Lottery Regulatory Commission (NLRC) and state-level bodies such as the Lagos State Lotteries and Gaming Authority.
          The legal betting age is 18. Online sports betting is legal and widely popular, with Lagos and Abuja being the largest markets.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Popular payment methods include bank transfers, cards, and mobile money. Always verify that a betting site holds a valid Nigerian license before depositing.
        </p>
      </div>

      <AdSlot position="in-content-2" className="rounded-xl overflow-hidden" />
    </div>
  )
}
