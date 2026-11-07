import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ArticleGrid from "@/components/ArticleGrid"
import SectionHeader from "@/components/SectionHeader"
import { getAllPublicArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"
import { TOPICS, getTopic, MIN_TOPIC_ARTICLES } from "@/lib/topics"
import { SITE_URL } from "@/lib/site"
import { staticPageMetadata } from "@/lib/pageMeta"

export const revalidate = 600

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }))
}

async function topicArticles(slug: string) {
  const topic = getTopic(slug)
  if (!topic) return { topic: undefined, articles: [] }
  const all = await getAllPublicArticles()
  const articles = all.filter((a) => topic.slugPatterns.some((p) => (a.slug || "").includes(p)))
  return { topic, articles }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}
  return staticPageMetadata({ title: topic.seoTitle, description: topic.description, path: `/topics/${topic.slug}` })
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { topic, articles } = await topicArticles(slug)
  if (!topic || articles.length < MIN_TOPIC_ARTICLES) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: `${SITE_URL}/topics/${topic.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.slice(0, 50).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${articlePath(a)}`,
        name: a.title,
      })),
    },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeader
        title={topic.title}
        description={topic.description}
        crumbs={[{ label: "Home", href: "/" }, { label: topic.title }]}
        path={`/topics/${topic.slug}`}
      />
      <p className="max-w-3xl text-gray-600 mb-8">{topic.intro}</p>
      <ArticleGrid articles={articles} columns={2} />
      <div className="mt-10 flex flex-wrap gap-3">
        {topic.related.map((r) => (
          <Link key={r.href} href={r.href} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#409824] hover:underline">
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
