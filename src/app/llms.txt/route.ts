import { queryArticles } from "@/lib/serverArticles"
import { SITE_URL } from "@/lib/site"

export const revalidate = 3600

const KEY_PAGES: [string, string, string][] = [
  ["About", "/about", "Who writes iGamingUbuntu and the editorial standards behind every article."],
  ["Editorial policy", "/editorial-policy", "How stories are sourced, checked and corrected."],
  ["How we review", "/how-we-review", "How casinos and sportsbooks are tested and rated."],
  ["Latest news", "/", "Daily African iGaming industry and regulation news, newest first."],
  ["Industry news", "/news/industry", "Operators, launches, partnerships and market moves."],
  ["Regulation watch", "/news/regulation", "Licensing, tax and law changes across African markets."],
  ["Casino directory", "/casinos", "Online casinos available to African players, by market."],
  ["Kenya", "/kenya", "Kenyan betting and gaming market coverage."],
  ["Nigeria", "/nigeria", "Nigerian betting and gaming market coverage."],
  ["South Africa", "/south-africa", "South African betting and gaming market coverage."],
  ["Ghana", "/ghana", "Ghanaian betting and gaming market coverage."],
  ["Tanzania", "/tanzania", "Tanzanian betting and gaming market coverage."],
  ["Events", "/events", "African iGaming conferences and events."],
  ["Advertise", "/advertise", "Sponsored articles, press releases and banner placements."],
  ["Contact", "/contact", "Editorial, corrections, advertising and partnership enquiries."],
]

function oneLine(s?: string): string {
  return (s || "").replace(/\s+/g, " ").trim()
}

/** llms.txt (llmstxt.org): a plain map of the site for AI assistants. */
export async function GET() {
  const { articles } = await queryArticles({ page: 1, perPage: 5000 })
  const lines = [
    "# iGamingUbuntu",
    "",
    "> Independent news, regulation analysis and market intelligence on betting, casino and lottery across Africa, for operators, affiliates, regulators and investors.",
    "",
    "Editor: Nasheta John. Markets: Nigeria, Kenya, South Africa, Ghana, Tanzania, Angola, Uganda, Zambia and other African countries.",
    "",
    "## Key pages",
    "",
    ...KEY_PAGES.map(([name, path, desc]) => `- [${name}](${SITE_URL}${path}): ${desc}`),
    "",
    "## Articles",
    "",
    ...articles
      .filter((a) => a.slug && !a.noindex)
      .map((a) => {
        const desc = oneLine(a.metaDescription || a.excerpt)
        return `- [${oneLine(a.title)}](${SITE_URL}/news/${a.slug})${desc ? `: ${desc}` : ""}`
      }),
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
