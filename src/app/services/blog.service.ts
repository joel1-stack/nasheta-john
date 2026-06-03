import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO?: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  readMinutes?: number;
  author: string;
  status: 'published' | 'draft';
  content: string;
  contentHtml?: string;
  affiliateLinks?: Array<{ title: string; description: string; url: string }>;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private postsSubject = new BehaviorSubject<BlogPost[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) { this.loadPosts(); }

  private loadPosts() {
    this.http.get<any>('assets/data/blogs.json').subscribe({
      next: (data) => {
        // support both { posts: [] } and flat [] formats
        const raw: any[] = Array.isArray(data) ? data : (data.posts || []);
        const posts: BlogPost[] = raw.map(p => ({
          id: p.id || p.slug,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: p.date || p.dateISO || '',
          dateISO: p.dateISO || p.date || '',
          category: p.category,
          tags: p.tags || [],
          coverImage: p.coverImage || '',
          readTime: p.readTime || p.readMinutes || 5,
          readMinutes: p.readMinutes || p.readTime || 5,
          author: p.author || 'Nasheta John',
          status: p.status || 'published',
          content: p.content || p.contentHtml || '',
          contentHtml: p.contentHtml || p.content || '',
        }));
        this.postsSubject.next(posts);
      },
      error: (err) => console.error('Failed to load blogs:', err)
    });
  }

  getPublishedPosts(): Observable<BlogPost[]> {
    return this.posts$.pipe(map(posts => posts.filter(p => p.status === 'published').sort((a,b) => (a.date < b.date ? 1 : -1))));
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map(posts => posts.find(p => p.slug === slug)));
  }

  getPostsByCategory(category: string): Observable<BlogPost[]> {
    return this.getPublishedPosts().pipe(map(posts => posts.filter(p => p.category === category)));
  }

  getCategories(): Observable<string[]> {
    return this.getPublishedPosts().pipe(map(posts => [...new Set(posts.map(p => p.category))]));
  }

  getRelatedPosts(currentSlug: string, category: string, limit = 3): Observable<BlogPost[]> {
    return this.getPublishedPosts().pipe(map(posts => posts.filter(p => p.slug !== currentSlug && p.category === category).slice(0, limit)));
  }

  getAllPosts(): Observable<BlogPost[]> { return this.posts$; }

  addPost(post: BlogPost) { this.postsSubject.next([...this.postsSubject.value, post]); }

  updatePost(updated: BlogPost) {
    const posts = this.postsSubject.value.map(p => p.id === updated.id ? updated : p);
    this.postsSubject.next(posts);
  }

  deletePost(id: string) { this.postsSubject.next(this.postsSubject.value.filter(p => p.id !== id)); }

  duplicatePost(post: BlogPost): BlogPost {
    return { ...post, id: `${post.id}-copy-${Date.now()}`, slug: `${post.slug}-copy`, title: `${post.title} (Copy)`, status: 'draft', date: new Date().toISOString().split('T')[0] };
  }

  exportToJson(): string { return JSON.stringify({ posts: this.postsSubject.value }, null, 2); }

  importFromJson(json: string) {
    try {
      const data = JSON.parse(json);
      if (data.posts && Array.isArray(data.posts)) this.postsSubject.next(data.posts);
    } catch (e) { console.error('Invalid JSON:', e); }
  }
}
