import type { MetadataRoute } from "next"
import { queryArticles } from "@/lib/serverArticles"

const BASE_URL = "https://www.igamingubuntu.com"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
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

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.8 : 0.7,
  }))

  const { articles } = await queryArticles({ page: 1, perPage: 1000 })
  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => {
      const updated = a.updatedAt ? new Date(a.updatedAt) : null
      return {
        url: `${BASE_URL}/blog/${a.slug}`,
        lastModified: updated && !isNaN(updated.getTime()) ? updated : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }
    })

  return [...staticEntries, ...articleEntries]
}
