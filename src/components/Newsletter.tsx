"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed")
      setSubscribed(true)
      setEmail("")
    } catch {
      setError("Failed to subscribe. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
      <h3 className="font-bold text-[#111827] mb-2">Newsletter</h3>
      <p className="text-sm text-gray-500 mb-4">Get betting tips & iGaming insights in your inbox.</p>
      {subscribed ? (
        <p className="text-emerald-600 text-sm font-medium">Thanks for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 focus:border-[#f59e0b]"
          />
          <button type="submit" disabled={loading} className="bg-[#f59e0b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d97706] transition cursor-pointer disabled:opacity-50 shadow-sm">
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  )
}
