import AdSlot from "./AdSlot"
import Newsletter from "./Newsletter"
import Link from "next/link"
import type { Article } from "@/types"

interface SidebarProps {
  popularPosts?: Article[]
}

function getFlagUrl(slug: string): string {
  const map: Record<string, string> = {
    kenya: "ke", nigeria: "ng", "south-africa": "za",
    ghana: "gh", tanzania: "tz",
  }
  return `https://flagcdn.com/20x15/${map[slug] || slug}.png`
}

const categories = [
  { name: "Kenya", slug: "kenya" },
  { name: "Nigeria", slug: "nigeria" },
  { name: "South Africa", slug: "south-africa" },
  { name: "Ghana", slug: "ghana" },
  { name: "Tanzania", slug: "tanzania" },
  { name: "Casino Reviews", slug: "reviews" },
  { name: "Sports Betting", slug: "blog" },
  { name: "Tips & Guides", slug: "guides" },
]

export default function Sidebar({ popularPosts }: SidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <AdSlot position="sidebar-1" />

      {popularPosts && popularPosts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-fade-up shadow-sm">
          <h3 className="font-bold text-[#111827] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#f59e0b] rounded-full inline-block" />
            Most Read
          </h3>
          <div className="space-y-4">
            {popularPosts.slice(0, 5).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                <span className="text-[#f59e0b] font-bold text-lg w-7 shrink-0 leading-none">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] group-hover:text-[#f59e0b] transition-colors line-clamp-2">{post.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>· {post.readTime} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdSlot position="sidebar-2" />

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-bold text-[#111827] mb-4 pb-3 border-b border-gray-100">Explore</h3>
        <div className="grid grid-cols-1 gap-1">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#111827] hover:bg-gray-50 px-3 py-2 rounded-lg transition-all">
              {["kenya", "nigeria", "south-africa", "ghana", "tanzania"].includes(cat.slug) ? (
                <img src={getFlagUrl(cat.slug)} alt="" className="w-5 h-3.5 rounded object-cover" />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-xs bg-amber-50 text-[#f59e0b] rounded">◆</span>
              )}
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <Newsletter />
    </aside>
  )
}
