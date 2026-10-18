import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/firestoreService"
import ArticleView from "./article-view"
import type { Article } from "@/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

const TITLE_SUFFIX = " | iGamingUbuntu"
const MAX_TITLE_LENGTH = 65

function fitSearchTitle(base: string): string | { absolute: string } {
  const budget = MAX_TITLE_LENGTH - TITLE_SUFFIX.length
  if (base.length <= budget) return base
  if (base.length <= MAX_TITLE_LENGTH) return { absolute: base }
  const cut = base.slice(0, MAX_TITLE_LENGTH - 1).replace(/\s+\S*$/, "").trimEnd()
  return { absolute: `${cut || base.slice(0, MAX_TITLE_LENGTH - 1)}…` }
}

function isValidCanonical(value: string, slug: string): boolean {
  if (!value || value.trim() === "") return false
  const trimmed = value.trim()
  const pathRegex = /^\/blog\/[a-z0-9-]+$/
  const urlRegex = /^https:\/\/www\.igamingubuntu\.com\/blog\/[a-z0-9-]+$/
  return pathRegex.test(trimmed) || urlRegex.test(trimmed)
}

function buildArticleMetadata(article: Article, slug: string): Metadata {
  const fullTitle = article.seoTitle || article.title
  const description = article.metaDescription || article.excerpt || ""
  const canonical = isValidCanonical(article.canonicalUrl || "", slug)
    ? article.canonicalUrl!.startsWith("http")
      ? article.canonicalUrl!
      : `https://www.igamingubuntu.com${article.canonicalUrl!}`
    : `https://www.igamingubuntu.com/blog/${slug}`
  const image = article.ogImage || article.featuredImage

  return {
    title: fitSearchTitle(fullTitle),
    description,
    alternates: { canonical },
    ...(article.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title: fullTitle,
      description,
      url: canonical,
      siteName: "iGamingUbuntu",
      ...(image ? { images: [{ url: image }] } : {}),
      ...(article.createdAt ? { publishedTime: article.createdAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
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
    notFound()
  }

  const articleUrl = isValidCanonical(article.canonicalUrl || "", slug)
    ? article.canonicalUrl!.startsWith("http")
      ? article.canonicalUrl!
      : `https://www.igamingubuntu.com${article.canonicalUrl!}`
    : `https://www.igamingubuntu.com/blog/${article.slug}`
  const rawImage = article.ogImage || article.featuredImage || ""
  const absoluteImage = rawImage.startsWith("http")
    ? rawImage
    : rawImage
      ? `https://www.igamingubuntu.com${rawImage.startsWith("/") ? "" : "/"}${rawImage}`
      : "https://www.igamingubuntu.com/images/nasheta.png"
  const description = article.metaDescription || article.excerpt || ""
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title || article.slug,
    ...(description ? { description } : {}),
    image: absoluteImage,
    ...(article.createdAt ? { datePublished: article.createdAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: {
      "@type": "Person",
      name: article.authorName || article.author || "Nasheta John",
      ...(article.authorBio ? { description: article.authorBio } : { description: "iGaming content specialist covering African markets" }),
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
