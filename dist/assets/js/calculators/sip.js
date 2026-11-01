/**
 * AIO Calculator : Modular Engine: sip
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'sip' && !(toolType === 'tdee' && 'sip' === 'calorie-macro') && !(toolType === 'scientific' && 'sip' === 'basic-math')) {
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
    function buildSip(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="sip-pmt">Monthly Investment (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="sip-pmt" class="form-input has-prefix" value="' + (def.monthlyInvestment || 500) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sip-r">Expected Annual Return (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="sip-r" class="form-input has-suffix" value="' + (def.annualRate || 10.0) + '" step="0.5" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="sip-y">Investment Time Horizon (Years)</label>' +
            '<input type="number" id="sip-y" class="form-input" value="' + (def.tenureYears || 15) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var pmt = parseFloat(document.getElementById('sip-pmt').value) || 0;
        var rate = parseFloat(document.getElementById('sip-r').value) || 0;
        var years = parseFloat(document.getElementById('sip-y').value) || 0;

        var i = (rate / 12) / 100;
        var n = years * 12;
        if (pmt <= 0 || i <= 0 || n <= 0) return;

        var totalInvested = pmt * n;
        var fv = pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        var wealthGain = fv - totalInvested;

        primaryLabel.textContent = 'Projected Maturity Value';
        primaryValue.textContent = formatCurrency(fv);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Invested Capital:</span><span>' + formatCurrency(totalInvested) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Estimated Wealth Gained:</span><span style="color: var(--color-success);">' + formatCurrency(wealthGain) + '</span></div>';
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
    buildSip(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
