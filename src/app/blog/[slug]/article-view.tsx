"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import AdSlot from "@/components/AdSlot"
import Sidebar from "@/components/Sidebar"
import { finalizeArticleHtml } from "@/lib/contentHtml"
import { isSponsoredStatus } from "@/lib/site"
import type { Article } from "@/types"

interface ArticleViewProps {
  initialArticle: Article
  /** Related articles, server-rendered by the page (same country, then category). */
  related?: Article[]
  popular?: Article[]
  canonicalUrl?: string
}

export default function ArticleView({ initialArticle, related = [], popular = [], canonicalUrl }: ArticleViewProps) {
  const article = initialArticle
  const [viewCount, setViewCount] = useState(initialArticle.views || 0)

  const sponsored = isSponsoredStatus(initialArticle.status)

  useEffect(() => {
    if (!article?.id) return
    // Real view count: incremented server-side (Firestore rules block writes
    // from the browser), and skipped for the owner's own visits.
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: article.id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.counted && typeof data.views === "number") setViewCount(data.views)
      })
      .catch(() => {})
  }, [article?.id])

  const wasUpdated = !!article.updatedAt && article.updatedAt !== article.createdAt
  const shareUrl = canonicalUrl || `https://www.igamingubuntu.com/blog/${article.slug}`

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <article className="flex-1 min-w-0">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#6B7280] mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#1A1F2B] transition">Home</Link>
              <span className="text-gray-300" aria-hidden="true">&rsaquo;</span>
              <Link href="/blog" className="hover:text-[#1A1F2B] transition">All News</Link>
              <span className="text-gray-300" aria-hidden="true">&rsaquo;</span>
              <span className="text-[#1A1F2B]">{article.title}</span>
            </nav>

            <div className="relative rounded-lg overflow-hidden mb-5">
              {article.featuredImage ? (
                <img src={article.featuredImage} alt={article.featuredImageAlt || article.title} width={1200} height={675} className="w-full aspect-[16/9] object-cover" />
              ) : (
                <div
                  className="w-full aspect-[16/9] bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('/images/full backgound.png')" }}
                >
                  <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">iGamingUbuntu</span>
                </div>
              )}
              <span className="absolute top-5 left-5 bg-[#F59E0B] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full">
                {article.category}
              </span>
              {sponsored && (
                <span className="absolute top-5 right-5 bg-[#1A1F2B] text-white text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full">
                  {article.status === "press-release" ? "Press release" : "Sponsored"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-[13px] text-[#6B7280] mb-5 flex-wrap">
              <span className="flex items-center gap-1.5">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formatDate(article.createdAt)}
              </span>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {article.readTime || 3} min read
              </span>
              {/* Real view count from the CMS only — nothing is shown until it is above zero. */}
              {viewCount > 0 && (
                <>
                  <span className="text-gray-300" aria-hidden="true">·</span>
                  <span className="flex items-center gap-1.5">
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    {viewCount.toLocaleString()} views
                  </span>
                </>
              )}
              {wasUpdated && (
                <>
                  <span className="text-gray-300" aria-hidden="true">·</span>
                  <span className="font-medium text-[#1A1F2B]">Updated {formatDate(article.updatedAt)}</span>
                </>
              )}
            </div>

            <h1 className="text-[28px] sm:text-[34px] md:text-[42px] font-extrabold text-[#1A1F2B] leading-[1.2] mb-4 break-words">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed mb-5">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {(article.tags || []).length > 0 ? (
                <>
                  <span className="bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-[13px] font-medium">
                    {article.category}
                  </span>
                  {(article.tags || []).map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="bg-[#F3F4F6] text-[#1A1F2B] px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-gray-200 transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={`/blog?search=${encodeURIComponent(article.category || "")}`}
                  className="bg-[#F3F4F6] text-[#1A1F2B] px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-gray-200 transition"
                >
                  {article.category}
                </Link>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none text-[#6B7280] leading-[1.8] text-[16px] space-y-4 prose-headings:text-[#1A1F2B] prose-headings:font-bold prose-strong:text-[#1A1F2B] prose-a:text-[#22C55E] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:w-full [&_img.float-left]:float-left [&_img.float-left]:w-[45%] [&_img.float-left]:mr-6 [&_img.float-left]:mb-4 [&_img.float-left]:rounded-lg [&_img.float-right]:float-right [&_img.float-right]:w-[45%] [&_img.float-right]:ml-6 [&_img.float-right]:mb-4 [&_img.float-right]:rounded-lg"
              dangerouslySetInnerHTML={{
                __html: finalizeArticleHtml(article.content || "", {
                  dropLeadingHeading: article.title,
                  sponsored,
                }),
              }}
            />

            <AdSlot position="in-content-1" className="my-8" />

            {/* Related articles are rendered on the server and passed in as props. */}
            {related.length > 0 && (
              <section aria-labelledby="related-heading" className="bg-white rounded-xl p-6 my-8 border border-gray-200 shadow-sm">
                <h2 id="related-heading" className="font-bold text-[#1A1F2B] mb-4 text-lg">Related articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {related.slice(0, 4).map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all border border-gray-100">
                      <p className="text-sm font-medium text-[#1A1F2B] group-hover:text-[#22C55E] transition-colors line-clamp-2">{r.title}</p>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-2">
                        <span>{r.category}</span>
                        <span>&middot; {r.readTime || 3} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <AdSlot position="in-content-2" className="my-8" />

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-t border-gray-200 pt-6">
              <span className="text-sm font-medium text-[#1A1F2B] w-full sm:w-auto">Share this article:</span>
              {[
                { label: "X", url: `https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}` },
                { label: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
                { label: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl}`)}` },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener" className="bg-gray-100 text-sm text-[#6B7280] px-3 py-1.5 rounded-lg hover:bg-[#DCFCE7] hover:text-[#166534] transition">
                  {s.label}
                </a>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                {article.authorPhoto ? (
                  <img src={article.authorPhoto} alt={article.authorName || "Author"} width={56} height={56} loading="lazy" className="w-14 h-14 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#22C55E] to-emerald-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {(article.authorName || article.author || "IG").split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-[#1A1F2B]">{article.authorName || article.author || "iGamingUbuntu"}</p>
                  <p className="text-sm text-[#6B7280]">{article.authorBio || "iGaming content specialist covering African markets"}</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Published {formatDate(article.createdAt)}
                    {wasUpdated ? ` · Updated ${formatDate(article.updatedAt)}` : ""}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#6B7280] mt-4 leading-relaxed">
                All opinions, reviews and recommendations are our own, based on independent research.
                <span className="text-red-500 font-medium"> Please gamble responsibly. 18+.</span>
              </p>
            </div>
          </article>

          <aside className="w-full lg:w-[350px] shrink-0">
            <Sidebar popularPosts={popular} />
          </aside>
        </div>
      </div>
    </div>
  )
}
