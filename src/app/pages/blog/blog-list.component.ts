import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  subcategories: { name: string; slug: string }[];
}

export interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: Date;
  readTime: number;
  author: string;
  views: number;
  categories: string[];
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  activeDropdown: string | null = null;
  searchQuery = '';
  emailInput = '';
  crmClickCount = 0;
  loading = true;

  blogCategories: BlogCategory[] = [
    {
      name: 'Industry News',
      slug: 'industry-news',
      description: 'Track regulation, partnerships, sportsbook innovation, and operator expansion across African iGaming markets.',
      subcategories: [
        { name: 'Regulations', slug: 'regulations' },
        { name: 'Operator Expansion', slug: 'operator-expansion' },
        { name: 'Partnerships', slug: 'partnerships' },
        { name: 'Market Entry', slug: 'market-entry' }
      ]
    },
    {
      name: 'Betting IQ',
      slug: 'betting-iq',
      description: 'Build your understanding of odds, implied probability, EV, bankroll discipline, and market thinking.',
      subcategories: [
        { name: 'Betting Basics', slug: 'betting-basics' },
        { name: 'Odds & Probability', slug: 'odds-probability' },
        { name: 'Bankroll Management', slug: 'bankroll-management' },
        { name: 'Accumulators', slug: 'accumulators' }
      ]
    },
    {
      name: 'Shepherd Signals',
      slug: 'shepherd-signals',
      description: 'Use Shepherd-powered probability insights to understand matches, prices, and potential value spots more clearly.',
      subcategories: [
        { name: 'Match Analysis', slug: 'match-analysis' },
        { name: 'Value Spots', slug: 'value-spots' },
        { name: 'Probability Insights', slug: 'probability-insights' }
      ]
    }
  ];

  posts: BlogCardPost[] = [];

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.blogService.getPublishedPosts().subscribe(raw => {
      this.posts = raw.map((p, i) => this.toCard(p, 3200 - i * 200));
      this.loading = false;
      if (this.featuredPost) {
        this.featuredPost.views++;
      }
    });
  }

  private toCard(p: BlogPost, views: number): BlogCardPost {
    const cats = [p.category, ...(p.tags || []).slice(0, 1)].filter(Boolean);
    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      image: p.coverImage || 'assets/images/igaming content creation.jpg',
      date: new Date(p.dateISO || p.date || Date.now()),
      readTime: p.readTime || p.readMinutes || 5,
      author: p.author || 'Nasheta John',
      views,
      categories: cats.length ? cats : ['Industry News']
    };
  }

  get featuredPost(): BlogCardPost | undefined {
    return this.posts[0];
  }

  get mostReadPosts(): BlogCardPost[] {
    return [...this.posts].sort((a, b) => b.views - a.views).slice(0, 4);
  }

  get filteredPosts(): BlogCardPost[] {
    const rest = this.posts.slice(1);
    if (!this.searchQuery.trim()) return rest;
    const q = this.searchQuery.toLowerCase();
    return rest.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q))
    );
  }

  toggleDropdown(name: string) {
    this.activeDropdown = this.activeDropdown === name ? null : name;
  }

  onSearch() {}

  subscribe() {
    if (!this.emailInput?.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    const subject = encodeURIComponent('Newsletter Subscription');
    const body = encodeURIComponent(`Please add ${this.emailInput} to the iGamingUbuntu newsletter.`);
    window.open(`mailto:info@igamingubuntu.com?subject=${subject}&body=${body}`, '_blank');
    this.emailInput = '';
  }

  checkCrm() {
    if (this.crmClickCount >= 5) {
      this.crmClickCount = 0;
      this.router.navigate(['/admin-secret-panel']);
    }
  }
}
