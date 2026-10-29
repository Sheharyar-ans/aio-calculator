import fs from 'fs';
import path from 'path';

const calculatorsSource = fs.readFileSync('public/assets/js/calculators.js', 'utf8');

// Tool mapping to builder function name
const toolMappings = [
  { toolType: 'emi', fn: 'buildEmi' },
  { toolType: 'loan-analyzer', fn: 'buildLoanAnalyzer' },
  { toolType: 'mortgage', fn: 'buildMortgage' },
  { toolType: 'credit-card', fn: 'buildCreditCard' },
  { toolType: 'amortization', fn: 'buildAmortization' },
  { toolType: 'sip', fn: 'buildSip' },
  { toolType: 'fd-rd', fn: 'buildFdRd' },
  { toolType: 'investment', fn: 'buildInvestment' },
  { toolType: 'roi', fn: 'buildRoi' },
  { toolType: 'retirement', fn: 'buildRetirement' },
  { toolType: 'budget', fn: 'buildBudget' },
  { toolType: 'savings', fn: 'buildSavings' },
  { toolType: 'tax', fn: 'buildTax' },
  { toolType: 'inflation', fn: 'buildInflation' },
  { toolType: 'compound-interest', fn: 'buildCompoundInterest' },
  { toolType: 'home-affordability', fn: 'buildHomeAffordability' },
  { toolType: 'rent-vs-buy', fn: 'buildRentVsBuy' },
  { toolType: 'refinance', fn: 'buildRefinance' },
  { toolType: 'fire', fn: 'buildFire' },
  { toolType: 'debt-payoff', fn: 'buildDebtPayoff' },
  { toolType: 'paycheck', fn: 'buildPaycheck' },
  { toolType: 'auto-loan', fn: 'buildAutoLoan' },
  { toolType: 'bmi-ideal-weight', fn: 'buildBmiIdealWeight' },
  { toolType: 'body-fat', fn: 'buildBodyFat' },
  { toolType: 'calorie-deficit', fn: 'buildCalorieDeficit' },
  { toolType: 'calorie-macro', fn: 'buildCalorieMacro' },
  { toolType: 'tdee', fn: 'buildCalorieMacro' },
  { toolType: 'fitness-workout', fn: 'buildFitnessWorkout' },
  { toolType: 'pregnancy', fn: 'buildPregnancy' },
  { toolType: 'steps-converter', fn: 'buildStepsConverter' },
  { toolType: 'basic-math', fn: 'buildBasicMath' },
  { toolType: 'scientific', fn: 'buildBasicMath' },
  { toolType: 'algebra', fn: 'buildAlgebra' },
  { toolType: 'geometry', fn: 'buildGeometry' },
  { toolType: 'statistics', fn: 'buildStatistics' },
  { toolType: 'probability', fn: 'buildProbability' },
  { toolType: 'fraction', fn: 'buildFraction' },
  { toolType: 'percentage', fn: 'buildPercentage' },
  { toolType: 'gpa', fn: 'buildGpa' },
  { toolType: 'final-grade', fn: 'buildFinalGrade' },
  { toolType: 'time-date-hub', fn: 'buildTimeDateHub' },
  { toolType: 'unit-conversion-hub', fn: 'buildUnitConversionHub' },
  { toolType: 'finance-shopping-hub', fn: 'buildFinanceShoppingHub' },
  { toolType: 'home-vehicle-hub', fn: 'buildHomeVehicleHub' },
  { toolType: 'tech-security-hub', fn: 'buildTechSecurityHub' },
  { toolType: 'sleep', fn: 'buildSleep' },
  { toolType: 'dice-roller', fn: 'buildDiceRoller' },
  { toolType: 'countdown', fn: 'buildCountdown' },
  { toolType: 'timezone', fn: 'buildTimezone' }
];

const outDir = path.resolve('public/assets/js/calculators');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Extract each function text from calculatorsSource
function extractFunctionBody(fnName) {
  const startMarker = `function ${fnName}(`;
  const startIndex = calculatorsSource.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error(`Function ${fnName} not found`);
  }

  // Find matching brace
  let openBraceIndex = calculatorsSource.indexOf('{', startIndex);
  let depth = 1;
  let i = openBraceIndex + 1;
  while (i < calculatorsSource.length && depth > 0) {
    if (calculatorsSource[i] === '{') depth++;
    else if (calculatorsSource[i] === '}') depth--;
    i++;
  }

  return calculatorsSource.substring(startIndex, i);
}

for (const mapping of toolMappings) {
  const fnBody = extractFunctionBody(mapping.fn);
  
  const modularCode = `/**
 * AIO Calculator — Modular Engine: ${mapping.toolType}
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * CloudPages / LiteSpeed High-Performance Modular Asset
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== '${mapping.toolType}' && !(toolType === 'tdee' && '${mapping.toolType}' === 'calorie-macro') && !(toolType === 'scientific' && '${mapping.toolType}' === 'basic-math')) {
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
    ${fnBody}

    // Initialize Tool
    ${mapping.fn}(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;

  const targetPath = path.join(outDir, `${mapping.toolType}.js`);
  fs.writeFileSync(targetPath, modularCode, 'utf8');
}

console.log(`Generated ${toolMappings.length} modular calculator engines in ${outDir}`);
