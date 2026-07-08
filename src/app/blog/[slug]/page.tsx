import Link from "next/link"
import { formatDate } from "@/lib/utils"
import AdSlot from "@/components/AdSlot"
import Sidebar from "@/components/Sidebar"
import AffiliateBox from "@/components/AffiliateBox"
import type { Article } from "@/types"

const sampleArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina pulled off a stunning 3-2 comeback win over Egypt in the World Cup Round of 16. Full match report, highlights, and best betting odds for the quarterfinal.",
    category: "Sports Betting", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
    tags: ["World Cup", "Argentina", "Egypt", "Betting", "Odds"],
    readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848,
    content: `<p>Argentina pulled off a stunning comeback at the Mercedes-Benz Stadium in Atlanta, coming from 2-0 down to defeat Egypt 3-2 in a thrilling World Cup Round of 16 match that will be remembered as one of the tournament's greatest comebacks.</p>

<h2>Match Summary</h2>
<p>Egypt stunned the world champions with two first-half goals through Yasser Ibrahim (15') and Mostafa Ziko (67'), but Argentina roared back in the final 15 minutes in what felt like a scripted Hollywood finish.</p>

<p>Cristian Romero started the comeback in the 79th minute, Lionel Messi equalized from the penalty spot in the 83rd minute — remarkably after having a penalty saved earlier in the match — and Enzo Fernandez headed home the winner in the 90th+2 minute to send the Argentine fans into ecstasy.</p>

<h2>Key Match Moments</h2>
<ul>
<li><strong>15' — Yasser Ibrahim heads Egypt into a shock lead</strong> from a corner routine that caught the Argentine defense flat-footed</li>
<li><strong>67' — Mostafa Ziko doubles Egypt's advantage</strong> with a clinical finish after a swift counter-attack</li>
<li><strong>79' — Cristian Romero pulls one back</strong> for Argentina with a powerful header from a corner</li>
<li><strong>83' — Lionel Messi scores penalty</strong> to equalize after Romero was fouled in the box</li>
<li><strong>90+2' — Enzo Fernandez scores dramatic winner</strong> with a looping header from a cross by substitute Lautaro Martinez</li>
</ul>

<h2>What This Means for Betting</h2>
<p>Argentina advance to the quarterfinals and are now among the favorites to win the tournament. For bettors looking at the next round, Argentina's odds have shortened significantly to around 3.50 to win the tournament outright.</p>

<p>Egypt, despite the loss, showed they can compete with the world's best. Their defensive organization and counter-attacking threat make them a team to watch in future tournaments — value bettors should keep them on their radar for the 2026 African Cup of Nations.</p>

<h2>Argentina Quarterfinal Betting Tips</h2>
<p>If you're looking to bet on Argentina's next match, consider these markets: <strong>Argentina to qualify</strong> (short odds but safe), <strong>both teams to score</strong> (Argentina's defense has looked vulnerable in both knockout matches), or <strong>over 2.5 goals</strong> (their matches are consistently high-scoring affairs).</p>

<p>The best value bet could be backing Argentina to win with both teams scoring, which has paid out in each of their last three matches.</p>

<h2>Where to Bet on the World Cup</h2>
<p>The best betting sites for World Cup 2026 offer competitive odds, live betting, and quick payouts via M-Pesa and other local payment methods. We recommend comparing odds across multiple operators to get the best value for your bets.</p>

<p>Live betting during matches offers particularly good opportunities, especially for markets like "next goalscorer" and "exact score" which see significant in-play odds movements.</p>

<h2>Responsible Gambling</h2>
<p>Always bet responsibly. Set deposit limits, never chase losses, and remember that gambling should be entertainment, not a way to make money. If you need help, contact responsible gambling organizations in your country.</p>`,
    createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews",
    excerpt: "Best online casinos in Kenya reviewed.",
    category: "Casino Reviews", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&q=80",
    tags: ["Kenya", "Casino"], readTime: 8, author: "iGamingUbuntu",
    status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim",
    excerpt: "Guide to claiming SportPesa's bonus.",
    category: "Bonuses", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    tags: ["SportPesa", "Bonus"], readTime: 5, author: "iGamingUbuntu",
    status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
]

