import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  editingPost: BlogPost | null = null;
  showForm = false;
  searchTerm = '';
  activeTab: 'all' | 'published' | 'drafts' = 'all';
  saved = false;

  blogForm: FormGroup;

  categories = ['African Market', 'Casino Reviews', 'Slot Reviews', 'Sports Betting', 'Content Strategy', 'Player Education', 'Market Analysis', 'SEO Strategy'];

  constructor(private blogService: BlogService, private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title:    ['', Validators.required],
      slug:     ['', Validators.required],
      excerpt:  ['', [Validators.required, Validators.maxLength(300)]],
      category: ['', Validators.required],
      tags:     [''],
      readTime: [5, [Validators.required, Validators.min(1)]],
      coverImage: [''],
      content:  ['', Validators.required],
      status:   ['draft', Validators.required]
    });
  }

  ngOnInit() {
    this.blogService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.filterPosts();
    });
  }

  get publishedCount() { return this.posts.filter(p => p.status === 'published').length; }
  get draftCount()     { return this.posts.filter(p => p.status === 'draft').length; }

  filterPosts() {
    let f = [...this.posts];
    if (this.activeTab === 'published') f = f.filter(p => p.status === 'published');
    if (this.activeTab === 'drafts')    f = f.filter(p => p.status === 'draft');
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      f = f.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    this.filteredPosts = f.sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  setTab(tab: 'all' | 'published' | 'drafts') { this.activeTab = tab; this.filterPosts(); }
  onSearch() { this.filterPosts(); }

  newPost() {
    this.editingPost = null;
    this.blogForm.reset({ status: 'draft', readTime: 5 });
    this.showForm = true;
  }

  editPost(post: BlogPost) {
    this.editingPost = post;
    this.blogForm.patchValue({
      title: post.title, slug: post.slug, excerpt: post.excerpt,
      category: post.category, tags: post.tags.join(', '),
      readTime: post.readTime, coverImage: post.coverImage,
      content: post.content || post.contentHtml || '', status: post.status
    });
    this.showForm = true;
  }

  savePost() {
    if (this.blogForm.invalid) return;
    const v = this.blogForm.value;
    const tags = v.tags ? v.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [];
    const post: BlogPost = {
      id: this.editingPost?.id || `${v.slug}-${Date.now()}`,
      slug: v.slug, title: v.title, excerpt: v.excerpt,
      date: this.editingPost?.date || new Date().toISOString().split('T')[0],
      dateISO: this.editingPost?.dateISO || new Date().toISOString().split('T')[0],
      category: v.category, tags,
      coverImage: v.coverImage || '',
      readTime: v.readTime, readMinutes: v.readTime,
      author: 'Nasheta John', status: v.status,
      content: v.content, contentHtml: v.content
    };
    if (this.editingPost) { this.blogService.updatePost(post); } else { this.blogService.addPost(post); }
    this.saved = true;
    setTimeout(() => { this.saved = false; this.showForm = false; this.editingPost = null; }, 1200);
  }

  deletePost(post: BlogPost) {
    if (confirm(`Delete "${post.title}"?`)) this.blogService.deletePost(post.id);
  }

  duplicatePost(post: BlogPost) { this.blogService.addPost(this.blogService.duplicatePost(post)); }

  toggleStatus(post: BlogPost) {
    this.blogService.updatePost({ ...post, status: post.status === 'published' ? 'draft' : 'published' });
  }

  exportJson() {
    const blob = new Blob([this.blogService.exportToJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `blogs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }

  importJson(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try { this.blogService.importFromJson(e.target?.result as string); alert('Imported!'); }
      catch { alert('Invalid JSON'); }
    };
    reader.readAsText(file);
    (event.target as HTMLInputElement).value = '';
  }

  autoSlug() {
    if (!this.editingPost) {
      const slug = this.blogForm.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      this.blogForm.patchValue({ slug });
    }
  }

  cancelEdit() { this.showForm = false; this.editingPost = null; }

  preview() { window.open(`/blog/${this.blogForm.value.slug}`, '_blank'); }
}
