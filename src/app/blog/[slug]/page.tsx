import Link from "next/link"
import { formatDate } from "@/lib/utils"
import AdSlot from "@/components/AdSlot"
import Sidebar from "@/components/Sidebar"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article, AffiliateLink } from "@/types"

const sampleArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina came from 2-0 down to beat Egypt 3-2 in a thrilling World Cup Round of 16 match.",
    category: "Sports Betting", country: "kenya", featuredImage: "", tags: ["World Cup", "Argentina", "Egypt", "Betting"],
    readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848,
    content: `<p>Argentina pulled off a stunning comeback at the Mercedes-Benz Stadium in Atlanta, coming from 2-0 down to defeat Egypt 3-2 in the World Cup Round of 16.</p>
<p>Egypt stunned the world champions with two first-half goals through Yasser Ibrahim (15') and Mostafa Ziko (67'), but Argentina roared back in the final 15 minutes.</p>
<p>Cristian Romero started the comeback in the 79th minute, Lionel Messi equalized from the penalty spot in the 83rd minute (after having a penalty saved earlier), and Enzo Fernandez headed home the winner in the 90th+2 minute.</p>
<h2>Key Match Moments</h2>
<ul>
<li>15' — Yasser Ibrahim heads Egypt into a shock lead</li>
<li>67' — Mostafa Ziko doubles Egypt's advantage</li>
<li>79' — Cristian Romero pulls one back for Argentina</li>
<li>83' — Lionel Messi scores penalty to equalize</li>
<li>90+2' — Enzo Fernandez scores dramatic winner</li>
</ul>
<h2>What This Means for Betting</h2>
<p>Argentina advance to the quarterfinals and are now among the favorites to win the tournament. For bettors looking at the next round, Argentina's odds have shortened significantly.</p>
<p>Egypt, despite the loss, showed they can compete with the world's best. Their defensive organization and counter-attacking threat make them a team to watch in future tournaments.</p>
<h2>Betting Tips for Argentina's Quarterfinal</h2>
<p>If you're looking to bet on Argentina's next match, consider these markets: Argentina to qualify (short odds but safe), both teams to score (Argentina's defense has looked vulnerable), or over 2.5 goals (their matches are consistently high-scoring).</p>
<h2>Where to Bet on the World Cup</h2>
<p>The best betting sites for World Cup 2026 offer competitive odds, live betting, and quick payouts. We recommend comparing odds across multiple operators to get the best value.</p>
<h2>Responsible Gambling</h2>
<p>Always bet responsibly. Set deposit limits, never chase losses, and remember that gambling should be entertainment, not a way to make money. If you need help, contact responsible gambling organizations in your country.</p>`,
    createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
]

const affiliateOffers = [
  { operatorName: "SportPesa", bonusText: "200% Welcome Bonus up to KES 5,000", url: "https://sportpesa.com/?ref=igamingubuntu" },
  { operatorName: "1xBet", bonusText: "100% First Deposit Bonus + $100 Free Bet", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "Betika", bonusText: "Free Bet on First Deposit + M-Pesa Accepted", url: "https://betika.com/?aff=igamingubuntu" },
  { operatorName: "Betway", bonusText: "Up to $50 in Free Bets for New Players", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "22Bet", bonusText: "100% Welcome Bonus + Daily Enhanced Odds", url: "https://22bet.com/?btag=igamingubuntu" },
]

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = sampleArticles.find((a) => a.slug === slug) || sampleArticles[0]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0">
          <div className="text-sm text-text-muted mb-4">
            <Link href="/" className="hover:text-ubuntu-orange">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-ubuntu-orange">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-text-secondary">{article.category}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
            <span className="bg-ubuntu-orange/10 text-ubuntu-orange px-2 py-0.5 rounded font-medium">{article.category}</span>
            <span>{formatDate(article.createdAt)}</span>
            <span>· {article.readTime} min read</span>
            <span>· {article.views} views</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-6">{article.title}</h1>

          <div className="aspect-[2/1] bg-card rounded-xl mb-8 flex items-center justify-center">
            {article.featuredImage ? (
              <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <span className="text-text-muted text-sm">Featured Image</span>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary" dangerouslySetInnerHTML={{ __html: article.content }} />

          <AdSlot position="in-content-1" />

          <AffiliateBox title="🎰 Best Odds for Argentina's Quarterfinal" offers={affiliateOffers.slice(0, 3)} />

          <AdSlot position="in-content-2" />

          <AffiliateBox title="🏆 Top Betting Sites for World Cup 2026" offers={affiliateOffers} />

          <div className="flex flex-wrap gap-2 mt-8 mb-8">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-card text-text-secondary px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="border-t border-border pt-6 mt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ubuntu-purple flex items-center justify-center text-white font-bold text-lg">
                IG
              </div>
              <div>
                <p className="font-bold text-text-primary">iGamingUbuntu</p>
                <p className="text-sm text-text-secondary">iGaming Content & Affiliate Partner — Africa</p>
              </div>
            </div>
            <p className="text-sm text-text-muted mt-4">
              This article contains affiliate links. We may earn a commission when you sign up through our links.
              All opinions are our own. Please gamble responsibly. 18+.
            </p>
          </div>

          <div className="border-t border-border pt-6 mt-8">
            <h3 className="font-bold text-text-primary mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleArticles.filter((a) => a.slug !== slug).slice(0, 3).map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="block bg-card rounded-lg p-4 hover:shadow-md transition">
                  <p className="text-sm font-medium text-text-primary hover:text-ubuntu-orange transition line-clamp-2">{related.title}</p>
                  <p className="text-xs text-text-muted mt-2">{related.readTime} min read</p>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="w-full lg:w-80 shrink-0">
          <Sidebar popularPosts={sampleArticles} />
        </aside>
      </div>
    </div>
  )
}
