/**
 * AIO Calculator — Modular Engine: auto-loan
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'auto-loan' && !(toolType === 'tdee' && 'auto-loan' === 'calorie-macro') && !(toolType === 'scientific' && 'auto-loan' === 'basic-math')) {
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
    function buildAutoLoan(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-price">Vehicle Purchase Price ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="al-price" class="form-input has-prefix" value="' + (def.vehiclePrice || 36000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-trade">Trade-In Value ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="al-trade" class="form-input has-prefix" value="' + (def.tradeInValue || 5000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-down">Cash Down Payment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="al-down" class="form-input has-prefix" value="' + (def.downPayment || 3500) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-apr">Interest Rate (APR %)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="al-apr" class="form-input has-suffix" value="' + (def.rate || 6.8) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var price = parseFloat(document.getElementById('al-price').value) || 0;
        var trade = parseFloat(document.getElementById('al-trade').value) || 0;
        var down = parseFloat(document.getElementById('al-down').value) || 0;
        var apr = parseFloat(document.getElementById('al-apr').value) || 0;

        var taxable = Math.max(0, price - trade);
        var salesTax = taxable * 0.06;
        var fees = 640;
        var financed = Math.max(0, taxable + salesTax + fees - down);

        var r = (apr / 12) / 100;
        var n = 60;
        var pmt = (financed > 0 && r > 0)
          ? (financed * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
          : 0;

        var totalPayments = pmt * n;
        var totalInterest = totalPayments - financed;

        primaryLabel.textContent = 'Estimated Monthly Car Payment';
        primaryValue.textContent = formatCurrency(pmt) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Amount Financed:</span><span>' + formatCurrency(financed) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Financing Interest:</span><span>' + formatCurrency(totalInterest) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildAutoLoan(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
