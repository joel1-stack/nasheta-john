import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  post: any = null;
  private slug = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
  }

  ngOnInit() {
    this.http.get<any[]>('assets/data/blogs.json').subscribe(data => {
      this.post = data.find(p => p.slug === this.slug) ?? data[0];
    });
  }
}

