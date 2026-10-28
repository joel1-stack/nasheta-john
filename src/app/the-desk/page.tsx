import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Desk: Inside iGamingUbuntu's Content",
  description:
    "Go behind the scenes at iGamingUbuntu to see how we research, source and report news on betting, casino and regulation across African markets.",
  alternates: { canonical: "/the-desk" },
}

export default function TheDeskPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="The Desk"
        description="Behind the scenes at iGamingUbuntu — how we research, write, and optimize iGaming content."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "The Desk" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-bold text-[#111827] mb-4">Welcome to The Desk</h2>
        <div className="text-gray-500 space-y-4 leading-relaxed">
          <p>
            iGamingUbuntu is an independent publication on Africa&apos;s iGaming industry. From our desk, we report industry news,
            regulation, casino reviews and betting guides across Kenyan, Nigerian, South African, Ghanaian, and Tanzanian markets.
          </p>
          <p>
            Every article starts with research: regulator announcements, court rulings, tax changes, operator results and what
            bettors are actually doing. We name our sources and correct mistakes openly.
          </p>
          <p>
            We cover sports betting markets including the NPFL, Ghana Premier League, English Premier League, La Liga, World Cup,
            and African competitions. Our casino reviews focus on M-Pesa-compatible operators, bonus transparency, and game selection.
          </p>
          <p>
            Want to reach our readers? See our <Link href="/advertise" className="text-[#f59e0b] font-medium hover:underline">advertising options</Link>.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">From Our Desk</h2>
      <CategoryArticleList category="Industry News" />
    </div>
  )
}
