/**
 * AIO Calculator : Modular Engine: algebra
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'algebra' && !(toolType === 'tdee' && 'algebra' === 'calorie-macro') && !(toolType === 'scientific' && 'algebra' === 'basic-math')) {
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
    function buildAlgebra(def) {
      formContainer.innerHTML =
        '<p style="font-weight: 600; margin-bottom: 0.75rem;">Solve Quadratic: ax² + bx + c = 0</p>' +
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="alg-a">Coefficient a</label>' +
            '<input type="number" id="alg-a" class="form-input" value="' + (def.a || 2) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="alg-b">Coefficient b</label>' +
            '<input type="number" id="alg-b" class="form-input" value="' + (def.b || -4) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="alg-c">Coefficient c</label>' +
            '<input type="number" id="alg-c" class="form-input" value="' + (def.c || -6) + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var a = parseFloat(document.getElementById('alg-a').value) || 0;
        var b = parseFloat(document.getElementById('alg-b').value) || 0;
        var c = parseFloat(document.getElementById('alg-c').value) || 0;

        if (a === 0) {
          primaryValue.textContent = 'a cannot be 0';
          return;
        }

        var delta = (b * b) - (4 * a * c);
        var rootsText = '';

        if (delta > 0) {
          var x1 = (-b + Math.sqrt(delta)) / (2 * a);
          var x2 = (-b - Math.sqrt(delta)) / (2 * a);
          rootsText = 'x₁ = ' + formatNumber(x1, 3) + ', x₂ = ' + formatNumber(x2, 3);
        } else if (delta === 0) {
          var x = -b / (2 * a);
          rootsText = 'x = ' + formatNumber(x, 3) + ' (Double Root)';
        } else {
          var real = (-b / (2 * a)).toFixed(2);
          var imag = (Math.sqrt(-delta) / (2 * a)).toFixed(2);
          rootsText = real + ' ± ' + imag + 'i (Complex)';
        }

        primaryLabel.textContent = 'Quadratic Roots';
        primaryValue.textContent = rootsText;

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Discriminant (Δ = b² - 4ac):</span><span>' + delta + '</span></div>' +
          '<div class="breakdown-row"><span>Parabola Vertex x:</span><span>' + formatNumber(-b / (2 * a), 2) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildAlgebra(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
