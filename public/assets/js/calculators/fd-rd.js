/**
 * AIO Calculator — Modular Engine: fd-rd
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'fd-rd' && !(toolType === 'tdee' && 'fd-rd' === 'calorie-macro') && !(toolType === 'scientific' && 'fd-rd' === 'basic-math')) {
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
    function buildFdRd(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fdrd-amt">Total Deposit Capital ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="fdrd-amt" class="form-input has-prefix" value="' + (def.amount || 12000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fdrd-r">Annual Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="fdrd-r" class="form-input has-suffix" value="' + (def.rate || 6.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fdrd-y">Term (Years)</label>' +
            '<input type="number" id="fdrd-y" class="form-input" value="' + (def.tenureYears || 2) + '" step="1" min="1" max="10" />' +
          '</div>' +
        '</div>';

      function compute() {
        var total = parseFloat(document.getElementById('fdrd-amt').value) || 0;
        var rate = parseFloat(document.getElementById('fdrd-r').value) || 0;
        var years = parseFloat(document.getElementById('fdrd-y').value) || 0;

        var r = rate / 100;
        var nMonths = years * 12;
        var monthlyInstallment = total / nMonths;

        var fdMaturity = total * Math.pow(1 + (r / 4), 4 * years);
        var fdInterest = fdMaturity - total;

        var rdMaturity = 0;
        for (var m = 1; m <= nMonths; m++) {
          var remainingYears = (nMonths - m + 1) / 12;
          rdMaturity += monthlyInstallment * Math.pow(1 + (r / 4), 4 * remainingYears);
        }
        var rdInterest = rdMaturity - total;

        primaryLabel.textContent = 'FD vs RD Maturity Comparison';
        primaryValue.textContent = formatCurrency(fdMaturity) + ' (FD)';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Fixed Deposit (Lump Sum) Returns:</span><span>' + formatCurrency(fdMaturity) + '</span></div>' +
          '<div class="breakdown-row"><span>Recurring Deposit ($' + formatNumber(monthlyInstallment, 0) + '/mo) Returns:</span><span>' + formatCurrency(rdMaturity) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>FD Advantage:</span><span style="color: var(--color-success);">+' + formatCurrency(fdMaturity - rdMaturity) + ' more interest</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildFdRd(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
