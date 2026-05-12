import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  tools = [
    { name: 'Asana',           cat: 'Project Management' },
    { name: 'ClickUp',         cat: 'Project Management' },
    { name: 'Trello',          cat: 'Project Management' },
    { name: 'Slack',           cat: 'Communication' },
    { name: 'Telegram',        cat: 'Communication' },
    { name: 'Microsoft Teams', cat: 'Communication' },
    { name: 'Monday.com',      cat: 'Project Management' },
    { name: 'Zoho',            cat: 'CRM' },
    { name: 'Google Suite',    cat: 'Productivity' },
    { name: 'Microsoft 365',   cat: 'Productivity' },
    { name: 'Grammarly',       cat: 'Writing' },
    { name: 'ChatGPT',         cat: 'AI' },
    { name: 'Claude',          cat: 'AI' },
    { name: 'N8N',             cat: 'Automation' },
    { name: 'SurferSEO',       cat: 'SEO' },
    { name: 'Contadu',         cat: 'SEO' },
  ];

  technical = [
    { skill: 'Content Writing & Editing',  level: 98 },
    { skill: 'SEO Optimisation',           level: 90 },
    { skill: 'iGaming Industry Knowledge', level: 96 },
    { skill: 'Email Marketing',            level: 82 },
    { skill: 'Sales Copywriting',          level: 88 },
    { skill: 'Social Media Content',       level: 80 },
    { skill: 'Research & Analysis',        level: 92 },
  ];

  personal = [
    'Communication',
    'Attention to Detail',
    'Teamwork',
    'Organisation',
    'Analytical Thinking',
    'Adaptability',
    'Time Management',
    'Problem Solving',
  ];

  languages = [
    { lang: 'English',  level: 'Native / Fluent', pct: 100 },
    { lang: 'Kiswahili', level: 'Native',          pct: 100 },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
