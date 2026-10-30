/**
 * AIO Calculator — Modular Engine: scientific
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'scientific' && !(toolType === 'tdee' && 'scientific' === 'calorie-macro') && !(toolType === 'scientific' && 'scientific' === 'basic-math')) {
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
    function buildBasicMath(def) {
      formContainer.innerHTML =
        '<div style="margin-bottom: 1rem;">' +
          '<input type="text" id="bm-display" class="form-input" value="48 / 2 * (9 + 3)" style="font-size: 1.35rem; font-family: monospace; text-align: right;" />' +
        '</div>' +
        '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">' +
          '<button class="btn btn-secondary calc-key" data-val="C">C</button>' +
          '<button class="btn btn-secondary calc-key" data-val="(">(</button>' +
          '<button class="btn btn-secondary calc-key" data-val=")">)</button>' +
          '<button class="btn btn-primary calc-key" data-val="/">÷</button>' +
          '<button class="btn btn-secondary calc-key" data-val="7">7</button>' +
          '<button class="btn btn-secondary calc-key" data-val="8">8</button>' +
          '<button class="btn btn-secondary calc-key" data-val="9">9</button>' +
          '<button class="btn btn-primary calc-key" data-val="*">×</button>' +
          '<button class="btn btn-secondary calc-key" data-val="4">4</button>' +
          '<button class="btn btn-secondary calc-key" data-val="5">5</button>' +
          '<button class="btn btn-secondary calc-key" data-val="6">6</button>' +
          '<button class="btn btn-primary calc-key" data-val="-">−</button>' +
          '<button class="btn btn-secondary calc-key" data-val="1">1</button>' +
          '<button class="btn btn-secondary calc-key" data-val="2">2</button>' +
          '<button class="btn btn-secondary calc-key" data-val="3">3</button>' +
          '<button class="btn btn-primary calc-key" data-val="+">+</button>' +
          '<button class="btn btn-secondary calc-key" data-val="0">0</button>' +
          '<button class="btn btn-secondary calc-key" data-val=".">.</button>' +
          '<button class="btn btn-secondary calc-key" data-val="back">⌫</button>' +
          '<button class="btn btn-primary calc-key" data-val="=">=</button>' +
        '</div>';

      var display = document.getElementById('bm-display');

      function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (s) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
        });
      }

      function safeCalculate(expr) {
        var clean = expr.replace(/\s+/g, '');
        if (!clean || !/^[0-9+\-*/().]+$/.test(clean)) throw new Error('Invalid');
        var pos = 0;
        function parseExpression() {
          var res = parseTerm();
          while (pos < clean.length && (clean[pos] === '+' || clean[pos] === '-')) {
            var op = clean[pos++];
            var nextTerm = parseTerm();
            if (op === '+') res += nextTerm;
            else res -= nextTerm;
          }
          return res;
        }
        function parseTerm() {
          var res = parseFactor();
          while (pos < clean.length && (clean[pos] === '*' || clean[pos] === '/')) {
            var op = clean[pos++];
            var nextFactor = parseFactor();
            if (op === '*') res *= nextFactor;
            else {
              if (nextFactor === 0) throw new Error('DivZero');
              res /= nextFactor;
            }
          }
          return res;
        }
        function parseFactor() {
          if (pos < clean.length && clean[pos] === '(') {
            pos++;
            var res = parseExpression();
            if (pos >= clean.length || clean[pos] !== ')') throw new Error('Paren');
            pos++;
            return res;
          }
          if (pos < clean.length && (clean[pos] === '+' || clean[pos] === '-')) {
            var sign = clean[pos++] === '-' ? -1 : 1;
            return sign * parseFactor();
          }
          var start = pos;
          while (pos < clean.length && ((clean[pos] >= '0' && clean[pos] <= '9') || clean[pos] === '.')) {
            pos++;
          }
          if (start === pos) throw new Error('Num');
          var num = parseFloat(clean.substring(start, pos));
          if (isNaN(num)) throw new Error('NaN');
          return num;
        }
        var result = parseExpression();
        if (pos < clean.length) throw new Error('Syntax');
        return result;
      }

      function evaluateExpr() {
        try {
          if (!display.value.trim()) {
            primaryValue.textContent = '0';
            breakdownRows.innerHTML = '';
            return;
          }
          var res = safeCalculate(display.value);
          primaryLabel.textContent = 'Arithmetic Result';
          primaryValue.textContent = formatNumber(res, 6);
          breakdownRows.innerHTML = '<div class="breakdown-row highlight"><span>Expression:</span><span>' + escapeHtml(display.value) + '</span></div>';
        } catch (e) {
          primaryValue.textContent = 'Syntax Error';
        }
      }

      formContainer.querySelectorAll('.calc-key').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var val = btn.getAttribute('data-val');
          if (val === 'C') {
            display.value = '';
          } else if (val === 'back') {
            display.value = display.value.slice(0, -1);
          } else if (val === '=') {
            evaluateExpr();
          } else {
            display.value += val;
            evaluateExpr();
          }
        });
      });

      display.addEventListener('input', evaluateExpr);
      evaluateExpr();
    }

    // Initialize Tool
    buildBasicMath(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
