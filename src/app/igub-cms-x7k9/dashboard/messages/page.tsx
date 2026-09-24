"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getAuthInstance } from "@/lib/firebase"
import { getContactMessages, markContactMessageRead, deleteContactMessage } from "@/lib/firestoreService"
import { useRouter } from "next/navigation"
import type { ContactMessage } from "@/types"

export default function MessagesPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push("/igub-cms-x7k9") } else { setUser(u) }
      setLoading(false)
      if (u) {
        const msgs = await getContactMessages()
        setMessages(msgs)
      }
    })
    return () => unsub()
  }, [router])

  const handleToggle = async (msg: ContactMessage) => {
    if (expanded === msg.id) {
      setExpanded(null)
      return
    }
    setExpanded(msg.id)
    if (!msg.read) {
      await markContactMessageRead(msg.id)
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return
    await deleteContactMessage(id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (expanded === id) setExpanded(null)
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  const unread = messages.filter((m) => !m.read).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-sm text-gray-400 mt-1">
            {messages.length} total · {unread} unread
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
          <p className="text-gray-400 text-lg">No messages yet</p>
          <p className="text-gray-500 text-sm mt-2">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border transition ${
                msg.read
                  ? "bg-white/5 border-white/10"
                  : "bg-[#E95420]/10 border-[#E95420]/40"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggle(msg)}
                className="w-full text-left px-5 py-4 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-[#E95420] shrink-0" />
                      )}
                      <p className="font-semibold text-white truncate">{msg.name}</p>
                      <span className="text-xs text-gray-500 shrink-0">{msg.email}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{msg.message}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-gray-500 block">{msg.createdAt}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded mt-1 inline-block">
                      {msg.projectType || "general"}
                    </span>
                  </div>
                </div>
              </button>

              {expanded === msg.id && (
                <div className="px-5 pb-4 border-t border-white/10 pt-4">
                  <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm bg-[#E95420] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#CC4A1C] transition"
                    >
                      Reply via Email
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(msg.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
