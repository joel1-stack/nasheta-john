import type { MetadataRoute } from "next"
import { queryArticles } from "@/lib/serverArticles"
import { SITE_URL, STATIC_PAGE_LASTMOD } from "@/lib/site"
import { articlePath, HOME_STORY_COUNT } from "@/lib/navigation"
import { NEWS_PER_PAGE } from "@/components/BlogList"

export const revalidate = 3600

/**
 * Only pages we want indexed. The /sports/*, /events/* and /casinos/* sub-hubs
 * are deliberately absent: they render their parent's article list until the
 * CMS has categories of their own, so they are marked noindex and submitting
 * them here would contradict that.
 */
const STATIC_PAGES = [
  "",
  "/about",
  "/editorial-team",
  "/contact",
  "/news/industry",
  "/news/regulation",
  "/sports",
  "/casinos",
  "/casinos/payments",
  "/events",
  "/kenya",
  "/nigeria",
  "/south-africa",
  "/ghana",
  "/tanzania",
  "/guides",
  "/press",
  "/the-desk",
  "/partners",
  "/advertise",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
]

/** Normalises a CMS date to a valid YYYY-MM-DD string, or null. */
function isoDay(value?: string): string | null {
  if (!value) return null
  const parsed = new Date(value)
  if (isNaN(parsed.getTime())) return null
  return parsed.toISOString().slice(0, 10)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages get a fixed lastmod: they only change when we edit them,
  // not every time the site is redeployed.
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: STATIC_PAGE_LASTMOD,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/news") ? 0.8 : 0.7,
  }))

  const { articles } = await queryArticles({ page: 1, perPage: 5000 })
  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${SITE_URL}${articlePath(a)}`,
      // Real update date from the CMS, never the build time.
      lastModified: isoDay(a.updatedAt) || isoDay(a.createdAt) || STATIC_PAGE_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))

  // The /page/2, /page/3 ... archive. Google reaches older stories through
  // this chain, so the pages belong in the sitemap rather than being left for
  // the crawler to walk link by link from the homepage.
  const olderCount = Math.max(0, articles.length - HOME_STORY_COUNT)
  const archivePages = Math.ceil(olderCount / NEWS_PER_PAGE)
  const archiveEntries: MetadataRoute.Sitemap = Array.from(
    { length: archivePages },
    (_, i) => ({
      url: `${SITE_URL}/page/${i + 2}`,
      lastModified: STATIC_PAGE_LASTMOD,
      changeFrequency: "daily" as const,
      priority: 0.5,
    }),
  )

  return [...staticEntries, ...archiveEntries, ...articleEntries]
}
