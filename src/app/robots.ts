import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The CMS path is deliberately not listed here: Disallow would only
        // advertise its exact location in a public file, and it is already
        // kept out of search results by noindex, nofollow on every CMS page,
        // and out of real use by Firebase auth plus Firestore rules.
        // /go/ holds affiliate redirects: they carry no content, and letting
        // them be crawled spends budget and exposes paid links as pages.
        disallow: ["/api/", "/go/", "/search"],
      },
      // Named explicitly so an AI crawler's own default behaviour (some skip
      // unnamed "*" rules) never blocks it. Same allow/disallow as above.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "Claude-SearchBot",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
          "DuckAssistBot",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: ["/api/", "/go/", "/search"],
      },
    ],
    sitemap: [
      "https://www.igamingubuntu.com/sitemap.xml",
      "https://www.igamingubuntu.com/articles-sitemap.xml",
      "https://www.igamingubuntu.com/news-sitemap.xml",
    ],
  }
}
