/**
 * AIO Calculator : Modular Engine: finance-shopping-hub
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'finance-shopping-hub' && !(toolType === 'tdee' && 'finance-shopping-hub' === 'calorie-macro') && !(toolType === 'scientific' && 'finance-shopping-hub' === 'basic-math')) {
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
    function buildFinanceShoppingHub(def) {
      formContainer.innerHTML = getCurBarHtml() + '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fs-bill">Bill Amount (' + getCurSymbol() + ')</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">' + getCurSymbol() + '</span>' +
              '<input type="number" id="fs-bill" class="form-input has-prefix" value="' + (def.billAmount || 120) + '" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fs-tip">Tip Percentage (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="fs-tip" class="form-input has-suffix" value="' + (def.tipPercent || 18) + '" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fs-people">Number of Diners (Split Bill)</label>' +
            '<input type="number" id="fs-people" class="form-input" value="' + (def.partySize || 4) + '" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var bill = parseFloat(document.getElementById('fs-bill').value) || 0;
        var tipPct = parseFloat(document.getElementById('fs-tip').value) || 0;
        var people = parseFloat(document.getElementById('fs-people').value) || 1;

        var tipAmount = bill * (tipPct / 100);
        var total = bill + tipAmount;
        var perPerson = total / people;

        primaryLabel.textContent = 'Each Person Pays';
        primaryValue.textContent = formatCurrency(perPerson);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Tip Total (' + tipPct + '%):</span><span>' + formatCurrency(tipAmount) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Grand Total Bill:</span><span>' + formatCurrency(total) + '</span></div>';
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
    buildFinanceShoppingHub(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
