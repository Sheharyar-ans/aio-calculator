/**
 * AIO Calculator : Modular Engine: body-fat
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'body-fat' && !(toolType === 'tdee' && 'body-fat' === 'calorie-macro') && !(toolType === 'scientific' && 'body-fat' === 'basic-math')) {
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
    function buildBodyFat(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-wt">Weight (lbs)</label>' +
            '<input type="number" id="bf-wt" class="form-input" value="' + (def.weightLbs || 180) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-ht">Height (inches)</label>' +
            '<input type="number" id="bf-ht" class="form-input" value="' + (def.heightInches || 70) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-neck">Neck Circumference (inches)</label>' +
            '<input type="number" id="bf-neck" class="form-input" value="' + (def.neckInches || 15.5) + '" step="0.25" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-waist">Waist Circumference (inches)</label>' +
            '<input type="number" id="bf-waist" class="form-input" value="' + (def.waistInches || 34.0) + '" step="0.25" />' +
          '</div>' +
        '</div>';

      function compute() {
        var wt = parseFloat(document.getElementById('bf-wt').value) || 180;
        var ht = (parseFloat(document.getElementById('bf-ht').value) || 70) * 2.54;
        var neck = (parseFloat(document.getElementById('bf-neck').value) || 15.5) * 2.54;
        var waist = (parseFloat(document.getElementById('bf-waist').value) || 34.0) * 2.54;

        if (waist <= neck) return;

        var bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(ht)) - 450;
        var fatMass = wt * (bf / 100);
        var leanMass = wt - fatMass;

        primaryLabel.textContent = 'Estimated Body Fat Percentage';
        primaryValue.textContent = formatNumber(bf, 1) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Fat Mass:</span><span>' + formatNumber(fatMass, 1) + ' lbs</span></div>' +
          '<div class="breakdown-row"><span>Lean Body Mass:</span><span>' + formatNumber(leanMass, 1) + ' lbs</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildBodyFat(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
