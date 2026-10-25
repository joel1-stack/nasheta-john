/**
 * GA4 / GTM configuration and helpers.
 *
 * Two problems this file solves:
 *  1. Double counting — GA4 is loaded once, from here, and page views are sent
 *     explicitly (send_page_view: false on the config call). If the GTM
 *     container also has a GA4 Configuration tag, that tag must be paused in
 *     GTM, or set NEXT_PUBLIC_GA4_OWNER=gtm so this loader stays out of the way
 *     and only the dataLayer is used.
 *  2. Owner traffic — the CMS sets a long-lived `igub_internal=1` cookie and
 *     every GA4 hit then carries traffic_type: "internal". CMS pages never
 *     load GA4 at all.
 */

export const GA4_MEASUREMENT_ID = "G-6VTKQHDR04"
export const GTM_CONTAINER_ID = "GTM-TB8Q2LLT"
export const CMS_PATH_PREFIX = "/igub-cms-x7k9"
export const INTERNAL_COOKIE_NAME = "igub_internal"
export const INTERNAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

/** "code" = this app loads gtag.js. "gtm" = the GTM container owns GA4. */
export const GA4_OWNER: "code" | "gtm" =
  process.env.NEXT_PUBLIC_GA4_OWNER === "gtm" ? "gtm" : "code"

type GtagArgs = unknown[]

declare global {
  interface Window {
    dataLayer?: GtagArgs[]
    gtag?: (...args: GtagArgs) => void
    __igubGa4ScriptRequested?: boolean
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

/** True for every CMS route, including nested dashboard pages. */
export function isCmsPath(pathname?: string | null): boolean {
  if (!pathname) return false
  return pathname === CMS_PATH_PREFIX || pathname.startsWith(`${CMS_PATH_PREFIX}/`)
}

/** Creates the standard gtag() dataLayer shim so calls can be queued early. */
export function ensureGtag(): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as GtagArgs)
    }
  }
}

export function hasInternalCookie(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .some((c) => c === `${INTERNAL_COOKIE_NAME}=1`)
}

/** Called after a successful CMS login. Long-lived, first-party, SameSite=Lax. */
export function setInternalCookie(): void {
  if (typeof document === "undefined") return
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${INTERNAL_COOKIE_NAME}=1; path=/; max-age=${INTERNAL_COOKIE_MAX_AGE}; SameSite=Lax${secure}`
}

export function clearInternalCookie(): void {
  if (typeof document === "undefined") return
  document.cookie = `${INTERNAL_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
}

/** Loads the GA4 library exactly once per page load. */
export function loadGa4Script(): void {
  if (typeof window === "undefined" || GA4_OWNER !== "code") return
  if (window.__igubGa4ScriptRequested) return
  window.__igubGa4ScriptRequested = true
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

/**
 * Sends an event to GA4. Works before the library has finished loading
 * because gtag() queues into dataLayer.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return
  ensureGtag()
  const internal = hasInternalCookie()
  window.gtag!(
    "event",
    name,
    internal ? { ...params, traffic_type: "internal" } : params
  )
}

export type LeadFormName =
  | "contact"
  | "newsletter"
  | "advertise"
  | "quote"
  | "media-kit"

/** GA4 recommended event for a submitted form. */
export function trackLead(formName: LeadFormName, extra: Record<string, unknown> = {}): void {
  trackEvent("generate_lead", { form_name: formName, ...extra })
}
