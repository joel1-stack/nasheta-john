"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const benefits = [
  { title: "Improved Readability", desc: "We keep your audience engaged from headline to CTA. Professional editing ensures your content is clear, concise, and structured for skimming — essential for mobile betting audiences." },
  { title: "Brand Consistency", desc: "Your voice must stay consistent across reviews, guides, and promo content. We enforce your style guide and ensure every piece sounds like your brand." },
  { title: "Enhanced SEO", desc: "We don't just insert keywords — we place them where they work. Header optimisation, meta descriptions, internal linking, and natural keyword flow that ranks." },
  { title: "Error Elimination", desc: "Typos and grammar mistakes undermine trust in a market where trust is everything. We catch everything before it goes live." },
]

const process = [
  { step: "01", title: "Initial Review", desc: "We review the content's purpose, target audience, and compliance requirements before touching a word." },
  { step: "02", title: "Structure Refinement", desc: "We evaluate organisation, flow, and logic — ensuring readers move naturally from hook to information to CTA." },
  { step: "03", title: "Clarity & Conciseness", desc: "We simplify complex betting concepts, remove fluff, and make every sentence earn its place." },
  { step: "04", title: "Grammar & Style", desc: "AP, Chicago, or your custom brand style guide. We enforce consistency in formatting and terminology." },
  { step: "05", title: "SEO Optimisation", desc: "Keyword placement, header tags, meta descriptions, and link checks. Every piece is refined for search." },
  { step: "06", title: "Final Review", desc: "Last pass for flow, compliance, and accuracy. At this stage, your content is publication-ready." },
]

const formats = [
  { title: "Blog Posts & Articles", desc: "Match previews, betting guides, strategy pieces — edited for engagement, accuracy, and SEO." },
  { title: "Social Media Content", desc: "Brevity and clarity for Twitter/X, Instagram, Facebook, and Telegram." },
  { title: "Email Campaigns", desc: "Subject lines, body text, and CTAs optimised for open rates and click-through." },
  { title: "Website Copy", desc: "Homepages, landing pages, bonus terms, and service descriptions — edited for UX and conversion." },
]

const faqs = [
  { q: "What is editing, and how is it different from proofreading?", a: "Proofreading catches surface errors. Editing improves structure, tone, clarity, SEO, and brand alignment. We offer both." },
  { q: "What types of documents do you edit?", a: "Articles, reviews, website copy, emails, social posts, video scripts, bonus terms, and compliance content." },
  { q: "Do you edit in multiple languages?", a: "Yes. We edit content in English, Swahili, French, Portuguese, and other major iGaming markets." },
  { q: "How long does editing take?", a: "Standard turnaround: 2-3 business days. Rush editing: same-day or next-day available." },
  { q: "Will my brand tone be preserved?", a: "Absolutely. We edit into your voice, not over it. Share your style guide and we'll enforce it." },
]

export default function EditingPage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  return (
    <div className="bg-[#110B18] min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#110B18]/60" />
      </div>
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#409824]/8 blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-[#0E1358] to-[#1B2385]">
          <div className="absolute inset-0">
            <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-[#110B18]/40" />
          <div className="relative z-10 p-8 md:p-16 text-white text-center">
            <LetterReveal text="iGaming Content Editing & Proofreading" className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto" delay={300} stagger={30} />
            <LetterReveal text="Polish your content, protect your brand, and ensure every piece meets regulatory and editorial standards." as="p" className="text-white/80 text-lg mt-4 max-w-xl mx-auto" delay={2000} stagger={15} />
            <p className="text-white/60 text-sm mt-2 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "both" }}>In iGaming, a single tone mismatch or compliance error can cost you credibility. Our editing process goes beyond typos. We refine structure, enforce brand voice, check facts, and ensure your content is publication-ready for regulated markets.</p>
            <div className="flex flex-wrap gap-3 mt-6 justify-center animate-fade-in" style={{ animationDelay: "3.5s", animationFillMode: "both" }}>
              <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
            </div>
          </div>
        </section>

        {/* Editing vs Proofreading */}
        <section className="max-w-3xl mx-auto mb-16">
          <ScrollReveal className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-[#FCFBFB] tracking-tight mb-4">Editing vs. Proofreading</h2>
            <div className="glass-card rounded-2xl border border-white/5 p-8">
              <p className="text-[#56525E] leading-relaxed">Proofreading catches spelling and grammar. Editing does that plus structural improvements, tone alignment, fact-checking, and SEO optimisation. At iGamingUbuntu, we offer both — but our full editing service ensures your content flows, converts, and complies.</p>
            </div>
          </ScrollReveal>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">The Key Benefits of Professional iGaming Editing</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{b.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition text-sm shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Our iGaming Editing Process</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {process.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 60}>
                <div className="glass-card rounded-2xl border border-white/5 p-4 text-center hover:border-[#409824]/20 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-full bg-[#409824] flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-sm">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-[#FCFBFB] text-xs mb-1">{s.title}</h3>
                  <p className="text-[10px] text-[#56525E] leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">iGaming Content Formats We Edit</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {formats.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{f.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Ready to take your iGaming content to the next level?</h2>
            <p className="text-[#B5ABB3] mt-3 mb-6 max-w-md mx-auto">Contact us today to learn how our professional editing solutions can refine your message and amplify your impact.</p>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
