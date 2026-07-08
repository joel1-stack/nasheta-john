import AdSlot from "./AdSlot"
import Newsletter from "./Newsletter"
import Link from "next/link"
import type { Article } from "@/types"

interface SidebarProps {
  popularPosts?: Article[]
}

const categories = [
  { name: "Kenya", slug: "kenya", flag: "🇰🇪" },
  { name: "Nigeria", slug: "nigeria", flag: "🇳🇬" },
  { name: "South Africa", slug: "south-africa", flag: "🇿🇦" },
  { name: "Ghana", slug: "ghana", flag: "🇬🇭" },
  { name: "Tanzania", slug: "tanzania", flag: "🇹🇿" },
  { name: "Casino Reviews", slug: "reviews", flag: "🎰" },
  { name: "Sports Betting", slug: "guides", flag: "⚽" },
  { name: "Tips & Guides", slug: "guides", flag: "💡" },
]

export default function Sidebar({ popularPosts }: SidebarProps) {
  return (
    <aside className="space-y-8">
      <AdSlot position="sidebar-1" />

      {popularPosts && popularPosts.length > 0 && (
        <div>
          <h3 className="font-bold text-text-primary mb-4 pb-2 border-b border-border">Most Read</h3>
          <div className="space-y-3">
            {popularPosts.slice(0, 5).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                <span className="text-gold font-bold text-lg w-6 shrink-0">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium text-text-primary group-hover:text-ubuntu-orange transition line-clamp-2">{post.title}</p>
                  <p className="text-xs text-text-muted mt-1">{post.views} views</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdSlot position="sidebar-2" />

      <div>
        <h3 className="font-bold text-text-primary mb-4 pb-2 border-b border-border">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-ubuntu-orange transition">
              <span>{cat.flag}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <Newsletter />
    </aside>
  )
}
