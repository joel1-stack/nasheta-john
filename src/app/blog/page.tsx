"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ArticleCard from "@/components/ArticleCard"
import Sidebar from "@/components/Sidebar"
import AdSlot from "@/components/AdSlot"
import { getAllPublishedArticles } from "@/lib/firestoreService"
import type { Article } from "@/types"

export default function BlogPage() {
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPublishedArticles().then(setArticles).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const categories = ["All", "Sports Betting", "Casino Reviews", "Bonuses", "Betting Tips", "Industry News", "Events"]

  const filtered = articles.filter((a) => {
    const matchCategory = category === "All" || a.category === category
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const popularPosts = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)

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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-[16/9] bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
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
              <p className="text-text-secondary font-medium">No articles found.</p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <Sidebar popularPosts={popularPosts} />
        </div>
      </div>
    </div>
  )
}
