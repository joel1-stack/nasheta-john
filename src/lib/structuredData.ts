import { SITE_URL } from "@/lib/site"

export interface FaqItem {
  question: string
  answer: string
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Question-style H2/H3 headings ("...?") with the paragraphs that follow them,
 * up to the next heading. Only real Q&A blocks become FAQ schema.
 */
export function extractFaqs(html: string, max = 10): FaqItem[] {
  if (!html) return []
  const faqs: FaqItem[] = []
  const heading = /<h([23])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[1-6][^>]*>|$)/gi
  let m: RegExpExecArray | null
  while ((m = heading.exec(html)) && faqs.length < max) {
    const question = stripTags(m[2])
    if (!question.endsWith("?")) continue
    const paragraphs = m[3].match(/<p[^>]*>[\s\S]*?<\/p>/gi) || []
    const answer = stripTags(paragraphs.join(" "))
    if (answer.length >= 20) faqs.push({ question, answer })
  }
  return faqs
}

export function faqPageLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

/**
 * The newsroom as Person entities.
 *
 * Gambling regulation is money-and-law territory, where Google weighs who is
 * doing the writing. Naming the people, their role and their profiles gives
 * the bylines on every article something to resolve to.
 */
export function teamProfileLd(
  members: { name: string; role: string; photo: string; shortBio: string; links?: { href: string }[] }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/editorial-team`,
    url: `${SITE_URL}/editorial-team`,
    name: "Meet our team",
    about: {
      "@type": "Organization",
      name: "iGamingUbuntu",
      url: SITE_URL,
      employee: members.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        image: `${SITE_URL}${m.photo}`,
        description: m.shortBio,
        worksFor: { "@type": "Organization", name: "iGamingUbuntu", url: SITE_URL },
        ...(m.links && m.links.length
          ? { sameAs: m.links.map((l) => l.href) }
          : {}),
      })),
    },
  }
}

/**
 * Marks the headline and standfirst as the part worth reading aloud, for voice
 * results and assistant answers. The selectors below must stay on those
 * elements in ArticleView.
 */
export const speakableSpec = {
  "@type": "SpeakableSpecification",
  cssSelector: [".speakable-headline", ".speakable-summary"],
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path.startsWith("http") ? it.path : `${SITE_URL}${it.path}`,
    })),
  }
}
