/**
 * AIO Calculator — Modular Engine: home-vehicle-hub
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'home-vehicle-hub' && !(toolType === 'tdee' && 'home-vehicle-hub' === 'calorie-macro') && !(toolType === 'scientific' && 'home-vehicle-hub' === 'basic-math')) {
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
    function buildHomeVehicleHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="hv-dist">Trip Distance (Miles)</label>' +
            '<input type="number" id="hv-dist" class="form-input" value="' + (def.distance || 450) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="hv-mpg">Vehicle Fuel Economy (MPG)</label>' +
            '<input type="number" id="hv-mpg" class="form-input" value="' + (def.mpg || 28) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="hv-gas">Gas Price ($ / Gallon)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="hv-gas" class="form-input has-prefix" value="' + (def.fuelPrice || 3.40) + '" step="0.05" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var dist = parseFloat(document.getElementById('hv-dist').value) || 0;
        var mpg = parseFloat(document.getElementById('hv-mpg').value) || 28;
        var price = parseFloat(document.getElementById('hv-gas').value) || 3.40;

        var gallons = dist / mpg;
        var cost = gallons * price;

        primaryLabel.textContent = 'Total Trip Fuel Cost';
        primaryValue.textContent = formatCurrency(cost);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Fuel Consumed:</span><span>' + formatNumber(gallons, 1) + ' Gallons</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildHomeVehicleHub(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
