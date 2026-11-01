/**
 * AIO Calculator : Modular Engine: compound-interest
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'compound-interest' && !(toolType === 'tdee' && 'compound-interest' === 'calorie-macro') && !(toolType === 'scientific' && 'compound-interest' === 'basic-math')) {
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
    function buildCompoundInterest(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-p">Initial Principal Deposit (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="ci-p" class="form-input has-prefix" value="' + (def.principal || 15000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-mo">Monthly Addition (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="ci-mo" class="form-input has-prefix" value="' + (def.monthlyDeposit || 350) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-r">Annual Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ci-r" class="form-input has-suffix" value="' + (def.rate || 8.0) + '" step="0.25" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="ci-t">Time Horizon (Years)</label>' +
            '<input type="number" id="ci-t" class="form-input" value="' + (def.years || 25) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('ci-p').value) || 0;
        var pmt = parseFloat(document.getElementById('ci-mo').value) || 0;
        var r = (parseFloat(document.getElementById('ci-r').value) || 0) / 100;
        var t = parseFloat(document.getElementById('ci-t').value) || 0;
        var n = 12;

        var fvPrincipal = P * Math.pow(1 + r/n, n * t);
        var fvPmt = (pmt * (Math.pow(1 + r/n, n * t) - 1)) / (r / n);
        var total = fvPrincipal + fvPmt;
        var totalDeposited = P + (pmt * n * t);
        var totalInterest = total - totalDeposited;

        primaryLabel.textContent = 'Total Future Compound Balance';
        primaryValue.textContent = formatCurrency(total);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Principal Deposited:</span><span>' + formatCurrency(totalDeposited) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Compound Interest Earned:</span><span style="color: var(--color-success);">' + formatCurrency(totalInterest) + '</span></div>';
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
    buildCompoundInterest(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
