import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AffiliateLinkService {
  private readonly utmParams = {
    source: 'igamingubuntu',
    medium: 'blog',
  };

  /**
   * Appends UTM tracking parameters to a URL for affiliate link tracking
   * @param url - The affiliate URL to track
   * @param campaign - Campaign name (usually post slug or category)
   * @returns URL with appended UTM parameters
   */
  appendTracking(url: string, campaign: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return (
      `${url}${separator}utm_source=${this.utmParams.source}` +
      `&utm_medium=${this.utmParams.medium}&utm_campaign=${campaign}`
    );
  }

  /**
   * Extract base domain from a URL
   * @param url - The URL to parse
   * @returns Base domain (e.g., 'casino.com' from 'https://casino.com/page')
   */
  getBaseDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  /**
   * Track a click event for affiliate links (GA4 integration)
   * @param url - The affiliate URL clicked
   * @param label - Human-readable label for the link
   */
  trackAffiliateClick(url: string, label: string): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_click', {
        affiliate_url: url,
        affiliate_label: label,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Create a formatted affiliate link disclosure
   * @returns HTML string for disclosure notice
   */
  getAffiliateDisclosure(): string {
    return `<p class="affiliate-disclosure">
      <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. 
      We may earn a commission if you make a purchase through these links at no extra cost to you.
    </p>`;
  }
}
