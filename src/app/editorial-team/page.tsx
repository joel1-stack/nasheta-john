"use client"
import Link from "next/link"

export default function EditorialTeamPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">About</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Editorial Team</h1>
          <p className="text-gray-500 mt-3 text-sm">The people behind iGamingUbuntu</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E95420] to-[#772953] flex items-center justify-center text-white font-bold text-2xl shrink-0">NJ</div>
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Nasheta John</h2>
              <p className="text-[#f59e0b] text-sm font-medium mb-2">Founder & Lead Writer</p>
              <p className="text-sm text-gray-600 leading-relaxed">Nasheta is an iGaming content specialist with extensive experience covering African betting and casino markets. He founded iGamingUbuntu to create the most trusted source of iGaming information for African players and operators.</p>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">His work focuses on market-specific betting guides, operator reviews, and industry analysis across Kenya, Nigeria, South Africa, Ghana, and Tanzania.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">iGamingUbuntu Team</h2>
          <p className="text-sm text-gray-600 leading-relaxed">We work with specialist writers, editors, and market analysts across Africa. Each contributor brings deep knowledge of their specific market, language, and regulatory environment. As iGamingUbuntu grows, we are expanding our editorial team to cover more markets with greater depth and accuracy.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">Join Our Team</h2>
          <p className="text-sm text-gray-600 leading-relaxed">We are always looking for experienced iGaming writers, editors, and market analysts. If you have deep knowledge of African betting markets and a passion for accurate, helpful content, get in touch at <a href="mailto:salvagekyalo@gmail.com" className="text-[#f59e0b] hover:underline">salvagekyalo@gmail.com</a>.</p>
        </div>

        <div className="mt-12 text-center"><Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">&larr; Back to Home</Link></div>
      </div>
    </div>
  )
}
