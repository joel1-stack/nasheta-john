import { queryArticles } from "@/lib/serverArticles"
import BlogListClient from "@/components/BlogListClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Betting Tips, News and Casino Guides Blog",
  description:
    "Read the latest betting tips, sports predictions, casino reviews and iGaming industry news from iGamingUbuntu's expert editorial team across Africa.",
  alternates: { canonical: "/blog" },
}

export const dynamic = "force-dynamic"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const sp = await searchParams
  const search = sp?.search || ""

  const { articles, total, hasMore } = await queryArticles({
    search: search || undefined,
    page: 1,
    perPage: 12,
  })

  return (
    <BlogListClient
      initialArticles={articles}
      initialTotal={total}
      initialHasMore={hasMore}
      urlSearch={search}
    />
  )
}
