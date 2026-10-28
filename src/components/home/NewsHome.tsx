import Link from "next/link"
import { FiArrowRight, FiBriefcase, FiFileText, FiGlobe, FiShield } from "react-icons/fi"
import AdSlot from "@/components/AdSlot"
import Newsletter from "@/components/Newsletter"
import { formatDate } from "@/lib/utils"
import { HOME_STORY_COUNT } from "@/lib/navigation"
import type { Article } from "@/types"

/**
 * Newspaper-style front page: ticker, top stories, latest list with a slim
 * sidebar, section blocks, "what we do" band and a newsletter strip.
 */

const FALLBACK_BG = "url('/images/full backgound.png')"

function Thumb({ article, className, eager = false }: { article: Article; className: string; eager?: boolean }) {
  if (!article.featuredImage) {
    return <div className={`${className} bg-cover bg-center bg-gray-200`} style={{ backgroundImage: FALLBACK_BG }} />
  }
  return (
    <img
      src={article.featuredImage}
      alt={article.featuredImageAlt || article.title}
      width={1200}
      height={675}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`${className} object-cover`}
    />
  )
}

function SectionTitle({ children, href }: { children: React.ReactNode; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-5 border-b border-gray-200">
      <h2 className="inline-block bg-brand-teal text-white text-sm md:text-base font-semibold px-3 py-1.5">{children}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-brand-teal-dark hover:underline inline-flex items-center gap-1">
          More <FiArrowRight size={13} />
        </Link>
      )}
    </div>
  )
}

function Meta({ article, light = false }: { article: Article; light?: boolean }) {
  return (
    <p className={`text-xs ${light ? "text-white/80" : "text-gray-500"}`}>
      {article.category && <span className={`font-semibold ${light ? "text-brand-lime" : "text-brand-teal-dark"}`}>{article.category}</span>}
      {article.category && " · "}
      {formatDate(article.createdAt)}
    </p>
  )
}

/** Image card with the headline laid over a dark gradient (Top Stories). */
function OverlayCard({ article, big = false }: { article: Article; big?: boolean }) {
  return (
    <Link href={`/news/${article.slug}`} className="group relative block overflow-hidden bg-gray-900 h-full">
      <Thumb article={article} eager={big} className="absolute inset-0 w-full h-full group-hover:scale-[1.03] transition duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 ${big ? "p-5 md:p-7" : "p-4 md:p-5"}`}>
        <Meta article={article} light />
        <h3 className={`text-white font-bold leading-snug mt-2 group-hover:underline decoration-2 underline-offset-4 ${big ? "text-xl md:text-3xl" : "text-base md:text-lg"}`}>
          {article.title}
        </h3>
        {big && article.excerpt && <p className="hidden md:block text-sm text-white/80 mt-3 line-clamp-2 max-w-2xl">{article.excerpt}</p>}
      </div>
    </Link>
  )
}

/** Thumbnail on the left, text on the right (Latest News list). */
function ListItem({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex gap-4 py-5 border-b border-gray-100 last:border-0">
      <Thumb article={article} className="w-32 h-24 sm:w-48 sm:h-32 shrink-0 rounded" />
      <div className="min-w-0">
        <Meta article={article} />
        <h3 className="font-bold text-brand-deep text-base sm:text-lg leading-snug mt-1 group-hover:text-brand-teal transition-colors line-clamp-3">
          {article.title}
        </h3>
        {article.excerpt && <p className="hidden sm:block text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">{article.excerpt}</p>}
      </div>
    </Link>
  )
}

/** Image on top, headline below (section blocks). */
function GridCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <div className="aspect-[16/10] overflow-hidden rounded bg-gray-100">
        <Thumb article={article} className="w-full h-full group-hover:scale-[1.03] transition duration-500" />
      </div>
      <div className="mt-3">
        <Meta article={article} />
        <h3 className="font-bold text-brand-deep leading-snug mt-1 group-hover:text-brand-teal transition-colors line-clamp-3">{article.title}</h3>
      </div>
    </Link>
  )
}

const OFFERS = [
  { icon: FiFileText, title: "Daily industry news", desc: "Same-day reporting on operators, launches, deals and results across Africa." },
  { icon: FiShield, title: "Regulation tracking", desc: "New laws, licence rules and tax changes, explained in plain English." },
  { icon: FiGlobe, title: "Country guides", desc: "How betting works in Kenya, Nigeria, South Africa, Ghana, Uganda and more." },
  { icon: FiBriefcase, title: "Advertising and press releases", desc: "Sponsored articles, banners and press release publishing for brands entering Africa." },
]

export interface NewsHomeProps {
  /** All public articles, newest first. The lists below are filtered from it. */
  articles: Article[]
  regulation: Article[]
  industry: Article[]
  /** Guides plus payments and other market explainers. */
  guides: Article[]
}

