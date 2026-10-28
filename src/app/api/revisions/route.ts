import { NextRequest, NextResponse } from "next/server"
import { getFirestore, FieldValue } from "firebase-admin/firestore"
import { getAdminApp, requireAdmin } from "@/lib/adminServer"

export const runtime = "nodejs"

/**
 * Article version history. Each save in the CMS editor first stores the
 * previous version here. Admin SDK only: the "revisions" collection has no
 * client access under the Firestore rules, so drafts stay private.
 */

const KEEP = 30
const FIELDS = [
  "title", "slug", "excerpt", "content", "category", "country", "featuredImage", "featuredImageAlt",
  "tags", "readTime", "status", "seoTitle", "metaDescription", "canonicalUrl", "noindex", "ogImage",
  "authorName", "authorBio", "authorPhoto", "sponsorName", "pressReleaseSource",
] as const

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const articleId = req.nextUrl.searchParams.get("articleId") || ""
  if (!articleId) return NextResponse.json({ error: "articleId is required" }, { status: 400 })

  try {
    const snap = await getFirestore(getAdminApp())
      .collection("revisions")
      .where("articleId", "==", articleId)
      .get()
    const revisions = snap.docs
      .map((d) => {
        const data = d.data()
        return { id: d.id, ...data, savedAt: data.savedAt?.toDate?.()?.toISOString?.() || "" }
      })
      .sort((a, b) => (b.savedAt > a.savedAt ? 1 : -1))
      .slice(0, KEEP)
    return NextResponse.json({ revisions })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load history" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const body = await req.json().catch(() => null)
  const articleId = String(body?.articleId || "")
  const snapshot = body?.snapshot
  if (!articleId || !snapshot || typeof snapshot !== "object") {
    return NextResponse.json({ error: "articleId and snapshot are required" }, { status: 400 })
  }

  const clean: Record<string, unknown> = {}
  for (const key of FIELDS) if (key in snapshot) clean[key] = snapshot[key]

  try {
    const db = getFirestore(getAdminApp())
    await db.collection("revisions").add({ articleId, ...clean, savedBy: auth.email, savedAt: FieldValue.serverTimestamp() })

    // Keep only the newest KEEP versions per article.
    const all = await db.collection("revisions").where("articleId", "==", articleId).get()
    const old = all.docs
      .sort((a, b) => (b.data().savedAt?.toMillis?.() || Infinity) - (a.data().savedAt?.toMillis?.() || Infinity))
      .slice(KEEP)
    await Promise.all(old.map((d) => d.ref.delete()))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to save history" }, { status: 500 })
  }
}
