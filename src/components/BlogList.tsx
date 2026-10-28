import Link from "next/link"
import { FiArrowRight, FiClock, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { formatDate } from "@/lib/utils"
import { MOST_READ_MIN_ARTICLES, SHOW_MOST_READ } from "@/lib/site"
import Newsletter from "@/components/Newsletter"
import type { Article } from "@/types"

export interface BlogListProps {
  articles: Article[]
  popular: Article[]
  total: number
  page: number
  totalPages: number
  category: string
  search: string
  categories: string[]
  /** Base path used for pagination links ("/blog"). */
  basePath?: string
  /** Front-page mode: news heading, no breadcrumb. */
  frontPage?: boolean
}

const exploreItems = [
  { name: "Kenya", slug: "kenya", isCountry: true },
  { name: "Nigeria", slug: "nigeria", isCountry: true },
  { name: "South Africa", slug: "south-africa", isCountry: true },
  { name: "Ghana", slug: "ghana", isCountry: true },
  { name: "Tanzania", slug: "tanzania", isCountry: true },
  { name: "Casino Reviews", slug: "reviews", isCountry: false },
  { name: "Sports Betting", slug: "sports", isCountry: false },
  { name: "Tips & Guides", slug: "guides", isCountry: false },
]

const DEFAULT_CATEGORIES = ["Sports Betting", "Casino Reviews", "Bonuses", "Betting Tips", "Industry News", "Events"]

/** Filter chips: "All", the default categories, then any category used in the CMS. */
export function newsCategories(all: Article[]): string[] {
  return ["All", ...new Set<string>([...DEFAULT_CATEGORIES, ...all.map((a) => a.category).filter(Boolean)])]
}

function getFlagEmoji(slug: string): string {
  const map: Record<string, string> = { kenya: "KE", nigeria: "NG", "south-africa": "ZA", ghana: "GH", tanzania: "TZ" }
  return map[slug] || ""
}

/** Builds a crawlable /blog URL that keeps the active filter and page. */
export function blogHref({
  basePath = "/blog",
  page,
  category,
  search,
}: {
  basePath?: string
  page?: number
  category?: string
  search?: string
}): string {
  const params = new URLSearchParams()
  if (page && page > 1) params.set("page", String(page))
  if (category && category !== "All") params.set("category", category)
  if (search) params.set("search", search)
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

function pageNumbers(page: number, totalPages: number): number[] {
  const max = 7
  if (totalPages <= max) return Array.from({ length: totalPages }, (_, i) => i + 1)
  if (page <= 4) return Array.from({ length: max }, (_, i) => i + 1)
  if (page >= totalPages - 3) return Array.from({ length: max }, (_, i) => totalPages - max + 1 + i)
  return Array.from({ length: max }, (_, i) => page - 3 + i)
}

export default function BlogList({
  articles,
  popular,
  total,
  page,
  totalPages,
  category,
  search,
  categories,
  basePath = "/blog",
  frontPage = false,
}: BlogListProps) {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200/60 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-5 pt-6 pb-5">
          {!frontPage && (
            <nav className="text-[13px] text-[#6B7280] mb-3 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#1A1F2B] transition">Home</Link>
              <span className="text-gray-300" aria-hidden="true">&rsaquo;</span>
              <span className="text-[#1A1F2B] font-medium">All News</span>
            </nav>
          )}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-[22px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
                {frontPage ? "Latest African iGaming News" : "All News"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Independent news on betting, casino, regulation and payments across Africa.
              </p>
            </div>
            {total > 0 && <p className="text-xs text-gray-400 shrink-0">{total} articles</p>}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pt-6 md:pt-8">
          <div className="flex-1 min-w-0">
            {/* Filters are real links so every filter and page is crawlable. */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={blogHref({ basePath, category: cat, search })}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? "bg-[#f59e0b] text-white shadow-md shadow-[#f59e0b]/20"
                      : "bg-white text-gray-500 hover:text-[#111827] hover:bg-gray-100 border border-gray-200 shadow-sm"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            {search && (
              <div className="mb-6 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                Showing results for &ldquo;<span className="font-medium text-[#111827]">{search}</span>&rdquo;
                <Link href={blogHref({ basePath, category })} className="ml-2 text-[#f59e0b] hover:underline font-medium">Clear</Link>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mb-4 text-xs text-gray-400">
                Page {page} of {totalPages} ({total} articles)
              </div>
            )}

            {featured && (
              <>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-[#f59e0b]/30 transition-all duration-300 mb-6"
                >
                  <div className="grid md:grid-cols-[1.4fr_1fr]">
                    <div className="relative h-52 md:h-full min-h-[200px] overflow-hidden bg-gray-50">
                      {featured.featuredImage ? (
                        <img src={featured.featuredImage} alt={featured.featuredImageAlt || featured.title} width={1200} height={675} loading="eager" fetchPriority="high"className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/full backgound.png')" }}>
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
                      <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                        <FiCalendar size={11} />
                        {formatDate(featured.createdAt)}
                        <span>·</span>
                        <FiClock size={11} />
                        {featured.readTime || 3} min read
                      </div>
                      <h2 className="font-bold text-[#1A1F2B] group-hover:text-[#22C55E] transition-colors text-lg md:text-xl leading-snug mb-2">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{featured.excerpt}</p>
                      <span className="mt-4 text-sm font-semibold text-[#f59e0b] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read article <FiArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>

                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rest.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-[#f59e0b]/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-gray-50 relative">
                          {article.featuredImage ? (
                            <img src={article.featuredImage} alt={article.featuredImageAlt || article.title} width={1200} height={675} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/full backgound.png')" }}>
                              <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">iGamingUbuntu</span>
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">{article.category}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <FiCalendar size={11} />
                              {formatDate(article.createdAt)}
                            </span>
                          </div>
                          <h3 className="font-bold text-[#1A1F2B] group-hover:text-[#22C55E] transition-colors line-clamp-2 mb-2 text-base leading-snug">{article.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                            <span className="text-gray-400 flex items-center gap-1">
                              <FiClock size={12} />
                              {article.readTime || 3} min read
                            </span>
                            <span className="text-[#f59e0b] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              Read <FiArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination: real <a href> links, no JavaScript required. */}
                {totalPages > 1 && (
                  <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                    {page > 1 ? (
                      <Link
                        href={blogHref({ basePath, page: page - 1, category, search })}
                        rel="prev"
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
                      >
                        <FiChevronLeft size={14} /> Prev
                      </Link>
                    ) : (
                      <span aria-disabled="true" className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-300 shadow-sm cursor-not-allowed">
                        <FiChevronLeft size={14} /> Prev
                      </span>
                    )}

                    {pageNumbers(page, totalPages).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={blogHref({ basePath, page: pageNum, category, search })}
                        aria-current={page === pageNum ? "page" : undefined}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border shadow-sm transition-all ${
                          page === pageNum
                            ? "bg-[#f59e0b] text-white border-[#f59e0b]"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    ))}

                    {page < totalPages ? (
                      <Link
                        href={blogHref({ basePath, page: page + 1, category, search })}
                        rel="next"
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
                      >
                        Next <FiChevronRight size={14} />
                      </Link>
                    ) : (
                      <span aria-disabled="true" className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-300 shadow-sm cursor-not-allowed">
                        Next <FiChevronRight size={14} />
                      </span>
                    )}
                  </nav>
                )}
              </>
            )}

            {!featured && (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium">No articles found.</p>
                {(search || category !== "All") && (
                  <Link href={basePath} className="mt-2 inline-block text-[#f59e0b] hover:underline text-sm">Clear filters</Link>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-[350px] shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Real CMS view counts only, and off by default: the old "Most
                Read" list was sample content with invented numbers. */}
            {SHOW_MOST_READ && popular.length >= MOST_READ_MIN_ARTICLES && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <div className="flex items-center justify-between mb-4 border-l-4 border-[#22C55E] pl-3">
                  <h3 className="font-bold text-[#1A1F2B] text-sm uppercase tracking-wide">Most Read</h3>
                  <Link href={basePath} className="text-xs text-[#22C55E] font-medium hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {popular.map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group items-start">
                      <span className="text-[#F59E0B] font-extrabold text-xl w-8 shrink-0 leading-none pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} width={80} height={60} loading="lazy" className="w-20 h-[60px] rounded-md object-cover shrink-0" />
                      ) : (
                        <div className="w-20 h-[60px] rounded-md shrink-0 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/full backgound.png')" }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-bold text-[#1A1F2B] group-hover:text-[#22C55E] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-1.5">
                          <span>{post.views.toLocaleString()} views</span>
                          <span>· {post.readTime || 3} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="font-bold text-[#111827] mb-4 pb-3 border-b border-gray-100">Explore</h3>
              <div className="space-y-1">
                {exploreItems.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#111827] hover:bg-gray-50 px-3 py-2 rounded-lg transition-all">
                    {item.isCountry ? (
                      <span className="w-6 h-5 flex items-center justify-center text-[10px] font-bold bg-gray-100 text-gray-500 rounded">{getFlagEmoji(item.slug)}</span>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-xs bg-amber-50 text-[#f59e0b] rounded">◆</span>
                    )}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Newsletter />

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="font-bold text-[#111827] mb-2">Advertise with us</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                Reach operators, affiliates and regulators across Africa with sponsored articles, press releases and banners.
              </p>
              <Link href="/advertise" className="inline-flex items-center gap-1 text-sm font-semibold text-[#f59e0b] hover:underline">
                See options <FiArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
