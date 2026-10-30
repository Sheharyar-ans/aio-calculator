/**
 * AIO Calculator — Modular Engine: budget
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'budget' && !(toolType === 'tdee' && 'budget' === 'calorie-macro') && !(toolType === 'scientific' && 'budget' === 'basic-math')) {
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
    function buildBudget(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="bg-income">Monthly Take-Home Income ($)</label>' +
          '<div class="input-wrapper">' +
            '<span class="input-prefix">$</span>' +
            '<input type="number" id="bg-income" class="form-input has-prefix" value="' + (def.monthlyIncome || 5500) + '" step="100" />' +
          '</div>' +
        '</div>';

      function compute() {
        var income = parseFloat(document.getElementById('bg-income').value) || 0;
        var needs = income * 0.50;
        var wants = income * 0.30;
        var savings = income * 0.20;

        primaryLabel.textContent = '50% Needs Allocation';
        primaryValue.textContent = formatCurrency(needs);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>50% Needs (Housing, Utilities, Food):</span><span>' + formatCurrency(needs) + '</span></div>' +
          '<div class="breakdown-row"><span>30% Wants (Dining, Travel, Fun):</span><span>' + formatCurrency(wants) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>20% Savings & Debt Payoff:</span><span style="color: var(--color-success);">' + formatCurrency(savings) + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    // Initialize Tool
    buildBudget(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
