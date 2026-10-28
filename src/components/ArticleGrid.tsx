import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"
import { articlePath } from "@/lib/navigation"

interface ArticleGridProps {
  articles: Article[]
  emptyMessage?: string
  /** Maximum number of cards to show. */
  limit?: number
  columns?: 2 | 3
}

/**
 * Server-rendered article grid used by the country and guide hubs.
 * Everything here is real CMS data: no hardcoded demo posts, no fake views.
 */
export default function ArticleGrid({ articles, emptyMessage, limit, columns = 2 }: ArticleGridProps) {
  const list = limit ? articles.slice(0, limit) : articles

  if (!list.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
        <p className="text-gray-500 text-sm">
          {emptyMessage || "No articles published for this section yet. Check back soon."}
        </p>
        <Link href="/" className="mt-3 inline-block text-sm font-medium text-[#f59e0b] hover:underline">
          Browse all articles →
        </Link>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"} gap-6`}>
      {list.map((a) => (
        <Link
          key={a.slug}
          href={articlePath(a)}
          className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <div className="aspect-[16/9] overflow-hidden bg-gray-50">
            {a.featuredImage ? (
              <img
                src={a.featuredImage}
                alt={a.featuredImageAlt || a.title}
                width={1200}
                height={675}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/full backgound.png')" }}>
                <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">iGamingUbuntu</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              {a.category && (
                <span className="text-xs text-[#f59e0b] font-medium bg-amber-50 px-2 py-0.5 rounded">{a.category}</span>
              )}
              <span className="text-xs text-gray-400">{formatDate(a.createdAt)}</span>
            </div>
            <h3 className="font-bold text-[#111827] group-hover:text-[#f59e0b] transition mb-1">{a.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{a.excerpt}</p>
            <p className="text-xs text-gray-400 mt-2">
              {a.readTime || 3} min read
              
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
