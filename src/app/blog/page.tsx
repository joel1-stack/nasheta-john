"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FiEye, FiArrowRight, FiClock, FiCalendar } from "react-icons/fi"
import { getAllPublishedArticles } from "@/lib/firestoreService"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

const categories = ["All", "Sports Betting", "Casino Reviews", "Bonuses", "Betting Tips", "Industry News", "Events"]

const exploreItems = [
  { name: "Kenya", slug: "kenya", isCountry: true },
  { name: "Nigeria", slug: "nigeria", isCountry: true },
  { name: "South Africa", slug: "south-africa", isCountry: true },
  { name: "Ghana", slug: "ghana", isCountry: true },
  { name: "Tanzania", slug: "tanzania", isCountry: true },
  { name: "Casino Reviews", slug: "reviews", isCountry: false },
  { name: "Sports Betting", slug: "sports", isCountry: false },
  { name: "Tips & Guides", slug: "guides", isCountry: false },
]

function getFlagEmoji(slug: string): string {
  const map: Record<string, string> = { kenya: "🇰🇪", nigeria: "🇳🇬", "south-africa": "🇿🇦", ghana: "🇬🇭", tanzania: "🇹🇿" }
  return map[slug] || ""
}

function BlogContent() {
  const searchParams = useSearchParams()
  const urlSearch = searchParams?.get("search") || ""
  const [category, setCategory] = useState("All")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    getAllPublishedArticles().then(setArticles).catch(() => {}).finally(() => setLoading(false))
  }, [urlSearch])

  const filtered = articles.filter((a) => {
    const matchCategory = category === "All" || a.category === category
    const matchSearch = !urlSearch || a.title.toLowerCase().includes(urlSearch.toLowerCase()) || a.excerpt?.toLowerCase().includes(urlSearch.toLowerCase())
    return matchCategory && matchSearch
  })

  const popularPosts = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-18 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            iGaming Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-3 tracking-tight">iGaming Blog</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Expert insights, betting tips, casino reviews, and iGaming news across Africa.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 pt-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    category === cat
                      ? "bg-[#f59e0b] text-white shadow-md shadow-[#f59e0b]/20"
                      : "bg-white text-gray-500 hover:text-[#111827] hover:bg-gray-100 border border-gray-200 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search results indicator */}
            {urlSearch && (
              <div className="mb-6 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                Showing results for &ldquo;<span className="font-medium text-[#111827]">{urlSearch}</span>&rdquo;
                <Link href="/blog" className="ml-2 text-[#f59e0b] hover:underline font-medium">Clear</Link>
              </div>
            )}

            {/* Articles */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-gray-200 animate-pulse bg-white shadow-sm">
                    <div className="aspect-[16/9] bg-gray-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-1/3" />
                      <div className="h-5 bg-gray-100 rounded w-3/4" />
                      <div className="h-4 bg-gray-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-[#f59e0b]/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gray-50">
                      {article.featuredImage ? (
                        <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-300 text-sm font-medium">iGamingUbuntu</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">{article.category}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FiCalendar size={11} />
                          {formatDate(article.createdAt)}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#111827] group-hover:text-[#f59e0b] transition-colors line-clamp-2 mb-2 text-base leading-snug">{article.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                        <span className="text-gray-400 flex items-center gap-1">
                          <FiClock size={12} />
                          {article.readTime} min read
                        </span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <FiEye size={12} />
                          {article.views > 0 ? article.views.toLocaleString() : "0"}
                        </span>
                        <span className="text-[#f59e0b] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Read <FiArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium">No articles found.</p>
                {urlSearch && (
                  <Link href="/blog" className="mt-2 inline-block text-[#f59e0b] hover:underline text-sm">Clear search</Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Most Read */}
            {popularPosts.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <h3 className="font-bold text-[#111827] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#f59e0b] rounded-full inline-block" />
                  Most Read
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                      <span className="text-[#f59e0b] font-bold text-lg w-7 shrink-0 leading-none">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827] group-hover:text-[#f59e0b] transition-colors line-clamp-2">{post.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <FiEye size={11} />
                          <span>{post.views.toLocaleString()} views</span>
                          <span>· {post.readTime} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="font-bold text-[#111827] mb-4 pb-3 border-b border-gray-100">Explore</h3>
              <div className="space-y-1">
                {exploreItems.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#111827] hover:bg-gray-50 px-3 py-2 rounded-lg transition-all">
                    {item.isCountry ? (
                      <span className="text-base">{getFlagEmoji(item.slug)}</span>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-xs bg-amber-50 text-[#f59e0b] rounded">◆</span>
                    )}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl bg-gradient-to-br from-[#f59e0b] to-amber-600 shadow-md p-5">
              <h3 className="font-bold text-white mb-1">Newsletter</h3>
              <p className="text-xs text-white/80 mb-4">Get betting tips & iGaming insights in your inbox.</p>
              {subscribed ? (
                <p className="text-white text-sm font-medium">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) { setSubscribed(true); setEmail("") } }} className="flex">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-white/20 text-white placeholder-white/60 px-3 py-2.5 text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white/40 border-0" />
                  <button type="submit" className="bg-white text-[#f59e0b] px-4 py-2.5 rounded-r-lg text-sm font-semibold hover:bg-white/90 transition cursor-pointer whitespace-nowrap flex items-center gap-1">
                    Subscribe <FiArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF8]" />}>
      <BlogContent />
    </Suspense>
  )
}
