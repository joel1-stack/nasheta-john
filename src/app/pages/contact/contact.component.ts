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
  form = { firstName: '', lastName: '', email: '', message: '' };
  submitted = false;
  sending = false;

  contacts = [
    { icon: 'tg', abbr: 'T',  label: 'Telegram',  value: '@salvagejohn',           href: 'https://t.me/salvagejohn' },
    { icon: 'wa', abbr: 'W',  label: 'WhatsApp',  value: '+254 112 157 383',       href: 'https://wa.me/254112157383' },
    { icon: 'em', abbr: '@',  label: 'Email',     value: 'nashetajohn@gmail.com',  href: 'mailto:nashetajohn@gmail.com' },
    { icon: 'li', abbr: 'in', label: 'LinkedIn',  value: 'nashetajohnigaming',     href: 'https://www.linkedin.com/in/nashetajohnigaming/' },
    { icon: 'ms', abbr: 'M',  label: 'Teams',     value: 'salvagekyalo@gmail.com', href: 'mailto:salvagekyalo@gmail.com' },
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

    const subject = `Portfolio Enquiry from ${this.form.firstName} ${this.form.lastName}`.trim();
    const body = [
      `Name: ${this.form.firstName} ${this.form.lastName}`.trim(),
      `Email: ${this.form.email}`,
      ``,
      `Message:`,
      this.form.message
    ].join('\n');

    window.open(
      `https://mail.google.com/mail/?view=cm&to=nashetajohn@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
      this.form = { firstName: '', lastName: '', email: '', message: '' };
    }, 600);
  }
}
