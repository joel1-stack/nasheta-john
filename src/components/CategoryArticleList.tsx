import { queryArticles } from "@/lib/serverArticles"
import CategoryArticleListClient from "./CategoryArticleListClient"

interface Props {
  category?: string
  country?: string
  limit?: number
}

export default async function CategoryArticleList({ category, country, limit }: Props) {
  const { articles, hasMore } = await queryArticles({
    category,
    search: country && country !== "general" ? country : undefined,
    page: 1,
    perPage: 12,
  })

  return (
    <CategoryArticleListClient
      category={category}
      country={country}
      limit={limit}
      initialArticles={articles}
      initialHasMore={hasMore}
    />
  )
}
