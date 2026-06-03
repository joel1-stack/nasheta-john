import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  form = { firstName: '', lastName: '', email: '', projectType: '', budget: '', message: '' };
  submitted = false;
  sending = false;

  contacts = [
    { icon: 'tg', abbr: 'T', label: 'Telegram', value: '@salvagejohn', href: 'https://t.me/salvagejohn' },
    { icon: 'wa', abbr: 'W', label: 'WhatsApp', value: '+254 112 157 383', href: 'https://wa.me/254112157383' },
    { icon: 'em', abbr: '@', label: 'Email', value: 'info@igamingubuntu.com', href: 'mailto:info@igamingubuntu.com' },
    { icon: 'li', abbr: 'in', label: 'LinkedIn', value: 'nashetajohnigaming', href: 'https://www.linkedin.com/in/nashetajohnigaming/' },
    { icon: 'ms', abbr: 'M', label: 'Teams', value: 'info@igamingubuntu.com', href: 'mailto:info@igamingubuntu.com' },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  onSubmit() {
    if (!this.form.firstName || !this.form.email || !this.form.message) return;
    this.sending = true;

    const subject = `iGamingUbuntu Enquiry from ${this.form.firstName} ${this.form.lastName}`.trim();
    const body = [
      `Name: ${this.form.firstName} ${this.form.lastName}`.trim(),
      `Email: ${this.form.email}`,
      `Project Type: ${this.form.projectType || 'Not specified'}`,
      `Budget: ${this.form.budget || 'Not specified'}`,
      ``,
      `Message:`,
      this.form.message
    ].join('\n');

    window.open(
      `https://mail.google.com/mail/?view=cm&to=info@igamingubuntu.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
      this.form = { firstName: '', lastName: '', email: '', projectType: '', budget: '', message: '' };
    }, 600);
  }
}
