import ArticleRoute, { articleMetadata } from "@/components/article/ArticleRoute"

// Served from cache, refreshed every 5 minutes and right after each CMS save (/api/revalidate).
export const revalidate = 300

// Pages are built on first visit, then cached (no list needed at build time).
export async function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return articleMetadata((await params).slug)
}

/** Industry News articles. */
export default async function Page({ params }: Props) {
  return <ArticleRoute slug={(await params).slug} section="/news/industry" />
}
