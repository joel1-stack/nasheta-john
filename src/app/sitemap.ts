import type { MetadataRoute } from "next"

const BASE_URL = "https://nasheta-john.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/privacy",
    "/affiliate-disclosure",
  ]

  return staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.8 : 0.7,
  }))
}
