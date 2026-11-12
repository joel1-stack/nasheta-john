/**
 * Industry directories (providers and games). Every entry must be a real
 * company or product, with the official website checked on 2026-11-06 or an
 * article on this site as the source. Summaries are written in our own words
 * and say only what the company states about itself. No rankings, ratings or
 * endorsements. A directory page returns 404 while it has fewer than
 * MIN_DIRECTORY_ENTRIES entries, so we never publish a near-empty list.
 */
export interface DirectoryEntry {
  name: string
  /** Official website, when we have verified one. */
  website?: string
  /** What the company says it does, in our words. */
  summary: string
  /** One of our own articles that covers the company or market. */
  ours?: { label: string; href: string }
}

export interface DirectoryPage {
  slug: string
  title: string
  seoTitle: string
  description: string
  intro: string
  entryLabel: string
  entries: DirectoryEntry[]
  /** Our articles on this topic, listed under the directory (CMS categories). */
  coverage?: { heading: string; categories: string[] }
  /** Plain-language answers to common questions about this category. */
  faq?: { question: string; answer: string }[]
}

export const MIN_DIRECTORY_ENTRIES = 4

export const DIRECTORY_PAGES: DirectoryPage[] = [
  {
    slug: "payment-providers",
    coverage: { heading: "Our payments coverage", categories: ["Payments"] },
    title: "Payment Providers for African iGaming",
    seoTitle: "Payment Providers for African iGaming: Company Directory",
    description:
      "Payment infrastructure companies that serve African markets, with official websites. A starting list for operators comparing providers.",
    intro:
      "These companies describe themselves as payment infrastructure for African markets, and several appear among exhibitors at African gaming events. Check each provider's licences and whether it supports gambling merchants in your market before you integrate.",
    entryLabel: "Payments",
    entries: [
      { name: "Kora", website: "https://korapay.com", summary: "Pan-African payments infrastructure covering pay-ins, payouts and settlements through one integration." },
      { name: "Bitlipa", website: "https://bitlipa.com", summary: "Payments infrastructure that connects to licensed payment service providers in more than 20 African countries through a single API." },
      { name: "WeWire", website: "https://wewire.com", summary: "Business accounts and cross-border payment APIs with fiat and stablecoin settlement." },
      { name: "Dalapay", website: "https://dalapay.com", summary: "Payments company listed among exhibitors at SiGMA Africa (exhibitor list read on 31 October 2026)." },
    ],
  },
  {
    slug: "platform-providers",
    title: "Platform Providers for African Betting Operators",
    seoTitle: "Betting and Casino Platform Providers: Company Directory",
    description:
      "Sportsbook and casino platform companies that supply operators, with official websites and links to our coverage.",
    intro:
      "Platform providers supply the sportsbook, casino or back-office technology an operator runs on. The companies below describe themselves as B2B technology suppliers and are active in coverage of African markets. Confirm that a supplier is certified and accepted by the regulator in your market.",
    entryLabel: "Platforms",
    entries: [
      { name: "SOFTSWISS", website: "https://www.softswiss.com", summary: "iGaming technology provider offering casino and sportsbook software, including a game aggregator.", ours: { label: "Ghana licensing rules for SOFTSWISS-licensed operators", href: "/news/regulation/is-online-betting-legal-ghana-2026" } },
      { name: "BetConstruct", website: "https://betconstruct.com", summary: "Supplier of betting and gambling software for operators, from sportsbook to casino." },
      { name: "Altenar", website: "https://altenar.com", summary: "Sportsbook software and platform provider for licensed operators.", ours: { label: "Altenar and IBIA on betting integrity in Africa", href: "/news/industry/altenar-ibia-betting-integrity-africa" } },
      { name: "EGT Digital", website: "https://egt-digital.com", summary: "Digital arm of EGT offering an iGaming platform and in-house gaming products.", ours: { label: "EGT Digital's casino games deal with SportPesa", href: "/news/industry/south-africa-slot-suppliers-casino-games-legal-fight" } },
      { name: "Digitain", summary: "Sportsbook and iGaming platform supplier, with its Centrivo platform, that holds a South African National Manufacturer Licence.", ours: { label: "Digitain's National Manufacturer Licence opens South Africa", href: "/news/regulation/digitain-national-manufacturer-licence-south-africa" } },
    ],
    faq: [
      {
        question: "What is a sportsbook or casino platform provider?",
        answer:
          "A platform provider builds the core software a betting or casino operator runs on: bet-taking and odds engines, casino and payments integrations, player accounts, risk and reporting tools, and often an admin back office. Operators licence this technology instead of building it themselves, then add their own brand, games and local licences on top.",
      },
      {
        question: "What's the difference between a platform provider and a game provider?",
        answer:
          "A platform provider supplies the underlying system an operator runs on. A game provider supplies individual titles, such as slots or crash games, that plug into that platform or into an aggregator. Some companies, such as SOFTSWISS, offer both a platform and a game aggregator, while others specialise in one or the other.",
      },
      {
        question: "Does a platform provider need its own licence to serve African operators?",
        answer:
          "The licence requirement normally sits with the operator taking bets or accepting deposits in a given country, not with the B2B platform supplying the technology. Some African regulators also require the software supplier itself to hold a manufacturer, supplier or testing certificate before an operator can use it. Confirm the current rule with the regulator in your specific market before integrating.",
      },
      {
        question: "How do operators choose a platform provider in Africa?",
        answer:
          "Typical factors include which African markets and payment methods the platform already supports, whether it has existing certification or supply experience with local regulators, its game aggregator and odds coverage for popular sports, and the cost structure. This directory is a starting point for research, not a comparison or ranking.",
      },
    ],
  },
  {
    slug: "game-providers",
    title: "Game Providers Active in Africa",
    seoTitle: "Casino and Virtual Game Providers in Africa: Company Directory",
    description:
      "Game studios and aggregators that serve African operators, with official websites. Slots, crash games, virtual sports and instant games.",
    intro:
      "Game providers supply the titles operators put in their lobbies. These studios and aggregators appear in coverage of African operators and markets. Games must be certified and accepted by each regulator before an operator can offer them.",
    entryLabel: "Games",
    entries: [
      { name: "SmartSoft Gaming", website: "https://smartsoftgaming.com", summary: "Casino games provider, best known for the crash game JetX." },
      { name: "Kiron Interactive", website: "https://www.kironinteractive.com", summary: "Virtual sports and instant games for online and retail operators." },
      { name: "TaDa Gaming", website: "https://tadagaming.com", summary: "iGaming software and game provider with slots, fish-shooting games and crash games." },
      { name: "EuroVirtuals", website: "https://eurovirtuals.com", summary: "Game studio and aggregator built for emerging markets, with mobile-lite and USSD delivery." },
      { name: "Pragmatic Play", website: "https://www.pragmaticplay.com", summary: "Game content provider covering slots, live casino and more for regulated operators." },
    ],
  },
  {
    slug: "lottery-providers",
    title: "Lottery Operators and Providers in Africa",
    seoTitle: "Lottery Operators and Providers in Africa: Directory",
    description:
      "National lottery operators and lottery bodies across Africa, with official websites and links to our coverage.",
    intro:
      "Several African countries run national lotteries, and more are launching or restructuring them. This list covers lottery operators we cover, with their official sites where we have checked one. It is not a list of technology suppliers: we add suppliers once we can source them.",
    entryLabel: "Lotteries",
    entries: [
      { name: "LONASE (Loterie Nationale Sénégalaise)", website: "https://www.lonase.sn", summary: "Senegal's national lottery.", ours: { label: "Our LONASE coverage", href: "/news/industry/lonase-senegal-governance-niger-lottery" } },
      { name: "LONAB (Loterie Nationale Burkinabè)", website: "https://lonab.bf", summary: "Burkina Faso's national lottery." },
      { name: "LONACI (Loterie Nationale de Côte d'Ivoire)", website: "https://lonaci.ci", summary: "Côte d'Ivoire's national lottery." },
      { name: "InteGo! (Rwanda)", summary: "Rwanda's national lottery, launched in 2026.", ours: { label: "Our Rwanda lottery report", href: "/news/regulation/rwanda-intego-national-lottery-launch" } },
    ],
  },
  {
    slug: "crash-games",
    coverage: { heading: "Crash game coverage", categories: ["Crash Games"] },
    title: "Crash Games in African iGaming",
    seoTitle: "Crash Games in African iGaming: Titles and Providers",
    description:
      "Crash games on African operators' lobbies and the providers behind them. Titles, studios and official websites, without rankings.",
    intro:
      "Crash games, where a multiplier climbs until it crashes and players cash out before it does, are a prominent category in African casino lobbies. This list names titles and studios we have seen reported in African coverage. It is not a ranking, and crash games are real-money gambling: play only with licensed operators.",
    entryLabel: "Crash games",
    entries: [
      { name: "JetX (SmartSoft Gaming)", website: "https://smartsoftgaming.com", summary: "Flying crash game from SmartSoft, which describes JetX as the game that created the flying crash category." },
      { name: "Aviator (Spribe)", website: "https://spribe.co", summary: "Crash game from the studio Spribe, reported among the crash titles in African operators' lobbies." },
      { name: "Zazuu Crash (Shacks Evolution Studios)", summary: "Crash game launched in 2026 by Shacks Evolution Studios, an African content studio." },
      { name: "Crash titles from TaDa Gaming", website: "https://tadagaming.com", summary: "TaDa lists crash games among the products in its iGaming portfolio." },
    ],
  },
]

export function getDirectoryPage(slug: string): DirectoryPage | undefined {
  return DIRECTORY_PAGES.find((p) => p.slug === slug)
}
