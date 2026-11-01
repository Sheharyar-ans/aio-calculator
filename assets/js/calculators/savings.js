/**
 * AIO Calculator : Modular Engine: savings
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'savings' && !(toolType === 'tdee' && 'savings' === 'calorie-macro') && !(toolType === 'scientific' && 'savings' === 'basic-math')) {
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
    function buildSavings(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-init">Starting Savings (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="sv-init" class="form-input has-prefix" value="' + (def.initialSavings || 5000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-mo">Monthly Deposit (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="sv-mo" class="form-input has-prefix" value="' + (def.monthlyDeposit || 400) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-apy">APY (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="sv-apy" class="form-input has-suffix" value="' + (def.apy || 4.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-yrs">Horizon (Years)</label>' +
            '<input type="number" id="sv-yrs" class="form-input" value="' + (def.years || 5) + '" step="1" min="1" max="30" />' +
          '</div>' +
        '</div>';

      function compute() {
        var init = parseFloat(document.getElementById('sv-init').value) || 0;
        var mo = parseFloat(document.getElementById('sv-mo').value) || 0;
        var apy = (parseFloat(document.getElementById('sv-apy').value) || 0) / 100;
        var yrs = parseFloat(document.getElementById('sv-yrs').value) || 0;

        var r = apy / 12;
        var n = yrs * 12;

        var initGrowth = init * Math.pow(1 + r, n);
        var moGrowth = r > 0 ? mo * ((Math.pow(1 + r, n) - 1) / r) : mo * n;
        var total = initGrowth + moGrowth;
        var totalDeposited = init + (mo * n);
        var interestEarned = total - totalDeposited;

        primaryLabel.textContent = 'Total Savings Accumulated';
        primaryValue.textContent = formatCurrency(total);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Principal Deposited:</span><span>' + formatCurrency(totalDeposited) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Compound Interest Earned:</span><span style="color: var(--color-success);">' + formatCurrency(interestEarned) + '</span></div>';
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
    buildSavings(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
