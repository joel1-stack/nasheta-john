const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\JOEL STACK\\OneDrive\\Desktop\\websites\\new code\\igamingubuntu-code';
const destDir = 'C:\\Users\\JOEL STACK\\OneDrive\\Desktop\\nasheta-portfolio';

try {
  // 1. Copy Navbar
  fs.copyFileSync(path.join(srcDir, 'navbar/navbar.component.html'), path.join(destDir, 'src/app/components/navbar/navbar.component.html'));
  fs.copyFileSync(path.join(srcDir, 'navbar/navbar.component.scss'), path.join(destDir, 'src/app/components/navbar/navbar.component.scss'));

  // 2. About
  let aboutHtml = fs.readFileSync(path.join(srcDir, 'about/about.component.html'), 'utf8');
  aboutHtml = aboutHtml.replace(/<div class="portfolio-overlay">.*?<\/div>/g, '');
  fs.writeFileSync(path.join(destDir, 'src/app/pages/about/about.component.html'), aboutHtml);

  fs.copyFileSync(path.join(srcDir, 'about/about.component.scss'), path.join(destDir, 'src/app/pages/about/about.component.scss'));

  let aboutTs = fs.readFileSync(path.join(srcDir, 'about/about.component.ts'), 'utf8');
  aboutTs = aboutTs.replace(/,\s*icon:\s*'[^']+'/g, '');
  aboutTs = aboutTs.replace(/icon:\s*string;\s*/g, '');
  if (!aboutTs.includes('standalone: true')) {
    aboutTs = aboutTs.replace(/@Component\({/, "@Component({\n  standalone: true,\n  imports: [CommonModule, RouterLink],\n");
    aboutTs = "import { RouterLink } from '@angular/router';\nimport { CommonModule } from '@angular/common';\n" + aboutTs;
  }
  fs.writeFileSync(path.join(destDir, 'src/app/pages/about/about.component.ts'), aboutTs);

  // 3. Blog -> blog-list
  let blogHtml = fs.readFileSync(path.join(srcDir, 'blog/blog.component.html'), 'utf8');
  // Replace dropdowns
  const dropdownRegex = /<div class="dropdown" \*ngFor="let category of blogCategories">[\s\S]*?<\/div>\s*<\/div>/g;
  blogHtml = blogHtml.replace(dropdownRegex, `<a *ngFor="let category of blogCategories" [routerLink]="['/blog/category', category.slug]" class="dropdown-toggle" style="text-decoration:none;">{{category.name}}</a>`);
  fs.writeFileSync(path.join(destDir, 'src/app/pages/blog/blog-list.component.html'), blogHtml);

  fs.copyFileSync(path.join(srcDir, 'blog/blog.component.scss'), path.join(destDir, 'src/app/pages/blog/blog-list.component.scss'));

  let blogTs = fs.readFileSync(path.join(srcDir, 'blog/blog.component.ts'), 'utf8');
  blogTs = blogTs.replace(/export class BlogComponent/g, 'export class BlogListComponent');
  blogTs = blogTs.replace(/blog\.component\.html/g, 'blog-list.component.html');
  blogTs = blogTs.replace(/blog\.component\.scss/g, 'blog-list.component.scss');
  if (!blogTs.includes('standalone: true')) {
    blogTs = blogTs.replace(/@Component\({/, "@Component({\n  standalone: true,\n  imports: [CommonModule, RouterLink, FormsModule],\n");
    blogTs = "import { RouterLink } from '@angular/router';\nimport { CommonModule } from '@angular/common';\nimport { FormsModule } from '@angular/forms';\n" + blogTs;
  }
  fs.writeFileSync(path.join(destDir, 'src/app/pages/blog/blog-list.component.ts'), blogTs);

  // 4. Hero
  let heroHtml = fs.readFileSync(path.join(srcDir, 'hero/hero.component.html'), 'utf8');
  let homeHtml = fs.readFileSync(path.join(destDir, 'src/app/pages/home/home.component.html'), 'utf8');
  
  // Find the hero section and replace it
  const heroSectionRegex = /<section class="hero">[\s\S]*?<\/section>/;
  homeHtml = homeHtml.replace(heroSectionRegex, heroHtml);
  fs.writeFileSync(path.join(destDir, 'src/app/pages/home/home.component.html'), homeHtml);

  let heroScss = fs.readFileSync(path.join(srcDir, 'hero/hero.component.scss'), 'utf8');
  let homeScss = fs.readFileSync(path.join(destDir, 'src/app/pages/home/home.component.scss'), 'utf8');
  
  // We need to replace the .hero { ... } in home.component.scss with the one from heroScss, or just append it.
  // Appending it might cause conflicts if there's already a .hero class. Let's just replace the whole file since home.component.scss might be large and we don't want conflicts. 
  // Wait, no! home.component.scss has styles for Services, Stats, About, Portfolio, Latest Blog, Testimonials, CTA.
  // So we must carefully remove the old .hero block.
  const oldHeroRegex = /\.hero\s*\{[\s\S]*?\}\s*(?=\/\*| \.trust-bar|\.trust-bar)/;
  // This is a bit fragile. Let's just write heroScss to the top of home.component.scss and let it override.
  homeScss = heroScss + '\n\n' + homeScss;
  fs.writeFileSync(path.join(destDir, 'src/app/pages/home/home.component.scss'), homeScss);

  console.log('Successfully updated code');
} catch(e) {
  console.error(e);
}
