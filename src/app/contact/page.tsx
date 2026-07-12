"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"

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
    <div className="min-h-screen bg-[#110B18] relative overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#110B18]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#110B18]/40 via-transparent to-[#110B18]/60" />
      </div>

      {/* Orbs */}
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#409824]/10 blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow pointer-events-none" />
      <div className="fixed top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#772953]/8 blur-[80px] animate-orb-drift pointer-events-none" style={{ animationDelay: "-10s" }} />

      {/* Particles */}
      <div className="particle fixed" style={{ top: "20%", left: "10%", animation: "particle-drift 12s ease-in-out infinite" }} />
      <div className="particle fixed" style={{ top: "40%", left: "80%", animation: "particle-drift 15s ease-in-out infinite 2s" }} />
      <div className="particle fixed" style={{ top: "60%", left: "20%", animation: "particle-drift 18s ease-in-out infinite 4s" }} />
      <div className="particle fixed" style={{ top: "80%", left: "70%", animation: "particle-drift 14s ease-in-out infinite 1s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">

        {/* ===== HERO ===== */}
        <section className="text-center mb-16 pt-10">
          <ScrollReveal>
            <div className="inline-block text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] bg-[#409824]/10 px-4 py-1.5 rounded-full mb-4">
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-[#FCFBFB] tracking-tight leading-tight">
              Let's talk about your<br />
              <span className="text-[#409824]">next project</span>
            </h1>
            <p className="text-lg text-[#56525E] max-w-xl mx-auto mt-4 leading-relaxed">
              Have a question or want to discuss a project? Reach out. I typically reply within 24 hours.
            </p>
          </ScrollReveal>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* ===== FORM ===== */}
          <div className="md:col-span-3">
            <ScrollReveal>
              {sent ? (
                <div className="glass-card rounded-2xl p-10 text-center border border-[#409824]/20">
                  <div className="w-16 h-16 rounded-full bg-[#409824]/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-light text-[#FCFBFB] mb-2">Message Sent!</h2>
                  <p className="text-[#56525E]">Thanks for reaching out. I will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5 border border-white/5">
                  <div>
                    <h2 className="text-xl font-medium text-[#FCFBFB]">Send a Message</h2>
                    <p className="text-sm text-[#56525E] mt-1">Fill in the form and I will get back to you promptly.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#B5ABB3] mb-1.5">Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:border-[#409824]/50 focus:ring-1 focus:ring-[#409824]/30 transition-all" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#B5ABB3] mb-1.5">Email</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:border-[#409824]/50 focus:ring-1 focus:ring-[#409824]/30 transition-all" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B5ABB3] mb-1.5">Project Type</label>
                    <select name="projectType" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[#FCFBFB] text-sm focus:outline-none focus:border-[#409824]/50 focus:ring-1 focus:ring-[#409824]/30 transition-all">
                      <option value="" className="bg-[#110B18] text-[#56525E]">Select a service...</option>
                      <option value="match" className="bg-[#110B18]">Match Result Articles</option>
                      <option value="reviews" className="bg-[#110B18]">Casino & Betting Reviews</option>
                      <option value="guides" className="bg-[#110B18]">Betting Guides & Tutorials</option>
                      <option value="news" className="bg-[#110B18]">Industry News & Press Releases</option>
                      <option value="strategy" className="bg-[#110B18]">Content Strategy & Consulting</option>
                      <option value="other" className="bg-[#110B18]">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B5ABB3] mb-1.5">Message</label>
                    <textarea name="message" rows={5} required placeholder="Tell me about your project, ask a question, or just say hello." className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:border-[#409824]/50 focus:ring-1 focus:ring-[#409824]/30 transition-all resize-none" />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button type="submit" disabled={loading} className="w-full bg-[#409824] text-white py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg shadow-[#409824]/20 cursor-pointer text-sm disabled:opacity-50">
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="md:col-span-2 space-y-4">
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#409824]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#409824]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="font-medium text-[#FCFBFB] mb-1">Email</h3>
                <a href="mailto:nashetajohn@gmail.com" className="text-sm text-[#409824] font-medium hover:underline">nashetajohn@gmail.com</a>
                <p className="text-xs text-[#56525E] mt-1">Click to open your email client</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#409824]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#409824]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 className="font-medium text-[#FCFBFB] mb-1">WhatsApp</h3>
                <a href="https://wa.me/254112157383" target="_blank" rel="noopener" className="text-sm text-[#409824] font-medium hover:underline">+254 112 157383</a>
                <p className="text-xs text-[#56525E] mt-1">Click to open WhatsApp</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#409824]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#409824]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-medium text-[#FCFBFB] mb-1 text-sm">Response Time</h3>
                <p className="text-sm text-[#B5ABB3] leading-relaxed">
                  I typically reply within <span className="text-[#409824] font-medium">24 hours</span> on weekdays. For urgent projects, mention "URGENT" in your subject line.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="glass-card rounded-2xl p-6 border border-white/5 border-l-2 border-l-[#409824] hover:border-l-[#409824]/80 transition-all duration-300">
                <h3 className="font-medium text-[#FCFBFB] mb-1 text-sm">Prefer a faster option?</h3>
                <Link href="/work-with-me" className="inline-flex items-center gap-1 text-[#409824] font-medium text-sm hover:underline mt-1">
                  Submit a quote request &rarr;
                </Link>
                <p className="text-xs text-[#56525E] mt-1">The quote form includes project details so I can respond with a tailored price.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
