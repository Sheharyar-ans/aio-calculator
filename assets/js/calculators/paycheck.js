/**
 * AIO Calculator : Modular Engine: paycheck
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'paycheck' && !(toolType === 'tdee' && 'paycheck' === 'calorie-macro') && !(toolType === 'scientific' && 'paycheck' === 'basic-math')) {
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
    function buildPaycheck(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="pc-sal">Gross Annual Salary (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="pc-sal" class="form-input has-prefix" value="' + (def.salary || 78000) + '" step="2000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="pc-freq">Pay Frequency</label>' +
            '<select id="pc-freq" class="form-select">' +
              '<option value="26" selected>Bi-Weekly (26 Paychecks/yr)</option>' +
              '<option value="52">Weekly (52 Paychecks/yr)</option>' +
              '<option value="24">Semi-Monthly (24 Paychecks/yr)</option>' +
              '<option value="12">Monthly (12 Paychecks/yr)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var sal = parseFloat(document.getElementById('pc-sal').value) || 0;
        var periods = parseFloat(document.getElementById('pc-freq').value) || 26;

        var grossPerPeriod = sal / periods;
        var fica = grossPerPeriod * 0.0765;
        var fedTax = grossPerPeriod * 0.105;
        var stateTax = grossPerPeriod * 0.04;
        var netPay = grossPerPeriod - fica - fedTax - stateTax;

        primaryLabel.textContent = 'Estimated Take-Home Pay Per Paycheck';
        primaryValue.textContent = formatCurrency(netPay);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Gross Pay per Paycheck:</span><span>' + formatCurrency(grossPerPeriod) + '</span></div>' +
          '<div class="breakdown-row"><span>FICA Taxes (6.2% SS + 1.45% Medicare):</span><span>-' + formatCurrency(fica) + '</span></div>' +
          '<div class="breakdown-row"><span>Federal Tax Withholding (2026):</span><span>-' + formatCurrency(fedTax) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Net Monthly Equivalent:</span><span>' + formatCurrency(netPay * (periods / 12)) + '</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
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
    buildPaycheck(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
