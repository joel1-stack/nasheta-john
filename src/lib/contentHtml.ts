const BLOCK_TAG = /<\/?(?:h[1-6]|p|ul|ol|blockquote|pre|hr|table|figure|div)\b[^>]*>/gi
const CONTAINER_TAGS = new Set(["p", "ul", "ol", "pre", "h1", "h2", "h3", "h4", "h5", "h6"])

function wrapParagraphs(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((piece) => piece.trim())
    .filter(Boolean)
    .map((piece) => `<p>${piece.replace(/\n/g, " ")}</p>`)
    .join("")
}

function ensureImgAlt(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (full, attrs: string) => {
    if (/\balt\s*=/i.test(attrs)) return full
    return `<img${attrs.replace(/\s*\/\s*$/, "")} alt="">`
  })
}

function normalizeHeading(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function demoteH1(html: string): string {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, (_m, attrs?: string) => `<h2${attrs || ""}>`)
    .replace(/<\/h1>/gi, "</h2>")
}

/**
 * Adds rel="sponsored noopener" (and target="_blank") to every external link.
 * Applied to articles marked "sponsored" or "press-release" so paid links are
 * always disclosed to Google, without the editor having to touch each link.
 */
export function withSponsoredLinks(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (full, attrs: string) => {
    const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
    const href = hrefMatch ? hrefMatch[1] ?? hrefMatch[2] ?? hrefMatch[3] ?? "" : ""
    if (!/^https?:\/\//i.test(href)) return full

    const cleaned = attrs
      .replace(/\s*\brel\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s*\btarget\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+$/, "")

    return `<a${cleaned} rel="sponsored noopener" target="_blank">`
  })
}

export interface ArticleHtmlOptions {
  /** Heading text to drop if it duplicates the <h1> rendered by the template. */
  dropLeadingHeading?: string
  /** True for sponsored / press-release articles. */
  sponsored?: boolean
}

/** Final preparation of CMS article HTML before it is rendered. */
/** Articles moved from /blog/<slug> to /news/<slug>; point old in-text links straight there. */
export function withNewsLinks(html: string): string {
  return html.replace(/href=(["'])(https?:\/\/(?:www\.)?igamingubuntu\.com)?\/blog\//gi, "href=$1$2/news/")
}

export function finalizeArticleHtml(html: string, options: ArticleHtmlOptions = {}): string {
  const out = withNewsLinks(withParagraphs(html || "", options.dropLeadingHeading))
  return options.sponsored ? withSponsoredLinks(out) : out
}

export function withParagraphs(html: string, dropLeadingHeading?: string): string {
  if (!html || !html.trim()) return html || ""

  let out = ""
  let last = 0
  let depth = 0
  BLOCK_TAG.lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = BLOCK_TAG.exec(html)) !== null) {
    const segment = html.slice(last, match.index)
    out += depth === 0 ? wrapParagraphs(segment) : segment
    out += match[0]

    const nameMatch = match[0].toLowerCase().match(/<\/?([a-z0-9]+)/)
    const name = nameMatch ? nameMatch[1] : ""
    if (CONTAINER_TAGS.has(name)) {
      if (match[0].startsWith("</")) depth = Math.max(0, depth - 1)
      else depth += 1
    }
    last = match.index + match[0].length
  }

  const tail = html.slice(last)
  out += depth === 0 ? wrapParagraphs(tail) : tail
  out = ensureImgAlt(out)

  if (dropLeadingHeading) {
    const wanted = normalizeHeading(dropLeadingHeading)
    out = out.replace(
      /^\s*<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i,
      (full, inner: string) => (normalizeHeading(inner) === wanted ? "" : full)
    )
  }
  return demoteH1(out)
}

/** A piece of article HTML, optionally followed by a banner slot. */
export interface BodyPart {
  html: string
  adAfter?: "in-content-1" | "in-content-2" | "in-content-3"
}

const CONTAINER_TAG = /<(\/?)(p|blockquote|ul|ol|table|figure|div)\b[^>]*>/gi
const END_MATTER_HEADING = /<h[2-4][^>]*>\s*(?:related reading|sources?|read also)\b[^<]*<\/h[2-4]>/i
const RELATED_HEADING = /<h[2-4][^>]*>\s*related reading\b[^<]*<\/h[2-4]>/i

/**
 * Splits article HTML at top-level block boundaries so banners can sit
 * between paragraphs: after the 2nd paragraph, before the story's last
 * paragraph, and after the "Related reading" list (or at the end).
 * Short stories get fewer slots so ads never crowd the text.
 */
export function splitForAds(html: string): BodyPart[] {
  // Top-level paragraphs: [start, end) offsets, ignoring <p> inside quotes, lists, tables.
  const paragraphs: [number, number][] = []
  let depth = 0
  let openP = -1
  CONTAINER_TAG.lastIndex = 0
  for (let m = CONTAINER_TAG.exec(html); m; m = CONTAINER_TAG.exec(html)) {
    const closing = m[1] === "/"
    const tag = m[2].toLowerCase()
    if (tag === "p") {
      if (!closing && depth === 0) openP = m.index
      if (closing && depth === 0 && openP >= 0) {
        paragraphs.push([openP, m.index + m[0].length])
        openP = -1
      }
    } else {
      depth += closing ? -1 : 1
      if (depth < 0) depth = 0
    }
  }

  const endMatter = html.search(END_MATTER_HEADING)
  const storyEnd = endMatter >= 0 ? endMatter : html.length
  const story = paragraphs.filter(([, end]) => end <= storyEnd)

  const cuts: { at: number; slot: NonNullable<BodyPart["adAfter"]> }[] = []
  if (story.length >= 4) cuts.push({ at: story[1][1], slot: "in-content-1" })
  if (story.length >= 7) cuts.push({ at: story[story.length - 1][0], slot: "in-content-2" })

  const related = html.search(RELATED_HEADING)
  if (related >= 0) {
    const listEnd = html.slice(related).search(/<\/(ul|ol)>/i)
    if (listEnd >= 0) {
      const at = related + listEnd + html.slice(related + listEnd).indexOf(">") + 1
      cuts.push({ at, slot: "in-content-3" })
    }
  }
  if (!cuts.some((c) => c.slot === "in-content-3")) cuts.push({ at: html.length, slot: "in-content-3" })

  cuts.sort((a, b) => a.at - b.at)
  const parts: BodyPart[] = []
  let from = 0
  for (const cut of cuts) {
    if (cut.at < from) continue
    parts.push({ html: html.slice(from, cut.at), adAfter: cut.slot })
    from = cut.at
  }
  parts.push({ html: html.slice(from) })
  return parts.filter((p) => p.html.trim() || p.adAfter)
}
