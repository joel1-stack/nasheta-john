import type { Metadata } from "next"
import Link from "next/link"
import { getArticleBySlug } from "@/lib/firestoreService"
import ArticleView from "./article-view"
import type { Article } from "@/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

function buildArticleMetadata(article: Article, slug: string): Metadata {
  const title = article.seoTitle || article.title
  const description = article.metaDescription || article.excerpt || ""
  const canonical = article.canonicalUrl || `/blog/${slug}`
  const image = article.ogImage || article.featuredImage

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "iGamingUbuntu",
      ...(image ? { images: [{ url: image }] } : {}),
      ...(article.createdAt ? { publishedTime: article.createdAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: "Article Not Found" }
  return buildArticleMetadata(article, slug)
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-fade-up bg-white min-h-screen">
        <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 4a2 2 0 00-3.48 0L3.34 16a2 2 0 001.73 3z" />
        </svg>
        <h1 className="text-2xl font-bold text-[#1A1F2B] mb-2">Article Not Found</h1>
        <p className="text-[#6B7280]">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/blog" className="inline-block mt-4 text-[#22C55E] font-medium hover:underline">&larr; Back to Blog</Link>
      </div>
    )
  }

  const articleUrl = article.canonicalUrl || `https://www.igamingubuntu.com/blog/${article.slug}`
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.ogImage || article.featuredImage,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.authorName || article.author || "Nasheta John",
      description: article.authorBio || "iGaming content specialist covering African markets",
    },
    publisher: {
      "@type": "Organization",
      name: "iGamingUbuntu",
      logo: { "@type": "ImageObject", url: "https://www.igamingubuntu.com/favicon.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  }

  return (
    <>
      <ArticleView key={slug} initialArticle={article} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </>
  )
}
