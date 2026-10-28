import ArticleRoute, { articleMetadata } from "@/components/article/ArticleRoute"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return articleMetadata((await params).slug)
}

/** Old /blog/<slug> addresses: always redirected to the article's real address. */
export default async function Page({ params }: Props) {
  return <ArticleRoute slug={(await params).slug} section="/blog" />
}
