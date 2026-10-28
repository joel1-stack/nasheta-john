"use client"

import { useState } from "react"
import { trackLead } from "@/lib/analytics"

/** "card" sits in a sidebar; "band" is the full-width strip above the footer. */
export default function Newsletter({ variant = "card" }: { variant?: "card" | "band" }) {
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
      // GA4: newsletter sign-up converted.
      trackLead("newsletter")
    } catch {
      setError("Failed to subscribe. Try again.")
    } finally {
      setLoading(false)
    }
  }

  if (variant === "band") {
    return (
      <section className="bg-[#0E3B1E]">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="md:flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white">Get African iGaming news in your inbox</h2>
            <p className="text-sm text-white/70 mt-1">Regulation, tax and market moves, once a week. No spam.</p>
          </div>
          {subscribed ? (
            <p className="text-[#86EFAC] font-medium">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
              />
              <button type="submit" disabled={loading} className="bg-[#22C55E] text-[#052e16] px-5 py-3 rounded-lg text-sm font-bold hover:brightness-110 transition cursor-pointer disabled:opacity-50">
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
          )}
          {error && <p className="text-red-300 text-xs">{error}</p>}
        </div>
      </section>
    )
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
