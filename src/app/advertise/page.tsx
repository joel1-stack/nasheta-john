"use client"
import { useState } from "react"
import Link from "next/link"
import { trackLead } from "@/lib/analytics"

const bookings = [
  {
    title: "Sponsored article",
    desc: 'A feature written by our editor or supplied by you, published on iGamingUbuntu, labelled "Sponsored" and kept on the site permanently.',
  },
  {
    title: "Press release",
    desc: "Your announcement published in our news section and labelled as a press release.",
  },
  {
    title: "Banner placement",
    desc: "Sidebar or in-article banners across our news and guides.",
  },
  {
    title: "Newsletter slot",
    desc: "A short feature in our email newsletter.",
  },
  {
    title: "Content packages",
    desc: "Monthly articles for brands that want regular coverage in African markets.",
  },
]

const howWeWork = [
  'All paid content is clearly labelled, and paid links use rel="sponsored", in line with Google\'s rules.',
  "We only feature brands that are licensed in the markets they target.",
  "We publish within 3 working days of receiving final copy and payment.",
]

export default function AdvertisePage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }
    try {
      await fetch("https://formsubmit.co/ajax/info@igamingubuntu.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Advertise: ${data.company} - ${data.interest}` }),
      })
      setSent(true)
      trackLead("advertise")
    } catch {}
    setLoading(false)
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Advertise</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Advertise With iGamingUbuntu</h1>
          <p className="text-gray-500 mt-3 text-sm">Sponsored articles, press releases, banners and newsletter slots</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            iGamingUbuntu covers betting and casino regulation, payments and industry news across Kenya, Nigeria,
            South Africa, Ghana, Tanzania, Uganda and the rest of Africa. Our readers are operators, affiliates,
            suppliers and players who follow how African markets are changing.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#111827] mb-4">What you can book</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {bookings.map((o) => (
              <div key={o.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-[#111827] mb-2">{o.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-[#111827] mb-3">How we work</h2>
          <ul className="space-y-2">
            {howWeWork.map((item) => (
              <li key={item} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                <span className="text-[#f59e0b] font-bold shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-[#111827] mb-2">Get a rate card</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Tell us what you would like to promote and in which countries, and we will send our current rates.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-4">Get in Touch</h2>
          {sent ? (
            <div className="text-center py-8">
              <p className="text-[#409824] font-medium">Thank you! We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company / Brand</label>
                  <input type="text" name="company" required className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                  <select name="interest" required className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40">
                    <option value="">Select...</option>
                    <option value="sponsored-article">Sponsored article</option>
                    <option value="press-release">Press release</option>
                    <option value="banner">Banner placement</option>
                    <option value="newsletter">Newsletter slot</option>
                    <option value="content-package">Content package</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 resize-none" placeholder="Tell us what you would like to promote and in which countries..." />
              </div>
              <button type="submit" disabled={loading} className="bg-[#f59e0b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d97706] transition disabled:opacity-50 cursor-pointer">
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          )}
        </div>
        <div className="mt-12 text-center"><Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">&larr; Back to Home</Link></div>
      </div>
    </div>
  )
}
