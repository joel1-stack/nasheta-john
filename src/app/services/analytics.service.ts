import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private GA_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

  /**
   * Initialize Google Analytics 4
   */
  init(gaId: string): void {
    this.GA_ID = gaId;
    this.loadGA();
  }

  /**
   * Load Google Analytics 4 script
   */
  private loadGA(): void {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_ID}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', this.GA_ID, {
      page_path: window.location.pathname,
    });
  }

  /**
   * Track page view event
   * @param pagePath - The page path to track
   * @param pageTitle - The page title
   */
  trackPageView(pagePath: string, pageTitle: string): void {
    this.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  /**
   * Track custom event
   * @param eventName - Name of the event
   * @param eventData - Event data object
   */
  trackEvent(eventName: string, eventData?: Record<string, any>): void {
    this.gtag('event', eventName, eventData);
  }

  /**
   * Track blog post view
   * @param blogTitle - Title of the blog post
   * @param blogSlug - Slug of the blog post
   * @param author - Author name
   */
  trackBlogView(blogTitle: string, blogSlug: string, author: string): void {
    this.gtag('event', 'blog_view', {
      blog_title: blogTitle,
      blog_slug: blogSlug,
      author: author,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track blog scroll depth
   * @param scrollPercent - Scroll percentage (0-100)
   */
  trackScrollDepth(scrollPercent: number): void {
    this.gtag('event', 'scroll_depth', {
      scroll_percent: scrollPercent,
    });
  }

  /**
   * Track form submission
   * @param formName - Name of the form (e.g., 'contact', 'newsletter')
   */
  trackFormSubmission(formName: string): void {
    this.gtag('event', 'form_submit', {
      form_name: formName,
    });
  }

  /**
   * Track link click
   * @param linkUrl - URL of the link
   * @param linkText - Text of the link
   */
  trackLinkClick(linkUrl: string, linkText: string): void {
    this.gtag('event', 'link_click', {
      link_url: linkUrl,
      link_text: linkText,
    });
  }

  /**
   * Internal gtag function
   */
  private gtag(...args: any[]): void {
    if (typeof window === 'undefined' || !(window as any).gtag) return;
    (window as any).gtag(...args);
  }
}
