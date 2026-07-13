"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getAllPublishedArticles } from "@/lib/firestoreService"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

const categories = ["All", "Sports Betting", "Casino Reviews", "Bonuses", "Betting Tips", "Industry News", "Events"]

const exploreItems = [
  { name: "Kenya", slug: "kenya" }, { name: "Nigeria", slug: "nigeria" }, { name: "South Africa", slug: "south-africa" },
  { name: "Ghana", slug: "ghana" }, { name: "Tanzania", slug: "tanzania" }, { name: "Casino Reviews", slug: "reviews" },
  { name: "Sports Betting", slug: "sports" }, { name: "Tips & Guides", slug: "guides" },
]

function getFlagUrl(slug: string): string {
  const map: Record<string, string> = { kenya: "ke", nigeria: "ng", "south-africa": "za", ghana: "gh", tanzania: "tz" }
  return `https://flagcdn.com/20x15/${map[slug] || slug}.png`
}

export default function BlogPage() {
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    getAllPublishedArticles().then(setArticles).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter((a) => {
    const matchCategory = category === "All" || a.category === category
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const popularPosts = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="py-12 md:py-16 text-center border-b border-gray-100">
          <div className="inline-block text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-4 py-1.5 rounded-full mb-4">iGaming Blog</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">iGaming Blog</h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-lg">Expert insights, betting tips, casino reviews, and iGaming news across Africa.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 py-8">
          <div className="flex-1">
            {/* Filters + Search row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${category === cat ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"}`}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative shrink-0 w-full sm:w-64">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition" />
              </div>
            </div>

            {/* Article grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-gray-100 animate-pulse bg-white shadow-sm">
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
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 bg-white shadow-sm">
                    <div className="aspect-[16/9] overflow-hidden bg-gray-50">
                      {article.featuredImage ? (
                        <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                          <svg className="w-12 h-12 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium">{article.category}</span>
                        <span>{formatDate(article.createdAt)}</span>
                        <span>· {article.readTime} min read</span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2 text-lg">{article.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          {article.views.toLocaleString()}
                        </span>
                        <span className="text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">Read more →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500 font-medium">No articles found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {popularPosts.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  Most Read
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                      <span className="text-emerald-600 font-bold text-lg w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span>{post.views.toLocaleString()} views</span>
                          <span>· {post.readTime} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Explore</h3>
              <div className="grid grid-cols-1 gap-1">
                {exploreItems.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all">
                    {["kenya", "nigeria", "south-africa", "ghana", "tanzania"].includes(item.slug) ? (
                      <img src={getFlagUrl(item.slug)} alt="" className="w-5 h-3.5 rounded object-cover" />
                    ) : (
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    )}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2">Newsletter</h3>
              <p className="text-xs text-gray-500 mb-4">Get betting tips & iGaming insights in your inbox.</p>
              {subscribed ? (
                <p className="text-emerald-600 text-sm font-medium">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) { setSubscribed(true); setEmail("") } }} className="flex gap-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
                  <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer whitespace-nowrap">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
