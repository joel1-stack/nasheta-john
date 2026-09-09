import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { doc, updateDoc, increment, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fb = getDb()

  if (fb && slug) {
    try {
      const linkRef = doc(fb, "affiliateLinks", slug)
      const linkSnap = await getDoc(linkRef)
      if (linkSnap.exists()) {
        const data = linkSnap.data()
        await updateDoc(linkRef, { clicks: increment(1) })
        await addDoc(collection(fb, "clicks"), {
          linkId: slug,
          placement: req.headers.get("referer") || "direct",
          timestamp: serverTimestamp(),
        })
        return NextResponse.redirect(data.url, { status: 302 })
      }
    } catch {}
  }

  return NextResponse.redirect("/", { status: 302 })
}
