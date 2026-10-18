import { NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const articles = [
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
