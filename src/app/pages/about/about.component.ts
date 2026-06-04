import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PortfolioItem {
  title: string;
  metric: string;
  image: string;
  link: string;
}

interface CareerJob {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  portfolioItems: PortfolioItem[] = [
    { title: 'Casino Reviews', metric: '+156% organic visibility', image: 'assets/images/online casino website.jpg', link: '/about' },
    { title: 'Slot Reviews', metric: '3 → 18 featured snippets', image: 'assets/images/slot game interface.jpg', link: '/about' },
    { title: 'Sports Betting', metric: '+280% traffic growth', image: 'assets/images/sports betting app.jpg', link: '/about' },
    { title: 'Sweepstakes', metric: '12K → 45K monthly visitors', image: 'assets/images/sweepstakes coins.jpg', link: '/about' },
    { title: 'eSports Content', metric: '+34% conversion rate', image: 'assets/images/esports betting.jpg', link: '/about' },
    { title: 'Outreach Posts', metric: '2.1% → 6.8% CTR', image: 'assets/images/guest posting.jpg', link: '/about' }
  ];

  careerTimeline: CareerJob[] = [
    { period: '2024 – Present', title: 'iGaming Content Specialist', company: 'Freelance / Multiple Agencies', location: 'Remote — Nairobi, Kenya', description: 'Operating as an independent iGaming content specialist, serving operators, affiliates, and content agencies across African and global markets.', tags: ['Strategy', 'Leadership', 'Multi-market', 'Consulting'] },
    { period: '2022 – 2024', title: 'Content Lead & Project Manager', company: 'iGaming Afrika', location: 'Nairobi, Kenya', description: 'Led a team of six writers producing daily iGaming content for African-focused platforms. Introduced content templates that reduced revision cycles by 40%.', tags: ['Team Leadership', 'Editorial', 'Africa-focus', 'Project Management'] },
    { period: '2020 – 2022', title: 'Senior Editor', company: 'SportsBoom Media', location: 'Remote', description: 'Edited and refined sports betting and casino content. Maintained brand voice consistency across English and Swahili content streams.', tags: ['Editing', 'Sports Betting', 'Bilingual', 'Quality Control'] },
    { period: '2018 – 2020', title: 'Copywriter', company: 'Kadabra Gaming Agency', location: 'Remote', description: 'Produced promotional copy, landing pages, and email campaigns for online casino and sports betting clients.', tags: ['Copywriting', 'CRO', 'Email Marketing', 'Landing Pages'] },
    { period: '2016 – 2018', title: 'Content Writer', company: 'Bideford Digital', location: 'Nairobi, Kenya', description: 'Joined as a junior writer covering digital marketing before specialising in online gambling content.', tags: ['Content Writing', 'SEO', 'Research', 'iGaming Entry'] },
    { period: '2014 – 2016', title: 'Content Writer', company: 'Freelance', location: 'Nairobi, Kenya', description: 'Began professional writing career producing blog content across sports, technology, and entertainment niches.', tags: ['Freelance', 'Writing', 'Sports', 'Technology'] }
  ];

  skillCategories: SkillCategory[] = [
    { name: 'Content Creation', skills: [{ name: 'Casino & Slot Reviews', level: 98 }, { name: 'Sports Betting Guides', level: 95 }, { name: 'SEO Content Writing', level: 92 }, { name: 'Technical Writing', level: 88 }] },
    { name: 'SEO & Analytics', skills: [{ name: 'Keyword Research', level: 95 }, { name: 'On-Page SEO', level: 93 }, { name: 'Content Strategy', level: 90 }, { name: 'Performance Reporting', level: 85 }] },
    { name: 'Market Expertise', skills: [{ name: 'African Markets', level: 97 }, { name: 'European Regulations', level: 88 }, { name: 'Responsible Gambling', level: 95 }, { name: 'Multi-Jurisdiction', level: 90 }] }
  ];

  tools: string[] = ['Ahrefs', 'SEMrush', 'WordPress', 'Yoast SEO', 'Google Search Console', 'Google Analytics 4', 'Surfer SEO', 'Grammarly', 'Copyscape', 'Asana', 'Slack', 'Notion', 'Figma', 'Canva'];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
