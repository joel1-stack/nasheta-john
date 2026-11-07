import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sports Betting Guides, Tips and Coverage",
  description:
    "Sports betting guides, expert tips and market coverage for football, rugby, cricket and more, with insights for bettors across African markets.",
  alternates: { canonical: "/sports" },
}

export default function SportsBettingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Sports Betting"
        description="Sports betting guides, tips, and market coverage."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sports Betting" }]}
        path="/sports"
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <p className="max-w-3xl text-gray-600 mb-8">
        Sports betting coverage for African markets, with a focus on what changes for bettors and operators: licensing,
        taxes, payment rules and prediction-market questions. Country-level rules sit in our hubs for{" "}
        <Link href="/kenya" className="text-[#409824] hover:underline">Kenya</Link>,{" "}
        <Link href="/nigeria" className="text-[#409824] hover:underline">Nigeria</Link>,{" "}
        <Link href="/south-africa" className="text-[#409824] hover:underline">South Africa</Link>,{" "}
        <Link href="/ghana" className="text-[#409824] hover:underline">Ghana</Link> and{" "}
        <Link href="/tanzania" className="text-[#409824] hover:underline">Tanzania</Link>.
        New to the topic? Start with <Link href="/guides/are-prediction-markets-gambling" className="text-[#409824] hover:underline">are prediction markets gambling</Link>.
      </p>
      <h2 className="text-2xl font-bold text-[#111827] mb-6">Latest Articles</h2>
      <CategoryArticleList category="Sports Betting" />
    </div>
  )
}
