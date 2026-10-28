import { getAuthInstance } from "@/lib/firebase"
import { submitToIndexNow } from "@/lib/indexnow"
import { articlePath, articleSection } from "@/lib/navigation"

type Ref = { category?: string; slug?: string; status?: string; noindex?: boolean }

/**
 * After a CMS change: refresh the cached public pages for these articles
 * (old and new addresses, their section pages, home, sitemaps), and tell
 * search engines about the live ones. Best effort: never blocks a save.
 */
export async function refreshSite(articles: Ref[]): Promise<void> {
  const withSlug = articles.filter((a): a is Ref & { slug: string } => !!a.slug)
  const paths = withSlug.flatMap((a) => [articlePath(a), articleSection(a.category)])
  try {
    const auth = getAuthInstance()
    const token = await auth?.currentUser?.getIdToken()
    if (token) {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ paths }),
      })
    }
  } catch {}
  const live = withSlug.filter((a) => ["published", "sponsored", "press-release"].includes(a.status || "") && !a.noindex)
  if (live.length) submitToIndexNow(live.map((a) => articlePath(a)))
}
