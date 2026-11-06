import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Press Releases from iGaming Operators",
  description:
    "Submit a press release to iGamingUbuntu. What we publish, what we decline, how paid releases are labelled and how to reach the editorial team.",
  alternates: { canonical: "/press" },
}

const ACCEPT = [
  "Licences, approvals and market launches in African countries",
  "Regulatory filings, tax and compliance notices from operators or suppliers",
  "Payment, mobile-money and fintech integrations for African betting markets",
  "Supplier and operator partnerships with a stated African market",
  "Responsible-gambling programmes and research",
  "Event announcements, appointments and awards connected to African gaming",
]

const DECLINE = [
  "Unlicensed or unregulated operators, or promotions aimed at players in markets where the operator holds no licence",
  "Claims we cannot attribute, such as revenue or user figures with no named source",
  "Content aimed at minors, or that promises guaranteed winnings",
  "Pure advertising copy with no news value (we offer a clearly labelled sponsored article for that: see Advertise)",
]

const STEPS = [
  { title: "Send it", text: "Use the contact form (choose Industry News & Press Releases) or email info@igamingubuntu.com. Include the release as text, a company contact and a link to the original source or announcement." },
  { title: "We check it", text: "An editor reads it, checks the key facts against a public source where one exists, and may come back with questions. We do not publish figures we cannot attribute." },
  { title: "We publish or decline", text: "Releases are edited for clarity and length. If we publish it, the page states that it is a press release. If we cannot publish it, we say so." },
]

export default function PressReleasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Press Releases"
        description="How to submit a press release to iGamingUbuntu, and what to expect."
        crumbs={[{ label: "Home", href: "/" }, { label: "Press Releases" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">What we publish</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
            {ACCEPT.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">What we decline</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
            {DECLINE.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
        <h2 className="text-lg font-bold text-[#111827] mb-4">How it works</h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <p className="text-sm font-semibold text-[#409824] mb-1">Step {i + 1}</p>
              <h3 className="font-bold text-[#111827] mb-1">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
        <h2 className="text-lg font-bold text-[#111827] mb-2">Paid and unpaid releases</h2>
        <p className="text-sm text-gray-600">
          A press release is a company announcement and is labelled as one. Paid placements are labelled as sponsored,
          and paid links carry rel=&quot;sponsored&quot;. Payment never buys a favourable article, and it does not change
          our independent reporting. Read our <Link href="/editorial-policy" className="text-[#409824] hover:underline">editorial policy</Link> and
          the <Link href="/affiliate-disclosure" className="text-[#409824] hover:underline">affiliate disclosure</Link>.
        </p>
      </section>

      <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-10 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-[#111827] mb-3">Submit a Press Release</h2>
          <p className="text-gray-500 mb-6">
            Want a paid feature or banner instead? See <Link href="/advertise" className="text-[#409824] hover:underline">Advertise</Link>.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f59e0b] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#f59e0b]/90 transition"
          >
            Submit Your Press Release
          </Link>
        </div>
      </div>
    </div>
  )
}
