/**
 * AIO Calculator : Modular Engine: pet-age-food
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'pet-age-food') return;

    var formContainer = document.getElementById('calc-form-container');
    var primaryLabel = document.getElementById('res-primary-label');
    var primaryValue = document.getElementById('res-primary-value');
    var breakdownRows = document.getElementById('res-breakdown-rows');

    if (!formContainer) return;

    var defaults = { petType: 'dog', breedSize: 'medium', ageYears: 3, ageMonths: 0, weightKg: 18, activity: 'neutered' };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="pet-type">Pet Species</label>' +
          '<select id="pet-type" class="form-input">' +
            '<option value="dog" selected>Dog (Canine)</option>' +
            '<option value="cat">Cat (Feline)</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-group" id="breed-size-group">' +
          '<label class="form-label" for="pet-breed">Dog Breed Size</label>' +
          '<select id="pet-breed" class="form-input">' +
            '<option value="small">Small Breed (&lt; 20 lbs / 9 kg)</option>' +
            '<option value="medium" selected>Medium Breed (21 to 50 lbs / 10 to 23 kg)</option>' +
            '<option value="large">Large Breed (51 to 90 lbs / 24 to 41 kg)</option>' +
            '<option value="giant">Giant Breed (&gt; 90 lbs / 41+ kg)</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="pet-age-y">Current Age (Years)</label>' +
          '<input type="number" id="pet-age-y" class="form-input" value="' + defaults.ageYears + '" min="0" max="25" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="pet-weight">Pet Weight (Kilograms)</label>' +
          '<input type="number" id="pet-weight" class="form-input" value="' + defaults.weightKg + '" min="1" max="100" step="0.5" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="pet-activity">Reproductive &amp; Activity Status</label>' +
          '<select id="pet-activity" class="form-input">' +
            '<option value="neutered" selected>Neutered / Spayed Adult (1.6&times; RER)</option>' +
            '<option value="intact">Intact Adult (1.8&times; RER)</option>' +
            '<option value="active">Active / Working Dog (2.5&times; RER)</option>' +
            '<option value="weightloss">Weight Loss Protocol (1.0&times; RER)</option>' +
            '<option value="senior">Senior / Inactive (1.2&times; RER)</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="pet-kibble">Food Calorie Density (kcal / 100g)</label>' +
          '<input type="number" id="pet-kibble" class="form-input" value="360" step="10" />' +
        '</div>' +
      '</div>';

    var petTypeSelect = document.getElementById('pet-type');
    var breedGroup = document.getElementById('breed-size-group');
    var breedSelect = document.getElementById('pet-breed');
    var ageYInp = document.getElementById('pet-age-y');
    var weightInp = document.getElementById('pet-weight');
    var activitySelect = document.getElementById('pet-activity');
    var kibbleInp = document.getElementById('pet-kibble');

    petTypeSelect.addEventListener('change', function () {
      if (petTypeSelect.value === 'cat') {
        breedGroup.style.display = 'none';
        if (parseFloat(weightInp.value) > 10) weightInp.value = 4.5;
      } else {
        breedGroup.style.display = 'block';
        if (parseFloat(weightInp.value) < 5) weightInp.value = 18;
      }
      compute();
    });

    [breedSelect, ageYInp, weightInp, activitySelect, kibbleInp].forEach(function (inp) {
      inp.addEventListener('input', compute);
      inp.addEventListener('change', compute);
    });

    function compute() {
      var species = petTypeSelect.value;
      var breed = breedSelect.value;
      var ageYears = Math.max(0, parseFloat(ageYInp.value) || 0);
      var weightKg = Math.max(0.5, parseFloat(weightInp.value) || 1);
      var activityVal = activitySelect.value;
      var kcalPer100g = Math.max(100, parseFloat(kibbleInp.value) || 360);

      // 1. Human Equivalent Age Calculation (Veterinary AVMA & AAHA standards)
      var humanAge = 0;
      if (species === 'cat') {
        if (ageYears === 0) humanAge = 0.5 * 15;
        else if (ageYears === 1) humanAge = 15;
        else if (ageYears === 2) humanAge = 24;
        else humanAge = 24 + ((ageYears - 2) * 4);
      } else {
        // Dogs: variable by breed size
        var annualRateAfterTwo = 5;
        if (breed === 'small') annualRateAfterTwo = 4;
        else if (breed === 'medium') annualRateAfterTwo = 5;
        else if (breed === 'large') annualRateAfterTwo = 6;
        else if (breed === 'giant') annualRateAfterTwo = 7.5;

        if (ageYears === 0) humanAge = 0.5 * 15;
        else if (ageYears === 1) humanAge = 15;
        else if (ageYears === 2) humanAge = 24;
        else humanAge = 24 + ((ageYears - 2) * annualRateAfterTwo);
      }

      // 2. Resting Energy Requirement (RER = 70 * (weight_kg)^0.75)
      var rer = 70 * Math.pow(weightKg, 0.75);

      // 3. Maintenance Energy Requirement (MER)
      var mult = 1.6;
      if (activityVal === 'neutered') mult = (species === 'cat' ? 1.2 : 1.6);
      else if (activityVal === 'intact') mult = (species === 'cat' ? 1.4 : 1.8);
      else if (activityVal === 'active') mult = 2.5;
      else if (activityVal === 'weightloss') mult = (species === 'cat' ? 0.8 : 1.0);
      else if (activityVal === 'senior') mult = (species === 'cat' ? 1.1 : 1.2);

      var mer = rer * mult;
      var dailyKibbleGrams = (mer / kcalPer100g) * 100;
      var dailyCups = dailyKibbleGrams / 115; // standard ~115g per dry kibble cup

      primaryLabel.textContent = 'Human Equivalent Age & Daily Food Target';
      primaryValue.textContent = Math.round(humanAge) + ' Human Years';

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Daily Energy Target (MER):</span><span>' + Math.round(mer) + ' kcal / day</span></div>' +
        '<div class="breakdown-row highlight"><span>Daily Kibble Food Portion:</span><span>' + Math.round(dailyKibbleGrams) + ' grams (' + dailyCups.toFixed(1) + ' cups)</span></div>' +
        '<div class="breakdown-row"><span>Resting Basal Energy (RER):</span><span>' + Math.round(rer) + ' kcal / day</span></div>' +
        '<div class="breakdown-row"><span>Recommended Meal Schedule:</span><span>' + Math.round(dailyKibbleGrams / 2) + 'g split across 2 meals</span></div>' +
        '<div class="breakdown-row"><span>Life Stage Classification:</span><span>' + (ageYears <= 1 ? 'Puppy / Kitten' : (humanAge >= 55 ? 'Senior Life Stage' : 'Prime Adult')) + '</span></div>';
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
