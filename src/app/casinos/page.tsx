import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casinos and Betting Sites: Coverage for African Players",
  description:
    "Our coverage of online casinos and betting sites for African players: published operator reviews, payment methods, licences and market rules.",
  alternates: { canonical: "/casinos" },
}

export default function CasinoDirectoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Casinos"
        description="Casino and betting-site coverage for African players: reviews, payments and licensing."
        crumbs={[{ label: "Home", href: "/" }, { label: "Casinos" }]}
        path="/casinos"
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <p className="max-w-3xl text-gray-600 mb-8">
        This section covers casino and betting products for African players through the lens we use everywhere on the site:
        who is licensed, which payment methods work, and what the rules say. For payment methods, mobile money and
        licence-linked compliance, see <Link href="/casinos/payments" className="text-[#409824] hover:underline">Payments</Link>;
        for the regulators behind each market, see <Link href="/news/regulation" className="text-[#409824] hover:underline">Regulation news</Link>.
        How we assess operators is set out in our <Link href="/how-we-review" className="text-[#409824] hover:underline">review method</Link>.
      </p>
      <h2 className="text-2xl font-bold text-[#111827] mb-6">Casino reviews and coverage</h2>
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
