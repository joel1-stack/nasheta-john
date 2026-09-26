"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Article } from "@/types"

interface Props {
  category?: string
  country?: string
  limit?: number
  initialArticles?: Article[]
  initialHasMore?: boolean
}

export default function CategoryArticleList({
  category,
  country,
  limit: limitCount,
  initialArticles = [],
  initialHasMore = false,
}: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [loading, setLoading] = useState(initialArticles.length === 0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)

  useEffect(() => {
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
      .catch(() => {
        if (initialArticles.length === 0) setArticles([])
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="space-y-6">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
          <div className="aspect-[21/9] bg-gray-200" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-7 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
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

  const [featured, ...rest] = articles

  return (
    <div className="space-y-6">
      {/* First article highlighted at top */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      >
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="relative h-52 md:h-full min-h-[200px] overflow-hidden bg-gray-100">
            {featured.featuredImage ? (
              <img
                src={featured.featuredImage}
                alt={featured.title}
                width={1200}
                height={675}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/full backgound.png')" }}
              >
                <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">iGamingUbuntu</span>
              </div>
            )}
            {featured.category && (
              <span className="absolute top-3 left-3 bg-[#f59e0b] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {featured.category}
              </span>
            )}
          </div>
          <div className="p-5 md:p-6 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b] mb-2">Featured</span>
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
              <span>{featured.readTime || 3} min read</span>
              <span>{featured.views || 0} views</span>
            </div>
            <h2 className="font-bold text-[#111827] group-hover:text-[#f59e0b] transition-colors text-lg md:text-xl leading-snug mb-2">
              {featured.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{featured.excerpt}</p>
            <span className="mt-4 text-sm font-semibold text-[#f59e0b] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read article →
            </span>
          </div>
        </div>
      </Link>

      {rest.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
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
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/full backgound.png')" }}
                  >
                    <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">iGamingUbuntu</span>
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
      )}

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
