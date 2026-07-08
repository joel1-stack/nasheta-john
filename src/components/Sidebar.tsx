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
        <div className="bg-white rounded-xl border border-border p-5 animate-fade-up">
          <h3 className="font-bold text-text-primary mb-4 pb-3 border-b border-border flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            Most Read
          </h3>
          <div className="space-y-4">
            {popularPosts.slice(0, 5).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                <span className="text-gold font-bold text-lg w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary group-hover:text-ubuntu-orange transition-colors line-clamp-2">{post.title}</p>
                  <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
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

      <div className="bg-white rounded-xl border border-border p-5">
        <h3 className="font-bold text-text-primary mb-4 pb-3 border-b border-border">Explore</h3>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-ubuntu-orange hover:bg-ubuntu-orange/5 px-3 py-2 rounded-lg transition-all">
              {["kenya", "nigeria", "south-africa", "ghana", "tanzania"].includes(cat.slug) ? (
                <img src={getFlagUrl(cat.slug)} alt="" className="w-5 h-3.5 rounded object-cover" />
              ) : (
                <svg className="w-4 h-4 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
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
