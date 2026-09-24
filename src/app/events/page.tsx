import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"
import SectionHeader from "@/components/SectionHeader"

export default function EventsPage() {
  const subs = [
    { title: "Upcoming Events", href: "/events/upcoming", desc: "Conferences, summits and industry meetups" },
    { title: "Event Recaps", href: "/events/recaps", desc: "Highlights and key takeaways from past events" },
    { title: "Webinars & Panels", href: "/events/webinars", desc: "Expert discussions and panels on demand" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Events"
        description="iGaming conferences, summits, webinars, and industry meetups across Africa."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Events" }]}
      />

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {subs.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f59e0b]/30 transition-all group">
            <h3 className="font-semibold text-[#111827] group-hover:text-[#f59e0b] transition">{s.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-6">Event Coverage</h2>
      <CategoryArticleList category="Events" />
    </div>
  )
}
