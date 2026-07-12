"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/lib/scrollReveal"
import LetterReveal from "@/components/LetterReveal"

const services = [
  {
    id: "seo-content",
    title: "SEO Content Writing",
    icon: (
      <svg className="w-8 h-8 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Without SEO, your brand could never reach the visibility it deserves. Reaching high rankings isn't as simple as it used to be, and only experts can adapt to the constant changes of the algorithm. Let iGamingUbuntu deal with all of Google's requirements, and watch your brand climb the ranks.",
    link: "/seo-content-writing",
  },
  {
    id: "translation",
    title: "Translation",
    icon: (
      <svg className="w-8 h-8 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    desc: "Your creative voice must remain the same across all of the languages available on your site. At iGamingUbuntu, we specialise in all kinds of translations, and no matter if you're working with social media, emails, or documents, we're there to help you spread your message in multiple languages.",
    link: "/translation-services",
  },
  {
    id: "editing",
    title: "Editing",
    icon: (
      <svg className="w-8 h-8 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    desc: "In the digital sphere, even small errors can harm your brand's credibility. Though often overlooked, editing is an important part of the content marketing process that ensures you stay consistent while spreading your message. Avoiding typos and hitting the right tone of voice is crucial when creating an online presence.",
    link: "/editing-services",
  },
  {
    id: "link-building",
    title: "Link Building",
    icon: (
      <svg className="w-8 h-8 text-[#409824]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
    desc: "To rank among the biggest fish in the industry, you'll need to build your domain through powerful backlinks. At iGamingUbuntu, we'll ensure that these backlinks don't only work one SEO angle but also provide valuable information to the reader, enhancing traffic to your site.",
    link: "/link-building-services",
  },
]

const expectations = [
  {
    title: "Proven Track Record",
    desc: "iGamingUbuntu only works with experienced and well-established specialists. Our professional SEO writers will have no problems adapting to your niche and requirements, and by partnering with us, you'll be certain that experts will be working on your site.",
  },
  {
    title: "Top-Tier Quality",
    desc: "At iGamingUbuntu, we already have an established process that delivers top-tier quality and results. Quality SEO content is our business and a promise to all current and future clients.",
  },
  {
    title: "Updated Knowledge",
    desc: "We're aware that things change quickly nowadays, and how quickly you react can either make or break your business. Our experts remain in tune with the newest Google requirements to ensure your marketing plan delivers at all times.",
  },
  {
    title: "Precise Deadlines",
    desc: "Simply let us know when you need the content delivered, and we'll make sure it's on time. We're working on your time, and you won't have to worry about surprises and delays.",
  },
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* ===== HERO ===== */}
        <section className="relative rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-[#0E1358] to-[#1B2385]">
          <div className="absolute inset-0">
            <img src="/images/full backgound.png" alt="" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-[#110B18]/40" />
          <div className="relative z-10 p-8 md:p-16 text-white text-center">
            <LetterReveal
              text="Services"
              className="text-5xl md:text-7xl font-bold leading-tight"
              delay={300}
              stagger={40}
            />
            <LetterReveal
              text="A specific set of services is required to make the most out of your SEO content marketing campaign. At iGamingUbuntu, we aim to provide everything you need to achieve your business goals. A team of professionals will ensure all of your deadlines are met and expectations exceeded."
              as="p"
              className="text-white/80 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
              delay={1800}
              stagger={15}
            />
            <div className="mt-8 animate-fade-in" style={{ animationDelay: "3s", animationFillMode: "both" }}>
              <a href="#services" className="inline-flex items-center gap-2 bg-[#409824] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">
                Check out our offerings below
              </a>
            </div>
          </div>
        </section>

        {/* ===== SERVICES GRID ===== */}
        <section id="services" className="mb-16">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 mb-10">
            <div className="md:w-1/2">
              <ScrollReveal>
                <div className="text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] mb-3">iGamingUbuntu Services</div>
                <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight leading-tight">
                  We've Got The Formula<br />For Great Content
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:w-1/2">
              <ScrollReveal delay={150}>
                <p className="text-[#56525E] leading-relaxed">
                  At iGamingUbuntu, our mission is to make your life easier whilst providing you with great content that makes a difference.
                  That's why we offer a range of content services to cover all your needs, as well as having a fantastic team that works behind it all.
                </p>
              </ScrollReveal>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={i * 100}>
                <Link href={svc.link} className="group block glass-card rounded-2xl border border-white/5 p-6 md:p-8 hover:border-[#409824]/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-[#409824]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {svc.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#FCFBFB] group-hover:text-[#409824] transition-colors">{svc.title}</h3>
                  <p className="text-sm text-[#56525E] mt-3 leading-relaxed">{svc.desc}</p>
                  <div className="mt-auto pt-4">
                    <span className="text-sm text-[#409824] font-medium group-hover:underline inline-flex items-center gap-1">
                      Learn More about {svc.title} <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== WHAT CAN YOU EXPECT ===== */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-2/5">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight leading-tight">
                  What Can You Expect<br />From Our Experts?
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
        <section className="max-w-2xl mx-auto mb-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">FAQs</h2>
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
        </section>

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
