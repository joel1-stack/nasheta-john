import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo.service';

interface CaseStudy {
  id: string; client: string; category: string; title: string;
  description: string; challenge: string; solution: string;
  results: { metric: string; before: string; after: string; improvement: string }[];
  testimonial: { quote: string; author: string; role: string; company: string };
  tags: string[]; duration: string; year: string;
}

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit {
  cs: CaseStudy | null = null;

  data: CaseStudy[] = [
    {
      id: 'sportsboom-overhaul', client: 'SportsBoom Media', category: 'Sports Betting',
      title: 'SportsBoom Content Overhaul',
      description: 'Complete content strategy overhaul — transforming generic match previews into data-driven, conversion-optimized guides.',
      challenge: 'Stagnant organic traffic and poor conversion rates. Content was generic, lacked regulatory depth, and failed to capture featured snippets.',
      solution: 'Restructured 24 articles into 156 optimized pieces with schema markup; created location-specific betting guides for 8 markets; integrated real-time odds data; built a responsible gambling content layer; established an editorial calendar aligned with major sporting events.',
      results: [
        { metric: 'Organic Traffic', before: '12K/mo', after: '45K/mo', improvement: '+280%' },
        { metric: 'Featured Snippets', before: '3', after: '18', improvement: '+500%' },
        { metric: 'Conversion Rate', before: '2.1%', after: '6.8%', improvement: '+224%' },
        { metric: 'Content Pieces', before: '24', after: '156', improvement: '+550%' },
      ],
      testimonial: { quote: "Nasheta's ability to translate complex sports betting concepts into clear, engaging copy is exceptional. Our conversion rates improved by 34% within three months.", author: 'Marcus Olof', role: 'CEO', company: 'SportsBoom Media' },
      tags: ['Sports Betting', 'SEO', 'Content Strategy', 'African Market'], duration: '6 months', year: '2025'
    },
    {
      id: 'kadabra-gaming', client: 'Kadabra Gaming', category: 'Casino Reviews',
      title: 'Kadabra Gaming Casino Review Strategy',
      description: 'Comprehensive casino review content strategy that established Kadabra Gaming as a trusted authority in the affiliate space.',
      challenge: 'Thin reviews lacking regulatory context, failing to rank for high-intent keywords like "best payout casino" and "fast withdrawal casino."',
      solution: 'Created a standardized review framework with 47 data points per casino including RTP verification, withdrawal speed testing, and regulatory license validation. Developed comparison content and "best of" guides optimized for featured snippets.',
      results: [
        { metric: 'Organic Visibility', before: '8.2K', after: '21K', improvement: '+156%' },
        { metric: 'Featured Snippets', before: '1', after: '12', improvement: '+1100%' },
        { metric: 'Affiliate Revenue', before: '$4.2K/mo', after: '$11.8K/mo', improvement: '+181%' },
        { metric: 'Review Completions', before: '34%', after: '67%', improvement: '+97%' },
      ],
      testimonial: { quote: "Working with Nasheta has been a game-changer for our iGaming content strategy. Her deep understanding of the African market gave us a competitive edge.", author: 'Priya Sharma', role: 'Head of Content', company: 'Kadabra Gaming' },
      tags: ['Casino Reviews', 'Affiliate', 'SEO', 'Content Framework'], duration: '4 months', year: '2025'
    },
    {
      id: 'igaming-afrika', client: 'iGaming Afrika', category: 'African Market',
      title: 'iGaming Afrika Market Entry Content',
      description: 'Comprehensive market entry content covering regulatory landscapes, player preferences, and payment infrastructure across 5 African markets.',
      challenge: 'Expanding from South Africa into Kenya, Nigeria, Ghana, and Tanzania — needed localized content, not translated European copy.',
      solution: 'Developed market-specific content hubs for each country: regulatory guides, payment method deep-dives with transaction speed data, player preference surveys with original data, responsible gambling resources in local languages.',
      results: [
        { metric: 'Monthly Visitors', before: '12K', after: '45K', improvement: '+275%' },
        { metric: 'Market Pages', before: '3', after: '47', improvement: '+1467%' },
        { metric: 'Local Rankings', before: 'Top 20', after: 'Top 3', improvement: 'Top 3 in 4 markets' },
        { metric: 'Bounce Rate', before: '72%', after: '41%', improvement: '-43%' },
      ],
      testimonial: { quote: "In ten years of hiring content professionals, Nasheta stands out for her research depth and ability to meet tight deadlines without compromising quality.", author: 'James Kamau', role: 'HR Director', company: 'iGaming Afrika' },
      tags: ['African Market', 'Localization', 'Market Entry', 'Regulatory'], duration: '6 months', year: '2025'
    },
    {
      id: 'casino-com', client: 'Casino.com', category: 'Slot Reviews',
      title: 'Casino.com Slot Content Expansion',
      description: 'Expanded slot review library from 45 to 200+ titles with SEO-optimized, player-focused content that captured featured snippets.',
      challenge: 'Outdated reviews lacking RTP data, failing to capture "best RTP slots" and "high volatility slots" search traffic.',
      solution: 'Built a scalable review framework with automated RTP/volatility data integration, provider-specific templates, demo play integration guides, "similar slots" recommendation engines, and VideoGame schema markup.',
      results: [
        { metric: 'Slot Reviews', before: '45', after: '203', improvement: '+351%' },
        { metric: 'Featured Snippets', before: '3', after: '18', improvement: '+500%' },
        { metric: 'Slot Page Traffic', before: '8.5K/mo', after: '31K/mo', improvement: '+265%' },
        { metric: 'Demo-to-Real Conv.', before: '4.2%', after: '9.7%', improvement: '+131%' },
      ],
      testimonial: { quote: "Nasheta's slot review framework transformed our content operations. The structured approach produced reviews that players actually read and trust.", author: 'Sarah Chen', role: 'Content Manager', company: 'Casino.com' },
      tags: ['Slot Reviews', 'RTP', 'SEO', 'Content Scaling'], duration: '4 months', year: '2025'
    },
    {
      id: 'bideford-digital', client: 'Bideford Digital', category: 'SEO Strategy',
      title: 'Bideford Digital iGaming SEO Overhaul',
      description: 'Comprehensive SEO strategy and content audit for an iGaming marketing agency serving 12 operator clients.',
      challenge: 'Client portfolio losing organic visibility due to thin content, poor technical SEO, and lack of E-E-A-T signals.',
      solution: 'Full content audit of 340 articles across 12 client sites; content consolidation strategy; author authority program; regulatory compliance content layer for YMYL pages; internal linking architecture for topical authority.',
      results: [
        { metric: 'Organic Traffic', before: '89K/mo', after: '312K/mo', improvement: '+250%' },
        { metric: 'Conversion Rate', before: '2.1%', after: '6.8%', improvement: '+224%' },
        { metric: 'Content Quality', before: '340 thin', after: '187 definitive', improvement: '3x quality' },
        { metric: 'Client Retention', before: '68%', after: '94%', improvement: '+38%' },
      ],
      testimonial: { quote: "Nasheta's SEO strategy didn't just improve rankings — it transformed how we approach content entirely. Her audit methodology is now our standard.", author: 'David O\'Brien', role: 'Managing Director', company: 'Bideford Digital' },
      tags: ['SEO Strategy', 'Content Audit', 'Agency', 'Technical SEO'], duration: '3 months', year: '2025'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private seo: SeoService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cs = this.data.find(c => c.id === id) || null;
    if (!this.cs) { this.router.navigate(['/portfolio']); return; }
    this.seo.updateMeta({ title: `${this.cs.title} | Case Study`, description: this.cs.description, type: 'article' });
  }

  initials(name: string) { return name.split(' ').map(n => n[0]).join(''); }
}
