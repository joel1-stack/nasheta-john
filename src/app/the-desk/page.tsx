import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function TheDeskPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/sports betting analytics.png" alt="The Desk" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">The Desk</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Behind the scenes at iGamingUbuntu — how we research, write, and optimize iGaming content.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="bg-white rounded-xl border border-border p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Welcome to The Desk</h2>
        <div className="text-text-secondary space-y-4 leading-relaxed">
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
            Want content like this for your brand? Visit our <Link href="/work-with-me" className="text-ubuntu-orange font-medium hover:underline">Work With Me</Link> page.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">From Our Desk</h2>
      <CategoryArticleList category="Industry News" />
    </div>
  )
}
