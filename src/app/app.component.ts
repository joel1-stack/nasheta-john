import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar *ngIf="showSiteChrome"></app-navbar>
    <main>
      <div class="page-loader" [class.on]="loading" aria-hidden="true">
        <div class="pl-inner">
          <div class="pl-brand">
            <span class="pl-i">i</span><span class="pl-g">G</span><span class="pl-u">U</span>
          </div>
          <div class="pl-bar"><span></span></div>
        </div>
      </div>
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="showSiteChrome"></app-footer>

    <div class="cookie-banner" *ngIf="showCookieConsent">
      <p class="cb-text">We use cookies to track unique blog views and improve your experience. By continuing, you accept our cookie use.</p>
      <button class="cb-btn" (click)="dismissCookieConsent()">Got it</button>
    </div>
  `,
  styles: [`
    :host { display: block; background: #FFFFFF; }
    main { min-height: 100vh; padding-top: 0; background: #FFFFFF; }

    .page-loader {
      position: fixed; inset: 0; z-index: 1500;
      pointer-events: none; opacity: 0;
      transition: opacity 250ms ease;
      background: #FFFFFF;
      display: flex; align-items: center; justify-content: center;
    }
    .page-loader.on { opacity: 1; pointer-events: all; }

    .pl-inner {
      display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
    }

    .pl-brand {
      font-family: 'Playfair Display', serif;
      font-weight: 700; font-size: 1.6rem;
      letter-spacing: -0.02em;
      display: flex; align-items: center;
    }
    .pl-i { color: #E11D48; }
    .pl-g { color: #0F172A; }
    .pl-u { color: #F59E0B; }

    .pl-bar {
      width: 180px; height: 3px;
      border-radius: 999px; overflow: hidden;
      background: #E2E8F0;
    }
    .pl-bar span {
      display: block; height: 100%; width: 40%;
      border-radius: 999px;
      background: linear-gradient(90deg, transparent, #2563EB, #1E40AF, transparent);
      animation: plMove 900ms ease-in-out infinite;
    }
    @keyframes plMove {
      0%   { transform: translateX(-80%); }
      100% { transform: translateX(280%); }
    }

    .cookie-banner {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9998;
      background: #0F172A; color: #fff; padding: 14px 24px;
      display: flex; align-items: center; justify-content: center; gap: 20px;
      flex-wrap: wrap; font-family: 'Inter', sans-serif; font-size: 13px;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
    }
    .cb-text { margin: 0; color: rgba(255,255,255,0.7); line-height: 1.5; }
    .cb-btn {
      background: #E11D48; color: #fff; border: none;
      padding: 8px 20px; border-radius: 8px; cursor: pointer;
      font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px;
      white-space: nowrap; transition: background 0.2s;
    }
    .cb-btn:hover { background: #BE123C; }
  `]
})
export class AppComponent {
  loading = true;
  showSiteChrome = true;
  showCookieConsent = !localStorage.getItem('igu_cookies_accepted');
  private pendingOff: number | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.urlAfterRedirects || e.url;
        this.showSiteChrome = !url.startsWith('/blog');
      }
      if (e instanceof NavigationStart) {
        this.loading = true;
        if (this.pendingOff) window.clearTimeout(this.pendingOff);
        return;
      }
      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        if (this.pendingOff) window.clearTimeout(this.pendingOff);
        this.pendingOff = window.setTimeout(() => (this.loading = false), 200);
      }
    });
    this.showSiteChrome = !this.router.url.startsWith('/blog');
    window.setTimeout(() => (this.loading = false), 600);
  }

  dismissCookieConsent() {
    localStorage.setItem('igu_cookies_accepted', 'true');
    this.showCookieConsent = false;
  }
}
