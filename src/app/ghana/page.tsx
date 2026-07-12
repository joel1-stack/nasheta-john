import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article } from "@/types"

const topSites = [
  { operatorName: "Betway Ghana", bonusText: "Up to GHS 500 in Free Bets — Trusted Brand", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "1xBet Ghana", bonusText: "100% Bonus + GHS 500 Free Bet", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "22Bet Ghana", bonusText: "100% Welcome Bonus + Daily Odds Boost", url: "https://22bet.com/?btag=igamingubuntu" },
]

const ghArticles: Article[] = [
  { id: "gh1", slug: "best-ghana-betting-sites-2026", title: "Best Betting Sites in Ghana 2026: Expert Comparison", excerpt: "Compare the top Ghana betting sites with MoMo support, bonuses and local licenses.", category: "Sports Betting", country: "ghana", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 2156, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
  { id: "gh2", slug: "mtn-momo-betting-guide", title: "MTN MoMo Betting Guide 2026: How to Deposit & Withdraw", excerpt: "Complete guide to using MTN Mobile Money for betting in Ghana.", category: "Guides", country: "ghana", featuredImage: "/images/Green Data Network (ABSTRACT + TECH).png", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1876, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04" },
  { id: "gh3", slug: "ghana-premier-league-betting", title: "Ghana Premier League Betting Tips 2026/27", excerpt: "Expert betting tips and predictions for the Ghana Premier League season.", category: "Betting Tips", country: "ghana", featuredImage: "/images/full backgound.png", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 1543, content: "", createdAt: "2026-07-02", updatedAt: "2026-07-02" },
]

export default function GhanaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-gold/80 to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/full backgound.png" alt="Ghana betting" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <img src="https://flagcdn.com/48x36/gh.png" alt="Ghana" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Ghana iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in Ghana. Best sites, bonuses, and MTN MoMo betting tips.</p>
          </div>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Ghana</h2>
        <AffiliateBox title="Best Ghana Betting Sites 2026" offers={topSites} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {ghArticles.map((a) => (
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
        <h2 className="text-2xl font-bold text-text-primary mb-4">Ghana Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Ghana's gambling is regulated by the Gaming Commission of Ghana. Sports betting and lottery are legal and licensed.
          Mobile money (MTN MoMo, Vodafone Cash) is widely accepted for deposits and withdrawals.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The legal betting age in Ghana is 18. Always verify that a betting site holds a valid Ghana Gaming Commission license before playing.
        </p>
      </div>
    </div>
  )
}
