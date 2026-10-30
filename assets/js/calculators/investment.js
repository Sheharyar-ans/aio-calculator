/**
 * AIO Calculator — Modular Engine: investment
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'investment' && !(toolType === 'tdee' && 'investment' === 'calorie-macro') && !(toolType === 'scientific' && 'investment' === 'basic-math')) {
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
    function buildInvestment(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="inv-p">Initial Lump-Sum Investment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="inv-p" class="form-input has-prefix" value="' + (def.initialInvestment || 50000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="inv-r">Expected Annual Return (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="inv-r" class="form-input has-suffix" value="' + (def.annualRate || 8.0) + '" step="0.5" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="inv-t">Time Horizon (Years)</label>' +
            '<input type="number" id="inv-t" class="form-input" value="' + (def.years || 20) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('inv-p').value) || 0;
        var r = (parseFloat(document.getElementById('inv-r').value) || 0) / 100;
        var t = parseFloat(document.getElementById('inv-t').value) || 0;

        var fv = P * Math.pow(1 + r, t);
        var gain = fv - P;

        primaryLabel.textContent = 'Projected Portfolio Balance';
        primaryValue.textContent = formatCurrency(fv);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Initial Investment:</span><span>' + formatCurrency(P) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Compound Growth:</span><span style="color: var(--color-success);">+' + formatCurrency(gain) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildInvestment(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
