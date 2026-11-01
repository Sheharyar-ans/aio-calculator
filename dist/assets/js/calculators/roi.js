/**
 * AIO Calculator : Modular Engine: roi
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'roi' && !(toolType === 'tdee' && 'roi' === 'calorie-macro') && !(toolType === 'scientific' && 'roi' === 'basic-math')) {
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
    function buildRoi(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="roi-cost">Initial Cost (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="roi-cost" class="form-input has-prefix" value="' + (def.initialCost || 60000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="roi-ret">Final Value (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="roi-ret" class="form-input has-prefix" value="' + (def.finalValue || 95000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="roi-yrs">Holding Period (Years)</label>' +
            '<input type="number" id="roi-yrs" class="form-input" value="' + (def.years || 4) + '" step="0.5" min="0.1" />' +
          '</div>' +
        '</div>';

      function compute() {
        var cost = parseFloat(document.getElementById('roi-cost').value) || 0;
        var val = parseFloat(document.getElementById('roi-ret').value) || 0;
        var yrs = parseFloat(document.getElementById('roi-yrs').value) || 1;

        var profit = val - cost;
        var roi = cost > 0 ? (profit / cost) * 100 : 0;
        var cagr = (cost > 0 && val > 0 && yrs > 0)
          ? (Math.pow(val / cost, 1 / yrs) - 1) * 100
          : 0;

        primaryLabel.textContent = 'Simple Return on Investment (ROI)';
        primaryValue.textContent = (roi >= 0 ? '+' : '') + formatNumber(roi, 2) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Net Dollar Profit:</span><span style="font-weight: 700; color: ' + (profit >= 0 ? 'var(--color-success)' : 'var(--color-danger)') + ';">' + formatCurrency(profit) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Annualized Return (CAGR):</span><span>' + formatNumber(cagr, 2) + '% / year</span></div>';
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
    buildRoi(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
