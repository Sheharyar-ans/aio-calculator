/**
 * AIO Calculator : Modular Engine: bmi-ideal-weight
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'bmi-ideal-weight' && !(toolType === 'tdee' && 'bmi-ideal-weight' === 'calorie-macro') && !(toolType === 'scientific' && 'bmi-ideal-weight' === 'basic-math')) {
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
    function buildBmiIdealWeight(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="bmi-ht">Height (Inches, e.g. 70 = 5\'10")</label>' +
            '<input type="number" id="bmi-ht" class="form-input" value="70" min="36" max="96" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bmi-wt">Weight (Pounds)</label>' +
            '<input type="number" id="bmi-wt" class="form-input" value="' + (def.weightLbs || 172) + '" min="50" max="600" />' +
          '</div>' +
        '</div>';

      function compute() {
        var ht = parseFloat(document.getElementById('bmi-ht').value) || 70;
        var wt = parseFloat(document.getElementById('bmi-wt').value) || 172;

        var bmi = (wt / (ht * ht)) * 703;
        var cat = 'Normal Weight';
        var color = 'var(--color-success)';

        if (bmi < 18.5) { cat = 'Underweight'; color = 'var(--color-warning)'; }
        else if (bmi < 25) { cat = 'Normal (Healthy)'; color = 'var(--color-success)'; }
        else if (bmi < 30) { cat = 'Overweight'; color = 'var(--color-warning)'; }
        else { cat = 'Obese'; color = 'var(--color-danger)'; }

        var devineKg = 50.0 + 2.3 * Math.max(0, ht - 60);
        var devineLbs = devineKg * 2.20462;

        primaryLabel.textContent = 'Your Body Mass Index (BMI)';
        primaryValue.textContent = formatNumber(bmi, 1) + ' kg/m²';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>WHO Classification:</span><span style="color: ' + color + '; font-weight: 700;">' + cat + '</span></div>' +
          '<div class="breakdown-row"><span>Devine Ideal Body Weight:</span><span>' + formatNumber(devineLbs, 0) + ' lbs (' + formatNumber(devineKg, 1) + ' kg)</span></div>' +
          '<div class="breakdown-row"><span>WHO Healthy Weight Range:</span><span>' + formatNumber((18.5 * ht * ht)/703, 0) + ' – ' + formatNumber((24.9 * ht * ht)/703, 0) + ' lbs</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildBmiIdealWeight(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
