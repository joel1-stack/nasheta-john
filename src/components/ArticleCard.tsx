import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition">
      <div className="aspect-[16/9] bg-card flex items-center justify-center overflow-hidden">
        {article.featuredImage ? (
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        ) : (
          <span className="text-text-muted text-sm">No image</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
          <span className="bg-ubuntu-orange/10 text-ubuntu-orange px-2 py-0.5 rounded font-medium">{article.category}</span>
          <span>{formatDate(article.createdAt)}</span>
          <span>· {article.readTime} min read</span>
        </div>
        <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition line-clamp-2 mb-2">{article.title}</h3>
        <p className="text-sm text-text-secondary line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  )
}
