import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile Casinos Optimised for Betting",
  description:
    "Play at the best mobile casinos optimised for betting on the go. Compare apps, mobile bonuses, fast withdrawals and payment options for African players.",
  alternates: { canonical: "/casinos/mobile" },
}

export default function MobileCasinosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Mobile Casinos"
        description="Online casinos optimised for mobile betting on the go."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Casinos", href: "/casinos" }, { label: "Mobile Casinos" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Casino Directory</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/casinos/new" className="text-sm text-gray-500 hover:text-[#f59e0b]">New Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/best" className="text-sm text-gray-500 hover:text-[#f59e0b]">Best Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/payments" className="text-sm text-gray-500 hover:text-[#f59e0b]">Payment Methods</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
