import { NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const articles = [
  {
    title: "Ghana iGaming Conference 2026: Key Takeaways from Accra",
    slug: "ghana-igaming-conference-2026-key-takeaways",
    excerpt: "Highlights from the 2026 Ghana iGaming Conference in Accra. Key speakers, regulatory updates, and networking takeaways for African operators.",
    content: "<p>The 2026 Ghana iGaming Conference brought together over 500 industry professionals from across Africa and beyond. Held at the Accra International Conference Centre, the event focused on the rapidly evolving regulatory landscape and opportunities in West African markets.</p><h2>Key Speakers</h2><p>Opening remarks were delivered by the Gaming Commission of Ghana chairman, who outlined the country's new licensing framework expected to take effect in Q3 2026. The framework aims to streamline operator registration while strengthening player protection measures.</p><h2>Regulatory Updates</h2><p>Ghana's new gaming bill was a major talking point. The legislation introduces tiered licensing, mandatory responsible gambling tools, and a unified player self-exclusion register. Operators already licensed in Kenya or Nigeria can expect a simplified application process under mutual recognition provisions.</p><h2>Market Opportunities</h2><p>Mobile money integration continues to drive growth. With over 70% of Ghanaian bettors using MTN MoMo for deposits, operators without seamless mobile payment integration are losing market share. Several speakers highlighted the opportunity in esports betting, particularly among 18-25 year olds.</p><h2>Networking Highlights</h2><p>The conference featured dedicated networking sessions for operators, affiliates, and technology providers. Several partnership agreements were reportedly signed on the sidelines, particularly between Nigerian operators and Ghanaian payment processors.</p>",
    category: "Events",
    country: "ghana",
    featuredImage: "",
    tags: ["ghana", "conference", "regulation", "west-africa", "mobile-money"],
    readTime: 5,
    status: "published",
  },
  {
    title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews & Bonuses",
    slug: "top-5-online-casinos-kenya-2026",
    excerpt: "We review the best online casinos in Kenya for 2026. Compare bonuses, game selection, M-Pesa support, and our expert ratings.",
    content: "<p>Kenya's online casino market continues to grow rapidly, with new operators entering and established brands expanding their offerings. We tested and reviewed dozens of platforms to bring you the top 5 for 2026.</p><h2>1. Betika Casino</h2><p>Betika remains the most popular casino platform in Kenya. With over 500 slots, live dealer games from Evolution Gaming, and instant M-Pesa withdrawals, it sets the standard. New players get a 100% welcome bonus up to KES 5,000.</p><h2>2. SportPesa Casino</h2><p>SportPesa's casino offering has expanded significantly. The platform now features exclusive jackpot slots and a dedicated live casino section. M-Pesa integration is seamless with withdrawals processed in under 30 minutes.</p><h2>3. 1xBet Kenya</h2><p>1xBet offers the widest game selection with over 2,000 titles from 50+ providers. The platform supports M-Pesa, Airtel Money, and bank transfers. Welcome bonus: 100% up to KES 15,000 plus 150 free spins.</p><h2>4. Melbet Kenya</h2><p>Melbet has carved out a niche with its generous cashback program. Weekly 10% cashback on losses, plus a VIP program with dedicated account managers. Game library exceeds 1,500 titles.</p><h2>5. Betway Casino</h2><p>Betway's global reputation translates well to Kenya. The platform excels in live dealer games and progressive jackpots. KYC verification is streamlined, and M-Pesa payouts are reliable.</p>",
    category: "Casino Reviews",
    country: "kenya",
    featuredImage: "",
    tags: ["kenya", "casino", "reviews", "mpesa", "bonuses"],
    readTime: 8,
    status: "published",
  },
  {
    title: "SportPesa Welcome Bonus 2026: How to Claim Your 200% Match",
    slug: "sportpesa-welcome-bonus-2026-guide",
    excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus. Get 200% up to KES 5,000 on your first deposit.",
    content: "<p>SportPesa's 2026 welcome bonus is one of the most generous in the Kenyan market. Here's exactly how to claim it and what to watch out for.</p><h2>Bonus Details</h2><p>The current SportPesa welcome offer provides a 200% match on your first deposit, up to a maximum of KES 5,000. This means a KES 2,500 deposit gives you KES 7,500 to play with. The minimum qualifying deposit is KES 100.</p><h2>Step-by-Step Guide</h2><p>1. Register a new SportPesa account via the app or website. 2. Complete KYC verification (national ID required). 3. Make your first deposit via M-Pesa. 4. The bonus is credited automatically within 5 minutes. 5. Start betting with your combined deposit and bonus balance.</p><h2>Wagering Requirements</h2><p>The bonus comes with a 5x wagering requirement on sports bets at odds of 1.5 or higher. Casino games contribute 20% toward wagering. You have 30 days to meet the requirements before the bonus expires.</p><h2>Pro Tips</h2><p>Focus on single bets rather than accumulators to clear wagering efficiently. Target sports you know well, and avoid chasing losses with the bonus balance. The 30-day window is generous — use it wisely.</p>",
    category: "Bonuses",
    country: "kenya",
    featuredImage: "",
    tags: ["sportpesa", "bonus", "kenya", "welcome-offer", "mpesa"],
    readTime: 5,
    status: "published",
  },
  {
    title: "Nigeria vs Ghana: NPFL vs Ghana Premier League Predictions 2026/27",
    slug: "nigeria-vs-ghana-premier-league-predictions-2026",
    excerpt: "NPFL vs Ghana Premier League betting predictions for the new season. Best odds, transfers, and expert tips for both leagues.",
    content: "<p>The 2026/27 West African football season kicks off with renewed optimism in both Nigeria and Ghana. We break down the title races, key transfers, and betting opportunities in both leagues.</p><h2>Nigeria Professional Football League</h2><p>Enyimba International enters the season as defending champions, but Remo Stars and Rivers United are expected to challenge strongly. The NPFL has seen increased investment, with several clubs securing foreign coaching appointments.</p><h2>Ghana Premier League</h2><p>Asante Kotoko and Hearts of Oak remain the dominant forces, but Bibiani Goldstars have emerged as dark horses after a strong 2025/26 campaign. The GPL's youth development focus is producing exciting talent.</p><h2>Head-to-Head Comparison</h2><p>NPFL clubs generally have deeper squads and higher budgets, while GPL teams rely more on tactical discipline and home advantage. In continental competition, Nigerian clubs have outperformed Ghanaian counterparts in recent years.</p><h2>Betting Angles</h2><p>Home advantage is significant in both leagues. Over 2.5 goals hit in approximately 55% of NPFL matches and 48% of GPL fixtures. Both teams to score markets offer value in mid-table clashes.</p>",
    category: "Sports Betting",
    country: "nigeria",
    featuredImage: "",
    tags: ["nigeria", "ghana", "npfl", "premier-league", "predictions"],
    readTime: 7,
    status: "published",
  },
  {
    title: "SA Gambling Regulator Introduces New Player Protection Rules 2026",
    slug: "sa-gambling-regulator-player-protection-rules-2026",
    excerpt: "The Western Cape Gambling and Racing Board has introduced mandatory deposit limits. Full breakdown of the new regulations.",
    content: "<p>South Africa's gambling regulatory landscape is shifting significantly in 2026, with the Western Cape Gambling and Racing Board leading the charge on player protection reforms.</p><h2>Key Changes</h2><p>Mandatory daily, weekly, and monthly deposit limits are now required for all licensed operators. Default limits are set at R5,000 daily, R20,000 weekly, and R50,000 monthly. Players can request increases, but operators must implement a 72-hour cooling-off period before any limit increase takes effect.</p><h2>Self-Exclusion Register</h2><p>A national self-exclusion register has been launched, allowing players to exclude themselves from all licensed operators simultaneously. The register is integrated with the National Credit Bureau to prevent problem gamblers from accessing credit for gambling purposes.</p><h2>Advertising Restrictions</h2><p>New advertising guidelines prohibit the targeting of self-excluded individuals and require all gambling advertisements to include responsible gambling messaging. Celebrity endorsements are now restricted to products the endorser has personally used.</p><h2>Impact on Operators</h2><p>Compliance costs are expected to increase by 15-20% for most operators. However, industry bodies argue that these measures will improve long-term sustainability and public trust in the sector.</p>",
    category: "Industry News",
    country: "south-africa",
    featuredImage: "",
    tags: ["south-africa", "regulation", "player-protection", "deposit-limits"],
    readTime: 5,
    status: "published",
  },
  {
    title: "World Cup 2026 Final Prediction: Who Will Lift The Trophy",
    slug: "world-cup-2026-final-prediction-winner",
    excerpt: "An in-depth look at the final stages of the 2026 World Cup, tactical battles, and our prediction for the nation most likely to win.",
    content: "<p>The 2026 FIFA World Cup, hosted across the United States, Canada, and Mexico, has delivered one of the most exciting tournaments in recent memory. As we approach the final, we analyze the remaining contenders and make our prediction.</p><h2>Tournament Favorites</h2><p>France and Brazil have been the most consistent performers throughout the tournament. France's midfield depth, led by Aurelien Tchouameni and Eduardo Camavinga, has been exceptional. Brazil's attacking trident of Vinicius Jr, Rodrygo, and Endrick has scored 12 goals in 6 matches.</p><h2>Dark Horses</h2><p>Japan has been the tournament's surprise package, defeating Germany and Spain en route to the quarterfinals. Their tactical discipline and quick transitions have troubled European sides. Morocco, building on their 2022 heroics, remain dangerous.</p><h2>Key Tactical Battles</h2><p>The potential France vs Brazil final would pit France's structured defense against Brazil's creative attack. Midfield control will be decisive — whichever team wins the battle in the center of the park will likely lift the trophy.</p><h2>Our Prediction</h2><p>Based on form, squad depth, and tactical flexibility, we predict a France vs Brazil final, with France winning 2-1 in extra time. Kylian Mbappe's big-game experience could be the decisive factor.</p>",
    category: "Sports Betting",
    country: "general",
    featuredImage: "",
    tags: ["world-cup", "2026", "prediction", "football", "france", "brazil"],
    readTime: 6,
    status: "published",
  },
  {
    title: "Best Mobile Betting Apps in Kenya 2026: M-Pesa Friendly",
    slug: "best-mobile-betting-apps-kenya-2026",
    excerpt: "Compare Kenya's best mobile betting apps for 2026. M-Pesa integration, bonuses, UX, and ratings for SportPesa, Betika, Odibets and more.",
    content: "<p>Mobile betting dominates the Kenyan market, with over 85% of bets placed via smartphone. We tested every major betting app to find the best options for 2026.</p><h2>1. SportPesa App</h2><p>The gold standard for Kenyan betting apps. Clean interface, fast M-Pesa integration, live betting with real-time stats, and push notifications for match updates. Available on Android and iOS.</p><h2>2. Betika App</h2><p>Betika's app excels in simplicity and speed. One-tap betting, instant deposits via M-Pesa, and a dedicated jackpot section. The app works well even on low-end devices and slow connections.</p><h2>3. Odibets App</h2><p>Popular among casual bettors for its low minimum stake (KES 10) and free data promotions. The app is lightweight and doesn't consume much battery. M-Pesa integration is seamless.</p><h2>4. 1xBet App</h2><p>The most feature-rich app with live streaming, cash-out, and extensive market coverage. M-Pesa supported for both deposits and withdrawals. The interface can feel cluttered for new users.</p><h2>5. Betway App</h2><p>Betway's app offers a polished experience with clean design and reliable M-Pesa payouts. The cash-out feature is particularly well-implemented, allowing partial cash-out on accumulators.</p>",
    category: "Casino Reviews",
    country: "kenya",
    featuredImage: "",
    tags: ["kenya", "mobile", "apps", "mpesa", "betting"],
    readTime: 6,
    status: "published",
  },
  {
    title: "African Esports Betting Guide 2026: LoL, FIFA & Call of Duty",
    slug: "african-esports-betting-guide-2026",
    excerpt: "Esports betting is exploding in Africa. Guide to League of Legends, FIFA, and Call of Duty markets, best sites, and tips.",
    content: "<p>Esports betting is one of the fastest-growing segments in African iGaming. With young, tech-savvy populations and increasing internet access, the continent is primed for explosive growth in this sector.</p><h2>Popular Esports in Africa</h2><p>FIFA (EA Sports FC) leads the pack, reflecting football's dominance on the continent. League of Legends has a growing following, particularly in South Africa and Nigeria. Call of Duty mobile tournaments are gaining traction in Kenya and Ghana.</p><h2>Best Platforms for Esports Betting</h2><p>1xBet offers the widest esports coverage with live streaming. Betway has dedicated esports sections with competitive odds. SportPesa has begun integrating esports into its mobile platform.</p><h2>Betting Tips</h2><p>Research team form and roster changes — esports teams frequently shuffle players. Follow regional leagues for better odds value. Live betting on FIFA matches offers quick results and exciting markets.</p><h2>Regulatory Landscape</h2><p>Esports betting regulation varies by country. South Africa and Kenya have clear frameworks, while other markets are still developing their approach. Always check local regulations before placing esports bets.</p>",
    category: "Sports Betting",
    country: "general",
    featuredImage: "",
    tags: ["esports", "betting", "africa", "fifa", "league-of-legends"],
    readTime: 6,
    status: "published",
  },
  {
    title: "Behind the Desk: How iGamingUbuntu Writes 500+ Articles a Year",
    slug: "behind-the-desk-igamingubuntu-500-articles",
    excerpt: "Meet the team behind iGamingUbuntu. How we research, write, and optimize iGaming content that ranks and converts across Africa.",
    content: "<p>iGamingUbuntu has published over 500 articles in the past year, covering every African iGaming market. Here's how we do it.</p><h2>Research Process</h2><p>Every article begins with market-specific research. We analyze local search trends, competitor content, and regulatory updates to identify topics that will rank and provide genuine value to readers.</p><h2>Writing Standards</h2><p>Our writers are iGaming specialists, not generalists. Each writer focuses on specific markets and topics, ensuring deep expertise. Every article goes through a two-stage editorial review before publication.</p><h2>SEO Optimization</h2><p>We follow Google's E-E-A-T guidelines for YMYL content. Every article includes optimized meta titles, descriptions, heading structure, internal links, and schema markup. We track rankings weekly and update content as needed.</p><h2>Conversion Focus</h2><p>Content is designed to convert, not just inform. Strategic affiliate link placement, compelling CTAs, and comparison tables help readers make informed decisions while generating revenue for our partners.</p><h2>Content Calendar</h2><p>We maintain a rolling 30-day content calendar aligned with major sporting events, regulatory changes, and seasonal trends. This ensures timely, relevant content that captures search traffic at the right moment.</p>",
    category: "Industry News",
    country: "general",
    featuredImage: "",
    tags: ["igamingubuntu", "content", "seo", "editorial", "process"],
    readTime: 4,
    status: "published",
  },
  {
    title: "African Esports & Sports Betting Events Calendar 2026",
    slug: "african-esports-sports-betting-events-calendar-2026",
    excerpt: "Complete calendar of iGaming conferences, esports tournaments, and betting industry events across Africa in 2026.",
    content: "<p>Stay ahead of the curve with our comprehensive calendar of African iGaming and esports events for 2026.</p><h2>Q1 2026 (January - March)</h2><p>ICE Africa Conference (Cape Town, Feb 12-14) — The continent's largest iGaming exhibition. iGaming Africa Summit (Lagos, Mar 5-7) — Focus on West African markets. African Esports Championship (Nairobi, Mar 20-22) — Featuring FIFA, LoL, and CS2 tournaments.</p><h2>Q2 2026 (April - June)</h2><p>SBC Summit Africa (Johannesburg, Apr 22-24) — Sports betting focus. Ghana Gaming Expo (Accra, May 8-10) — West African regulatory showcase. Africa Esports League Finals (Lagos, Jun 15-17) — Season championship event.</p><h2>Q3 2026 (July - September)</h2><p>African iGaming Summit (Nairobi, Jul 10-12) — East African market focus. Sigma Africa (Cape Town, Aug 28-30) — Technology and innovation. ECOWAS Gaming Conference (Abuja, Sep 18-20) — West African regulatory forum.</p><h2>Q4 2026 (October - December)</h2><p>African Esports Awards (Lagos, Oct 5-7) — Celebrating continental talent. iGaming Ubuntu Annual Summit (Nairobi, Nov 12-14) — Our flagship event. Africa Betting & Casino Summit (Cape Town, Dec 3-5) — Year-end review and outlook.</p>",
    category: "Events",
    country: "general",
    featuredImage: "",
    tags: ["events", "conferences", "esports", "calendar", "africa"],
    readTime: 5,
    status: "published",
  },
]

export async function POST() {
  const fb = getDb()
  if (!fb) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 })

  try {
    const results = []
    for (const article of articles) {
      const docRef = await addDoc(collection(fb, "articles"), {
        ...article,
        views: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      results.push({ id: docRef.id, title: article.title })
    }
    return NextResponse.json({ success: true, count: results.length, articles: results })
  } catch (error) {
    return NextResponse.json({ error: "Failed to seed articles" }, { status: 500 })
  }
}
