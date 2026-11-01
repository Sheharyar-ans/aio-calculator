/**
 * AIO Calculator : Modular Engine: steps-converter
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'steps-converter' && !(toolType === 'tdee' && 'steps-converter' === 'calorie-macro') && !(toolType === 'scientific' && 'steps-converter' === 'basic-math')) {
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
    function buildStepsConverter(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="st-steps">Daily Step Count</label>' +
            '<input type="number" id="st-steps" class="form-input" value="' + (def.steps || 10000) + '" step="500" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="st-ht">Height (cm)</label>' +
            '<input type="number" id="st-ht" class="form-input" value="' + (def.heightCm || 178) + '" step="1" />' +
          '</div>' +
        '</div>';

      function compute() {
        var steps = parseFloat(document.getElementById('st-steps').value) || 0;
        var ht = parseFloat(document.getElementById('st-ht').value) || 178;

        var strideM = (ht * 0.415) / 100;
        var km = (steps * strideM) / 1000;
        var miles = km * 0.621371;
        var calories = steps * 0.045;

        primaryLabel.textContent = 'Distance Traveled';
        primaryValue.textContent = formatNumber(km, 2) + ' km';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Distance in Miles:</span><span>' + formatNumber(miles, 2) + ' miles</span></div>' +
          '<div class="breakdown-row"><span>Estimated Calories Burned:</span><span>' + Math.round(calories) + ' kcal</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildStepsConverter(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
