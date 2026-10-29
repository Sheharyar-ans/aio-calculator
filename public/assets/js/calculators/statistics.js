/**
 * AIO Calculator — Modular Engine: statistics
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'statistics' && !(toolType === 'tdee' && 'statistics' === 'calorie-macro') && !(toolType === 'scientific' && 'statistics' === 'basic-math')) {
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
    function buildStatistics(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="stat-data">Dataset (comma or space separated)</label>' +
          '<input type="text" id="stat-data" class="form-input" value="' + (def.dataString || '12, 15, 18, 18, 22, 25, 30') + '" />' +
        '</div>';

      function compute() {
        var str = document.getElementById('stat-data').value;
        var nums = str.split(/[\s,]+/).map(Number).filter(function (n) { return !isNaN(n); });
        if (nums.length === 0) return;

        nums.sort(function (a, b) { return a - b; });
        var n = nums.length;
        var sum = nums.reduce(function (a, b) { return a + b; }, 0);
        var mean = sum / n;

        var median = n % 2 === 1 ? nums[Math.floor(n / 2)] : (nums[n / 2 - 1] + nums[n / 2]) / 2;

        var variance = nums.reduce(function (acc, val) { return acc + Math.pow(val - mean, 2); }, 0) / (n > 1 ? n - 1 : 1);
        var stdDev = Math.sqrt(variance);

        primaryLabel.textContent = 'Sample Mean (Average)';
        primaryValue.textContent = formatNumber(mean, 2);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Median:</span><span>' + formatNumber(median, 2) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Sample Standard Deviation (s):</span><span>' + formatNumber(stdDev, 2) + '</span></div>' +
          '<div class="breakdown-row"><span>Range (Max - Min):</span><span>' + (nums[n - 1] - nums[0]) + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    // Initialize Tool
    buildStatistics(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
