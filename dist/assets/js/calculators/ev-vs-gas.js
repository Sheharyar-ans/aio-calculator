/**
 * AIO Calculator : Modular Engine: ev-vs-gas
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'ev-vs-gas') return;

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

    var defaults = { annualMiles: 15000, gasPrice: 3.60, mpg: 28, evKwh: 30, kwhRate: 0.16, pricePremium: 4500 };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="ev-miles">Annual Distance Driven (Miles)</label>' +
          '<input type="number" id="ev-miles" class="form-input" value="' + defaults.annualMiles + '" min="1000" step="1000" />' +
          '<input type="range" id="ev-miles-slider" class="form-range" min="5000" max="40000" step="1000" value="' + defaults.annualMiles + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="ev-gasprice">Gas / Petrol Price ($ / Gallon)</label>' +
          '<input type="number" id="ev-gasprice" class="form-input" value="' + defaults.gasPrice + '" step="0.10" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="ev-mpg">Gas Car Fuel Economy (MPG)</label>' +
          '<input type="number" id="ev-mpg" class="form-input" value="' + defaults.mpg + '" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="ev-kwh">EV Consumption (kWh per 100 Miles)</label>' +
          '<input type="number" id="ev-kwh" class="form-input" value="' + defaults.evKwh + '" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="ev-tariff">Residential Electricity Tariff ($ / kWh)</label>' +
          '<input type="number" id="ev-tariff" class="form-input" value="' + defaults.kwhRate + '" step="0.01" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="ev-premium">EV Upfront Purchase Price Premium ($)</label>' +
          '<input type="number" id="ev-premium" class="form-input" value="' + defaults.pricePremium + '" step="500" />' +
        '</div>' +
      '</div>';

    var milesInp = document.getElementById('ev-miles');
    var milesSlider = document.getElementById('ev-miles-slider');
    var gasPriceInp = document.getElementById('ev-gasprice');
    var mpgInp = document.getElementById('ev-mpg');
    var evKwhInp = document.getElementById('ev-kwh');
    var tariffInp = document.getElementById('ev-tariff');
    var premiumInp = document.getElementById('ev-premium');

    milesInp.addEventListener('input', function () { milesSlider.value = milesInp.value; compute(); });
    milesSlider.addEventListener('input', function () { milesInp.value = milesSlider.value; compute(); });

    [gasPriceInp, mpgInp, evKwhInp, tariffInp, premiumInp].forEach(function (inp) {
      inp.addEventListener('input', compute);
    });

    function compute() {
      var miles = parseFloat(milesInp.value) || 0;
      var gasPrice = parseFloat(gasPriceInp.value) || 3.50;
      var mpg = Math.max(1, parseFloat(mpgInp.value) || 28);
      var kwhPer100 = parseFloat(evKwhInp.value) || 30;
      var tariff = parseFloat(tariffInp.value) || 0.15;
      var premium = parseFloat(premiumInp.value) || 0;

      // 1. Annual Fuel Costs
      var annualGasCost = (miles / mpg) * gasPrice;
      var annualEvElectricityCost = (miles / 100) * kwhPer100 * tariff;
      var annualEnergySavings = annualGasCost - annualEvElectricityCost;

      // 2. Annual Maintenance Differences (Consumer Reports / AAA baseline: EV saves ~$450/yr on oil, brakes, spark plugs)
      var annualMaintSavings = 450;
      var totalAnnualSavings = annualEnergySavings + annualMaintSavings;
      var fiveYearSavings = totalAnnualSavings * 5;

      var paybackYears = (totalAnnualSavings > 0) ? (premium / totalAnnualSavings) : 0;

      primaryLabel.textContent = 'Estimated Annual Fuel & Energy Savings';
      primaryValue.textContent = formatCurrency(annualEnergySavings, 0) + ' / yr';

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>5-Year Cumulative Savings (Fuel + Maint):</span><span style="color:#16a34a;">' + formatCurrency(fiveYearSavings, 0) + '</span></div>' +
        '<div class="breakdown-row highlight"><span>Upfront Price Premium Payback:</span><span>' + (paybackYears > 0 ? (paybackYears.toFixed(1) + ' Years') : 'Immediate') + '</span></div>' +
        '<div class="breakdown-row"><span>Annual Gas Car Fuel Expense:</span><span>' + formatCurrency(annualGasCost, 0) + '</span></div>' +
        '<div class="breakdown-row"><span>Annual EV Home Charging Expense:</span><span>' + formatCurrency(annualEvElectricityCost, 0) + '</span></div>' +
        '<div class="breakdown-row"><span>Fuel Cost Per Mile:</span><span>Gas: ' + formatCurrency(annualGasCost / miles, 3) + ' | EV: ' + formatCurrency(annualEvElectricityCost / miles, 3) + '</span></div>';
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
