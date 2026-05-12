import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  contactOpen = false;
  private clickCount = 0;
  private clickTimer: any;

  contacts = [
    { icon: 'tg', abbr: 'T',  label: 'Telegram', value: '@salvagejohn',          href: 'https://t.me/salvagejohn' },
    { icon: 'wa', abbr: 'W',  label: 'WhatsApp', value: '+254 112 157 383',      href: 'https://wa.me/254112157383' },
    { icon: 'em', abbr: '@',  label: 'Email',    value: 'nashetajohn@gmail.com', href: 'mailto:nashetajohn@gmail.com' },
    { icon: 'li', abbr: 'in', label: 'LinkedIn', value: 'nashetajohnigaming',    href: 'https://www.linkedin.com/in/nashetajohnigaming/' },
  ];

  constructor(private router: Router) {}

  toggle() { this.contactOpen = !this.contactOpen; }

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
