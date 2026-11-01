/**
 * AIO Calculator — Modular Engine: fitness-workout
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'fitness-workout' && !(toolType === 'tdee' && 'fitness-workout' === 'calorie-macro') && !(toolType === 'scientific' && 'fitness-workout' === 'basic-math')) {
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
    function buildFitnessWorkout(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fw-wt">Body Weight (lbs)</label>' +
            '<input type="number" id="fw-wt" class="form-input" value="' + (def.weightLbs || 165) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fw-dur">Duration (Minutes)</label>' +
            '<input type="number" id="fw-dur" class="form-input" value="' + (def.durationMinutes || 45) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fw-act">Activity Type</label>' +
            '<select id="fw-act" class="form-select">' +
              '<option value="3.5">Walking briskly (3.5 mph, MET 3.5)</option>' +
              '<option value="7.0" selected>Jogging / Running (5 mph, MET 7.0)</option>' +
              '<option value="8.0">Cycling moderate (12-14 mph, MET 8.0)</option>' +
              '<option value="6.0">Weightlifting / Resistance Training (MET 6.0)</option>' +
              '<option value="9.0">Swimming laps (MET 9.0)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var wtKg = (parseFloat(document.getElementById('fw-wt').value) || 165) * 0.453592;
        var dur = parseFloat(document.getElementById('fw-dur').value) || 45;
        var met = parseFloat(document.getElementById('fw-act').value) || 7.0;

        var cal = (met * 3.5 * wtKg / 200) * dur;

        primaryLabel.textContent = 'Estimated Workout Calories Burned';
        primaryValue.textContent = Math.round(cal) + ' kcal';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Activity MET Score:</span><span>' + met + ' METs</span></div>' +
          '<div class="breakdown-row highlight"><span>Burn Rate:</span><span>' + formatNumber(cal / dur, 1) + ' kcal / minute</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildFitnessWorkout(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
