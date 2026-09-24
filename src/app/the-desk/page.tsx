import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"

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
            iGamingUbuntu is Africa&apos;s iGaming content authority. From our desk, we produce expert-written casino reviews,
            betting guides, industry news, and affiliate content that ranks and converts across Kenyan, Nigerian, South African,
            Ghanaian, and Tanzanian markets.
          </p>
          <p>
            Every article starts with market research — monitoring Google trends, operator promotions, regulatory announcements,
            and bettor behavior. Our writers average 7+ years of industry experience and specialize in SEO-optimized content.
          </p>
          <p>
            We cover sports betting markets including the NPFL, Ghana Premier League, English Premier League, La Liga, World Cup,
            and African competitions. Our casino reviews focus on M-Pesa-compatible operators, bonus transparency, and game selection.
          </p>
          <p>
            Want content like this for your brand? Visit our <Link href="/work-with-me" className="text-[#f59e0b] font-medium hover:underline">Work With Me</Link> page.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">From Our Desk</h2>
      <CategoryArticleList category="Industry News" />
    </div>
  )
}
