import fs from 'fs';
import path from 'path';
import { clusterA } from './cluster-a.js';
import { clusterB } from './cluster-b.js';
import { clusterC } from './cluster-c.js';
import { clusterD } from './cluster-d.js';
import { newTools } from './new-tools.js';

const allPages = [...clusterA, ...clusterB, ...clusterC, ...clusterD, ...newTools];

const sidebars = {
  'Fitness and Health Calculators': (activeSlug) => `
<aside class="sidebar" aria-label="Fitness and Health Calculators Navigation"><div class="sidebar-card"><h3 class="sidebar-title">Fitness and Health Calculators</h3><ul class="sidebar-list"><li class="sidebar-item"><a href="/bmi-ideal-weight-calculator/" class="sidebar-link ${activeSlug === 'bmi-ideal-weight-calculator' ? 'active" aria-current="page' : ''}">BMI and Ideal Weight Calculator</a></li><li class="sidebar-item"><a href="/bmi-body-fat-calculator/" class="sidebar-link ${activeSlug === 'bmi-body-fat-calculator' ? 'active" aria-current="page' : ''}">BMI and Body Fat Calculator</a></li><li class="sidebar-item"><a href="/calorie-intake-deficit-tracker/" class="sidebar-link ${activeSlug === 'calorie-intake-deficit-tracker' ? 'active" aria-current="page' : ''}">Calorie Intake / Deficit Tracker</a></li><li class="sidebar-item"><a href="/calorie-macro-calculator/" class="sidebar-link ${activeSlug === 'calorie-macro-calculator' ? 'active" aria-current="page' : ''}">Calorie and Macro Calculator</a></li><li class="sidebar-item"><a href="/tdee-calculator/" class="sidebar-link ${activeSlug === 'tdee-calculator' ? 'active" aria-current="page' : ''}">TDEE Calculator</a></li><li class="sidebar-item"><a href="/fitness-workout-calculator/" class="sidebar-link ${activeSlug === 'fitness-workout-calculator' ? 'active" aria-current="page' : ''}">Fitness and Workout Calculator</a></li><li class="sidebar-item"><a href="/pregnancy-due-date-finder/" class="sidebar-link ${activeSlug === 'pregnancy-due-date-finder' ? 'active" aria-current="page' : ''}">Pregnancy Due Date Finder</a></li><li class="sidebar-item"><a href="/steps-to-km-converter/" class="sidebar-link ${activeSlug === 'steps-to-km-converter' ? 'active" aria-current="page' : ''}">Steps to Km Converter</a></li><li class="sidebar-item"><a href="/water-intake-calculator/" class="sidebar-link ${activeSlug === 'water-intake-calculator' ? 'active" aria-current="page' : ''}">Water Intake Calculator</a></li></ul><div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; text-align: center;"><a href="/fitness-health-calculators/" style="font-size: 0.85rem; font-weight: 600;">View All Fitness and Health Calculators &rarr;</a></div></div></aside>`,

  'Everyday Tools': (activeSlug) => `
<aside class="sidebar" aria-label="Everyday Tools Navigation"><div class="sidebar-card"><h3 class="sidebar-title">Everyday Tools</h3><ul class="sidebar-list"><li class="sidebar-item"><a href="/time-date-calculator/" class="sidebar-link ${activeSlug === 'time-date-calculator' ? 'active" aria-current="page' : ''}">Time and Date Calculator</a></li><li class="sidebar-item"><a href="/unit-conversion-calculator/" class="sidebar-link ">Unit and Conversion Calculator</a></li><li class="sidebar-item"><a href="/finance-shopping-tools/" class="sidebar-link ${activeSlug === 'finance-shopping-tools' ? 'active" aria-current="page' : ''}">Finance and Shopping Tools</a></li><li class="sidebar-item"><a href="/home-vehicle-tools/" class="sidebar-link ">Home and Vehicle Tools</a></li><li class="sidebar-item"><a href="/tech-security-tools/" class="sidebar-link ">Tech and Security Tools</a></li><li class="sidebar-item"><a href="/sleep-calculator/" class="sidebar-link ${activeSlug === 'sleep-calculator' ? 'active" aria-current="page' : ''}">Sleep Calculator</a></li><li class="sidebar-item"><a href="/free-online-dice-roller-1-to-100/" class="sidebar-link ${activeSlug === 'free-online-dice-roller-1-to-100' ? 'active" aria-current="page' : ''}">Free Online Dice Roller (1 to 100)</a></li><li class="sidebar-item"><a href="/social-engagement-rate-calculator/" class="sidebar-link ${activeSlug === 'social-engagement-rate-calculator' ? 'active" aria-current="page' : ''}">Social Engagement Rate Calculator</a></li><li class="sidebar-item"><a href="/remote-work-savings-calculator/" class="sidebar-link ${activeSlug === 'remote-work-savings-calculator' ? 'active" aria-current="page' : ''}">Remote Work Savings Calculator</a></li><li class="sidebar-item"><a href="/ev-vs-gas-savings-calculator/" class="sidebar-link ${activeSlug === 'ev-vs-gas-savings-calculator' ? 'active" aria-current="page' : ''}">EV vs Gas Savings Calculator</a></li><li class="sidebar-item"><a href="/pet-age-food-calculator/" class="sidebar-link ${activeSlug === 'pet-age-food-calculator' ? 'active" aria-current="page' : ''}">Pet Age and Food Calculator</a></li><li class="sidebar-item"><a href="/countdown-timer/" class="sidebar-link ">Countdown Timer</a></li><li class="sidebar-item"><a href="/timezone-converter/" class="sidebar-link ">Timezone Converter</a></li></ul><div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; text-align: center;"><a href="/everyday-tools/" style="font-size: 0.85rem; font-weight: 600;">View All Everyday Tools &rarr;</a></div></div></aside>`,

  'Financial Calculators': (activeSlug) => `
<aside class="sidebar" aria-label="Financial Calculators Navigation"><div class="sidebar-card"><h3 class="sidebar-title">Financial Calculators</h3><ul class="sidebar-list"><li class="sidebar-item"><a href="/emi-calculator/" class="sidebar-link ">EMI Calculator</a></li><li class="sidebar-item"><a href="/loan-interest-analyzer/" class="sidebar-link ">Loan Interest Analyzer</a></li><li class="sidebar-item"><a href="/mortgage-calculator/" class="sidebar-link ">Mortgage Calculator</a></li><li class="sidebar-item"><a href="/credit-card-calculator/" class="sidebar-link ">Credit Card Calculator</a></li><li class="sidebar-item"><a href="/amortization-calculator/" class="sidebar-link ${activeSlug === 'amortization-calculator' ? 'active" aria-current="page' : ''}">Amortization Calculator</a></li><li class="sidebar-item"><a href="/sip-investment-planner/" class="sidebar-link ">SIP Investment Planner</a></li><li class="sidebar-item"><a href="/investment-roi-calculator/" class="sidebar-link ${activeSlug === 'investment-roi-calculator' ? 'active" aria-current="page' : ''}">Investment ROI Calculator</a></li><li class="sidebar-item"><a href="/fd-vs-rd-comparison/" class="sidebar-link ${activeSlug === 'fd-vs-rd-comparison' ? 'active" aria-current="page' : ''}">FD vs RD Comparison</a></li><li class="sidebar-item"><a href="/currency-inflation-calculator/" class="sidebar-link ${activeSlug === 'currency-inflation-calculator' ? 'active" aria-current="page' : ''}">Currency Inflation Calculator</a></li><li class="sidebar-item"><a href="/rent-vs-buy-calculator/" class="sidebar-link ${activeSlug === 'rent-vs-buy-calculator' ? 'active" aria-current="page' : ''}">Rent vs Buy Calculator</a></li><li class="sidebar-item"><a href="/freelance-hourly-rate-calculator/" class="sidebar-link ${activeSlug === 'freelance-hourly-rate-calculator' ? 'active" aria-current="page' : ''}">Freelance Hourly Rate Calculator</a></li><li class="sidebar-item"><a href="/hourly-to-salary-calculator/" class="sidebar-link ${activeSlug === 'hourly-to-salary-calculator' ? 'active" aria-current="page' : ''}">Hourly to Salary Calculator</a></li><li class="sidebar-item"><a href="/savings-calculator/" class="sidebar-link ">Savings Calculator</a></li><li class="sidebar-item"><a href="/compound-interest-calculator/" class="sidebar-link ">Compound Interest Calculator</a></li></ul><div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; text-align: center;"><a href="/financial-calculators/" style="font-size: 0.85rem; font-weight: 600;">View All Financial Calculators &rarr;</a></div></div></aside>`,

  'Finance and Shopping Tools': (activeSlug) => `
<aside class="sidebar" aria-label="Finance and Shopping Tools Navigation"><div class="sidebar-card"><h3 class="sidebar-title">Finance &amp; Shopping Tools</h3><ul class="sidebar-list"><li class="sidebar-item"><a href="/finance-shopping-tools/" class="sidebar-link ">Finance and Shopping Tools</a></li><li class="sidebar-item"><a href="/youtube-money-calculator/" class="sidebar-link ${activeSlug === 'youtube-money-calculator' ? 'active" aria-current="page' : ''}">YouTube Money Calculator</a></li><li class="sidebar-item"><a href="/freelance-hourly-rate-calculator/" class="sidebar-link ">Freelance Hourly Rate Calculator</a></li><li class="sidebar-item"><a href="/hourly-to-salary-calculator/" class="sidebar-link ">Hourly to Salary Calculator</a></li><li class="sidebar-item"><a href="/unit-conversion-calculator/" class="sidebar-link ">Unit and Conversion Calculator</a></li></ul><div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; text-align: center;"><a href="/everyday-tools/" style="font-size: 0.85rem; font-weight: 600;">View All Everyday Tools &rarr;</a></div></div></aside>`,

  'Math': (activeSlug) => `
<aside class="sidebar" aria-label="Math Calculators Navigation"><div class="sidebar-card"><h3 class="sidebar-title">Math Calculators</h3><ul class="sidebar-list"><li class="sidebar-item"><a href="/basic-math-calculator/" class="sidebar-link ${activeSlug === 'basic-math-calculator' ? 'active" aria-current="page' : ''}">Basic Math Calculator</a></li><li class="sidebar-item"><a href="/scientific-calculator/" class="sidebar-link ">Scientific Calculator</a></li><li class="sidebar-item"><a href="/algebra-equations-calculator/" class="sidebar-link ">Algebra and Equations Calculator</a></li><li class="sidebar-item"><a href="/fraction-calculator/" class="sidebar-link ">Fraction Calculator</a></li><li class="sidebar-item"><a href="/average-statistics-calculator/" class="sidebar-link ${activeSlug === 'average-statistics-calculator' ? 'active" aria-current="page' : ''}">Average and Statistics Calculator</a></li><li class="sidebar-item"><a href="/percentage-calculator/" class="sidebar-link ">Percentage Calculator</a></li><li class="sidebar-item"><a href="/probability-data-calculator/" class="sidebar-link ">Probability Data Calculator</a></li></ul><div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; text-align: center;"><a href="/math-calculators/" style="font-size: 0.85rem; font-weight: 600;">View All Math Calculators &rarr;</a></div></div></aside>`
};

