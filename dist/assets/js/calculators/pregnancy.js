/**
 * AIO Calculator : Modular Engine: pregnancy
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'pregnancy' && !(toolType === 'tdee' && 'pregnancy' === 'calorie-macro') && !(toolType === 'scientific' && 'pregnancy' === 'basic-math')) {
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
    function buildPregnancy(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="pg-date">First Day of Last Menstrual Period (LMP)</label>' +
          '<input type="date" id="pg-date" class="form-input" value="' + (def.lmpDate || '2026-04-10') + '" />' +
        '</div>';

      function compute() {
        var dateVal = document.getElementById('pg-date').value;
        if (!dateVal) return;

        var lmp = new Date(dateVal);
        var edd = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
        var now = new Date();
        var diffWeeks = Math.max(0, Math.floor((now.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000)));

        primaryLabel.textContent = 'Estimated Date of Delivery (EDD)';
        primaryValue.textContent = edd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Gestational Age:</span><span>' + diffWeeks + ' Weeks</span></div>' +
          '<div class="breakdown-row"><span>Current Trimester:</span><span>' + (diffWeeks <= 13 ? '1st Trimester' : diffWeeks <= 27 ? '2nd Trimester' : '3rd Trimester') + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    // Initialize Tool
    buildPregnancy(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
