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

const formats = [
  {
    title: "Match Previews & Result Articles",
    desc: "Weekly coverage of Premier League, La Liga, Champions League, and local leagues. SEO-optimised with affiliate CTAs, odds integration, and timely publishing schedules.",
  },
  {
    title: "Casino & Betting Reviews",
    desc: "In-depth operator reviews with comparison tables, bonus breakdowns, and compliance-aware language. Built to rank for 'best betting sites' and operator brand terms.",
  },
  {
    title: "Betting Guides & Tutorials",
    desc: "Beginner-friendly how-to content — how to place an accumulator, what is handicap betting, how to withdraw via MTN MoMo. Designed to capture informational search intent.",
  },
  {
    title: "Landing Pages & Website Copy",
    desc: "Homepage, service, and category pages that rank. Product descriptions, bonus terms pages, and location-specific landing pages for each market you operate in.",
  },
]

const expectations = [
  {
    title: "Proven Track Record",
    desc: "We only work with experienced iGaming specialists. Our writers understand betting terminology, compliance requirements, and the nuances of African payment methods and local leagues.",
  },
  {
    title: "Top-Tier Quality",
    desc: "We have an established editorial process that delivers publication-ready content. Quality is our business and a promise to every client.",
  },
  {
    title: "Updated Knowledge",
    desc: "Google's algorithm and iGaming regulations change constantly. Our team stays current on SEO best practices, market-specific compliance, and competitor moves.",
  },
  {
    title: "Precise Deadlines",
    desc: "Tell us when you need it published. We deliver on time, every time — whether that's daily match previews or a monthly content calendar.",
  },
]

const faqs = [
  {
    q: "What is iGaming SEO content writing?",
    a: "iGaming SEO content writing is the practice of creating search-optimised articles, guides, and reviews for online betting and casino brands. The goal is to rank in Google for terms bettors search for, drive organic traffic, and convert readers into depositing players through affiliate links or direct operator sign-ups.",
  },
  {
    q: "How does SEO writing differ from regular iGaming content?",
    a: "SEO writing is built around keyword research, search intent, and on-page optimisation. Every headline, subheading, and paragraph is structured to satisfy Google's ranking factors while still being genuinely useful to the reader. Regular iGaming content may be well-written, but SEO content is written to be found.",
  },
  {
    q: "What types of content do you create?",
    a: "We create match previews and result articles, casino and sportsbook reviews, betting guides and tutorials, landing pages, bonus terms pages, industry news, and press releases — all optimised for search and tailored to specific African and global markets.",
  },
  {
    q: "How do you ensure content is optimised for search engines?",
    a: "We conduct market-specific keyword research, structure content with proper heading hierarchy, optimise meta titles and descriptions, use internal linking strategies, and follow Google's E-E-A-T guidelines for YMYL (Your Money or Your Life) content. Every piece goes through an editorial QA process before delivery.",
  },
  {
    q: "Will the content be unique and original?",
    a: "Yes. Every article is written from scratch, researched for the specific market and audience, and checked for originality. We do not recycle content across clients or use spun text.",
  },
]

