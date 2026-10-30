import { getAllPublicArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"
import { SITE_URL } from "@/lib/site"

export const revalidate = 600

const TITLE = "iGamingUbuntu"
const DESCRIPTION =
  "Independent news and analysis on betting, casino, regulation and payments across Africa."
const LIMIT = 40

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/** Fallback summary when an article has no excerpt. */
function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
}

function rfc822(value?: string): string {
  const parsed = new Date(value || "")
  return isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString()
}

/**
 * RSS 2.0 feed. Aggregators, Google News discovery and the media partners we
 * syndicate with all expect one at /feed; until this existed the site had no
 * machine-readable way to announce new stories.
 */
export async function GET() {
  const articles = (await getAllPublicArticles())
    .filter((a) => !a.noindex)
    .slice(0, LIMIT)

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}${articlePath(a)}`
      const summary = a.excerpt || plainText(a.content || "").slice(0, 300)
      const image = a.featuredImage
        ? `\n      <enclosure url="${escapeXml(a.featuredImage)}" type="image/jpeg" />`
        : ""
      const category = a.category
        ? `\n      <category>${escapeXml(a.category)}</category>`
        : ""
      return `    <item>
      <title>${escapeXml(a.title || "")}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${rfc822(a.createdAt)}</pubDate>
      <description>${escapeXml(summary)}</description>
      <dc:creator>${escapeXml(a.authorName || a.author || TITLE)}</dc:creator>${category}${image}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(articles[0]?.createdAt)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  })
}
