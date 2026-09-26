import { queryArticles } from "@/lib/serverArticles"
import BlogListClient from "@/components/BlogListClient"

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
