# AIO Calculator — Portability & Static Export Audit Report

**Audit Date:** October 30, 2026  
**Target Domain:** `https://aio-calculator.com`  
**Build Engine:** Static Ahead-of-Time Export (Astro 7.4.4 / Node.js build machine)  
**Output Target:** `dist/` (Zip-ready, 100% pure static web assets)  
**Overall Status:** **PASSED (100% Portable)**

---

## 1. Executive Summary

The AIO Calculator web application has been built and fully audited to satisfy the strictest hosting portability standards. The production distribution (`dist/`) contains **zero server-side dependencies**:

- **No Node.js runtime** required on the server.
- **No PHP or WordPress** files or dependencies.
- **No MySQL, SQLite, or databases** required.
- **No `.env` or server environment variables** needed.
- **No server build steps** required.
- **No Server-Side Rendering (SSR)** or runtime API endpoints.

Deploying to traditional shared hosting (Apache / LiteSpeed / cPanel) and migrating later to CloudPages (LiteSpeed) or Nginx VPS is accomplished simply by copying the files in `dist/` directly into the web root with zero code changes.

---

## 2. Directory Structure & URL Resolution

Every single canonical URL from the live sitemap exists as a physical directory with an `index.html` file inside it, guaranteeing seamless standard directory-index serving on Apache, LiteSpeed, Nginx, or Caddy without custom routing rules:

```
dist/
├── index.html                                        <- Home page (https://aio-calculator.com/)
├── .htaccess                                         <- Defensive LiteSpeed/Apache configuration
├── _redirects                                        <- Netlify/Cloudflare static fallback
├── robots.txt                                        <- Search & AI crawler directives
├── sitemap.xml                                       <- Root sitemap index
├── sitemap-index.xml                                 <- Astro sitemap index
├── sitemap-0.xml                                     <- Full URL sitemap entries
├── llms.txt                                          <- Context for AI answer engines
├── assets/
│   ├── css/
│   │   └── main.css                                  <- Root-relative global stylesheet (17.5 KB)
│   ├── js/
│   │   ├── main.js                                   <- Client UI runtime (search, dynamic year, contact)
│   │   └── calculators.js                            <- Vanilla JS calculation engines (114 KB)
│   ├── search-index.json                             <- Client-side JSON search index (49 tools)
│   ├── hero/                                         <- Scroll-world hero assets & SVG fallbacks
│   └── images/                                       <- Site images
├── [slug]/
│   └── index.html                                    <- 63 distinct tool, category, info, and blog routes
└── free-online-dice-roller/
    └── index.html                                    <- Static fallback redirect to canonical tool
```

---

## 3. Strict Portability Verification Audits

### 3.1. Forbidden Strings Audit
An automated deep scan across all 76 files in `dist/` checked for forbidden local development, framework, and environment strings:

| Forbidden String | Scan Result | Status |
| :--- | :--- | :--- |
| `localhost` | **0 hits** | PASSED |
| `127.0.0.1` | **0 hits** | PASSED |
| `:3000` | **0 hits** | PASSED |
| `:5173` | **0 hits** | PASSED |
| `public_html` | **0 hits** | PASSED |
| `/home/` & `\home\` | **0 hits** | PASSED |
| `.php` | **0 hits** | PASSED |
| `.env` | **0 hits** | PASSED |
| `node_modules` | **0 hits** | PASSED |

### 3.2. Absolute Domain Audit
Per Section 4, the only domain present in HTML is the canonical production domain:
- `https://aio-calculator.com/` in `<link rel="canonical">`, Open Graph `og:url`, Schema JSON-LD, and `sitemap.xml`.
- All CSS, JavaScript, image, and page links use clean root-relative paths (`/assets/css/main.css`, `/mortgage-calculator/`).

### 3.3. URL Parity Audit (64 / 64 URLs Verified)
The test suite `test-verification.js` audited all 64 target URLs:
- **100% of URLs verified** with physical HTML files in `dist/`.
- Zero 404s.
- Flat URL parity maintained (no `/finance/` or category subfolder prefix in tool URLs).
- Dice exception verified: `/free-online-dice-roller/` contains 301 static meta-refresh, JS redirect, and canonical tag pointing to `/free-online-dice-roller-1-to-100/`.
- Percentage upgrade verified: `/percentage-calculator/` is a complete 3-mode interactive calculator with comprehensive editorial content below.

### 3.4. Mathematical Accuracy Audit
The test suite `test-math-accuracy.js` benchmarked 14 primary calculation engines against worked examples embedded in plain HTML:
- Mortgage, EMI, SIP, FD compounding, ROI CAGR, Compound Interest, BMI, TDEE, Steps-to-km, Quadratic roots, Combinations (nCr), Percentage change, Final grade, and Fuel trip cost.
- **Result:** 14 / 14 passed with 100% identical outputs.

### 3.5. Directory Index Serving Test
A standalone Node.js static HTTP server was launched against `dist/` with zero custom routing:
- Root `/` -> 200 OK
- Tool URLs (`/mortgage-calculator/`, `/bmi-ideal-weight-calculator/`, `/time-date-calculator/`) -> 200 OK
- Fixed assets (`/assets/css/main.css`, `/assets/js/main.js`, `/assets/js/calculators.js`, `/assets/search-index.json`) -> 200 OK
- SEO endpoints (`/sitemap.xml`, `/robots.txt`, `/llms.txt`) -> 200 OK

---

## 4. Server Configuration Parity

Two server configuration files are maintained in the repository:

1. **`dist/.htaccess` (Apache / LiteSpeed):**
   - Wrapped in `<IfModule>` guards so missing modules never cause HTTP 500 errors.
   - Sets `DirectoryIndex index.html`.
   - Single 301 redirect for dice roller.
   - Cache-Control: 1 hour for HTML, 1 year for static assets.
   - Gzip and Brotli compression directives.
   - Security headers: `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`.

2. **`server-config/nginx.conf` (Nginx):**
   - Configures `root`, `index index.html;`, and `try_files $uri $uri/ =404;`.
   - Identical single 301 redirect for dice roller.
   - Identical caching policy (1 hour HTML, 1 year immutable assets).
   - Identical security headers and gzip configuration.

---

## 5. Conclusion & Ready-for-Zip Status

The `dist/` directory is 100% complete, fully static, mathematically verified, and ready for immediate ZIP packaging and deployment to shared hosting and subsequent effortless migration to CloudPages.
