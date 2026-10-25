import { getAllPublicArticles, getLatestArticles } from "@/lib/serverArticles"
import HomeClient, { type HomeStats } from "@/components/HomeClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export const revalidate = 300

const COUNTRY_PAGES = ["kenya", "nigeria", "south-africa", "ghana", "tanzania"]
const NOT_A_MARKET = /^(global|general|africa|)$/i

function normalizeCountry(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-")
}

export default async function HomePage() {
  // Server-rendered list of the latest published articles so Google sees
  // the same article links a reader sees.
  const [articles, all] = await Promise.all([getLatestArticles(12), getAllPublicArticles()])

  // Real numbers only: counted from the CMS, never hardcoded.
  const markets = new Set<string>()
  for (const article of all) {
    for (const raw of (article.country || "").split(",")) {
      const country = normalizeCountry(raw)
      if (country && !NOT_A_MARKET.test(country)) markets.add(country)
    }
  }

  const stats: HomeStats = {
    articles: all.length,
    markets: Math.max(markets.size, COUNTRY_PAGES.length),
    guides: COUNTRY_PAGES.length,
  }

  return <HomeClient initialArticles={articles} stats={stats} />
}
