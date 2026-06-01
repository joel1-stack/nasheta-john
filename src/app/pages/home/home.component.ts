import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  stats = [
    { val: 10, suffix: '+', label: 'Years Experience' },
    { val: 120, suffix: '+', label: 'Clients Served' },
    { val: 850, suffix: '+', label: 'Projects Completed' },
    { val: 15, suffix: '', label: 'Markets Covered' },
  ];

  testimonials = [
    {
      name: 'Marcus Olof',
      role: 'CEO, SportsBoom Media',
      text: 'Nasheta\'s ability to translate complex sports betting concepts into clear, engaging copy is exceptional. Our conversion rates improved by 34% within three months.',
      avatar: 'MO',
      color: 'red',
      bg: 'linear-gradient(135deg, #E11D48, #BE123C)'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Content, Kadabra Gaming',
      text: 'Working with Nasheta has been a game-changer for our iGaming content strategy. Her deep understanding of the African market gave us a real competitive edge.',
      avatar: 'PS',
      color: 'purple',
      bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
    },
    {
      name: 'James Kamau',
      role: 'HR Director, iGaming Afrika',
      text: 'In ten years of hiring content professionals, Nasheta stands out for her research depth and ability to meet tight deadlines without compromising quality.',
      avatar: 'JK',
      color: 'gold',
      bg: 'linear-gradient(135deg, #F59E0B, #D97706)'
    },
    {
      name: 'Elena Vovk',
      role: 'Content Manager, Lipsnini Agency',
      text: 'Nasheta delivered casino review content across three languages and multiple regulatory markets simultaneously. The accuracy and tone consistency was flawless.',
      avatar: 'EV',
      color: 'pink',
      bg: 'linear-gradient(135deg, #EC4899, #DB2777)'
    },
    {
      name: 'David Ndung\'u',
      role: 'CEO, Bideford Digital',
      text: 'Her work on our eSports betting content helped us reach a younger demographic that was previously hard to engage. The content felt authentic and drove real interaction.',
      avatar: 'DN',
      color: 'red',
      bg: 'linear-gradient(135deg, #E11D48, #BE123C)'
    },
    {
      name: 'Sophie Laurent',
      role: 'Marketing Director, Casino.com',
      text: 'Nasheta brings a rare combination of SEO expertise and genuine iGaming knowledge. Her slot review templates became the internal standard for our entire content team.',
      avatar: 'SL',
      color: 'purple',
      bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
    }
  ];

  brands = [
    'iGaming Afrika', 'Casino.com', 'Bideford Digital', 'Lipsnini Agency',
    'SportsBoom Media', 'Gorilla Gaming', 'Kadabra Gaming', 'Cobber Casino',
    'Kenya Bet', 'AfricaBet'
  ];

  portfolio = [
    { icon: '🎰', name: 'Casino Reviews', metric: '+156% organic visibility', color: 'red' },
    { icon: '🎲', name: 'Slot Reviews', metric: '3 → 18 featured snippets', color: 'purple' },
    { icon: '⚽', name: 'Sports Betting', metric: '+280% traffic growth', color: 'pink' },
    { icon: '🏆', name: 'Sweepstakes', metric: '12K → 45K monthly visitors', color: 'gold' },
    { icon: '🎮', name: 'eSports Content', metric: '+34% conversion rate', color: 'purple' },
    { icon: '🔗', name: 'Outreach Posts', metric: '2.1% → 6.8% CTR', color: 'red' },
  ];

  ngOnInit() { }

  ngAfterViewInit() {
    this.animateCounters();
    this.setupReveal();
  }

  setupReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  animateCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset['count'] || '0');
          const suffix = el.dataset['suffix'] || '';
          let current = 0;
          const step = target / (1800 / 16);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current) + suffix;
          }, 16);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(el => observer.observe(el));
  }
}
