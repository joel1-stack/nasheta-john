import { getLatestArticles } from "@/lib/serverArticles"
import HomeClient from "@/components/HomeClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export const revalidate = 300

export default async function HomePage() {
  // Server-rendered list of the latest published articles so Google sees
  // the same article links a reader sees (not just 3).
  const articles = await getLatestArticles(12)
  return <HomeClient initialArticles={articles} />
}
