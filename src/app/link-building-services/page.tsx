"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const benefits = [
  { title: "Improved Domain Authority", desc: "Backlinks act as endorsements. We secure links from high-authority sites relevant to iGaming, sports, and finance — boosting your domain rating and overall rankings." },
  { title: "Increased Organic Traffic", desc: "Higher authority means better rankings, which means more eyes on your platform. Combined with strong keyword strategy, this creates a compounding traffic effect." },
  { title: "Brand Visibility & Credibility", desc: "Mentions on respected platforms position you alongside industry leaders. Editorial links in trusted publications build the reputation that paid ads cannot buy." },
]

const expectations = [
  { title: "Proven Success", desc: "Our outreach team has secured placements across iGaming, sports, and affiliate publications. We understand what editors want and how to pitch content that gets accepted." },
  { title: "Unmatched Quality", desc: "We only pursue links from relevant, high-authority sites. No link farms, no PBNs, no black-hat tactics. Every link is earned and editorially placed." },
  { title: "Strategic Precision", desc: "We stay ahead of algorithm updates and iGaming industry trends. Our strategy adapts to your market, your competitors, and your goals." },
]

const faqs = [
  { q: "What is link building, and why is it important for iGaming SEO?", a: "It is the process of earning hyperlinks from other websites to your own. For iGaming brands, it builds authority, improves rankings for competitive terms, and drives referral traffic." },
  { q: "What types of link building strategies do you use?", a: "Guest posts, editorial outreach, content promotion, digital PR, and resource link building. All white-hat and compliance-aware." },
  { q: "How do you identify high-quality websites?", a: "We evaluate domain authority, relevance to iGaming or sports, traffic quality, and editorial standards. No low-quality or risky sites." },
  { q: "What is the difference between white-hat and black-hat link building?", a: "White-hat means earning links through quality content and genuine outreach. Black-hat uses manipulative tactics that can trigger penalties. We only do white-hat." },
  { q: "How long does it take to see results?", a: "Typically 2-4 months for noticeable ranking improvements. Link building is a long-term strategy with compounding returns." },
  { q: "Will you provide a report on links acquired?", a: "Yes. Every campaign includes detailed reporting on placements, domain metrics, and traffic impact." },
]

export default function LinkBuildingPage() {
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
            <LetterReveal text="iGaming Link Building & Outreach" className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto" delay={300} stagger={30} />
            <LetterReveal text="Build authoritative backlinks that boost domain authority, rankings, and referral traffic in regulated markets." as="p" className="text-white/80 text-lg mt-4 max-w-xl mx-auto" delay={2000} stagger={15} />
            <p className="text-white/60 text-sm mt-2 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "both" }}>Link building is essential for iGaming SEO. We create ethical, high-quality backlink campaigns that place your brand on relevant, authoritative sites — driving both search rankings and direct player traffic.</p>
            <div className="flex flex-wrap gap-3 mt-6 justify-center animate-fade-in" style={{ animationDelay: "3.5s", animationFillMode: "both" }}>
              <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Contact us</Link>
            </div>
          </div>
        </section>

        {/* Why matters */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Why iGaming Link Building Matters</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Enhances Domain Authority", desc: "To rank for competitive betting and casino terms, your domain needs authority. Quality backlinks from trusted sites signal credibility to Google." },
              { title: "Boosts Organic Traffic", desc: "Well-placed links on relevant iGaming, sports, and entertainment sites bring targeted readers who are already interested in betting." },
              { title: "More Conversions", desc: "Backlinks from high-intent contexts reach audiences ready to register. The right link in the right article drives sign-ups, not just clicks." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
                  <h3 className="font-bold text-[#FCFBFB] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#56525E] leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition text-sm shadow-lg shadow-[#409824]/20">Contact us</Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Benefits of iGaming Link Building</h2>
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
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition text-sm shadow-lg shadow-[#409824]/20">Contact us</Link>
          </div>
        </section>

        {/* Expectations */}
        <section className="mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">What You Can Expect From Our Experts</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {expectations.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300 h-full">
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
            <img src="/images/sports betting analytics.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/90 to-[#110B18]/95" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Ready to build authority and outrank your competitors?</h2>
            <p className="text-[#B5ABB3] mt-3 mb-6 max-w-md mx-auto">Start a link building campaign with iGamingUbuntu. Our team has the experience, relationships, and editorial standards to deliver results.</p>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">Contact us</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
