import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  contactOpen = false;
  newsletterEmail = '';
  newsletterSent = false;
  private clickCount = 0;
  private clickTimer: any;

  contacts = [
    { icon: 'tg', abbr: 'T', label: 'Telegram', value: '@salvagejohn', href: 'https://t.me/salvagejohn' },
    { icon: 'wa', abbr: 'W', label: 'WhatsApp', value: '+254 112 157 383', href: 'https://wa.me/254112157383' },
    { icon: 'em', abbr: '@', label: 'Email', value: 'info@igamingubuntu.com', href: 'mailto:info@igamingubuntu.com' },
    { icon: 'li', abbr: 'in', label: 'LinkedIn', value: 'nashetajohnigaming', href: 'https://www.linkedin.com/in/nashetajohnigaming/' },
  ];

  constructor(private router: Router) { }

  toggle() { this.contactOpen = !this.contactOpen; }

  subscribeNewsletter(e: Event) {
    e.preventDefault();
    if (!this.newsletterEmail) return;
    // Opens mailto with pre-filled subject — can be replaced with a real API
    const subject = encodeURIComponent('Newsletter Subscription Request');
    const body = encodeURIComponent(`Please add ${this.newsletterEmail} to the iGamingUbuntu newsletter.`);
    window.open(`mailto:info@igamingubuntu.com?subject=${subject}&body=${body}`, '_blank');
    this.newsletterSent = true;
    this.newsletterEmail = '';
    setTimeout(() => { this.newsletterSent = false; }, 5000);
  }

  onSecretClick() {
    this.clickCount++;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { this.clickCount = 0; }, 2000);
    if (this.clickCount >= 5) {
      this.clickCount = 0;
      clearTimeout(this.clickTimer);
      this.router.navigate(['/admin-secret-panel']);
    }
  }
}
