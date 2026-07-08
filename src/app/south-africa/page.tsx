import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"

const topSites = [
  { operatorName: "HollywoodBets", bonusText: "SA's Favourite — Competitive Odds & Easy Payouts", url: "https://hollywoodbets.com/?ref=igamingubuntu" },
  { operatorName: "Betway SA", bonusText: "Up to R1,000 in Free Bets for New Players", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "1xBet SA", bonusText: "100% Bonus + R1,000 Free Bet + ZAR Support", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "World Sports Betting", bonusText: "SA Licensed — Local Support & Quick Withdrawals", url: "https://wsb.co.za/?ref=igamingubuntu" },
]

export default function SouthAfricaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🇿🇦</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">South Africa iGaming Guide</h1>
          <p className="text-text-secondary">Your guide to betting in South Africa. Best sites, bonuses, and local regulations.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in South Africa</h2>
        <AffiliateBox title="Best SA Betting Sites 2026" offers={topSites} />
      </div>

      <div className="bg-card rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">SA Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed">
          South Africa's gambling is regulated by the National Gambling Board (NGB) and provincial authorities. 
          Online sports betting is legal. Online casinos operate in a grey area. The legal betting age is 18.
        </p>
      </div>

      <AdSlot position="in-content-1" />
    </div>
  )
}
