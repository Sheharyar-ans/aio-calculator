/**
 * AIO Calculator : Modular Engine: calorie-deficit
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'calorie-deficit' && !(toolType === 'tdee' && 'calorie-deficit' === 'calorie-macro') && !(toolType === 'scientific' && 'calorie-deficit' === 'basic-math')) {
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
    function buildCalorieDeficit(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="cd-tdee">Maintenance TDEE (Calories)</label>' +
            '<input type="number" id="cd-tdee" class="form-input" value="2150" step="50" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cd-goal">Target Weekly Fat Loss</label>' +
            '<select id="cd-goal" class="form-select">' +
              '<option value="250">Mild Deficit (0.5 lb / week, -250 kcal)</option>' +
              '<option value="500" selected>Moderate Deficit (1.0 lb / week, -500 kcal)</option>' +
              '<option value="750">Aggressive Deficit (1.5 lbs / week, -750 kcal)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var tdee = parseFloat(document.getElementById('cd-tdee').value) || 2150;
        var deficit = parseFloat(document.getElementById('cd-goal').value) || 500;

        var target = Math.max(1200, tdee - deficit);
        var weeklyLoss = (deficit * 7) / 3500;

        primaryLabel.textContent = 'Target Daily Caloric Intake';
        primaryValue.textContent = formatNumber(target, 0) + ' kcal / day';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Daily Deficit:</span><span>-' + deficit + ' kcal</span></div>' +
          '<div class="breakdown-row highlight"><span>Projected Fat Loss:</span><span style="color: var(--color-success);">' + formatNumber(weeklyLoss, 1) + ' lb / week</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildCalorieDeficit(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
