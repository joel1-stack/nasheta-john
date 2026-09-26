import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online Casino Directory for African Players",
  description:
    "Browse our directory of online casinos available to African players, with expert reviews, new operator launches, payment options and market-specific guides.",
  alternates: { canonical: "/casinos" },
}

export default function CasinoDirectoryPage() {
  const subs = [
    { title: "New Casinos", href: "/casinos/new", desc: "Recently launched operators reviewed" },
    { title: "Best Casinos", href: "/casinos/best", desc: "Top-rated casinos by our expert team" },
    { title: "Mobile Casinos", href: "/casinos/mobile", desc: "Optimised for mobile betting on the go" },
    { title: "Payment Methods", href: "/casinos/payments", desc: "M-Pesa, Airtel, Bank Transfer and more" },
    { title: "By Market", href: "/casinos/market", desc: "Filter by Kenya, Nigeria, SA, Ghana, Global" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Casino Directory"
        description="Expert reviews of online casinos available to African players."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Casinos" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {subs.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f59e0b]/30 transition-all group">
            <h3 className="font-semibold text-[#111827] group-hover:text-[#f59e0b] transition">{s.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">Latest Casino Reviews</h2>
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
