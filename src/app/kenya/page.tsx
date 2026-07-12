import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article } from "@/types"

const kenyaArticles: Article[] = [
  { id: "k1", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim 200%", excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus.", category: "Bonuses", country: "kenya", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05" },
  { id: "k2", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators", excerpt: "List of betting sites that accept M-Pesa.", category: "Guides", country: "kenya", featuredImage: "/images/Green Data Network (ABSTRACT + TECH).png", tags: [], readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03" },
  { id: "k3", slug: "kenya-betting-tax-update-2026", title: "Kenya Betting Tax Update 2026", excerpt: "Latest tax regulations and how they affect players.", category: "News", country: "kenya", featuredImage: "/images/full backgound.png", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3124, content: "", createdAt: "2026-06-30", updatedAt: "2026-06-30" },
  { id: "k4", slug: "betika-free-bet-offer", title: "Betika Free Bet Offer 2026", excerpt: "Claim your Betika free bet.", category: "Bonuses", country: "kenya", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 4, author: "iGamingUbuntu", status: "published", views: 2156, content: "", createdAt: "2026-07-02", updatedAt: "2026-07-02" },
  { id: "k5", slug: "1xbet-registration-guide-kenya", title: "1xBet Registration Guide Kenya 2026", excerpt: "How to register at 1xBet in Kenya.", category: "Guides", country: "kenya", featuredImage: "/images/Green Data Network (ABSTRACT + TECH).png", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1876, content: "", createdAt: "2026-07-01", updatedAt: "2026-07-01" },
  { id: "k6", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026", excerpt: "Best casinos available in Kenya.", category: "Casino Reviews", country: "kenya", featuredImage: "/images/full backgound.png", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07" },
]

const topSites = [
  { operatorName: "SportPesa", bonusText: "200% Welcome Bonus up to KES 5,000 — M-Pesa Accepted", url: "https://sportpesa.com/?ref=igamingubuntu" },
  { operatorName: "Betika", bonusText: "Free Bet on First Deposit + Instant M-Pesa Withdrawals", url: "https://betika.com/?aff=igamingubuntu" },
  { operatorName: "1xBet", bonusText: "100% Bonus + $100 Free Bet + M-Pesa Support", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "Betway", bonusText: "Up to $50 in Free Bets — Trusted Global Brand", url: "https://betway.com/?aff=igamingubuntu" },
]

export default function KenyaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-green to-ubuntu-orange">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/full backgound.png" alt="Kenya betting" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex items-center gap-4">
          <img src="https://flagcdn.com/48x36/ke.png" alt="Kenya" className="w-12 h-9 rounded shadow-lg" />
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Kenya iGaming Guide</h1>
            <p className="text-white/80 mt-1 max-w-xl">Everything you need to bet legally and safely in Kenya.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="#sites" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Best Betting Sites</Link>
        <Link href="#casinos" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Casino Reviews</Link>
        <Link href="#mpesa" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">M-Pesa Guide</Link>
        <Link href="#bonuses" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">Bonuses</Link>
        <Link href="#news" className="bg-card text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-ubuntu-orange transition">News</Link>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div id="sites" className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Kenya</h2>
        <AffiliateBox title="Best Kenya Betting Sites 2026" offers={topSites} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {kenyaArticles.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="aspect-[16/9] overflow-hidden">
              {a.featuredImage ? (
                <img src={a.featuredImage} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-ubuntu-orange/20 to-ubuntu-purple/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-ubuntu-orange/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
              )}
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

      <AdSlot position="in-content-1" className="mb-12" />

      <div className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Kenya Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Kenya's betting industry is regulated by the Betting, Lotteries and Gaming Act, enforced by the Betting Control and Licensing Board (BCLB). 
          All operators must hold a valid license from the BCLB. The legal betting age in Kenya is 18. Online betting is legal and regulated.
        </p>
        <p className="text-text-secondary leading-relaxed">
          In 2026, new tax regulations require operators to deduct 20% withholding tax on winnings above KES 5,000. 
          Always verify that a betting site holds a valid BCLB license before depositing.
        </p>
      </div>
    </div>
  )
}
