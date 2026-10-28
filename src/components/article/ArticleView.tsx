"use client"

import { Fragment, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import AdSlot from "@/components/AdSlot"
import ShareButtons from "./ShareButtons"
import Newsletter from "@/components/Newsletter"
import Sidebar from "@/components/Sidebar"
import { finalizeArticleHtml, splitForAds } from "@/lib/contentHtml"
import { isSponsoredStatus } from "@/lib/site"
import { categoryHub, articlePath } from "@/lib/navigation"
import type { Article } from "@/types"

interface ArticleViewProps {
  initialArticle: Article
  /** Related articles, server-rendered by the page (same country, then category). */
  related?: Article[]
  popular?: Article[]
  /** Newest stories for the sidebar, excluding this one. */
  recent?: Article[]
  canonicalUrl?: string
}

const COUNTRY_PAGES = new Set(["kenya", "nigeria", "south-africa", "ghana", "tanzania"])
const DEFAULT_AUTHOR = "Nasheta John"
const DEFAULT_AUTHOR_PHOTO = "/images/nasheta-john-author.png"
const DEFAULT_AUTHOR_BIO =
  "Founder and editor of iGamingUbuntu. Has written about African betting markets since 2016."


function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="inline-block bg-brand-ink text-white text-sm font-semibold px-3 py-1.5 mb-5">{children}</h2>
}

