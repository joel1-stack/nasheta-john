import { queryArticles } from "@/lib/serverArticles"
import HomeClient from "@/components/HomeClient"

export const revalidate = 300

export default async function HomePage() {
  const { articles } = await queryArticles({ page: 1, perPage: 6 })
  return <HomeClient initialArticles={articles} />
}
