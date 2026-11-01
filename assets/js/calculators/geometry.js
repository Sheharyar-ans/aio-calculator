/**
 * AIO Calculator : Modular Engine: geometry
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'geometry' && !(toolType === 'tdee' && 'geometry' === 'calorie-macro') && !(toolType === 'scientific' && 'geometry' === 'basic-math')) {
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
      if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.format === 'function') {
        return window.AIO_CURRENCY.format(val, maxDec);
      }
      if (maxDec === undefined) maxDec = 2;
      if (isNaN(val) || !isFinite(val)) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDec
      }).format(val);
    };

    var getCurSymbol = function () {
      return (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.getSymbol === 'function')
        ? window.AIO_CURRENCY.getSymbol()
        : '$';
    };

    var getCurBarHtml = function () {
      return (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.getBarHtml === 'function')
        ? window.AIO_CURRENCY.getBarHtml()
        : '';
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
    function buildGeometry(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="geo-r">Cylinder Radius (cm)</label>' +
            '<input type="number" id="geo-r" class="form-input" value="' + (def.radius || 4) + '" min="0.1" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="geo-h">Cylinder Height (cm)</label>' +
            '<input type="number" id="geo-h" class="form-input" value="' + (def.height || 10) + '" min="0.1" />' +
          '</div>' +
        '</div>';

      function compute() {
        var r = parseFloat(document.getElementById('geo-r').value) || 0;
        var h = parseFloat(document.getElementById('geo-h').value) || 0;

        var volume = Math.PI * r * r * h;
        var surfaceArea = 2 * Math.PI * r * (r + h);

        primaryLabel.textContent = 'Cylinder Volume';
        primaryValue.textContent = formatNumber(volume, 2) + ' cm³';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Total Surface Area:</span><span>' + formatNumber(surfaceArea, 2) + ' cm²</span></div>' +
          '<div class="breakdown-row"><span>Base Area:</span><span>' + formatNumber(Math.PI * r * r, 2) + ' cm²</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildGeometry(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
