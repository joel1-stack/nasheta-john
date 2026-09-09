"use client"

import { useState } from "react"
import { getDb } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const articles = [
  {
    title: "Ghana iGaming Conference 2026: Key Takeaways from Accra",
    slug: "ghana-igaming-conference-2026-key-takeaways",
    excerpt: "Highlights from the 2026 Ghana iGaming Conference in Accra. Key speakers, regulatory updates, and networking takeaways for African operators.",
    content: "<p>The 2026 Ghana iGaming Conference brought together over 500 industry professionals from across Africa and beyond. Held at the Accra International Conference Centre, the event focused on the rapidly evolving regulatory landscape and opportunities in West African markets.</p><h2>Key Speakers</h2><p>Opening remarks were delivered by the Gaming Commission of Ghana chairman, who outlined the country's new licensing framework expected to take effect in Q3 2026. The framework aims to streamline operator registration while strengthening player protection measures.</p><h2>Regulatory Updates</h2><p>Ghana's new gaming bill was a major talking point. The legislation introduces tiered licensing, mandatory responsible gambling tools, and a unified player self-exclusion register.</p><h2>Market Opportunities</h2><p>Mobile money integration continues to drive growth. With over 70% of Ghanaian bettors using MTN MoMo for deposits, operators without seamless mobile payment integration are losing market share.</p>",
    category: "Events", country: "ghana", tags: ["ghana", "conference", "regulation"], readTime: 5, status: "published",
  },
  {
    title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews & Bonuses",
    slug: "top-5-online-casinos-kenya-2026",
    excerpt: "We review the best online casinos in Kenya for 2026. Compare bonuses, game selection, M-Pesa support, and our expert ratings.",
    content: "<p>Kenya's online casino market continues to grow rapidly. We tested and reviewed dozens of platforms to bring you the top 5 for 2026.</p><h2>1. Betika Casino</h2><p>Betika remains the most popular casino platform in Kenya. With over 500 slots, live dealer games from Evolution Gaming, and instant M-Pesa withdrawals, it sets the standard.</p><h2>2. SportPesa Casino</h2><p>SportPesa's casino offering has expanded significantly with exclusive jackpot slots and a dedicated live casino section.</p><h2>3. 1xBet Kenya</h2><p>1xBet offers the widest game selection with over 2,000 titles from 50+ providers. Welcome bonus: 100% up to KES 15,000 plus 150 free spins.</p><h2>4. Melbet Kenya</h2><p>Melbet has carved out a niche with its generous cashback program. Weekly 10% cashback on losses, plus a VIP program.</p><h2>5. Betway Casino</h2><p>Betway's global reputation translates well to Kenya. The platform excels in live dealer games and progressive jackpots.</p>",
    category: "Casino Reviews", country: "kenya", tags: ["kenya", "casino", "reviews", "mpesa"], readTime: 8, status: "published",
  },
  {
    title: "SportPesa Welcome Bonus 2026: How to Claim Your 200% Match",
    slug: "sportpesa-welcome-bonus-2026-guide",
    excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus. Get 200% up to KES 5,000 on your first deposit.",
    content: "<p>SportPesa's 2026 welcome bonus is one of the most generous in the Kenyan market. Here's exactly how to claim it.</p><h2>Bonus Details</h2><p>The current SportPesa welcome offer provides a 200% match on your first deposit, up to a maximum of KES 5,000. The minimum qualifying deposit is KES 100.</p><h2>Step-by-Step Guide</h2><p>1. Register a new SportPesa account. 2. Complete KYC verification. 3. Make your first deposit via M-Pesa. 4. The bonus is credited automatically within 5 minutes.</p><h2>Wagering Requirements</h2><p>The bonus comes with a 5x wagering requirement on sports bets at odds of 1.5 or higher. You have 30 days to meet the requirements.</p>",
    category: "Bonuses", country: "kenya", tags: ["sportpesa", "bonus", "kenya"], readTime: 5, status: "published",
  },
  {
    title: "Nigeria vs Ghana: NPFL vs Ghana Premier League Predictions 2026/27",
    slug: "nigeria-vs-ghana-premier-league-predictions-2026",
    excerpt: "NPFL vs Ghana Premier League betting predictions for the new season. Best odds, transfers, and expert tips for both leagues.",
    content: "<p>The 2026/27 West African football season kicks off with renewed optimism in both Nigeria and Ghana.</p><h2>Nigeria Professional Football League</h2><p>Enyimba International enters the season as defending champions, but Remo Stars and Rivers United are expected to challenge strongly.</p><h2>Ghana Premier League</h2><p>Asante Kotoko and Hearts of Oak remain the dominant forces, but Bibiani Goldstars have emerged as dark horses.</p><h2>Betting Angles</h2><p>Home advantage is significant in both leagues. Over 2.5 goals hit in approximately 55% of NPFL matches and 48% of GPL fixtures.</p>",
    category: "Sports Betting", country: "nigeria", tags: ["nigeria", "ghana", "npfl", "predictions"], readTime: 7, status: "published",
  },
  {
    title: "SA Gambling Regulator Introduces New Player Protection Rules 2026",
    slug: "sa-gambling-regulator-player-protection-rules-2026",
    excerpt: "The Western Cape Gambling and Racing Board has introduced mandatory deposit limits. Full breakdown of the new regulations.",
    content: "<p>South Africa's gambling regulatory landscape is shifting significantly in 2026.</p><h2>Key Changes</h2><p>Mandatory daily, weekly, and monthly deposit limits are now required for all licensed operators. Default limits are set at R5,000 daily, R20,000 weekly, and R50,000 monthly.</p><h2>Self-Exclusion Register</h2><p>A national self-exclusion register has been launched, allowing players to exclude themselves from all licensed operators simultaneously.</p><h2>Advertising Restrictions</h2><p>New advertising guidelines prohibit the targeting of self-excluded individuals and require responsible gambling messaging in all advertisements.</p>",
    category: "Industry News", country: "south-africa", tags: ["south-africa", "regulation", "player-protection"], readTime: 5, status: "published",
  },
  {
    title: "World Cup 2026 Final Prediction: Who Will Lift The Trophy",
    slug: "world-cup-2026-final-prediction-winner",
    excerpt: "An in-depth look at the final stages of the 2026 World Cup and our prediction for the nation most likely to win.",
    content: "<p>The 2026 FIFA World Cup has delivered one of the most exciting tournaments in recent memory.</p><h2>Tournament Favorites</h2><p>France and Brazil have been the most consistent performers. France's midfield depth has been exceptional. Brazil's attacking trident has scored 12 goals in 6 matches.</p><h2>Dark Horses</h2><p>Japan has been the tournament's surprise package, defeating Germany and Spain. Morocco remains dangerous.</p><h2>Our Prediction</h2><p>We predict a France vs Brazil final, with France winning 2-1 in extra time. Mbappe's big-game experience could be the decisive factor.</p>",
    category: "Sports Betting", country: "general", tags: ["world-cup", "2026", "prediction"], readTime: 6, status: "published",
  },
  {
    title: "Best Mobile Betting Apps in Kenya 2026: M-Pesa Friendly",
    slug: "best-mobile-betting-apps-kenya-2026",
    excerpt: "Compare Kenya's best mobile betting apps for 2026. M-Pesa integration, bonuses, UX, and ratings.",
    content: "<p>Mobile betting dominates the Kenyan market with over 85% of bets placed via smartphone.</p><h2>1. SportPesa App</h2><p>The gold standard. Clean interface, fast M-Pesa integration, live betting with real-time stats.</p><h2>2. Betika App</h2><p>Excels in simplicity and speed. One-tap betting, instant deposits via M-Pesa.</p><h2>3. Odibets App</h2><p>Popular for low minimum stake (KES 10) and free data promotions. Lightweight and battery-friendly.</p><h2>4. 1xBet App</h2><p>Most feature-rich with live streaming, cash-out, and extensive market coverage.</p><h2>5. Betway App</h2><p>Polished experience with clean design and reliable M-Pesa payouts.</p>",
    category: "Casino Reviews", country: "kenya", tags: ["kenya", "mobile", "apps", "mpesa"], readTime: 6, status: "published",
  },
  {
    title: "African Esports Betting Guide 2026: LoL, FIFA & Call of Duty",
    slug: "african-esports-betting-guide-2026",
    excerpt: "Esports betting is exploding in Africa. Guide to League of Legends, FIFA, and Call of Duty markets and tips.",
    content: "<p>Esports betting is one of the fastest-growing segments in African iGaming.</p><h2>Popular Esports in Africa</h2><p>FIFA leads the pack. League of Legends has a growing following in South Africa and Nigeria. Call of Duty mobile tournaments are gaining traction in Kenya and Ghana.</p><h2>Best Platforms</h2><p>1xBet offers the widest esports coverage with live streaming. Betway has dedicated esports sections.</p><h2>Betting Tips</h2><p>Research team form and roster changes. Follow regional leagues for better odds value.</p>",
    category: "Sports Betting", country: "general", tags: ["esports", "betting", "africa"], readTime: 6, status: "published",
  },
  {
    title: "Behind the Desk: How iGamingUbuntu Writes 500+ Articles a Year",
    slug: "behind-the-desk-igamingubuntu-500-articles",
    excerpt: "Meet the team behind iGamingUbuntu. How we research, write, and optimize content that ranks and converts.",
    content: "<p>iGamingUbuntu has published over 500 articles in the past year.</p><h2>Research Process</h2><p>Every article begins with market-specific research. We analyze local search trends and competitor content.</p><h2>Writing Standards</h2><p>Our writers are iGaming specialists. Every article goes through a two-stage editorial review.</p><h2>SEO Optimization</h2><p>We follow Google's E-E-A-T guidelines. Every article includes optimized meta titles, descriptions, and schema markup.</p>",
    category: "Industry News", country: "general", tags: ["igamingubuntu", "content", "seo"], readTime: 4, status: "published",
  },
  {
    title: "African Esports & Sports Betting Events Calendar 2026",
    slug: "african-esports-sports-betting-events-calendar-2026",
    excerpt: "Complete calendar of iGaming conferences, esports tournaments, and betting industry events across Africa in 2026.",
    content: "<p>Stay ahead with our comprehensive calendar of African iGaming and esports events for 2026.</p><h2>Q1 2026</h2><p>ICE Africa Conference (Cape Town, Feb 12-14). iGaming Africa Summit (Lagos, Mar 5-7). African Esports Championship (Nairobi, Mar 20-22).</p><h2>Q2 2026</h2><p>SBC Summit Africa (Johannesburg, Apr 22-24). Ghana Gaming Expo (Accra, May 8-10). Africa Esports League Finals (Lagos, Jun 15-17).</p><h2>Q3 2026</h2><p>African iGaming Summit (Nairobi, Jul 10-12). Sigma Africa (Cape Town, Aug 28-30).</p><h2>Q4 2026</h2><p>African Esports Awards (Lagos, Oct 5-7). iGaming Ubuntu Annual Summit (Nairobi, Nov 12-14).</p>",
    category: "Events", country: "general", tags: ["events", "conferences", "esports", "calendar"], readTime: 5, status: "published",
  },
]

export default function SeedPage() {
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleSeed = async () => {
    setLoading(true)
    setStatus("Seeding articles...")
    const db = getDb()
    if (!db) { setStatus("Firebase not initialized"); setLoading(false); return }

    try {
      let count = 0
      for (const article of articles) {
        await addDoc(collection(db, "articles"), {
          ...article,
          featuredImage: "",
          views: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        count++
        setStatus(`Seeded ${count}/${articles.length} articles...`)
      }
      setStatus(`Done! Seeded ${count} articles successfully.`)
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-4">Seed Database</h1>
        <p className="text-sm text-gray-500 mb-6">Click below to add 10 articles to Firestore.</p>
        <button
          onClick={handleSeed}
          disabled={loading}
          className="bg-[#f59e0b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d97706] transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Seeding..." : "Seed 10 Articles"}
        </button>
        {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
      </div>
    </div>
  )
}
