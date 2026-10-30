/**
 * AIO Calculator — Modular Engine: retirement
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'retirement' && !(toolType === 'tdee' && 'retirement' === 'calorie-macro') && !(toolType === 'scientific' && 'retirement' === 'basic-math')) {
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
    function buildRetirement(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-age">Current Age</label>' +
            '<input type="number" id="ret-age" class="form-input" value="' + (def.currentAge || 35) + '" min="18" max="80" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-target-age">Retirement Age</label>' +
            '<input type="number" id="ret-target-age" class="form-input" value="' + (def.retirementAge || 65) + '" min="30" max="90" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-cur">Current Savings ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ret-cur" class="form-input has-prefix" value="' + (def.currentSavings || 80000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-mo">Monthly Addition ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ret-mo" class="form-input has-prefix" value="' + (def.monthlySavings || 800) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="ret-spend">Desired Annual Spending in Retirement ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ret-spend" class="form-input has-prefix" value="' + (def.annualExpense || 70000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var curAge = parseFloat(document.getElementById('ret-age').value) || 35;
        var targetAge = parseFloat(document.getElementById('ret-target-age').value) || 65;
        var curSavings = parseFloat(document.getElementById('ret-cur').value) || 0;
        var moSavings = parseFloat(document.getElementById('ret-mo').value) || 0;
        var spend = parseFloat(document.getElementById('ret-spend').value) || 0;

        var yearsLeft = Math.max(1, targetAge - curAge);
        var r = 0.07 / 12;
        var n = yearsLeft * 12;

        var curGrowth = curSavings * Math.pow(1 + 0.07, yearsLeft);
        var moGrowth = moSavings * ((Math.pow(1 + r, n) - 1) / r);
        var projectedCorpus = curGrowth + moGrowth;
        var targetCorpus = spend / 0.04;
        var fundedPct = (projectedCorpus / targetCorpus) * 100;

        primaryLabel.textContent = 'Projected Retirement Nest Egg';
        primaryValue.textContent = formatCurrency(projectedCorpus);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Target Corpus Needed (4% Rule):</span><span>' + formatCurrency(targetCorpus) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Goal Funded:</span><span style="color: ' + (fundedPct >= 100 ? 'var(--color-success)' : 'var(--color-warning)') + ';">' + formatNumber(fundedPct, 1) + '%</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildRetirement(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
