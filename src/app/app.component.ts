import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
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
    <app-footer></app-footer>
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
      font-family: 'Syne', sans-serif;
      font-weight: 900; font-size: 1.6rem;
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
      background: linear-gradient(90deg, transparent, #E11D48, #F59E0B, #8B5CF6, transparent);
      animation: plMove 900ms ease-in-out infinite;
    }
    @keyframes plMove {
      0%   { transform: translateX(-80%); }
      100% { transform: translateX(280%); }
    }
  `]
})
export class AppComponent {
  loading = true;
  private pendingOff: number | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
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
    window.setTimeout(() => (this.loading = false), 600);
  }
}
