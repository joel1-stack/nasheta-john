import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
interface BlogCategory { name: string; slug: string; description: string; subcategories: { name: string; slug: string }[]; }
interface BlogPost { slug: string; title: string; excerpt: string; image: string; date: Date; readTime: number; author: string; views: number; categories: string[]; }

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
 selector: 'app-blog', templateUrl: './blog-list.component.html', styleUrls: ['./blog-list.component.scss'] })
export class BlogListComponent implements OnInit {
  activeDropdown: string | null = null; searchQuery = ''; emailInput = ''; crmClickCount = 0;

  blogCategories: BlogCategory[] = [
    { name: 'Industry News', slug: 'industry-news', description: 'Track regulation, partnerships, sportsbook innovation, and operator expansion across African iGaming markets.', subcategories: [{ name: 'Regulations', slug: 'regulations' }, { name: 'Operator Expansion', slug: 'operator-expansion' }, { name: 'Partnerships', slug: 'partnerships' }, { name: 'Market Entry', slug: 'market-entry' }] },
    { name: 'Betting IQ', slug: 'betting-iq', description: 'Build your understanding of odds, implied probability, EV, bankroll discipline, and market thinking.', subcategories: [{ name: 'Betting Basics', slug: 'betting-basics' }, { name: 'Odds & Probability', slug: 'odds-probability' }, { name: 'Bankroll Management', slug: 'bankroll-management' }, { name: 'Accumulators', slug: 'accumulators' }] },
    { name: 'Shepherd Signals', slug: 'shepherd-signals', description: 'Use Shepherd-powered probability insights to understand matches, prices, and potential value spots more clearly.', subcategories: [{ name: 'Match Analysis', slug: 'match-analysis' }, { name: 'Value Spots', slug: 'value-spots' }, { name: 'Probability Insights', slug: 'probability-insights' }] }
  ];

  posts: BlogPost[] = [
    { slug: 'kenya-sports-betting-2026', title: "Why Kenya's Sports Betting Market Keeps Growing in 2026", excerpt: 'Mobile penetration, Premier League obsession, and a young audience are reshaping operator strategy.', image: 'assets/images/kenya-nairobi-tech.jpg', date: new Date('2026-05-10'), readTime: 10, author: 'Nasheta John', views: 2847, categories: ['African Market', 'Sports Betting'] },
    { slug: 'fair-casino-site', title: 'How to Spot a Fair Casino Site Before You Deposit', excerpt: 'Licensing checks, RTP transparency, payment method signals — the practical player checklist.', image: 'assets/images/online-casino-website.jpg', date: new Date('2026-05-08'), readTime: 7, author: 'Nasheta John', views: 1956, categories: ['Casino Reviews', 'Industry News'] },
    { slug: 'igaming-content-mistakes', title: 'The iGaming Content Mistakes Quietly Killing Rankings', excerpt: 'Thin affiliate copy, missing compliance context, and weak internal linking — the most common issues.', image: 'assets/images/data-charts-laptop.jpg', date: new Date('2026-05-05'), readTime: 8, author: 'Nasheta John', views: 3421, categories: ['Content Strategy', 'SEO'] },
    { slug: 'south-africa-gambling-tax', title: "University of Cape Town Academics Back Online Gambling Tax Increase In South Africa", excerpt: "UCT researchers have backed South Africa's proposed 20% online gambling tax, arguing that the country's betting boom is creating growing financial and social harm.", image: 'assets/images/sweepstakes-coins.jpg', date: new Date('2026-05-28'), readTime: 4, author: 'Kolade Abisoye', views: 4521, categories: ['Industry News', 'Regulations'] },
    { slug: 'accumulator-bets-explained', title: 'Accumulator Bets Explained: What To Know Before Your Next Parlay', excerpt: 'A clear Betting IQ guide explaining accumulator bets, how they work in football betting, risk factors and what African bettors must understand before making decisions.', image: 'assets/images/sports-betting-app.jpg', date: new Date('2026-05-28'), readTime: 5, author: 'John Raymond', views: 3187, categories: ['Betting IQ', 'Betting Basics'] },
    { slug: 'kenya-gambling-tax-fight', title: "Kenya's Gambling Tax Fight Exposes Gap In Regulatory Framework", excerpt: "Kenya's gambling regulator is opposing plans to reintroduce a 20% tax on betting winnings, warning that modern bonus systems make the proposal difficult to enforce.", image: 'assets/images/esports-betting.jpg', date: new Date('2026-05-28'), readTime: 4, author: 'Kolade Abisoye', views: 2734, categories: ['Sports Betting', 'Industry News'] }
  ];

  get featuredPost(): BlogPost | undefined { return this.posts[0]; }
  get mostReadPosts(): BlogPost[] { return [...this.posts].sort((a, b) => b.views - a.views).slice(0, 4); }
  get filteredPosts(): BlogPost[] {
    if (!this.searchQuery) return this.posts.slice(1);
    const q = this.searchQuery.toLowerCase();
    return this.posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.categories.some(c => c.toLowerCase().includes(q)));
  }

  ngOnInit() { if (this.featuredPost) this.featuredPost.views++; }
  toggleDropdown(name: string) { this.activeDropdown = this.activeDropdown === name ? null : name; }
  onSearch() {}
  subscribe() { if (this.emailInput) { console.log('Subscribed:', this.emailInput); this.emailInput = ''; alert('Thanks for subscribing!'); } }
  checkCrm() { if (this.crmClickCount >= 5) { console.log('CRM triggered!'); } }
}