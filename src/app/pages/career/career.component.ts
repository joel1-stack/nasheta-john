import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent {
  timeline = [
    {
      year: '2024 – Present',
      role: 'iGaming Content Specialist',
      company: 'Freelance / Multiple Agencies',
      location: 'Remote — Nairobi, Kenya',
      desc: 'Operating as an independent iGaming content specialist, serving operators, affiliates, and content agencies across African and global markets. Responsible for strategy, production, and editorial oversight across multiple simultaneous projects.',
      tags: ['Strategy', 'Leadership', 'Multi-market', 'Consulting'],
      current: true
    },
    {
      year: '2022 – 2024',
      role: 'Content Lead & Project Manager',
      company: 'iGaming Afrika',
      location: 'Nairobi, Kenya',
      desc: 'Led a team of six writers producing daily iGaming content for African-focused platforms. Managed editorial calendars, quality reviews, and client relationships. Introduced content templates that reduced revision cycles by 40%.',
      tags: ['Team Leadership', 'Editorial', 'Africa-focus', 'Project Management'],
      current: false
    },
    {
      year: '2020 – 2022',
      role: 'Senior Editor',
      company: 'SportsBoom Media',
      location: 'Remote',
      desc: 'Edited and refined sports betting and casino content produced by an international writer pool. Maintained brand voice consistency across English and Swahili content streams. Also contributed original long-form features and betting guides.',
      tags: ['Editing', 'Sports Betting', 'Bilingual', 'Quality Control'],
      current: false
    },
    {
      year: '2018 – 2020',
      role: 'Copywriter',
      company: 'Kadabra Gaming Agency',
      location: 'Remote',
      desc: 'Produced promotional copy, landing pages, and email campaigns for online casino and sports betting clients. Developed expertise in conversion-focused writing and player acquisition messaging.',
      tags: ['Copywriting', 'CRO', 'Email Marketing', 'Landing Pages'],
      current: false
    },
    {
      year: '2016 – 2018',
      role: 'Content Writer',
      company: 'Bideford Digital',
      location: 'Nairobi, Kenya',
      desc: 'Joined as a junior content writer covering general digital marketing topics before specialising in online gambling content. Produced slot reviews, casino comparisons, and beginner betting guides.',
      tags: ['Content Writing', 'SEO', 'Research', 'iGaming Entry'],
      current: false
    },
    {
      year: '2014 – 2016',
      role: 'Content Writer',
      company: 'Freelance',
      location: 'Nairobi, Kenya',
      desc: 'Began professional writing career producing blog content and articles across sports, technology, and entertainment niches. Transitioned into iGaming content after discovering a natural affinity for the industry\'s technical demands.',
      tags: ['Freelance', 'Writing', 'Sports', 'Technology'],
      current: false
    },
  ];
}
