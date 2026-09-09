"use client"
import Link from "next/link"

const sections = [
  { title: "Our Review Process", content: "Every operator review follows a structured methodology. Our team tests each platform firsthand — depositing funds, placing bets, testing withdrawals, and evaluating the complete user experience across desktop and mobile." },
  { title: "What We Evaluate", content: "Game selection and variety, bonus terms and wagering requirements, payment methods (especially M-Pesa, mobile money, and local banking), customer support quality and availability, licensing and regulation, mobile experience, payout speed and reliability, and responsible gambling tools." },
  { title: "Rating Criteria", content: "We rate operators on a 1-10 scale across multiple categories. No operator can pay for a higher rating. Our ratings reflect genuine user experience and objective analysis. If an operator pays for a sponsored review, the sponsored status is clearly disclosed." },
  { title: "Affiliate Relationships", content: "We earn commissions when readers sign up through our affiliate links. This never influences our ratings, recommendations, or editorial content. We only recommend operators we genuinely believe provide value to African players." },
  { title: "Update Frequency", content: "Reviews are updated quarterly or when significant changes occur — new bonuses, payment method changes, regulatory updates, or ownership changes. Each review shows the date of last update." },
]

export default function HowWeReviewPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">About</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">How We Review Operators</h1>
          <p className="text-gray-500 mt-3 text-sm">Our methodology for evaluating betting sites and casinos</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-600 leading-relaxed mb-10">Transparency is at the core of our review process. Here is how we evaluate and rank iGaming operators for African markets.</p>
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
