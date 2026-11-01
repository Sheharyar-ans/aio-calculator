/**
 * AIO Calculator : Modular Engine: tax
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'tax' && !(toolType === 'tdee' && 'tax' === 'calorie-macro') && !(toolType === 'scientific' && 'tax' === 'basic-math')) {
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
    function buildTax(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="tx-inc">Annual Gross Income (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="tx-inc" class="form-input has-prefix" value="' + (def.grossIncome || 95000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="tx-status">Filing Status (2026 Brackets)</label>' +
            '<select id="tx-status" class="form-select">' +
              '<option value="single">Single Filer ($15,750 std deduction)</option>' +
              '<option value="mfj">Married Filing Jointly ($31,500 std deduction)</option>' +
              '<option value="hoh">Head of Household ($23,625 std deduction)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var inc = parseFloat(document.getElementById('tx-inc').value) || 0;
        var status = document.getElementById('tx-status').value;

        var stdDeduction = 15750;
        var brackets = [
          { cap: 11925, rate: 0.10 },
          { cap: 48475, rate: 0.12 },
          { cap: 103350, rate: 0.22 },
          { cap: 197300, rate: 0.24 },
          { cap: 250525, rate: 0.32 },
          { cap: 626350, rate: 0.35 },
          { cap: Infinity, rate: 0.37 }
        ];

        if (status === 'mfj') {
          stdDeduction = 31500;
          brackets = [
            { cap: 23850, rate: 0.10 },
            { cap: 96950, rate: 0.12 },
            { cap: 206700, rate: 0.22 },
            { cap: 394600, rate: 0.24 },
            { cap: 501050, rate: 0.32 },
            { cap: 751600, rate: 0.35 },
            { cap: Infinity, rate: 0.37 }
          ];
        } else if (status === 'hoh') {
          stdDeduction = 23625;
          brackets = [
            { cap: 17000, rate: 0.10 },
            { cap: 64850, rate: 0.12 },
            { cap: 103350, rate: 0.22 },
            { cap: 197300, rate: 0.24 },
            { cap: 250500, rate: 0.32 },
            { cap: 626350, rate: 0.35 },
            { cap: Infinity, rate: 0.37 }
          ];
        }

        var taxable = Math.max(0, inc - stdDeduction);
        var totalTax = 0;
        var prevCap = 0;
        var marginalRate = 10;

        for (var i = 0; i < brackets.length; i++) {
          var b = brackets[i];
          if (taxable > prevCap) {
            var chunk = Math.min(taxable - prevCap, b.cap - prevCap);
            totalTax += chunk * b.rate;
            marginalRate = b.rate * 100;
            prevCap = b.cap;
          } else {
            break;
          }
        }

        var effectiveRate = inc > 0 ? (totalTax / inc) * 100 : 0;
        var takeHome = inc - totalTax;

        primaryLabel.textContent = 'Estimated Federal Income Tax (2026)';
        primaryValue.textContent = formatCurrency(totalTax);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Taxable Income:</span><span>' + formatCurrency(taxable) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Effective Tax Rate:</span><span>' + formatNumber(effectiveRate, 2) + '%</span></div>' +
          '<div class="breakdown-row"><span>Marginal Tax Bracket:</span><span>' + marginalRate + '%</span></div>' +
          '<div class="breakdown-row"><span>Take-Home Pay (Pre-FICA/State):</span><span>' + formatCurrency(takeHome) + '</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
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
    buildTax(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
