import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/igub-cms-x7k9/", "/api/"],
      },
    ],
    sitemap: ["https://www.igamingubuntu.com/sitemap.xml", "https://www.igamingubuntu.com/blog-sitemap.xml"],
  }
}
