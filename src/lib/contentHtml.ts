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

export function withParagraphs(html: string): string {
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
  return ensureImgAlt(out)
}
