import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { getArticleBySlug } from "@/lib/firestoreService"
import { getLatestArticles, getPopularArticles, getRelatedArticles } from "@/lib/serverArticles"
import { absoluteUrl, isSponsoredStatus } from "@/lib/site"
import { breadcrumbLd, extractFaqs, faqPageLd } from "@/lib/structuredData"
import { articlePath, articleSection, categoryHub } from "@/lib/navigation"
import ArticleView from "./ArticleView"
import type { Article } from "@/types"

/**
 * The article page, shared by every section route (/news/<slug>,
 * /casinos/<slug>, /news/regulation/<slug> ...). Each route passes its own
 * section; an article opened under the wrong section (old /blog/ links, a
 * category change) is sent to its real address with a permanent redirect.
 */

const TITLE_SUFFIX = " | iGamingUbuntu"
const MAX_TITLE_LENGTH = 65

function fitSearchTitle(base: string): string | { absolute: string } {
  const budget = MAX_TITLE_LENGTH - TITLE_SUFFIX.length
  if (base.length <= budget) return base
  if (base.length <= MAX_TITLE_LENGTH) return { absolute: base }
  const cut = base.slice(0, MAX_TITLE_LENGTH - 1).replace(/\s+\S*$/, "").trimEnd()
  return { absolute: `${cut || base.slice(0, MAX_TITLE_LENGTH - 1)}…` }
}

function isValidCanonical(value: string): boolean {
  if (!value || value.trim() === "") return false
  const trimmed = value.trim()
  const pathRegex = /^\/(?:blog|news)\/[a-z0-9-]+$/
  const urlRegex = /^https:\/\/www\.igamingubuntu\.com\/(?:blog|news)\/[a-z0-9-]+$/
  return pathRegex.test(trimmed) || urlRegex.test(trimmed)
}

/**
 * The article's own section address, unless the CMS canonical field points
 * at a different article on purpose. Old /blog/ or /news/ canonicals saved
 * for this same article are treated as "itself".
 */
function resolveCanonical(article: Article): string {
  const raw = (article.canonicalUrl || "").trim()
  if (isValidCanonical(raw)) {
    // A saved /blog/ or /news/ canonical for this same article means "itself".
    const slugOf = raw.split("/").pop()
    if (slugOf !== article.slug) return raw.startsWith("http") ? raw : `https://www.igamingubuntu.com${raw}`
  }
  return `https://www.igamingubuntu.com${articlePath(article)}`
}

function buildArticleMetadata(article: Article): Metadata {
  const fullTitle = article.seoTitle || article.title
  const description = article.metaDescription || article.excerpt || ""
  const canonical = resolveCanonical(article)
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
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export async function articleMetadata(slug: string): Promise<Metadata> {
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  return buildArticleMetadata(article)
}

export default async function ArticleRoute({ slug, section }: { slug: string; section: string }) {
  const article = await getArticleBySlug(slug)

  // Soft 404 fix: an unknown slug now returns a real HTTP 404.
  if (!article) {
    notFound()
  }
  if (articleSection(article.category) !== section) permanentRedirect(articlePath(article))

  // Related, recent and "Most Read" lists are computed on the server so
  // their links are in the HTML that Google receives.
  const [related, popular, latest] = await Promise.all([
    getRelatedArticles(article, 4),
    getPopularArticles(5),
    getLatestArticles(7),
  ])
  const recent = latest.filter((a) => a.slug !== article.slug).slice(0, 6)

  const articleUrl = resolveCanonical(article)
  const rawImage = article.ogImage || article.featuredImage || ""
  const absoluteImage = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : absoluteUrl(rawImage.startsWith("/") ? rawImage : `/${rawImage}`)
    : absoluteUrl("/images/nasheta.png")
  const description = article.metaDescription || article.excerpt || ""
  const wasUpdated = !!article.updatedAt && article.updatedAt !== article.createdAt

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title || article.slug,
    ...(description ? { description } : {}),
    image: absoluteImage,
    ...(article.createdAt ? { datePublished: article.createdAt } : {}),
    // dateModified only when the article was actually edited after publishing.
    ...(wasUpdated ? { dateModified: article.updatedAt } : {}),
    author: {
      "@type": "Person",
      name: article.authorName || article.author || "Nasheta John",
      image: article.authorPhoto || absoluteUrl("/images/nasheta-john-author.png"),
      ...(article.authorBio
        ? { description: article.authorBio }
        : { description: "iGaming content specialist covering African markets" }),
    },
    publisher: {
      "@type": "Organization",
      name: "iGamingUbuntu",
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.png") },
    },
    ...(isSponsoredStatus(article.status) ? { isAccessibleForFree: true } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  }

  const faqs = extractFaqs(article.content || "")
  const hub = categoryHub(article.category)
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    ...(hub ? [{ name: hub.label, path: hub.href }] : []),
    { name: article.title || article.slug, path: articleUrl },
  ])

  return (
    <>
      <ArticleView
        key={slug}
        initialArticle={article}
        related={related}
        popular={popular}
        recent={recent}
        canonicalUrl={articleUrl}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(faqs)) }}
        />
      )}
    </>
  )
}
