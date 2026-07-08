import Link from "next/link"
import ArticleCard from "./ArticleCard"
import type { Article } from "@/types"

interface LatestPostsProps {
  articles: Article[]
}

export default function LatestPosts({ articles }: LatestPostsProps) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-primary">Latest iGaming Insights</h2>
          <Link href="/blog" className="text-sm text-ubuntu-orange font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
