export type BlogCategory =
  | 'African Market'
  | 'Casino Reviews'
  | 'Slot Reviews'
  | 'Sports Betting'
  | 'Content Strategy'
  | 'Player Education';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string; // YYYY-MM-DD
  readMinutes: number;
  category: BlogCategory;
  coverImage: string;
  contentHtml: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'kenya-betting-market-2026',
    title: `Why Kenya's Sports Betting Market Keeps Growing in 2026`,
    excerpt:
      'Mobile penetration, Premier League obsession, and a young audience are reshaping operator strategy. Here’s what the numbers imply — and what most brands still miss.',
    dateISO: '2026-05-10',
    readMinutes: 10,
    category: 'African Market',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80',
    contentHtml: `
      <p>Kenya’s betting market is growing fast — but the winners aren’t “the loudest brands”. They’re the ones that localise, educate, and build trust.</p>
      <h2>What’s driving growth</h2>
      <ul>
        <li>Mobile-first payments and instant deposits</li>
        <li>High engagement around football</li>
        <li>Community-driven betting behaviour (WhatsApp/Telegram)</li>
      </ul>
      <h2>What good content changes</h2>
      <p>Education-first articles reduce churn, improve LTV, and protect players by making concepts clear.</p>
    `,
  },
  {
    slug: 'spot-a-fair-casino-site',
    title: 'How to Spot a Fair Casino Site Before You Deposit',
    excerpt:
      'Licensing checks, RTP transparency, payment method signals — the practical checklist players should follow before depositing.',
    dateISO: '2026-05-08',
    readMinutes: 7,
    category: 'Casino Reviews',
    coverImage: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=1400&q=80',
    contentHtml: `
      <p>Before a player deposits, the “trust signals” matter. This guide outlines quick checks that take under five minutes.</p>
      <h2>1) Licensing & compliance</h2>
      <p>Look for a clear licence number and regulator name, not vague claims.</p>
      <h2>2) Payment methods</h2>
      <p>Trusted brands offer reliable withdrawals and clear KYC expectations.</p>
    `,
  },
  {
    slug: 'igaming-content-mistakes-ranking',
    title: 'The iGaming Content Mistakes Quietly Killing Rankings',
    excerpt:
      'Thin affiliate copy, missing compliance context, and weak internal linking — the most common issues I see in underperforming iGaming sites.',
    dateISO: '2026-05-05',
    readMinutes: 8,
    category: 'Content Strategy',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
    contentHtml: `
      <p>Most ranking problems come down to structure and credibility, not “more keywords”.</p>
      <h2>Fixes that move the needle</h2>
      <ul>
        <li>Clear topical clusters</li>
        <li>Better internal linking</li>
        <li>Country-level localisation</li>
      </ul>
    `,
  },
];

