import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import SectionHeader from "@/components/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Press Releases from iGaming Operators",
  description:
    "Official press releases submitted by licensed operators and industry stakeholders. Submit your announcements to the iGamingUbuntu editorial team for review.",
  alternates: { canonical: "/press" },
}

export default function PressReleasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Press Releases"
        description="Official press releases submitted by operators and industry stakeholders."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Press Releases" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-[#111827] mb-3">Submit a Press Release</h2>
          <p className="text-gray-500 mb-6">
            iGamingUbuntu accepts press releases from licensed operators, iGaming platforms,
            and industry stakeholders. Send your announcements to our editorial team for review.
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