function getSidebarHtml(categoryName, slug) {
  const bar = sidebars[categoryName] || sidebars['Everyday Tools'];
  if (typeof bar === 'function') {
    return bar(slug);
  }
  return bar;
}

function generateHtml(page) {
  const canonicalUrl = `https://aio-calculator.com/${page.slug}/`;

  // Schemas
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIO Calculator",
    "url": "https://aio-calculator.com/",
    "logo": "https://aio-calculator.com/logo.png",
    "description": "100+ free online calculators for finance, health, math, and everyday utility. In-browser calculations with zero tracking."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aio-calculator.com/" },
      { "@type": "ListItem", "position": 2, "name": page.categoryName, "item": `https://aio-calculator.com${page.categoryUrl}` },
      { "@type": "ListItem", "position": 3, "name": page.h1, "item": canonicalUrl }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": page.h1,
    "url": canonicalUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": page.metaDescription,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "creator": { "@type": "Organization", "name": "AIO Calculator" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const relatedHtml = page.relatedCalculators.map(r => `
    <a href="${r.url}" style="display: block; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit; transition: all 0.15s ease;">
      <div style="font-weight: 700; color: #2563eb; font-size: 0.95rem; margin-bottom: 0.25rem;">${r.name}</div>
      <div style="font-size: 0.825rem; color: #475569; line-height: 1.4;">${r.desc}</div>
    </a>
  `).join('');

  const faqItemsHtml = page.faqs.map(f => `
    <article class="faq-item">
      <h3 class="faq-question"><span>${f.question}</span></h3>
      <div class="faq-answer"><p>${f.answer}</p></div>
    </article>
  `).join('');

  const sidebarHtml = getSidebarHtml(page.categoryName, page.slug);
  const hubNavBlock = page.hasHubNav ? page.hubNavHtml : '';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${page.pageTitle}</title><meta name="description" content="${page.metaDescription}"><link rel="canonical" href="${canonicalUrl}">
<!-- Favicons & App Icons -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2563eb">
<meta name="application-name" content="AIO Calculator">
<meta name="apple-mobile-web-app-title" content="AIO Calculator">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"><!-- OpenGraph --><meta property="og:site_name" content="AIO Calculator"><meta property="og:title" content="${page.pageTitle}"><meta property="og:description" content="${page.metaDescription}"><meta property="og:url" content="${canonicalUrl}"><meta property="og:type" content="website">
<meta property="og:image" content="https://aio-calculator.com/logo.png">
<meta property="og:image:width" content="512">
<meta property="og:image:height" content="512">
<meta property="og:image:type" content="image/png"><!-- Twitter Card --><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${page.pageTitle}"><meta name="twitter:description" content="${page.metaDescription}">
<meta name="twitter:image" content="https://aio-calculator.com/logo.png"><!-- Preconnect for performance --><link rel="preconnect" href="https://aio-calculator.com"><!-- Fixed Root-Relative CSS (Pure Static Hosting Portability) --><link rel="stylesheet" href="/assets/css/main.css"><!-- Monetag Ad Tags --><script src="https://5gvci.com/act/files/tag.min.js?z=12217426" data-cfasync="false" async></script><script src="https://quge5.com/88/tag.min.js" data-zone="307457" async data-cfasync="false"></script><!-- Structured Data JSON-LD --><script type="application/ld+json">${JSON.stringify(orgSchema)}</script><script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script><script type="application/ld+json">${JSON.stringify(webAppSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><!-- Header --><header class="site-header"><div class="container header-inner"><a href="/" class="brand-link" aria-label="AIO Calculator Home"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: #2563eb;"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg><span>AIO Calculator</span><span class="brand-badge">Free</span></a><!-- Dynamic Category Landing Page Navigation --><nav class="nav-desktop" aria-label="Primary Navigation"><a href="/financial-calculators/" class="nav-link ">Financial</a><a href="/fitness-health-calculators/" class="nav-link ">Fitness and Health</a><a href="/math-calculators/" class="nav-link ">Math</a><a href="/everyday-tools/" class="nav-link ">Everyday Tools</a><a href="/all-tools/" class="nav-link ">All Tools</a><a href="/blog/" class="nav-link ">Guides</a></nav><div class="header-actions"><button id="search-trigger-btn" class="btn-search-trigger" type="button" aria-label="Search calculators"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>Search tools...</span><kbd style="font-size: 0.75rem; background: #e2e8f0; padding: 0.1rem 0.35rem; border-radius: 4px; font-family: monospace;">/</kbd></button></div></div></header><!-- Trust Strip --><aside class="trust-strip" aria-label="Privacy and accuracy guarantees"><div class="container trust-strip-inner"><span class="trust-item"><svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>100% Free Forever</span><span class="trust-item"><svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>No Sign-Up or Paywall</span><span class="trust-item"><svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Private In-Browser Calculations</span><span class="trust-item"><svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Official Verified 2026 Formulas</span></div></aside><!-- Breadcrumbs --><nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol><li><a href="https://aio-calculator.com/">Home</a></li><li><a href="https://aio-calculator.com${page.categoryUrl}">${page.categoryName}</a></li><li><span aria-current="page">${page.h1}</span></li></ol></div></nav><!-- Main Content Slot --><main id="main-content"><div class="container"><div class="tool-page-grid"><!-- Main Content Column --><article class="prose"><!-- 2. One H1 only, matching the tool name people search for --><h1>${page.h1}</h1><!-- 3. Direct answer first: 2-3 plain sentences with answer in the first sentence --><div class="direct-answer-lead" style="font-size: 1.15rem; line-height: 1.6; color: #1e293b; margin-bottom: 1.5rem; border-left: 3px solid #2563eb; padding-left: 1rem;">${page.capsuleText}</div>
<p style="font-size: 0.95rem; color: #475569; margin-bottom: 1.25rem;">${page.firstViewportCta}</p>
<!-- 1. Tool ABOVE THE FOLD (Instant calculation, no sign-up, copy/share result) --><section id="interactive-tool-section" aria-label="Interactive ${page.h1}">${hubNavBlock}<div class="calculator-card" id="calculator-root" data-tool-type="${page.toolType}" data-defaults='${page.dataDefaults}'><div class="calculator-card-header"><div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;"><span style="font-weight: 700; color: #0f172a; font-size: 1.1rem;">Interactive ${page.h1}</span><span style="font-size: 0.8rem; background-color: #eff6ff; color: #2563eb; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 4px;">Instant In-Browser Calculation</span></div></div><!-- Dynamic Calculator UI Form Container --><div id="calc-form-container"><!-- Populated by tool-specific modular engine from /assets/js/calculators/[toolType].js --></div><!-- Output / Results Box (Pre-allocated in HTML to guarantee Zero Layout Shift / CLS = 0) --><div class="results-box" id="calc-results-container" style="min-height: 180px; margin-top: 1.5rem;" aria-live="polite"><div><div class="result-main"><div class="result-label" id="res-primary-label">Estimated Output</div><div class="result-value" id="res-primary-value"> - </div></div><div class="result-breakdown" id="res-breakdown-rows"><!-- Breakdown rows populated dynamically --></div></div><div class="result-actions"><button type="button" class="btn btn-secondary btn-sm" id="btn-copy-result" style="width: 100%;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span id="copy-btn-text">Copy Result</span></button></div></div>
<!-- SaaS Action Bar: Share Presets, Reset, Print Summary & Embed Widget Modal -->
<div class="saas-action-bar">
  <button type="button" class="saas-action-btn" id="btn-share-link" aria-label="Copy shareable link with current inputs">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
    <span>Share Link</span>
  </button>
  <button type="button" class="saas-action-btn" id="btn-reset-calc" aria-label="Reset calculator to defaults">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    <span>Reset</span>
  </button>
  <button type="button" class="saas-action-btn" id="btn-print-summary" aria-label="Print or export summary as PDF">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
    <span>Export PDF</span>
  </button>
  <button type="button" class="saas-action-btn" id="btn-toggle-embed" aria-label="Embed this calculator on your website">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    <span>Embed Widget</span>
  </button>
</div>
<div class="embed-widget-box" id="embed-widget-box">
  <label for="embed-snippet-text" style="font-size: 0.85rem; font-weight: 600; color: #0f172a; margin-bottom: 0.35rem; display: block;">Embed this calculator on your website (Free with attribution):</label>
  <textarea id="embed-snippet-text" class="embed-textarea" readonly rows="3">&lt;iframe src="${canonicalUrl}" width="100%" height="520" frameborder="0" style="border-radius:8px;border:1px solid #e2e8f0;"&gt;&lt;/iframe&gt;
&lt;p style="font-size:12px;color:#64748b;margin-top:6px;"&gt;Calculated using &lt;a href="${canonicalUrl}" target="_blank" rel="noopener"&gt;AIO Calculator&lt;/a&gt;&lt;/p&gt;</textarea>
  <button type="button" class="btn btn-primary btn-sm" id="btn-copy-embed" style="margin-top: 0.5rem;">Copy Embed Code</button>
</div>
</div><!-- Modular High-Performance Client Calculator Script (CloudPages / LiteSpeed Non-Blocking Asset) --><script src="/assets/js/currency.js" defer></script><script src="/assets/js/calculators/${page.toolType}.js" defer></script><script src="/assets/js/saas-actions.js" defer></script></section>

<!-- Immediate Benefit & Value Pillars (SaaS 3-Column Micro-Features Grid) -->
<div class="saas-value-pillars">
  <div class="saas-pillar-card">
    <div class="saas-pillar-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
    </div>
    <div class="saas-pillar-title">Instant Calculation</div>
    <div class="saas-pillar-desc">Runs 100% in your browser with zero latency and zero server roundtrips.</div>
  </div>
  <div class="saas-pillar-card">
    <div class="saas-pillar-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    </div>
    <div class="saas-pillar-title">Bank-Grade Privacy</div>
    <div class="saas-pillar-desc">Your financial and personal numbers never leave your device. Zero telemetry.</div>
  </div>
  <div class="saas-pillar-card">
    <div class="saas-pillar-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    </div>
    <div class="saas-pillar-title">Verified 2026 Math</div>
    <div class="saas-pillar-desc">Formulas strictly adhere to published statutory, clinical, and banking standards.</div>
  </div>
</div>

<!-- Primary Hero Conceptual Image -->
<figure style="margin: 2rem 0 2.5rem 0;">
  <img src="${page.heroImage.url}" alt="${page.heroImage.alt}" title="${page.heroImage.title}" width="1200" height="675" loading="lazy" decoding="async" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #e2e8f0; display: block;">
  <figcaption style="font-size: 0.825rem; color: #64748b; margin-top: 0.5rem; text-align: center;">${page.heroImage.caption}</figcaption>
</figure>

<!-- 4. Formula / Method in plain HTML (written out, every input explained) --><section id="formula-method" aria-labelledby="heading-formula"><h2 id="heading-formula">Formula and Calculation Method</h2>${page.formulaHtml}</section><!-- 5. Worked Example with real numbers matching tool output --><section id="worked-example" aria-labelledby="heading-worked-example"><h2 id="heading-worked-example">Worked Example and Step-by-Step Calculation</h2>${page.workedExampleHtml}</section><!-- 6. How to Use It, Step by Step --><section id="how-to-use" aria-labelledby="heading-how-to-use"><h2 id="heading-how-to-use">How to Use the ${page.h1}</h2>${page.howToUseHtml}</section>

<!-- Benchmark Table Section -->
<section id="reference-tables" aria-labelledby="heading-tables">
  ${page.tableSectionHtml}
</section>

<!-- Informational Infographic Section Image -->
<figure style="margin: 2rem 0 2.5rem 0;">
  <img src="${page.infoImage.url}" alt="${page.infoImage.alt}" title="${page.infoImage.title}" width="1200" height="675" loading="lazy" decoding="async" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #e2e8f0; display: block;">
  <figcaption style="font-size: 0.825rem; color: #64748b; margin-top: 0.5rem; text-align: center;">${page.infoImage.caption}</figcaption>
</figure>

<!-- 7. Common Mistakes, Limitations & What to Do with the Result --><section id="limitations-mistakes" aria-labelledby="heading-limitations"><h2 id="heading-limitations">Common Mistakes, Limitations &amp; Practical Guidance</h2>${page.limitationsHtml}</section>

<!-- In-Depth Mathematical / Scientific Guide & Scenarios Section -->
<section class="statutory-framework-section" style="margin-top: 2.5rem; margin-bottom: 2rem;">
  ${page.inDepthSectionHtml}
</section>

<!-- 8. Frequently Asked Questions (Matching exact page name!) -->
<section class="faq-section" aria-labelledby="heading-faqs"><h2 id="heading-faqs">Frequently Asked Questions About ${page.h1}</h2>${faqItemsHtml}</section><!-- 9. Related Calculators (Internal links to adjacent tools) --><section id="related-calculators" style="margin-top: 2.5rem;" aria-labelledby="heading-related"><h2 id="heading-related">Related Calculators</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem;">${relatedHtml}</div></section><!-- Related In-Depth Guides & Articles --><!-- 10. Sourced Data & Date Line (number + unit + source + date) --><footer class="source-line"><strong>Sources &amp; Verification:</strong><ul style="list-style: none; padding-left: 0; margin-top: 0.5rem;"><li style="margin-bottom: 0.35rem;">${page.sourceLine}</li></ul></footer></article><!-- Sidebar Column: Shows navigation for ITS OWN category only -->${sidebarHtml}</div></div></main><!-- Footer with dynamic current year --><footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-col" style="grid-column: span 1.5;"><h4>AIO Calculator</h4><p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Over 100 free online calculators for personal finance, mortgages, fitness, academic math, and everyday utility. Calculations execute directly in your browser with zero data tracking.</p><div style="font-size: 0.85rem; color: #94a3b8;"><strong>Privacy Guarantee:</strong> Your numbers never leave your device.</div></div><div class="footer-col"><h4>Financial Calculators</h4><ul><li><a href="/emi-calculator/">EMI Calculator</a></li><li><a href="/loan-interest-analyzer/">Loan Interest Analyzer</a></li><li><a href="/mortgage-calculator/">Mortgage Calculator</a></li><li><a href="/credit-card-calculator/">Credit Card Calculator</a></li><li><a href="/amortization-calculator/">Amortization Calculator</a></li><li><a href="/sip-investment-planner/">SIP Investment Planner</a></li><li><a href="/financial-calculators/">View All Finance (22) &rarr;</a></li></ul></div><div class="footer-col"><h4>Health &amp; Fitness</h4><ul><li><a href="/bmi-ideal-weight-calculator/">BMI and Ideal Weight Calculator</a></li><li><a href="/bmi-body-fat-calculator/">BMI and Body Fat Calculator</a></li><li><a href="/calorie-intake-deficit-tracker/">Calorie Intake / Deficit Tracker</a></li><li><a href="/calorie-macro-calculator/">Calorie and Macro Calculator</a></li><li><a href="/tdee-calculator/">TDEE Calculator</a></li><li><a href="/fitness-workout-calculator/">Fitness and Workout Calculator</a></li><li><a href="/fitness-health-calculators/">View All Health (8) &rarr;</a></li></ul></div><div class="footer-col"><h4>Math &amp; Everyday</h4><ul><li><a href="/basic-math-calculator/">Basic Math Calculator</a></li><li><a href="/scientific-calculator/">Scientific Calculator</a></li><li><a href="/algebra-equations-calculator/">Algebra and Equations Calculator</a></li><li><a href="/time-date-calculator/">Time and Date Calculator</a></li><li><a href="/unit-conversion-calculator/">Unit and Conversion Calculator</a></li><li><a href="/finance-shopping-tools/">Finance and Shopping Tools</a></li><li><a href="/all-tools/">All Tools Directory (49) &rarr;</a></li></ul></div><div class="footer-col"><h4>About &amp; Legal</h4><ul><li><a href="/about-us/">About Us</a></li><li><a href="/contact-us/">Contact Us</a></li><li><a href="/blog/">Calculation Guides</a></li><li><a href="/privacy-policy/">Privacy Policy</a></li><li><a href="/disclaimer-aio-calculator/">Disclaimer</a></li><li><a href="/terms-conditions-aio-calculator/">Terms &amp; Conditions</a></li></ul></div></div><div class="footer-bottom"><div>&copy; <span id="current-year">2026</span> AIO Calculator. All rights reserved.</div><div style="display: flex; gap: 1rem;"><a href="/privacy-policy/">Privacy</a><a href="/disclaimer-aio-calculator/">Disclaimer</a><a href="/terms-conditions-aio-calculator/">Terms</a><a href="/all-tools/">Directory</a></div><div class="footer-currency-wrapper"><svg class="currency-globe-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><select id="global-currency-select" class="footer-currency-select" aria-label="Select Currency"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="INR">INR (₹)</option><option value="PKR">PKR (Rs)</option><option value="AED">AED (AED)</option><option value="SAR">SAR (SAR)</option><option value="CAD">CAD (C$)</option><option value="AUD">AUD (A$)</option><option value="JPY">JPY (¥)</option><option value="CNY">CNY (¥)</option><option value="CHF">CHF (CHF)</option><option value="BRL">BRL (R$)</option><option value="TRY">TRY (₺)</option><option value="ZAR">ZAR (R)</option><option value="SGD">SGD (S$)</option><option value="NZD">NZD (NZ$)</option><option value="MYR">MYR (RM)</option><option value="PHP">PHP (₱)</option><option value="BDT">BDT (৳)</option><option value="NGN">NGN (₦)</option></select></div></div></div></footer><!-- Instant Search Modal --><div id="search-modal" class="search-modal-backdrop" role="dialog" aria-modal="true" aria-label="Search all calculators"><div class="search-modal"><div class="search-header"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #94a3b8;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><input id="global-search-input" class="search-input" type="search" placeholder="Search 45+ free calculators (e.g. mortgage, BMI, GPA, tax)..." autocomplete="off"><button id="search-close-btn" type="button" class="btn btn-secondary btn-sm" aria-label="Close search">Esc</button></div><div id="search-results-box" class="search-results"><!-- Results populated dynamically --></div></div></div><!-- Fixed Root-Relative Client Scripts (Pure Static Hosting Portability) --><script src="/assets/js/main.js" defer></script></body></html>`;
}

