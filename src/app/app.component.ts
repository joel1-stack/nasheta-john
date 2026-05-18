import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <video class="site-bg-video" autoplay muted loop playsinline>
      <source src="https://res.cloudinary.com/REPLACE_WITH_YOUR_CLOUD_NAME/video/upload/background.mp4" type="video/mp4">
    </video>
    <div class="site-bg-overlay"></div>
    <app-navbar></app-navbar>
    <main>
      <div class="page-loader" [class.on]="loading" aria-hidden="true">
        <div class="pl-inner">
          <div class="pl-brand">NJ</div>
          <div class="pl-bar"><span></span></div>
        </div>
      </div>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host { display: block; position: relative; }
    .site-bg-video {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -2;
    }
    .site-bg-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10,15,13,0.78);
      z-index: -1;
    }
    main { min-height: 100vh; padding-top: 0; }
    .page-loader {
      position: fixed;
      inset: 0;
      z-index: 1500;
      pointer-events: none;
      opacity: 0;
      transition: opacity 280ms cubic-bezier(0.4,0,0.2,1);
      background: radial-gradient(ellipse 90% 70% at 35% 25%, rgba(58,168,106,0.18) 0%, transparent 60%),
                  radial-gradient(ellipse 70% 55% at 70% 70%, rgba(201,162,39,0.14) 0%, transparent 55%),
                  #0A0F0D;
      backdrop-filter: blur(14px);
    }
    .page-loader.on { opacity: 1; }
    .pl-inner {
      height: 100%;
      display: grid;
      place-content: center;
      gap: 1rem;
    }
    .pl-brand {
      width: 58px;
      height: 58px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #fff;
      background: linear-gradient(135deg, #1e5c3a, #3aa86a);
      box-shadow: 0 14px 40px rgba(0,0,0,0.5);
    }
    .pl-bar {
      width: 220px;
      height: 2px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(11,21,16,0.10);
      border: 1px solid rgba(11,21,16,0.08);
    }
    .pl-bar span {
      display: block;
      height: 100%;
      width: 45%;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(201,162,39,0.0), rgba(201,162,39,0.9), rgba(58,168,106,0.9), rgba(201,162,39,0.0));
      animation: plMove 900ms ease-in-out infinite;
    }
    @keyframes plMove {
      0% { transform: translateX(-60%); opacity: 0.6; }
      50% { opacity: 1; }
      100% { transform: translateX(240%); opacity: 0.6; }
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
        this.pendingOff = window.setTimeout(() => (this.loading = false), 220);
      }
    });

    // First paint: keep it for a short beat so the opening feels premium (Content Lab-like).
    window.setTimeout(() => (this.loading = false), 650);
  }
}
