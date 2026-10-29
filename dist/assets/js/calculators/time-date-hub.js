/**
 * AIO Calculator — Modular Engine: time-date-hub
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'time-date-hub' && !(toolType === 'tdee' && 'time-date-hub' === 'calorie-macro') && !(toolType === 'scientific' && 'time-date-hub' === 'basic-math')) {
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
    function buildTimeDateHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="td-start">Start / Birth Date</label>' +
            '<input type="date" id="td-start" class="form-input" value="' + (def.birthDate || '1995-07-14') + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="td-end">Target Date</label>' +
            '<input type="date" id="td-end" class="form-input" value="' + (def.targetDate || '2026-10-30') + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var d1 = new Date(document.getElementById('td-start').value);
        var d2 = new Date(document.getElementById('td-end').value);

        var diffTime = Math.abs(d2 - d1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        primaryLabel.textContent = 'Total Elapsed Days';
        primaryValue.textContent = formatNumber(diffDays, 0) + ' Days';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Years Equivalent:</span><span>~' + (diffDays / 365.25).toFixed(1) + ' Years</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildTimeDateHub(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