const bannedWords = [
  'delve', 'delving', 'tapestry', "in today's fast-paced world", "in today's digital landscape",
  'furthermore', 'testament to', 'a beacon of', 'pivotal', 'vital', 'crucial',
  'robust', 'seamless', 'seamlessly', 'plethora', 'myriad', 'game-changer',
  'foster', 'fostering', 'holistic', 'leverage', 'leveraging', 'empower', 'empowering',
  'moreover', 'in conclusion'
];

let totalPassed = 0;
let errorsEncountered = 0;

for (const p of allPages) {
  const html = generateHtml(p);
  const cleanContent = html.replace(/<!--[\s\S]*?-->/g, '');

  console.log(`\n======================================================`);
  console.log(`Checking Page: /${p.slug}/`);
  console.log(`======================================================`);

  // 1. Em-dashes / en-dashes / double hyphens outside comments
  const dashes = cleanContent.match(/[—–]|--/g);
  if (dashes) {
    console.error(`  [FAIL] Dashes detected: ${dashes.length}`);
    errorsEncountered++;
  } else {
    console.log(`  [PASS] Zero em-dashes / en-dashes`);
  }

  // 2. Banned AI Words
  let bannedFound = [];
  for (const word of bannedWords) {
    const reg = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    const matches = cleanContent.match(reg);
    if (matches) {
      bannedFound.push(`${word} (${matches.length})`);
    }
  }
  if (bannedFound.length > 0) {
    console.error(`  [FAIL] Banned AI words found: ${bannedFound.join(', ')}`);
    errorsEncountered++;
  } else {
    console.log(`  [PASS] Zero banned AI words`);
  }

  // 3. Single H1
  const h1s = [...cleanContent.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length !== 1) {
    console.error(`  [FAIL] H1 count: ${h1s.length}`);
    errorsEncountered++;
  } else {
    console.log(`  [PASS] Single H1: "${h1s[0][1]}"`);
  }

  // 4. Direct Answer Capsule (40 to 48 words strict)
  const capsuleMatch = cleanContent.match(/class=["'][^"']*direct-answer[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>/i);
  let capsuleWordCount = 0;
  if (capsuleMatch) {
    const raw = capsuleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const cleanText = raw.replace(/^Direct Answer:\s*/i, '');
    capsuleWordCount = cleanText.split(' ').filter(Boolean).length;
    if (capsuleWordCount < 40 || capsuleWordCount > 48) {
      console.error(`  [FAIL] Capsule words: ${capsuleWordCount} (must be 40 to 48)`);
      errorsEncountered++;
    } else {
      console.log(`  [PASS] Capsule words: ${capsuleWordCount} (40-48 compliant)`);
    }
  } else {
    console.error(`  [FAIL] Capsule not found`);
    errorsEncountered++;
  }

  // 5. Meta Title (50 to 60 characters)
  const titleMatch = cleanContent.match(/<title>([\s\S]*?)<\/title>/i);
  let titleLen = 0;
  if (titleMatch) {
    titleLen = titleMatch[1].trim().length;
    if (titleLen < 50 || titleLen > 60) {
      console.error(`  [FAIL] Title length: ${titleLen} ("${titleMatch[1]}")`);
      errorsEncountered++;
    } else {
      console.log(`  [PASS] Title length: ${titleLen} ("${titleMatch[1]}")`);
    }
  }

  // 6. Meta Description (140 to 155 characters)
  const descMatch = cleanContent.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']>/i);
  let descLen = 0;
  if (descMatch) {
    descLen = descMatch[1].trim().length;
    if (descLen < 140 || descLen > 155) {
      console.error(`  [FAIL] Description length: ${descLen}`);
      errorsEncountered++;
    } else {
      console.log(`  [PASS] Description length: ${descLen}`);
    }
  }

  // 7. Word Count >= 1,200 Words
  const textOnly = cleanContent.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                               .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                               .replace(/<[^>]+>/g, ' ')
                               .replace(/\s+/g, ' ').trim();
  const wordCount = textOnly.split(' ').filter(Boolean).length;
  if (wordCount < 1200) {
    console.error(`  [FAIL] Word count: ${wordCount} (must be >= 1,200)`);
    errorsEncountered++;
  } else {
    console.log(`  [PASS] Word count: ${wordCount} (>= 1,200)`);
  }

  // 8. Zero markdown artifacts
  const bodyText = cleanContent.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  if (bodyText.includes('**') || bodyText.includes('```')) {
    console.error(`  [FAIL] Markdown artifacts detected`);
    errorsEncountered++;
  } else {
    console.log(`  [PASS] Zero markdown artifacts`);
  }

  // 9. JSON-LD scripts validate
  const jsonMatches = [...cleanContent.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  let jsonErrors = 0;
  for (const j of jsonMatches) {
    try {
      JSON.parse(j[1].trim());
    } catch (e) {
      jsonErrors++;
    }
  }
  if (jsonErrors > 0) {
    console.error(`  [FAIL] JSON-LD parse errors: ${jsonErrors}`);
    errorsEncountered++;
  } else {
    console.log(`  [PASS] ${jsonMatches.length} valid JSON-LD schemas`);
  }

  // Write file to root and dist
  const rootTarget = path.join('.', p.slug, 'index.html');
  const distTarget = path.join('.', 'dist', p.slug, 'index.html');

  fs.mkdirSync(path.dirname(rootTarget), { recursive: true });
  fs.mkdirSync(path.dirname(distTarget), { recursive: true });

  fs.writeFileSync(rootTarget, html, 'utf8');
  fs.writeFileSync(distTarget, html, 'utf8');

  console.log(`  [WRITTEN] ${rootTarget} & ${distTarget}`);
  totalPassed++;
}

console.log(`\n======================================================`);
console.log(`Successfully built and updated all ${totalPassed} pages!`);
console.log(`Errors encountered: ${errorsEncountered}`);
console.log(`======================================================\n`);

if (errorsEncountered > 0) {
  process.exit(1);
}
