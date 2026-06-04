import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface BlogCategory { name: string; slug: string; description: string; subcategories: { name: string; slug: string }[]; }
interface BlogPost { slug: string; title: string; excerpt: string; body?: string; image: string; date: Date; readTime: number; author: string; views: number; categories: string[]; affiliateLinks?: AffiliateLink[]; }
interface AffiliateLink { url: string; anchorText: string; utmCampaign: string; postSlug?: string; postTitle?: string; clicks?: number; }
interface Subscriber { email: string; date: Date; }

@Component({
  selector: 'app-blog',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class BlogListComponent implements OnInit {
  activeDropdown: string | null = null; searchQuery = ''; emailInput = '';
  crmClickCount = 0; crmOpen = false; crmTab = 'posts';
  showAddPost = false; editingPost = false;
  postForm: any = { title: '', slug: '', excerpt: '', body: '', image: '', author: 'Nasheta John', date: new Date().toISOString().split('T')[0], readTime: 5, categories: '', affiliateLinks: [] };
  subscribers: Subscriber[] = [];

  blogCategories: BlogCategory[] = [
    { name: 'Industry News', slug: 'industry-news', description: 'Track regulation, partnerships, sportsbook innovation, and operator expansion across African iGaming markets.', subcategories: [{ name: 'Regulations', slug: 'regulations' }, { name: 'Operator Expansion', slug: 'operator-expansion' }, { name: 'Partnerships', slug: 'partnerships' }, { name: 'Market Entry', slug: 'market-entry' }] },
    { name: 'Betting IQ', slug: 'betting-iq', description: 'Build your understanding of odds, implied probability, EV, bankroll discipline, and market thinking.', subcategories: [{ name: 'Betting Basics', slug: 'betting-basics' }, { name: 'Odds & Probability', slug: 'odds-probability' }, { name: 'Bankroll Management', slug: 'bankroll-management' }, { name: 'Accumulators', slug: 'accumulators' }] },
    { name: 'Shepherd Signals', slug: 'shepherd-signals', description: 'Use Shepherd-powered probability insights to understand matches, prices, and potential value spots more clearly.', subcategories: [{ name: 'Match Analysis', slug: 'match-analysis' }, { name: 'Value Spots', slug: 'value-spots' }, { name: 'Probability Insights', slug: 'probability-insights' }] }
  ];

  posts: BlogPost[] = [
    { slug: 'kenya-sports-betting-2026', title: "Why Kenya's Sports Betting Market Keeps Growing in 2026", excerpt: 'Mobile penetration, Premier League obsession, and a young audience are reshaping operator strategy.', body: '', image: 'assets/images/blog-kenya.jpg', date: new Date('2026-05-10'), readTime: 10, author: 'Nasheta John', views: 2848, categories: ['African Market', 'Sports Betting'], affiliateLinks: [{ url: 'https://betway.com/kenya', anchorText: 'Betway Kenya', utmCampaign: 'kenya-betting-2026', clicks: 45 }] },
    { slug: 'fair-casino-site', title: 'How to Spot a Fair Casino Site Before You Deposit', excerpt: 'Licensing checks, RTP transparency, payment method signals — the practical player checklist.', body: '', image: 'assets/images/blog-casino.jpg', date: new Date('2026-05-08'), readTime: 7, author: 'Nasheta John', views: 1956, categories: ['Casino Reviews', 'Industry News'] },
    { slug: 'igaming-content-mistakes', title: 'The iGaming Content Mistakes Quietly Killing Rankings', excerpt: 'Thin affiliate copy, missing compliance context, and weak internal linking — the most common issues.', body: '', image: 'assets/images/blog-seo.jpg', date: new Date('2026-05-05'), readTime: 8, author: 'Nasheta John', views: 3421, categories: ['Content Strategy', 'SEO'] },
    { slug: 'south-africa-gambling-tax', title: 'University of Cape Town Academics Back Online Gambling Tax Increase In South Africa', excerpt: "UCT researchers have backed South Africa's proposed 20% online gambling tax, arguing that the country's betting boom is creating growing financial and social harm.", body: '', image: 'assets/images/blog-south-africa.jpg', date: new Date('2026-05-28'), readTime: 4, author: 'Kolade Abisoye', views: 4521, categories: ['Industry News', 'Regulations'] },
    { slug: 'accumulator-bets-explained', title: 'Accumulator Bets Explained: What To Know Before Your Next Parlay', excerpt: 'A clear Betting IQ guide explaining accumulator bets, how they work in football betting, risk factors and what African bettors must understand before making decisions.', body: '', image: 'assets/images/blog-accumulator.jpg', date: new Date('2026-05-28'), readTime: 5, author: 'John Raymond', views: 3187, categories: ['Betting IQ', 'Betting Basics'] },
    { slug: 'kenya-gambling-tax-fight', title: "Kenya's Gambling Tax Fight Exposes Gap In Regulatory Framework", excerpt: "Kenya's gambling regulator is opposing plans to reintroduce a 20% tax on betting winnings, warning that modern bonus systems make the proposal difficult to enforce.", body: '', image: 'assets/images/blog-kenya-tax.jpg', date: new Date('2026-05-28'), readTime: 4, author: 'Kolade Abisoye', views: 2734, categories: ['Sports Betting', 'Industry News'] }
  ];

  get featuredPost(): BlogPost | undefined { return this.posts[0]; }
  get mostReadPosts(): BlogPost[] { return [...this.posts].sort((a, b) => b.views - a.views); }
  get filteredPosts(): BlogPost[] { if (!this.searchQuery) return this.posts.slice(1); const q = this.searchQuery.toLowerCase(); return this.posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.categories.some(c => c.toLowerCase().includes(q))); }
  get totalViews(): number { return this.posts.reduce((sum, p) => sum + p.views, 0); }
  get subscriberCount(): number { return this.subscribers.length; }
  get totalAffiliateClicks(): number { return this.posts.reduce((sum, p) => sum + (p.affiliateLinks?.reduce((s, l) => s + (l.clicks || 0), 0) || 0), 0); }
  get allAffiliateLinks(): any[] { return this.posts.flatMap(p => (p.affiliateLinks || []).map(l => ({ ...l, postTitle: p.title, postSlug: p.slug, fullUrl: l.url + '?utm_source=igamingubuntu&utm_medium=blog&utm_campaign=' + l.utmCampaign }))); }

  ngOnInit() {
    // Load subscribers from cookies
    this.loadSubscribersFromCookies();
    // Load view counts from cookies (or localStorage for persistence)
    this.loadViewsFromStorage();
    // Track view for featured post if not already viewed
    if (this.featuredPost) this.trackView(this.featuredPost.slug);
  }

  toggleDropdown(name: string) { this.activeDropdown = this.activeDropdown === name ? null : name; }
  onSearch() {}

  subscribe() {
    if (this.emailInput && this.emailInput.includes('@')) {
      this.subscribers.push({ email: this.emailInput, date: new Date() });
      this.saveSubscribersToCookies();
      this.emailInput = '';
      alert('Thanks for subscribing!');
    }
  }

  // ========== COOKIE-BASED VIEW TRACKING ==========
  // Each unique visitor gets a cookie. Views only count once per visitor per post.
  trackView(postSlug: string) {
    const cookieName = 'viewed_' + postSlug;
    const hasViewed = this.getCookie(cookieName);
    if (!hasViewed) {
      // First time viewing this post - increment count
      const post = this.posts.find(p => p.slug === postSlug);
      if (post) {
        post.views++;
        this.saveViewsToStorage();
      }
      // Set cookie to expire in 30 days
      this.setCookie(cookieName, 'true', 30);
    }
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  saveViewsToStorage() {
    // Save view counts to localStorage for persistence across sessions
    const viewData = this.posts.map(p => ({ slug: p.slug, views: p.views }));
    localStorage.setItem('igu_blog_views', JSON.stringify(viewData));
  }

  loadViewsFromStorage() {
    const saved = localStorage.getItem('igu_blog_views');
    if (saved) {
      const viewData = JSON.parse(saved);
      viewData.forEach((v: any) => {
        const post = this.posts.find(p => p.slug === v.slug);
        if (post) post.views = v.views;
      });
    }
  }

  saveSubscribersToCookies() {
    localStorage.setItem('igu_subscribers', JSON.stringify(this.subscribers));
  }

  loadSubscribersFromCookies() {
    const saved = localStorage.getItem('igu_subscribers');
    if (saved) this.subscribers = JSON.parse(saved);
  }

  // ========== CRM METHODS ==========
  handleLogoClick() {
    this.crmClickCount++;
    if (this.crmClickCount >= 5) {
      this.crmOpen = true;
      this.crmClickCount = 0;
      return;
    }
    // Reset count if clicks are too slow (2 seconds)
    setTimeout(() => { if (this.crmClickCount > 0 && !this.crmOpen) this.crmClickCount = 0; }, 2000);
  }
  closeCrm() { this.crmOpen = false; this.crmClickCount = 0; }

  // ========== POST CRUD ==========
  addAffiliateLink() { this.postForm.affiliateLinks.push({ url: '', anchorText: '', utmCampaign: '' }); }
  removeAffiliateLink(index: number) { this.postForm.affiliateLinks.splice(index, 1); }

  savePost() {
    const post: BlogPost = {
      slug: this.postForm.slug,
      title: this.postForm.title,
      excerpt: this.postForm.excerpt,
      body: this.postForm.body,
      image: this.postForm.image,
      date: new Date(this.postForm.date),
      readTime: this.postForm.readTime,
      author: this.postForm.author,
      views: this.editingPost ? (this.posts.find(p => p.slug === this.postForm.slug)?.views || 0) : 0,
      categories: this.postForm.categories.split(',').map((c: string) => c.trim()).filter((c: string) => c),
      affiliateLinks: this.postForm.affiliateLinks
    };
    if (this.editingPost) {
      const idx = this.posts.findIndex(p => p.slug === post.slug);
      if (idx >= 0) this.posts[idx] = post;
    } else {
      this.posts.push(post);
    }
    this.saveViewsToStorage();
    this.cancelPost();
  }

  editPost(post: BlogPost) {
    this.postForm = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body || '',
      image: post.image,
      author: post.author,
      date: post.date.toISOString().split('T')[0],
      readTime: post.readTime,
      categories: post.categories.join(', '),
      affiliateLinks: [...(post.affiliateLinks || [])]
    };
    this.editingPost = true;
    this.showAddPost = true;
  }

  deletePost(post: BlogPost) {
    if (confirm('Delete this post?')) {
      this.posts = this.posts.filter(p => p.slug !== post.slug);
      this.saveViewsToStorage();
    }
  }

  cancelPost() {
    this.showAddPost = false;
    this.editingPost = false;
    this.postForm = { title: '', slug: '', excerpt: '', body: '', image: '', author: 'Nasheta John', date: new Date().toISOString().split('T')[0], readTime: 5, categories: '', affiliateLinks: [] };
  }

  deleteAffiliateLink(link: any) {
    this.posts.forEach(p => {
      if (p.affiliateLinks) p.affiliateLinks = p.affiliateLinks.filter(l => l.url !== link.url || l.utmCampaign !== link.utmCampaign);
    });
  }

  exportSubscribers() {
    const csv = 'Email,Date Subscribed\n' + this.subscribers.map(s => `${s.email},${s.date.toISOString().split('T')[0]}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}