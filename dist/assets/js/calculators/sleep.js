/**
 * AIO Calculator — Modular Engine: sleep
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'sleep' && !(toolType === 'tdee' && 'sleep' === 'calorie-macro') && !(toolType === 'scientific' && 'sleep' === 'basic-math')) {
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
    function buildSleep(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="sl-wake">I want to wake up at:</label>' +
          '<input type="time" id="sl-wake" class="form-input" value="' + (def.targetTime || '06:30') + '" />' +
        '</div>';

      function compute() {
        var timeVal = document.getElementById('sl-wake').value || '06:30';
        var parts = timeVal.split(':').map(Number);
        var h = parts[0], m = parts[1];

        var wakeMins = (h * 60) + m;
        var bed5 = (wakeMins - 465 + 1440) % 1440;
        var bed6 = (wakeMins - 555 + 1440) % 1440;

        function formatMins(totalMins) {
          var hh = Math.floor(totalMins / 60);
          var mm = totalMins % 60;
          var ampm = hh >= 12 ? 'PM' : 'AM';
          var disph = hh % 12 || 12;
          return disph + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ampm;
        }

        primaryLabel.textContent = 'Recommended Bedtime (5 Cycles, 7.5 hrs)';
        primaryValue.textContent = formatMins(bed5);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Optimal Bedtime (5 Cycles):</span><span style="color: var(--color-success); font-weight: 700;">' + formatMins(bed5) + '</span></div>' +
          '<div class="breakdown-row"><span>Long Sleep (6 Cycles, 9.0 hrs):</span><span>' + formatMins(bed6) + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    // Initialize Tool
    buildSleep(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
