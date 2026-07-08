import Hero from "@/components/Hero"
import LatestPosts from "@/components/LatestPosts"
import CountryCard from "@/components/CountryCard"
import Newsletter from "@/components/Newsletter"
import AdSlot from "@/components/AdSlot"
import type { Article, Country } from "@/types"

const sampleArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina came from 2-0 down to beat Egypt 3-2 in a thrilling World Cup Round of 16 match. Get the full result and best betting odds.",
    category: "Sports Betting", country: "kenya", featuredImage: "", tags: ["World Cup", "Argentina", "Egypt", "Betting"],
    readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews & Bonuses",
    excerpt: "We review the best online casinos available in Kenya for 2026. Compare bonuses, game selection, and M-Pesa support.",
    category: "Casino Reviews", country: "kenya", featuredImage: "", tags: ["Kenya", "Casino", "Reviews"],
    readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites",
    excerpt: "Complete betting guide for the 2026 FIFA World Cup. Learn how to bet, where to get the best odds, and which sites to use.",
    category: "Betting Tips", country: "nigeria", featuredImage: "", tags: ["World Cup", "Betting", "Guide"],
    readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06",
  },
  {
    id: "4", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim Your 200% Match",
    excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus. Get 200% up to KES 5,000 on your first deposit.",
    category: "Bonuses", country: "kenya", featuredImage: "", tags: ["SportPesa", "Bonus", "Kenya"],
    readTime: 5, author: "iGamingUbuntu", status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
  {
    id: "5", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026: Ranked & Reviewed",
    excerpt: "Find the best betting sites in Nigeria for 2026. Compare bonuses, odds, payment methods, and our expert ratings.",
    category: "Sports Betting", country: "nigeria", featuredImage: "", tags: ["Nigeria", "Betting", "Reviews"],
    readTime: 10, author: "iGamingUbuntu", status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04",
  },
  {
    id: "6", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators Accepting Mobile Money",
    excerpt: "List of betting sites that accept M-Pesa in 2026. Compare deposit limits, processing times, and welcome bonuses.",
    category: "Guides", country: "kenya", featuredImage: "", tags: ["M-Pesa", "Kenya", "Mobile Money"],
    readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03",
  },
]

const countries: Country[] = [
  { id: "ke", name: "Kenya", slug: "kenya", flag: "🇰🇪", description: "Best betting sites, M-Pesa guides, and local operator reviews.", articleCount: 120 },
  { id: "ng", name: "Nigeria", slug: "nigeria", flag: "🇳🇬", description: "Nigerian betting market, Naija bonuses, and sportsbook reviews.", articleCount: 85 },
  { id: "za", name: "South Africa", slug: "south-africa", flag: "🇿🇦", description: "SA betting guides, Hollywoodbets reviews, and local regulations.", articleCount: 64 },
  { id: "gh", name: "Ghana", slug: "ghana", flag: "🇬🇭", description: "Ghana betting sites, Premier League tips, and mobile money guides.", articleCount: 42 },
  { id: "tz", name: "Tanzania", slug: "tanzania", flag: "🇹🇿", description: "Tanzania sports betting, casino reviews, and Tigo-Pesa guides.", articleCount: 38 },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <AdSlot position="leaderboard-top" className="max-w-6xl mx-auto px-4 mb-8" />
      <LatestPosts articles={sampleArticles} />

      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Explore by Country</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {countries.map((c) => (
              <CountryCard key={c.slug} country={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  )
}
