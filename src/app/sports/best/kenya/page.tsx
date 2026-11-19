import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import SectionHeader from "@/components/SectionHeader"
import BestOperatorCard, { type BestOperator } from "@/components/BestOperatorCard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Sportsbooks in Kenya",
  description: "A ranked look at Kenya's best-known licensed sportsbooks, compared on coverage, payments and mobile experience.",
  alternates: { canonical: "/sports/best/kenya" },
  // Draft: ratings/offers below are illustrative, not yet verified for publication.
  robots: { index: false, follow: true },
}

const OPERATORS: BestOperator[] = [
  {
    name: "Betika",
    initials: "BE",
    badgeColor: "#173D33",
    logo: "/images/operators/betika.png",
    rating: 4.5,
    bestFor: "Wide local market coverage",
    features: ["Licensed by the Gambling Regulatory Authority of Kenya", "M-Pesa deposits and withdrawals", "Football, rugby and local leagues"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Live",
    siteUrl: "https://www.betika.com",
  },
  {
    name: "SportPesa",
    initials: "SP",
    badgeColor: "#3B8F7B",
    logo: "/images/operators/sportpesa.png",
    rating: 4.4,
    bestFor: "Long-standing brand recognition",
    features: ["Licensed by the Gambling Regulatory Authority of Kenya", "M-Pesa deposits and withdrawals", "Sports, jackpot and casino games"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Jackpot",
    siteUrl: "https://www.sportpesa.com",
  },
  {
    name: "Odibets",
    initials: "OD",
    badgeColor: "#E95420",
    logo: "/images/operators/odibets.png",
    rating: 4.2,
    bestFor: "Simple mobile-first betting",
    features: ["Licensed by the Gambling Regulatory Authority of Kenya", "M-Pesa deposits and withdrawals", "Lightweight app for low-end phones"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino",
    siteUrl: "https://www.odibets.com",
  },
  {
    name: "Melbet",
    initials: "ME",
    badgeColor: "#772953",
    logo: "/images/operators/melbet.png",
    rating: 4.1,
    bestFor: "Breadth of betting markets",
    features: ["Licensed for the Kenyan market", "M-Pesa and card payments", "Extensive live betting markets"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Live",
    siteUrl: "https://www.melbet.com",
  },
  {
    name: "1xBet",
    initials: "1X",
    badgeColor: "#0E8420",
    logo: "/images/operators/1xbet.png",
    rating: 4.0,
    bestFor: "International market depth",
    features: ["Licensed for the Kenyan market", "M-Pesa and card payments", "Large casino game library"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Live",
    siteUrl: "https://www.1xbet.com",
  },
]

export default function BestKenyaSportsbooksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Best Sportsbooks in Kenya"
        description="A ranked comparison of Kenya's best-known licensed sportsbooks."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sports Betting", href: "/sports" }, { label: "Best Sportsbooks in Kenya" }]}
      />

      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-4 py-2 mb-6">
        Design preview: ratings and offer details below are illustrative pending confirmed operator deals and our own review, not yet published.
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/sports" className="text-sm text-brand-teal hover:underline font-medium">&larr; Back to Sports Betting</Link>
      </nav>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OPERATORS.map((op, i) => (
          <BestOperatorCard key={op.name} operator={op} rank={i + 1} />
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-8 leading-relaxed">
        Affiliate links will be added once operator partnerships are confirmed. Our review method is set out on{" "}
        <Link href="/how-we-review" className="underline hover:text-gray-600">How We Review</Link>.
      </p>
    </div>
  )
}
