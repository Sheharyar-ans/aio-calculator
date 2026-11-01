/**
 * AIO Calculator — Modular Engine: fraction
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'fraction' && !(toolType === 'tdee' && 'fraction' === 'calorie-macro') && !(toolType === 'scientific' && 'fraction' === 'basic-math')) {
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
    function buildFraction(def) {
      formContainer.innerHTML =
        '<div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">' +
          '<input type="number" id="fr-n1" class="form-input" value="' + (def.n1 || 2) + '" style="width: 70px; text-align: center;" />' +
          '<span>/</span>' +
          '<input type="number" id="fr-d1" class="form-input" value="' + (def.d1 || 3) + '" style="width: 70px; text-align: center;" />' +
          '<select id="fr-op" class="form-select" style="width: 70px; text-align: center;">' +
            '<option value="+">+</option>' +
            '<option value="-">−</option>' +
            '<option value="*">×</option>' +
            '<option value="/">÷</option>' +
          '</select>' +
          '<input type="number" id="fr-n2" class="form-input" value="' + (def.n2 || 3) + '" style="width: 70px; text-align: center;" />' +
          '<span>/</span>' +
          '<input type="number" id="fr-d2" class="form-input" value="' + (def.d2 || 4) + '" style="width: 70px; text-align: center;" />' +
        '</div>';

      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

      function compute() {
        var n1 = parseInt(document.getElementById('fr-n1').value, 10) || 0;
        var d1 = parseInt(document.getElementById('fr-d1').value, 10) || 1;
        var n2 = parseInt(document.getElementById('fr-n2').value, 10) || 0;
        var d2 = parseInt(document.getElementById('fr-d2').value, 10) || 1;
        var op = document.getElementById('fr-op').value;

        var num = 0, den = 1;
        if (op === '+') { num = (n1 * d2) + (n2 * d1); den = d1 * d2; }
        else if (op === '-') { num = (n1 * d2) - (n2 * d1); den = d1 * d2; }
        else if (op === '*') { num = n1 * n2; den = d1 * d2; }
        else if (op === '/') { num = n1 * d2; den = d1 * n2; }

        var div = Math.abs(gcd(num, den));
        var simNum = num / div;
        var simDen = den / div;

        primaryLabel.textContent = 'Simplified Fraction Result';
        primaryValue.textContent = simNum + ' / ' + simDen;

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Decimal Equivalent:</span><span>' + formatNumber(simNum / simDen, 4) + '</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildFraction(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
