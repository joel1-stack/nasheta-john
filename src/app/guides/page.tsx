import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import SectionHeader from "@/components/SectionHeader"
import type { Article } from "@/types"

const guides: Article[] = [
  { id: "g1", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites", excerpt: "Complete betting guide for the 2026 FIFA World Cup. Team analysis, predictions, and where to bet.", category: "Guides", country: "", featuredImage: "/images/full backgound.png", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
  { id: "g2", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators", excerpt: "Complete list of betting sites that accept M-Pesa. Fast deposits and withdrawals.", category: "Guides", country: "", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03" },
  { id: "g3", slug: "1xbet-registration-guide-kenya", title: "1xBet Registration Guide Kenya: Step by Step", excerpt: "How to register at 1xBet in Kenya. Complete walkthrough with screenshots.", category: "Guides", country: "", featuredImage: "/images/Green Data Network (ABSTRACT + TECH).png", tags: [], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1876, content: "", createdAt: "2026-07-01", updatedAt: "2026-07-01" },
  { id: "g4", slug: "how-to-bet-on-football", title: "How to Bet on Football: Beginner's Guide 2026", excerpt: "Learn the basics of football betting. Understand odds, markets, and strategies.", category: "Guides", country: "", featuredImage: "/images/full backgound.png", tags: [], readTime: 8, author: "iGamingUbuntu", status: "published", views: 2134, content: "", createdAt: "2026-06-28", updatedAt: "2026-06-28" },
  { id: "g5", slug: "understanding-betting-odds", title: "Understanding Betting Odds: Decimal, Fractional & American", excerpt: "Learn how to read, compare, and calculate betting odds across all formats.", category: "Guides", country: "", featuredImage: "/images/sports betting analytics.png", tags: [], readTime: 6, author: "iGamingUbuntu", status: "published", views: 1987, content: "", createdAt: "2026-06-25", updatedAt: "2026-06-25" },
]

export default function GuidesPage() {
  const [featured, ...rest] = guides
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16">
      <SectionHeader
        title="Betting Guides & Tips"
        description="Learn how to bet smarter. Beginner-friendly guides, expert tips, and winning strategies for African punters."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Guides" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <Link
        href={`/blog/${featured.slug}`}
        className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all mb-6"
      >
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="relative h-52 md:h-full min-h-[200px] overflow-hidden">
            <img src={featured.featuredImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-5 md:p-6 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b] mb-2">Featured</span>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-[#f59e0b]">Guide</span>
              <span>{featured.readTime} min read</span>
            </div>
            <h2 className="font-bold text-[#111827] group-hover:text-[#f59e0b] transition text-lg md:text-xl leading-snug mb-2">{featured.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-3">{featured.excerpt}</p>
            <span className="mt-4 text-sm font-semibold text-[#f59e0b] group-hover:translate-x-1 transition-transform">Read article →</span>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((g) => (
          <Link key={g.slug} href={`/blog/${g.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={g.featuredImage} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-[#f59e0b]">Guide</span>
                <span>{g.readTime} min read</span>
                <span>· {g.views.toLocaleString()} views</span>
              </div>
              <h3 className="font-bold text-[#111827] group-hover:text-[#f59e0b] transition mb-1">{g.title}</h3>
              <p className="text-sm text-gray-500">{g.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <AdSlot position="in-content-1" className="mt-12 rounded-xl overflow-hidden" />
    </div>
  )
}
