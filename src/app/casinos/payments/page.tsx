import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casino Payment Methods for African Bettors",
  description:
    "Compare casino payment methods for African bettors, including M-Pesa, Airtel Money, bank transfers and cards. Find fast, safe deposit and withdrawal options.",
  alternates: { canonical: "/casinos/payments" },
}

export default function PaymentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Payment Methods"
        description="M-Pesa, Airtel, Bank Transfer and more — payment options for African bettors."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Casinos", href: "/casinos" }, { label: "Payment Methods" }]}
      />
      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos" className="text-sm text-[#f59e0b] hover:underline font-medium">&larr; Back to Casino Directory</Link>
        <span className="text-sm text-gray-400 mx-1">|</span>
        <Link href="/casinos/new" className="text-sm text-gray-500 hover:text-[#f59e0b]">New Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/best" className="text-sm text-gray-500 hover:text-[#f59e0b]">Best Casinos</Link>
        <span className="text-sm text-gray-400">|</span>
        <Link href="/casinos/mobile" className="text-sm text-gray-500 hover:text-[#f59e0b]">Mobile Casinos</Link>
      </nav>
      <AdSlot position="leaderboard-top" className="mb-8" />
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
