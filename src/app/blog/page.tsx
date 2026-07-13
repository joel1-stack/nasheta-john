"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FiArrowRight, FiSearch } from "react-icons/fi"
import { getAllPublishedArticles } from "@/lib/firestoreService"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

const categories = ["All", "Sports Betting", "Casino Reviews", "Bonuses", "Betting Tips", "Industry News", "Events"]

const statsData = [
  { value: "5,000+", label: "Articles Delivered" },
  { value: "12+", label: "Languages Supported" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "50+", label: "Active Clients" },
]

const exploreCategories = [
  { title: "Sports Betting", desc: "Expert analysis and winning strategies", href: "/sports" },
  { title: "Casino Reviews", desc: "Honest reviews of top African casinos", href: "/casinos" },
  { title: "Betting Guides", desc: "Step-by-step guides for beginners", href: "/guides" },
  { title: "Industry News", desc: "Latest iGaming market developments", href: "/news" },
]

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [activeTab, setActiveTab] = useState("All")
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    getAllPublishedArticles().then(setArticles).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const featured = articles.length > 0 ? articles.reduce((best, a) => (a.views || 0) > (best.views || 0) ? a : best) : null
  const filtered = activeTab === "All" ? articles : articles.filter((a) => a.category === activeTab)
  const gridArticles = filtered.filter((a) => a.slug !== featured?.slug)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/full%20backgound.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/60 to-[#0a0a0f]" />
        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Africa&apos;s iGaming Content Authority
            </h1>
            <p className="text-lg md:text-xl text-[#94a3b8] mb-8 max-w-2xl">
              Expert insights, betting tips, and casino reviews that rank and convert.
            </p>
            <form onSubmit={handleSubscribe} className="flex max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-[#1a1a2e] border border-white/10 text-white placeholder-[#94a3b8] px-5 py-3 text-sm focus:outline-none focus:border-[#10b981] rounded-l-lg"
              />
              <button type="submit" className="bg-[#f59e0b] text-[#0a0a0f] font-bold px-6 py-3 text-sm hover:bg-[#f59e0b]/90 transition cursor-pointer rounded-r-lg flex items-center gap-2">
                Subscribe <FiArrowRight size={16} />
              </button>
            </form>
            {subscribed && <p className="text-[#10b981] text-sm mt-2">Thanks for subscribing!</p>}
            <p className="text-[#64748b] text-xs mt-2">Join 5,000+ subscribers — Get weekly betting tips and industry news</p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-white/10 bg-[#0f0f1a]">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsData.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-[#f59e0b]">{stat.value}</div>
                <div className="text-xs md:text-sm text-[#94a3b8] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Featured Story */}
        {featured && (
          <section className="mb-12">
            <div className="rounded-2xl overflow-hidden relative group">
              <Link href={`/blog/${featured.slug}`} className="block">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent z-10" />
                <div className="aspect-[2.2/1] w-full bg-[#1a1a2e]">
                  {featured.featuredImage ? (
                    <img src={featured.featuredImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#94a3b8]">iGamingUbuntu</div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
                  <span className="inline-block bg-[#10b981]/15 text-[#10b981] text-xs font-semibold px-3 py-1 rounded-full mb-3">{featured.category}</span>
                  <h2 className="text-xl md:text-3xl font-bold mb-2 leading-tight">{featured.title}</h2>
                  <p className="text-[#94a3b8] text-sm md:text-base mb-3 max-w-2xl line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-[#64748b]">
                    <span>{featured.author || "iGamingUbuntu"}</span>
                    <span>·</span>
                    <span>{formatDate(featured.createdAt)}</span>
                    <span>·</span>
                    <span>{featured.readTime} min read</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* TABS */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-white/10 pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-3 text-sm font-medium transition cursor-pointer relative ${
                activeTab === cat
                  ? "text-[#f59e0b] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#f59e0b]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LATEST FROM THE DESK */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Latest from the Desk</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#94a3b8]">Loading...</div>
        ) : gridArticles.length === 0 ? (
          <div className="text-center py-20 text-[#94a3b8]">No articles found for this category.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {gridArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group block bg-[#1a1a2e] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-[#10b981]/30 hover:shadow-lg hover:shadow-[#10b981]/5 transition-all duration-300">
                  <div className="aspect-[16/9] bg-[#0a0a0f] overflow-hidden">
                    {article.featuredImage ? (
                      <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94a3b8] text-sm">iGamingUbuntu</div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-[#10b981]/15 text-[#10b981] text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3">{article.category}</span>
                    <h3 className="font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-[#10b981] transition-colors mb-2">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#64748b]">
                      <span>{formatDate(article.createdAt)}</span>
                      <span>·</span>
                      <span>{article.readTime} min read</span>
                      {article.views > 0 && <><span>·</span><span>{article.views} views</span></>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* EXPLORE iGAMINGUBUNTU */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore iGamingUbuntu</h2>
          <p className="text-[#94a3b8] mb-6">Discover more from our expert team</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exploreCategories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#1a1a2e] border border-white/[0.06] hover:border-[#f59e0b]/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[#1a1a2e]">
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">■</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <h3 className="font-bold text-white text-sm md:text-base group-hover:text-[#f59e0b] transition-colors">{cat.title}</h3>
                  <p className="text-[#94a3b8] text-xs mt-1 line-clamp-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* NEWSLETTER + MOST READ */}
      <section className="border-t border-white/10 bg-[#0f0f1a]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#f59e0b] rounded-full inline-block" />
                Most Read
              </h3>
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, i) => (
                  <Link key={article.id} href={`/blog/${article.slug}`} className="flex items-start gap-4 group">
                    <span className="text-2xl font-bold text-[#f59e0b] w-8 shrink-0 leading-none">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#10b981] transition-colors line-clamp-2">{article.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#64748b] mt-1">
                        <span>{formatDate(article.createdAt)}</span>
                        <span>·</span>
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[#10b981] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-1">Stay ahead of the game</h3>
                <p className="text-sm text-white/70 mb-5">Get betting tips & iGaming insights in your inbox.</p>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-white/15 text-white placeholder-white/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 rounded-l-lg"
                  />
                  <button type="submit" className="bg-[#f59e0b] text-[#0a0a0f] px-4 py-2.5 hover:bg-[#f59e0b]/90 transition cursor-pointer rounded-r-lg">
                    <FiArrowRight size={18} />
                  </button>
                </form>
                {subscribed && <p className="text-white text-xs mt-2">Thanks for subscribing!</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
