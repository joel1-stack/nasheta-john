"use client"

import { useState } from "react"
import Link from "next/link"
import ArticleCard from "@/components/ArticleCard"
import Sidebar from "@/components/Sidebar"
import AdSlot from "@/components/AdSlot"
import type { Article } from "@/types"

const allArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina came from 2-0 down to beat Egypt 3-2 in a thrilling World Cup Round of 16 match.",
    category: "Sports Betting", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    tags: ["World Cup"], readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews",
    excerpt: "We review the best online casinos available in Kenya for 2026.",
    category: "Casino Reviews", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&q=80",
    tags: ["Kenya"], readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites",
    excerpt: "Complete betting guide for the 2026 FIFA World Cup.",
    category: "Betting Tips", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    tags: ["World Cup"], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06",
  },
  {
    id: "4", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim",
    excerpt: "Get 200% up to KES 5,000 on your first deposit.",
    category: "Bonuses", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    tags: ["SportPesa"], readTime: 5, author: "iGamingUbuntu", status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
  {
    id: "5", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026",
    excerpt: "Compare bonuses, odds, payment methods, and our expert ratings.",
    category: "Sports Betting", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    tags: ["Nigeria"], readTime: 10, author: "iGamingUbuntu", status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04",
  },
  {
    id: "6", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators",
    excerpt: "List of betting sites that accept M-Pesa in 2026.",
    category: "Guides", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    tags: ["M-Pesa"], readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03",
  },
  {
    id: "7", slug: "betika-free-bet-offer", title: "Betika Free Bet Offer 2026: How to Get Your Free Bet",
    excerpt: "Claim your Betika free bet with this step-by-step guide.",
    category: "Bonuses", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    tags: ["Betika"], readTime: 4, author: "iGamingUbuntu", status: "published", views: 2156, content: "", createdAt: "2026-07-02", updatedAt: "2026-07-02",
  },
  {
    id: "8", slug: "1xbet-registration-guide-kenya", title: "1xBet Registration Guide Kenya 2026",
    excerpt: "How to register at 1xBet in Kenya. Complete guide.",
    category: "Guides", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["1xBet"], readTime: 5, author: "iGamingUbuntu", status: "published", views: 1876, content: "", createdAt: "2026-07-01", updatedAt: "2026-07-01",
  },
  {
    id: "9", slug: "kenya-betting-tax-update-2026", title: "Kenya Betting Tax Update 2026: What Players Need to Know",
    excerpt: "Latest updates on Kenya's betting tax regulations.",
    category: "News", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    tags: ["Kenya", "Tax"], readTime: 6, author: "iGamingUbuntu", status: "published", views: 3124, content: "", createdAt: "2026-06-30", updatedAt: "2026-06-30",
  },
]

export default function BlogPage() {
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")

  const categories = ["All", "Sports Betting", "Casino Reviews", "Bonuses", "Guides", "News"]

  const filtered = allArticles.filter((a) => {
    const matchCategory = category === "All" || a.category === category
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">iGaming Blog</h1>
        <p className="text-text-secondary">Expert insights, betting tips, casino reviews, and iGaming news across Africa.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  category === cat
                    ? "bg-ubuntu-orange text-white shadow-md shadow-ubuntu-orange/20"
                    : "bg-card text-text-secondary hover:text-ubuntu-orange hover:bg-ubuntu-orange/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative mb-8">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, category, or keyword..."
              className="w-full px-4 py-3 pl-10 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 focus:border-ubuntu-orange/30 transition"
            />
          </div>

          <AdSlot position="in-content-1" className="mb-8 rounded-xl overflow-hidden" />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-text-secondary font-medium">No articles found matching &quot;{search}&quot;</p>
              <p className="text-sm text-text-muted mt-1">Try a different search term or category</p>
            </div>
          )}

          <div className="flex justify-center mt-10 gap-2">
            {[1].map((page) => (
              <button key={page} className="w-10 h-10 rounded-lg bg-ubuntu-orange text-white font-medium text-sm">{page}</button>
            ))}
            <button className="w-10 h-10 rounded-lg bg-card text-text-secondary font-medium text-sm hover:bg-card/80">2</button>
            <button className="w-10 h-10 rounded-lg bg-card text-text-secondary font-medium text-sm hover:bg-card/80">3</button>
            <span className="flex items-center text-text-muted px-2">...</span>
            <button className="w-10 h-10 rounded-lg bg-card text-text-secondary font-medium text-sm hover:bg-card/80">Next →</button>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <Sidebar popularPosts={allArticles} />
        </div>
      </div>
    </div>
  )
}
