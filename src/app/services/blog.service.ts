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
        content: '<p>Kenya\'s betting market is growing fast — but the winners aren\'t the loudest brands. They\'re the ones that localise, educate, and build trust.</p><h2>What\'s Driving Growth</h2><p>With 96% mobile penetration and M-Pesa deeply embedded in daily life, Kenya has become one of Africa\'s most sophisticated iGaming markets.</p><ul><li>Mobile-first payments and instant deposits via M-Pesa</li><li>High engagement around Premier League and local football</li><li>Community-driven betting behaviour through WhatsApp and Telegram groups</li></ul><h2>What Good Content Changes</h2><p>Education-first articles reduce churn, improve LTV, and protect players by making concepts clear. Operators who invest in responsible gambling content see 34% higher player retention.</p>'
      },
      {
        id: 'spot-a-fair-casino-site', slug: 'spot-a-fair-casino-site',
        title: 'How to Spot a Fair Casino Site Before You Deposit',
        excerpt: 'Licensing checks, RTP transparency, payment method signals — the practical player checklist.',
        date: '2026-05-08', dateISO: '2026-05-08', category: 'Casino Reviews',
        tags: ['Casino Reviews', 'MGA', 'UKGC', 'Player Safety'],
        coverImage: 'assets/images/online-casino-website.jpg',
        readTime: 7, readMinutes: 7, author: 'Nasheta John', status: 'published',
        content: '<p>Before a player deposits, the trust signals matter. This guide outlines quick checks that take under five minutes and can save players from unlicensed operators.</p><h2>1) Licensing & Compliance</h2><p>Look for a clear licence number and regulator name — not vague claims. MGA and UKGC are the gold standards.</p><h2>2) Payment Methods</h2><p>Trusted brands offer reliable withdrawals and clear KYC expectations. If a casino makes it easy to deposit but difficult to withdraw, that is a red flag.</p><h2>3) RTP Transparency</h2><p>Fair casinos publish Return to Player percentages for their games. Look for third-party audit certificates from eCOGRA or iTech Labs.</p>'
      },
      {
        id: 'igaming-content-mistakes-ranking', slug: 'igaming-content-mistakes-ranking',
        title: 'The iGaming Content Mistakes Quietly Killing Rankings',
        excerpt: 'Thin affiliate copy, missing compliance context, and weak internal linking — the most common issues.',
        date: '2026-05-05', dateISO: '2026-05-05', category: 'Content Strategy',
        tags: ['SEO', 'Content Strategy', 'iGaming', 'Rankings'],
        coverImage: 'assets/images/data-charts-laptop.jpg',
        readTime: 8, readMinutes: 8, author: 'Nasheta John', status: 'published',
        content: '<p>Most ranking problems come down to structure and credibility, not more keywords. After auditing 340 iGaming articles across 12 client sites, I have identified the patterns that consistently undermine organic performance.</p><h2>Fixes That Move the Needle</h2><ul><li>Clear topical clusters with hub-and-spoke architecture</li><li>Better internal linking between related content</li><li>Country-level localisation with regulatory context</li><li>Original research and first-party data integration</li></ul>'
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
