/**
 * AIO Calculator — Modular Engine: calorie-macro
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'calorie-macro' && !(toolType === 'tdee' && 'calorie-macro' === 'calorie-macro') && !(toolType === 'scientific' && 'calorie-macro' === 'basic-math')) {
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
    function buildCalorieMacro(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="cm-wt">Weight (kg)</label>' +
            '<input type="number" id="cm-wt" class="form-input" value="' + (def.weightKg || 81.6) + '" step="1" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cm-ht">Height (cm)</label>' +
            '<input type="number" id="cm-ht" class="form-input" value="' + (def.heightCm || 180) + '" step="1" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cm-age">Age</label>' +
            '<input type="number" id="cm-age" class="form-input" value="' + (def.age || 28) + '" min="15" max="90" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cm-act">Activity Level</label>' +
            '<select id="cm-act" class="form-select">' +
              '<option value="1.2">Sedentary (Desk job, no exercise)</option>' +
              '<option value="1.375">Light (1-2 days/week)</option>' +
              '<option value="1.55" selected>Moderate (3-5 days/week)</option>' +
              '<option value="1.725">Heavy (6-7 days/week)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var wt = parseFloat(document.getElementById('cm-wt').value) || 81.6;
        var ht = parseFloat(document.getElementById('cm-ht').value) || 180;
        var age = parseFloat(document.getElementById('cm-age').value) || 28;
        var act = parseFloat(document.getElementById('cm-act').value) || 1.55;

        var bmr = (10 * wt) + (6.25 * ht) - (5 * age) + 5;
        var tdee = Math.round(bmr * act);

        var proteinGrams = Math.round(wt * 2.0);
        var fatGrams = Math.round(wt * 0.9);
        var carbGrams = Math.max(50, Math.round((tdee - (proteinGrams * 4) - (fatGrams * 9)) / 4));

        primaryLabel.textContent = 'Maintenance TDEE';
        primaryValue.textContent = tdee + ' kcal / day';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Protein Target:</span><span>' + proteinGrams + 'g (' + (proteinGrams * 4) + ' kcal)</span></div>' +
          '<div class="breakdown-row highlight"><span>Carbohydrates Target:</span><span>' + carbGrams + 'g (' + (carbGrams * 4) + ' kcal)</span></div>' +
          '<div class="breakdown-row highlight"><span>Fats Target:</span><span>' + fatGrams + 'g (' + (fatGrams * 9) + ' kcal)</span></div>' +
          '<div class="breakdown-row"><span>Basal Metabolic Rate (BMR):</span><span>' + Math.round(bmr) + ' kcal</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    // Initialize Tool
    buildCalorieMacro(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
