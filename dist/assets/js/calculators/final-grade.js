/**
 * AIO Calculator — Modular Engine: final-grade
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'final-grade' && !(toolType === 'tdee' && 'final-grade' === 'calorie-macro') && !(toolType === 'scientific' && 'final-grade' === 'basic-math')) {
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
    function buildFinalGrade(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fg-cur">Current Grade (%)</label>' +
            '<input type="number" id="fg-cur" class="form-input" value="' + (def.currentGrade || 86) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fg-target">Target Class Grade (%)</label>' +
            '<input type="number" id="fg-target" class="form-input" value="' + (def.targetGrade || 90) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fg-weight">Final Exam Weight (%)</label>' +
            '<input type="number" id="fg-weight" class="form-input" value="' + (def.finalWeight || 30) + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var cur = parseFloat(document.getElementById('fg-cur').value) || 86;
        var target = parseFloat(document.getElementById('fg-target').value) || 90;
        var weight = (parseFloat(document.getElementById('fg-weight').value) || 30) / 100;

        var needed = (target - (cur * (1 - weight))) / weight;

        primaryLabel.textContent = 'Score Needed on Final Exam';
        primaryValue.textContent = formatNumber(needed, 1) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Difficulty Assessment:</span><span>' + (needed > 100 ? 'Needs Extra Credit' : needed <= cur ? 'Easily Attainable' : 'Achievable with Study') + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildFinalGrade(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
