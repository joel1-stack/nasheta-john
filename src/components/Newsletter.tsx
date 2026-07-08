"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <div className="bg-card rounded-xl p-5">
      <h3 className="font-bold text-text-primary mb-2">Newsletter</h3>
      <p className="text-sm text-text-secondary mb-4">Get betting tips & iGaming insights in your inbox.</p>
      {subscribed ? (
        <p className="text-ubuntu-green text-sm font-medium">Thanks for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50"
          />
          <button type="submit" className="bg-ubuntu-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer">
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
