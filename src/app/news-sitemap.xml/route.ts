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
  const publishable = (await getAllPublicArticles()).filter(
    (a) => !a.noindex && !Number.isNaN(Date.parse(a.createdAt || "")),
  )
  const fresh = publishable.filter((a) => Date.parse(a.createdAt) >= cutoff)

  // Search Console reports an empty <urlset> as an error, and the file is
  // empty whenever nothing has been published for two days. Fall back to the
  // newest story so the sitemap is always valid; Google News ignores entries
  // outside its own 48-hour window, so nothing stale can be picked up.
  const recent = fresh.length > 0 ? fresh : publishable.slice(0, 1)

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
