import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    private readonly gaMeasurementId = 'G-XXXXXXXXXX'; // Replace with actual GA4 Measurement ID
    private isBrowser: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private router: Router
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        if (this.isBrowser) {
            this.initGoogleAnalytics();
            this.trackPageViews();
        }
    }

    private initGoogleAnalytics(): void {
        // Load GA4 script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaMeasurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        const gtagScript = document.createElement('script');
        gtagScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.gaMeasurementId}', {
        page_path: window.location.pathname,
      });
    `;
        document.head.appendChild(gtagScript);
    }

    private trackPageViews(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.trackPageView(event.urlAfterRedirects);
        });
    }

    private trackPageView(url: string): void {
        if (this.isBrowser && (window as any).gtag) {
            (window as any).gtag('config', this.gaMeasurementId, {
                page_path: url,
            });
        }
    }

    public trackEvent(category: string, action: string, label?: string, value?: number): void {
        if (this.isBrowser && (window as any).gtag) {
            (window as any).gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    }

    public trackAffiliateClick(linkUrl: string, linkName: string, position?: string): void {
        this.trackEvent('Affiliate', 'Click', `${linkName} - ${position || 'inline'}`, 1);

        // Also track as outbound link
        this.trackEvent('Outbound', 'Click', linkUrl, 1);
    }

    public trackContactFormSubmit(formType: string): void {
        this.trackEvent('Contact', 'Form Submit', formType, 1);
    }

    public trackPhoneClick(phoneNumber: string): void {
        this.trackEvent('Contact', 'Phone Click', phoneNumber, 1);
    }

    public trackEmailClick(email: string): void {
        this.trackEvent('Contact', 'Email Click', email, 1);
    }

    public trackWhatsAppClick(): void {
        this.trackEvent('Contact', 'WhatsApp Click', 'WhatsApp Button', 1);
    }

    public trackTelegramClick(): void {
        this.trackEvent('Contact', 'Telegram Click', 'Telegram Button', 1);
    }

    public trackBlogRead(slug: string, title: string): void {
        this.trackEvent('Blog', 'Read', `${title} (${slug})`, 1);
    }

    public trackPortfolioView(projectName: string): void {
        this.trackEvent('Portfolio', 'View', projectName, 1);
    }

    public trackServiceClick(serviceName: string): void {
        this.trackEvent('Services', 'Click', serviceName, 1);
    }

    public trackCTAClick(ctaName: string, position: string): void {
        this.trackEvent('CTA', 'Click', `${ctaName} - ${position}`, 1);
    }

    public trackDownload(fileName: string): void {
        this.trackEvent('Download', 'Click', fileName, 1);
    }

    public trackSocialShare(platform: string, pageUrl: string): void {
        this.trackEvent('Social', 'Share', `${platform} - ${pageUrl}`, 1);
    }
}