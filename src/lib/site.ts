/**
 * Central site constants.
 * Keep the canonical host in one place so canonicals, sitemaps and
 * structured data cannot drift apart.
 */
export const SITE_URL = "https://www.igamingubuntu.com"
export const SITE_NAME = "iGamingUbuntu"
export const SITE_TAGLINE = "iGamingUbuntu — The Pulse of African iGaming Business"

/**
 * Fixed lastmod date for static (non-article) pages.
 * Bump this only when the static page copy actually changes, so the
 * sitemap stops claiming every URL changed on every deploy.
 */
export const STATIC_PAGE_LASTMOD = "2026-10-23"

/**
 * Demo / seed blog posts that used to be hardcoded in the codebase.
 * They are deleted from code and 301-redirected to the homepage.
 * Kept here so the redirect list and the sitemap filters stay in sync.
 */
export const REMOVED_DEMO_SLUGS = [
  "world-cup-2026-betting-guide",
  "top-5-online-casinos-kenya-2026",
  "sportpesa-welcome-bonus-2026",
  "nigeria-ghana-predictions-2026",
  "african-esports-betting-guide-2026",
  "behind-the-desk-igaming-content",
  "sa-gambling-rules-2026",
  "best-mobile-betting-apps-kenya-2026",
  "argentina-vs-egypt-world-cup-2026",
  "ghana-igaming-conference-2026",
] as const

export const REMOVED_DEMO_SLUG_SET = new Set<string>(REMOVED_DEMO_SLUGS)

/** Article statuses that are publicly visible. */
export const PUBLIC_ARTICLE_STATUSES = ["published", "sponsored", "press-release"] as const

/**
 * "Most Read" sidebar block.
 *
 * Off on request: the sidebar previously listed sample articles with invented
 * view counts. Real view counts are now tracked server-side (see
 * /api/track-view), so flip this to true once a few articles have genuine
 * traffic — the block also requires at least 3 articles with real reads.
 */
export const SHOW_MOST_READ = false

/** Minimum number of articles with real reads before "Most Read" appears. */
export const MOST_READ_MIN_ARTICLES = 3

export function isPublicStatus(status?: string | null): boolean {
  return !!status && (PUBLIC_ARTICLE_STATUSES as readonly string[]).includes(status)
}

/**
 * Scheduled articles go live by themselves: once scheduledAt has passed they
 * are treated as published (no timer job needed). Returns the article as
 * readers should see it, dated to its publish time, or null if not public.
 */
export function asLiveArticle<T extends { status?: string | null; scheduledAt?: string; createdAt?: string }>(
  article: T,
  now = Date.now(),
): T | null {
  if (isPublicStatus(article.status)) return article
  if (article.status === "scheduled" && article.scheduledAt) {
    const at = Date.parse(article.scheduledAt)
    if (!Number.isNaN(at) && at <= now) {
      return { ...article, status: "published", createdAt: article.scheduledAt.slice(0, 10) }
    }
  }
  return null
}

export function isSponsoredStatus(status?: string | null): boolean {
  return status === "sponsored" || status === "press-release"
}

/** Absolute URL for a path, guarding against double slashes. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
