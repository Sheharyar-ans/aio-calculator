/**
 * AIO Calculator — Modular Engine: countdown
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'countdown' && !(toolType === 'tdee' && 'countdown' === 'calorie-macro') && !(toolType === 'scientific' && 'countdown' === 'basic-math')) {
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
    function buildCountdown(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="cd-target">Target Future Event Date & Time</label>' +
          '<input type="datetime-local" id="cd-target" class="form-input" value="2027-01-01T00:00" />' +
        '</div>';

      function updateCountdown() {
        var targetVal = document.getElementById('cd-target').value;
        var target = new Date(targetVal).getTime();
        var now = new Date().getTime();
        var diff = target - now;

        if (diff <= 0) {
          primaryValue.textContent = 'Milestone Reached!';
          return;
        }

        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((diff % (1000 * 60)) / 1000);

        primaryLabel.textContent = 'Time Remaining';
        primaryValue.textContent = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
      }

      setInterval(updateCountdown, 1000);
      document.getElementById('cd-target').addEventListener('input', updateCountdown);
      updateCountdown();
    }

    // Initialize Tool
    buildCountdown(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
