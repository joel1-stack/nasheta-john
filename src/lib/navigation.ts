/** Stories on the homepage (3 top + 5 latest); /page/2 starts after them. */
export const HOME_STORY_COUNT = 8

/**
 * The site menu, shared by the navbar and the footer.
 * Items with `children` open a sub-menu on hover.
 */
export interface NavLink {
  label: string
  href: string
  desc?: string
  children?: NavLink[]
}

export const NEWS_LINKS: NavLink[] = [
  { label: "Industry News", href: "/news/industry", desc: "Latest developments across African iGaming markets" },
  { label: "Regulation Watch", href: "/news/regulation", desc: "Regulatory changes and compliance updates" },
  { label: "Press Releases", href: "/press", desc: "Submitted releases and partner announcements" },
]

export const DIRECTORY_LINKS: NavLink[] = [
  {
    label: "Sports Betting",
    href: "/sports",
    desc: "Betting guides, tips and market coverage",
    children: [
      { label: "Live Events", href: "/sports/live", desc: "Real-time odds, in-play betting and match coverage" },
      { label: "Predictions & Tips", href: "/sports/predictions", desc: "Expert match predictions and betting tips" },
      { label: "League Guides", href: "/sports/leagues", desc: "Premier League, La Liga, EPL and more" },
      { label: "Betting Explained", href: "/sports/basics", desc: "Beginner-friendly guides to betting fundamentals" },
    ],
  },
  {
    label: "Casino Reviews",
    href: "/reviews",
    desc: "Reviews of betting sites and online casinos",
    children: [
      { label: "New Casinos", href: "/casinos/new", desc: "Recently launched operators reviewed" },
      { label: "Best Casinos", href: "/casinos/best", desc: "Top-rated casinos by our expert team" },
      { label: "Mobile Casinos", href: "/casinos/mobile", desc: "Optimised for mobile betting on the go" },
      { label: "Payment Methods", href: "/casinos/payments", desc: "M-Pesa, Airtel, Bank Transfer and more" },
      { label: "By Market", href: "/casinos/market", desc: "Filter by Kenya, Nigeria, SA, Ghana, Global" },
    ],
  },
  { label: "Betting Guides", href: "/guides", desc: "Country guides to licences, taxes and payments" },
]

export const EVENTS_LINKS: NavLink[] = [
  { label: "Upcoming Events", href: "/events/upcoming", desc: "Conferences, summits and industry meetups" },
  { label: "Event Recaps", href: "/events/recaps", desc: "Highlights and key takeaways from past events" },
  { label: "Webinars & Panels", href: "/events/webinars", desc: "Expert discussions and panels on demand" },
]

/** Section page an article's breadcrumb points to, by CMS category. */
export function categoryHub(category?: string): NavLink | null {
  const c = (category || "").trim().toLowerCase()
  if (c === "industry news") return { label: "Industry News", href: "/news/industry" }
  if (c === "regulation" || c === "regulations") return { label: "Regulation Watch", href: "/news/regulation" }
  if (c === "sports betting" || c === "betting tips") return { label: "Sports Betting", href: "/sports" }
  if (c === "casino reviews" || c === "bonuses") return { label: "Casino Reviews", href: "/reviews" }
  if (c === "payments") return { label: "Payment Methods", href: "/casinos/payments" }
  if (c === "guides") return { label: "Betting Guides", href: "/guides" }
  if (c === "events") return { label: "Events", href: "/events" }
  return null
}
