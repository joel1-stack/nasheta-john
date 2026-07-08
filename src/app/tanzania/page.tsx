import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"

const topSites = [
  { operatorName: "1xBet Tanzania", bonusText: "100% Bonus + TZS 200,000 Free Bet", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "Betway Tanzania", bonusText: "Up to TZS 100,000 in Free Bets", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "22Bet Tanzania", bonusText: "100% Welcome Bonus + Tigo-Pesa Accepted", url: "https://22bet.com/?btag=igamingubuntu" },
]

export default function TanzaniaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🇹🇿</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Tanzania iGaming Guide</h1>
          <p className="text-text-secondary">Your guide to betting in Tanzania. Best sites, bonuses, and Tigo-Pesa tips.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Tanzania</h2>
        <AffiliateBox title="Best Tanzania Betting Sites 2026" offers={topSites} />
      </div>

      <div className="bg-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Tanzania Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed">
          Tanzania's gambling is regulated by the Gaming Board of Tanzania. Sports betting and casinos are legal. 
          Mobile money (Tigo-Pesa, M-Pesa, Airtel Money) is widely accepted. Legal age is 18.
        </p>
      </div>
    </div>
  )
}
