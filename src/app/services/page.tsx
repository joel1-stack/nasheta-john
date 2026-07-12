"use client"

import { useState } from "react"
import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const services = [
  {
    id: "seo-content",
    title: "SEO Content Writing",
    tagline: "Data-led, editorial content that ranks and converts.",
    icon: (
      <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    deliverables: [
      "Long-form articles and guides — briefs, drafts, final",
      "Page copy — product, category, landing pages",
      "Blog content and topical clusters",
      "Meta titles, descriptions and on-page optimisation notes",
    ],
    subs: [
      "Keyword and topical research",
      "Content briefs and persona targeting",
      "Headline testing — A/B title variants",
      "CMS-ready delivery — structured headings, alt text",
    ],
    cta: "See sample brief",
  },
  {
    id: "translation",
    title: "Translation",
    tagline: "Maintain voice and SEO across languages.",
    icon: (
      <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    deliverables: [
      "Translations for web pages, emails, social posts",
      "Localised keyword research and optimisation",
      "Multilingual style guides and glossaries",
    ],
    subs: [
      "Native translator assignment with translator notes",
      "Transcreation for marketing assets",
      "QA and publishing in local CMS",
    ],
    cta: "Learn more",
  },
  {
    id: "editing",
    title: "Editing",
    tagline: "Polish tone, remove errors, ensure brand consistency.",
    icon: (
      <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    deliverables: [
      "Proofreading — typos, grammar, punctuation",
      "Tone and style editing — brand voice alignment",
      "Structural editing for clarity and flow",
    ],
    subs: [
      "Final QA pass — pre-publish",
      "Fact checks and link checks",
      "Readability and accessibility checks",
    ],
    cta: "Learn more",
  },
  {
    id: "link-building",
    title: "Link Building, Outreach and Backlinks",
    tagline: "Build authoritative backlinks that boost rankings and referral traffic.",
    icon: (
      <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
    deliverables: [
      "Outreach and guest post placement",
      "Editorial link campaigns and content promotion",
      "Link prospecting and domain authority targeting",
    ],
    subs: [
      "Campaign strategy and target list",
      "Content asset creation for outreach",
      "Reporting on links and placements",
    ],
    cta: "Learn more",
  },
  {
    id: "strategy",
    title: "Content Strategy and Research",
    tagline: "Plan campaigns that compound organic growth.",
    icon: (
      <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
    deliverables: [
      "Topical maps and content calendars",
      "Competitor gap analysis",
      "Conversion-focused content funnel planning",
    ],
    subs: [
      "Audience persona work",
      "KPI and measurement framework",
    ],
    optional: true,
    cta: "Learn more",
  },
  {
    id: "operations",
    title: "Content Operations",
    tagline: "Workflow, briefs, and CMS publishing to keep production predictable.",
    icon: (
      <svg className="w-7 h-7 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
    deliverables: [
      "Editorial calendar, brief templates, versioning",
      "CMS upload and basic page layout",
      "API integrations and formatting for syndication",
    ],
    subs: [
      "Batch production scheduling",
      "Onboarding and single point of contact project management",
    ],
    optional: true,
    cta: "Learn more",
  },
]

const packages = [
  {
    name: "Starter",
    price: "Per-piece or monthly",
    badge: "",
    bullets: [
      "Set number of articles per month",
      "Basic editing and proofreading",
      "CMS-ready delivery",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "Monthly retainer",
    badge: "Most Popular",
    bullets: [
      "More articles plus translation",
      "Link prospecting and outreach",
      "Dedicated editor",
      "Slack and email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom monthly",
    badge: "",
    bullets: [
      "Full strategy plus operations",
      "Link building and dedicated account team",
      "Content operations and CMS management",
      "Priority support and monthly performance review",
    ],
  },
]

const processSteps = [
  { step: "01", title: "Research", desc: "Keyword and audience discovery to identify high-opportunity topics." },
  { step: "02", title: "Strategy", desc: "Topical map and brief approval before production begins." },
  { step: "03", title: "Production", desc: "Writing, editing, localisation and QA across all deliverables." },
  { step: "04", title: "Promotion", desc: "Outreach and link building to amplify content reach." },
  { step: "05", title: "Reporting", desc: "Deliverables, performance review and KPI alignment." },
]

const faqs = [
  {
    q: "Do you offer multilingual content?",
    a: "Yes. Our Translation service covers web pages, email campaigns, and social content across multiple languages. We assign native translators and maintain multilingual style guides to ensure voice and SEO consistency.",
  },
  {
    q: "Can translation be part of my SEO strategy?",
    a: "Absolutely. Localised keyword research, transcreation for marketing assets, and QA within your CMS ensure translated content ranks and converts in each target market.",
  },
  {
    q: "Is professional copywriting necessary?",
    a: "Professional copywriting delivers measurable ROI through higher rankings, better conversion rates, and consistent brand voice. Our editorial team combines SEO discipline with journalistic standards to produce content that performs.",
  },
  {
    q: "How do you ensure on-time delivery?",
    a: "We use structured workflows with clear milestones, dedicated account management, and batch scheduling. Our Content Operations service keeps production predictable at any scale.",
  },
]

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  return (
    <div className="bg-[#110B18] min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/images/sports betting analytics.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#110B18]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#110B18]/20 via-transparent to-[#110B18]/40" />
      </div>
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#409824]/8 blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0E1358]/15 blur-[100px] animate-orb-drift-slow pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* ===== HERO ===== */}
        <section className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-[#0E1358] to-[#1B2385]">
          <div className="absolute inset-0">
            <img src="/images/sports betting analytics.png" alt="" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-[#110B18]/40" />
          <div className="relative z-10 p-8 md:p-14 text-white">
            <LetterReveal
              text="We create high performing SEO content that converts."
              className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl"
              delay={400}
              stagger={30}
            />
            <LetterReveal
              text="Full-service content and localisation delivered by an experienced editorial team."
              as="p"
              className="text-white/80 text-lg mt-3 max-w-xl"
              delay={2200}
              stagger={18}
            />
            <p className="text-white/60 text-sm mt-2 max-w-lg animate-fade-in" style={{ animationDelay: "3.5s", animationFillMode: "both" }}>
              From research and writing to translation, editing and link building — we cover everything a modern SEO content campaign needs.
            </p>
            <div className="flex flex-wrap gap-3 mt-6 animate-fade-in" style={{ animationDelay: "4s", animationFillMode: "both" }}>
              <a href="#form" onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">
                Get a project estimate
              </a>
              <Link href="/blog" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition">
                See our work
              </Link>
            </div>
          </div>
        </section>

        <AdSlot position="leaderboard-top" className="mb-12" />

        {/* ===== INTRO ===== */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <ScrollReveal>
            <p className="text-[#56525E] text-lg leading-relaxed">
              A specific set of services is required to make the most of your SEO content marketing campaign.
              We provide everything you need to achieve your business goals — from research and writing to translation,
              editing, link building, and full content operations.
            </p>
          </ScrollReveal>
        </div>

        {/* ===== SERVICE CARDS ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.id} delay={i * 80}>
              <div
                className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#409824]/10 flex items-center justify-center">
                    {svc.icon}
                  </div>
                  {svc.optional && <span className="text-[10px] font-semibold text-[#409824] bg-[#409824]/10 px-2.5 py-0.5 rounded-full">Add-on</span>}
                </div>
                <h3 className="font-bold text-[#FCFBFB] text-lg group-hover:text-[#409824] transition-colors">{svc.title}</h3>
                <p className="text-sm text-[#56525E] mt-1 mb-4">{svc.tagline}</p>
                <ul className="space-y-2 text-sm text-[#56525E]">
                  {svc.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-[#409824] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <button className="text-xs text-[#409824] font-medium mt-4 hover:underline flex items-center gap-1">
                  {expanded === svc.id ? "Less detail" : svc.cta}
                  <svg className={`w-3 h-3 transition-transform ${expanded === svc.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {expanded === svc.id && (
                  <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in">
                    <p className="text-xs font-semibold text-[#B5ABB3] mb-2">Sub-services:</p>
                    <ul className="space-y-1.5 text-sm text-[#56525E]">
                      {svc.subs.map((s) => (
                        <li key={s} className="flex items-start gap-2">
                          <svg className="w-3.5 h-3.5 text-[#409824] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ===== PACKAGES ===== */}
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 mb-14 border border-white/5">
            <h2 className="text-2xl font-bold text-[#FCFBFB] text-center mb-2">Simple, scalable pricing</h2>
            <p className="text-[#56525E] text-center mb-8 max-w-lg mx-auto">Choose the package that fits your content volume and goals. All plans include CMS-ready delivery and editorial QA.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.name} className={`glass-card rounded-xl border-2 p-6 relative ${pkg.badge ? "border-[#409824] shadow-lg shadow-[#409824]/10" : "border-white/5"}`}>
                  {pkg.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#409824] text-white text-xs font-bold px-4 py-1 rounded-full">{pkg.badge}</span>
                  )}
                  <h3 className="font-bold text-xl text-[#FCFBFB]">{pkg.name}</h3>
                  <p className="text-sm text-[#56525E] mt-1 mb-4">{pkg.price}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#B5ABB3]">
                        <svg className="w-4 h-4 text-[#409824] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#form" onClick={() => setShowForm(true)} className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition ${pkg.badge ? "bg-[#409824] text-white hover:bg-[#409824]/90" : "border border-white/10 text-[#B5ABB3] hover:border-[#409824]/50 hover:text-[#FCFBFB]"}`}>
                    Get pricing
                  </a>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="#form" onClick={() => setShowForm(true)} className="text-[#409824] font-medium text-sm hover:underline">Need something custom? Request a tailored quote &rarr;</a>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== TRUST ===== */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-[#FCFBFB] mb-3">Trusted by leading brands and agencies</h2>
            <p className="text-[#56525E] text-sm mb-6 max-w-xl mx-auto">We deliver editorial content that performs, on time and at scale.</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Publishing", "iGaming", "SaaS", "E-commerce", "Finance", "Health", "Travel"].map((sector, i) => (
              <ScrollReveal key={sector} delay={i * 60}>
                <div className="glass-card border border-white/5 rounded-xl px-5 py-2.5 text-sm font-medium text-[#B5ABB3] hover:border-[#409824]/30 hover:text-[#FCFBFB] transition-all duration-300 cursor-default">{sector}</div>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { num: "5,000+", label: "pieces delivered" },
              { num: "12+", label: "languages supported" },
              { num: "98%", label: "on-time delivery" },
              { num: "50+", label: "active clients" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#409824]">{s.num}</p>
                  <p className="text-sm text-[#56525E] mt-1">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ===== TESTIMONIALS ===== */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            { quote: "They consistently deliver high-quality content that ranks. Our organic traffic grew 280% in six months.", name: "Marcus Olof", title: "Head of Content, Betting Platform" },
            { quote: "The translation service maintained our brand voice perfectly across three African markets.", name: "Priya Sharma", title: "Marketing Director, iGaming Operator" },
            { quote: "Reliable, professional, and results-driven. They've become an extension of our editorial team.", name: "James Kamau", title: "CEO, Affiliate Network" },
          ].map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="glass-card rounded-2xl border border-white/5 p-6 hover:border-[#409824]/20 transition-all duration-300">
                <svg className="w-6 h-6 text-[#409824]/30 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-sm text-[#B5ABB3] leading-relaxed mb-4">{t.quote}</p>
                <p className="font-semibold text-[#FCFBFB] text-sm">{t.name}</p>
                <p className="text-xs text-[#56525E]">{t.title}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ===== PROCESS ===== */}
        <div className="mb-14">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#FCFBFB]">How we work</h2>
            <p className="text-[#56525E] text-sm mt-1">Five steps from discovery to delivery.</p>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#409824]/40 via-[#409824]/20 to-[#409824]/40" />
            <div className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 100}>
                  <div className="text-center relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#409824] to-[#2d6b1a] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#409824]/20 relative z-10">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    <h3 className="font-bold text-[#FCFBFB] text-sm">{step.title}</h3>
                    <p className="text-xs text-[#56525E] mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <AdSlot position="in-content-1" className="mb-14" />

        {/* ===== CASE STUDIES ===== */}
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 text-center mb-14 border border-white/5">
            <p className="text-[#B5ABB3] mb-4">Want to see real results? Browse our portfolio of successful content campaigns.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#409824]/90 transition text-sm shadow-lg shadow-[#409824]/20">
              See examples of our work
            </Link>
          </div>
        </ScrollReveal>

        {/* ===== FAQ ===== */}
        <div className="max-w-2xl mx-auto mb-14">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#FCFBFB]">Frequently asked questions</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 80}>
                <div className="glass-card rounded-xl border border-white/5 overflow-hidden hover:border-[#409824]/20 transition-all duration-300">
                  <button
                    onClick={() => setFaqOpen(faqOpen === faq.q ? null : faq.q)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <span className="font-medium text-[#FCFBFB] text-sm">{faq.q}</span>
                    <svg className={`w-4 h-4 text-[#56525E] shrink-0 transition-transform ${faqOpen === faq.q ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {faqOpen === faq.q && (
                    <div className="px-4 pb-4 text-sm text-[#56525E] leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ===== CONTACT FORM ===== */}
        <div id="form" className="scroll-mt-20">
          {showForm ? (
            <ScrollReveal>
              <div className="glass-card rounded-2xl border border-white/5 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-[#FCFBFB] mb-2">Request a project estimate</h2>
                <p className="text-[#56525E] text-sm mb-6">Tell us about your content needs and we'll send you a tailored proposal within 24 hours.</p>
                <ContactForm />
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#FCFBFB] mb-3">Ready to get started?</h2>
                <p className="text-[#56525E] mb-6">Tell us about your project and receive a tailored proposal within 24 hours.</p>
                <button onClick={() => setShowForm(true)} className="bg-[#409824] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20 cursor-pointer">
                  Start a project
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* ===== STICKY CTA ===== */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => {
              setShowForm(true)
              document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="bg-[#409824] text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-[#409824]/30 hover:bg-[#409824]/90 transition cursor-pointer text-sm flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Request an estimate
          </button>
        </div>
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
