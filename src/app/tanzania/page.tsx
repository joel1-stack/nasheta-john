import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article } from "@/types"

const topSites = [
  { operatorName: "1xBet Tanzania", bonusText: "100% Bonus + TZS 200,000 Free Bet", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "Betway Tanzania", bonusText: "Up to TZS 100,000 in Free Bets", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "22Bet Tanzania", bonusText: "100% Welcome Bonus + Tigo-Pesa Accepted", url: "https://22bet.com/?btag=igamingubuntu" },
]

const tzArticles: Article[] = [
  { id: "tz1", slug: "best-tanzania-betting-sites-2026", title: "Best Betting Sites in Tanzania 2026: Top Bookmakers", excerpt: "Expert guide to the best Tanzania betting sites with Tigo-Pesa and M-Pesa support.", category: "Sports Betting", country: "tanzania", featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 1890, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
  { id: "tz2", slug: "tigo-pesa-betting-guide", title: "Tigo-Pesa Betting Guide: How to Deposit & Withdraw", excerpt: "Step-by-step guide for using Tigo-Pesa at Tanzania betting sites.", category: "Guides", country: "tanzania", featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1456, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04" },
  { id: "tz3", slug: "tanzania-premier-league-betting", title: "Tanzania Premier League Betting Tips 2026/27", excerpt: "Expert predictions and betting tips for the NBC Premier League.", category: "Betting Tips", country: "tanzania", featuredImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 1234, content: "", createdAt: "2026-07-02", updatedAt: "2026-07-02" },
]

export default function TanzaniaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80" alt="Tanzania betting" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <img src="https://flagcdn.com/48x36/tz.png" alt="Tanzania" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Tanzania iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in Tanzania. Best sites, bonuses, and Tigo-Pesa betting tips.</p>
          </div>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Tanzania</h2>
        <AffiliateBox title="Best Tanzania Betting Sites 2026" offers={topSites} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {tzArticles.map((a) => (
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
        <h2 className="text-2xl font-bold text-text-primary mb-4">Tanzania Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Tanzania's gambling is regulated by the Gaming Board of Tanzania. Sports betting and casino games are legal and licensed.
          Mobile money (Tigo-Pesa, M-Pesa, Airtel Money) is the most popular payment method for Tanzanian punters.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The legal betting age in Tanzania is 18. Always verify operators hold a valid Gaming Board license before depositing.
        </p>
      </div>
    </div>
  )
}
