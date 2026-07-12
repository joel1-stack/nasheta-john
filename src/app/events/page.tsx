import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function EventsPage() {
  const subs = [
    { title: "Upcoming Events", href: "/events/upcoming", desc: "Conferences, summits and industry meetups" },
    { title: "Event Recaps", href: "/events/recaps", desc: "Highlights and key takeaways from past events" },
    { title: "Webinars & Panels", href: "/events/webinars", desc: "Expert discussions and panels on demand" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/full backgound.png" alt="Events" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Events</h1>
          <p className="text-white/80 mt-1 max-w-2xl">iGaming conferences, summits, webinars, and industry meetups across Africa.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {subs.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-border rounded-xl p-4 hover:shadow-md hover:border-ubuntu-orange/30 transition-all group">
            <h3 className="font-semibold text-text-primary group-hover:text-ubuntu-orange transition">{s.title}</h3>
            <p className="text-sm text-text-secondary mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Event Coverage</h2>
      <CategoryArticleList category="Events" />
    </div>
  )
}
