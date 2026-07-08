import Link from "next/link"
import AdSlot from "@/components/AdSlot"

export default function PressReleasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=80" alt="Press Releases" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Press Releases</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Official press releases submitted by operators and industry stakeholders.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="bg-card rounded-xl p-8 md:p-12 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-text-primary mb-3">Submit a Press Release</h2>
          <p className="text-text-secondary mb-6">
            iGamingUbuntu accepts press releases from licensed operators, iGaming platforms,
            and industry stakeholders. Send your announcements to our editorial team for review.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-ubuntu-orange text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-ubuntu-orange/90 transition"
          >
            Submit Your Press Release
          </Link>
        </div>
      </div>
    </div>
  )
}
