import NewsHome from "@/components/home/NewsHome"
import { getAllPublicArticles, sameCategory } from "@/lib/serverArticles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export const revalidate = 300

/** The front page is the news itself, laid out like a newspaper. */
export default async function HomePage() {
  const articles = await getAllPublicArticles()
  const inCategory = (...names: string[]) => articles.filter((a) => names.some((n) => sameCategory(a.category, n)))

  return (
    <NewsHome
      articles={articles}
      regulation={inCategory("Regulation")}
      industry={inCategory("Industry News")}
      guides={inCategory("Guides", "Payments")}
    />
  )
}
