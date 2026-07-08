import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"

const topSites = [
  { operatorName: "Betway Ghana", bonusText: "Up to GHS 500 in Free Bets — Trusted Brand", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "1xBet Ghana", bonusText: "100% Bonus + GHS 500 Free Bet", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "22Bet Ghana", bonusText: "100% Welcome Bonus + Daily Odds Boost", url: "https://22bet.com/?btag=igamingubuntu" },
]

export default function GhanaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🇬🇭</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Ghana iGaming Guide</h1>
          <p className="text-text-secondary">Your guide to betting in Ghana. Best sites, bonuses, and mobile money tips.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Top Betting Sites in Ghana</h2>
        <AffiliateBox title="Best Ghana Betting Sites 2026" offers={topSites} />
      </div>

      <div className="bg-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Ghana Gambling Laws</h2>
        <p className="text-text-secondary leading-relaxed">
          Ghana's gambling is regulated by the Gaming Commission of Ghana. Sports betting and lottery are legal. 
          Mobile money (MTN MoMo, Vodafone Cash) is widely accepted. Legal age is 18.
        </p>
      </div>
    </div>
  )
}
