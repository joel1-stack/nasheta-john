import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /go/ holds affiliate redirects: they carry no content, and letting
        // them be crawled spends budget and exposes paid links as pages.
        disallow: ["/igub-cms-x7k9/", "/api/", "/go/"],
      },
    ],
    sitemap: [
      "https://www.igamingubuntu.com/sitemap.xml",
      "https://www.igamingubuntu.com/blog-sitemap.xml",
      "https://www.igamingubuntu.com/news-sitemap.xml",
    ],
  }
}
