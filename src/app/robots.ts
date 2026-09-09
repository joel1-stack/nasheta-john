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
    sitemap: "https://nasheta-john.vercel.app/sitemap.xml",
  }
}
