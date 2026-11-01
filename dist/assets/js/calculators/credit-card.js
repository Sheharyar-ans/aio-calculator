/**
 * AIO Calculator : Modular Engine: credit-card
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'credit-card' && !(toolType === 'tdee' && 'credit-card' === 'calorie-macro') && !(toolType === 'scientific' && 'credit-card' === 'basic-math')) {
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
    function buildCreditCard(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="cc-bal">Current Card Balance (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="cc-bal" class="form-input has-prefix" value="' + (def.balance || 8000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cc-apr">Card APR (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="cc-apr" class="form-input has-suffix" value="' + (def.rate || 22.0) + '" step="0.5" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="cc-pay">Planned Monthly Fixed Payment (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="cc-pay" class="form-input has-prefix" value="' + (def.monthlyPayment || 300) + '" step="25" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var balance = parseFloat(document.getElementById('cc-bal').value) || 0;
        var apr = parseFloat(document.getElementById('cc-apr').value) || 0;
        var pmt = parseFloat(document.getElementById('cc-pay').value) || 0;

        var dailyRate = (apr / 100) / 365;
        var monthlyRate = dailyRate * 30.4167;

        if (balance <= 0 || pmt <= balance * monthlyRate) {
          primaryValue.textContent = 'Payment too low';
          breakdownRows.innerHTML = '<div style="color: var(--color-danger); font-size: 0.9rem;">Monthly payment must be greater than monthly interest.</div>';
          return;
        }

        var bal = balance;
        var months = 0;
        var totalInterest = 0;

        while (bal > 0 && months < 600) {
          var interest = bal * monthlyRate;
          var principal = Math.min(bal, pmt - interest);
          totalInterest += interest;
          bal -= principal;
          months++;
        }

        primaryLabel.textContent = 'Time to Debt-Free';
        primaryValue.textContent = months + ' Months (' + (months / 12).toFixed(1) + ' Years)';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Interest Paid:</span><span>' + formatCurrency(totalInterest) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Paid Back:</span><span>' + formatCurrency(balance + totalInterest) + '</span></div>';
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
    buildCreditCard(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
