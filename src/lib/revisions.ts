import { getAuthInstance } from "@/lib/firebase"

/** Client side of /api/revisions (article version history). */

export interface Revision {
  id: string
  savedAt: string
  savedBy?: string
  title?: string
  content?: string
  [key: string]: unknown
}

async function authHeaders(): Promise<Record<string, string>> {
  const auth = getAuthInstance()
  if (!auth?.currentUser) throw new Error("Please sign in to the CMS again.")
  return { Authorization: `Bearer ${await auth.currentUser.getIdToken()}` }
}

export async function getRevisions(articleId: string): Promise<Revision[]> {
  const res = await fetch(`/api/revisions?articleId=${encodeURIComponent(articleId)}`, { headers: await authHeaders() })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || "Could not load history")
  return data.revisions || []
}

/** Best effort: a failed history save never blocks saving the article. */
export async function saveRevision(articleId: string, snapshot: Record<string, unknown>): Promise<void> {
  try {
    await fetch("/api/revisions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify({ articleId, snapshot }),
    })
  } catch {}
}
