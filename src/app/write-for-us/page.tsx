import Link from "next/link"
import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Write for iGamingUbuntu: Contributor Guidelines",
  description:
    "Contribute to iGamingUbuntu. What we accept on African betting regulation, payments and licensing, how pieces are edited, and our link policy.",
  path: "/write-for-us",
})

const WANTED = [
  "Country explainers on licensing, taxes and compliance, sourced to the regulator or the law",
  "Analysis of a regulatory change and what it means for operators, suppliers or affiliates",
  "Payments and mobile-money developments in African betting markets",
  "Responsible-gambling research and programmes with named evidence",
  "Event reports and interviews with named, on-the-record sources",
]

const RULES = [
  "Original work that has not been published elsewhere, written for an African iGaming audience",
  "Every factual claim sourced; link to the regulator notice, law, filing or announcement you rely on",
  "No unsourced statistics, no guaranteed-win claims, nothing aimed at minors",
  "Promoted operators or products must be licensed in the market the piece discusses, and any commercial relationship must be disclosed to the editor",
  "Our editors may edit for length, clarity and accuracy and may decline a piece",
]

export default function WriteForUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-5 pb-16 pt-10 animate-fade-in">
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> / <span>Write for us</span>
      </nav>
      <h1 className="text-3xl font-bold text-[#111827] mb-3">Write for iGamingUbuntu</h1>
      <p className="text-gray-600 mb-8">
        iGamingUbuntu covers betting and casino regulation, payments and licensing across Africa. We accept a small number of
        outside contributions from people with real expertise: regulators&apos; advisers, lawyers, operators, suppliers,
        payment specialists, researchers and journalists.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">What we are looking for</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">{WANTED.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-3">Our standards</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">{RULES.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-[#111827] mb-2">Links and credit</h2>
        <p className="text-sm text-gray-600">
          Contributors are credited by name and role. You may link to your organisation and to your own relevant work where it
          helps the reader. Links in a piece that is paid for or promotes a commercial relationship are marked
          rel=&quot;sponsored&quot;, in line with Google&apos;s guidance. We do not sell editorial links. Paid options are on our{" "}
          <Link href="/advertise" className="text-[#409824] hover:underline">advertise page</Link>.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h2 className="text-lg font-bold text-[#111827] mb-2">Pitch an idea</h2>
        <p className="text-sm text-gray-600 mb-4">
          Send a headline, three lines on the angle, your sources and a short bio. Use the contact form (choose Industry News &amp; Press Releases) or write to{" "}
          <a href="mailto:info@igamingubuntu.com" className="text-[#409824] hover:underline">info@igamingubuntu.com</a>.
          Read our <Link href="/editorial-policy" className="text-[#409824] hover:underline">editorial policy</Link> first.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f59e0b] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#f59e0b]/90 transition">
          Pitch a piece
        </Link>
      </section>
    </div>
  )
}
