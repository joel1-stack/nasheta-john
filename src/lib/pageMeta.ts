import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site"

interface StaticPageMetaArgs {
  /** Full <title> exactly as it should appear in Google. */
  title: string
  description: string
  /** Route path, e.g. "/about". Used for the self-referencing canonical. */
  path: string
  noindex?: boolean
}

/**
 * Builds metadata for a static page: exact title, its own meta description and
 * a self-referencing canonical on https://www.igamingubuntu.com.
 */
export function staticPageMetadata({ title, description, path, noindex }: StaticPageMetaArgs): Metadata {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
