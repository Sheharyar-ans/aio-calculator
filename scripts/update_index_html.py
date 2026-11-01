import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add scroll-world-hero.css to head
if "scroll-world-hero.css" not in content:
    content = content.replace(
        '<link rel="stylesheet" href="/assets/css/main.css">',
        '<link rel="stylesheet" href="/assets/css/main.css">\n<link rel="stylesheet" href="/assets/css/scroll-world-hero.css">'
    )

# 2. Add scroll-world.js to scripts before </body>
if "scroll-world.js" not in content:
    content = content.replace(
        '<script src="/assets/js/main.js" defer></script>',
        '<script src="/assets/js/main.js" defer></script>\n<script src="/assets/js/scroll-world.js" defer></script>'
    )

# 3. Clean SVG brand-link icon color literal
content = re.sub(r'style="color:\s*#2563eb;"', 'style="color: var(--color-primary);"', content)

# 4. Clean search kbd inline style
content = re.sub(
    r'<kbd style="font-size: 0\.75rem; background: #e2e8f0; padding: 0\.1rem 0\.35rem; border-radius: 4px; font-family: monospace;">',
    '<kbd class="kbd-hint">',
    content
)

# 5. Clean direct answer lead inline style
content = re.sub(
    r'<div class="direct-answer-lead"[^>]*>',
    '<div class="direct-answer-lead">',
    content
)

# 6. Replace glued arrows in link text
content = content.replace('View all 45+ tools →', 'View all 45 tools')
content = content.replace('Explore all 22 financial tools →', 'Explore all financial tools')
content = content.replace('Explore all 8 health tools →', 'Explore all health tools')
content = content.replace('Explore all 10 math tools →', 'Explore all math tools')
content = content.replace('Explore all 9 everyday tools →', 'Explore all everyday tools')
content = content.replace('View all guides →', 'View all guides')
content = content.replace('Calculate now →', 'Calculate now')
content = content.replace('Open hub →', 'Open hub')
content = content.replace('Read complete guide →', 'Read guide')
content = content.replace('Open Tool Page →', 'Open tool')
content = content.replace('View All 14 Tools →', 'View all tools')
content = content.replace('View All 8 Tools →', 'View all tools')
content = content.replace('View All 10 Tools →', 'View all tools')
content = content.replace('Open Complete 45+ Tools Catalog →', 'Open complete catalog')
content = content.replace('View All Finance (22) →', 'View all financial tools')
content = content.replace('View All Health (8) →', 'View all health tools')
content = content.replace('All Tools Directory (49) →', 'All tools directory')

# 7. Remove eyebrows before headings
content = re.sub(r'<span class="section-tag"[^>]*>[^<]*</span>\s*(<h2[^>]*>)', r'\1', content)
content = re.sub(r'<span class="diorama-tag"[^>]*>[^<]*</span>\s*(<h3[^>]*>)', r'\1', content)

# 8. Clean template footer line "All rights reserved"
content = content.replace('. All rights reserved.', '.')

# 9. Clean three-period ellipsis in search inputs
content = content.replace('...', '…')

# 10. Clean inline styles in blog articles & footer
content = re.sub(r'style="background:\s*var\(\s*-\s*color-white\);\s*border:\s*1px\s*solid\s*#e2e8f0;\s*border-radius:\s*12px;\s*padding:\s*1\.5rem;\s*display:\s*flex;\s*flex-direction:\s*column;\s*justify-content:\s*space-between;"', 'class="guide-article-card"', content)
content = re.sub(r'style="font-size:\s*0\.8rem;\s*color:\s*#64748b;\s*margin-bottom:\s*0\.5rem;"', 'class="guide-meta-date"', content)
content = re.sub(r'style="font-size:\s*1\.15rem;\s*margin-top:\s*0;\s*margin-bottom:\s*0\.75rem;"', 'class="guide-article-title"', content)
content = re.sub(r'style="color:\s*#0f172a;\s*text-decoration:\s*none;"', 'class="guide-title-link"', content)
content = re.sub(r'style="font-size:\s*0\.9rem;\s*color:\s*#475569;\s*line-height:\s*1\.5;"', 'class="guide-article-desc"', content)
content = re.sub(r'style="color:\s*#94a3b8;\s*font-size:\s*0\.9rem;\s*line-height:\s*1\.5;\s*margin-bottom:\s*1rem;"', 'class="footer-brand-desc"', content)
content = re.sub(r'style="font-size:\s*0\.85rem;\s*color:\s*#94a3b8;"', 'class="footer-privacy-note"', content)
content = re.sub(r'style="color:\s*#94a3b8;"', 'class="text-muted-icon"', content)
content = re.sub(r'style="background:\s*#2563eb;\s*color:\s*#fff;\s*font-size:\s*0\.75rem;\s*font-weight:\s*700;\s*padding:\s*0\.2rem\s*0\.5rem;\s*border-radius:\s*4px;\s*text-transform:\s*uppercase;"', 'class="badge-upgraded"', content)
content = re.sub(r'style="background:\s*linear-gradient\(135deg,\s*#eff6ff\s*0%,\s*#ffffff\s*100%\);\s*border:\s*1\.5px\s*solid\s*var\(\s*-\s*color-primary-border\);\s*border-radius:\s*12px;\s*padding:\s*1\.5rem;\s*display:\s*flex;\s*flex-direction:\s*column;\s*justify-content:\s*space-between;"', 'class="featured-upgraded-card"', content)
content = re.sub(r'style="color:\s*#ffffff;\s*text-decoration:\s*none;"', 'class="btn-text-white"', content)
content = re.sub(r'style="text-decoration:\s*none;\s*color:\s*#fff;"', 'class="btn-text-white"', content)

