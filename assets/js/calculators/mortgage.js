/**
 * AIO Calculator — Modular Engine: mortgage
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'mortgage' && !(toolType === 'tdee' && 'mortgage' === 'calorie-macro') && !(toolType === 'scientific' && 'mortgage' === 'basic-math')) {
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
    function buildMortgage(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-price">Home Purchase Price ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="mg-price" class="form-input has-prefix" value="' + (def.homePrice || 450000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-down">Down Payment (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="mg-down" class="form-input has-suffix" value="' + (def.downPaymentPercent || 10) + '" step="1" min="0" max="90" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-rate">Mortgage Rate (30-Yr PMMS Ref: 6.54%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="mg-rate" class="form-input has-suffix" value="' + (def.rate || 6.54) + '" step="0.05" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-term">Loan Term</label>' +
            '<select id="mg-term" class="form-select">' +
              '<option value="30" ' + (def.termYears === 30 ? 'selected' : '') + '>30 Years Fixed</option>' +
              '<option value="15" ' + (def.termYears === 15 ? 'selected' : '') + '>15 Years Fixed</option>' +
              '<option value="20">20 Years Fixed</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-tax">Annual Property Tax (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="mg-tax" class="form-input has-suffix" value="' + (def.propertyTaxRate || 1.2) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-ins">Annual Homeowners Insurance ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="mg-ins" class="form-input has-prefix" value="' + (def.homeInsuranceAnnual || 1440) + '" step="100" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var price = parseFloat(document.getElementById('mg-price').value) || 0;
        var downPct = parseFloat(document.getElementById('mg-down').value) || 0;
        var rate = parseFloat(document.getElementById('mg-rate').value) || 0;
        var term = parseFloat(document.getElementById('mg-term').value) || 30;
        var taxRate = parseFloat(document.getElementById('mg-tax').value) || 0;
        var annualIns = parseFloat(document.getElementById('mg-ins').value) || 0;

        var downAmount = price * (downPct / 100);
        var loanAmount = Math.max(0, price - downAmount);
        var r = (rate / 12) / 100;
        var n = term * 12;

        var pi = (loanAmount > 0 && r > 0)
          ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
          : 0;

        var monthlyTax = (price * (taxRate / 100)) / 12;
        var monthlyIns = annualIns / 12;
        var monthlyPmi = (downPct < 20 && loanAmount > 0)
          ? (loanAmount * 0.007) / 12
          : 0;

        var totalPiti = pi + monthlyTax + monthlyIns + monthlyPmi;

        primaryLabel.textContent = 'Total Monthly Payment (PITI + PMI)';
        primaryValue.textContent = formatCurrency(totalPiti) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Principal & Interest:</span><span>' + formatCurrency(pi) + '</span></div>' +
          '<div class="breakdown-row"><span>Property Tax (Escrow):</span><span>' + formatCurrency(monthlyTax) + '</span></div>' +
          '<div class="breakdown-row"><span>Homeowners Insurance:</span><span>' + formatCurrency(monthlyIns) + '</span></div>' +
          '<div class="breakdown-row"><span>PMI (Down &lt; 20%):</span><span>' + formatCurrency(monthlyPmi) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Loan Amount:</span><span>' + formatCurrency(loanAmount) + ' (' + formatCurrency(downAmount) + ' down)</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildMortgage(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
