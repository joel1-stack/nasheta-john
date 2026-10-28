"use client"

import { useState } from "react"
import { FiMail } from "react-icons/fi"
import { trackLead } from "@/lib/analytics"

/**
 * "card" sits in a sidebar; "band" is the full-width strip above the footer;
 * "box" is the sign-up box at the end of an article.
 */
export default function Newsletter({ variant = "card" }: { variant?: "card" | "band" | "box" }) {
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

  if (variant === "box") {
    return (
      <div className="relative overflow-hidden rounded-lg bg-brand-ink px-6 py-8 md:px-10 md:py-10">
        <span className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand-teal/25" aria-hidden="true" />
        <span className="absolute -left-10 -bottom-20 w-44 h-44 rounded-full bg-brand-lime/10" aria-hidden="true" />
        <div className="relative grid md:grid-cols-[1fr_1.1fr] gap-6 md:gap-10 items-center">
          <div>
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-lime text-brand-ink">
              <FiMail size={20} />
            </span>
            <h3 className="text-2xl font-semibold text-white mt-4 leading-tight">Get our stories in your inbox</h3>
            <p className="text-sm text-brand-mint/75 mt-2">Regulation, tax and market news from across Africa, once a week.</p>
          </div>
          <div>
            {subscribed ? (
              <p className="text-brand-lime font-semibold">You&apos;re in. Look out for our next email.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  aria-label="Email address"
                  className="flex-1 min-w-0 px-4 py-3 rounded bg-white text-brand-deep placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
                <button type="submit" disabled={loading} className="bg-brand-lime text-brand-ink px-6 py-3 rounded text-sm font-bold hover:brightness-110 transition cursor-pointer disabled:opacity-50">
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            )}
            {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
            <p className="text-xs text-white/50 mt-3">Free. One email a week. Unsubscribe any time.</p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "band") {
    return (
      <section className="bg-brand-teal">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="md:flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white">Get African iGaming news in your inbox</h2>
            <p className="text-sm text-white/70 mt-1">Regulation, tax and market moves, once a week. No spam.</p>
          </div>
          {subscribed ? (
            <p className="text-brand-lime font-medium">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white text-brand-deep placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              <button type="submit" disabled={loading} className="bg-brand-lime text-brand-ink px-5 py-3 rounded-lg text-sm font-bold hover:brightness-110 transition cursor-pointer disabled:opacity-50">
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
      <h3 className="font-bold text-brand-deep mb-2">Newsletter</h3>
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
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-brand-deep placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal"
          />
          <button type="submit" disabled={loading} className="bg-brand-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-deep transition cursor-pointer disabled:opacity-50 shadow-sm">
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  )
}
