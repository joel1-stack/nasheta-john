import Link from "next/link"
import AdSlot from "./AdSlot"
import { formatDate } from "@/lib/utils"
import { MOST_READ_MIN_ARTICLES, SHOW_MOST_READ } from "@/lib/site"
import type { Article } from "@/types"

interface SidebarProps {
  recent?: Article[]
  popularPosts?: Article[]
}

function SideTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 mb-4">
      <h3 className="inline-block bg-[#16A34A] text-white text-sm font-semibold px-3 py-1.5">{children}</h3>
    </div>
  )
}

/** Article sidebar: banner, Recent Stories, and Most Read once real readership exists. */
export default function Sidebar({ recent = [], popularPosts = [] }: SidebarProps) {
  return (
    <aside className="space-y-8">
      <AdSlot position="sidebar-1" />

      {recent.length > 0 && (
        <div>
          <SideTitle>Recent Stories</SideTitle>
          <div className="space-y-4">
            {recent.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group items-start">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    width={96}
                    height={64}
                    loading="lazy"
                    className="w-24 h-16 object-cover shrink-0"
                  />
                ) : (
                  <div className="w-24 h-16 shrink-0 bg-gray-200" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1A1F2B] group-hover:text-[#16A34A] transition-colors line-clamp-3 leading-snug">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(post.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ranked by real view counts, which are never shown to readers. Off
          until there is enough readership for the ranking to mean something. */}
      {SHOW_MOST_READ && popularPosts.length >= MOST_READ_MIN_ARTICLES && (
        <div>
          <SideTitle>Most Read</SideTitle>
          <ol className="border-l border-gray-200 ml-1 space-y-4">
            {popularPosts.slice(0, 5).map((post) => (
              <li key={post.slug} className="relative pl-4">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300" aria-hidden="true" />
                <p className="text-[11px] text-gray-500">{formatDate(post.createdAt)}</p>
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#1A1F2B] hover:text-[#16A34A] transition-colors leading-snug">
                  {post.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      <AdSlot position="sidebar-2" />
    </aside>
  )
}