export default function ArticleView({ initialArticle, related = [], popular = [], recent = [], canonicalUrl }: ArticleViewProps) {
  const article = initialArticle
  const sponsored = isSponsoredStatus(article.status)

  useEffect(() => {
    if (!article?.id) return
    // Counted server-side for the CMS and "Most Read" ranking; never shown to readers.
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: article.id }),
      keepalive: true,
    }).catch(() => {})
  }, [article?.id])

  const wasUpdated = !!article.updatedAt && article.updatedAt !== article.createdAt
  const shareUrl = canonicalUrl || `https://www.igamingubuntu.com${articlePath(article)}`
  const bodyParts = splitForAds(
    finalizeArticleHtml(article.content || "", { dropLeadingHeading: article.title, sponsored })
  )
  const hub = categoryHub(article.category)
  const authorName = article.authorName || article.author || DEFAULT_AUTHOR
  const authorPhoto = article.authorPhoto || DEFAULT_AUTHOR_PHOTO
  const countries = (article.country || "")
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c && !/^(global|general|africa)$/i.test(c))

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
          <article className="min-w-0">
            <nav aria-label="Breadcrumb" className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-brand-teal transition">Home</Link>
              {hub && (
                <>
                  <span aria-hidden="true">/</span>
                  <Link href={hub.href} className="hover:text-brand-teal transition">{hub.label}</Link>
                </>
              )}
              <span aria-hidden="true">/</span>
              <span className="text-gray-700 line-clamp-1">{article.title}</span>
            </nav>

            {/* Topic labels */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {sponsored && (
                <span className="bg-brand-ink text-white text-xs font-semibold px-2.5 py-1">
                  {article.status === "press-release" ? "Press release" : "Sponsored"}
                </span>
              )}
              {article.category &&
                (hub ? (
                  <Link href={hub.href} className="bg-brand-teal text-white text-xs font-semibold px-2.5 py-1 hover:bg-brand-deep transition">
                    {article.category}
                  </Link>
                ) : (
                  <span className="bg-brand-teal text-white text-xs font-semibold px-2.5 py-1">{article.category}</span>
                ))}
              {countries.map((c) => {
                const slug = c.toLowerCase().replace(/[\s_]+/g, "-")
                // The CMS stores some countries as slugs ("south-africa").
                const label = slug.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())
                return COUNTRY_PAGES.has(slug) ? (
                  <Link key={c} href={`/${slug}`} className="bg-brand-teal text-white text-xs font-semibold px-2.5 py-1 hover:bg-brand-deep transition">
                    {label}
                  </Link>
                ) : (
                  <span key={c} className="bg-brand-teal text-white text-xs font-semibold px-2.5 py-1">{label}</span>
                )
              })}
            </div>

            <h1 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold text-brand-deep leading-[1.2] break-words">
              {article.title}
            </h1>

            {/* Byline */}
            <div className="flex items-center justify-between gap-4 flex-wrap mt-5 text-[13px] text-gray-500">
              <div className="flex items-center gap-2.5 flex-wrap">
                <img src={authorPhoto} alt={authorName} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                <Link href="/about" className="font-medium text-brand-deep hover:text-brand-teal transition">{authorName}</Link>
                <span aria-hidden="true">·</span>
                <span>{formatDate(article.createdAt)}</span>
                {wasUpdated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Updated {formatDate(article.updatedAt)}</span>
                  </>
                )}
              </div>
              <span>{article.readTime || 3} min read</span>
            </div>

            {/* Share */}
            <div className="mt-5">
              <ShareButtons title={article.title} url={shareUrl} />
            </div>

            <figure className="mt-6">
              {article.featuredImage ? (
                <img
                  src={article.featuredImage}
                  alt={article.featuredImageAlt || article.title}
                  width={1200}
                  height={675}
                  fetchPriority="high"
                  className="w-full aspect-[16/9] object-cover"
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: "url('/images/full backgound.png')" }} />
              )}
            </figure>

            {article.excerpt && (
              <p className="mt-6 text-[17px] italic text-gray-700 leading-relaxed">{article.excerpt}</p>
            )}

            <AdSlot position="leaderboard-top" className="mt-8" />

            <div className="article-body mt-6 prose prose-lg max-w-none text-[#2B2F36] text-[17px] leading-[1.85] prose-p:my-5 prose-headings:text-brand-deep prose-headings:font-semibold prose-h2:text-[26px] prose-h2:mt-10 prose-h3:text-[21px] prose-strong:text-brand-deep prose-a:text-brand-teal-dark prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-img:w-full prose-li:my-1 [&_img.float-left]:float-left [&_img.float-left]:w-[45%] [&_img.float-left]:mr-6 [&_img.float-left]:mb-4 [&_img.float-right]:float-right [&_img.float-right]:w-[45%] [&_img.float-right]:ml-6 [&_img.float-right]:mb-4">
              {bodyParts.map((part, i) => (
                <Fragment key={i}>
                  <div dangerouslySetInnerHTML={{ __html: part.html }} />
                  {part.adAfter && <AdSlot position={part.adAfter} className="not-prose my-10" />}
                </Fragment>
              ))}
            </div>

            {(article.tags || []).length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-10">
                {article.tags.map((tag) => (
                  <span key={tag} className="border border-gray-200 bg-gray-50 text-brand-teal-dark text-sm font-semibold px-3 py-1.5">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share box */}
            <div className="mt-8">
              <ShareButtons title={article.title} url={shareUrl} variant="card" />
            </div>

            {/* Author */}
            <div className="mt-8 flex items-start gap-5 border-t border-gray-200 pt-8">
              <img src={authorPhoto} alt={authorName} width={80} height={80} loading="lazy" className="w-20 h-20 rounded-full object-cover shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Written by</p>
                <Link href="/about" className="text-lg font-semibold text-brand-deep hover:text-brand-teal transition">{authorName}</Link>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{article.authorBio || DEFAULT_AUTHOR_BIO}</p>
              </div>
            </div>

            <div className="mt-10">
              <Newsletter variant="box" />
            </div>

            {/* Related */}
            {related.length > 0 && (
              <section aria-labelledby="related-heading" className="mt-12">
                <SectionLabel>
                  <span id="related-heading">Related Articles</span>
                </SectionLabel>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {related.slice(0, 4).map((r) => (
                    <Link key={r.slug} href={articlePath(r)} className="flex gap-4 group items-start">
                      {r.featuredImage ? (
                        <img src={r.featuredImage} alt={r.featuredImageAlt || r.title} width={112} height={72} loading="lazy" className="w-28 h-[72px] object-cover shrink-0" />
                      ) : (
                        <div className="w-28 h-[72px] shrink-0 bg-gray-200" />
                      )}
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-brand-teal-dark group-hover:underline leading-snug line-clamp-3">{r.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(r.createdAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <p className="text-xs text-gray-500 mt-10 leading-relaxed border-t border-gray-100 pt-6">
              All opinions, reviews and recommendations are our own, based on independent research.
              <span className="text-red-600 font-medium"> Please gamble responsibly. 18+.</span>
            </p>
          </article>

          <Sidebar recent={recent} popularPosts={popular} />
        </div>
      </div>
    </div>
  )
}
