import Hero from "@/components/Hero"
import LatestPosts from "@/components/LatestPosts"
import CountryCard from "@/components/CountryCard"
import Newsletter from "@/components/Newsletter"
import AdSlot from "@/components/AdSlot"
import Link from "next/link"
import type { Article, Country } from "@/types"

const sampleArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina came from 2-0 down to beat Egypt 3-2 in a thrilling World Cup Round of 16 match. Get the full result and best betting odds for the quarterfinal.",
    category: "Sports Betting", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    tags: ["World Cup", "Argentina", "Egypt", "Betting"],
    readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews & Bonuses",
    excerpt: "We review the best online casinos available in Kenya for 2026. Compare bonuses, game selection, M-Pesa support, and our expert ratings.",
    category: "Casino Reviews", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&q=80",
    tags: ["Kenya", "Casino", "Reviews"],
    readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites",
    excerpt: "Complete betting guide for the 2026 FIFA World Cup. Learn how to bet, where to get the best odds, and which betting sites to use in Africa.",
    category: "Betting Tips", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    tags: ["World Cup", "Betting", "Guide"],
    readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06",
  },
  {
    id: "4", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim Your 200% Match",
    excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus. Get 200% up to KES 5,000 on your first deposit. Terms and conditions explained.",
    category: "Bonuses", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    tags: ["SportPesa", "Bonus", "Kenya"],
    readTime: 5, author: "iGamingUbuntu", status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
  {
    id: "5", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026: Ranked & Reviewed",
    excerpt: "Find the best betting sites in Nigeria for 2026. Compare bonuses, odds, payment methods like Bank Transfer and our expert ratings.",
    category: "Sports Betting", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    tags: ["Nigeria", "Betting", "Reviews"],
    readTime: 10, author: "iGamingUbuntu", status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04",
  },
  {
    id: "6", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators Accepting Mobile Money",
    excerpt: "Complete list of betting sites that accept M-Pesa in 2026. Compare deposit limits, processing times, and welcome bonuses for mobile money users.",
    category: "Guides", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    tags: ["M-Pesa", "Kenya", "Mobile Money"],
    readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03",
  },
]

const countries: Country[] = [
  { id: "ke", name: "Kenya", slug: "kenya", flag: "🇰🇪", description: "Best betting sites, M-Pesa guides, and local operator reviews for Kenyan bettors.", articleCount: 120 },
  { id: "ng", name: "Nigeria", slug: "nigeria", flag: "🇳🇬", description: "Nigerian betting market, Naija bonuses, and sportsbook reviews for Nigerian players.", articleCount: 85 },
  { id: "za", name: "South Africa", slug: "south-africa", flag: "🇿🇦", description: "SA betting guides, Hollywoodbets reviews, and local regulations for South African bettors.", articleCount: 64 },
  { id: "gh", name: "Ghana", slug: "ghana", flag: "🇬🇭", description: "Ghana betting sites, Premier League tips, and mobile money guides for Ghanaian players.", articleCount: 42 },
  { id: "tz", name: "Tanzania", slug: "tanzania", flag: "🇹🇿", description: "Tanzania sports betting, casino reviews, and Tigo-Pesa guides for Tanzanian bettors.", articleCount: 38 },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <AdSlot position="leaderboard-top" className="max-w-6xl mx-auto px-4 mb-8" />
      <LatestPosts articles={sampleArticles} />

      {/* Country section with bg image */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ubuntu-orange/5 via-white to-ubuntu-purple/5" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Explore by Country</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Country-specific betting guides, top sites, and local operator reviews tailored for each African market.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {countries.map((c) => (
              <CountryCard key={c.slug} country={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-6">Trusted by players from these operators</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-text-muted">
            {["SportPesa", "Betika", "1xBet", "Betway", "22Bet", "Melbet", "HollywoodBets", "Bet9ja"].map((brand) => (
              <span key={brand} className="text-lg font-bold opacity-40 hover:opacity-70 transition">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-ubuntu-orange/10 via-white to-gold/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Stay Ahead of the Game</h2>
            <p className="text-text-secondary mb-6">Get the latest betting tips, bonus offers, and iGaming insights delivered to your inbox.</p>
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  )
}
