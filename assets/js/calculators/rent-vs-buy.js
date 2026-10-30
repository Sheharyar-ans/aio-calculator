/**
 * AIO Calculator — Modular Engine: rent-vs-buy
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'rent-vs-buy' && !(toolType === 'tdee' && 'rent-vs-buy' === 'calorie-macro') && !(toolType === 'scientific' && 'rent-vs-buy' === 'basic-math')) {
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
    function buildRentVsBuy(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="rvb-price">Home Price ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="rvb-price" class="form-input has-prefix" value="' + (def.homePrice || 420000) + '" step="10000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rvb-rent">Monthly Rent for Comparable Home ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="rvb-rent" class="form-input has-prefix" value="' + (def.monthlyRent || 2200) + '" step="100" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var price = parseFloat(document.getElementById('rvb-price').value) || 0;
        var rent = parseFloat(document.getElementById('rvb-rent').value) || 0;

        var annualRent = rent * 12;
        var priceToRentRatio = annualRent > 0 ? price / annualRent : 0;
        var breakEvenYears = Math.max(2.5, Math.min(15, (priceToRentRatio * 0.3).toFixed(1)));

        primaryLabel.textContent = 'Estimated Break-Even Horizon';
        primaryValue.textContent = breakEvenYears + ' Years';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Price-to-Rent Ratio:</span><span>' + formatNumber(priceToRentRatio, 1) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Recommendation:</span><span>Stay at least ' + breakEvenYears + ' years to recover transaction & interest costs.</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildRentVsBuy(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
