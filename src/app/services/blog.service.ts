import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, skipWhile } from 'rxjs';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO?: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  readMinutes?: number;
  author: string;
  status: 'published' | 'draft';
  content: string;
  contentHtml?: string;
  affiliateLinks?: Array<{ title: string; description: string; url: string }>;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private postsSubject = new BehaviorSubject<BlogPost[]>([]);
  posts$ = this.postsSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {
    this.seedPosts();
    this.loadPosts();
  }

  private seedPosts() {
    const fallback: BlogPost[] = [
      {
        id: 'kenya-betting-market-2026', slug: 'kenya-betting-market-2026',
        title: "Why Kenya's Sports Betting Market Keeps Growing in 2026",
        excerpt: 'Mobile penetration, Premier League obsession, and a young audience are reshaping operator strategy.',
        date: '2026-05-10', dateISO: '2026-05-10', category: 'African Market',
        tags: ['Kenya', 'Sports Betting', 'African Market', 'Mobile'],
        coverImage: 'assets/images/kenya-nairobi-tech.jpg',
        readTime: 10, readMinutes: 10, author: 'Nasheta John', status: 'published',
        content: '<p>Kenya\'s sports betting market is experiencing unprecedented growth in 2026, driven by a perfect storm of mobile technology, football passion, and a young, digitally-native population. With over 96% mobile penetration and M-Pesa handling 89% of all betting transactions, the infrastructure for a thriving iGaming ecosystem is firmly in place.</p><h2>What\'s Driving Growth</h2><p>The numbers tell a compelling story. Kenya\'s betting industry has grown by over 40% year-on-year since 2022, with in-play betting now accounting for 72% of all wagers. The Premier League remains the biggest driver, but local football leagues are gaining traction as operators invest in community-level sponsorships.</p><ul><li><strong>Mobile-first payments:</strong> M-Pesa integration means deposits happen in seconds, not days. Players can fund accounts from their phone with zero friction.</li><li><strong>Football obsession:</strong> Premier League matchdays see a 300% spike in betting activity. Local derbies and AFCON qualifiers are close behind.</li><li><strong>Community betting:</strong> WhatsApp and Telegram groups have become the primary channels for tips, predictions, and shared betting experiences.</li><li><strong>Young demographics:</strong> With a median age of 19, Kenya\'s population is primed for mobile-first gambling experiences that blend entertainment with the chance to win.</li></ul><h2>What Smart Operators Are Doing</h2><p>The brands winning in Kenya aren\'t the ones with the biggest marketing budgets. They\'re the ones investing in localised content, responsible gambling tools, and community engagement. Education-first content that explains odds, teaches bankroll management, and promotes responsible play consistently outperforms pure promotional material.</p><h2>The Compliance Advantage</h2><p>Kenya\'s Betting Control and Licensing Board continues to tighten regulations. Operators who integrate compliance naturally into their content — rather than treating it as an afterthought — are building trust with both regulators and players. This trust translates directly into higher player lifetime value and lower churn rates.</p>'
      },
      {
        id: 'spot-a-fair-casino-site', slug: 'spot-a-fair-casino-site',
        title: 'How to Spot a Fair Casino Site Before You Deposit',
        excerpt: 'Licensing checks, RTP transparency, payment method signals — the practical player checklist.',
        date: '2026-05-08', dateISO: '2026-05-08', category: 'Casino Reviews',
        tags: ['Casino Reviews', 'MGA', 'UKGC', 'Player Safety'],
        coverImage: 'assets/images/online-casino-website.jpg',
        readTime: 7, readMinutes: 7, author: 'Nasheta John', status: 'published',
        content: '<p>Before you deposit real money at any online casino, knowing how to separate legitimate operators from questionable ones can save you thousands. Here is a practical five-minute checklist that every player should follow.</p><h2>1) Licence Verification</h2><p>The first thing to check is the licence. Legitimate operators display their licence number and regulator clearly in the footer. The Malta Gaming Authority (MGA) and UK Gambling Commission (UKGC) are the gold standards. If you see claims like "licensed and regulated" without a specific licence number, that is a red flag. Cross-reference the licence number on the regulator\'s official website.</p><h2>2) Payment Transparency</h2><p>Fair casinos make their withdrawal policies clear before you deposit. Look for: reasonable minimum withdrawal limits, processing times clearly stated (3-5 business days is standard), and no hidden fees. If a casino makes depositing instant but withdrawals take weeks, walk away.</p><h2>3) RTP and Game Fairness</h2><p>Reputable casinos publish Return to Player percentages for their games. Look for third-party audit certificates from eCOGRA, iTech Labs, or GLI. These independent auditors verify that games are fair and RNGs are properly calibrated. If you cannot find audit information, the casino may be hiding unfavourable odds.</p><h2>4) Responsible Gambling Tools</h2><p>Trusted operators provide: deposit limits, session time reminders, self-exclusion options, and reality checks. The absence of these tools in regulated markets is a serious warning sign.</p><h2>5) Customer Support Quality</h2><p>Test the support before you deposit. A quick live chat inquiry should be answered within 60 seconds. If support is slow or unhelpful before you deposit, expect worse treatment when you need to withdraw.</p>'
      },
      {
        id: 'igaming-content-mistakes-ranking', slug: 'igaming-content-mistakes-ranking',
        title: 'The iGaming Content Mistakes Quietly Killing Rankings',
        excerpt: 'Thin affiliate copy, missing compliance context, and weak internal linking — the most common issues.',
        date: '2026-05-05', dateISO: '2026-05-05', category: 'Content Strategy',
        tags: ['SEO', 'Content Strategy', 'iGaming', 'Rankings'],
        coverImage: 'assets/images/data-charts-laptop.jpg',
        readTime: 8, readMinutes: 8, author: 'Nasheta John', status: 'published',
        content: '<p>After auditing over 340 iGaming articles across 12 client sites in 2025-2026, patterns emerge. The sites that lose rankings share common mistakes. The sites that gain rankings do the opposite. Here is what separates the winners from the rest.</p><h2>Mistake 1: Thin Affiliate Copy</h2><p>Generic casino reviews that simply list features without original research or player perspective are being systematically devalued by Google\'s Helpful Content updates. Sites that lost visibility in the March 2026 Core Update had an average word count of just 847 words — well below the 2,400-word threshold needed to compete for competitive iGaming queries. The fix: invest in original research, expert quotes, and genuine player perspective.</p><h2>Mistake 2: Missing Compliance Context</h2><p>Google quality raters specifically look for regulatory compliance mentions in YMYL (Your Money Your Life) content. Articles that fail to reference MGA, UKGC, or relevant local regulators are now penalised. This is not just legal box-ticking — it is a ranking factor. Every casino review should include licence information, and every betting guide should mention responsible gambling.</p><h2>Mistake 3: Weak Internal Linking Architecture</h2><p>iGaming sites with strong topical authority clusters outperform isolated pages by 3.2x in featured snippet capture rates. Build content hubs around core topics — casino reviews, slot reviews, sports betting — with clear hub-and-spoke internal linking. Every article should link to at least three related pieces within the same topical cluster.</p><h2>Fixes That Move the Needle</h2><ul><li><strong>Topical clusters:</strong> Organise content around pillar pages with supporting articles that link back</li><li><strong>Country-level localisation:</strong> African markets need specifically localised content, not translated European copy</li><li><strong>Original data:</strong> First-party research and unique statistics earn backlinks and improve EEAT signals</li><li><strong>Regular content refreshes:</strong> Quarterly updates to keep statistics, regulations, and operator information current</li></ul>'
      },
      {
        id: 'south-africa-gambling-tax', slug: 'south-africa-gambling-tax',
        title: 'University of Cape Town Academics Back Online Gambling Tax Increase In South Africa',
        excerpt: "UCT researchers have backed South Africa's proposed 20% online gambling tax, arguing that the country's betting boom is creating growing financial and social harm.",
        date: '2026-05-28', dateISO: '2026-05-28', category: 'Industry News',
        tags: ['South Africa', 'Tax', 'Regulation'],
        coverImage: 'assets/images/sweepstakes-coins.jpg',
        readTime: 4, readMinutes: 4, author: 'Kolade Abisoye', status: 'published',
        content: '<p>UCT researchers have backed South Africa\'s proposed 20% online gambling tax, arguing that the country\'s betting boom is creating growing financial and social harm.</p><h2>Key Findings</h2><p>The research paper highlights that South Africa\'s gambling industry has grown significantly, with online betting accounting for an increasing share of total gambling revenue.</p>'
      },
      {
        id: 'accumulator-bets-explained', slug: 'accumulator-bets-explained',
        title: 'Accumulator Bets Explained: What To Know Before Your Next Parlay',
        excerpt: 'A clear Betting IQ guide explaining accumulator bets, how they work in football betting, risk factors and what African bettors must understand before making decisions.',
        date: '2026-05-28', dateISO: '2026-05-28', category: 'Betting IQ',
        tags: ['Accumulators', 'Betting IQ', 'Football'],
        coverImage: 'assets/images/sports-betting-app.jpg',
        readTime: 5, readMinutes: 5, author: 'John Raymond', status: 'published',
        content: '<p>A clear Betting IQ guide explaining accumulator bets, how they work in football betting, risk factors and what African bettors must understand before making decisions.</p><h2>What is an Accumulator Bet?</h2><p>An accumulator (or parlay) combines multiple selections into a single bet. All selections must win for the bet to payout.</p>'
      },
      {
        id: 'kenya-gambling-tax-fight', slug: 'kenya-gambling-tax-fight',
        title: "Kenya's Gambling Tax Fight Exposes Gap In Regulatory Framework",
        excerpt: "Kenya's gambling regulator is opposing plans to reintroduce a 20% tax on betting winnings, warning that modern bonus systems make the proposal difficult to enforce.",
        date: '2026-05-28', dateISO: '2026-05-28', category: 'Sports Betting',
        tags: ['Kenya', 'Tax', 'Regulation', 'Sports Betting'],
        coverImage: 'assets/images/esports-betting.jpg',
        readTime: 4, readMinutes: 4, author: 'Kolade Abisoye', status: 'published',
        content: '<p>Kenya\'s gambling regulator is opposing plans to reintroduce a 20% tax on betting winnings, warning that modern bonus systems make the proposal difficult to enforce.</p><h2>Background</h2><p>The proposed tax would apply to all betting winnings above a certain threshold. The regulator argues that modern bonus structures and free bets make enforcement nearly impossible.</p>'
      }
    ];
    this.loaded = true;
    this.postsSubject.next(fallback);
  }

  private loadPosts() {
    this.http.get<any>('/assets/data/blogs.json').subscribe({
      next: (data) => {
        // support both { posts: [] } and flat [] formats
        const raw: any[] = Array.isArray(data) ? data : (data.posts || []);
        const posts: BlogPost[] = raw.map(p => ({
          id: p.id || p.slug,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: p.date || p.dateISO || '',
          dateISO: p.dateISO || p.date || '',
          category: p.category,
          tags: p.tags || [],
          coverImage: p.coverImage || '',
          readTime: p.readTime || p.readMinutes || 5,
          readMinutes: p.readMinutes || p.readTime || 5,
          author: p.author || 'Nasheta John',
          status: p.status || 'published',
          content: p.content || p.contentHtml || '',
          contentHtml: p.contentHtml || p.content || '',
        }));
        this.loaded = true;
        this.postsSubject.next(posts);
      },
      error: (err) => {
        this.loaded = true;
        console.error('Failed to load blogs:', err);
      }
    });
  }

  getPublishedPosts(): Observable<BlogPost[]> {
    return this.posts$.pipe(map(posts => posts.filter(p => p.status === 'published').sort((a,b) => (a.date < b.date ? 1 : -1))));
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.posts$.pipe(
      skipWhile(() => !this.loaded),
      map(posts => posts.find(p => p.slug === slug))
    );
  }

  getPostsByCategory(category: string): Observable<BlogPost[]> {
    return this.getPublishedPosts().pipe(map(posts => posts.filter(p => p.category === category)));
  }

  getCategories(): Observable<string[]> {
    return this.getPublishedPosts().pipe(map(posts => [...new Set(posts.map(p => p.category))]));
  }

  getRelatedPosts(currentSlug: string, category: string, limit = 3): Observable<BlogPost[]> {
    return this.getPublishedPosts().pipe(map(posts => posts.filter(p => p.slug !== currentSlug && p.category === category).slice(0, limit)));
  }

  getAllPosts(): Observable<BlogPost[]> { return this.posts$; }

  addPost(post: BlogPost) { this.postsSubject.next([...this.postsSubject.value, post]); }

  updatePost(updated: BlogPost) {
    const posts = this.postsSubject.value.map(p => p.id === updated.id ? updated : p);
    this.postsSubject.next(posts);
  }

  deletePost(id: string) { this.postsSubject.next(this.postsSubject.value.filter(p => p.id !== id)); }

  duplicatePost(post: BlogPost): BlogPost {
    return { ...post, id: `${post.id}-copy-${Date.now()}`, slug: `${post.slug}-copy`, title: `${post.title} (Copy)`, status: 'draft', date: new Date().toISOString().split('T')[0] };
  }

  exportToJson(): string { return JSON.stringify({ posts: this.postsSubject.value }, null, 2); }

  importFromJson(json: string) {
    try {
      const data = JSON.parse(json);
      if (data.posts && Array.isArray(data.posts)) this.postsSubject.next(data.posts);
    } catch (e) { console.error('Invalid JSON:', e); }
  }
}
