import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog-list.component').then(m => m.BlogListComponent) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/blog-post.component').then(m => m.BlogPostComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin-secret-panel', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },
  /* Old routes redirected so bookmarks don't break */
  { path: 'portfolio', redirectTo: 'about', pathMatch: 'full' },
  { path: 'portfolio/:id', redirectTo: 'about', pathMatch: 'full' },
  { path: 'career', redirectTo: 'about', pathMatch: 'full' },
  { path: 'skills', redirectTo: 'about', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
