/**
 * AIO Calculator — Modular Engine: probability
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'probability' && !(toolType === 'tdee' && 'probability' === 'calorie-macro') && !(toolType === 'scientific' && 'probability' === 'basic-math')) {
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
      if (maxDec === undefined) maxDec = 2;
      if (isNaN(val) || !isFinite(val)) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDec
      }).format(val);
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
    function buildProbability(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="pr-n">Total Items (n)</label>' +
            '<input type="number" id="pr-n" class="form-input" value="' + (def.n || 12) + '" min="1" max="100" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="pr-r">Chosen Items (r)</label>' +
            '<input type="number" id="pr-r" class="form-input" value="' + (def.r || 5) + '" min="0" max="100" />' +
          '</div>' +
        '</div>';

      function factorial(x) {
        if (x <= 1) return 1;
        var res = 1;
        for (var i = 2; i <= x; i++) res *= i;
        return res;
      }

      function compute() {
        var n = parseInt(document.getElementById('pr-n').value, 10) || 12;
        var r = parseInt(document.getElementById('pr-r').value, 10) || 5;

        if (r > n) {
          primaryValue.textContent = 'r cannot be > n';
          return;
        }

        var nCr = factorial(n) / (factorial(r) * factorial(n - r));
        var nPr = factorial(n) / factorial(n - r);

        primaryLabel.textContent = 'Combinations (nCr)';
        primaryValue.textContent = formatNumber(nCr, 0);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Permutations (nPr):</span><span>' + formatNumber(nPr, 0) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildProbability(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
