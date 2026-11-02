/**
 * AIO Calculator : Modular Engine: water-intake
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'water-intake') return;

    var formContainer = document.getElementById('calc-form-container');
    var primaryLabel = document.getElementById('res-primary-label');
    var primaryValue = document.getElementById('res-primary-value');
    var breakdownRows = document.getElementById('res-breakdown-rows');

    if (!formContainer) return;

    var defaults = { weightKg: 70, exerciseMins: 30, climate: 'normal', state: 'normal' };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="wi-weight">Body Weight (Kilograms)</label>' +
          '<input type="number" id="wi-weight" class="form-input" value="' + defaults.weightKg + '" min="30" max="250" step="1" />' +
          '<input type="range" id="wi-weight-slider" class="form-range" min="40" max="140" step="1" value="' + defaults.weightKg + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="wi-exercise">Daily Exercise Duration (Minutes)</label>' +
          '<input type="number" id="wi-exercise" class="form-input" value="' + defaults.exerciseMins + '" min="0" max="300" step="5" />' +
          '<input type="range" id="wi-exercise-slider" class="form-range" min="0" max="120" step="5" value="' + defaults.exerciseMins + '" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="wi-climate">Environmental Climate</label>' +
          '<select id="wi-climate" class="form-input">' +
            '<option value="1.0" selected>Moderate / Temperate (Standard)</option>' +
            '<option value="1.15">Hot Weather / Summer Heat (+15%)</option>' +
            '<option value="1.20">Hot &amp; Humid Tropical (+20%)</option>' +
            '<option value="1.10">Dry / Arid Mountainous (+10%)</option>' +
            '<option value="1.05">Cold / Winter Dry (+5%)</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="wi-state">Special Biological Condition</label>' +
          '<select id="wi-state" class="form-input">' +
            '<option value="0" selected>Standard Adult</option>' +
            '<option value="350">Pregnant (+350 mL / day)</option>' +
            '<option value="750">Breastfeeding / Lactating (+750 mL / day)</option>' +
          '</select>' +
        '</div>' +
      '</div>';

    var weightInp = document.getElementById('wi-weight');
    var weightSlider = document.getElementById('wi-weight-slider');
    var exerciseInp = document.getElementById('wi-exercise');
    var exerciseSlider = document.getElementById('wi-exercise-slider');
    var climateSelect = document.getElementById('wi-climate');
    var stateSelect = document.getElementById('wi-state');

    weightInp.addEventListener('input', function () { weightSlider.value = weightInp.value; compute(); });
    weightSlider.addEventListener('input', function () { weightInp.value = weightSlider.value; compute(); });
    exerciseInp.addEventListener('input', function () { exerciseSlider.value = exerciseInp.value; compute(); });
    exerciseSlider.addEventListener('input', function () { exerciseInp.value = exerciseSlider.value; compute(); });

    climateSelect.addEventListener('change', compute);
    stateSelect.addEventListener('change', compute);

    function compute() {
      var weight = Math.max(20, parseFloat(weightInp.value) || 70);
      var exerciseMins = Math.max(0, parseFloat(exerciseInp.value) || 0);
      var climateFactor = parseFloat(climateSelect.value) || 1.0;
      var stateExtraMl = parseFloat(stateSelect.value) || 0;

      // Baseline: 35 mL per kg of body weight (European Food Safety Authority & WHO standards)
      var baseMl = weight * 35;

      // Exercise compensation: ~350 mL per 30 minutes of moderate activity
      var exerciseMl = (exerciseMins / 30) * 350;

      var totalMl = (baseMl + exerciseMl + stateExtraMl) * climateFactor;
      var totalLiters = totalMl / 1000;
      var totalFlOz = totalMl * 0.033814;
      var glasses250ml = totalMl / 250;

      primaryLabel.textContent = 'Recommended Daily Water Intake';
      primaryValue.textContent = totalLiters.toFixed(2) + ' Liters';

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Fluid Ounces Equivalent:</span><span>' + Math.round(totalFlOz) + ' fl oz</span></div>' +
        '<div class="breakdown-row highlight"><span>Standard 250mL Drinking Glasses:</span><span>' + Math.round(glasses250ml) + ' glasses / day</span></div>' +
        '<div class="breakdown-row"><span>Baseline Resting Requirement:</span><span>' + (baseMl / 1000).toFixed(2) + ' L</span></div>' +
        '<div class="breakdown-row"><span>Workout Sweat Replenishment:</span><span>+' + Math.round(exerciseMl) + ' mL</span></div>' +
        '<div class="breakdown-row"><span>Recommended Pace:</span><span>Drink ~1 glass (' + Math.round(totalMl / 8) + ' mL) every 2 waking hours</span></div>';
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
