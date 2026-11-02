/**
 * AIO Calculator : Modular Engine: hourly-to-salary
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'hourly-to-salary') return;

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

    var defaults = { wage: 25.00, hours: 40, overtimeHours: 0, weeks: 52 };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="hs-wage">Hourly Wage ($ / hr)</label>' +
          '<input type="number" id="hs-wage" class="form-input" value="' + defaults.wage + '" min="1" step="0.50" />' +
          '<input type="range" id="hs-wage-slider" class="form-range" min="10" max="150" step="1" value="' + defaults.wage + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="hs-hours">Regular Hours Per Week</label>' +
          '<input type="number" id="hs-hours" class="form-input" value="' + defaults.hours + '" min="1" max="80" step="1" />' +
          '<input type="range" id="hs-hours-slider" class="form-range" min="10" max="60" step="1" value="' + defaults.hours + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="hs-overtime">Overtime Hours Per Week (1.5&times; Pay)</label>' +
          '<input type="number" id="hs-overtime" class="form-input" value="' + defaults.overtimeHours + '" min="0" max="40" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="hs-weeks">Paid Weeks Per Year</label>' +
          '<input type="number" id="hs-weeks" class="form-input" value="' + defaults.weeks + '" min="20" max="52" step="1" />' +
        '</div>' +
      '</div>';

    var wageInp = document.getElementById('hs-wage');
    var wageSlider = document.getElementById('hs-wage-slider');
    var hoursInp = document.getElementById('hs-hours');
    var hoursSlider = document.getElementById('hs-hours-slider');
    var overtimeInp = document.getElementById('hs-overtime');
    var weeksInp = document.getElementById('hs-weeks');

    wageInp.addEventListener('input', function () { wageSlider.value = wageInp.value; compute(); });
    wageSlider.addEventListener('input', function () { wageInp.value = wageSlider.value; compute(); });
    hoursInp.addEventListener('input', function () { hoursSlider.value = hoursInp.value; compute(); });
    hoursSlider.addEventListener('input', function () { hoursInp.value = hoursSlider.value; compute(); });

    overtimeInp.addEventListener('input', compute);
    weeksInp.addEventListener('input', compute);

    function compute() {
      var wage = parseFloat(wageInp.value) || 0;
      var hours = parseFloat(hoursInp.value) || 40;
      var otHours = parseFloat(overtimeInp.value) || 0;
      var weeks = parseFloat(weeksInp.value) || 52;

      var weeklyRegularPay = wage * hours;
      var weeklyOtPay = otHours * (wage * 1.5);
      var totalWeeklyPay = weeklyRegularPay + weeklyOtPay;

      var annualSalary = totalWeeklyPay * weeks;
      var monthlyPay = annualSalary / 12;
      var biWeeklyPay = annualSalary / 26;
      var dailyPay = (hours > 0) ? (weeklyRegularPay / (hours / 8)) : 0;

      primaryLabel.textContent = 'Equivalent Annual Gross Salary';
      primaryValue.textContent = formatCurrency(annualSalary, 0) + ' / yr';

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Monthly Equivalent Pay:</span><span>' + formatCurrency(monthlyPay, 2) + ' / mo</span></div>' +
        '<div class="breakdown-row highlight"><span>Bi-Weekly Paycheck:</span><span>' + formatCurrency(biWeeklyPay, 2) + ' / 2 weeks</span></div>' +
        '<div class="breakdown-row"><span>Weekly Gross Pay:</span><span>' + formatCurrency(totalWeeklyPay, 2) + ' / week</span></div>' +
        '<div class="breakdown-row"><span>Daily Pay (8-hour standard):</span><span>' + formatCurrency(dailyPay, 2) + ' / day</span></div>' +
        (otHours > 0 ? '<div class="breakdown-row"><span>Annual Overtime Premium:</span><span style="color:#16a34a;">+' + formatCurrency(weeklyOtPay * weeks, 0) + '</span></div>' : '');
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
