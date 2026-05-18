import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | null = null;
  related: BlogPost[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.blogService.getPostBySlug(slug).subscribe(post => {
      this.post = post || null;
      this.loading = false;
      if (post) {
        this.seo.updateMeta({ title: post.title, description: post.excerpt, type: 'article' });
        this.blogService.getRelatedPosts(slug, post.category).subscribe(r => this.related = r);
      }
    });
  }

  share(platform: 'twitter' | 'linkedin') {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.post?.title || '');
    const link = platform === 'twitter'
      ? `https://twitter.com/intent/tweet?text=${title}&url=${url}`
      : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(link, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied!'));
  }
}
