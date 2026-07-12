import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article } from "@/types"

const topSites = [
  { operatorName: "HollywoodBets", bonusText: "SA's Favourite — Competitive Odds & Easy Payouts", url: "https://hollywoodbets.com/?ref=igamingubuntu" },
  { operatorName: "Betway SA", bonusText: "Up to R1,000 in Free Bets for New Players", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "1xBet SA", bonusText: "100% Bonus + R1,000 Free Bet + ZAR Support", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "World Sports Betting", bonusText: "SA Licensed — Local Support & Quick Withdrawals", url: "https://wsb.co.za/?ref=igamingubuntu" },
]

const saArticles: Article[] = [
  { id: "sa1", slug: "best-sa-betting-sites-2026", title: "Top South Africa Betting Sites 2026: Expert Guide", excerpt: "Compare the best SA betting sites with ZAR support, fast payouts and local licenses.", category: "Sports Betting", country: "south-africa", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 9, author: "iGamingUbuntu", status: "published", views: 2876, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07" },
  { id: "sa2", slug: "hollywoodbets-review-2026", title: "HollywoodBets Review 2026: Is It SA's Best Bookmaker?", excerpt: "Honest HollywoodBets review covering odds, app, payouts and promotions.", category: "Casino Reviews", country: "south-africa", featuredImage: "/images/Green Data Network (ABSTRACT + TECH).png", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 2145, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05" },
  { id: "sa3", slug: "rugby-world-cup-betting-sa", title: "Rugby World Cup 2027 Betting Guide for SA Punters", excerpt: "Everything you need to bet on the RWC 2027 from South Africa.", category: "Guides", country: "south-africa", featuredImage: "/images/full backgound.png", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 1789, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03" },
]

export default function SouthAfricaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-purple">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/full backgound.png" alt="South Africa betting" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <img src="https://flagcdn.com/48x36/za.png" alt="South Africa" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">South Africa iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Your guide to betting in South Africa. Best sites, bonuses, and local regulations for SA punters.</p>
          </div>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in South Africa</h2>
        <AffiliateBox title="Best SA Betting Sites 2026" offers={topSites} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {saArticles.map((a) => (
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
        <h2 className="text-2xl font-bold text-text-primary mb-4">SA Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          South Africa's gambling is regulated by the National Gambling Board (NGB) and provincial authorities.
          Online sports betting is legal and licensed. Online casinos operate in a grey area — only licensed land-based casinos may offer online casino games.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The legal betting age is 18. Popular payment methods include EFT, Visa, Mastercard, and Ozow. Always check for a valid provincial license before depositing.
        </p>
      </div>
    </div>
  )
}
