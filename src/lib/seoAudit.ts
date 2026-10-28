import type { Article } from "@/types"

/**
 * In-house SEO check for one article. It mirrors the site's own rules
 * (title 30–65 chars and no colon, meta 70–160, ≤700 words house style)
 * plus common on-page basics. Scores are a guide, not a Google ranking.
 */

export interface SeoCheck {
  id: string
  label: string
  /** How a failure is described to the editor ("Colon in title"). */
  problem: string
  /** Points this check is worth. */
  weight: number
  pass: boolean
}

export interface SeoResult {
  score: number
  checks: SeoCheck[]
  failed: SeoCheck[]
  words: number
}

export function wordCount(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ")
  return text.split(/\s+/).filter(Boolean).length
}

export function auditArticle(a: Article): SeoResult {
  const title = (a.seoTitle || a.title || "").trim()
  const meta = (a.metaDescription || "").trim()
  const html = a.content || ""
  const words = wordCount(html)

  const checks: SeoCheck[] = [
    { id: "title-length", label: "Title 30–65 characters", problem: "Title not 30–65 characters", weight: 15, pass: title.length >= 30 && title.length <= 65 },
    { id: "title-colon", label: "No colon in the title", problem: "Colon in title", weight: 5, pass: !!title && !title.includes(":") },
    { id: "meta", label: "Meta description 70–160 characters", problem: "Meta description not 70–160", weight: 20, pass: meta.length >= 70 && meta.length <= 160 },
    { id: "image", label: "Featured image", problem: "No featured image", weight: 10, pass: !!a.featuredImage },
    { id: "image-alt", label: "Image alt text", problem: "No image alt text", weight: 5, pass: !!a.featuredImage && !!(a.featuredImageAlt || "").trim() },
    { id: "excerpt", label: "Summary of 80+ characters", problem: "Summary under 80 characters", weight: 10, pass: (a.excerpt || "").length >= 80 },
    { id: "length", label: "300–700 words", problem: "Not 300–700 words", weight: 10, pass: words >= 300 && words <= 700 },
    { id: "headings", label: "Uses H2 subheadings", problem: "No H2 subheadings", weight: 5, pass: /<h2[\s>]/i.test(html) },
    { id: "internal-link", label: "Links to another iGUB article", problem: "No link to another iGUB article", weight: 10, pass: /href=["'](?:https?:\/\/(?:www\.)?igamingubuntu\.com)?\/(?:blog|news)\//i.test(html) },
    { id: "source-link", label: "Links to an outside source", problem: "No outside source link", weight: 5, pass: /href=["']https?:\/\/(?!(?:www\.)?igamingubuntu\.com)/i.test(html) },
    { id: "tags", label: "Has tags", problem: "No tags", weight: 5, pass: (a.tags || []).length > 0 },
  ]

  let score = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0)
  if (a.noindex) score -= 30
  score = Math.max(0, Math.min(100, score))
  return { score, checks, failed: checks.filter((c) => !c.pass), words }
}
