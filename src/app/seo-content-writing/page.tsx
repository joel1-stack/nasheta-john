"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const benefits = [
  {
    title: "Increased Organic Traffic",
    desc: "The main goal of iGaming SEO writing is to rank high on Google and drive organic traffic to your platform. We focus on keywords with real player intent — whether that's 'how to deposit with M-Pesa' or 'Premier League betting tips' — and align content with what users are actually searching for.",
  },
  {
    title: "Better Conversion Rates",
    desc: "User intent is key. Some readers want information, others compare operators, and some are ready to register. We strategically align keywords with relevant pages and use strong CTAs to guide readers toward sign-ups, deposits, and affiliate clicks.",
  },
  {
    title: "Long-Term ROI",
    desc: "Paid acquisition stops when your budget runs out. SEO content keeps working. A well-written betting guide or casino review can generate traffic and affiliate revenue for years, with periodic updates to keep rankings fresh.",
  },
  {
    title: "Brand Authority",
    desc: "Accurate, compliant, and genuinely helpful content positions your brand as a trusted voice. In regulated markets, credibility is everything. We help you earn it.",
  },
]

const contentTypes = [
  { title: "Match Previews & Result Articles", desc: "Weekly coverage of Premier League, La Liga, Champions League, and local leagues. SEO-optimised with affiliate CTAs, odds integration, and timely publishing schedules." },
  { title: "Casino & Betting Reviews", desc: "In-depth operator reviews with comparison tables, bonus breakdowns, and compliance-aware language. Built to rank for 'best betting sites' and operator brand terms." },
  { title: "Betting Guides & Tutorials", desc: "Beginner-friendly how-to content — how to place an accumulator, what is handicap betting, how to withdraw via MTN MoMo. Designed to capture informational search intent." },
  { title: "Landing Pages & Website Copy", desc: "Homepage, service, and category pages that rank. Product descriptions, bonus terms pages, and location-specific landing pages for each market you operate in." },
]

const expectations = [
  { title: "Proven Track Record", desc: "We only work with experienced iGaming specialists. Our writers understand betting terminology, compliance requirements, and the nuances of African payment methods and local leagues." },
  { title: "Top-Tier Quality", desc: "We have an established editorial process that delivers publication-ready content. Quality is our business and a promise to every client." },
  { title: "Updated Knowledge", desc: "Google's algorithm and iGaming regulations change constantly. Our team stays current on SEO best practices, market-specific compliance, and competitor moves." },
  { title: "Precise Deadlines", desc: "Tell us when you need it published. We deliver on time, every time — whether that's daily match previews or a monthly content calendar." },
]

const faqs = [
  { q: "What is iGaming SEO content writing?", a: "It is the creation of search-optimised articles, reviews, and guides specifically for betting, casino, and gaming brands. The goal is to rank for high-intent keywords and convert readers into registered players or affiliate clicks." },
  { q: "How does SEO writing differ from regular iGaming content?", a: "Regular content informs. SEO content informs and targets specific search terms, follows on-page optimisation standards, and is structured to rank. We do both." },
  { q: "What types of content do you create?", a: "Match previews, casino reviews, betting guides, landing pages, affiliate content, newsletters, and topical cluster articles." },
  { q: "How do you ensure content is optimised for search engines?", a: "Keyword mapping, structured headings, meta data, internal linking, and mobile-friendly formatting. We deliver with optimisation notes." },
  { q: "Do you conduct keyword research for my market?", a: "Yes. We research local terms, competitor gaps, and search volumes specific to your target countries and languages." },
  { q: "Will the content be unique and original?", a: "Absolutely. Every piece is written from scratch, edited, and run through plagiarism checks." },
]

export default function SEOContentWritingPage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  return (
    <div className="bg-[#110B18] min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/images/sports betting analytics.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#110B18]/60" />
      </div>
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#409824]/8 blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-[#0E1358] to-[#1B2385]">
          <div className="absolute inset-0">
            <img src="/images/sports betting analytics.png" alt="" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-[#110B18]/40" />
          <div className="relative z-10 p-8 md:p-16 text-white text-center">
            <LetterReveal text="iGaming SEO Content That Ranks and Converts." className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto" delay={300} stagger={30} />
            <LetterReveal text="Expert iGaming content writing for betting, casino, and affiliate brands across African and global markets." as="p" className="text-white/80 text-lg mt-4 max-w-xl mx-auto" delay={2000} stagger={15} />
            <p className="text-white/60 text-sm mt-2 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "both" }}>From match previews and operator reviews to betting guides and affiliate landing pages, we create search-optimised content that drives organic traffic and converts readers into players.</p>
            <div className="flex flex-wrap gap-3 mt-6 justify-center animate-fade-in" style={{ animationDelay: "3.5s", animationFillMode: "both" }}>
              <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a project estimate</Link>
              <Link href="/blog" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition">See our work</Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Benefits of iGamingUbuntu SEO Services</h2>
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

        {/* Content Types */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">iGaming Content Formats We Specialise In</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {contentTypes.map((ct, i) => (
              <ScrollReveal key={ct.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{ct.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{ct.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition text-sm shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>

        {/* Expectations */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">What You Can Expect From Our Experts</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {expectations.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{e.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{e.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Ready to rank higher and convert more players?</h2>
            <p className="text-[#B5ABB3] mt-3 mb-6 max-w-md mx-auto">Contact our team of iGaming SEO writers to figure out the best way to boost your organic presence.</p>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
