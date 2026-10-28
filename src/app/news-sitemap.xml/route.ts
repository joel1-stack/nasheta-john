import { getAllPublicArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"
import { SITE_URL } from "@/lib/site"

export const revalidate = 300

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

/**
 * Google News sitemap: stories published in the last 48 hours (Google News
 * only reads that window), with publication name, language and date.
 */
export async function GET() {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000
  const recent = (await getAllPublicArticles()).filter((a) => {
    const t = Date.parse(a.createdAt || "")
    return !a.noindex && !Number.isNaN(t) && t >= cutoff
  })

  const items = recent
    .map(
      (a) => `  <url>
    <loc>${SITE_URL}${articlePath(a)}</loc>
    <news:news>
      <news:publication>
        <news:name>iGamingUbuntu</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.createdAt).toISOString()}</news:publication_date>
      <news:title>${escapeXml(a.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>
`
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}
