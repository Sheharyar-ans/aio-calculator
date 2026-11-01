/**
 * AIO Calculator : Modular Engine: fire
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'fire' && !(toolType === 'tdee' && 'fire' === 'calorie-macro') && !(toolType === 'scientific' && 'fire' === 'basic-math')) {
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
    function buildFire(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-exp">Annual Living Expenses (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="fire-exp" class="form-input has-prefix" value="' + (def.annualExpenses || 55000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-cur">Current Portfolio Value (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="fire-cur" class="form-input has-prefix" value="' + (def.currentInvestments || 120000) + '" step="10000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-save">Annual Savings Contribution (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="fire-save" class="form-input has-prefix" value="55000" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-swr">Safe Withdrawal Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="fire-swr" class="form-input has-suffix" value="' + (def.swr || 3.75) + '" step="0.25" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var exp = parseFloat(document.getElementById('fire-exp').value) || 0;
        var cur = parseFloat(document.getElementById('fire-cur').value) || 0;
        var save = parseFloat(document.getElementById('fire-save').value) || 0;
        var swr = (parseFloat(document.getElementById('fire-swr').value) || 3.75) / 100;

        var fireNum = exp / swr;
        var realReturn = 0.06;

        var bal = cur;
        var years = 0;
        while (bal < fireNum && years < 60) {
          bal = (bal * (1 + realReturn)) + save;
          years++;
        }

        primaryLabel.textContent = 'Your FIRE Target Number';
        primaryValue.textContent = formatCurrency(fireNum);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Years to Financial Independence:</span><span style="color: var(--color-success); font-weight: 700;">' + years + ' Years</span></div>' +
          '<div class="breakdown-row"><span>Lean FIRE (Frugal $40k/yr):</span><span>' + formatCurrency(40000 / swr) + '</span></div>' +
          '<div class="breakdown-row"><span>Fat FIRE ($100k/yr):</span><span>' + formatCurrency(100000 / swr) + '</span></div>';
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
    buildFire(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
