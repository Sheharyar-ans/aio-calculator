/**
 * AIO Calculator — Modular Engine: emi
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'emi' && !(toolType === 'tdee' && 'emi' === 'calorie-macro') && !(toolType === 'scientific' && 'emi' === 'basic-math')) {
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
    function buildEmi(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="emi-p">Loan Amount ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="emi-p" class="form-input has-prefix" value="' + (def.principal || 25000) + '" step="1000" min="100" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="emi-r">Annual Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="emi-r" class="form-input has-suffix" value="' + (def.rate || 8.0) + '" step="0.1" min="0.1" max="50" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="emi-n">Loan Tenure (Years)</label>' +
            '<input type="number" id="emi-n" class="form-input" value="' + (def.tenureYears || 3) + '" step="0.5" min="0.5" max="30" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('emi-p').value) || 0;
        var annualRate = parseFloat(document.getElementById('emi-r').value) || 0;
        var years = parseFloat(document.getElementById('emi-n').value) || 0;

        var r = (annualRate / 12) / 100;
        var n = years * 12;

        if (P <= 0 || r <= 0 || n <= 0) {
          primaryValue.textContent = '$0.00';
          return;
        }

        var emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        var totalPayment = emi * n;
        var totalInterest = totalPayment - P;

        primaryLabel.textContent = 'Monthly EMI Payment';
        primaryValue.textContent = formatCurrency(emi) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Principal Borrowed:</span><span>' + formatCurrency(P) + '</span></div>' +
          '<div class="breakdown-row"><span>Total Interest:</span><span>' + formatCurrency(totalInterest) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Payment (' + n + ' months):</span><span>' + formatCurrency(totalPayment) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildEmi(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
