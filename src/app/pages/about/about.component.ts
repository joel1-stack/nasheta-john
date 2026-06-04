import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  activeTab = 'casino';

  categories = [
    {
      id: 'casino', label: 'Casino Reviews',
      image: 'assets/images/online casino website.jpg',
      desc: 'In-depth casino reviews covering licensing, game libraries, bonuses, and payment methods for regulated markets.',
      drive: 'https://drive.google.com/drive/folders/16EWQWgUJhhufo_E7hzAgVmqoZlidNOfE',
      samples: [
        { title: 'BetWinner Casino — Full Review', tags: ['Review', 'African Market', 'SEO'], words: '2,400' },
        { title: 'LeoVegas Kenya — Players Guide', tags: ['Guide', 'Kenya', 'Mobile'], words: '1,800' },
        { title: 'Betway Africa — Comprehensive Review', tags: ['Review', 'Africa', 'Sports'], words: '3,100' },
        { title: 'Hollywoodbets — Complete Overview', tags: ['Overview', 'SA Market'], words: '2,200' },
      ]
    },
    {
      id: 'slots', label: 'Slot Reviews',
      image: 'assets/images/slot game interface.jpg',
      desc: 'Technically accurate slot game reviews covering RTP, volatility, features, and provider context.',
      drive: 'https://drive.google.com/drive/folders/164glrRycDGn8Hf7B3nsYOWmQQqOMEzsm',
      samples: [
        { title: 'Gates of Olympus — Complete Review', tags: ['Pragmatic', 'High Volatility'], words: '1,600' },
        { title: 'Sugar Rush — Mechanics Deep Dive', tags: ['Cluster Pays', 'Pragmatic'], words: '1,400' },
        { title: 'Book of Dead — Legacy Review', tags: ["Play'n GO", 'Classic'], words: '1,500' },
        { title: 'Aviator Game — Player Guide', tags: ['Crash', 'Spribe', 'Africa'], words: '1,800' },
      ]
    },
    {
      id: 'sports', label: 'Sports Betting',
      image: 'assets/images/sports betting app.jpg',
      desc: 'Betting strategy articles, match previews, and operator guides written for sports betting audiences.',
      drive: 'https://drive.google.com/drive/folders/1SZjQ8RgRApLjj8fEKgBTID01Yu6AKTm7',
      samples: [
        { title: 'AFCON Betting Guide 2024', tags: ['Football', 'African Cup', 'Preview'], words: '2,800' },
        { title: 'Kenyan Premier League — Betting Tips', tags: ['KPL', 'Local', 'Strategy'], words: '1,900' },
        { title: 'NBA Finals — Markets Breakdown', tags: ['Basketball', 'NBA', 'Markets'], words: '2,100' },
        { title: 'Cricket World Cup — Odds Analysis', tags: ['Cricket', 'ICC', 'Analysis'], words: '2,400' },
      ]
    },
    {
      id: 'sweepstakes', label: 'Sweepstakes',
      image: 'assets/images/sweepstakes coins.jpg',
      desc: 'Compliant sweepstakes content optimised for US markets.',
      drive: 'https://drive.google.com/drive/folders/1fLVbF-M7xqDFV0ARebPxmS3AlggNFiZ7',
      samples: [
        { title: 'Sweepstakes vs Real Money — Guide', tags: ['Education', 'US Market'], words: '2,000' },
        { title: 'Chumba Casino — Players Overview', tags: ['Sweepstakes', 'Review', 'US'], words: '2,200' },
        { title: 'How to Use Gold Coins — Tutorial', tags: ['Tutorial', 'Compliance'], words: '1,400' },
        { title: 'Fortune Coins — New Player Guide', tags: ['Guide', 'Onboarding'], words: '1,600' },
      ]
    },
    {
      id: 'esports', label: 'eSports Content',
      image: 'assets/images/esports betting.jpg',
      desc: 'eSports betting content covering major titles, tournament guides, and market explanations.',
      drive: 'https://drive.google.com/drive/folders/1ny4oe5jD7vs5mBghUyjwbUse98J61w2i',
      samples: [
        { title: 'CS2 Major — Betting Markets Guide', tags: ['CS2', 'Tournament', 'Esports'], words: '2,300' },
        { title: 'Dota 2 The International — Preview', tags: ['Dota2', 'TI', 'Valve'], words: '2,100' },
        { title: 'FIFA eSports — Beginner Guide', tags: ['FIFA', 'Beginner', 'EA Sports'], words: '1,700' },
        { title: 'LoL Worlds — African Fans Guide', tags: ['LoL', 'Worlds', 'Africa'], words: '1,900' },
      ]
    },
    {
      id: 'outreach', label: 'Outreach Posts',
      image: 'assets/images/guest posting.jpg',
      desc: 'High-quality link building content placed on authoritative iGaming publications.',
      drive: 'https://drive.google.com/drive/folders/1y4QuFBMlDDZKZvEKO0AZOoDoTX5XlVo1',
      samples: [
        { title: 'Responsible Gambling in Africa', tags: ['RG', 'Outreach', 'Guest Post'], words: '1,500' },
        { title: 'Mobile Gaming Trends in Kenya', tags: ['Trends', 'Africa', 'Mobile'], words: '1,800' },
        { title: 'iGaming Regulation — Africa 2024', tags: ['Regulation', 'Analysis'], words: '2,200' },
        { title: 'Top Payment Methods for African Players', tags: ['Payments', 'Africa', 'Guide'], words: '1,600' },
      ]
    },
  ];

  get activeCategory() { return this.categories.find(c => c.id === this.activeTab); }
  setActive(id: string) { this.activeTab = id; }

  timeline = [
    { year: '2024 – Present', role: 'iGaming Content Specialist', company: 'Freelance / Multiple Agencies', location: 'Remote — Nairobi, Kenya', desc: 'Operating as an independent iGaming content specialist, serving operators, affiliates, and content agencies across African and global markets.', tags: ['Strategy', 'Leadership', 'Multi-market', 'Consulting'], current: true },
    { year: '2022 – 2024', role: 'Content Lead & Project Manager', company: 'iGaming Afrika', location: 'Nairobi, Kenya', desc: 'Led a team of six writers producing daily iGaming content for African-focused platforms. Introduced templates that reduced revision cycles by 40%.', tags: ['Team Leadership', 'Editorial', 'Africa-focus', 'Project Management'], current: false },
    { year: '2020 – 2022', role: 'Senior Editor', company: 'SportsBoom Media', location: 'Remote', desc: 'Edited sports betting and casino content. Maintained brand voice consistency across English and Swahili content streams.', tags: ['Editing', 'Sports Betting', 'Bilingual', 'Quality Control'], current: false },
    { year: '2018 – 2020', role: 'Copywriter', company: 'Kadabra Gaming Agency', location: 'Remote', desc: 'Produced promotional copy, landing pages, and email campaigns for casino and sports betting clients.', tags: ['Copywriting', 'CRO', 'Email Marketing', 'Landing Pages'], current: false },
    { year: '2016 – 2018', role: 'Content Writer', company: 'Bideford Digital', location: 'Nairobi, Kenya', desc: 'Began specialising in online gambling content — slot reviews, casino comparisons, and beginner betting guides.', tags: ['Content Writing', 'SEO', 'Research', 'iGaming Entry'], current: false },
    { year: '2014 – 2016', role: 'Content Writer', company: 'Freelance', location: 'Nairobi, Kenya', desc: 'Started career producing blog content across sports, technology, and entertainment niches before transitioning to iGaming.', tags: ['Freelance', 'Writing', 'Sports', 'Technology'], current: false },
  ];

  technical = [
    { skill: 'Content Writing & Editing', level: 98 },
    { skill: 'SEO Optimisation', level: 90 },
    { skill: 'iGaming Industry Knowledge', level: 96 },
    { skill: 'Email Marketing', level: 82 },
    { skill: 'Sales Copywriting', level: 88 },
    { skill: 'Research & Analysis', level: 92 },
  ];

  tools = [
    { name: 'Ahrefs', cat: 'SEO' },
    { name: 'SEMrush', cat: 'SEO' },
    { name: 'SurferSEO', cat: 'SEO' },
    { name: 'Google Analytics', cat: 'Analytics' },
    { name: 'Search Console', cat: 'Analytics' },
    { name: 'WordPress', cat: 'CMS' },
    { name: 'Yoast SEO', cat: 'CMS' },
    { name: 'Grammarly', cat: 'Writing' },
    { name: 'ChatGPT', cat: 'AI' },
    { name: 'Claude', cat: 'AI' },
    { name: 'Asana', cat: 'Project Mgmt' },
    { name: 'ClickUp', cat: 'Project Mgmt' },
    { name: 'Slack', cat: 'Comms' },
    { name: 'Google Suite', cat: 'Productivity' },
    { name: 'N8N', cat: 'Automation' },
    { name: 'Contadu', cat: 'SEO' },
  ];

  personal = ['Communication', 'Attention to Detail', 'Teamwork', 'Organisation', 'Analytical Thinking', 'Adaptability', 'Time Management', 'Problem Solving'];

  languages = [
    { lang: 'English', level: 'Native / Fluent', pct: 100 },
    { lang: 'Kiswahili', level: 'Native', pct: 100 },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
