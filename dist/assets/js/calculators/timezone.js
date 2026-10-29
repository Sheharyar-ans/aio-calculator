/**
 * AIO Calculator — Modular Engine: timezone
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'timezone' && !(toolType === 'tdee' && 'timezone' === 'calorie-macro') && !(toolType === 'scientific' && 'timezone' === 'basic-math')) {
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
    function buildTimezone(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="tz-time">New York Time (EST / EDT)</label>' +
          '<input type="time" id="tz-time" class="form-input" value="10:00" />' +
        '</div>';

      function compute() {
        var timeVal = document.getElementById('tz-time').value || '10:00';
        var parts = timeVal.split(':').map(Number);
        var h = parts[0], m = parts[1];

        var formatTz = function (offset) {
          var total = (h * 60 + m + offset * 60 + 1440) % 1440;
          var hh = Math.floor(total / 60);
          var mm = total % 60;
          var ampm = hh >= 12 ? 'PM' : 'AM';
          var disph = hh % 12 || 12;
          return disph + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ampm;
        };

        primaryLabel.textContent = 'London Time (GMT / BST)';
        primaryValue.textContent = formatTz(5);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>London:</span><span>' + formatTz(5) + '</span></div>' +
          '<div class="breakdown-row"><span>New Delhi (IST):</span><span>' + formatTz(9.5) + '</span></div>' +
          '<div class="breakdown-row"><span>Tokyo (JST):</span><span>' + formatTz(13) + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    // Initialize Tool
    buildTimezone(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
