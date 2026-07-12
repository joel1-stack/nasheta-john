"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const faqs = [
  { q: "Do you write content for UK-licensed operators?", a: "Yes. We produce UKGC-compliant content covering the UK betting market, including sportsbooks, casino sites, and bingo operators. Our writers understand GamStop, responsible gaming messaging, and UK advertising standards." },
  { q: "Can you write for US state-by-state markets?", a: "Absolutely. We cover US iGaming and sports betting markets with state-specific regulation knowledge — from New Jersey to Pennsylvania, Michigan to Ohio." },
  { q: "Do you offer Canadian market content?", a: "Yes. We write for Ontario's regulated market and Canada's broader sports betting landscape, including provincial operators and offshore sportsbooks." },
  { q: "What languages do you support for global markets?", a: "English, Spanish, French, Portuguese, German, Dutch, and Italian. We can also arrange additional languages through our translator network." },
  { q: "How do you handle multi-country compliance?", a: "We maintain a compliance database across jurisdictions. Each piece is reviewed against the target market's regulatory requirements before delivery." },
]

export default function GlobalPage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  return (
    <div className="bg-[#110B18] min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#110B18]/70" />
      </div>
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#409824]/8 blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">

        {/* Hero */}
        <section className="text-center mb-16">
          <ScrollReveal>
            <div className="inline-block text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] bg-[#409824]/10 px-4 py-1.5 rounded-full mb-4">Global Markets</div>
          </ScrollReveal>
          <LetterReveal text="iGaming Content for UK, US & Canadian Markets" className="text-4xl md:text-6xl font-light text-[#FCFBFB] tracking-tight leading-tight max-w-4xl mx-auto" delay={300} stagger={30} />
          <LetterReveal text="Regulated market content written for compliance, ranking, and conversion in English-first jurisdictions." as="p" className="text-lg text-[#B5ABB3] mt-4 max-w-xl mx-auto leading-relaxed" delay={2000} stagger={15} />
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "both" }}>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Start a project</Link>
          </div>
        </section>

        {/* Markets grid */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Markets We Cover</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { flag: "🇬🇧", name: "United Kingdom", desc: "UKGC-licensed operators, GamStop compliance, responsible gaming messaging, and British sports betting culture. Coverage of Premier League, horse racing, and the UK casino market." },
              { flag: "🇺🇸", name: "United States", desc: "State-by-state coverage for New Jersey, Pennsylvania, Michigan, Ohio, and more. Sports betting, online casino, and DFS content written for US audiences and regulatory frameworks." },
              { flag: "🇨🇦", name: "Canada", desc: "Ontario's regulated iGaming market plus Canada's provincial sportsbooks. Content for operators targeting Canadian bettors with local payment methods and cultural relevance." },
            ].map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 100}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
                  <span className="text-3xl mb-3 block">{m.flag}</span>
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{m.name}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Content types */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Content for Global Markets</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Sports Betting Content", desc: "Premier League, NFL, NBA, MLB, NHL, Champions League, and international tournaments. Match previews, betting guides, and odds comparison for regulated markets." },
              { title: "Casino & iGaming Reviews", desc: "In-depth operator reviews for UK, US, and Canadian audiences. Bonus breakdowns, game selection, payment methods, and compliance-aware language." },
              { title: "Regulatory & Compliance Copy", desc: "Terms and conditions, responsible gaming pages, bonus policies, and regulatory disclaimers written to meet UKGC, MGCB, and AGCO standards." },
              { title: "Affiliate & SEO Content", desc: "Ranking content designed for competitive English-language search terms. Built for affiliate programmes and operator acquisition channels." },
            ].map((ct, i) => (
              <ScrollReveal key={ct.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{ct.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{ct.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">FAQs</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 60}>
                <div className="glass-card rounded-xl border border-white/5 overflow-hidden hover:border-[#409824]/20 transition-all duration-300">
                  <button onClick={() => setFaqOpen(faqOpen === f.q ? null : f.q)} className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
                    <span className="font-medium text-[#FCFBFB] text-sm">{f.q}</span>
                    <svg className={`w-4 h-4 text-[#56525E] shrink-0 transition-transform ${faqOpen === f.q ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {faqOpen === f.q && <div className="px-4 pb-4 text-sm text-[#56525E] leading-relaxed animate-fade-in">{f.a}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white text-center">
          <div className="absolute inset-0">
            <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/90 to-[#110B18]/95" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Ready to enter a new market?</h2>
            <p className="text-[#B5ABB3] mt-3 mb-6 max-w-md mx-auto">Let's discuss your global content strategy. We'll send you a tailored proposal within 24 hours.</p>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Start a project</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
