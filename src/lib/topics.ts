/**
 * Topic hubs: curated landing pages that gather related coverage across our
 * sections (regulation, industry, payments, guides) without moving any article
 * URL. A hub exists only while it has enough real articles (MIN_ARTICLES), so
 * we never publish an empty or near-empty page.
 */
export interface Topic {
  slug: string
  title: string
  seoTitle: string
  description: string
  intro: string
  /** An article belongs to the hub when any pattern is found in its slug. */
  slugPatterns: string[]
  related: { label: string; href: string }[]
}

export const MIN_TOPIC_ARTICLES = 4

export const TOPICS: Topic[] = [
  {
    slug: "uganda",
    title: "Uganda Gambling Regulation and Betting",
    seoTitle: "Uganda Gambling Regulation: Licences, Tax and Payments",
    description:
      "Our coverage of gambling regulation in Uganda: licensing and renewals, enforcement, mobile-money payments and the NLGRB, collected in one place.",
    intro:
      "Uganda's gambling market is overseen by the National Lotteries and Gaming Regulatory Board (NLGRB). This page collects our reporting on licensing, renewals, enforcement and mobile-money payments in Uganda. Each article links to the regulator or source it relies on.",
    slugPatterns: ["uganda", "nlgrb"],
    related: [
      { label: "African gambling regulators directory", href: "/regulators" },
      { label: "Regulation news", href: "/news/regulation" },
      { label: "Payments coverage", href: "/casinos/payments" },
    ],
  },
  {
    slug: "prediction-markets",
    title: "Prediction Markets in Africa",
    seoTitle: "Prediction Markets in Africa: Legality and Licensing",
    description:
      "Are prediction markets gambling, and where are they legal in Africa? Our guides and regulation reporting on Kenya, Liberia and the wider continent.",
    intro:
      "Prediction markets sit between trading and betting, and African regulators are only starting to say which side they fall on. This page gathers our guides and regulatory reporting so you can follow how individual countries treat them.",
    slugPatterns: ["prediction-market"],
    related: [
      { label: "Guides", href: "/guides" },
      { label: "Regulation news", href: "/news/regulation" },
    ],
  },
  {
    slug: "national-lotteries",
    title: "National Lotteries in Africa",
    seoTitle: "National Lotteries in Africa: Launches and Regulation",
    description:
      "National lottery launches, governance and player protections across Africa, including Kenya, Rwanda and Senegal, from our regulation and industry desks.",
    intro:
      "Several African governments are launching or restructuring national lotteries. This page collects our reporting on lottery launches, governance and player protections, and the rules that sit around them.",
    slugPatterns: ["lotter"],
    related: [
      { label: "African gambling regulators directory", href: "/regulators" },
      { label: "Regulation news", href: "/news/regulation" },
    ],
  },
]

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug)
}
