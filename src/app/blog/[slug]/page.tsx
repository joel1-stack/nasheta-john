"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { formatDate } from "@/lib/utils"
import AdSlot from "@/components/AdSlot"
import Sidebar from "@/components/Sidebar"
import AffiliateBox from "@/components/AffiliateBox"
import AffiliateBanner from "@/components/AffiliateBanner"
import { getArticleBySlug, incrementViews, getAffiliateLinks } from "@/lib/firestoreService"
import type { Article } from "@/types"

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [popular, setPopular] = useState<Article[]>([])
  const [affiliateLinks, setAffiliateLinks] = useState<{ operatorName: string; bonusText: string; url: string; linkId: string; imageUrl?: string; ctaLabel?: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    if (!slug) return
    getArticleBySlug(slug).then((found) => {
      setArticle(found)
      if (found) {
        setViewCount((found.views || 0) + 1)
        incrementViews(found.id).catch(() => {})

        getAffiliateLinks(found.id).then((links) => {
          setAffiliateLinks(links.map((l) => ({
            operatorName: l.operatorName,
            bonusText: l.bonusText,
            url: l.url,
            linkId: l.id,
            imageUrl: l.imageUrl || undefined,
            ctaLabel: l.ctaLabel || undefined,
          })))
        }).catch(() => {})

        fetch(`/api/blog?action=related&category=${encodeURIComponent(found.category)}&slug=${slug}`)
          .then((r) => r.json())
          .then((d) => setRelated(d.articles || []))
          .catch(() => {})
      }
    }).catch(() => {}).finally(() => setLoading(false))

    // Fetch popular articles
    fetch("/api/blog?action=popular")
      .then((r) => r.json())
      .then((d) => setPopular(d.articles || []))
      .catch(() => {})
  }, [slug])

  useEffect(() => {
    if (article) {
      document.title = article.seoTitle || `${article.title} | iGamingUbuntu`
    }
  }, [article])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in bg-white min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 animate-pulse space-y-6">
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="aspect-[16/9] bg-gray-100 rounded-lg" />
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-10 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-fade-up bg-white min-h-screen">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h1 className="text-2xl font-bold text-[#1A1F2B] mb-2">Article Not Found</h1>
        <p className="text-[#6B7280]">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/blog" className="inline-block mt-4 text-[#22C55E] font-medium hover:underline">&larr; Back to Blog</Link>
      </div>
    )
  }

  const fallbackOffers = [
    { operatorName: "SportPesa", bonusText: "200% Welcome Bonus up to KES 5,000, M-Pesa Accepted", url: "https://sportpesa.com/?ref=igamingubuntu" },
    { operatorName: "1xBet", bonusText: "100% Deposit Bonus + $100 Free Bet + Live Streaming", url: "https://1xbet.com/?btag=igamingubuntu" },
    { operatorName: "Betika", bonusText: "Free Bet on First Deposit + Instant M-Pesa Withdrawals", url: "https://betika.com/?aff=igamingubuntu" },
    { operatorName: "Betway", bonusText: "Up to $50 in Free Bets, Trusted Global Brand, Local Support", url: "https://betway.com/?aff=igamingubuntu" },
    { operatorName: "22Bet", bonusText: "100% Welcome Bonus + Daily Enhanced Odds on Major Leagues", url: "https://22bet.com/?btag=igamingubuntu" },
  ]

  const displayOffers = affiliateLinks.length > 0 ? affiliateLinks : fallbackOffers

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <article className="flex-1 min-w-0">
            <nav className="text-[13px] text-[#6B7280] mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#1A1F2B] transition">Home</Link>
              <span className="text-gray-300">&rsaquo;</span>
              <Link href="/blog" className="hover:text-[#1A1F2B] transition">Blog</Link>
              <span className="text-gray-300">&rsaquo;</span>
              <span className="text-[#1A1F2B]">{article.title}</span>
            </nav>

            <div className="relative rounded-lg overflow-hidden mb-5">
              {article.featuredImage ? (
                <img src={article.featuredImage} alt={article.title} className="w-full aspect-[16/9] object-cover" />
              ) : (
                <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <span className="absolute top-5 left-5 bg-[#F59E0B] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full">
                {article.category}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[13px] text-[#6B7280] mb-5 flex-wrap">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formatDate(article.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {article.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                {viewCount.toLocaleString()} views
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                Reading now
              </span>
            </div>

            <h1 className="text-[36px] md:text-[42px] font-extrabold text-[#1A1F2B] leading-[1.2] mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-[#6B7280] leading-relaxed mb-5">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-[13px] font-medium">
                {article.category}
              </span>
              {(article.tags || []).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?search=${tag}`}
                  className="bg-[#F3F4F6] text-[#1A1F2B] px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-gray-200 transition"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div
              className="prose prose-lg max-w-none text-[#6B7280] leading-[1.8] text-[16px] space-y-4 prose-headings:text-[#1A1F2B] prose-headings:font-bold prose-strong:text-[#1A1F2B] prose-a:text-[#22C55E] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:w-full [&_img.float-left]:float-left [&_img.float-left]:w-[45%] [&_img.float-left]:mr-6 [&_img.float-left]:mb-4 [&_img.float-left]:rounded-lg [&_img.float-right]:float-right [&_img.float-right]:w-[45%] [&_img.float-right]:ml-6 [&_img.float-right]:mb-4 [&_img.float-right]:rounded-lg"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />

            <AffiliateBanner offers={displayOffers.slice(0, 3)} variant="marquee" placement="blog-mid" className="my-8" />

            <AdSlot position="in-content-1" className="my-8" />

            <AffiliateBox title="Best Odds & Betting Offers" offers={displayOffers.slice(0, 3)} placement="blog-mid" />

            {related.length > 0 && (
              <div className="bg-white rounded-xl p-6 my-8 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#1A1F2B] mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all border border-gray-100">
                      <p className="text-sm font-medium text-[#1A1F2B] group-hover:text-[#22C55E] transition-colors line-clamp-2">{r.title}</p>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-2">
                        <span>{r.category}</span>
                        <span>&middot; {r.readTime} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <AdSlot position="in-content-2" className="my-8" />

            <AffiliateBanner offers={displayOffers} variant="leaderboard" placement="blog-bottom" className="mb-4" />

            <AffiliateBox title="Top Betting Sites" offers={displayOffers} placement="blog-bottom" />

            <div className="flex items-center gap-3 border-t border-gray-200 pt-6">
              <span className="text-sm font-medium text-[#1A1F2B]">Share this article:</span>
              {(() => {
                const articleUrl = article.canonicalUrl || `https://igamingubuntu.com/blog/${article.slug}`
                return [
                  { label: "X", url: `https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}` },
                  { label: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}` },
                  { label: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${articleUrl}`)}` },
                ]
              })().map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener" className="bg-gray-100 text-sm text-[#6B7280] px-3 py-1.5 rounded-lg hover:bg-[#DCFCE7] hover:text-[#166534] transition">
                  {s.label}
                </a>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                {article.authorPhoto ? (
                  <img src={article.authorPhoto} alt={article.authorName || "Author"} className="w-14 h-14 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#22C55E] to-emerald-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {(article.authorName || article.author || "IG").split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-[#1A1F2B]">{article.authorName || article.author || "iGamingUbuntu"}</p>
                  <p className="text-sm text-[#6B7280]">{article.authorBio || "iGaming content specialist covering African markets"}</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Published {formatDate(article.createdAt)} · Updated {formatDate(article.updatedAt)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#6B7280] mt-4 leading-relaxed">
                This article contains affiliate links. We may earn a commission when you sign up through our links at no extra cost to you.
                All opinions, reviews, and recommendations are our own based on independent research and expertise.
                <span className="text-red-500 font-medium"> Please gamble responsibly. 18+.</span>
              </p>
            </div>
          </article>

          <aside className="w-full lg:w-[380px] shrink-0">
            <Sidebar popularPosts={popular} />
          </aside>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription || article.excerpt,
            image: article.ogImage || article.featuredImage,
            datePublished: article.createdAt,
            dateModified: article.updatedAt,
            author: {
              "@type": "Person",
              name: article.authorName || article.author || "Nasheta John",
              description: article.authorBio || "iGaming content specialist covering African markets",
            },
            publisher: {
              "@type": "Organization",
              name: "iGamingUbuntu",
              logo: { "@type": "ImageObject", url: "https://igamingubuntu.com/favicon.svg" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://igamingubuntu.com/blog/${article.slug}` },
          }),
        }}
      />
    </div>
  )
}
