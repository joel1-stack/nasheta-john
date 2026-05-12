# Nasheta John — iGaming Content Specialist Portfolio
## Angular 17 Portfolio Website

---

## QUICK START — Run the Built Site (Easiest)

The site is already built. Just serve the `dist/nasheta-portfolio/browser/` folder.

### Option 1: Using Python (No install needed)
```bash
cd dist/nasheta-portfolio/browser
python3 -m http.server 4200
# Open: http://localhost:4200
```

### Option 2: Using Node.js `serve`
```bash
npm install -g serve
serve dist/nasheta-portfolio/browser -s
# Open: http://localhost:3000
```

### Option 3: Using VS Code Live Server
- Open the `dist/nasheta-portfolio/browser/` folder in VS Code
- Right-click `index.html` → Open with Live Server

---

## DEPLOY LIVE (Upload to Hosting)

### Netlify (Free, Recommended)
1. Go to https://netlify.com → Sign up / Log in
2. Drag and drop the `dist/nasheta-portfolio/browser/` folder
3. Your site is live instantly with a URL like `nasheta.netlify.app`
4. **Important:** Add a `_redirects` file in the browser folder:
   ```
   /*  /index.html  200
   ```

### Vercel
1. Go to https://vercel.com → Import project
2. Upload or connect GitHub
3. Set output directory to `dist/nasheta-portfolio/browser`

### cPanel / Traditional Hosting
1. Upload everything inside `dist/nasheta-portfolio/browser/` to your `public_html` folder
2. Create an `.htaccess` file with:
   ```
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [L]
   ```

---

## REBUILD FROM SOURCE (If you want to make changes)

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm 9+

### Steps
```bash
# 1. Install Angular CLI globally
npm install -g @angular/cli

# 2. Install project dependencies
npm install

# 3. Run development server (live reload)
ng serve
# Open: http://localhost:4200

# 4. Build for production
ng build --configuration=production

# 5. Output is in: dist/nasheta-portfolio/browser/
```

---

## CUSTOMISING CONTENT

All content is in the TypeScript component files:

| What to change        | File location |
|-----------------------|---------------|
| Home page / testimonials / stats | `src/app/pages/home/home.component.ts` |
| Portfolio samples     | `src/app/pages/portfolio/portfolio.component.ts` |
| Services content      | `src/app/pages/services/services.component.ts` |
| Career timeline       | `src/app/pages/career/career.component.ts` |
| Skills & tools        | `src/app/pages/skills/skills.component.ts` |
| Contact info          | `src/app/pages/contact/contact.component.ts` |
| Footer contact links  | `src/app/components/footer/footer.component.ts` |
| Global colours        | `src/styles.scss` (:root variables) |
| Photos                | `src/assets/images/` |
| Company logos         | `src/assets/logos/` |

---

## COLOUR THEME

To change the colour scheme, edit the CSS variables in `src/styles.scss`:

```scss
:root {
  --forest:      #1a3a28;   /* dark green base */
  --emerald:     #1e5c3a;   /* medium green */
  --green-lite:  #3aa86a;   /* bright green accent */
  --gold:        #c9a227;   /* gold highlight */
  --gold-lite:   #e8bf50;   /* lighter gold */
  --obsidian:    #0a0f0d;   /* near-black background */
}
```

---

## PAGES

| Page     | Route      | Description |
|----------|------------|-------------|
| Home     | /          | Hero, stats, testimonials, CTA |
| Portfolio| /portfolio | Tabbed samples by category + Drive links |
| Services | /services  | Main services + full detail list |
| Career   | /career    | Animated timeline |
| Skills   | /skills    | Tools, bars, languages |
| Contact  | /contact   | Form + contact cards |

---

Built with Angular 17 · Standalone Components · Lazy Loading · View Transitions
