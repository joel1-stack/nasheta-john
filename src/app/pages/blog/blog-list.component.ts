import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type CategoryFilter = 'All' | string;

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  allPosts: any[] = [];

  categories: CategoryFilter[] = [
    'All',
    'African Market',
    'Casino Reviews',
    'Slot Reviews',
    'Sports Betting',
    'Content Strategy',
    'Player Education',
  ];

  active: CategoryFilter = 'All';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data/blogs.json').subscribe(data => {
      this.allPosts = data;
    });
  }

  get posts() {
    const sorted = [...this.allPosts].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
    if (this.active === 'All') return sorted;
    return sorted.filter(p => p.category === this.active);
  }

  setCategory(cat: CategoryFilter) {
    this.active = cat;
  }
}

