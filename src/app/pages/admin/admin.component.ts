import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="admin-overlay">
      <button class="close-btn" (click)="closeAdmin()">✕</button>
      <iframe [src]="adminUrl" frameborder="0" class="admin-iframe" title="Blog Admin"></iframe>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .admin-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: #0a2840;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .close-btn {
      position: absolute; top: 16px; right: 16px;
      width: 40px; height: 40px; border-radius: 50%;
      background: #C9A227; color: #0A0F0D;
      border: none; font-size: 18px; cursor: pointer;
      z-index: 100000; transition: all 0.3s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .close-btn:hover { transform: rotate(90deg); background: #E8BF50; }
    .admin-iframe { width: 100%; height: 100%; border: none; display: block; }
  `]
})
export class AdminComponent implements OnInit, OnDestroy {
  adminUrl: SafeResourceUrl;
  private keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') this.closeAdmin(); };

  constructor(private sanitizer: DomSanitizer) {
    this.adminUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/admin/blog-tool.html');
  }

  ngOnInit() { document.body.style.overflow = 'hidden'; document.addEventListener('keydown', this.keyHandler); }
  ngOnDestroy() { document.body.style.overflow = ''; document.removeEventListener('keydown', this.keyHandler); }
  closeAdmin() { window.history.back(); }
}
