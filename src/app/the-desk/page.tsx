import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Desk: Latest Industry News from iGamingUbuntu",
  description:
    "The latest industry news from iGamingUbuntu, with what we cover, how we report and where to find our editorial policy.",
  alternates: { canonical: "/the-desk" },
}

export default function TheDeskPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="The Desk"
        description="Our latest industry news, and how we report on gambling in Africa."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Desk" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-bold text-[#111827] mb-4">About The Desk</h2>
        <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            iGamingUbuntu is an independent publication on gambling in Africa. The Desk lists our latest industry news.
            Regulatory stories have their own section, <Link href="/news/regulation" className="text-[#409824] hover:underline">Regulation Watch</Link>.
          </p>
          <p>
            Most of what we publish is regulation and industry news: licensing, taxes, court rulings, regulator notices,
            payments and operator developments. We also publish guides, a <Link href="/regulators" className="text-[#409824] hover:underline">directory of regulators</Link>,
            a <Link href="/directory/crash-games" className="text-[#409824] hover:underline">crash games directory</Link> and
            country pages for <Link href="/countries" className="text-[#409824] hover:underline">each market we follow</Link>.
            We have published one casino review so far, the <Link href="/casinos/ace-lucky-casino-review" className="text-[#409824] hover:underline">Ace Lucky Casino review</Link>.
          </p>
          <p>
            How we source, review and correct is set out in our <Link href="/editorial-policy" className="text-[#409824] hover:underline">editorial policy</Link>,
            our <Link href="/how-we-review" className="text-[#409824] hover:underline">review method</Link> and our{" "}
            <Link href="/corrections" className="text-[#409824] hover:underline">corrections page</Link>.
          </p>
          <p>
            Want to reach our readers? See our <Link href="/advertise" className="text-[#f59e0b] font-medium hover:underline">advertising options</Link>.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">From Our Desk</h2>
      <CategoryArticleList category={["Industry News", "Partnership", "Integrity"]} />
    </div>
  )
}
