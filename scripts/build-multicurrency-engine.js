import fs from 'fs';
import path from 'path';

const calculatorsSource = fs.readFileSync('public/assets/js/calculators.js', 'utf8');

const toolMappings = [
  { toolType: 'emi', fn: 'buildEmi', isFinance: true },
  { toolType: 'loan-analyzer', fn: 'buildLoanAnalyzer', isFinance: true },
  { toolType: 'mortgage', fn: 'buildMortgage', isFinance: true },
  { toolType: 'credit-card', fn: 'buildCreditCard', isFinance: true },
  { toolType: 'amortization', fn: 'buildAmortization', isFinance: true },
  { toolType: 'sip', fn: 'buildSip', isFinance: true },
  { toolType: 'fd-rd', fn: 'buildFdRd', isFinance: true },
  { toolType: 'investment', fn: 'buildInvestment', isFinance: true },
  { toolType: 'roi', fn: 'buildRoi', isFinance: true },
  { toolType: 'retirement', fn: 'buildRetirement', isFinance: true },
  { toolType: 'budget', fn: 'buildBudget', isFinance: true },
  { toolType: 'savings', fn: 'buildSavings', isFinance: true },
  { toolType: 'tax', fn: 'buildTax', isFinance: true },
  { toolType: 'inflation', fn: 'buildInflation', isFinance: true },
  { toolType: 'compound-interest', fn: 'buildCompoundInterest', isFinance: true },
  { toolType: 'home-affordability', fn: 'buildHomeAffordability', isFinance: true },
  { toolType: 'rent-vs-buy', fn: 'buildRentVsBuy', isFinance: true },
  { toolType: 'refinance', fn: 'buildRefinance', isFinance: true },
  { toolType: 'fire', fn: 'buildFire', isFinance: true },
  { toolType: 'debt-payoff', fn: 'buildDebtPayoff', isFinance: true },
  { toolType: 'paycheck', fn: 'buildPaycheck', isFinance: true },
  { toolType: 'auto-loan', fn: 'buildAutoLoan', isFinance: true },
  { toolType: 'bmi-ideal-weight', fn: 'buildBmiIdealWeight', isFinance: false },
  { toolType: 'body-fat', fn: 'buildBodyFat', isFinance: false },
  { toolType: 'calorie-deficit', fn: 'buildCalorieDeficit', isFinance: false },
  { toolType: 'calorie-macro', fn: 'buildCalorieMacro', isFinance: false },
  { toolType: 'tdee', fn: 'buildCalorieMacro', isFinance: false },
  { toolType: 'fitness-workout', fn: 'buildFitnessWorkout', isFinance: false },
  { toolType: 'pregnancy', fn: 'buildPregnancy', isFinance: false },
  { toolType: 'steps-converter', fn: 'buildStepsConverter', isFinance: false },
  { toolType: 'basic-math', fn: 'buildBasicMath', isFinance: false },
  { toolType: 'scientific', fn: 'buildBasicMath', isFinance: false },
  { toolType: 'algebra', fn: 'buildAlgebra', isFinance: false },
  { toolType: 'geometry', fn: 'buildGeometry', isFinance: false },
  { toolType: 'statistics', fn: 'buildStatistics', isFinance: false },
  { toolType: 'probability', fn: 'buildProbability', isFinance: false },
  { toolType: 'fraction', fn: 'buildFraction', isFinance: false },
  { toolType: 'percentage', fn: 'buildPercentage', isFinance: false },
  { toolType: 'gpa', fn: 'buildGpa', isFinance: false },
  { toolType: 'final-grade', fn: 'buildFinalGrade', isFinance: false },
  { toolType: 'time-date-hub', fn: 'buildTimeDateHub', isFinance: false },
  { toolType: 'unit-conversion-hub', fn: 'buildUnitConversionHub', isFinance: false },
  { toolType: 'finance-shopping-hub', fn: 'buildFinanceShoppingHub', isFinance: true },
  { toolType: 'home-vehicle-hub', fn: 'buildHomeVehicleHub', isFinance: true },
  { toolType: 'tech-security-hub', fn: 'buildTechSecurityHub', isFinance: false },
  { toolType: 'sleep', fn: 'buildSleep', isFinance: false },
  { toolType: 'dice-roller', fn: 'buildDiceRoller', isFinance: false },
  { toolType: 'countdown', fn: 'buildCountdown', isFinance: false },
  { toolType: 'timezone', fn: 'buildTimezone', isFinance: false }
];

