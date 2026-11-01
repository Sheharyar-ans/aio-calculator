# AIO Calculator — Deployment & Hosting Portability Guide

> **Production Target:** `https://aio-calculator.com/`  
> **Architecture:** 100% Pure Static HTML5 + CSS3 + Vanilla JavaScript  
> **Server Runtime Required:** None (Zero Node.js, Zero PHP, Zero Databases, Zero Build Step)  
> **Portability Guarantee:** The entire repository is pure static files. It can be deployed directly to Cloudflare Pages, CloudPages (LiteSpeed), Apache, Nginx, or GitHub Pages without compilation.

---

## 1. Deploying to Cloudflare Pages (Instant Zero-Error Deployment)

Because the repository is now **100% pure static HTML, CSS, and Vanilla JavaScript**, Cloudflare Pages requires **NO build step** and will deploy in under 10 seconds:

### Cloudflare Pages Settings:
1. Log into your **Cloudflare Dashboard** &rarr; **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
2. Select repository: `Sheharyar-ans/aio-calculator` (Branch: `main`).
3. Set **Build Settings**:
   - **Framework preset:** `None`
   - **Build command:** *(leave completely blank or empty)*
   - **Build output directory:** `/` *(or leave blank / `.`)*
4. Click **Save and Deploy**.

### Why This Fixes Cloudflare Build Errors:
- **No Node.js / TypeScript build step required:** Cloudflare serves the pre-compiled, semantic HTML files directly.
- **Native `_headers` included:** Custom Cloudflare Pages security headers (CSP, HSTS, X-Content-Type-Options) and 1-year immutable caching for `/assets/*` are already configured.
- **Native `_redirects` included:** Trailing-slash and 301 redirects are enforced automatically.

---

## 1. Overview & Golden Rule

This site is compiled entirely ahead-of-time into the `dist/` directory. 
When deploying or migrating between hosting environments:

**Upload only the CONTENTS of `dist/` directly into your web root directory (`public_html` or domain document root).**  
Do not upload the `dist/` folder itself as a subdirectory.

---

## 2. Deploying to Normal Shared Hosting (Apache / LiteSpeed / cPanel)

### Step-by-Step:
1. **Build locally** (if you have made any source modifications):
   ```bash
   npm run build
   ```
2. **Compress the contents of `dist/`**:
   - Go inside the `dist/` folder.
   - Select all files (`index.html`, `.htaccess`, `sitemap.xml`, `robots.txt`, `llms.txt`, `assets/`, and all tool folders).
   - Create a ZIP archive (e.g. `aio-calculator-dist.zip`).
3. **Upload to Hosting Web Root**:
   - Log into your cPanel, DirectAdmin, or FTP account.
   - Open File Manager and navigate to the domain root (typically `/home/username/public_html/` or `/home/username/aio-calculator.com/`).
   - Upload `aio-calculator-dist.zip` and extract its contents directly into the root.
4. **Ensure Hidden Files are Visible**:
   - Verify that `.htaccess` was uploaded and extracted.
   - The included `.htaccess` contains `<IfModule>` guards for defensive execution, standard `DirectoryIndex index.html`, caching rules (1 hour for HTML, 1 year for static assets), and the required 301 redirect for the legacy dice roller.
5. **Verify Live Site**:
   - Visit `https://aio-calculator.com/`.
   - Test key tools (e.g. `/mortgage-calculator/`, `/bmi-ideal-weight-calculator/`).
   - Check search modal (`/` key) and test calculations in real time.

---

## 3. Migrating to CloudPages (LiteSpeed)

Migrating from your initial shared host to CloudPages requires **zero rebuilds and zero code changes**:

### Step-by-Step:
1. **Copy the Deployed Folder**:
   - Download or copy the files directly from your old shared host's web root, or use the exact same `dist/` archive.
2. **Upload to CloudPages**:
   - In CloudPages, create your website container for `aio-calculator.com`.
   - Upload the files into the domain's document root.
3. **Point Domain DNS**:
   - Update your domain DNS A/AAAA records to point to the new CloudPages server IP.
4. **Automatic LiteSpeed Compatibility**:
   - CloudPages uses LiteSpeed Web Server, which natively parses and enforces the included `.htaccess` file without modification.
   - No `.env` files or application daemons to start.

---

## 4. Deploying to Nginx (VPS / Dedicated Server / CloudPages Nginx)

If CloudPages or your server is configured with Nginx rather than LiteSpeed:

1. **Deploy Files**:
   - Copy the contents of `dist/` into `/var/www/aio-calculator` (or your configured root).
2. **Apply Server Configuration**:
   - Open `server-config/nginx.conf` included in the project repository.
   - Copy the server block into `/etc/nginx/sites-available/aio-calculator.conf` (or your site config file).
   - Link to `sites-enabled` and test configuration:
     ```bash
     sudo nginx -t
     sudo systemctl reload nginx
     ```
3. **Key Nginx Rules Provided**:
   - Standard directory index: `index index.html;`
   - Flat URL resolution: `try_files $uri $uri/ =404;`
   - Permanent 301 redirect from `/free-online-dice-roller` and `/free-online-dice-roller/` to `/free-online-dice-roller-1-to-100/`.
   - Caching headers (1 hour for HTML, 1 year for immutable static assets).
   - Security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).

---

## 5. Post-Deployment Verification Checklist

Run this 5-minute smoke test immediately after upload:

- [ ] **Home Page Loads:** `https://aio-calculator.com/` returns 200 OK with interactive calculators and category navigation.
- [ ] **Trailing-Slash Flat URLs:** Verify `/mortgage-calculator/`, `/sip-investment-planner/`, and `/bmi-ideal-weight-calculator/` load without 404s.
- [ ] **Dynamic Current Year:** Check the footer copyright text displays the current calendar year dynamically.
- [ ] **Instant Calculation:** Enter inputs in `/mortgage-calculator/` and verify outputs update instantly without page reloads.
- [ ] **Global Search:** Press `/` or click "Search tools...", type "calorie", and verify results render instantly from `/assets/search-index.json`.
- [ ] **Dice 301 Redirect:** Visit `/free-online-dice-roller/` and verify it automatically redirects to `/free-online-dice-roller-1-to-100/`.
- [ ] **Upgraded Percentage Calculator:** Visit `/percentage-calculator/` and confirm it operates as a full interactive tool page with 3 calculation modes.
- [ ] **Core Metadata:** Check page source for canonical tag `<link rel="canonical" href="https://aio-calculator.com/.../">` and JSON-LD schema blocks (`WebApplication`, `FAQPage`, `BreadcrumbList`).
- [ ] **Crawling Endpoints:** Verify `https://aio-calculator.com/robots.txt`, `https://aio-calculator.com/sitemap.xml`, and `https://aio-calculator.com/llms.txt` are accessible.
