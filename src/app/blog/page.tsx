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
    category: "Sports Betting", country: "kenya", featuredImage: "", tags: ["World Cup"], readTime: 4, author: "iGamingUbuntu",
    status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews",
    excerpt: "We review the best online casinos available in Kenya for 2026.",
    category: "Casino Reviews", country: "kenya", featuredImage: "", tags: ["Kenya"], readTime: 8, author: "iGamingUbuntu",
    status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites",
    excerpt: "Complete betting guide for the 2026 FIFA World Cup.",
    category: "Betting Tips", country: "nigeria", featuredImage: "", tags: ["World Cup"], readTime: 6, author: "iGamingUbuntu",
    status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06",
  },
  {
    id: "4", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim",
    excerpt: "Get 200% up to KES 5,000 on your first deposit.",
    category: "Bonuses", country: "kenya", featuredImage: "", tags: ["SportPesa"], readTime: 5, author: "iGamingUbuntu",
    status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
  {
    id: "5", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026",
    excerpt: "Compare bonuses, odds, payment methods, and our expert ratings.",
    category: "Sports Betting", country: "nigeria", featuredImage: "", tags: ["Nigeria"], readTime: 10, author: "iGamingUbuntu",
    status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04",
  },
  {
    id: "6", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators",
    excerpt: "List of betting sites that accept M-Pesa in 2026.",
    category: "Guides", country: "kenya", featuredImage: "", tags: ["M-Pesa"], readTime: 7, author: "iGamingUbuntu",
    status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03",
  },
  {
    id: "7", slug: "betika-free-bet-offer", title: "Betika Free Bet Offer 2026: How to Get Your Free Bet",
    excerpt: "Claim your Betika free bet with this step-by-step guide.",
    category: "Bonuses", country: "kenya", featuredImage: "", tags: ["Betika"], readTime: 4, author: "iGamingUbuntu",
    status: "published", views: 2156, content: "", createdAt: "2026-07-02", updatedAt: "2026-07-02",
  },
  {
    id: "8", slug: "1xbet-registration-guide-kenya", title: "1xBet Registration Guide Kenya 2026: Step-by-Step",
    excerpt: "How to register at 1xBet in Kenya. Complete guide with screenshots.",
    category: "Guides", country: "kenya", featuredImage: "", tags: ["1xBet"], readTime: 5, author: "iGamingUbuntu",
    status: "published", views: 1876, content: "", createdAt: "2026-07-01", updatedAt: "2026-07-01",
  },
  {
    id: "9", slug: "kenya-betting-tax-update-2026", title: "Kenya Betting Tax Update 2026: What Players Need to Know",
    excerpt: "Latest updates on Kenya's betting tax regulations and how they affect players.",
    category: "News", country: "kenya", featuredImage: "", tags: ["Kenya", "Tax"], readTime: 6, author: "iGamingUbuntu",
    status: "published", views: 3124, content: "", createdAt: "2026-06-30", updatedAt: "2026-06-30",
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Blog</h1>
            <p className="text-text-secondary">iGaming insights, betting tips, and casino reviews across Africa.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                  category === cat ? "bg-ubuntu-orange text-white" : "bg-card text-text-secondary hover:text-ubuntu-orange"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50"
            />
          </div>

          <AdSlot position="in-content-1" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-text-muted text-center py-12">No articles found. Try a different search.</p>
          )}
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <Sidebar popularPosts={allArticles} />
        </div>
      </div>
    </div>
  )
}
