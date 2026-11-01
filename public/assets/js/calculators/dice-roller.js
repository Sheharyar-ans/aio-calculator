/**
 * AIO Calculator : Modular Engine: dice-roller
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'dice-roller' && !(toolType === 'tdee' && 'dice-roller' === 'calorie-macro') && !(toolType === 'scientific' && 'dice-roller' === 'basic-math')) {
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
    function buildDiceRoller(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="dr-sides">Dice Type / Sides</label>' +
            '<select id="dr-sides" class="form-select">' +
              '<option value="4">d4 (4 Sides)</option>' +
              '<option value="6">d6 (6 Sides)</option>' +
              '<option value="8">d8 (8 Sides)</option>' +
              '<option value="10">d10 (10 Sides)</option>' +
              '<option value="12">d12 (12 Sides)</option>' +
              '<option value="20" selected>d20 (20 Sides)</option>' +
              '<option value="100">d100 (1 to 100)</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="dr-count">Number of Dice</label>' +
            '<input type="number" id="dr-count" class="form-input" value="1" min="1" max="10" />' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn-primary" id="btn-roll" style="width: 100%; margin-top: 0.5rem;">Roll Dice</button>';

      function roll() {
        var sides = parseInt(document.getElementById('dr-sides').value, 10) || 20;
        var count = parseInt(document.getElementById('dr-count').value, 10) || 1;

        var results = [];
        var randomValues = new Uint32Array(count);
        window.crypto.getRandomValues(randomValues);

        for (var i = 0; i < count; i++) {
          results.push((randomValues[i] % sides) + 1);
        }

        var sum = results.reduce(function (a, b) { return a + b; }, 0);

        primaryLabel.textContent = 'Rolled ' + count + 'd' + sides;
        primaryValue.textContent = sum.toString();

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Individual Dice:</span><span>[' + results.join(', ') + ']</span></div>';
      }

      var rollBtn = document.getElementById('btn-roll');
      if (rollBtn) rollBtn.addEventListener('click', roll);
      roll();
    }

    // Initialize Tool
    buildDiceRoller(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