export default function NewsHome({ articles, regulation, industry, guides }: NewsHomeProps) {
  const used = new Set<string>()
  const take = (list: Article[], n: number) => {
    const out = list.filter((a) => !used.has(a.slug)).slice(0, n)
    out.forEach((a) => used.add(a.slug))
    return out
  }

  const ticker = articles.slice(0, 8)
  const [lead, ...side] = take(articles, 3)
  // 3 top stories + 5 latest = HOME_STORY_COUNT; /page/2 continues from the next story.
  const latest = take(articles, HOME_STORY_COUNT - 3)
  const regulationList = regulation.filter((a) => !used.has(a.slug)).slice(0, 5)
  const industryBlock = take(industry, 4)
  const guidesBlock = take(guides, 4)

  return (
    <div className="bg-white">
      {/* Ticker */}
      {ticker.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pt-5">
          <div className="flex items-stretch overflow-hidden bg-brand-teal text-white text-sm">
            <span className="shrink-0 bg-brand-lime text-brand-ink px-4 py-2.5 font-bold">Latest</span>
            <div className="overflow-hidden flex-1">
              <div className="flex w-max animate-marquee">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex" aria-hidden={copy === 1}>
                    {ticker.map((a) => (
                      <Link key={`${copy}-${a.slug}`} href={`/news/${a.slug}`} tabIndex={copy === 1 ? -1 : undefined} className="px-6 py-2.5 whitespace-nowrap hover:underline">
                        {a.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 pb-14">
        <h1 className="sr-only">Latest African iGaming News</h1>

        {/* Top stories */}
        {lead && (
          <section className="pt-8">
            <SectionTitle>Top Stories</SectionTitle>
            <div className="grid lg:grid-cols-3 gap-1">
              <div className="lg:col-span-2 h-[320px] md:h-[460px]">
                <OverlayCard article={lead} big />
              </div>
              <div className="grid grid-rows-2 gap-1 h-[400px] md:h-[460px]">
                {side.map((a) => (
                  <OverlayCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        <AdSlot position="leaderboard-top" className="pt-10" />

        {/* Latest news + sidebar */}
        <section className="pt-12 grid lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <SectionTitle href="/page/2">Latest News</SectionTitle>
            <div>
              {latest.map((a) => (
                <ListItem key={a.slug} article={a} />
              ))}
            </div>
            <Link href="/page/2" className="mt-6 inline-flex items-center gap-2 border border-gray-300 text-brand-deep px-5 py-2.5 rounded text-sm font-semibold hover:border-brand-teal hover:text-brand-teal transition">
              More news <FiArrowRight size={14} />
            </Link>
          </div>

          <aside className="space-y-8">
            {regulationList.length > 0 && (
              <div>
                <SectionTitle href="/news/regulation">Regulation Watch</SectionTitle>
                <ol className="space-y-4">
                  {regulationList.map((a, i) => (
                    <li key={a.slug} className="flex gap-3">
                      <span className="text-2xl font-extrabold text-brand-teal/30 leading-none w-7 shrink-0">{i + 1}</span>
                      <Link href={`/news/${a.slug}`} className="group">
                        <span className="block font-semibold text-brand-deep text-sm leading-snug group-hover:text-brand-teal transition-colors">{a.title}</span>
                        <span className="block text-xs text-gray-500 mt-1">{formatDate(a.createdAt)}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* A paid banner, or an "Advertise here" box when the slot is empty. */}
            <AdSlot position="sidebar-1" />
          </aside>
        </section>

        <AdSlot position="footer-banner" className="pt-12" />

        {/* Section blocks */}
        {industryBlock.length >= 2 && (
          <section className="pt-12">
            <SectionTitle href="/news/industry">Industry News</SectionTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryBlock.map((a) => (
                <GridCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {guidesBlock.length >= 2 && (
          <section className="pt-12">
            <SectionTitle href="/guides">Guides and Markets</SectionTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guidesBlock.map((a) => (
                <GridCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* What we do */}
      <section className="bg-brand-ink text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="inline-block border-l-4 border-brand-lime pl-3 text-xl md:text-2xl font-bold">What we do</h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 mt-8">
            {OFFERS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <span className="w-11 h-11 shrink-0 rounded-full bg-brand-lime/15 text-brand-lime flex items-center justify-center">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-white/70 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/advertise" className="mt-10 inline-flex items-center gap-2 bg-brand-lime text-brand-ink px-6 py-3 rounded font-bold text-sm hover:brightness-110 transition">
            Work with iGamingUbuntu <FiArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Newsletter variant="band" />
    </div>
  )
}
