import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
    { val: 120, suffix: '+', label: 'Clients Served' },
    { val: 10,  suffix: '+', label: 'Years Experience' },
    { val: 850, suffix: '+', label: 'Projects Completed' },
    { val: 38,  suffix: '',  label: 'Author Features' },
  ];

  testimonials = [
    {
      name: 'Marcus Olof',
      role: 'CEO, SportsBoom Media',
      text: 'Nasheta\'s ability to translate complex sports betting concepts into clear, engaging copy is exceptional. Our conversion rates improved by 34% within three months of bringing her on board.',
      avatar: 'MO'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Content, Kadabra Gaming',
      text: 'Working with Nasheta has been a game-changer for our iGaming content strategy. Her deep understanding of the African market gave us a competitive edge we didn\'t have before.',
      avatar: 'PS'
    },
    {
      name: 'James Kamau',
      role: 'HR Director, iGaming Afrika',
      text: 'In ten years of hiring content professionals, Nasheta stands out for her research depth and ability to meet tight deadlines without compromising quality. A genuinely rare find in this industry.',
      avatar: 'JK'
    },
    {
      name: 'Elena Vovk',
      role: 'Content Manager, Lipsnini Agency',
      text: 'Nasheta delivered casino review content across three languages and multiple regulatory markets simultaneously. The accuracy and tone consistency was flawless throughout.',
      avatar: 'EV'
    },
    {
      name: 'David Ndung\'u',
      role: 'CEO, Bideford Digital',
      text: 'Her work on our eSports betting content helped us reach a younger demographic that was previously hard to engage. The content felt authentic and drove real user interaction.',
      avatar: 'DN'
    },
    {
      name: 'Sophie Laurent',
      role: 'Marketing Director, Casino.com',
      text: 'Nasheta brings a rare combination of SEO expertise and genuine iGaming knowledge. Her slot review templates became the internal standard for our entire content team.',
      avatar: 'SL'
    }
  ];

  logos = [
    { src: 'assets/logos/igaming-afrika.png', alt: 'iGaming Afrika' },
    { src: 'assets/logos/casino-com.png',     alt: 'Casino.com' },
    { src: 'assets/logos/bideford.png',       alt: 'Bideford' },
    { src: 'assets/logos/lipsnini.png',       alt: 'Lipsnini' },
    { src: 'assets/logos/mrbeast.png',        alt: 'MrBeast News' },
    { src: 'assets/logos/gorilla.png',        alt: 'Gorilla' },
    { src: 'assets/logos/kadabra.png',        alt: 'Kadabra' },
    { src: 'assets/logos/sportsboom.png',     alt: 'SportsBoom' },
  ];

  services = [
    { icon: '✦', title: 'iGaming Content Writing',      desc: 'Casino guides, slot reviews, betting articles, and more — written for real players and search engines alike.' },
    { icon: '◈', title: 'African Market Consultation',   desc: 'Strategic insights into the fast-growing African iGaming market to help your brand capture untapped audiences.' },
    { icon: '◇', title: 'Content Strategy & SEO',        desc: 'Data-driven content roadmaps designed to build authority, increase organic traffic, and outperform competitors.' },
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.animateCounters();
    this.setupReveal();
  }

  setupReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
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
