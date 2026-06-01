import { Injectable } from '@angular/core';

export interface AffiliateLink {
    id: string;
    name: string;
    url: string;
    category: 'casino' | 'sportsbook' | 'tool' | 'service' | 'other';
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    disclosure?: string;
    active: boolean;
    clicks?: number;
    conversions?: number;
    revenue?: number;
}

@Injectable({ providedIn: 'root' })
export class AffiliateService {
    private readonly defaultUtmParams = {
        source: 'igamingubuntu',
        medium: 'referral',
    };

    private affiliateLinks: AffiliateLink[] = [
        // Add your affiliate links here
        {
            id: '1',
            name: 'Casino Partner A',
            url: 'https://casino-partner-a.com',
            category: 'casino',
            utmCampaign: 'blog_review',
            active: true,
        },
        {
            id: '2',
            name: 'Sportsbook Partner B',
            url: 'https://sportsbook-partner-b.com',
            category: 'sportsbook',
            utmCampaign: 'betting_guide',
            active: true,
        },
    ];

    /**
     * Append UTM tracking parameters to an affiliate URL
     */
    appendUtmTracking(
        url: string,
        campaign: string,
        source?: string,
        medium?: string
    ): string {
        const separator = url.includes('?') ? '&' : '?';
        const utmSource = source || this.defaultUtmParams.source;
        const utmMedium = medium || this.defaultUtmParams.medium;

        return `${url}${separator}utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${campaign}`;
    }

    /**
     * Get tracked URL for an affiliate link
     */
    getTrackedUrl(link: AffiliateLink): string {
        if (!link.active) return '#';

        const campaign = link.utmCampaign || link.id;
        const source = link.utmSource || this.defaultUtmParams.source;
        const medium = link.utmMedium || this.defaultUtmParams.medium;

        return this.appendUtmTracking(link.url, campaign, source, medium);
    }

    /**
     * Get affiliate links by category
     */
    getLinksByCategory(category: AffiliateLink['category']): AffiliateLink[] {
        return this.affiliateLinks.filter(
            (link) => link.category === category && link.active
        );
    }

    /**
     * Get all active affiliate links
     */
    getActiveLinks(): AffiliateLink[] {
        return this.affiliateLinks.filter((link) => link.active);
    }

    /**
     * Add a new affiliate link
     */
    addLink(link: Omit<AffiliateLink, 'id'>): AffiliateLink {
        const newLink: AffiliateLink = {
            ...link,
            id: `link-${Date.now()}`,
        };
        this.affiliateLinks.push(newLink);
        return newLink;
    }

    /**
     * Update an existing affiliate link
     */
    updateLink(id: string, updates: Partial<AffiliateLink>): boolean {
        const index = this.affiliateLinks.findIndex((link) => link.id === id);
        if (index === -1) return false;

        this.affiliateLinks[index] = { ...this.affiliateLinks[index], ...updates };
        return true;
    }

    /**
     * Delete an affiliate link
     */
    deleteLink(id: string): boolean {
        const index = this.affiliateLinks.findIndex((link) => link.id === id);
        if (index === -1) return false;

        this.affiliateLinks.splice(index, 1);
        return true;
    }

    /**
     * Track a click on an affiliate link
     */
    trackClick(linkId: string): void {
        const link = this.affiliateLinks.find((l) => l.id === linkId);
        if (link) {
            link.clicks = (link.clicks || 0) + 1;
        }
    }

    /**
     * Get disclosure text for affiliate links
     */
    getDisclosureText(): string {
        return 'Some links on this site are affiliate links. This means if you click on them and make a purchase or sign up, we may earn a commission at no extra cost to you. This helps support our work and allows us to continue providing valuable content.';
    }

    /**
     * Check if a URL is an affiliate link
     */
    isAffiliateLink(url: string): boolean {
        return this.affiliateLinks.some(
            (link) => link.url === url || url.includes(link.url.replace('https://', '').replace('http://', ''))
        );
    }

    /**
     * Get affiliate link stats
     */
    getStats(): { totalClicks: number; totalLinks: number; activeLinks: number } {
        const activeLinks = this.affiliateLinks.filter((l) => l.active);
        const totalClicks = activeLinks.reduce(
            (sum, link) => sum + (link.clicks || 0),
            0
        );

        return {
            totalClicks,
            totalLinks: this.affiliateLinks.length,
            activeLinks: activeLinks.length,
        };
    }

    /**
     * Export affiliate links as JSON
     */
    exportAsJson(): string {
        return JSON.stringify(this.affiliateLinks, null, 2);
    }

    /**
     * Import affiliate links from JSON
     */
    importFromJson(json: string): boolean {
        try {
            const links = JSON.parse(json) as AffiliateLink[];
            if (Array.isArray(links)) {
                this.affiliateLinks = links;
                return true;
            }
        } catch (e) {
            console.error('Failed to import affiliate links:', e);
        }
        return false;
    }
}