import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"

const topSites = [
  { operatorName: "Betway Nigeria", bonusText: "Up to $50 in Free Bets — Trusted Global Brand", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "1xBet Nigeria", bonusText: "100% Bonus + $100 Free Bet + Naija Support", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "22Bet Nigeria", bonusText: "100% Welcome Bonus + Daily Enhanced Odds", url: "https://22bet.com/?btag=igamingubuntu" },
  { operatorName: "Bet9ja", bonusText: "Nigeria's #1 Betting Site — Competitive Odds", url: "https://bet9ja.com/?ref=igamingubuntu" },
]

export default function NigeriaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🇳🇬</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Nigeria iGaming Guide</h1>
          <p className="text-text-secondary">Your guide to betting in Nigeria. Best sites, bonuses, and local tips.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Nigeria</h2>
        <AffiliateBox title="Best Nigeria Betting Sites 2026" offers={topSites} />
      </div>

      <div className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nigeria Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed">
          Nigeria's gambling industry is regulated by the National Lottery Regulatory Commission (NLRC) and state-level bodies. 
          The legal betting age is 18. Online sports betting is legal and widely popular, with Lagos and Abuja being major markets.
        </p>
      </div>

      <AdSlot position="in-content-1" />
    </div>
  )
}
