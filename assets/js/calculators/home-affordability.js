/**
 * AIO Calculator : Modular Engine: home-affordability
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'home-affordability' && !(toolType === 'tdee' && 'home-affordability' === 'calorie-macro') && !(toolType === 'scientific' && 'home-affordability' === 'basic-math')) {
      return;
    }

    var formContainer = document.getElementById('calc-form-container');
    var primaryLabel = document.getElementById('res-primary-label');
    var primaryValue = document.getElementById('res-primary-value');
    var breakdownRows = document.getElementById('res-breakdown-rows');
    var copyBtn = document.getElementById('btn-copy-result');
    var copyText = document.getElementById('copy-btn-text');

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

    var getCurSymbol = function () {
      return (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.getSymbol === 'function')
        ? window.AIO_CURRENCY.getSymbol()
        : '$';
    };

    var getCurBarHtml = function () {
      return (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.getBarHtml === 'function')
        ? window.AIO_CURRENCY.getBarHtml()
        : '';
    };

    var formatNumber = function (val, dec) {
      if (dec === undefined) dec = 2;
      if (isNaN(val) || !isFinite(val)) return '0';
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: dec
      }).format(val);
    };

    var defaults = {};
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = JSON.parse(raw);
    } catch (e) {}

    // Tool Engine
    function buildHomeAffordability(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-inc">Gross Annual Household Income (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="ha-inc" class="form-input has-prefix" value="' + (def.annualIncome || 120000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-debt">Monthly Debt Payments (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="ha-debt" class="form-input has-prefix" value="' + (def.monthlyDebts || 600) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-down">Down Payment Cash (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="ha-down" class="form-input has-prefix" value="' + (def.downPayment || 60000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-rate">Mortgage Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ha-rate" class="form-input has-suffix" value="' + (def.mortgageRate || 6.54) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var annualInc = parseFloat(document.getElementById('ha-inc').value) || 0;
        var debts = parseFloat(document.getElementById('ha-debt').value) || 0;
        var down = parseFloat(document.getElementById('ha-down').value) || 0;
        var rate = parseFloat(document.getElementById('ha-rate').value) || 6.54;

        var monthlyInc = annualInc / 12;
        var frontEndMax = monthlyInc * 0.28;
        var backEndMax = Math.max(0, (monthlyInc * 0.36) - debts);
        var maxPiti = Math.min(frontEndMax, backEndMax);

        var maxPi = maxPiti * 0.82;
        var r = (rate / 12) / 100;
        var n = 360;

        var loanSupported = (maxPi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
        var maxHomePrice = Math.max(0, loanSupported + down);

        primaryLabel.textContent = 'Maximum Recommended Home Price';
        primaryValue.textContent = formatCurrency(maxHomePrice);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Max Monthly Housing Payment (PITI):</span><span>' + formatCurrency(maxPiti) + ' / mo</span></div>' +
          '<div class="breakdown-row highlight"><span>Max Loan Amount:</span><span>' + formatCurrency(loanSupported) + ' (' + formatCurrency(down) + ' down)</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.bindBar === 'function') {
        window.AIO_CURRENCY.bindBar(formContainer, compute);
      }
      window.addEventListener('aioCurrencyChange', function () {
        if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.updateForms === 'function') {
          window.AIO_CURRENCY.updateForms(window.AIO_CURRENCY.getCurrent());
        }
        compute();
      });
      compute();
    }

    // Initialize Tool
    buildHomeAffordability(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
