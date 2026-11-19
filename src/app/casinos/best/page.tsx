import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Online Casinos Ranked & Reviewed",
  description:
    "Discover the best online casinos for 2026, ranked by our expert team. Compare bonuses, licences, payment methods and games from trusted operators.",
  alternates: { canonical: "/casinos/best" },
  // Duplicate of the parent hub until it has its own CMS category.
  robots: { index: false, follow: true },
}

export default function BestCasinosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Best Casinos"
        description="Top-rated online casinos reviewed by our expert team."
        crumbs={[{ label: "Home", href: "/" }, { label: "Casinos", href: "/casinos" }, { label: "Best Casinos" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Casino Directory</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/casinos/new" className="text-sm text-gray-500 hover:text-[#f59e0b]">New Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/mobile" className="text-sm text-gray-500 hover:text-[#f59e0b]">Mobile Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/payments" className="text-sm text-gray-500 hover:text-[#f59e0b]">Payment Methods</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />

      <h2 className="text-2xl font-bold text-[#111827] mb-4">Best Casinos by Country</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Link
          href="/casinos/best/nigeria"
          className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5"
        >
          <p className="text-xs text-[#f59e0b] uppercase tracking-wide font-semibold mb-1">Nigeria</p>
          <p className="text-[#111827] font-bold">Best Casinos in Nigeria</p>
          <p className="text-gray-500 text-sm mt-1">A ranked comparison of Nigeria&apos;s best-known licensed casino and betting brands.</p>
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">All Casino Reviews</h2>
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
