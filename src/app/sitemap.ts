import type { MetadataRoute } from "next"
import { queryArticles } from "@/lib/serverArticles"
import { SITE_URL, STATIC_PAGE_LASTMOD } from "@/lib/site"

export const revalidate = 3600

const STATIC_PAGES = [
  "",
  "/about",
  "/services",
  "/contact",
  "/work-with-me",
  "/blog",
  "/news",
  "/news/industry",
  "/news/regulation",
  "/sports",
  "/sports/live",
  "/sports/predictions",
  "/sports/leagues",
  "/sports/basics",
  "/reviews",
  "/casinos",
  "/casinos/new",
  "/casinos/best",
  "/casinos/mobile",
  "/casinos/payments",
  "/casinos/market",
  "/events",
  "/events/upcoming",
  "/events/recaps",
  "/events/webinars",
  "/kenya",
  "/nigeria",
  "/south-africa",
  "/ghana",
  "/tanzania",
  "/global",
  "/guides",
  "/press",
  "/the-desk",
  "/seo-content-writing",
  "/translation-services",
  "/editing-services",
  "/link-building-services",
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
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.8 : 0.7,
  }))

  const { articles } = await queryArticles({ page: 1, perPage: 5000 })
  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      // Real update date from the CMS, never the build time.
      lastModified: isoDay(a.updatedAt) || isoDay(a.createdAt) || STATIC_PAGE_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))

  return [...staticEntries, ...articleEntries]
}
