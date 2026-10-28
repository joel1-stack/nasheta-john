import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { queryArticles } from "@/lib/serverArticles"

interface Props {
  category?: string
  country?: string
  limit?: number
}

/**
 * Server-rendered article list for category hubs (news, sports, casinos,
 * events). Everything is in the initial HTML: no client-side refetch, and
 * only real CMS view counts are shown.
 */
export default async function CategoryArticleList({ category, country, limit }: Props) {
  const { articles } = await queryArticles({ category, country, page: 1, perPage: 12 })
  const list = limit ? articles.slice(0, limit) : articles

  if (!list.length) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
        <p className="text-gray-500">No articles yet. Check back soon for new content.</p>
        <Link href="/" className="mt-3 inline-block text-sm font-medium text-[#f59e0b] hover:underline">
          Browse all articles →
        </Link>
      </div>
    )
  }

  const [featured, ...rest] = list

  return (
    <div className="space-y-6">
      <Link
        href={`/blog/${featured.slug}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      >
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="relative h-52 md:h-full min-h-[200px] overflow-hidden bg-gray-100">
            {featured.featuredImage ? (
              <img
                src={featured.featuredImage}
                alt={featured.featuredImageAlt || featured.title}
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
              <span>{formatDate(featured.createdAt)}</span>
              <span>{featured.readTime || 3} min read</span>
              {(featured.views || 0) > 0 && <span>{featured.views.toLocaleString()} views</span>}
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
                    alt={article.featuredImageAlt || article.title}
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
                  <span>{formatDate(article.createdAt)}</span>
                  <span>{article.readTime || 3} min read</span>
                  {(article.views || 0) > 0 && <span>{article.views.toLocaleString()} views</span>}
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

      <div className="text-center mt-8">
        <Link
          href="/"
          className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition inline-block"
        >
          View all articles
        </Link>
      </div>
    </div>
  )
}
