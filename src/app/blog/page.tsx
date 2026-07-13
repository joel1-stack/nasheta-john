"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getAllPublishedArticles } from "@/lib/firestoreService"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

const categories = ["All", "Sports Betting", "Casino Reviews", "Bonuses", "Betting Tips", "Industry News", "Events"]

export default function BlogPage() {
  const [category, setCategory] = useState("All")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    getAllPublishedArticles().then(setArticles).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter((a) => category === "All" || a.category === category)
  const featured = articles.length > 0 ? articles.reduce((best, a) => (a.views || 0) > (best.views || 0) ? a : best) : null
  const rest = featured ? filtered.filter((a) => a.slug !== featured.slug) : filtered
  const popularPosts = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4">
        {/* ===== FEATURED STORY ===== */}
        {featured && (
          <section className="py-8 md:py-10">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              <div className="md:w-[55%] flex flex-col justify-center">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-[0.25em] mb-3">Featured Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">{featured.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <span>{formatDate(featured.createdAt)}</span>
                  <span>·</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {(featured.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-sm w-fit">
                  Read article <span>&rarr;</span>
                </Link>
              </div>
              <div className="md:w-[45%]">
                <Link href={`/blog/${featured.slug}`} className="block h-full rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition">
                  {featured.featuredImage ? (
                    <img src={featured.featuredImage} alt={featured.title} className="w-full h-full object-cover min-h-[260px]" />
                  ) : (
                    <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                      <span className="text-emerald-300 text-lg font-medium">Featured</span>
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ===== FILTERS ===== */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 py-4 border-t border-gray-200">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`text-sm font-medium transition cursor-pointer pb-1 border-b-2 ${category === cat ? "text-emerald-600 border-emerald-600" : "text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-300"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* ===== FRESH FROM THE EDITORIAL DESK ===== */}
        <div className="py-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Fresh from the editorial desk</h3>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-gray-100 animate-pulse bg-white">
                      <div className="aspect-[16/10] bg-gray-100" />
                      <div className="p-4 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-1/4" />
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : rest.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {rest.map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`} className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 bg-white shadow-sm">
                      <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                        {article.featuredImage ? (
                          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                            <svg className="w-10 h-10 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="inline-block text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full mb-2">{article.category}</span>
                        <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 text-sm leading-snug mb-1">{article.title}</h4>
                        <div className="text-xs text-gray-400">{formatDate(article.createdAt)}{article.readTime ? ` · ${article.readTime} min read` : ""}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 font-medium">No articles found.</p>
                </div>
              )}
            </div>

            {/* ===== SIDEBAR ===== */}
            <div className="w-full lg:w-[320px] shrink-0 space-y-6 lg:sticky lg:top-16 lg:self-start">
              {/* Most Read */}
              {popularPosts.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">Most Read</h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, i) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                        <span className="text-emerald-600 font-bold text-lg w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">{post.title}</p>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {(post.views || 0) > 0 && <span>{post.views.toLocaleString()} views · </span>}
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-emerald-700 rounded-xl p-6 text-white shadow-sm">
                <h3 className="font-bold text-lg mb-1">Stay ahead of the game</h3>
                <p className="text-emerald-100 text-xs mb-4 leading-relaxed">Get the latest iGaming news and insights straight to your inbox.</p>
                {subscribed ? (
                  <p className="text-emerald-200 text-sm font-medium">Thanks for subscribing!</p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) { setSubscribed(true); setEmail("") } }} className="flex gap-2">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 px-3 py-2 rounded-lg bg-emerald-600/50 border border-emerald-500/30 text-white placeholder-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
                    <button type="submit" className="bg-white text-emerald-700 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition cursor-pointer shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </form>
                )}
              </div>

              {/* Explore Markets */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Explore Markets</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {[
                    { label: "Kenya", href: "/kenya" },
                    { label: "Nigeria", href: "/nigeria" },
                    { label: "South Africa", href: "/south-africa" },
                    { label: "Ghana", href: "/ghana" },
                    { label: "Tanzania", href: "/tanzania" },
                  ].map((m) => (
                    <Link key={m.label} href={m.href} className="text-gray-600 hover:text-emerald-600 transition font-medium">{m.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
