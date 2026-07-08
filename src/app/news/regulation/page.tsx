import Link from "next/link"
import AdSlot from "@/components/AdSlot"

export default function RegulationWatchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80" alt="Regulation Watch" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Regulation Watch</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Regulatory changes and compliance updates across African markets.</p>
        </div>
      </div>
      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />
      <div className="bg-card rounded-xl p-8 text-center">
        <p className="text-text-secondary">Content coming soon.</p>
      </div>
    </div>
  )
}
