import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.updateCanonical());
  }

  updateMeta(data: { title: string; description: string; image?: string; type?: string }) {
    const url = `https://nasheta-john.vercel.app${this.router.url}`;
    this.title.setTitle(`${data.title} | Nasheta John`);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:image', content: data.image || 'https://nasheta-john.vercel.app/assets/images/nasheta.jpeg' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
  }

  private updateCanonical() {
    const url = `https://nasheta-john.vercel.app${this.router.url}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', url);
  }
}
