import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import SectionHeader from "@/components/SectionHeader"
import BestOperatorCard, { type BestOperator } from "@/components/BestOperatorCard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Casinos in Nigeria",
  description: "A ranked look at Nigeria's best-known licensed casino and betting brands, compared on payments, games and mobile experience.",
  alternates: { canonical: "/casinos/best/nigeria" },
  // Draft: ratings/offers below are illustrative, not yet verified for publication.
  robots: { index: false, follow: true },
}

const OPERATORS: BestOperator[] = [
  {
    name: "Bet9ja",
    initials: "B9",
    badgeColor: "#173D33",
    logo: "/images/operators/bet9ja.png",
    rating: 4.5,
    bestFor: "Wide local market coverage",
    features: ["Licensed by the National Lottery Regulatory Commission", "Local bank transfer and card payments", "Football, casino and virtuals"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Virtuals",
    siteUrl: "https://www.bet9ja.com",
  },
  {
    name: "BetKing",
    initials: "BK",
    badgeColor: "#3B8F7B",
    logo: "/images/operators/betking.png",
    rating: 4.4,
    bestFor: "Strong local brand presence",
    features: ["Licensed for the Nigerian market", "Local bank transfer and card payments", "Sports and casino games"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino",
    siteUrl: "https://www.betking.com",
  },
  {
    name: "22Bet",
    initials: "22",
    badgeColor: "#E95420",
    logo: "/images/operators/22bet.png",
    rating: 4.2,
    bestFor: "Breadth of casino games",
    features: ["Licensed for the Nigerian market", "Local bank transfer and card payments", "Large casino game library"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Live",
    siteUrl: "https://www.22bet.com",
  },
  {
    name: "1xBet",
    initials: "1X",
    badgeColor: "#772953",
    logo: "/images/operators/1xbet.png",
    rating: 4.1,
    bestFor: "International market depth",
    features: ["Licensed for the Nigerian market", "Local bank transfer and card payments", "Extensive live betting markets"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino, Live",
    siteUrl: "https://www.1xbet.com",
  },
  {
    name: "Betway Nigeria",
    initials: "BW",
    badgeColor: "#0E8420",
    logo: "/images/operators/betway.png",
    rating: 4.0,
    bestFor: "Established international operator",
    features: ["Licensed for the Nigerian market", "Local bank transfer and card payments", "Sports and casino games"],
    minDeposit: "Varies by method",
    payoutTime: "Varies by method",
    games: "Sports, Casino",
    siteUrl: "https://www.betway.com/en-ng",
  },
]

export default function BestNigeriaCasinosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Best Casinos in Nigeria"
        description="A ranked comparison of Nigeria's best-known licensed casino and betting brands."
        crumbs={[{ label: "Home", href: "/" }, { label: "Casinos", href: "/casinos" }, { label: "Best Casinos in Nigeria" }]}
      />

      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-4 py-2 mb-6">
        Design preview: ratings and offer details below are illustrative pending confirmed operator deals and our own review, not yet published.
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos/best" className="text-sm text-brand-teal hover:underline font-medium">&larr; Back to Best Casinos</Link>
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
