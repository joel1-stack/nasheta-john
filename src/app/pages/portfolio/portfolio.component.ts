import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  activeTab = 'casino';

  categories = [
    {
      id: 'casino',
      label: 'Casino Reviews',
      icon: '🎰',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1400&q=80',
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
      id: 'slots',
      label: 'Slot Reviews',
      icon: '🎲',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1400&q=80',
      desc: 'Technically accurate slot game reviews covering RTP, volatility, features, and provider context.',
      drive: 'https://drive.google.com/drive/folders/164glrRycDGn8Hf7B3nsYOWmQQqOMEzsm',
      samples: [
        { title: 'Gates of Olympus — Complete Review', tags: ['Pragmatic', 'High Volatility'], words: '1,600' },
        { title: 'Sugar Rush — Mechanics Deep Dive', tags: ['Cluster Pays', 'Pragmatic'], words: '1,400' },
        { title: 'Book of Dead — Legacy Review', tags: ['Play\'n GO', 'Classic'], words: '1,500' },
        { title: 'Aviator Game — Player Guide', tags: ['Crash', 'Spribe', 'Africa'], words: '1,800' },
      ]
    },
    {
      id: 'sports',
      label: 'Sports Betting',
      icon: '⚽',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1400&q=80',
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
      id: 'sweepstakes',
      label: 'Sweepstakes',
      icon: '🏆',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&q=80',
      desc: 'Compliant sweepstakes content optimised for US markets including promotional copy and game guides.',
      drive: 'https://drive.google.com/drive/folders/1fLVbF-M7xqDFV0ARebPxmS3AlggNFiZ7',
      samples: [
        { title: 'Sweepstakes vs Real Money — Guide', tags: ['Education', 'US Market'], words: '2,000' },
        { title: 'Chumba Casino — Players Overview', tags: ['Sweepstakes', 'Review', 'US'], words: '2,200' },
        { title: 'How to Use Gold Coins — Tutorial', tags: ['Tutorial', 'Compliance'], words: '1,400' },
        { title: 'Fortune Coins — New Player Guide', tags: ['Guide', 'Onboarding'], words: '1,600' },
      ]
    },
    {
      id: 'esports',
      label: 'eSports',
      icon: '🎮',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80',
      desc: 'eSports betting content covering major titles, tournament guides, and betting market explanations.',
      drive: 'https://drive.google.com/drive/folders/1ny4oe5jD7vs5mBghUyjwbUse98J61w2i',
      samples: [
        { title: 'CS2 Major — Betting Markets Guide', tags: ['CS2', 'Tournament', 'Esports'], words: '2,300' },
        { title: 'Dota 2 The International — Preview', tags: ['Dota2', 'TI', 'Valve'], words: '2,100' },
        { title: 'FIFA eSports — Beginner Guide', tags: ['FIFA', 'Beginner', 'EA Sports'], words: '1,700' },
        { title: 'LoL Worlds — African Fans Guide', tags: ['LoL', 'Worlds', 'Africa'], words: '1,900' },
      ]
    },
    {
      id: 'outreach',
      label: 'Outreach Posts',
      icon: '🔗',
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1400&q=80',
      desc: 'High-quality link building content and outreach posts placed on authoritative iGaming publications.',
      drive: 'https://drive.google.com/drive/folders/1y4QuFBMlDDZKZvEKO0AZOoDoTX5XlVo1',
      samples: [
        { title: 'Responsible Gambling in Africa', tags: ['RG', 'Outreach', 'Guest Post'], words: '1,500' },
        { title: 'Mobile Gaming Trends in Kenya', tags: ['Trends', 'Africa', 'Mobile'], words: '1,800' },
        { title: 'iGaming Regulation — Africa 2024', tags: ['Regulation', 'Analysis'], words: '2,200' },
        { title: 'Top Payment Methods for African Players', tags: ['Payments', 'Africa', 'Guide'], words: '1,600' },
      ]
    },
  ];

  get active() { return this.categories.find(c => c.id === this.activeTab)!; }
  setTab(id: string) { this.activeTab = id; }

  openCategory(id: string) {
    this.activeTab = id;
    window.setTimeout(() => document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }
}
