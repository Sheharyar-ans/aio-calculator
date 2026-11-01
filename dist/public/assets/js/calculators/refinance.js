/**
 * AIO Calculator — Modular Engine: refinance
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'refinance' && !(toolType === 'tdee' && 'refinance' === 'calorie-macro') && !(toolType === 'scientific' && 'refinance' === 'basic-math')) {
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
      if (maxDec === undefined) maxDec = 2;
      if (isNaN(val) || !isFinite(val)) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDec
      }).format(val);
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
    function buildRefinance(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-bal">Remaining Balance ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ref-bal" class="form-input has-prefix" value="' + (def.currentBalance || 350000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-costs">Closing Costs ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ref-costs" class="form-input has-prefix" value="' + (def.closingCosts || 7000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-old-r">Current Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ref-old-r" class="form-input has-suffix" value="' + (def.currentRate || 7.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-new-r">New Refinance Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ref-new-r" class="form-input has-suffix" value="' + (def.newRate || 6.25) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var bal = parseFloat(document.getElementById('ref-bal').value) || 0;
        var costs = parseFloat(document.getElementById('ref-costs').value) || 0;
        var oldR = (parseFloat(document.getElementById('ref-old-r').value) || 0) / 1200;
        var newR = (parseFloat(document.getElementById('ref-new-r').value) || 0) / 1200;

        var n = 360;
        var oldPmt = (bal * oldR * Math.pow(1 + oldR, n)) / (Math.pow(1 + oldR, n) - 1);
        var newPmt = (bal * newR * Math.pow(1 + newR, n)) / (Math.pow(1 + newR, n) - 1);
        var moSavings = Math.max(0, oldPmt - newPmt);
        var breakEvenMonths = moSavings > 0 ? (costs / moSavings).toFixed(1) : 0;

        primaryLabel.textContent = 'Monthly Payment Savings';
        primaryValue.textContent = formatCurrency(moSavings) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Current Payment (P&I):</span><span>' + formatCurrency(oldPmt) + '</span></div>' +
          '<div class="breakdown-row"><span>New Payment (P&I):</span><span>' + formatCurrency(newPmt) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Break-Even on $' + formatNumber(costs, 0) + ' Closing Costs:</span><span>' + breakEvenMonths + ' Months</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildRefinance(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
