/**
 * AIO Calculator : Modular Engine: percentage
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'percentage' && !(toolType === 'tdee' && 'percentage' === 'calorie-macro') && !(toolType === 'scientific' && 'percentage' === 'basic-math')) {
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
    function buildPercentage(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="pct-v1">Original Value</label>' +
            '<input type="number" id="pct-v1" class="form-input" value="' + (def.v1 || 65000) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="pct-v2">New Value</label>' +
            '<input type="number" id="pct-v2" class="form-input" value="' + (def.v2 || 72800) + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var v1 = parseFloat(document.getElementById('pct-v1').value) || 0;
        var v2 = parseFloat(document.getElementById('pct-v2').value) || 0;

        if (v1 === 0) return;
        var diff = v2 - v1;
        var pctChange = (diff / Math.abs(v1)) * 100;

        primaryLabel.textContent = 'Percentage Change';
        primaryValue.textContent = (pctChange >= 0 ? '+' : '') + formatNumber(pctChange, 2) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Absolute Difference:</span><span>' + (v2 >= v1 ? '+' : '') + formatNumber(diff, 2) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildPercentage(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
