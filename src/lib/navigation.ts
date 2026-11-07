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

/** Country pages that exist today. Add a country here when its page ships. */
export const COUNTRY_LINKS: NavLink[] = [
  { label: "Kenya", href: "/kenya" },
  { label: "Nigeria", href: "/nigeria" },
  { label: "South Africa", href: "/south-africa" },
  { label: "Ghana", href: "/ghana" },
  { label: "Tanzania", href: "/tanzania" },
]

export const NEWS_LINKS: NavLink[] = [
  { label: "Industry News", href: "/news/industry", desc: "Latest developments across African iGaming markets" },
  { label: "Regulation Watch", href: "/news/regulation", desc: "Regulatory changes and compliance updates" },
  { label: "Press Releases", href: "/press", desc: "Submitted releases and partner announcements" },
  {
    label: "Country Guides",
    href: "/countries",
    desc: "Regulation and news by market",
    children: COUNTRY_LINKS,
  },
  { label: "Regulators Directory", href: "/regulators", desc: "Official gambling regulators across Africa" },
]

export const DIRECTORY_LINKS: NavLink[] = [
  {
    label: "Sports Betting",
    href: "/sports",
    desc: "Betting guides, tips and market coverage",
  },
  {
    label: "Casinos",
    href: "/casinos",
    desc: "Casino and betting-site coverage, payments and operators",
    children: [
      { label: "Ace Lucky Casino review", href: "/casinos/ace-lucky-casino-review", desc: "Our published operator review" },
      { label: "Payment Methods", href: "/casinos/payments", desc: "M-Pesa, Airtel, bank transfer and more" },
    ],
  },
  { label: "Betting Guides", href: "/guides", desc: "Country guides to licences, taxes and payments" },
  {
    label: "Providers",
    href: "/directory/payment-providers",
    desc: "Companies serving African iGaming",
    children: [
      { label: "Payment Providers", href: "/directory/payment-providers", desc: "Payment infrastructure for African markets" },
      { label: "Lottery Providers", href: "/directory/lottery-providers", desc: "National lottery operators and bodies" },
      { label: "Platform Providers", href: "/directory/platform-providers", desc: "Sportsbook and casino platforms" },
      { label: "Game Providers", href: "/directory/game-providers", desc: "Studios and aggregators" },
    ],
  },
  {
    label: "Top Games",
    href: "/directory/crash-games",
    desc: "Game categories in African lobbies",
    children: [
      { label: "Crash Games", href: "/directory/crash-games", desc: "Titles and studios behind them" },
    ],
  },
]

/**
 * Events is a single link. The upcoming / recaps / webinars sub-pages are
 * noindexed duplicates of /events, so the menu does not send visitors there.
 */
export const EVENTS_LINK: NavLink = { label: "Events", href: "/events" }

/** Section page an article's breadcrumb points to, by CMS category. */
export function categoryHub(category?: string): NavLink | null {
  const c = (category || "").trim().toLowerCase()
  if (c === "industry news") return { label: "Industry News", href: "/news/industry" }
  if (c === "regulation" || c === "regulations") return { label: "Regulation Watch", href: "/news/regulation" }
  if (c === "sports betting" || c === "betting tips") return { label: "Sports Betting", href: "/sports" }
  if (c === "casino reviews" || c === "bonuses") return { label: "Casino Reviews", href: "/casinos" }
  if (c === "payments") return { label: "Payment Methods", href: "/casinos/payments" }
  if (c === "guides") return { label: "Betting Guides", href: "/guides" }
  if (c === "events") return { label: "Events", href: "/events" }
  // One-off CMS categories that belong with the industry coverage.
  if (c === "partnership" || c === "partnerships" || c === "integrity") return { label: "Industry News", href: "/news/industry" }
  if (c === "crash games") return { label: "Crash Games", href: "/directory/crash-games" }
  return null
}

/**
 * Where an article lives: inside its section, so the address matches the
 * breadcrumb (e.g. a casino review at /casinos/<slug>, regulation news at
 * /news/regulation/<slug>). Uncategorised stories live under /news.
 */
export const ARTICLE_SECTIONS = [
  "/news",
  "/news/industry",
  "/news/regulation",
  "/casinos",
  "/casinos/payments",
  "/sports",
  "/guides",
  "/events",
  "/directory/crash-games",
] as const

export function articleSection(category?: string): string {
  return categoryHub(category)?.href || "/news"
}

export function articlePath(article: { category?: string; slug: string }): string {
  return `${articleSection(article.category)}/${article.slug}`
}
