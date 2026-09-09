"use client"
import Link from "next/link"

const sections = [
  { title: "Our Mission", content: "iGamingUbuntu is an independent African iGaming publication. We provide news, guides, reviews, and analysis for the African betting and casino industry. Our goal is to be the most trusted source of iGaming information across the continent." },
  { title: "Editorial Independence", content: "Our editorial content is not influenced by advertisers, sponsors, or affiliate partners. We maintain strict separation between commercial and editorial content. No advertiser or partner can influence, review, or approve our editorial content before publication." },
  { title: "How We Fund Operations", content: "Revenue comes from affiliate commissions, advertising, and sponsored content. All affiliate relationships are disclosed on relevant pages and in our Affiliate Disclosure. Sponsored content is clearly labeled as such and does not appear in our editorial sections." },
  { title: "Content Standards", content: "All content is written by experienced iGaming journalists and reviewed before publication. We fact-check claims, verify information with primary sources, and update articles when new information becomes available. We never publish misleading or deceptive content." },
  { title: "Corrections", content: "We correct errors promptly and transparently. If you find an error in any of our content, please contact us at salvagekyalo@gmail.com. We will investigate and correct verified errors within 24 hours. Significant corrections are noted at the bottom of the affected article." },
]

export default function EditorialPolicyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">About</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Editorial Policy</h1>
          <p className="text-gray-500 mt-3 text-sm">Last updated: September 2026</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-600 leading-relaxed mb-10">iGamingUbuntu is committed to editorial integrity, transparency, and independence. This policy outlines how we create, review, and publish content.</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#111827] mb-3">{s.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed">{s.content}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">&larr; Back to Home</Link></div>
      </div>
    </div>
  )
}
