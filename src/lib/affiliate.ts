/**
 * Pure helpers for the /go/<slug> affiliate redirect, kept free of Firebase
 * and Next imports so they can be tested on their own
 * (scripts/test-affiliate.mjs).
 */

/** Campaign slugs are short ids: letters, digits, dashes and underscores. */
export const SLUG_PATTERN = /^[a-z0-9][a-z0-9_-]{0,63}$/i

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug || "")
}

/**
 * Tracking parameters a visitor's /go/ link may carry through to the partner.
 * Anything else is dropped so a crafted link cannot inject arbitrary query
 * parameters into a partner URL.
 */
const PASS_THROUGH = [/^utm_[a-z0-9_]+$/i, /^sub_?id\d*$/i, /^click_?id$/i, /^sid$/i, /^aff_?sub\d*$/i, /^campaign$/i]

export function isTrackingParam(name: string): boolean {
  return PASS_THROUGH.some((re) => re.test(name))
}

/**
 * The partner URL for a click: the configured destination with the visitor's
 * tracking parameters added. Parameters already on the configured URL (the
 * partner's own affiliate id, for example) are never overwritten, existing
 * encoding is kept, and only http(s) destinations are accepted.
 * Returns null when the configured destination is not a valid absolute URL.
 */
export function buildDestination(configured: string, incoming?: URLSearchParams | null): URL | null {
  let url: URL
  try {
    url = new URL(String(configured || "").trim())
  } catch {
    return null
  }
  if (!/^https?:$/.test(url.protocol)) return null

  if (incoming) {
    for (const [name, value] of incoming) {
      if (!isTrackingParam(name) || url.searchParams.has(name)) continue
      url.searchParams.append(name, value.slice(0, 200))
    }
  }
  return url
}
