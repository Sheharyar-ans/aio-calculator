/* Hallmark & Scroll World: 3D Video Scrubbing Controller */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', initScrollWorld);

  function initScrollWorld() {
    const track = document.getElementById('hero-scroll-track');
    const video = document.getElementById('hero-scroll-video');
    const progressBar = document.getElementById('hero-progress-bar');
    const tabs = document.querySelectorAll('.hero-district-tab');
    const toggleBtn = document.getElementById('hero-toggle-play');
    const toggleIcon = document.getElementById('hero-toggle-icon');
    const toggleLabel = document.getElementById('hero-toggle-label');
    const storyTitle = document.getElementById('hero-story-title');
    const storyDesc = document.getElementById('hero-story-desc');
    const storyLinks = document.getElementById('hero-story-links');

    if (!track || !video) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const DISTRICTS = [
      {
        id: 0,
        name: 'Personal Finance Realm',
        desc: 'Calculate exact mortgage obligations, compound wealth trajectories, EMI repayment splits, and debt payoff horizons.',
        links: [
          { name: 'Mortgage PITI', href: '/mortgage-calculator/' },
          { name: 'EMI Calculator', href: '/emi-calculator/' },
          { name: 'SIP Planner', href: '/sip-investment-planner/' },
          { name: 'Compound Growth', href: '/compound-interest-calculator/' },
          { name: 'Financial Hub', href: '/financial-calculators/', highlight: true }
        ],
        poster: '/assets/hero/district-0-finance.webp',
        timePct: 0.10
      },
      {
        id: 1,
        name: 'Health & Biometrics Realm',
        desc: 'Measure body composition with Navy circumference methods, compute Mifflin-St Jeor TDEE energy expenditure, and manage calorie deficits.',
        links: [
          { name: 'BMI & Weight', href: '/bmi-ideal-weight-calculator/' },
          { name: 'TDEE & Macros', href: '/calorie-macro-calculator/' },
          { name: 'Deficit Tracker', href: '/calorie-intake-deficit-tracker/' },
          { name: 'Health Suite', href: '/fitness-health-calculators/', highlight: true }
        ],
        poster: '/assets/hero/district-1-health.webp',
        timePct: 0.32
      },
      {
        id: 2,
        name: 'Math & Exact Science Realm',
        desc: 'Solve polynomial algebra, evaluate integrals, compute 3D geometric volumes, and calculate combinatorial distributions.',
        links: [
          { name: 'Basic Math', href: '/basic-math-calculator/' },
          { name: 'Scientific Tools', href: '/scientific-calculator/' },
          { name: '3D Geometry', href: '/geometry-calculator/' },
          { name: 'Equations & Roots', href: '/algebra-equations-calculator/' },
          { name: 'Math Catalog', href: '/math-calculators/', highlight: true }
        ],
        poster: '/assets/hero/district-2-math.webp',
        timePct: 0.54
      },
      {
        id: 3,
        name: 'Everyday Utility & Life Realm',
        desc: 'Determine calendar date gaps, convert metric and imperial measures, compute trip mileage fuel expenses, and optimize 90-minute sleep cycles.',
        links: [
          { name: 'Age & Date', href: '/time-date-calculator/' },
          { name: 'Unit Converter', href: '/unit-conversion-calculator/' },
          { name: 'Sleep Cycles', href: '/sleep-calculator/' },
          { name: 'Shopping & Tips', href: '/finance-shopping-tools/' },
          { name: 'Everyday Hub', href: '/everyday-tools/', highlight: true }
        ],
        poster: '/assets/hero/district-3-utility.webp',
        timePct: 0.76
      },
      {
        id: 4,
        name: 'Central Unified Calculator Hub',
        desc: 'All 45+ verified mathematical engines united in one private, client-side, zero-tracking web application.',
        links: [
          { name: 'View Complete Catalog (45+)', href: '/all-tools/', highlight: true },
          { name: 'Calculation Guides', href: '/blog/' }
        ],
        poster: '/assets/hero/district-4-aio.webp',
        timePct: 0.95
      }
    ];

    let currentDistrict = 0;
    let isSeeking = false;
    let targetTime = 0;
    let autoPlaying = false;
    let autoTimer = null;
    let rafId = null;

    // Load metadata and ready state
    video.load();

    function updateOverlay(idx) {
      if (idx === currentDistrict && storyTitle.textContent) return;
      currentDistrict = idx;
      const data = DISTRICTS[idx];

      tabs.forEach((tab, i) => {
        const isActive = i === idx;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      storyTitle.textContent = data.name;
      storyDesc.textContent = data.desc;

      storyLinks.innerHTML = data.links.map(l => 
        `<a href="${l.href}" class="hero-story-link ${l.highlight ? 'highlight' : ''}">${l.name}</a>`
      ).join('');
    }

    function renderScrub() {
      if (video.duration) {
        if (!isSeeking && Math.abs(video.currentTime - targetTime) > 0.04) {
          isSeeking = true;
          video.currentTime = targetTime;
        }
      }
      rafId = null;
    }

    video.addEventListener('seeked', () => {
      isSeeking = false;
    });

    function onScroll() {
      if (autoPlaying || reduceMotion) return;
      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      if (trackHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / trackHeight));

      if (progressBar) {
        progressBar.style.width = (progress * 100).toFixed(1) + '%';
      }

      if (video.duration) {
        targetTime = progress * video.duration;
        if (!rafId) {
          rafId = requestAnimationFrame(renderScrub);
        }
      }

      // Determine active realm
      const districtIdx = Math.min(4, Math.floor(progress * 5));
      updateOverlay(districtIdx);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Tab click jumps to that section in the scroll track
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        pauseAuto();
        const idx = parseInt(tab.getAttribute('data-district'), 10);
        updateOverlay(idx);

        if (reduceMotion) {
          if (video.duration) {
            video.currentTime = DISTRICTS[idx].timePct * video.duration;
          }
          return;
        }

        const rect = track.getBoundingClientRect();
        const trackTop = window.scrollY + rect.top;
        const trackHeight = rect.height - window.innerHeight;
        const scrollTarget = trackTop + (DISTRICTS[idx].timePct * trackHeight);

        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
      });
    });

    // Auto flight play/pause toggle
    function startAuto() {
      if (reduceMotion) return;
      autoPlaying = true;
      if (toggleLabel) toggleLabel.textContent = 'Pause';
      if (toggleIcon) {
        toggleIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }

      let step = (currentDistrict + 1) % 5;
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        const next = step;
        step = (step + 1) % 5;
        tabs[next]?.click();
        autoPlaying = true; // keep auto flag active during automated scroll
        if (toggleLabel) toggleLabel.textContent = 'Pause';
      }, 4200);
    }

    function pauseAuto() {
      autoPlaying = false;
      clearInterval(autoTimer);
      if (toggleLabel) toggleLabel.textContent = 'Play';
      if (toggleIcon) {
        toggleIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      }
    }

    toggleBtn?.addEventListener('click', () => {
      if (autoPlaying) {
        pauseAuto();
      } else {
        startAuto();
      }
    });

    // Initialize first state
    updateOverlay(0);
    onScroll();
  }
})();