# 11. Replace old #hero-interactive-world with the Scroll World Video Scrub Hero
scroll_world_hero_html = """<!-- Scroll World 3D Cinematic Hero -->
<div class="hero-scroll-track" id="hero-scroll-track" aria-label="AIO Calculator 3D Interactive World">
  <div class="hero-sticky-container">
    <div class="container hero-headline-block">
      <div class="hero-badge"><span class="badge-pulse"></span>100+ Free Online Calculators</div>
      <h1 class="hero-title-main">Free Online Calculators for Every Decision</h1>
      <p class="hero-lead-text">Fast, verified, client-side online calculators across finance, health, math, and daily productivity.</p>
      
      <div class="hero-search-wrapper">
        <form action="/all-tools/" method="get" class="hero-search-form" role="search">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="search" name="q" id="hero-search-input" class="hero-search-input" placeholder="Search 45+ calculators (e.g. Mortgage, BMI, Calorie, GPA, Compound Interest)…" autocomplete="off">
          <button type="submit" class="btn btn-primary hero-search-btn">Search</button>
        </form>
      </div>

      <div class="hero-popular-strip">
        <span class="popular-label">Popular:</span>
        <div class="popular-pills">
          <a href="/mortgage-calculator/" class="popular-pill">Mortgage</a>
          <a href="/bmi-ideal-weight-calculator/" class="popular-pill">BMI &amp; Ideal Weight</a>
          <a href="/calorie-macro-calculator/" class="popular-pill">Calorie &amp; Macro</a>
          <a href="/compound-interest-calculator/" class="popular-pill">Compound Interest</a>
          <a href="/basic-math-calculator/" class="popular-pill">Basic Math</a>
          <a href="/gpa-calculator/" class="popular-pill">GPA</a>
          <a href="/time-date-calculator/" class="popular-pill">Age &amp; Date</a>
        </div>
      </div>
    </div>

    <!-- 3D Cinematic Stage Card -->
    <div class="container">
      <div class="hero-stage-card">
        <div class="hero-stage-nav" role="tablist" aria-label="3D Calculator Districts">
          <div class="hero-district-tabs">
            <button class="hero-district-tab active" data-district="0" role="tab" aria-selected="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              Finance Realm
            </button>
            <button class="hero-district-tab" data-district="1" role="tab" aria-selected="false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Health &amp; Fitness
            </button>
            <button class="hero-district-tab" data-district="2" role="tab" aria-selected="false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
              Math &amp; Science
            </button>
            <button class="hero-district-tab" data-district="3" role="tab" aria-selected="false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Everyday Utility
            </button>
            <button class="hero-district-tab" data-district="4" role="tab" aria-selected="false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              AIO Unified Core
            </button>
          </div>

          <div class="hero-stage-status">
            <div class="hero-scrub-indicator">
              <span>Scroll to fly</span>
              <div class="hero-progress-track">
                <div class="hero-progress-bar" id="hero-progress-bar"></div>
              </div>
            </div>
            <button id="hero-toggle-play" class="hero-toggle-play" type="button" aria-label="Toggle camera flight">
              <svg id="hero-toggle-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span id="hero-toggle-label">Play</span>
            </button>
          </div>
        </div>

        <div class="hero-viewport-outer">
          <video id="hero-scroll-video" class="hero-scroll-video" muted playsinline preload="auto" poster="/assets/hero/aio-scroll-poster.webp">
            <source src="/assets/hero/aio-scroll-world.mp4" type="video/mp4">
          </video>

          <div class="hero-story-overlay" id="hero-story-overlay">
            <h2 class="hero-story-title" id="hero-story-title">Personal Finance Realm</h2>
            <p class="hero-story-desc" id="hero-story-desc">Calculate exact mortgage obligations, compound wealth trajectories, EMI repayment splits, and debt payoff horizons.</p>
            <div class="hero-story-links" id="hero-story-links">
              <a href="/mortgage-calculator/" class="hero-story-link">Mortgage PITI</a>
              <a href="/emi-calculator/" class="hero-story-link">EMI Calculator</a>
              <a href="/sip-investment-planner/" class="hero-story-link">SIP Planner</a>
              <a href="/compound-interest-calculator/" class="hero-story-link">Compound Growth</a>
              <a href="/financial-calculators/" class="hero-story-link highlight">Financial Hub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>"""

# Replace old hero section
old_hero_pattern = r'<section class="hero-section" id="hero-interactive-world".*?</script>'
content = re.sub(old_hero_pattern, scroll_world_hero_html, content, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html successfully")
