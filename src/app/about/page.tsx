"use client"

import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const values = [
  {
    title: "Market by market",
    desc: "Each country has its own regulator, tax rules and payment habits. We report Kenya, Nigeria, South Africa, Ghana and Tanzania on their own terms, not as one market.",
  },
  {
    title: "Sourced and checked",
    desc: "Stories are built on regulator notices, court records, company results and named sources. We link to them so readers can check for themselves.",
  },
  {
    title: "Independent",
    desc: "Sponsored content is always labelled. Advertisers do not decide what we cover or how we report it.",
  },
  {
    title: "Open about mistakes",
    desc: "When we get something wrong, we fix it and say so. Our corrections policy explains how.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#110B18] relative overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/Green Data Network (ABSTRACT + TECH).png" alt="Abstract green digital network background" width={800} height={449} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110B18]/70 via-[#110B18]/60 to-[#110B18]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/40 to-transparent" />
        </div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#772953]/15 blur-[120px] animate-orb-drift" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-[#409824]/30 shadow-2xl shadow-[#409824]/10 shrink-0 -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image src="/images/nasheta-john-author.png" alt="Nasheta John" width={256} height={256} priority className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] bg-[#409824]/10 px-4 py-1.5 rounded-full mb-4">
                Founded by Nasheta John
              </div>
              <LetterReveal
                text="Independent news on Africa's iGaming industry."
                className="text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFBFB] leading-tight tracking-tight"
                highlight="iGaming industry."
                highlightClassName="text-[#409824]"
                delay={500}
                stagger={35}
              />
              <LetterReveal
                text="iGamingUbuntu reports on betting, casino, regulation and payments across Africa for operators, affiliates, regulators and investors."
                as="p"
                className="text-lg md:text-xl text-[#B5ABB3] mt-4 max-w-xl leading-relaxed"
                delay={2500}
                stagger={20}
              />
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <Link href="/news" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg shadow-[#409824]/20 hover:shadow-[#409824]/40">
                  Read the news <span>&rarr;</span>
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
              To give the African betting industry clear, fast and sourced news it can rely on.
            </h2>
            <p className="text-[#56525E] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Rules, taxes and licences change quickly across the continent. We track those changes every day and explain what they mean.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOUNDER STORY ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/Green Data Network (ABSTRACT + TECH).png" alt="Abstract green digital network background" width={800} height={449} loading="lazy" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#110B18] via-[#110B18]/95 to-[#110B18]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 shadow-xl border border-white/10">
                  <Image src="/images/nasheta-john-author.png" alt="Nasheta John" width={256} height={256} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-3xl font-light text-[#FCFBFB] mb-1">Nasheta John, Founder and Editor</h2>
                  <div className="space-y-4 text-[#56525E] leading-relaxed mt-6">
                    <p>Nasheta John has written about African iGaming markets since 2016, at a time when most betting coverage of the continent was copied from European sources.</p>
                    <p>iGamingUbuntu was started to change that: a publication that follows each African market closely, explains new rules in plain language, and treats readers as professionals who need facts, not hype.</p>
                  </div>
                  <Link href="/editorial-team" className="inline-flex items-center gap-1 text-[#409824] font-medium text-sm hover:underline mt-6">
                    Meet the editorial team &rarr;
                  </Link>
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

      {/* ===== CTA ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/Green Data Network (ABSTRACT + TECH).png" alt="Abstract green digital network background" width={800} height={449} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1358]/90 to-[#110B18]/95" />
        </div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#409824]/10 blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light text-[#FCFBFB] tracking-tight leading-tight">Have a story or want to advertise?</h2>
            <p className="text-[#B5ABB3] text-lg mt-4 mb-8 max-w-md mx-auto">Send us news tips, press releases and corrections, or reach our readers with a sponsored placement.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/advertise" className="inline-flex items-center gap-2 bg-[#409824] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition-all duration-200 shadow-lg shadow-[#409824]/20">
                Advertise with us <span>&rarr;</span>
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
