import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  allPosts: BlogPost[] = [];
  loading = true;

  categories = ['All', 'African Market', 'Casino Reviews', 'Slot Reviews', 'Sports Betting', 'Content Strategy', 'Player Education', 'Market Analysis', 'SEO Strategy'];
  active = 'All';
  search = '';

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPublishedPosts().subscribe(posts => {
      this.allPosts = posts;
      this.loading = false;
    });
  }

  get posts(): BlogPost[] {
    let filtered = this.allPosts;
    if (this.active !== 'All') filtered = filtered.filter(p => p.category === this.active);
    if (this.search.trim()) {
      const q = this.search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return filtered;
  }

  setCategory(cat: string) { this.active = cat; }

  /** Returns a CSS class based on category for colored badge */
  getCatClass(category: string): string {
    const map: Record<string, string> = {
      'African Market': 'cat--gold',
      'Casino Reviews': 'cat--purple',
      'Slot Reviews': 'cat--purple',
      'Sports Betting': 'cat--pink',
      'Content Strategy': 'cat--red',
      'Player Education': 'cat--red',
      'Market Analysis': 'cat--gold',
      'SEO Strategy': 'cat--red',
    };
    return map[category] || 'cat--red';
  }
}
