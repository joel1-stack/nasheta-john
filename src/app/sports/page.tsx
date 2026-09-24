import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"

export default function SportsBettingPage() {
  const subs = [
    { title: "Live Events", href: "/sports/live", desc: "Real-time odds, in-play betting and match coverage" },
    { title: "Predictions & Tips", href: "/sports/predictions", desc: "Expert match predictions and betting tips" },
    { title: "League Guides", href: "/sports/leagues", desc: "Premier League, La Liga, EPL and more" },
    { title: "Betting Explained", href: "/sports/basics", desc: "Beginner-friendly guides to betting fundamentals" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Sports Betting"
        description="Sports betting guides, tips, and market coverage."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Sports Betting" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {subs.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f59e0b]/30 transition-all group">
            <h3 className="font-semibold text-[#111827] group-hover:text-[#f59e0b] transition">{s.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">Latest Articles</h2>
      <CategoryArticleList category="Sports Betting" />
    </div>
  )
}
