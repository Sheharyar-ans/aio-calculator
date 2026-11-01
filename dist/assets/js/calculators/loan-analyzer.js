/**
 * AIO Calculator : Modular Engine: loan-analyzer
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'loan-analyzer' && !(toolType === 'tdee' && 'loan-analyzer' === 'calorie-macro') && !(toolType === 'scientific' && 'loan-analyzer' === 'basic-math')) {
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
    function buildLoanAnalyzer(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-p">Principal Amount (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="la-p" class="form-input has-prefix" value="' + (def.principal || 40000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-r">Interest Rate (APR %)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="la-r" class="form-input has-suffix" value="' + (def.rate || 9.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-n">Term (Years)</label>' +
            '<input type="number" id="la-n" class="form-input" value="' + (def.tenureYears || 5) + '" step="1" min="1" max="30" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-extra">Extra Monthly Prepayment (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="la-extra" class="form-input has-prefix" value="' + (def.extraPayment || 100) + '" step="25" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('la-p').value) || 0;
        var rate = parseFloat(document.getElementById('la-r').value) || 0;
        var years = parseFloat(document.getElementById('la-n').value) || 0;
        var extra = parseFloat(document.getElementById('la-extra').value) || 0;

        var r = (rate / 12) / 100;
        var n = years * 12;
        if (P <= 0 || r <= 0 || n <= 0) return;

        var baseMonthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        var baselineTotalInterest = (baseMonthly * n) - P;
        var interestRatio = (baselineTotalInterest / P) * 100;

        var bal = P;
        var monthsWithExtra = 0;
        var totalInterestWithExtra = 0;
        var paymentWithExtra = baseMonthly + extra;

        while (bal > 0 && monthsWithExtra < 600) {
          var interestMonth = bal * r;
          var principalMonth = Math.min(bal, paymentWithExtra - interestMonth);
          totalInterestWithExtra += interestMonth;
          bal -= principalMonth;
          monthsWithExtra++;
        }

        var interestSaved = Math.max(0, baselineTotalInterest - totalInterestWithExtra);

        primaryLabel.textContent = 'Total Lifetime Interest Cost';
        primaryValue.textContent = formatCurrency(baselineTotalInterest);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Base Monthly Payment:</span><span>' + formatCurrency(baseMonthly) + '</span></div>' +
          '<div class="breakdown-row"><span>Interest-to-Principal Ratio:</span><span>' + formatNumber(interestRatio, 2) + '%</span></div>' +
          '<div class="breakdown-row highlight"><span>Interest Saved with $' + extra + '/mo:</span><span style="color: var(--color-success);">' + formatCurrency(interestSaved) + '</span></div>' +
          '<div class="breakdown-row"><span>New Payoff Timeline:</span><span>' + monthsWithExtra + ' months (' + (n - monthsWithExtra) + ' months sooner)</span></div>';
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
    buildLoanAnalyzer(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
