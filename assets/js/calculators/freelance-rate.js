/**
 * AIO Calculator : Modular Engine: freelance-rate
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'freelance-rate') return;

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

    var defaults = { salary: 85000, overhead: 7200, billableHours: 25, vacationWeeks: 4, taxRate: 25, platformFee: 10 };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="fl-salary">Desired Annual Net Take-Home ($)</label>' +
          '<input type="number" id="fl-salary" class="form-input" value="' + defaults.salary + '" step="5000" />' +
          '<input type="range" id="fl-salary-slider" class="form-range" min="30000" max="250000" step="5000" value="' + defaults.salary + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="fl-overhead">Annual Business Overhead / Software ($)</label>' +
          '<input type="number" id="fl-overhead" class="form-input" value="' + defaults.overhead + '" step="500" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="fl-hours">Billable Client Hours Per Week</label>' +
          '<input type="number" id="fl-hours" class="form-input" value="' + defaults.billableHours + '" min="5" max="50" step="1" />' +
          '<input type="range" id="fl-hours-slider" class="form-range" min="10" max="40" step="1" value="' + defaults.billableHours + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="fl-vacation">Annual Time Off (Vacation & Sick Weeks)</label>' +
          '<input type="number" id="fl-vacation" class="form-input" value="' + defaults.vacationWeeks + '" min="0" max="15" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="fl-tax">Estimated Taxes & Insurance (%)</label>' +
          '<input type="number" id="fl-tax" class="form-input" value="' + defaults.taxRate + '" min="10" max="50" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="fl-platform">Platform Fee / Commission Buffer (%)</label>' +
          '<input type="number" id="fl-platform" class="form-input" value="' + defaults.platformFee + '" min="0" max="25" step="1" />' +
        '</div>' +
      '</div>';

    var salaryInp = document.getElementById('fl-salary');
    var salarySlider = document.getElementById('fl-salary-slider');
    var overheadInp = document.getElementById('fl-overhead');
    var hoursInp = document.getElementById('fl-hours');
    var hoursSlider = document.getElementById('fl-hours-slider');
    var vacationInp = document.getElementById('fl-vacation');
    var taxInp = document.getElementById('fl-tax');
    var platformInp = document.getElementById('fl-platform');

    salaryInp.addEventListener('input', function () { salarySlider.value = salaryInp.value; compute(); });
    salarySlider.addEventListener('input', function () { salaryInp.value = salarySlider.value; compute(); });
    hoursInp.addEventListener('input', function () { hoursSlider.value = hoursInp.value; compute(); });
    hoursSlider.addEventListener('input', function () { hoursInp.value = hoursSlider.value; compute(); });

    [overheadInp, vacationInp, taxInp, platformInp].forEach(function (inp) {
      inp.addEventListener('input', compute);
    });

    function compute() {
      var desiredNet = parseFloat(salaryInp.value) || 0;
      var overhead = parseFloat(overheadInp.value) || 0;
      var billablePerWeek = parseFloat(hoursInp.value) || 20;
      var vacationWeeks = parseFloat(vacationInp.value) || 4;
      var taxRate = (parseFloat(taxInp.value) || 25) / 100;
      var platformFee = (parseFloat(platformInp.value) || 0) / 100;

      var billableWeeks = Math.max(1, 52 - vacationWeeks);
      var annualBillableHours = billableWeeks * billablePerWeek;

      var retentionRate = Math.max(0.1, 1 - (taxRate + platformFee));
      var grossRevenueNeeded = (desiredNet + overhead) / retentionRate;

      var targetHourlyRate = grossRevenueNeeded / annualBillableHours;
      var dayRate = targetHourlyRate * 8;
      var minHourlyRate = (desiredNet + overhead) / annualBillableHours; // zero tax baseline

      primaryLabel.textContent = 'Target Billable Hourly Rate';
      primaryValue.textContent = formatCurrency(targetHourlyRate, 2) + ' / hr';

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Equivalent Day Rate (8 Hours):</span><span>' + formatCurrency(dayRate, 0) + ' / day</span></div>' +
        '<div class="breakdown-row highlight"><span>Required Gross Annual Billing:</span><span>' + formatCurrency(grossRevenueNeeded, 0) + '</span></div>' +
        '<div class="breakdown-row"><span>Total Annual Billable Hours:</span><span>' + Math.round(annualBillableHours) + ' hours (' + billableWeeks + ' weeks)</span></div>' +
        '<div class="breakdown-row"><span>Taxes & Platform Retention Buffer:</span><span>' + Math.round((taxRate + platformFee) * 100) + '%</span></div>' +
        '<div class="breakdown-row"><span>Absolute Minimum Hourly Floor:</span><span>' + formatCurrency(minHourlyRate, 2) + ' / hr</span></div>';
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
