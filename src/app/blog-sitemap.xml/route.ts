import { queryArticles } from "@/lib/serverArticles"
import { SITE_URL, STATIC_PAGE_LASTMOD } from "@/lib/site"

const blogHubPaths = [
  "/news/industry",
  "/news/regulation",
  "/sports",
  "/sports/live",
  "/sports/predictions",
  "/sports/leagues",
  "/sports/basics",
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
  "/guides",
  "/reviews",
  "/press",
  "/the-desk",
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function isoDay(value?: string): string | null {
  if (!value) return null
  const parsed = new Date(value)
  if (isNaN(parsed.getTime())) return null
  return parsed.toISOString().slice(0, 10)
}

export const dynamic = "force-dynamic"

export async function GET(): Promise<Response> {
  const { articles } = await queryArticles({ page: 1, perPage: 10000 })

  const entries: { loc: string; lastmod: string }[] = blogHubPaths.map((path) => ({
    loc: `${SITE_URL}${path}`,
    // Fixed date for hub pages, not the build time.
    lastmod: STATIC_PAGE_LASTMOD,
  }))

  for (const article of articles) {
    if (!article.slug) continue
    const lastmod = isoDay(article.updatedAt) || isoDay(article.createdAt) || STATIC_PAGE_LASTMOD
    entries.push({
      loc: `${SITE_URL}/blog/${article.slug}`,
      lastmod,
    })
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${escapeXml(e.loc)}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <changefreq>weekly</changefreq>\n` +
          `    <priority>0.8</priority>\n` +
          `  </url>\n`
      )
      .join("") +
    `</urlset>\n`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
