"use client"

import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"

const values = [
  {
    title: "Market-first content",
    desc: "Every piece we write is researched for its specific target market. African betting, UKGC compliance, US state-by-state regulation. No generic outsourcing.",
  },
  {
    title: "Editorial discipline",
    desc: "Journalistic standards applied to SEO content. Research, structure, fact-checking, and readability before we publish a single word.",
  },
  {
    title: "Reliability at scale",
    desc: "98% on-time delivery across 5,000+ pieces. Structured workflows, clear milestones, and dedicated account management keep production predictable.",
  },
  {
    title: "ROI-focused",
    desc: "Content that ranks and converts. Every deliverable ties back to a business goal. We measure what matters and optimise continuously.",
  },
]

const timeline = [
  { year: "2016", event: "Nasheta John began writing about African iGaming markets, identifying a gap in locally relevant content." },
  { year: "2018", event: "First retainer clients. Expanded from single articles to full content strategy and editorial calendars." },
  { year: "2020", event: "Launched translation and localisation services. Grew team to support multilingual production across 12 languages." },
  { year: "2022", event: "Added link building and outreach. Surpassed 2,000 pieces delivered with 50+ active clients." },
  { year: "2024", event: "Full-service agency. Content operations, CMS management, and dedicated account teams. 5,000+ pieces served." },
]

const sectors = ["Publishing", "iGaming", "SaaS", "E-commerce", "Finance", "Health", "Travel"]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#110B18] relative overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110B18]/70 via-[#110B18]/60 to-[#110B18]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/40 to-transparent" />
        </div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#772953]/15 blur-[120px] animate-orb-drift" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-[#409824]/30 shadow-2xl shadow-[#409824]/10 shrink-0 -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="/images/nasheta.png" alt="Nasheta John" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] bg-[#409824]/10 px-4 py-1.5 rounded-full mb-4">
                Founded by Nasheta John
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFBFB] leading-tight tracking-tight">
                We help brands own their space through{" "}
                <span className="text-[#409824]">content that works.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#B5ABB3] mt-4 max-w-xl leading-relaxed">
                iGamingUbuntu is an editorial content agency built for businesses that need SEO content that ranks, converts, and scales.
              </p>
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg shadow-[#409824]/20 hover:shadow-[#409824]/40">
                  Start a project <span>&rarr;</span>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:border-[#B5ABB3]/60 transition-all duration-200">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-20 relative">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#409824]/5 blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-block text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.2em] mb-3">Our Mission</div>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight leading-tight">
              To provide the editorial firepower that content marketing campaigns need to succeed in competitive markets.
            </h2>
            <p className="text-[#56525E] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              We combine journalistic rigour with SEO discipline to produce content that drives measurable business results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOUNDER STORY ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#110B18] via-[#110B18]/95 to-[#110B18]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 shadow-xl border border-white/10">
                  <img src="/images/nasheta.png" alt="Nasheta John" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-3xl font-light text-[#FCFBFB] mb-1">Content strategist and iGaming specialist since 2016</h2>
                  <div className="space-y-4 text-[#56525E] leading-relaxed mt-6">
                    <p>Nasheta started writing about African iGaming markets in 2016 when most betting content was copied from European sources. He saw an opportunity to deliver locally relevant, well-researched content that served both operators and bettors.</p>
                    <p>What began as a solo writing operation grew into a full-service content agency. Today, iGamingUbuntu works with operators, affiliate networks, and content agencies across Africa, the UK, the US, and Canada. The founding principle remains the same: understand the market, respect the reader, and deliver content that performs.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 relative">
        <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] rounded-full bg-[#0E1358]/10 blur-[100px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-block text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.2em] mb-3">What We Stand For</div>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Our Values</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-7 hover:border-[#409824]/30 transition-all duration-300 hover:-translate-y-0.5">
                  <span className="text-xs font-bold text-[#409824] bg-[#409824]/10 px-2.5 py-1 rounded-full">0{i + 1}</span>
                  <h3 className="text-xl font-medium text-[#FCFBFB] mt-4 mb-2">{v.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover opacity-[0.08]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-block text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.2em] mb-3">Our Journey</div>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">From Solo Writer to Full-Service Agency</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#409824]/40 via-[#409824]/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <ScrollReveal key={t.year} delay={i * 100}>
                  <div className={`flex items-start gap-6 md:gap-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                      <span className="text-3xl font-bold text-[#409824]">{t.year}</span>
                    </div>
                    <div className="hidden md:flex w-5 h-5 rounded-full bg-[#409824] shrink-0 relative z-10 items-center justify-center shadow-lg shadow-[#409824]/30">
                      <div className="w-2 h-2 rounded-full bg-[#FCFBFB]" />
                    </div>
                    <div className="md:w-1/2 glass-card rounded-xl border border-white/5 p-5 hover:border-[#409824]/20 transition-all duration-300">
                      <span className="md:hidden text-sm font-bold text-[#409824] mb-1 block">{t.year}</span>
                      <p className="text-sm text-[#56525E] leading-relaxed">{t.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-block text-xs font-semibold text-[#B5ABB3] uppercase tracking-[0.2em] mb-3">Industries We Serve</div>
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight mb-3">Sectors We Cover</h2>
            <p className="text-[#56525E] mb-8 max-w-lg mx-auto">Our editorial team produces content for a wide range of sectors.</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s, i) => (
              <ScrollReveal key={s} delay={i * 60}>
                <div className="glass-card border border-white/5 rounded-xl px-5 py-3 text-sm font-medium text-[#B5ABB3] hover:border-[#409824]/30 hover:text-[#FCFBFB] transition-all duration-300 cursor-default">
                  {s}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/20 via-transparent to-[#0E1358]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { num: "5,000+", label: "pieces delivered" },
            { num: "12+", label: "languages" },
            { num: "98%", label: "on-time delivery" },
            { num: "50+", label: "active clients" },
          ].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100}>
              <div className="glass-card rounded-2xl border border-white/5 p-7 text-center hover:border-[#409824]/20 transition-all duration-300">
                <p className="text-4xl font-bold text-[#409824]">{s.num}</p>
                <p className="text-sm text-[#56525E] mt-1">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/90 to-[#110B18]/95" />
        </div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#409824]/10 blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light text-[#FCFBFB] tracking-tight leading-tight">Ready to work together?</h2>
            <p className="text-[#B5ABB3] text-lg mt-4 mb-8 max-w-md mx-auto">Tell us about your content needs. We will send you a tailored proposal within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg shadow-[#409824]/20">
                Start a project <span>&rarr;</span>
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:border-[#B5ABB3]/60 transition-all duration-200">
                Contact us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
