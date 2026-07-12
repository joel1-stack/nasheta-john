"use client"

import { useState } from "react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      setSent(true)
    } catch {
      setError("Failed to send. Please email directly or try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in relative z-10">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-gold/80 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="text-white/80 mt-1 max-w-xl">Have a question or want to discuss a project? Reach out. I typically reply within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {sent ? (
            <div className="bg-ubuntu-green/10 border border-ubuntu-green/30 p-8 rounded-xl text-center animate-fade-up">
              <svg className="w-16 h-16 text-ubuntu-green mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h2>
              <p className="text-text-secondary">Thanks for reaching out. I will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4">
              <h2 className="font-bold text-[#FCFBFB] text-lg mb-1">Send a Message</h2>
              <p className="text-sm text-[#56525E] mb-3">Fill in the form and I will get back to you promptly.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Name</label>
                  <input type="text" name="name" required className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Email</label>
                  <input type="email" name="email" required className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Project Type</label>
                <select name="projectType" required className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50">
                  <option value="" className="bg-[#110B18]">Select a service...</option>
                  <option value="match" className="bg-[#110B18]">Match Result Articles</option>
                  <option value="reviews" className="bg-[#110B18]">Casino & Betting Reviews</option>
                  <option value="guides" className="bg-[#110B18]">Betting Guides & Tutorials</option>
                  <option value="news" className="bg-[#110B18]">Industry News & Press Releases</option>
                  <option value="strategy" className="bg-[#110B18]">Content Strategy & Consulting</option>
                  <option value="other" className="bg-[#110B18]">Something else</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Message</label>
                <textarea name="message" rows={5} required placeholder="Tell me about your project, ask a question, or just say hello." className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50 resize-none" />
              </div>

              {error && <p className="text-ubuntu-red text-sm">{error}</p>}

              <button type="submit" disabled={loading} className="w-full bg-[#409824] text-white py-3 rounded-lg font-bold hover:bg-[#409824]/90 transition shadow-lg cursor-pointer text-sm disabled:opacity-50">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-[#FCFBFB] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Email
            </h3>
            <a href="mailto:nashetajohn@gmail.com" className="text-sm text-ubuntu-orange font-medium hover:underline">nashetajohn@gmail.com</a>
            <p className="text-xs text-[#56525E] mt-1">Click to open your email client</p>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-[#FCFBFB] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              WhatsApp
            </h3>
            <a href="https://wa.me/254112157383" target="_blank" rel="noopener" className="text-sm text-ubuntu-orange font-medium hover:underline">+254 112 157383</a>
            <p className="text-xs text-[#56525E] mt-1">Click to open WhatsApp</p>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-[#FCFBFB] mb-2 text-sm">Response Time</h3>
            <p className="text-sm text-[#B5ABB3] leading-relaxed">
              I typically reply within <span className="text-[#409824] font-medium">24 hours</span> on weekdays. 
              For urgent projects, mention &quot;URGENT&quot; in your subject line and I will prioritise your message.
            </p>
          </div>

          <div className="glass-card rounded-xl p-5 border-l-2 border-l-ubuntu-orange">
            <h3 className="font-semibold text-[#FCFBFB] mb-2 text-sm">Prefer a faster option?</h3>
            <a
              href="/work-with-me"
              className="inline-flex items-center gap-1 text-ubuntu-orange font-medium text-sm hover:underline"
            >
              Submit a quote request &rarr;
            </a>
            <p className="text-xs text-[#56525E] mt-1">The quote form includes project details so I can respond with a tailored price.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
