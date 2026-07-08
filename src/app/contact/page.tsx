"use client"

import { useState } from "react"

const contactMethods = [
  {
    title: "Email",
    desc: "Send us an email anytime",
    detail: "hello@igamingubuntu.com",
    sub: "We respond within 24 hours",
    svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  },
  {
    title: "WhatsApp",
    desc: "Quick inquiries",
    detail: "Available for quick inquiries",
    sub: "Response within 2 hours",
    svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  },
  {
    title: "Connect",
    desc: "Follow us on social media",
    detail: "LinkedIn, Twitter, and Telegram",
    sub: "Daily iGaming insights across Africa",
    svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>,
  },
  {
    title: "Affiliate Partnerships",
    desc: "Partner with iGamingUbuntu",
    detail: "Interested in affiliate relationships?",
    sub: "We partner with quality operators and platforms",
    svg: <svg className="w-5 h-5 text-ubuntu-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-gold/80 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="Contact us" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
          <p className="text-white/80 mt-1 max-w-xl">Want to work together? Have a question, partnership inquiry, or feedback? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {sent ? (
            <div className="bg-ubuntu-green/10 border border-ubuntu-green/30 text-ubuntu-green p-6 rounded-xl animate-fade-up">
              <p className="font-bold text-lg mb-2">Message Sent!</p>
              <p className="text-text-secondary">Thanks for reaching out. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6 border border-border animate-fade-up">
              <h3 className="font-bold text-text-primary text-lg mb-2">Send us a message</h3>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                <input type="text" required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 focus:border-ubuntu-orange/30 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input type="email" required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 focus:border-ubuntu-orange/30 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Subject</label>
                <input type="text" placeholder="e.g. Partnership Inquiry" className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 focus:border-ubuntu-orange/30 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Message</label>
                <textarea rows={5} required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 focus:border-ubuntu-orange/30 transition resize-none"></textarea>
              </div>
              <button type="submit" className="bg-ubuntu-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-ubuntu-orange/90 transition shadow-md shadow-ubuntu-orange/20 cursor-pointer w-full">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {contactMethods.map((method, i) => (
            <div key={method.title} className={`bg-white rounded-xl p-6 border border-border hover:shadow-md transition animate-fade-up delay-${i + 1}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-ubuntu-orange">
                  {method.svg}
                </div>
                <h3 className="font-bold text-text-primary">{method.title}</h3>
              </div>
              <p className="text-sm text-text-secondary">{method.detail}</p>
              <p className="text-xs text-text-muted mt-1">{method.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
