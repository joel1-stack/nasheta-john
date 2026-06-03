import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly baseUrl = 'https://igamingubuntu.com';
  private readonly defaultImage = '/assets/images/og-default.jpg';

  constructor(private meta: Meta, private title: Title) { }

  /**
   * Set page SEO data including title, meta tags, and Open Graph tags
   */
  setPageData(data: SeoData): void {
    // Set page title
    this.title.setTitle(`${data.title} | iGamingUbuntu`);

    // Basic meta tags
    this.updateMeta('description', data.description);
    this.updateMeta('keywords', data.keywords || 'iGaming content writer, casino content strategist, sports betting content, African iGaming market, Kenya gambling content, MGA UKGC compliance writing');
    this.updateMeta('author', data.author || 'Nasheta John');
    this.updateMeta('robots', 'index, follow');

    // Canonical URL
    const canonicalUrl = data.canonicalUrl || `${this.baseUrl}${data.url || ''}`;
    this.updateMeta('canonical', canonicalUrl, 'link');

    // Open Graph tags
    this.updateMeta('og:title', data.title);
    this.updateMeta('og:description', data.description);
    this.updateMeta('og:image', data.image || this.defaultImage);
    this.updateMeta('og:url', canonicalUrl);
    this.updateMeta('og:type', data.type || 'website');
    this.updateMeta('og:site_name', 'iGamingUbuntu');

    // Twitter Card tags
    this.updateMeta('twitter:card', 'summary_large_image');
    this.updateMeta('twitter:title', data.title);
    this.updateMeta('twitter:description', data.description);
    this.updateMeta('twitter:image', data.image || this.defaultImage);
    this.updateMeta('twitter:site', '@igamingubuntu');
    this.updateMeta('twitter:creator', data.author || '@nashetajohn');

    // Article specific tags (for blog posts)
    if (data.type === 'article' && data.publishedTime) {
      this.updateMeta('article:published_time', data.publishedTime);
      if (data.modifiedTime) {
        this.updateMeta('article:modified_time', data.modifiedTime);
      }
      if (data.section) {
        this.updateMeta('article:section', data.section);
      }
      if (data.tags) {
        data.tags.forEach(tag => {
          this.updateMeta('article:tag', tag);
        });
      }
    }
  }

  /**
   * Set default SEO for homepage
   */
  setHomeData(): void {
    this.setPageData({
      title: 'iGamingUbuntu — Senior iGaming Content Strategist',
      description: 'Senior iGaming Content Strategist with 10+ years driving casino & sports betting SEO performance across African, European, and global markets. Trusted by iGaming Afrika, Casino.com, SportsBoom & more.',
      keywords: 'iGaming content writer, casino content strategist, sports betting content, African iGaming market, Kenya gambling content, MGA UKGC compliance writing, Nasheta John',
      url: '/',
      type: 'website',
    });
  }

  /**
   * Set SEO for blog posts
   */
  setBlogPostData(data: {
    title: string;
    description: string;
    slug: string;
    image?: string;
    author?: string;
    publishedTime?: string;
    category?: string;
    tags?: string[];
  }): void {
    this.setPageData({
      title: data.title,
      description: data.description,
      image: data.image,
      url: `/blog/${data.slug}`,
      type: 'article',
      author: data.author || 'Nasheta John',
      canonicalUrl: `${this.baseUrl}/blog/${data.slug}`,
      publishedTime: data.publishedTime,
      section: data.category,
      tags: data.tags,
      keywords: `${data.title}, iGaming blog, casino content, sports betting, African iGaming market`,
    });
  }

  /**
   * Set SEO for portfolio items
   */
  setPortfolioData(data: {
    title: string;
    description: string;
    slug: string;
    image?: string;
  }): void {
    this.setPageData({
      title: data.title,
      description: data.description,
      image: data.image,
      url: `/portfolio/${data.slug}`,
      type: 'website',
      keywords: `${data.title}, iGaming portfolio, casino reviews, sports betting content, content strategy`,
    });
  }

  /**
   * Set SEO for static pages
   */
  setStaticPageData(data: {
    title: string;
    description: string;
    url: string;
  }): void {
    this.setPageData({
      title: data.title,
      description: data.description,
      url: data.url,
      type: 'website',
    });
  }

  /**
   * Add JSON-LD schema markup for Person
   */
  addPersonSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Nasheta John',
      'jobTitle': 'Senior iGaming Content Strategist',
      'description': '10+ years driving casino & sports betting SEO performance across African, European, and global markets.',
      'url': this.baseUrl,
      'sameAs': [
        'https://www.linkedin.com/in/nashetajohnigaming/',
        'https://twitter.com/igamingubuntu',
      ],
      'knowsAbout': [
        'iGaming SEO',
        'Casino Content Strategy',
        'Sports Betting Content',
        'African iGaming Markets',
        'MGA/UKGC Compliance Writing',
        'Responsible Gambling Content',
      ],
    };
    this.injectSchema(schema);
  }

  /**
   * Add JSON-LD schema markup for BlogPosting
   */
  addBlogPostingSchema(data: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    image?: string;
    url: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': data.headline,
      'description': data.description,
      'datePublished': data.datePublished,
      'dateModified': data.dateModified || data.datePublished,
      'author': {
        '@type': 'Person',
        'name': data.author,
      },
      'image': data.image || this.defaultImage,
      'url': `${this.baseUrl}${data.url}`,
      'publisher': {
        '@type': 'Organization',
        'name': 'iGamingUbuntu',
        'logo': {
          '@type': 'ImageObject',
          'url': `${this.baseUrl}/assets/images/logo.png`,
        },
      },
    };
    this.injectSchema(schema);
  }

  /**
   * Inject schema markup into the page
   */
  private injectSchema(schema: object): void {
    // Remove existing schema if present
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Create new schema script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /**
   * Update a meta tag
   */
  private updateMeta(name: string, content: string, type: 'name' | 'property' | 'link' = 'name'): void {
    if (type === 'link') {
      // Handle canonical link
      let link = document.querySelector(`link[rel="canonical"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', content);
    } else {
      this.meta.updateTag({ name, content });
      if (type === 'property') {
        this.meta.updateTag({ property: name, content });
      }
    }
  }

  /**
   * Reset to default meta tags
   */
  resetToDefault(): void {
    this.setHomeData();
    this.addPersonSchema();
  }
}