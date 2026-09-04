"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getArticles } from "@/lib/firestoreService"
import type { Article } from "@/types"

interface Props {
  category?: string
  country?: string
  limit?: number
  all?: boolean
}

export default function CategoryArticleList({ category, country, limit: limitCount, all }: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles().then((allArticles) => {
      let filtered = allArticles
      if (category) {
        filtered = filtered.filter((a) => a.status === "published" && a.category === category)
      }
      if (country && country !== "general") {
        filtered = filtered.filter((a) => a.country === country)
      }
      filtered.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
      setArticles(limitCount ? filtered.slice(0, limitCount) : filtered)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [category, country, limitCount])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="bg-card rounded-xl p-8 text-center">
        <p className="text-text-secondary">No articles yet. Check back soon for new content.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/blog/${article.slug}`}
          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.featuredImage || "/images/Green Data Network (ABSTRACT + TECH).png"}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {article.category && (
              <span className="absolute top-3 left-3 bg-ubuntu-orange text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {article.category}
              </span>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 text-xs text-text-secondary mb-2">
              <span>{article.readTime || 3} min read</span>
              <span>{article.views || 0} views</span>
            </div>
            <h3 className="font-semibold text-text-primary group-hover:text-ubuntu-orange transition-colors line-clamp-2 mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-2">{article.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
