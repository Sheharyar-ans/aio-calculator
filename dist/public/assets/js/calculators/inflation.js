/**
 * AIO Calculator — Modular Engine: inflation
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'inflation' && !(toolType === 'tdee' && 'inflation' === 'calorie-macro') && !(toolType === 'scientific' && 'inflation' === 'basic-math')) {
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
    function buildInflation(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="inf-amt">Amount ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="inf-amt" class="form-input has-prefix" value="' + (def.amount || 10000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="inf-r">Annual Inflation Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="inf-r" class="form-input has-suffix" value="' + (def.inflationRate || 3.2) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="inf-yrs">Number of Years</label>' +
            '<input type="number" id="inf-yrs" class="form-input" value="' + (def.years || 15) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var amt = parseFloat(document.getElementById('inf-amt').value) || 0;
        var rate = (parseFloat(document.getElementById('inf-r').value) || 0) / 100;
        var yrs = parseFloat(document.getElementById('inf-yrs').value) || 0;

        var futureEquivalent = amt * Math.pow(1 + rate, yrs);
        var futurePurchasingPower = amt / Math.pow(1 + rate, yrs);

        primaryLabel.textContent = 'Equivalent Future Cost Needed';
        primaryValue.textContent = formatCurrency(futureEquivalent);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Purchasing Power of $' + formatNumber(amt, 0) + ' in ' + yrs + ' Years:</span><span>' + formatCurrency(futurePurchasingPower) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildInflation(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
