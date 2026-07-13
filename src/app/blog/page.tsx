"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FiSearch, FiEye, FiArrowRight, FiStar } from "react-icons/fi"
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

export default function BlogPage() {
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    getAllPublishedArticles().then(setArticles).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter((a) => {
    const matchCategory = category === "All" || a.category === category
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt?.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const popularPosts = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/images/full%20backgound.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 to-[#0a0a0f]" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">iGaming Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">iGaming Blog</h1>
          <p className="text-[#94a3b8] max-w-xl mx-auto">Expert insights, betting tips, casino reviews, and iGaming news across Africa.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16 -mt-1">
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
                      ? "bg-[#f59e0b] text-[#0a0a0f] shadow-md shadow-[#f59e0b]/20"
                      : "bg-[#1a1a2e] text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e]/80 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by title, category, or keyword..."
                className="w-full bg-[#1a1a2e] border border-white/10 text-white placeholder-[#64748b] pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 focus:border-[#f59e0b]/50 transition"
              />
            </div>

            {/* Articles */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-white/5 animate-pulse bg-[#1a1a2e]">
                    <div className="aspect-[16/9] bg-[#1a1a2e]/50" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-[#1a1a2e]/50 rounded w-1/3" />
                      <div className="h-5 bg-[#1a1a2e]/50 rounded w-3/4" />
                      <div className="h-4 bg-[#1a1a2e]/50 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group block rounded-xl overflow-hidden border border-white/[0.06] bg-[#1a1a2e] hover:border-[#f59e0b]/30 hover:shadow-lg hover:shadow-[#f59e0b]/5 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-[#0a0a0f]">
                      {article.featuredImage ? (
                        <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#64748b] text-sm">iGamingUbuntu</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-[#64748b] mb-3">
                        <span className="bg-[#10b981]/15 text-[#10b981] px-2.5 py-0.5 rounded-full font-medium">{article.category}</span>
                        <span>{formatDate(article.createdAt)}</span>
                        <span>· {article.readTime} min read</span>
                      </div>
                      <h3 className="font-bold text-white group-hover:text-[#f59e0b] transition-colors line-clamp-2 mb-2">{article.title}</h3>
                      <p className="text-sm text-[#64748b] line-clamp-2 leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center gap-3 mt-4 text-xs">
                        <span className="text-[#64748b] flex items-center gap-1">
                          <FiEye className="w-3.5 h-3.5" />
                          {article.views > 0 ? article.views.toLocaleString() : "0"}
                        </span>
                        <span className="text-[#f59e0b] font-medium group-hover:translate-x-1 transition-transform ml-auto">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#64748b]">No articles found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Most Read */}
            {popularPosts.length > 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-[#1a1a2e] p-5">
                <h3 className="font-bold text-white mb-4 pb-3 border-b border-white/10 flex items-center gap-2">
                  <FiStar className="w-4 h-4 text-[#f59e0b]" />
                  Most Read
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                      <span className="text-[#f59e0b] font-bold text-lg w-7 shrink-0 leading-none">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-[#f59e0b] transition-colors line-clamp-2">{post.title}</p>
                        <div className="flex items-center gap-2 text-xs text-[#64748b] mt-1">
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
            <div className="rounded-xl border border-white/[0.06] bg-[#1a1a2e] p-5">
              <h3 className="font-bold text-white mb-4 pb-3 border-b border-white/10">Explore</h3>
              <div className="space-y-1">
                {exploreItems.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="flex items-center gap-3 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all">
                    {item.isCountry ? (
                      <span className="text-base">{getFlagEmoji(item.slug)}</span>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-xs bg-[#f59e0b]/10 text-[#f59e0b] rounded">◆</span>
                    )}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl border border-[#f59e0b]/20 bg-gradient-to-br from-[#f59e0b]/10 to-[#0a0a0f] p-5">
              <h3 className="font-bold text-white mb-1">Newsletter</h3>
              <p className="text-xs text-[#64748b] mb-4">Get betting tips & iGaming insights in your inbox.</p>
              {subscribed ? (
                <p className="text-[#10b981] text-sm font-medium">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) { setSubscribed(true); setEmail("") } }} className="flex">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-[#1a1a2e] border border-white/10 text-white placeholder-[#64748b] px-3 py-2.5 text-sm rounded-l-lg focus:outline-none focus:border-[#f59e0b]/50" />
                  <button type="submit" className="bg-[#f59e0b] text-[#0a0a0f] px-4 py-2.5 rounded-r-lg text-sm font-semibold hover:bg-[#f59e0b]/90 transition cursor-pointer whitespace-nowrap flex items-center gap-1">
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
