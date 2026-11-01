/**
 * AIO Calculator : Modular Engine: amortization
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'amortization' && !(toolType === 'tdee' && 'amortization' === 'calorie-macro') && !(toolType === 'scientific' && 'amortization' === 'basic-math')) {
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
    function buildAmortization(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="am-p">Loan Principal (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="am-p" class="form-input has-prefix" value="' + (def.principal || 250000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="am-r">Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="am-r" class="form-input has-suffix" value="' + (def.rate || 6.0) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="am-term">Term (Years)</label>' +
            '<input type="number" id="am-term" class="form-input" value="' + (def.tenureYears || 30) + '" step="5" min="5" max="30" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('am-p').value) || 0;
        var rate = parseFloat(document.getElementById('am-r').value) || 0;
        var years = parseFloat(document.getElementById('am-term').value) || 0;

        var r = (rate / 12) / 100;
        var n = years * 12;
        if (P <= 0 || r <= 0 || n <= 0) return;

        var monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        var total = monthly * n;
        var totalInterest = total - P;

        var m1Interest = P * r;
        var m1Principal = monthly - m1Interest;

        primaryLabel.textContent = 'Monthly Principal & Interest';
        primaryValue.textContent = formatCurrency(monthly) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Month 1 Interest:</span><span>' + formatCurrency(m1Interest) + '</span></div>' +
          '<div class="breakdown-row"><span>Month 1 Principal:</span><span>' + formatCurrency(m1Principal) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Interest over ' + years + ' yrs:</span><span>' + formatCurrency(totalInterest) + '</span></div>';
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
    buildAmortization(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
