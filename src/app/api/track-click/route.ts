import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { linkId, placement } = await req.json()
    if (!linkId) {
      return NextResponse.json({ error: "Missing linkId" }, { status: 400 })
    }

    const { trackClick } = await import("@/lib/firestoreService")
    await trackClick(linkId, placement || "unknown")

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
  }
}
