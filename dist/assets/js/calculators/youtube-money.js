/**
 * AIO Calculator : Modular Engine: youtube-money
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'youtube-money') return;

    var formContainer = document.getElementById('calc-form-container');
    var primaryLabel = document.getElementById('res-primary-label');
    var primaryValue = document.getElementById('res-primary-value');
    var breakdownRows = document.getElementById('res-breakdown-rows');

    if (!formContainer) return;

    var formatCurrency = function (val, maxDec) {
      if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.format === 'function') {
        return window.AIO_CURRENCY.format(val, maxDec);
      }
      if (maxDec === undefined) maxDec = 2;
      if (isNaN(val) || !isFinite(val)) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDec
      }).format(val);
    };

    var formatNumber = function (val, dec) {
      if (dec === undefined) dec = 0;
      if (isNaN(val) || !isFinite(val)) return '0';
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: dec }).format(val);
    };

    var defaults = { views: 25000, rpm: 4.50, niche: 'tech' };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="yt-views">Daily Video Views</label>' +
          '<input type="number" id="yt-views" class="form-input" value="' + (defaults.views || 25000) + '" min="100" max="10000000" step="1000" />' +
          '<input type="range" id="yt-views-slider" class="form-range" min="1000" max="500000" step="1000" value="' + (defaults.views || 25000) + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="yt-rpm">Estimated RPM ($ per 1,000 views)</label>' +
          '<input type="number" id="yt-rpm" class="form-input" value="' + (defaults.rpm || 4.50) + '" min="0.5" max="30" step="0.25" />' +
          '<input type="range" id="yt-rpm-slider" class="form-range" min="0.5" max="20" step="0.25" value="' + (defaults.rpm || 4.50) + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="yt-niche">Video Category / Niche</label>' +
          '<select id="yt-niche" class="form-input">' +
            '<option value="custom">Custom RPM</option>' +
            '<option value="finance">Finance, Crypto & Investing ($10.50 RPM)</option>' +
            '<option value="tech" selected>Technology, Software & AI ($6.80 RPM)</option>' +
            '<option value="business">Business & Entrepreneurship ($5.50 RPM)</option>' +
            '<option value="lifestyle">Lifestyle, Vlogs & Travel ($3.20 RPM)</option>' +
            '<option value="gaming">Gaming & Entertainment ($1.80 RPM)</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="yt-geo">Audience Geography Tier</label>' +
          '<select id="yt-geo" class="form-input">' +
            '<option value="1.0" selected>Tier 1 (US, UK, Canada, Australia, Germany)</option>' +
            '<option value="0.6">Tier 2 (Southern/Eastern Europe, Latin America)</option>' +
            '<option value="0.3">Tier 3 (India, Pakistan, Philippines, Worldwide)</option>' +
          '</select>' +
        '</div>' +
      '</div>';

    var viewsInp = document.getElementById('yt-views');
    var viewsSlider = document.getElementById('yt-views-slider');
    var rpmInp = document.getElementById('yt-rpm');
    var rpmSlider = document.getElementById('yt-rpm-slider');
    var nicheSelect = document.getElementById('yt-niche');
    var geoSelect = document.getElementById('yt-geo');

    viewsInp.addEventListener('input', function () { viewsSlider.value = viewsInp.value; compute(); });
    viewsSlider.addEventListener('input', function () { viewsInp.value = viewsSlider.value; compute(); });
    rpmInp.addEventListener('input', function () { rpmSlider.value = rpmInp.value; compute(); });
    rpmSlider.addEventListener('input', function () { rpmInp.value = rpmSlider.value; compute(); });

    nicheSelect.addEventListener('change', function () {
      var rates = { finance: 10.50, tech: 6.80, business: 5.50, lifestyle: 3.20, gaming: 1.80 };
      if (rates[nicheSelect.value]) {
        rpmInp.value = rates[nicheSelect.value];
        rpmSlider.value = rates[nicheSelect.value];
        compute();
      }
    });

    geoSelect.addEventListener('change', compute);

    function compute() {
      var views = parseFloat(viewsInp.value) || 0;
      var baseRpm = parseFloat(rpmInp.value) || 4.50;
      var geoMultiplier = parseFloat(geoSelect.value) || 1.0;

      var effectiveRpm = baseRpm * geoMultiplier;
      var dailyCreatorEarnings = (views / 1000) * effectiveRpm;
      var monthlyEarnings = dailyCreatorEarnings * 30.417;
      var annualEarnings = dailyCreatorEarnings * 365;

      // YouTube 45% revenue cut: Creator receives 55%, YouTube keeps 45% of gross
      var grossDailyRevenue = dailyCreatorEarnings / 0.55;
      var youtubeDailyCut = grossDailyRevenue * 0.45;
      var youtubeAnnualCut = youtubeDailyCut * 365;

      primaryLabel.textContent = 'Estimated Monthly Creator Revenue';
      primaryValue.textContent = formatCurrency(monthlyEarnings, 0);

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Estimated Daily Earnings:</span><span>' + formatCurrency(dailyCreatorEarnings, 2) + '</span></div>' +
        '<div class="breakdown-row highlight"><span>Projected Annual Income:</span><span>' + formatCurrency(annualEarnings, 0) + '</span></div>' +
        '<div class="breakdown-row"><span>Effective RPM (After Geo Tier):</span><span>$' + formatNumber(effectiveRpm, 2) + ' / 1k views</span></div>' +
        '<div class="breakdown-row"><span>Monthly Views Total:</span><span>' + formatNumber(views * 30.417, 0) + ' views</span></div>' +
        '<div class="breakdown-row"><span>YouTube 45% AdSense Cut (Annual):</span><span style="color:#dc2626;">&minus;' + formatCurrency(youtubeAnnualCut, 0) + '</span></div>';

      // Update Visual SVG Donut Widget if present
      var donutEl = document.getElementById('yt-revenue-donut');
      if (donutEl) {
        var pct = 55;
        var dashArray = (pct * 2.83) + ' ' + (283 - (pct * 2.83));
        donutEl.setAttribute('stroke-dasharray', dashArray);
      }
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