const affiliateOffers = [
  { operatorName: "SportPesa", bonusText: "200% Welcome Bonus up to KES 5,000 — M-Pesa Accepted", url: "https://sportpesa.com/?ref=igamingubuntu" },
  { operatorName: "1xBet", bonusText: "100% Deposit Bonus + $100 Free Bet + Live Streaming", url: "https://1xbet.com/?btag=igamingubuntu" },
  { operatorName: "Betika", bonusText: "Free Bet on First Deposit + Instant M-Pesa Withdrawals", url: "https://betika.com/?aff=igamingubuntu" },
  { operatorName: "Betway", bonusText: "Up to $50 in Free Bets — Trusted Global Brand, Local Support", url: "https://betway.com/?aff=igamingubuntu" },
  { operatorName: "22Bet", bonusText: "100% Welcome Bonus + Daily Enhanced Odds on Major Leagues", url: "https://22bet.com/?btag=igamingubuntu" },
]

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = sampleArticles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-fade-up">
        <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Article Not Found</h1>
        <p className="text-text-secondary">The article you're looking for doesn't exist or has been moved.</p>
        <Link href="/blog" className="inline-block mt-4 text-ubuntu-orange font-medium hover:underline">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0">
          <nav className="text-sm text-text-muted mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-ubuntu-orange transition">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-ubuntu-orange transition">Blog</Link>
            <span>›</span>
            <Link href={`/blog?category=${article.category}`} className="hover:text-ubuntu-orange transition">{article.category}</Link>
          </nav>

          <div className="flex items-center gap-3 text-sm text-text-muted mb-4 flex-wrap">
            <span className="bg-ubuntu-orange/10 text-ubuntu-orange px-3 py-0.5 rounded-full font-medium">{article.category}</span>
            <span>{formatDate(article.createdAt)}</span>
            <span>· {article.readTime} min read</span>
            <span>· <span className="flex items-center gap-1 inline-flex"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>{article.views.toLocaleString()}</span></span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-8">{article.title}</h1>

          <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-md relative">
            {article.featuredImage ? (
              <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ubuntu-orange/20 to-ubuntu-purple/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-ubuntu-orange/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
              <div className="flex items-center gap-2 text-white text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span className="font-medium">Match Highlights</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-4 [&_h2]:text-text-primary [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_li]:leading-relaxed [&_strong]:text-text-primary" 
            dangerouslySetInnerHTML={{ __html: article.content }} />

          <AdSlot position="in-content-1" className="my-8" />

          <AffiliateBox title="Best Odds for Argentina's Quarterfinal" offers={affiliateOffers.slice(0, 3)} />

          <div className="bg-card rounded-xl p-6 my-8">
            <h3 className="font-bold text-text-primary mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleArticles.filter((a) => a.slug !== slug).slice(0, 3).map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block bg-white rounded-lg p-4 hover:shadow-md transition-all border border-border">
                  <p className="text-sm font-medium text-text-primary group-hover:text-ubuntu-orange transition-colors line-clamp-2">{related.title}</p>
                  <div className="flex items-center gap-2 text-xs text-text-muted mt-2">
                    <span>{related.category}</span>
                    <span>· {related.readTime} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <AdSlot position="in-content-2" className="my-8" />

          <AffiliateBox title="Top Betting Sites for World Cup 2026" offers={affiliateOffers} />

          <div className="flex flex-wrap gap-2 my-8">
            {article.tags.map((tag) => (
              <Link key={tag} href={`/blog?search=${tag}`} className="bg-card text-text-secondary px-3 py-1.5 rounded-full text-sm hover:bg-ubuntu-orange/10 hover:text-ubuntu-orange transition">
                #{tag}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-border pt-6">
            <span className="text-sm font-medium text-text-primary">Share this article:</span>
            {[
              { label: "Twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://nasheta-john.vercel.app/blog/${article.slug}`)}` },
              { label: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nasheta-john.vercel.app/blog/${article.slug}`)}` },
              { label: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(`${article.title} https://nasheta-john.vercel.app/blog/${article.slug}`)}` },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener" className="bg-card text-sm text-text-secondary px-3 py-1.5 rounded-lg hover:bg-ubuntu-orange/10 hover:text-ubuntu-orange transition">
                {s.label}
              </a>
            ))}
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ubuntu-orange to-ubuntu-purple flex items-center justify-center text-white font-bold text-xl shrink-0">
                IG
              </div>
              <div className="flex-1">
                <p className="font-bold text-text-primary">iGamingUbuntu</p>
                <p className="text-sm text-text-secondary">iGaming Content & Affiliate Partner — Africa</p>
                <p className="text-xs text-text-muted mt-1">
                  Published {formatDate(article.createdAt)} · Updated {formatDate(article.updatedAt)}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-4 leading-relaxed">
              This article contains affiliate links. We may earn a commission when you sign up through our links at no extra cost to you.
              All opinions, reviews, and recommendations are our own based on independent research and expertise.
              <span className="text-ubuntu-red font-medium"> Please gamble responsibly. 18+.</span>
            </p>
          </div>
        </article>

        <aside className="w-full lg:w-80 shrink-0">
          <Sidebar popularPosts={sampleArticles} />
        </aside>
      </div>
    </div>
  )
}
