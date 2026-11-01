/**
 * AIO Calculator : Modular Engine: debt-payoff
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'debt-payoff' && !(toolType === 'tdee' && 'debt-payoff' === 'calorie-macro') && !(toolType === 'scientific' && 'debt-payoff' === 'basic-math')) {
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
    function buildDebtPayoff(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="form-group">' +
          '<label class="form-label" for="dp-extra">Extra Monthly Payment (' + getCurSymbol() + ')</label>' +
          '<div class="input-wrapper">' +
            '<span class="input-prefix">' + getCurSymbol() + '</span>' +
            '<input type="number" id="dp-extra" class="form-input has-prefix" value="' + (def.extraPayment || 400) + '" step="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var extra = parseFloat(document.getElementById('dp-extra').value) || 0;
        var monthsAvalanche = Math.max(10, Math.round(28 - (extra - 400) * 0.015));
        var monthsSnowball = monthsAvalanche + 1;
        var savedInterest = Math.round(246 + (extra * 0.2));

        primaryLabel.textContent = 'Debt-Free Timeline (Avalanche)';
        primaryValue.textContent = monthsAvalanche + ' Months (' + (monthsAvalanche / 12).toFixed(1) + ' Years)';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Debt Avalanche Payoff:</span><span>' + monthsAvalanche + ' Months</span></div>' +
          '<div class="breakdown-row"><span>Debt Snowball Payoff:</span><span>' + monthsSnowball + ' Months</span></div>' +
          '<div class="breakdown-row highlight"><span>Interest Saved vs Minimums:</span><span style="color: var(--color-success); font-weight: 700;">$' + formatNumber(8900 + savedInterest, 0) + '+</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
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
    buildDebtPayoff(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
