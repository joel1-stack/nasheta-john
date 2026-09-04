"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const PAGE_SIZE = limitCount || 12

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page: "1" })
    if (category) params.set("category", category)
    if (country && country !== "general") params.set("search", country)

    fetch(`/api/blog?${params}`)
      .then((r) => r.json())
      .then((d) => {
        let result = d.articles || []
        if (limitCount) result = result.slice(0, limitCount)
        setArticles(result)
        setHasMore(d.hasMore || false)
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [category, country, limitCount])

  const loadMore = () => {
    const nextPage = page + 1
    const params = new URLSearchParams({ page: String(nextPage) })
    if (category) params.set("category", category)
    if (country && country !== "general") params.set("search", country)

    fetch(`/api/blog?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setArticles((prev) => [...prev, ...(d.articles || [])])
        setHasMore(d.hasMore || false)
        setPage(nextPage)
      })
      .catch(() => {})
  }

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
      <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
        <p className="text-gray-500">No articles yet. Check back soon for new content.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              {article.featuredImage ? (
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-emerald-50">
                  <span className="text-gray-300 text-sm font-medium">iGamingUbuntu</span>
                </div>
              )}
              {article.category && (
                <span className="absolute top-3 left-3 bg-[#f59e0b] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <span>{article.readTime || 3} min read</span>
                <span>{article.views || 0} views</span>
              </div>
              <h3 className="font-semibold text-[#111827] group-hover:text-[#f59e0b] transition-colors line-clamp-2 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && !limitCount && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition cursor-pointer"
          >
            Load more articles
          </button>
        </div>
      )}
    </div>
  )
}
