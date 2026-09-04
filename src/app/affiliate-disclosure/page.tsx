"use client"

import Link from "next/link"

const sections = [
  {
    title: "What Are Affiliate Links?",
    content: `Some links on this website are affiliate links. If you click on an affiliate link and sign up for a service, we may earn a commission at no additional cost to you.`,
  },
  {
    title: "Our Integrity",
    content: `Our reviews and recommendations are based on independent research and expertise. Affiliate relationships do not influence our editorial content or rankings.`,
  },
  {
    title: "Which Programs We Work With",
    content: `We are affiliates of SportPesa, Betika, 1xBet, Betway, 22Bet, and other iGaming operators operating legally in Africa.`,
  },
  {
    title: "Responsible Gambling",
    content: `We promote responsible gambling. Our content includes warnings and resources for players who need help. Gambling should be entertainment, not a way to make money.`,
  },
]

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Affiliate Disclosure</h1>
          <p className="text-gray-500 mt-3 text-sm">Last updated: September 4, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-600 leading-relaxed mb-10">
          iGamingUbuntu is committed to transparency. This disclosure explains our affiliate relationships.
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#111827] mb-3">{section.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed">{section.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
