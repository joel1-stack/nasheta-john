import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, country } = await req.json()
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const { addSubscriber } = await import("@/lib/firestoreService")
    const id = await addSubscriber(email, country || "")

    if (!id) {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }

    return NextResponse.json({ success: true, id })
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