export default function ServicesPage() {
  const [showForm, setShowForm] = useState(false)
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  return (
    <div className="bg-[#110B18] min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/images/full backgound.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#110B18]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#110B18]/20 via-transparent to-[#110B18]/40" />
      </div>
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#409824]/8 blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">

        {/* ===== HERO ===== */}
        <section className="text-center mb-20">
          <ScrollReveal>
            <div className="inline-block text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] bg-[#409824]/10 px-4 py-1.5 rounded-full mb-4">iGaming SEO Content Writing</div>
          </ScrollReveal>
          <LetterReveal text="iGaming SEO Content That Ranks and Converts." className="text-4xl md:text-6xl font-light text-[#FCFBFB] tracking-tight leading-tight max-w-4xl mx-auto" delay={300} stagger={30} />
          <LetterReveal text="Expert iGaming content writing for betting, casino, and affiliate brands across African and global markets." as="p" className="text-lg text-[#B5ABB3] mt-4 max-w-xl mx-auto leading-relaxed" delay={2000} stagger={15} />
          <ScrollReveal delay={2500}>
            <p className="text-sm text-[#56525E] mt-6 max-w-2xl mx-auto leading-relaxed">
              From match previews and operator reviews to betting guides and affiliate landing pages, we create search-optimised content that drives organic traffic and converts readers into players.
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: "3.5s", animationFillMode: "both" }}>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a project estimate</Link>
            <Link href="/services" className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition">See our work</Link>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="mb-20">
          <ScrollReveal className="text-center mb-12">
            <div className="text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] mb-3">Why iGamingUbuntu</div>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Benefits of iGamingUbuntu SEO Services</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 100}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{b.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>

        {/* ===== CONTENT FORMATS ===== */}
        <section className="mb-20">
          <ScrollReveal className="text-center mb-12">
            <div className="text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] mb-3">What We Write</div>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">iGaming Content Formats We Specialise In</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {formats.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>

        {/* ===== WHAT YOU CAN EXPECT ===== */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-2/5">
              <ScrollReveal>
                <div className="text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] mb-3">Our Promise</div>
                <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight leading-tight">
                  What You Can Expect<br />From Our Experts
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:w-3/5 grid md:grid-cols-2 gap-5">
              {expectations.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
                    <h3 className="font-bold text-[#FCFBFB] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#56525E] leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="max-w-2xl mx-auto mb-20">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">FAQs</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <div className="glass-card rounded-xl border border-white/5 overflow-hidden hover:border-[#409824]/20 transition-all duration-300">
                  <button onClick={() => setFaqOpen(faqOpen === faq.q ? null : faq.q)} className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
                    <span className="font-medium text-[#FCFBFB] text-sm">{faq.q}</span>
                    <svg className={`w-4 h-4 text-[#56525E] shrink-0 transition-transform ${faqOpen === faq.q ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {faqOpen === faq.q && <div className="px-4 pb-4 text-sm text-[#56525E] leading-relaxed animate-fade-in">{faq.a}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
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

        {/* ===== STICKY CTA ===== */}
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => setShowForm(true)} className="bg-[#409824] text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-[#409824]/30 hover:bg-[#409824]/90 transition cursor-pointer text-sm flex items-center gap-2 hover:scale-105 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Request an estimate
          </button>
        </div>

        {/* ===== CONTACT FORM ===== */}
        {showForm && (
          <div id="form" className="scroll-mt-20">
            <ScrollReveal>
              <div className="glass-card rounded-2xl border border-white/5 p-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#FCFBFB]">Request a project estimate</h2>
                  <button onClick={() => setShowForm(false)} className="text-[#56525E] hover:text-[#FCFBFB] cursor-pointer"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <p className="text-[#56525E] text-sm mb-6">Tell us about your content needs and we'll send you a tailored proposal within 24 hours.</p>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: "services-quote",
      message: `Service Quote Request\nCompany: ${(form.elements.namedItem("company") as HTMLInputElement).value}\nWebsite: ${(form.elements.namedItem("website") as HTMLInputElement).value}\nVolume: ${(form.elements.namedItem("volume") as HTMLSelectElement).value}\nBudget: ${(form.elements.namedItem("budget") as HTMLSelectElement).value}\nStart: ${(form.elements.namedItem("start") as HTMLSelectElement).value}\nGoal: ${(form.elements.namedItem("goal") as HTMLSelectElement).value}\nDetails: ${(form.elements.namedItem("details") as HTMLTextAreaElement).value}`,
    }
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (res.ok) setSent(true)
    } catch {} finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-[#409824]/10 flex items-center justify-center mx-auto mb-3">
          <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="font-bold text-[#FCFBFB]">Thank you!</p>
        <p className="text-sm text-[#56525E]">We'll review your details and get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Company</label>
          <input type="text" name="company" required className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Website</label>
          <input type="url" name="website" className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50" placeholder="https://" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Name</label>
          <input type="text" name="name" required className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Email</label>
          <input type="email" name="email" required className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Monthly content volume</label>
          <select name="volume" className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50">
            <option value="" className="bg-[#110B18]">Select...</option>
            <option value="1-5" className="bg-[#110B18]">1-5 pieces</option>
            <option value="5-20" className="bg-[#110B18]">5-20 pieces</option>
            <option value="20-50" className="bg-[#110B18]">20-50 pieces</option>
            <option value="50+" className="bg-[#110B18]">50+ pieces</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Budget range</label>
          <select name="budget" className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50">
            <option value="" className="bg-[#110B18]">Select...</option>
            <option value="under-2k" className="bg-[#110B18]">Under $2,000/mo</option>
            <option value="2k-5k" className="bg-[#110B18]">$2,000-5,000/mo</option>
            <option value="5k-10k" className="bg-[#110B18]">$5,000-10,000/mo</option>
            <option value="10k+" className="bg-[#110B18]">$10,000+/mo</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Primary goal</label>
          <select name="goal" className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50">
            <option value="" className="bg-[#110B18]">Select...</option>
            <option value="organic" className="bg-[#110B18]">Organic traffic growth</option>
            <option value="affiliate" className="bg-[#110B18]">Affiliate revenue</option>
            <option value="brand" className="bg-[#110B18]">Brand awareness</option>
            <option value="leads" className="bg-[#110B18]">Lead generation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Desired start date</label>
          <select name="start" className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50">
            <option value="" className="bg-[#110B18]">Select...</option>
            <option value="asap" className="bg-[#110B18]">ASAP</option>
            <option value="this-month" className="bg-[#110B18]">This month</option>
            <option value="next-month" className="bg-[#110B18]">Next month</option>
            <option value="flexible" className="bg-[#110B18]">Flexible</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#B5ABB3] mb-1">Tell us more about your project</label>
        <textarea name="details" rows={3} className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[#FCFBFB] placeholder-[#56525E] text-sm focus:outline-none focus:ring-2 focus:ring-[#409824]/50 resize-none" placeholder="Target markets, content types, any specific requirements..." />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#409824] text-white py-3 rounded-lg font-bold hover:bg-[#409824]/90 transition shadow-lg cursor-pointer text-sm disabled:opacity-50">
        {loading ? "Sending..." : "Send request"}
      </button>
    </form>
  )
}
