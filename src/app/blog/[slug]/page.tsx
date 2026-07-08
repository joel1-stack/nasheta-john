"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { formatDate } from "@/lib/utils"
import AdSlot from "@/components/AdSlot"
import Sidebar from "@/components/Sidebar"
import AffiliateBox from "@/components/AffiliateBox"
import { getArticleBySlug, getAllPublishedArticles } from "@/lib/firestoreService"
import type { Article } from "@/types"

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [popular, setPopular] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    Promise.all([
      getArticleBySlug(slug),
      getAllPublishedArticles(),
    ]).then(([found, all]) => {
      setArticle(found)
      if (found) {
        setRelated(all.filter(a => a.slug !== slug && a.category === found.category).slice(0, 3))
      }
      setPopular([...all].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="aspect-[2/1] bg-gray-200 rounded-2xl" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-fade-up">
        <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Article Not Found</h1>
        <p className="text-text-secondary">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/blog" className="inline-block mt-4 text-ubuntu-orange font-medium hover:underline">&larr; Back to Blog</Link>
      </div>
    )
  }

  const affiliateOffers = [
    { operatorName: "SportPesa", bonusText: "200% Welcome Bonus up to KES 5,000 — M-Pesa Accepted", url: "https://sportpesa.com/?ref=igamingubuntu" },
    { operatorName: "1xBet", bonusText: "100% Deposit Bonus + $100 Free Bet + Live Streaming", url: "https://1xbet.com/?btag=igamingubuntu" },
    { operatorName: "Betika", bonusText: "Free Bet on First Deposit + Instant M-Pesa Withdrawals", url: "https://betika.com/?aff=igamingubuntu" },
    { operatorName: "Betway", bonusText: "Up to $50 in Free Bets — Trusted Global Brand, Local Support", url: "https://betway.com/?aff=igamingubuntu" },
    { operatorName: "22Bet", bonusText: "100% Welcome Bonus + Daily Enhanced Odds on Major Leagues", url: "https://22bet.com/?btag=igamingubuntu" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0">
          <nav className="text-sm text-text-muted mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-ubuntu-orange transition">Home</Link>
            <span>&rsaquo;</span>
            <Link href="/blog" className="hover:text-ubuntu-orange transition">Blog</Link>
            <span>&rsaquo;</span>
            <Link href={`/blog?category=${article.category}`} className="hover:text-ubuntu-orange transition">{article.category}</Link>
          </nav>

          <div className="flex items-center gap-3 text-sm text-text-muted mb-4 flex-wrap">
            <span className="bg-ubuntu-orange/10 text-ubuntu-orange px-3 py-0.5 rounded-full font-medium">{article.category}</span>
            <span>{formatDate(article.createdAt)}</span>
            <span>&middot; {article.readTime} min read</span>
            <span>&middot; <span className="flex items-center gap-1 inline-flex">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {article.views?.toLocaleString() || 0}
            </span></span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-8">{article.title}</h1>

          <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-md relative">
            {article.featuredImage ? (
              <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ubuntu-orange/20 to-ubuntu-purple/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-ubuntu-orange/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-4 [&_h2]:text-text-primary [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_li]:leading-relaxed [&_strong]:text-text-primary"
            dangerouslySetInnerHTML={{ __html: article.content || "" }} />

          <AdSlot position="in-content-1" className="my-8" />

          <AffiliateBox title="Best Odds & Betting Offers" offers={affiliateOffers.slice(0, 3)} />

          {related.length > 0 && (
            <div className="bg-card rounded-xl p-6 my-8">
              <h3 className="font-bold text-text-primary mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group block bg-white rounded-lg p-4 hover:shadow-md transition-all border border-border">
                    <p className="text-sm font-medium text-text-primary group-hover:text-ubuntu-orange transition-colors line-clamp-2">{r.title}</p>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-2">
                      <span>{r.category}</span>
                      <span>&middot; {r.readTime} min</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <AdSlot position="in-content-2" className="my-8" />

          <AffiliateBox title="Top Betting Sites" offers={affiliateOffers} />

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 my-8">
              {article.tags.map((tag) => (
                <Link key={tag} href={`/blog?search=${tag}`} className="bg-card text-text-secondary px-3 py-1.5 rounded-full text-sm hover:bg-ubuntu-orange/10 hover:text-ubuntu-orange transition">
                  #{tag}
                </Link>
              ))}
            </div>
          )}

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
                <p className="text-sm text-text-secondary">iGaming Content & Affiliate Partner &mdash; Africa</p>
                <p className="text-xs text-text-muted mt-1">
                  Published {formatDate(article.createdAt)} &middot; Updated {formatDate(article.updatedAt)}
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
          <Sidebar popularPosts={popular} />
        </aside>
      </div>
    </div>
  )
}
