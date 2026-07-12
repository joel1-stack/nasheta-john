"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const benefits = [
  { title: "Accuracy and Quality", desc: "Machine translation can't handle iGaming terminology, bonus terms, or compliance language. Our native translators understand gambling vocabulary and local regulations, ensuring your message stays accurate and legally sound in every language." },
  { title: "Global Reach", desc: "If your goal is to grow beyond your home market, professional translation is essential. We help you introduce your brand to each region through original, relatable content that speaks like a local." },
  { title: "Ease of Collaboration", desc: "Send us your content. Tell us the languages and deadline. We handle the rest — with a clear workflow, review rounds, and on-time delivery." },
]

const steps = [
  { num: "01", title: "Submit Content", desc: "Upload your content via our platform or send it however works best for you." },
  { num: "02", title: "Select Languages", desc: "Tell us which markets you're targeting and when you need the finished content." },
  { num: "03", title: "Translation", desc: "Our native iGaming translators begin work, adapting terminology, tone, and CTAs." },
  { num: "04", title: "Review", desc: "We deliver for your review. Request amendments — we handle them immediately." },
  { num: "05", title: "Completion", desc: "Once approved, your content is ready to publish. We can also upload directly to your CMS." },
]

const faqs = [
  { q: "What languages do you offer?", a: "We cover major African markets (Swahili, English, French, Portuguese, Afrikaans, Pidgin, Hausa, Yoruba, Zulu, and more) plus global languages. Tell us your target market and we'll confirm coverage." },
  { q: "What types of documents can you translate?", a: "Website copy, bonus terms, reviews, articles, emails, social posts, video scripts, and legal disclaimers." },
  { q: "How do you ensure accuracy?", a: "Native translators with iGaming expertise plus multi-step editorial review plus client feedback loops." },
  { q: "How long does translation take?", a: "Depends on volume. Standard articles: 2-4 business days. Bulk projects: scheduled to your timeline." },
  { q: "Do you offer localisation, not just translation?", a: "Yes. We adapt currency references, payment methods, local leagues, and cultural references so content feels native — not translated." },
]

export default function TranslationPage() {
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
            <LetterReveal text="iGaming Translation & Localisation" className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto" delay={300} stagger={30} />
            <LetterReveal text="Multilingual content that keeps your brand voice — and your SEO — intact across every market you enter." as="p" className="text-white/80 text-lg mt-4 max-w-xl mx-auto" delay={2000} stagger={15} />
            <p className="text-white/60 text-sm mt-2 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "both" }}>Whether you're localising for Swahili-speaking players in Kenya, Pidgin audiences in Nigeria, or Afrikaans markets in South Africa, we translate and adapt iGaming content so it feels native and ranks locally.</p>
            <div className="flex flex-wrap gap-3 mt-6 justify-center animate-fade-in" style={{ animationDelay: "3.5s", animationFillMode: "both" }}>
              <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Benefits of iGaming Translation Services</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
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
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">How to Get Your iGaming Content Translated</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-5 text-center hover:border-[#409824]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#409824] flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-sm">{s.num}</span>
                  </div>
                  <h3 className="font-bold text-[#FCFBFB] text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-[#56525E] leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Quality */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">How We Ensure Quality in iGaming Translations</h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="glass-card rounded-2xl border border-white/5 p-8">
                <p className="text-[#56525E] leading-relaxed">Our translators are native speakers with iGaming expertise. They understand betting odds, casino mechanics, bonus structures, and local compliance requirements. We run a multi-step quality control process: translation to editorial review to final QA. We also build and maintain multilingual style guides and glossaries for your brand so terminology stays consistent across all markets.</p>
              </div>
            </ScrollReveal>
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Don't let language barriers limit your growth.</h2>
            <p className="text-[#B5ABB3] mt-3 mb-6 max-w-md mx-auto">Get quick, reliable, and accurate iGaming translations that keep your brand consistent across every market.</p>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Get a quote</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
