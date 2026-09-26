import type { MetadataRoute } from "next"
import { getDb } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

const BASE_URL = "https://igamingubuntu.com"

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
    "/privacy",
    "/affiliate-disclosure",
  ]

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.8 : 0.7,
  }))

  try {
    const fb = getDb()
    if (fb) {
      const snap = await getDocs(collection(fb, "articles"))
      snap.docs.forEach((d) => {
        const data = d.data()
        if (data?.status === "published" && data?.slug) {
          const updated = data.updatedAt?.toDate?.() || data.createdAt?.toDate?.() || new Date()
          entries.push({
            url: `${BASE_URL}/blog/${data.slug}`,
            lastModified: updated,
            changeFrequency: "weekly",
            priority: 0.8,
          })
        }
      })
    }
  } catch (err) {
    console.error("Sitemap: failed to fetch articles", err)
  }

  return entries
}
