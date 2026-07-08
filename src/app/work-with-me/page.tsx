"use client"

import { useState } from "react"
import Link from "next/link"

export default function WorkWithMePage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-gold/80 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="Work with me" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">Work With Me</h1>
          <p className="text-white/80 mt-1 max-w-xl">Tell me about your project and I'll send you a quote within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {sent ? (
            <div className="bg-ubuntu-green/10 border border-ubuntu-green/30 p-8 rounded-xl text-center animate-fade-up">
              <svg className="w-16 h-16 text-ubuntu-green mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Quote Request Sent!</h2>
              <p className="text-text-secondary">Thanks for reaching out. I'll review your project details and get back to you within 24 hours with a tailored quote.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-border space-y-4">
              <h2 className="font-bold text-text-primary text-lg mb-1">Tell Me About Your Project</h2>
              <p className="text-sm text-text-muted mb-4">All fields required unless marked optional.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                  <input type="text" required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                  <input type="email" required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Company / Website (optional)</label>
                <input type="text" className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">What do you need?</label>
                <select required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 bg-white">
                  <option value="">Select a service...</option>
                  <option value="match">Match Result Articles</option>
                  <option value="reviews">Casino & Betting Reviews</option>
                  <option value="guides">Betting Guides & Tutorials</option>
                  <option value="news">Industry News & Press Releases</option>
                  <option value="multiple">Multiple content types</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Target Market(s)</label>
                <select required className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 bg-white">
                  <option value="">Select a market...</option>
                  <option value="kenya">Kenya</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="sa">South Africa</option>
                  <option value="ghana">Ghana</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="global">UK / US / Canada / Global</option>
                  <option value="multiple">Multiple markets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Approximate volume (articles per month)</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 bg-white">
                  <option value="">Select volume...</option>
                  <option value="1-10">1-10 articles</option>
                  <option value="10-30">10-30 articles</option>
                  <option value="30-100">30-100 articles</option>
                  <option value="100+">100+ articles</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Tell me more about your project</label>
                <textarea rows={4} required placeholder="What are your goals? Any specific operators or topics to cover? Deadline?" className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50 resize-none" />
              </div>

              <button type="submit" className="w-full bg-ubuntu-orange text-white py-3 rounded-lg font-bold hover:opacity-90 transition shadow-md shadow-ubuntu-orange/20 cursor-pointer text-sm">
                Send Quote Request
              </button>

              <p className="text-xs text-text-muted text-center">I typically respond within 24 hours. No spam, no obligation.</p>
            </form>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/images/nasheta.png" alt="Nasheta" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-text-primary">Nasheta</p>
                <p className="text-xs text-text-muted">iGaming Content Specialist</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              I write content that ranks in Google and converts readers into depositing players. 
              Let me help you scale your iGaming affiliate business.
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="font-semibold text-text-primary mb-3 text-sm">Quick Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-text-secondary">
                <svg className="w-4 h-4 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                hello@igamingubuntu.com
              </p>
              <p className="flex items-center gap-2 text-text-secondary">
                <svg className="w-4 h-4 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                WhatsApp: +254 700 000 000
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="font-semibold text-text-primary mb-2 text-sm">Response Time</h3>
            <p className="text-sm text-text-secondary">I typically reply within <span className="text-ubuntu-green font-medium">24 hours</span> on weekdays. Same-day responses for urgent projects.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
