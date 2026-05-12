import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog-list.component').then(m => m.BlogListComponent) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/blog-post.component').then(m => m.BlogPostComponent) },
  { path: 'portfolio', loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'career', loadComponent: () => import('./pages/career/career.component').then(m => m.CareerComponent) },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin-secret-panel', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },
  { path: '**', redirectTo: '' }
];
