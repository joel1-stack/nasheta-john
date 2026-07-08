"use client"

import { useState } from "react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Get in Touch</h1>
      <p className="text-text-secondary mb-8">Want to work together? Have a question? Reach out.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {sent ? (
            <div className="bg-ubuntu-green/10 text-ubuntu-green p-6 rounded-xl">
              <p className="font-bold text-lg mb-2">Message Sent! ✅</p>
              <p>Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                <input type="text" required className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input type="email" required className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Message</label>
                <textarea rows={5} required className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50"></textarea>
              </div>
              <button type="submit" className="bg-ubuntu-orange text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition cursor-pointer">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6">
            <h3 className="font-bold text-text-primary mb-3">📧 Email</h3>
            <p className="text-text-secondary">hello@igamingubuntu.com</p>
          </div>
          <div className="bg-card rounded-xl p-6">
            <h3 className="font-bold text-text-primary mb-3">💬 WhatsApp</h3>
            <p className="text-text-secondary">Available for quick inquiries. Response within 2 hours.</p>
          </div>
          <div className="bg-card rounded-xl p-6">
            <h3 className="font-bold text-text-primary mb-3">🔗 Let&apos;s Connect</h3>
            <p className="text-text-secondary">Follow on LinkedIn, Twitter, and Telegram for daily iGaming insights.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