function extractFunctionBody(fnName) {
  const startMarker = `function ${fnName}(`;
  const startIndex = calculatorsSource.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error(`Function ${fnName} not found`);
  }

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

function transformFinanceFunction(code) {
  let res = code;

  // 1. Prepend currency bar to formContainer.innerHTML
  res = res.replace(/formContainer\.innerHTML\s*=\s*/g, 'formContainer.innerHTML = getCurBarHtml() + ');

  // 2. Dynamic currency symbol in input prefixes
  res = res.replace(/<span class=["']input-prefix["']>\$<\/span>/g, '<span class="input-prefix">\' + getCurSymbol() + \'</span>');

  // 3. Dynamic currency in labels with ($)
  res = res.replace(/\(\$\)/g, '(\' + getCurSymbol() + \')');

  // 4. Fallback zero values to formatCurrency(0)
  res = res.replace(/primaryValue\.textContent\s*=\s*['"]\$0\.00['"]/g, 'primaryValue.textContent = formatCurrency(0)');

  // 5. Special inline string replacements
  res = res.replace(/['"]\$['"]\s*\+\s*formatNumber\(([^,]+),\s*0\)\s*\+\s*['"]\+['"]/g, 'formatCurrency($1, 0) + "+"');
  res = res.replace(/Recurring Deposit \(\$['"]\s*\+\s*formatNumber\(([^,]+),\s*0\)\s*\+\s*['"]\/mo\)/g, 'Recurring Deposit (\' + formatCurrency($1, 0) + \'/mo)');
  res = res.replace(/Purchasing Power of \$['"]\s*\+\s*formatNumber\(([^,]+),\s*0\)/g, 'Purchasing Power of \' + formatCurrency($1, 0)');

  // 6. Bind currency bar and listener before compute()
  const computeCall = '\n      compute();\n    }';
  const lastComputeIdx = res.lastIndexOf(computeCall);
  if (lastComputeIdx !== -1) {
    const bindCode = `
      if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.bindBar === 'function') {
        window.AIO_CURRENCY.bindBar(formContainer, compute);
      }
      window.addEventListener('aioCurrencyChange', function () {
        if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.updateForms === 'function') {
          window.AIO_CURRENCY.updateForms(window.AIO_CURRENCY.getCurrent());
        }
        compute();
      });
      compute();
    }`;
    res = res.substring(0, lastComputeIdx) + bindCode + res.substring(lastComputeIdx + computeCall.length);
  }

  return res;
}

// Generate modular calculator files
for (const mapping of toolMappings) {
  let fnBody = extractFunctionBody(mapping.fn);
  if (mapping.isFinance) {
    fnBody = transformFinanceFunction(fnBody);
  }

  const modularCode = `/**
 * AIO Calculator : Modular Engine: ${mapping.toolType}
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
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

  // Write to both assets/js/calculators and public/assets/js/calculators
  const out1 = path.join('assets/js/calculators', `${mapping.toolType}.js`);
  const out2 = path.join('public/assets/js/calculators', `${mapping.toolType}.js`);
  fs.writeFileSync(out1, modularCode, 'utf8');
  if (fs.existsSync('public/assets/js/calculators')) {
    fs.writeFileSync(out2, modularCode, 'utf8');
  }
}

console.log(`Generated ${toolMappings.length} modular calculator engines with multi-currency support.`);
