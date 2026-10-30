/**
 * AIO Calculator — Modular Engine: unit-conversion-hub
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'unit-conversion-hub' && !(toolType === 'tdee' && 'unit-conversion-hub' === 'calorie-macro') && !(toolType === 'scientific' && 'unit-conversion-hub' === 'basic-math')) {
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
    function buildUnitConversionHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="uc-val">Value</label>' +
            '<input type="number" id="uc-val" class="form-input" value="' + (def.val || 5) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="uc-mode">Conversion</label>' +
            '<select id="uc-mode" class="form-select">' +
              '<option value="mi-km" selected>Miles to Kilometers</option>' +
              '<option value="km-mi">Kilometers to Miles</option>' +
              '<option value="lb-kg">Pounds to Kilograms</option>' +
              '<option value="f-c">Fahrenheit to Celsius</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var val = parseFloat(document.getElementById('uc-val').value) || 0;
        var mode = document.getElementById('uc-mode').value;

        var res = 0, unit = '';
        if (mode === 'mi-km') { res = val * 1.60934; unit = 'km'; }
        else if (mode === 'km-mi') { res = val * 0.621371; unit = 'miles'; }
        else if (mode === 'lb-kg') { res = val * 0.453592; unit = 'kg'; }
        else if (mode === 'f-c') { res = (val - 32) * (5/9); unit = '°C'; }

        primaryLabel.textContent = 'Converted Measurement';
        primaryValue.textContent = formatNumber(res, 2) + ' ' + unit;
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildUnitConversionHub(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
