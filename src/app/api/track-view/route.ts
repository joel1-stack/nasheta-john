import { NextResponse } from "next/server"
import { FieldValue } from "firebase-admin/firestore"
import { getAdminDb, hasAdminCredentials } from "@/lib/firebaseAdmin"
import { INTERNAL_COOKIE_NAME } from "@/lib/analytics"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ARTICLE_ID = /^[A-Za-z0-9_-]{1,64}$/

/**
 * Real view counter for articles.
 *
 * The browser cannot write to Firestore directly (security rules only allow
 * authenticated admins), so the old client-side increment silently failed and
 * every article showed a fake or zero count. This route increments the real
 * `views` field server-side, and skips hits from the owner's browser
 * (igub_internal cookie).
 */
export async function POST(req: Request) {
  if (!hasAdminCredentials()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 })
  }

  let articleId = ""
  try {
    const body = await req.json()
    articleId = String(body?.articleId || "").trim()
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 })
  }

  if (!ARTICLE_ID.test(articleId)) {
    return NextResponse.json({ ok: false, reason: "bad_id" }, { status: 400 })
  }

  // Do not inflate the numbers with the owner's own visits.
  const cookieHeader = req.headers.get("cookie") || ""
  const isInternal = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .includes(`${INTERNAL_COOKIE_NAME}=1`)
  if (isInternal) {
    return NextResponse.json({ ok: true, counted: false })
  }

  try {
    const db = getAdminDb()
    const ref = db.collection("articles").doc(articleId)
    const snap = await ref.get()
    if (!snap.exists) {
      return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 })
    }
    await ref.update({ views: FieldValue.increment(1) })
    const after = await ref.get()
    return NextResponse.json({ ok: true, counted: true, views: Number(after.data()?.views || 0) })
  } catch (err) {
    console.error("track-view failed:", err)
    return NextResponse.json({ ok: false, reason: "error" }, { status: 500 })
  }
}
