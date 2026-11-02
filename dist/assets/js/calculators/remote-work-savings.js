/**
 * AIO Calculator : Modular Engine: remote-work-savings
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'remote-work-savings') return;

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

    var defaults = { roundtripMiles: 30, wfhDays: 5, gasPrice: 3.60, mpg: 26, lunchCost: 12, commuteMinutes: 60 };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="rw-dist">Roundtrip Commute Distance (Miles / Km)</label>' +
          '<input type="number" id="rw-dist" class="form-input" value="' + defaults.roundtripMiles + '" min="1" step="2" />' +
          '<input type="range" id="rw-dist-slider" class="form-range" min="5" max="100" step="1" value="' + defaults.roundtripMiles + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="rw-days">Remote Work Days Per Week</label>' +
          '<input type="number" id="rw-days" class="form-input" value="' + defaults.wfhDays + '" min="1" max="5" step="1" />' +
          '<input type="range" id="rw-days-slider" class="form-range" min="1" max="5" step="1" value="' + defaults.wfhDays + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="rw-gas">Gas / Petrol Price ($ / Gallon)</label>' +
          '<input type="number" id="rw-gas" class="form-input" value="' + defaults.gasPrice + '" step="0.10" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="rw-mpg">Vehicle Efficiency (Miles Per Gallon)</label>' +
          '<input type="number" id="rw-mpg" class="form-input" value="' + defaults.mpg + '" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="rw-lunch">Daily Office Lunch &amp; Coffee Expense ($)</label>' +
          '<input type="number" id="rw-lunch" class="form-input" value="' + defaults.lunchCost + '" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="rw-time">Daily Roundtrip Commute Time (Minutes)</label>' +
          '<input type="number" id="rw-time" class="form-input" value="' + defaults.commuteMinutes + '" step="5" />' +
        '</div>' +
      '</div>';

    var distInp = document.getElementById('rw-dist');
    var distSlider = document.getElementById('rw-dist-slider');
    var daysInp = document.getElementById('rw-days');
    var daysSlider = document.getElementById('rw-days-slider');
    var gasInp = document.getElementById('rw-gas');
    var mpgInp = document.getElementById('rw-mpg');
    var lunchInp = document.getElementById('rw-lunch');
    var timeInp = document.getElementById('rw-time');

    distInp.addEventListener('input', function () { distSlider.value = distInp.value; compute(); });
    distSlider.addEventListener('input', function () { distInp.value = distSlider.value; compute(); });
    daysInp.addEventListener('input', function () { daysSlider.value = daysInp.value; compute(); });
    daysSlider.addEventListener('input', function () { daysInp.value = daysSlider.value; compute(); });

    [gasInp, mpgInp, lunchInp, timeInp].forEach(function (inp) {
      inp.addEventListener('input', compute);
    });

    function compute() {
      var dist = parseFloat(distInp.value) || 0;
      var wfhDays = parseFloat(daysInp.value) || 1;
      var gasPrice = parseFloat(gasInp.value) || 3.50;
      var mpg = Math.max(1, parseFloat(mpgInp.value) || 25);
      var lunchCost = parseFloat(lunchInp.value) || 0;
      var commuteMins = parseFloat(timeInp.value) || 0;

      var annualWorkWeeks = 50;
      var annualWfhDays = wfhDays * annualWorkWeeks;
      var annualCommuteMilesSaved = dist * annualWfhDays;

      var gallonsSaved = annualCommuteMilesSaved / mpg;
      var annualFuelSavings = gallonsSaved * gasPrice;
      var annualWearSavings = annualCommuteMilesSaved * 0.12; // IRS / AAA wear & tear depreciation baseline ($0.12/mi)
      var annualLunchSavings = lunchCost * annualWfhDays;
      var totalAnnualCashSaved = annualFuelSavings + annualWearSavings + annualLunchSavings;
      var monthlyCashSaved = totalAnnualCashSaved / 12;

      var annualHoursReclaimed = (commuteMins * annualWfhDays) / 60;
      var co2SavedKg = gallonsSaved * 8.887; // EPA standard: 8,887 grams CO2 per gallon of gasoline

      primaryLabel.textContent = 'Total Annual Cash Savings';
      primaryValue.textContent = formatCurrency(totalAnnualCashSaved, 0);

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Monthly Cash Retained:</span><span>' + formatCurrency(monthlyCashSaved, 2) + ' / mo</span></div>' +
        '<div class="breakdown-row highlight"><span>Commute Hours Reclaimed:</span><span>' + Math.round(annualHoursReclaimed) + ' hours / yr (' + (annualHoursReclaimed / 24).toFixed(1) + ' full days)</span></div>' +
        '<div class="breakdown-row"><span>Annual Fuel Cost Avoided:</span><span>' + formatCurrency(annualFuelSavings, 0) + ' (' + Math.round(gallonsSaved) + ' gal)</span></div>' +
        '<div class="breakdown-row"><span>Vehicle Wear &amp; Tear Saved:</span><span>' + formatCurrency(annualWearSavings, 0) + '</span></div>' +
        '<div class="breakdown-row"><span>Office Lunch &amp; Coffee Avoided:</span><span>' + formatCurrency(annualLunchSavings, 0) + '</span></div>' +
        '<div class="breakdown-row"><span>Carbon Emissions Prevented:</span><span style="color:#16a34a;">' + Math.round(co2SavedKg) + ' kg CO2</span></div>';
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
