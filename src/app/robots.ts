import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /go/ holds affiliate redirects: they carry no content, and letting
        // them be crawled spends budget and exposes paid links as pages.
        disallow: ["/igub-cms-x7k9/", "/api/", "/go/", "/search"],
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
        disallow: ["/igub-cms-x7k9/", "/api/", "/go/", "/search"],
      },
    ],
    sitemap: [
      "https://www.igamingubuntu.com/sitemap.xml",
      "https://www.igamingubuntu.com/articles-sitemap.xml",
      "https://www.igamingubuntu.com/news-sitemap.xml",
    ],
  }
}
