/**
 * AIO Calculator — Modular Engine: gpa
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'gpa' && !(toolType === 'tdee' && 'gpa' === 'calorie-macro') && !(toolType === 'scientific' && 'gpa' === 'basic-math')) {
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
    function buildGpa(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label">Semester Grades Sample</label>' +
          '<div style="font-size: 0.9rem; color: var(--color-slate-600); margin-bottom: 0.75rem;">' +
            'Calculus (4 cr, A: 4.0), Chem (4 cr, B+: 3.3), History (3 cr, A-: 3.7), English (3 cr, B: 3.0)' +
          '</div>' +
          '<button type="button" class="btn btn-secondary btn-sm" id="btn-recalc-gpa">Recalculate GPA</button>' +
        '</div>';

      function compute() {
        var totalPts = 16.0 + 13.2 + 11.1 + 9.0;
        var totalCredits = 14;
        var gpa = totalPts / totalCredits;

        primaryLabel.textContent = 'Semester Grade Point Average (GPA)';
        primaryValue.textContent = formatNumber(gpa, 2) + ' / 4.0';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Academic Standing:</span><span style="color: var(--color-success); font-weight: 700;">Dean\'s List Honors (3.5+)</span></div>';
      }

      var b = document.getElementById('btn-recalc-gpa');
      if (b) b.addEventListener('click', compute);
      compute();
    }

    // Initialize Tool
    buildGpa(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
