import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  mainServices = [
    {
      icon: '◈',
      title: 'iGaming Content Writing & Editing',
      desc: 'End-to-end content creation for online casinos, sportsbooks, and gaming platforms. From long-form reviews to quick game guides — every word is crafted for engagement, SEO, and compliance.',
      items: ['Casino & Slot Reviews', 'Sports Betting Guides', 'Game Strategy Articles', 'FAQ & Help Content', 'VIP & Loyalty Content', 'Regulatory Compliance Copy']
    },
    {
      icon: '✦',
      title: 'African Market iGaming Consultation',
      desc: 'Strategic consulting for brands entering or growing in the African iGaming market. I bring local market knowledge, player psychology insights, and regulatory understanding.',
      items: ['Market Entry Strategy', 'Localisation & Tone Guidance', 'Competitor Analysis', 'Player Persona Development', 'Regulatory Briefings by Country', 'Partnership Recommendations']
    },
    {
      icon: '◇',
      title: 'Content Strategy & SEO Optimisation',
      desc: 'Data-driven content planning designed to build topical authority, improve organic rankings, and attract high-intent iGaming traffic over the long term.',
      items: ['Keyword Research & Mapping', 'Content Calendar Planning', 'On-Page SEO Optimisation', 'Content Audit & Gap Analysis', 'Topical Authority Building', 'Performance Reporting']
    },
  ];

  detailServices = [
    { cat: 'Writing',  title: 'Sweepstakes Content',        desc: 'Compliant copy for US sweepstakes casinos covering promotions, guides, and coin mechanics.' },
    { cat: 'Writing',  title: 'Game Reviews',               desc: 'Technically accurate slot and table game reviews covering RTP, volatility, and bonus features.' },
    { cat: 'Writing',  title: 'Casino Guides',              desc: 'Comprehensive operator guides covering bonuses, licensing, payments, and player experience.' },
    { cat: 'Writing',  title: 'Betting Strategy Articles',  desc: 'Actionable sports betting content covering odds, markets, value betting, and bankroll management.' },
    { cat: 'SEO',      title: 'SEO Content Writing',        desc: 'Keyword-optimised long-form content built to rank in competitive iGaming search categories.' },
    { cat: 'SEO',      title: 'Blog Writing',               desc: 'Consistent blog content that builds brand authority and keeps audiences returning.' },
    { cat: 'Technical',title: 'Technical Writing',          desc: 'Clear documentation for gaming platforms, compliance requirements, and product features.' },
    { cat: 'Writing',  title: 'FAQ Content',                desc: 'Well-structured FAQ sections that reduce support load and improve user experience.' },
    { cat: 'Writing',  title: 'VIP & Loyalty Content',      desc: 'Personalised content for high-value player segments and retention campaigns.' },
    { cat: 'Writing',  title: 'eSports Betting Content',    desc: 'Tournament guides, team profiles, and match previews for the eSports betting audience.' },
    { cat: 'Writing',  title: 'Industry Insights',          desc: 'Thought leadership articles and market analyses for iGaming publications.' },
    { cat: 'SEO',      title: 'Outreach & Link Building',   desc: 'High-quality guest posts and outreach content placed on authoritative iGaming sites.' },
  ];
}
