import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up">
      <div className="aspect-[16/9] bg-gradient-to-br from-ubuntu-orange/10 to-ubuntu-purple/10 flex items-center justify-center overflow-hidden">
        {article.featuredImage ? (
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ubuntu-orange/20 to-ubuntu-purple/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-ubuntu-orange/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
          <span className="bg-ubuntu-orange/10 text-ubuntu-orange px-2.5 py-0.5 rounded-full font-medium">{article.category}</span>
          <span>{formatDate(article.createdAt)}</span>
          <span>· {article.readTime} min read</span>
        </div>
        <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition-colors line-clamp-2 mb-2 text-lg">{article.title}</h3>
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center gap-3 mt-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            {article.views.toLocaleString()}
          </span>
          <span className="text-ubuntu-orange font-medium group-hover:translate-x-1 transition-transform">Read more →</span>
        </div>
      </div>
    </Link>
  )
}
