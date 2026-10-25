"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import {
  GA4_MEASUREMENT_ID,
  GA4_OWNER,
  ensureGtag,
  hasInternalCookie,
  isCmsPath,
  loadGa4Script,
} from "@/lib/analytics"

const DISABLE_FLAG = `ga-disable-${GA4_MEASUREMENT_ID}`

/**
 * Single GA4 loader for the public site.
 *
 * - Never loads or sends anything on /igub-cms-x7k9 (ga-disable is also set,
 *   so a navigation from the public site into the CMS stops hits immediately).
 * - Sends exactly one page_view per navigation (send_page_view is disabled on
 *   the config call), which avoids the classic double count.
 * - Adds traffic_type: "internal" to every hit when the igub_internal cookie
 *   set by the CMS is present.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname() || "/"
  const initialised = useRef(false)
  const lastTracked = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    if (isCmsPath(pathname)) {
      // Stop any hits in a browser that already loaded GA4 on the public site.
      window[DISABLE_FLAG] = true
      return
    }
    window[DISABLE_FLAG] = false

    if (GA4_OWNER !== "code") return

    if (!initialised.current) {
      initialised.current = true
      ensureGtag()
      loadGa4Script()

      const internal = hasInternalCookie()
      if (internal) {
        window.gtag!("set", "traffic_type", "internal")
        window.gtag!("set", { user_properties: { traffic_type: "internal" } })
      }

      window.gtag!("js", new Date())
      window.gtag!("config", GA4_MEASUREMENT_ID, {
        send_page_view: false,
        ...(internal ? { traffic_type: "internal" } : {}),
      })
    }

    if (lastTracked.current === pathname) return
    lastTracked.current = pathname

    const internal = hasInternalCookie()
    window.gtag!("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      ...(internal ? { traffic_type: "internal" } : {}),
    })
  }, [pathname])

  // The GTM container is loaded from the root layout. It must not also contain
  // a GA4 Configuration tag for G-6VTKQHDR04 (see docs/analytics.md).
  return null
}
