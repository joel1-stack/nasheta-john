import { NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { REMOVED_DEMO_SLUGS } from "@/lib/site"

/**
 * Maintenance endpoint for the 10 hardcoded demo/seed articles.
 *
 * The seeding payloads have been deleted from the codebase. This endpoint only
 * exists to purge any copies that are still sitting in Firestore, so the live
 * site stops serving them. They are also 301-redirected to /blog in
 * next.config.ts and filtered out of every query and sitemap.
 *
 *   DELETE /api/seed   -> removes every document whose slug is in the list
 */

export async function DELETE(request: Request) {
  // Maintenance-only endpoint. Without SEED_SECRET configured it behaves as
  // if it does not exist, so it can never be used to delete live content.
  const secret = process.env.SEED_SECRET
  if (!secret || request.headers.get("x-seed-secret") !== secret) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const fb = getDb()
  if (!fb) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 })

  try {
    const deleted: string[] = []
    for (const slug of REMOVED_DEMO_SLUGS) {
      const snap = await getDocs(query(collection(fb, "articles"), where("slug", "==", slug)))
      for (const d of snap.docs) {
        await deleteDoc(doc(fb, "articles", d.id))
        deleted.push(slug)
      }
    }
    return NextResponse.json({
      success: true,
      removedSlugs: REMOVED_DEMO_SLUGS.length,
      deleted,
    })
  } catch {
    return NextResponse.json({ error: "Failed to delete sample articles" }, { status: 500 })
  }
}
