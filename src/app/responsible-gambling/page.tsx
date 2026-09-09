"use client"
import Link from "next/link"

const warningSigns = [
  "Spending more money than you can afford to lose",
  "Chasing losses or trying to win back money",
  "Borrowing money or selling possessions to gamble",
  "Neglecting work, family, or personal responsibilities",
  "Lying about gambling habits or hiding gambling from others",
  "Feeling restless or irritable when not gambling",
  "Gambling to escape problems or relieve negative feelings",
]

const supportResources = [
  { name: "GamCare", url: "https://www.gamcare.org.uk", desc: "Free information, support and counseling for problem gamblers" },
  { name: "Gamblers Anonymous", url: "https://www.gamblersanonymous.org", desc: "Fellowship of men and women who share their experience" },
  { name: "National Council on Problem Gambling", url: "https://www.ncpgambling.org", desc: "US-based resource with international guidance" },
  { name: "Responsible Gaming Foundation (Kenya)", url: "https://www.responsiblegaming.or.ke", desc: "Kenyan organization promoting responsible gambling" },
]

const sections = [
  { title: "Our Commitment", content: "We promote responsible gambling across all our content. Every article, guide, and review includes reminders to gamble responsibly. We never encourage excessive gambling or target vulnerable individuals." },
  { title: "Age Verification", content: "All content on this site is intended for individuals aged 18 and over. We do not knowingly target minors. Gambling laws in most African jurisdictions require participants to be at least 18 years old." },
  { title: "Self-Exclusion", content: "Most licensed operators offer self-exclusion tools that allow you to restrict your gambling activity. These include temporary breaks, deposit limits, loss limits, and permanent self-exclusion. Check your operator's responsible gambling section for available tools." },
]

export default function ResponsibleGamblingPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Responsible Gambling</h1>
          <p className="text-gray-500 mt-3 text-sm">Your wellbeing matters more than any bet</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {sections.map((s) => (
          <div key={s.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-[#111827] mb-3">{s.title}</h2>
            <div className="text-sm text-gray-600 leading-relaxed">{s.content}</div>
          </div>
        ))}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">Warning Signs of Problem Gambling</h2>
          <ul className="space-y-2">
            {warningSigns.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-red-500 mt-0.5">•</span>{w}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">Support Resources</h2>
          <div className="space-y-4">
            {supportResources.map((r) => (
              <div key={r.name}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] font-medium text-sm hover:underline">{r.name}</a>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 rounded-xl border border-red-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-red-800 mb-2">We Never:</h2>
          <ul className="space-y-1 text-sm text-red-700">
            <li>• Encourage excessive gambling</li>
            <li>• Target minors or vulnerable individuals</li>
            <li>• Misrepresent odds or winning probabilities</li>
            <li>• Suggest gambling as a way to make money</li>
          </ul>
        </div>

        <div className="mt-12 text-center"><Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">&larr; Back to Home</Link></div>
      </div>
    </div>
  )
}
