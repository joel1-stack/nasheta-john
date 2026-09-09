"use client"
import Link from "next/link"

const sections = [
  { title: "Our Policy", content: "We are committed to accuracy and transparency in all our content. When we make mistakes, we correct them promptly and transparently. Our readers deserve to trust the information we publish." },
  { title: "How to Report an Error", content: "If you find an error in any of our content, please email us at salvagekyalo@gmail.com with the article URL and a description of the error. We review all reports within 24 hours." },
  { title: "Correction Types", content: "Factual errors (incorrect statistics, dates, or claims), outdated information (changes in regulation, operator terms, or market conditions), broken or outdated links, and misleading or unclear content." },
  { title: "Our Process", content: "When we verify an error, we correct the article immediately and add a correction note at the bottom of the article. The note includes what was changed and when. We do not silently edit articles." },
  { title: "Editorial Record", content: "All significant corrections and updates are logged here. For articles updated after initial publication, the update date is shown on the article page." },
]

export default function CorrectionsPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Corrections & Updates</h1>
          <p className="text-gray-500 mt-3 text-sm">Our commitment to accuracy and transparency</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#111827] mb-3">{s.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed">{s.content}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">Recent Corrections</h2>
          <p className="text-sm text-gray-500 italic">No corrections to report at this time.</p>
        </div>
        <div className="mt-12 text-center"><Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">&larr; Back to Home</Link></div>
      </div>
    </div>
  )
}
