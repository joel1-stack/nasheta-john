import ArticleRoute, { articleMetadata } from "@/components/article/ArticleRoute"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return articleMetadata((await params).slug)
}

/** Casino reviews and bonus articles. */
export default async function Page({ params }: Props) {
  return <ArticleRoute slug={(await params).slug} section="/casinos" />
}
