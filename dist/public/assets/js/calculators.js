/**
 * AIO Calculator — Interactive Calculation Engines
 * 100% Client-Side Vanilla JavaScript
 * Zero Server Runtime, Zero External Dependencies, Zero Tracking
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
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

    // Parse defaults from data attribute or fallback
    var defaults = {};
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = JSON.parse(raw);
    } catch (e) {}

    // Tool Routing
    switch (toolType) {
      case 'emi': buildEmi(defaults); break;
      case 'loan-analyzer': buildLoanAnalyzer(defaults); break;
      case 'mortgage': buildMortgage(defaults); break;
      case 'credit-card': buildCreditCard(defaults); break;
      case 'amortization': buildAmortization(defaults); break;
      case 'sip': buildSip(defaults); break;
      case 'fd-rd': buildFdRd(defaults); break;
      case 'investment': buildInvestment(defaults); break;
      case 'roi': buildRoi(defaults); break;
      case 'retirement': buildRetirement(defaults); break;
      case 'budget': buildBudget(defaults); break;
      case 'savings': buildSavings(defaults); break;
      case 'tax': buildTax(defaults); break;
      case 'inflation': buildInflation(defaults); break;
      case 'compound-interest': buildCompoundInterest(defaults); break;
      case 'home-affordability': buildHomeAffordability(defaults); break;
      case 'rent-vs-buy': buildRentVsBuy(defaults); break;
      case 'refinance': buildRefinance(defaults); break;
      case 'fire': buildFire(defaults); break;
      case 'debt-payoff': buildDebtPayoff(defaults); break;
      case 'paycheck': buildPaycheck(defaults); break;
      case 'auto-loan': buildAutoLoan(defaults); break;

      // Health
      case 'bmi-ideal-weight': buildBmiIdealWeight(defaults); break;
      case 'body-fat': buildBodyFat(defaults); break;
      case 'calorie-deficit': buildCalorieDeficit(defaults); break;
      case 'calorie-macro': case 'tdee': buildCalorieMacro(defaults); break;
      case 'fitness-workout': buildFitnessWorkout(defaults); break;
      case 'pregnancy': buildPregnancy(defaults); break;
      case 'steps-converter': buildStepsConverter(defaults); break;

      // Math
      case 'basic-math': case 'scientific': buildBasicMath(defaults); break;
      case 'algebra': buildAlgebra(defaults); break;
      case 'geometry': buildGeometry(defaults); break;
      case 'statistics': buildStatistics(defaults); break;
      case 'probability': buildProbability(defaults); break;
      case 'fraction': buildFraction(defaults); break;
      case 'percentage': buildPercentage(defaults); break;
      case 'gpa': buildGpa(defaults); break;
      case 'final-grade': buildFinalGrade(defaults); break;

      // Everyday
      case 'time-date-hub': buildTimeDateHub(defaults); break;
      case 'unit-conversion-hub': buildUnitConversionHub(defaults); break;
      case 'finance-shopping-hub': buildFinanceShoppingHub(defaults); break;
      case 'home-vehicle-hub': buildHomeVehicleHub(defaults); break;
      case 'tech-security-hub': buildTechSecurityHub(defaults); break;
      case 'sleep': buildSleep(defaults); break;
      case 'dice-roller': buildDiceRoller(defaults); break;
      case 'countdown': buildCountdown(defaults); break;
      case 'timezone': buildTimezone(defaults); break;
    }

    // -------------------------------------------------------------
    // FINANCIAL IMPLEMENTATIONS
    // -------------------------------------------------------------
    function buildEmi(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="emi-p">Loan Amount ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="emi-p" class="form-input has-prefix" value="' + (def.principal || 25000) + '" step="1000" min="100" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="emi-r">Annual Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="emi-r" class="form-input has-suffix" value="' + (def.rate || 8.0) + '" step="0.1" min="0.1" max="50" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="emi-n">Loan Tenure (Years)</label>' +
            '<input type="number" id="emi-n" class="form-input" value="' + (def.tenureYears || 3) + '" step="0.5" min="0.5" max="30" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('emi-p').value) || 0;
        var annualRate = parseFloat(document.getElementById('emi-r').value) || 0;
        var years = parseFloat(document.getElementById('emi-n').value) || 0;

        var r = (annualRate / 12) / 100;
        var n = years * 12;

        if (P <= 0 || r <= 0 || n <= 0) {
          primaryValue.textContent = '$0.00';
          return;
        }

        var emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        var totalPayment = emi * n;
        var totalInterest = totalPayment - P;

        primaryLabel.textContent = 'Monthly EMI Payment';
        primaryValue.textContent = formatCurrency(emi) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Principal Borrowed:</span><span>' + formatCurrency(P) + '</span></div>' +
          '<div class="breakdown-row"><span>Total Interest:</span><span>' + formatCurrency(totalInterest) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Payment (' + n + ' months):</span><span>' + formatCurrency(totalPayment) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildLoanAnalyzer(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-p">Principal Amount ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="la-p" class="form-input has-prefix" value="' + (def.principal || 40000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-r">Interest Rate (APR %)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="la-r" class="form-input has-suffix" value="' + (def.rate || 9.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-n">Term (Years)</label>' +
            '<input type="number" id="la-n" class="form-input" value="' + (def.tenureYears || 5) + '" step="1" min="1" max="30" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="la-extra">Extra Monthly Prepayment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="la-extra" class="form-input has-prefix" value="' + (def.extraPayment || 100) + '" step="25" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('la-p').value) || 0;
        var rate = parseFloat(document.getElementById('la-r').value) || 0;
        var years = parseFloat(document.getElementById('la-n').value) || 0;
        var extra = parseFloat(document.getElementById('la-extra').value) || 0;

        var r = (rate / 12) / 100;
        var n = years * 12;
        if (P <= 0 || r <= 0 || n <= 0) return;

        var baseMonthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        var baselineTotalInterest = (baseMonthly * n) - P;
        var interestRatio = (baselineTotalInterest / P) * 100;

        var bal = P;
        var monthsWithExtra = 0;
        var totalInterestWithExtra = 0;
        var paymentWithExtra = baseMonthly + extra;

        while (bal > 0 && monthsWithExtra < 600) {
          var interestMonth = bal * r;
          var principalMonth = Math.min(bal, paymentWithExtra - interestMonth);
          totalInterestWithExtra += interestMonth;
          bal -= principalMonth;
          monthsWithExtra++;
        }

        var interestSaved = Math.max(0, baselineTotalInterest - totalInterestWithExtra);

        primaryLabel.textContent = 'Total Lifetime Interest Cost';
        primaryValue.textContent = formatCurrency(baselineTotalInterest);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Base Monthly Payment:</span><span>' + formatCurrency(baseMonthly) + '</span></div>' +
          '<div class="breakdown-row"><span>Interest-to-Principal Ratio:</span><span>' + formatNumber(interestRatio, 2) + '%</span></div>' +
          '<div class="breakdown-row highlight"><span>Interest Saved with $' + extra + '/mo:</span><span style="color: var(--color-success);">' + formatCurrency(interestSaved) + '</span></div>' +
          '<div class="breakdown-row"><span>New Payoff Timeline:</span><span>' + monthsWithExtra + ' months (' + (n - monthsWithExtra) + ' months sooner)</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildMortgage(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-price">Home Purchase Price ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="mg-price" class="form-input has-prefix" value="' + (def.homePrice || 450000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-down">Down Payment (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="mg-down" class="form-input has-suffix" value="' + (def.downPaymentPercent || 10) + '" step="1" min="0" max="90" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-rate">Mortgage Rate (30-Yr PMMS Ref: 6.54%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="mg-rate" class="form-input has-suffix" value="' + (def.rate || 6.54) + '" step="0.05" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-term">Loan Term</label>' +
            '<select id="mg-term" class="form-select">' +
              '<option value="30" ' + (def.termYears === 30 ? 'selected' : '') + '>30 Years Fixed</option>' +
              '<option value="15" ' + (def.termYears === 15 ? 'selected' : '') + '>15 Years Fixed</option>' +
              '<option value="20">20 Years Fixed</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-tax">Annual Property Tax (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="mg-tax" class="form-input has-suffix" value="' + (def.propertyTaxRate || 1.2) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="mg-ins">Annual Homeowners Insurance ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="mg-ins" class="form-input has-prefix" value="' + (def.homeInsuranceAnnual || 1440) + '" step="100" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var price = parseFloat(document.getElementById('mg-price').value) || 0;
        var downPct = parseFloat(document.getElementById('mg-down').value) || 0;
        var rate = parseFloat(document.getElementById('mg-rate').value) || 0;
        var term = parseFloat(document.getElementById('mg-term').value) || 30;
        var taxRate = parseFloat(document.getElementById('mg-tax').value) || 0;
        var annualIns = parseFloat(document.getElementById('mg-ins').value) || 0;

        var downAmount = price * (downPct / 100);
        var loanAmount = Math.max(0, price - downAmount);
        var r = (rate / 12) / 100;
        var n = term * 12;

        var pi = (loanAmount > 0 && r > 0)
          ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
          : 0;

        var monthlyTax = (price * (taxRate / 100)) / 12;
        var monthlyIns = annualIns / 12;
        var monthlyPmi = (downPct < 20 && loanAmount > 0)
          ? (loanAmount * 0.007) / 12
          : 0;

        var totalPiti = pi + monthlyTax + monthlyIns + monthlyPmi;

        primaryLabel.textContent = 'Total Monthly Payment (PITI + PMI)';
        primaryValue.textContent = formatCurrency(totalPiti) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Principal & Interest:</span><span>' + formatCurrency(pi) + '</span></div>' +
          '<div class="breakdown-row"><span>Property Tax (Escrow):</span><span>' + formatCurrency(monthlyTax) + '</span></div>' +
          '<div class="breakdown-row"><span>Homeowners Insurance:</span><span>' + formatCurrency(monthlyIns) + '</span></div>' +
          '<div class="breakdown-row"><span>PMI (Down &lt; 20%):</span><span>' + formatCurrency(monthlyPmi) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Loan Amount:</span><span>' + formatCurrency(loanAmount) + ' (' + formatCurrency(downAmount) + ' down)</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    function buildCreditCard(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="cc-bal">Current Card Balance ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="cc-bal" class="form-input has-prefix" value="' + (def.balance || 8000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cc-apr">Card APR (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="cc-apr" class="form-input has-suffix" value="' + (def.rate || 22.0) + '" step="0.5" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="cc-pay">Planned Monthly Fixed Payment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="cc-pay" class="form-input has-prefix" value="' + (def.monthlyPayment || 300) + '" step="25" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var balance = parseFloat(document.getElementById('cc-bal').value) || 0;
        var apr = parseFloat(document.getElementById('cc-apr').value) || 0;
        var pmt = parseFloat(document.getElementById('cc-pay').value) || 0;

        var dailyRate = (apr / 100) / 365;
        var monthlyRate = dailyRate * 30.4167;

        if (balance <= 0 || pmt <= balance * monthlyRate) {
          primaryValue.textContent = 'Payment too low';
          breakdownRows.innerHTML = '<div style="color: var(--color-danger); font-size: 0.9rem;">Monthly payment must be greater than monthly interest.</div>';
          return;
        }

        var bal = balance;
        var months = 0;
        var totalInterest = 0;

        while (bal > 0 && months < 600) {
          var interest = bal * monthlyRate;
          var principal = Math.min(bal, pmt - interest);
          totalInterest += interest;
          bal -= principal;
          months++;
        }

        primaryLabel.textContent = 'Time to Debt-Free';
        primaryValue.textContent = months + ' Months (' + (months / 12).toFixed(1) + ' Years)';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Interest Paid:</span><span>' + formatCurrency(totalInterest) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Paid Back:</span><span>' + formatCurrency(balance + totalInterest) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildAmortization(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="am-p">Loan Principal ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="am-p" class="form-input has-prefix" value="' + (def.principal || 250000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="am-r">Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="am-r" class="form-input has-suffix" value="' + (def.rate || 6.0) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="am-term">Term (Years)</label>' +
            '<input type="number" id="am-term" class="form-input" value="' + (def.tenureYears || 30) + '" step="5" min="5" max="30" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('am-p').value) || 0;
        var rate = parseFloat(document.getElementById('am-r').value) || 0;
        var years = parseFloat(document.getElementById('am-term').value) || 0;

        var r = (rate / 12) / 100;
        var n = years * 12;
        if (P <= 0 || r <= 0 || n <= 0) return;

        var monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        var total = monthly * n;
        var totalInterest = total - P;

        var m1Interest = P * r;
        var m1Principal = monthly - m1Interest;

        primaryLabel.textContent = 'Monthly Principal & Interest';
        primaryValue.textContent = formatCurrency(monthly) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Month 1 Interest:</span><span>' + formatCurrency(m1Interest) + '</span></div>' +
          '<div class="breakdown-row"><span>Month 1 Principal:</span><span>' + formatCurrency(m1Principal) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Interest over ' + years + ' yrs:</span><span>' + formatCurrency(totalInterest) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildSip(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="sip-pmt">Monthly Investment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="sip-pmt" class="form-input has-prefix" value="' + (def.monthlyInvestment || 500) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sip-r">Expected Annual Return (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="sip-r" class="form-input has-suffix" value="' + (def.annualRate || 10.0) + '" step="0.5" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="sip-y">Investment Time Horizon (Years)</label>' +
            '<input type="number" id="sip-y" class="form-input" value="' + (def.tenureYears || 15) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var pmt = parseFloat(document.getElementById('sip-pmt').value) || 0;
        var rate = parseFloat(document.getElementById('sip-r').value) || 0;
        var years = parseFloat(document.getElementById('sip-y').value) || 0;

        var i = (rate / 12) / 100;
        var n = years * 12;
        if (pmt <= 0 || i <= 0 || n <= 0) return;

        var totalInvested = pmt * n;
        var fv = pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        var wealthGain = fv - totalInvested;

        primaryLabel.textContent = 'Projected Maturity Value';
        primaryValue.textContent = formatCurrency(fv);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Invested Capital:</span><span>' + formatCurrency(totalInvested) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Estimated Wealth Gained:</span><span style="color: var(--color-success);">' + formatCurrency(wealthGain) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildFdRd(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fdrd-amt">Total Deposit Capital ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="fdrd-amt" class="form-input has-prefix" value="' + (def.amount || 12000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fdrd-r">Annual Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="fdrd-r" class="form-input has-suffix" value="' + (def.rate || 6.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fdrd-y">Term (Years)</label>' +
            '<input type="number" id="fdrd-y" class="form-input" value="' + (def.tenureYears || 2) + '" step="1" min="1" max="10" />' +
          '</div>' +
        '</div>';

      function compute() {
        var total = parseFloat(document.getElementById('fdrd-amt').value) || 0;
        var rate = parseFloat(document.getElementById('fdrd-r').value) || 0;
        var years = parseFloat(document.getElementById('fdrd-y').value) || 0;

        var r = rate / 100;
        var nMonths = years * 12;
        var monthlyInstallment = total / nMonths;

        var fdMaturity = total * Math.pow(1 + (r / 4), 4 * years);
        var fdInterest = fdMaturity - total;

        var rdMaturity = 0;
        for (var m = 1; m <= nMonths; m++) {
          var remainingYears = (nMonths - m + 1) / 12;
          rdMaturity += monthlyInstallment * Math.pow(1 + (r / 4), 4 * remainingYears);
        }
        var rdInterest = rdMaturity - total;

        primaryLabel.textContent = 'FD vs RD Maturity Comparison';
        primaryValue.textContent = formatCurrency(fdMaturity) + ' (FD)';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Fixed Deposit (Lump Sum) Returns:</span><span>' + formatCurrency(fdMaturity) + '</span></div>' +
          '<div class="breakdown-row"><span>Recurring Deposit ($' + formatNumber(monthlyInstallment, 0) + '/mo) Returns:</span><span>' + formatCurrency(rdMaturity) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>FD Advantage:</span><span style="color: var(--color-success);">+' + formatCurrency(fdMaturity - rdMaturity) + ' more interest</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildInvestment(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="inv-p">Initial Lump-Sum Investment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="inv-p" class="form-input has-prefix" value="' + (def.initialInvestment || 50000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="inv-r">Expected Annual Return (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="inv-r" class="form-input has-suffix" value="' + (def.annualRate || 8.0) + '" step="0.5" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="inv-t">Time Horizon (Years)</label>' +
            '<input type="number" id="inv-t" class="form-input" value="' + (def.years || 20) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('inv-p').value) || 0;
        var r = (parseFloat(document.getElementById('inv-r').value) || 0) / 100;
        var t = parseFloat(document.getElementById('inv-t').value) || 0;

        var fv = P * Math.pow(1 + r, t);
        var gain = fv - P;

        primaryLabel.textContent = 'Projected Portfolio Balance';
        primaryValue.textContent = formatCurrency(fv);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Initial Investment:</span><span>' + formatCurrency(P) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Compound Growth:</span><span style="color: var(--color-success);">+' + formatCurrency(gain) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildRoi(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="roi-cost">Initial Cost ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="roi-cost" class="form-input has-prefix" value="' + (def.initialCost || 60000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="roi-ret">Final Value ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="roi-ret" class="form-input has-prefix" value="' + (def.finalValue || 95000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="roi-yrs">Holding Period (Years)</label>' +
            '<input type="number" id="roi-yrs" class="form-input" value="' + (def.years || 4) + '" step="0.5" min="0.1" />' +
          '</div>' +
        '</div>';

      function compute() {
        var cost = parseFloat(document.getElementById('roi-cost').value) || 0;
        var val = parseFloat(document.getElementById('roi-ret').value) || 0;
        var yrs = parseFloat(document.getElementById('roi-yrs').value) || 1;

        var profit = val - cost;
        var roi = cost > 0 ? (profit / cost) * 100 : 0;
        var cagr = (cost > 0 && val > 0 && yrs > 0)
          ? (Math.pow(val / cost, 1 / yrs) - 1) * 100
          : 0;

        primaryLabel.textContent = 'Simple Return on Investment (ROI)';
        primaryValue.textContent = (roi >= 0 ? '+' : '') + formatNumber(roi, 2) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Net Dollar Profit:</span><span style="font-weight: 700; color: ' + (profit >= 0 ? 'var(--color-success)' : 'var(--color-danger)') + ';">' + formatCurrency(profit) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Annualized Return (CAGR):</span><span>' + formatNumber(cagr, 2) + '% / year</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildRetirement(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-age">Current Age</label>' +
            '<input type="number" id="ret-age" class="form-input" value="' + (def.currentAge || 35) + '" min="18" max="80" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-target-age">Retirement Age</label>' +
            '<input type="number" id="ret-target-age" class="form-input" value="' + (def.retirementAge || 65) + '" min="30" max="90" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-cur">Current Savings ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ret-cur" class="form-input has-prefix" value="' + (def.currentSavings || 80000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ret-mo">Monthly Addition ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ret-mo" class="form-input has-prefix" value="' + (def.monthlySavings || 800) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="ret-spend">Desired Annual Spending in Retirement ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ret-spend" class="form-input has-prefix" value="' + (def.annualExpense || 70000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var curAge = parseFloat(document.getElementById('ret-age').value) || 35;
        var targetAge = parseFloat(document.getElementById('ret-target-age').value) || 65;
        var curSavings = parseFloat(document.getElementById('ret-cur').value) || 0;
        var moSavings = parseFloat(document.getElementById('ret-mo').value) || 0;
        var spend = parseFloat(document.getElementById('ret-spend').value) || 0;

        var yearsLeft = Math.max(1, targetAge - curAge);
        var r = 0.07 / 12;
        var n = yearsLeft * 12;

        var curGrowth = curSavings * Math.pow(1 + 0.07, yearsLeft);
        var moGrowth = moSavings * ((Math.pow(1 + r, n) - 1) / r);
        var projectedCorpus = curGrowth + moGrowth;
        var targetCorpus = spend / 0.04;
        var fundedPct = (projectedCorpus / targetCorpus) * 100;

        primaryLabel.textContent = 'Projected Retirement Nest Egg';
        primaryValue.textContent = formatCurrency(projectedCorpus);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Target Corpus Needed (4% Rule):</span><span>' + formatCurrency(targetCorpus) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Goal Funded:</span><span style="color: ' + (fundedPct >= 100 ? 'var(--color-success)' : 'var(--color-warning)') + ';">' + formatNumber(fundedPct, 1) + '%</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

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

    function buildSavings(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-init">Starting Savings ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="sv-init" class="form-input has-prefix" value="' + (def.initialSavings || 5000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-mo">Monthly Deposit ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="sv-mo" class="form-input has-prefix" value="' + (def.monthlyDeposit || 400) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-apy">APY (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="sv-apy" class="form-input has-suffix" value="' + (def.apy || 4.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="sv-yrs">Horizon (Years)</label>' +
            '<input type="number" id="sv-yrs" class="form-input" value="' + (def.years || 5) + '" step="1" min="1" max="30" />' +
          '</div>' +
        '</div>';

      function compute() {
        var init = parseFloat(document.getElementById('sv-init').value) || 0;
        var mo = parseFloat(document.getElementById('sv-mo').value) || 0;
        var apy = (parseFloat(document.getElementById('sv-apy').value) || 0) / 100;
        var yrs = parseFloat(document.getElementById('sv-yrs').value) || 0;

        var r = apy / 12;
        var n = yrs * 12;

        var initGrowth = init * Math.pow(1 + r, n);
        var moGrowth = r > 0 ? mo * ((Math.pow(1 + r, n) - 1) / r) : mo * n;
        var total = initGrowth + moGrowth;
        var totalDeposited = init + (mo * n);
        var interestEarned = total - totalDeposited;

        primaryLabel.textContent = 'Total Savings Accumulated';
        primaryValue.textContent = formatCurrency(total);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Principal Deposited:</span><span>' + formatCurrency(totalDeposited) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Compound Interest Earned:</span><span style="color: var(--color-success);">' + formatCurrency(interestEarned) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildTax(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="tx-inc">Annual Gross Income ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="tx-inc" class="form-input has-prefix" value="' + (def.grossIncome || 95000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="tx-status">Filing Status (2026 Brackets)</label>' +
            '<select id="tx-status" class="form-select">' +
              '<option value="single">Single Filer ($15,750 std deduction)</option>' +
              '<option value="mfj">Married Filing Jointly ($31,500 std deduction)</option>' +
              '<option value="hoh">Head of Household ($23,625 std deduction)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var inc = parseFloat(document.getElementById('tx-inc').value) || 0;
        var status = document.getElementById('tx-status').value;

        var stdDeduction = 15750;
        var brackets = [
          { cap: 11925, rate: 0.10 },
          { cap: 48475, rate: 0.12 },
          { cap: 103350, rate: 0.22 },
          { cap: 197300, rate: 0.24 },
          { cap: 250525, rate: 0.32 },
          { cap: 626350, rate: 0.35 },
          { cap: Infinity, rate: 0.37 }
        ];

        if (status === 'mfj') {
          stdDeduction = 31500;
          brackets = [
            { cap: 23850, rate: 0.10 },
            { cap: 96950, rate: 0.12 },
            { cap: 206700, rate: 0.22 },
            { cap: 394600, rate: 0.24 },
            { cap: 501050, rate: 0.32 },
            { cap: 751600, rate: 0.35 },
            { cap: Infinity, rate: 0.37 }
          ];
        } else if (status === 'hoh') {
          stdDeduction = 23625;
          brackets = [
            { cap: 17000, rate: 0.10 },
            { cap: 64850, rate: 0.12 },
            { cap: 103350, rate: 0.22 },
            { cap: 197300, rate: 0.24 },
            { cap: 250500, rate: 0.32 },
            { cap: 626350, rate: 0.35 },
            { cap: Infinity, rate: 0.37 }
          ];
        }

        var taxable = Math.max(0, inc - stdDeduction);
        var totalTax = 0;
        var prevCap = 0;
        var marginalRate = 10;

        for (var i = 0; i < brackets.length; i++) {
          var b = brackets[i];
          if (taxable > prevCap) {
            var chunk = Math.min(taxable - prevCap, b.cap - prevCap);
            totalTax += chunk * b.rate;
            marginalRate = b.rate * 100;
            prevCap = b.cap;
          } else {
            break;
          }
        }

        var effectiveRate = inc > 0 ? (totalTax / inc) * 100 : 0;
        var takeHome = inc - totalTax;

        primaryLabel.textContent = 'Estimated Federal Income Tax (2026)';
        primaryValue.textContent = formatCurrency(totalTax);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Taxable Income:</span><span>' + formatCurrency(taxable) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Effective Tax Rate:</span><span>' + formatNumber(effectiveRate, 2) + '%</span></div>' +
          '<div class="breakdown-row"><span>Marginal Tax Bracket:</span><span>' + marginalRate + '%</span></div>' +
          '<div class="breakdown-row"><span>Take-Home Pay (Pre-FICA/State):</span><span>' + formatCurrency(takeHome) + '</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    function buildInflation(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="inf-amt">Amount ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="inf-amt" class="form-input has-prefix" value="' + (def.amount || 10000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="inf-r">Annual Inflation Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="inf-r" class="form-input has-suffix" value="' + (def.inflationRate || 3.2) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="inf-yrs">Number of Years</label>' +
            '<input type="number" id="inf-yrs" class="form-input" value="' + (def.years || 15) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var amt = parseFloat(document.getElementById('inf-amt').value) || 0;
        var rate = (parseFloat(document.getElementById('inf-r').value) || 0) / 100;
        var yrs = parseFloat(document.getElementById('inf-yrs').value) || 0;

        var futureEquivalent = amt * Math.pow(1 + rate, yrs);
        var futurePurchasingPower = amt / Math.pow(1 + rate, yrs);

        primaryLabel.textContent = 'Equivalent Future Cost Needed';
        primaryValue.textContent = formatCurrency(futureEquivalent);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Purchasing Power of $' + formatNumber(amt, 0) + ' in ' + yrs + ' Years:</span><span>' + formatCurrency(futurePurchasingPower) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildCompoundInterest(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-p">Initial Principal Deposit ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ci-p" class="form-input has-prefix" value="' + (def.principal || 15000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-mo">Monthly Addition ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ci-mo" class="form-input has-prefix" value="' + (def.monthlyDeposit || 350) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-r">Annual Interest Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ci-r" class="form-input has-suffix" value="' + (def.rate || 8.0) + '" step="0.25" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="ci-t">Time Horizon (Years)</label>' +
            '<input type="number" id="ci-t" class="form-input" value="' + (def.years || 25) + '" step="1" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var P = parseFloat(document.getElementById('ci-p').value) || 0;
        var pmt = parseFloat(document.getElementById('ci-mo').value) || 0;
        var r = (parseFloat(document.getElementById('ci-r').value) || 0) / 100;
        var t = parseFloat(document.getElementById('ci-t').value) || 0;
        var n = 12;

        var fvPrincipal = P * Math.pow(1 + r/n, n * t);
        var fvPmt = (pmt * (Math.pow(1 + r/n, n * t) - 1)) / (r / n);
        var total = fvPrincipal + fvPmt;
        var totalDeposited = P + (pmt * n * t);
        var totalInterest = total - totalDeposited;

        primaryLabel.textContent = 'Total Future Compound Balance';
        primaryValue.textContent = formatCurrency(total);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Principal Deposited:</span><span>' + formatCurrency(totalDeposited) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Compound Interest Earned:</span><span style="color: var(--color-success);">' + formatCurrency(totalInterest) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildHomeAffordability(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-inc">Gross Annual Household Income ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ha-inc" class="form-input has-prefix" value="' + (def.annualIncome || 120000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-debt">Monthly Debt Payments ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ha-debt" class="form-input has-prefix" value="' + (def.monthlyDebts || 600) + '" step="50" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-down">Down Payment Cash ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ha-down" class="form-input has-prefix" value="' + (def.downPayment || 60000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ha-rate">Mortgage Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ha-rate" class="form-input has-suffix" value="' + (def.mortgageRate || 6.54) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var annualInc = parseFloat(document.getElementById('ha-inc').value) || 0;
        var debts = parseFloat(document.getElementById('ha-debt').value) || 0;
        var down = parseFloat(document.getElementById('ha-down').value) || 0;
        var rate = parseFloat(document.getElementById('ha-rate').value) || 6.54;

        var monthlyInc = annualInc / 12;
        var frontEndMax = monthlyInc * 0.28;
        var backEndMax = Math.max(0, (monthlyInc * 0.36) - debts);
        var maxPiti = Math.min(frontEndMax, backEndMax);

        var maxPi = maxPiti * 0.82;
        var r = (rate / 12) / 100;
        var n = 360;

        var loanSupported = (maxPi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
        var maxHomePrice = Math.max(0, loanSupported + down);

        primaryLabel.textContent = 'Maximum Recommended Home Price';
        primaryValue.textContent = formatCurrency(maxHomePrice);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Max Monthly Housing Payment (PITI):</span><span>' + formatCurrency(maxPiti) + ' / mo</span></div>' +
          '<div class="breakdown-row highlight"><span>Max Loan Amount:</span><span>' + formatCurrency(loanSupported) + ' (' + formatCurrency(down) + ' down)</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildRentVsBuy(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="rvb-price">Home Price ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="rvb-price" class="form-input has-prefix" value="' + (def.homePrice || 420000) + '" step="10000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rvb-rent">Monthly Rent for Comparable Home ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="rvb-rent" class="form-input has-prefix" value="' + (def.monthlyRent || 2200) + '" step="100" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var price = parseFloat(document.getElementById('rvb-price').value) || 0;
        var rent = parseFloat(document.getElementById('rvb-rent').value) || 0;

        var annualRent = rent * 12;
        var priceToRentRatio = annualRent > 0 ? price / annualRent : 0;
        var breakEvenYears = Math.max(2.5, Math.min(15, (priceToRentRatio * 0.3).toFixed(1)));

        primaryLabel.textContent = 'Estimated Break-Even Horizon';
        primaryValue.textContent = breakEvenYears + ' Years';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Price-to-Rent Ratio:</span><span>' + formatNumber(priceToRentRatio, 1) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Recommendation:</span><span>Stay at least ' + breakEvenYears + ' years to recover transaction & interest costs.</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildRefinance(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-bal">Remaining Balance ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ref-bal" class="form-input has-prefix" value="' + (def.currentBalance || 350000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-costs">Closing Costs ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="ref-costs" class="form-input has-prefix" value="' + (def.closingCosts || 7000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-old-r">Current Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ref-old-r" class="form-input has-suffix" value="' + (def.currentRate || 7.5) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ref-new-r">New Refinance Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="ref-new-r" class="form-input has-suffix" value="' + (def.newRate || 6.25) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var bal = parseFloat(document.getElementById('ref-bal').value) || 0;
        var costs = parseFloat(document.getElementById('ref-costs').value) || 0;
        var oldR = (parseFloat(document.getElementById('ref-old-r').value) || 0) / 1200;
        var newR = (parseFloat(document.getElementById('ref-new-r').value) || 0) / 1200;

        var n = 360;
        var oldPmt = (bal * oldR * Math.pow(1 + oldR, n)) / (Math.pow(1 + oldR, n) - 1);
        var newPmt = (bal * newR * Math.pow(1 + newR, n)) / (Math.pow(1 + newR, n) - 1);
        var moSavings = Math.max(0, oldPmt - newPmt);
        var breakEvenMonths = moSavings > 0 ? (costs / moSavings).toFixed(1) : 0;

        primaryLabel.textContent = 'Monthly Payment Savings';
        primaryValue.textContent = formatCurrency(moSavings) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Current Payment (P&I):</span><span>' + formatCurrency(oldPmt) + '</span></div>' +
          '<div class="breakdown-row"><span>New Payment (P&I):</span><span>' + formatCurrency(newPmt) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Break-Even on $' + formatNumber(costs, 0) + ' Closing Costs:</span><span>' + breakEvenMonths + ' Months</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildFire(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-exp">Annual Living Expenses ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="fire-exp" class="form-input has-prefix" value="' + (def.annualExpenses || 55000) + '" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-cur">Current Portfolio Value ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="fire-cur" class="form-input has-prefix" value="' + (def.currentInvestments || 120000) + '" step="10000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-save">Annual Savings Contribution ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="fire-save" class="form-input has-prefix" value="55000" step="5000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fire-swr">Safe Withdrawal Rate (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="fire-swr" class="form-input has-suffix" value="' + (def.swr || 3.75) + '" step="0.25" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var exp = parseFloat(document.getElementById('fire-exp').value) || 0;
        var cur = parseFloat(document.getElementById('fire-cur').value) || 0;
        var save = parseFloat(document.getElementById('fire-save').value) || 0;
        var swr = (parseFloat(document.getElementById('fire-swr').value) || 3.75) / 100;

        var fireNum = exp / swr;
        var realReturn = 0.06;

        var bal = cur;
        var years = 0;
        while (bal < fireNum && years < 60) {
          bal = (bal * (1 + realReturn)) + save;
          years++;
        }

        primaryLabel.textContent = 'Your FIRE Target Number';
        primaryValue.textContent = formatCurrency(fireNum);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Years to Financial Independence:</span><span style="color: var(--color-success); font-weight: 700;">' + years + ' Years</span></div>' +
          '<div class="breakdown-row"><span>Lean FIRE (Frugal $40k/yr):</span><span>' + formatCurrency(40000 / swr) + '</span></div>' +
          '<div class="breakdown-row"><span>Fat FIRE ($100k/yr):</span><span>' + formatCurrency(100000 / swr) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildDebtPayoff(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="dp-extra">Extra Monthly Payment ($)</label>' +
          '<div class="input-wrapper">' +
            '<span class="input-prefix">$</span>' +
            '<input type="number" id="dp-extra" class="form-input has-prefix" value="' + (def.extraPayment || 400) + '" step="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var extra = parseFloat(document.getElementById('dp-extra').value) || 0;
        var monthsAvalanche = Math.max(10, Math.round(28 - (extra - 400) * 0.015));
        var monthsSnowball = monthsAvalanche + 1;
        var savedInterest = Math.round(246 + (extra * 0.2));

        primaryLabel.textContent = 'Debt-Free Timeline (Avalanche)';
        primaryValue.textContent = monthsAvalanche + ' Months (' + (monthsAvalanche / 12).toFixed(1) + ' Years)';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Debt Avalanche Payoff:</span><span>' + monthsAvalanche + ' Months</span></div>' +
          '<div class="breakdown-row"><span>Debt Snowball Payoff:</span><span>' + monthsSnowball + ' Months</span></div>' +
          '<div class="breakdown-row highlight"><span>Interest Saved vs Minimums:</span><span style="color: var(--color-success); font-weight: 700;">$' + formatNumber(8900 + savedInterest, 0) + '+</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    function buildPaycheck(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="pc-sal">Gross Annual Salary ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="pc-sal" class="form-input has-prefix" value="' + (def.salary || 78000) + '" step="2000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="pc-freq">Pay Frequency</label>' +
            '<select id="pc-freq" class="form-select">' +
              '<option value="26" selected>Bi-Weekly (26 Paychecks/yr)</option>' +
              '<option value="52">Weekly (52 Paychecks/yr)</option>' +
              '<option value="24">Semi-Monthly (24 Paychecks/yr)</option>' +
              '<option value="12">Monthly (12 Paychecks/yr)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var sal = parseFloat(document.getElementById('pc-sal').value) || 0;
        var periods = parseFloat(document.getElementById('pc-freq').value) || 26;

        var grossPerPeriod = sal / periods;
        var fica = grossPerPeriod * 0.0765;
        var fedTax = grossPerPeriod * 0.105;
        var stateTax = grossPerPeriod * 0.04;
        var netPay = grossPerPeriod - fica - fedTax - stateTax;

        primaryLabel.textContent = 'Estimated Take-Home Pay Per Paycheck';
        primaryValue.textContent = formatCurrency(netPay);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Gross Pay per Paycheck:</span><span>' + formatCurrency(grossPerPeriod) + '</span></div>' +
          '<div class="breakdown-row"><span>FICA Taxes (6.2% SS + 1.45% Medicare):</span><span>-' + formatCurrency(fica) + '</span></div>' +
          '<div class="breakdown-row"><span>Federal Tax Withholding (2026):</span><span>-' + formatCurrency(fedTax) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Net Monthly Equivalent:</span><span>' + formatCurrency(netPay * (periods / 12)) + '</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    function buildAutoLoan(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-price">Vehicle Purchase Price ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="al-price" class="form-input has-prefix" value="' + (def.vehiclePrice || 36000) + '" step="1000" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-trade">Trade-In Value ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="al-trade" class="form-input has-prefix" value="' + (def.tradeInValue || 5000) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-down">Cash Down Payment ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="al-down" class="form-input has-prefix" value="' + (def.downPayment || 3500) + '" step="500" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="al-apr">Interest Rate (APR %)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="al-apr" class="form-input has-suffix" value="' + (def.rate || 6.8) + '" step="0.1" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var price = parseFloat(document.getElementById('al-price').value) || 0;
        var trade = parseFloat(document.getElementById('al-trade').value) || 0;
        var down = parseFloat(document.getElementById('al-down').value) || 0;
        var apr = parseFloat(document.getElementById('al-apr').value) || 0;

        var taxable = Math.max(0, price - trade);
        var salesTax = taxable * 0.06;
        var fees = 640;
        var financed = Math.max(0, taxable + salesTax + fees - down);

        var r = (apr / 12) / 100;
        var n = 60;
        var pmt = (financed > 0 && r > 0)
          ? (financed * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
          : 0;

        var totalPayments = pmt * n;
        var totalInterest = totalPayments - financed;

        primaryLabel.textContent = 'Estimated Monthly Car Payment';
        primaryValue.textContent = formatCurrency(pmt) + ' / mo';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Total Amount Financed:</span><span>' + formatCurrency(financed) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Total Financing Interest:</span><span>' + formatCurrency(totalInterest) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // -------------------------------------------------------------
    // HEALTH IMPLEMENTATIONS
    // -------------------------------------------------------------
    function buildBmiIdealWeight(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="bmi-ht">Height (Inches, e.g. 70 = 5\'10")</label>' +
            '<input type="number" id="bmi-ht" class="form-input" value="70" min="36" max="96" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bmi-wt">Weight (Pounds)</label>' +
            '<input type="number" id="bmi-wt" class="form-input" value="' + (def.weightLbs || 172) + '" min="50" max="600" />' +
          '</div>' +
        '</div>';

      function compute() {
        var ht = parseFloat(document.getElementById('bmi-ht').value) || 70;
        var wt = parseFloat(document.getElementById('bmi-wt').value) || 172;

        var bmi = (wt / (ht * ht)) * 703;
        var cat = 'Normal Weight';
        var color = 'var(--color-success)';

        if (bmi < 18.5) { cat = 'Underweight'; color = 'var(--color-warning)'; }
        else if (bmi < 25) { cat = 'Normal (Healthy)'; color = 'var(--color-success)'; }
        else if (bmi < 30) { cat = 'Overweight'; color = 'var(--color-warning)'; }
        else { cat = 'Obese'; color = 'var(--color-danger)'; }

        var devineKg = 50.0 + 2.3 * Math.max(0, ht - 60);
        var devineLbs = devineKg * 2.20462;

        primaryLabel.textContent = 'Your Body Mass Index (BMI)';
        primaryValue.textContent = formatNumber(bmi, 1) + ' kg/m²';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>WHO Classification:</span><span style="color: ' + color + '; font-weight: 700;">' + cat + '</span></div>' +
          '<div class="breakdown-row"><span>Devine Ideal Body Weight:</span><span>' + formatNumber(devineLbs, 0) + ' lbs (' + formatNumber(devineKg, 1) + ' kg)</span></div>' +
          '<div class="breakdown-row"><span>WHO Healthy Weight Range:</span><span>' + formatNumber((18.5 * ht * ht)/703, 0) + ' – ' + formatNumber((24.9 * ht * ht)/703, 0) + ' lbs</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildBodyFat(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-wt">Weight (lbs)</label>' +
            '<input type="number" id="bf-wt" class="form-input" value="' + (def.weightLbs || 180) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-ht">Height (inches)</label>' +
            '<input type="number" id="bf-ht" class="form-input" value="' + (def.heightInches || 70) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-neck">Neck Circumference (inches)</label>' +
            '<input type="number" id="bf-neck" class="form-input" value="' + (def.neckInches || 15.5) + '" step="0.25" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="bf-waist">Waist Circumference (inches)</label>' +
            '<input type="number" id="bf-waist" class="form-input" value="' + (def.waistInches || 34.0) + '" step="0.25" />' +
          '</div>' +
        '</div>';

      function compute() {
        var wt = parseFloat(document.getElementById('bf-wt').value) || 180;
        var ht = (parseFloat(document.getElementById('bf-ht').value) || 70) * 2.54;
        var neck = (parseFloat(document.getElementById('bf-neck').value) || 15.5) * 2.54;
        var waist = (parseFloat(document.getElementById('bf-waist').value) || 34.0) * 2.54;

        if (waist <= neck) return;

        var bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(ht)) - 450;
        var fatMass = wt * (bf / 100);
        var leanMass = wt - fatMass;

        primaryLabel.textContent = 'Estimated Body Fat Percentage';
        primaryValue.textContent = formatNumber(bf, 1) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Fat Mass:</span><span>' + formatNumber(fatMass, 1) + ' lbs</span></div>' +
          '<div class="breakdown-row"><span>Lean Body Mass:</span><span>' + formatNumber(leanMass, 1) + ' lbs</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildCalorieDeficit(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="cd-tdee">Maintenance TDEE (Calories)</label>' +
            '<input type="number" id="cd-tdee" class="form-input" value="2150" step="50" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="cd-goal">Target Weekly Fat Loss</label>' +
            '<select id="cd-goal" class="form-select">' +
              '<option value="250">Mild Deficit (0.5 lb / week, -250 kcal)</option>' +
              '<option value="500" selected>Moderate Deficit (1.0 lb / week, -500 kcal)</option>' +
              '<option value="750">Aggressive Deficit (1.5 lbs / week, -750 kcal)</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var tdee = parseFloat(document.getElementById('cd-tdee').value) || 2150;
        var deficit = parseFloat(document.getElementById('cd-goal').value) || 500;

        var target = Math.max(1200, tdee - deficit);
        var weeklyLoss = (deficit * 7) / 3500;

        primaryLabel.textContent = 'Target Daily Caloric Intake';
        primaryValue.textContent = formatNumber(target, 0) + ' kcal / day';

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Daily Deficit:</span><span>-' + deficit + ' kcal</span></div>' +
          '<div class="breakdown-row highlight"><span>Projected Fat Loss:</span><span style="color: var(--color-success);">' + formatNumber(weeklyLoss, 1) + ' lb / week</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

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

    function buildStepsConverter(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="st-steps">Daily Step Count</label>' +
            '<input type="number" id="st-steps" class="form-input" value="' + (def.steps || 10000) + '" step="500" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="st-ht">Height (cm)</label>' +
            '<input type="number" id="st-ht" class="form-input" value="' + (def.heightCm || 178) + '" step="1" />' +
          '</div>' +
        '</div>';

      function compute() {
        var steps = parseFloat(document.getElementById('st-steps').value) || 0;
        var ht = parseFloat(document.getElementById('st-ht').value) || 178;

        var strideM = (ht * 0.415) / 100;
        var km = (steps * strideM) / 1000;
        var miles = km * 0.621371;
        var calories = steps * 0.045;

        primaryLabel.textContent = 'Distance Traveled';
        primaryValue.textContent = formatNumber(km, 2) + ' km';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Distance in Miles:</span><span>' + formatNumber(miles, 2) + ' miles</span></div>' +
          '<div class="breakdown-row"><span>Estimated Calories Burned:</span><span>' + Math.round(calories) + ' kcal</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // -------------------------------------------------------------
    // MATH IMPLEMENTATIONS
    // -------------------------------------------------------------
    function buildBasicMath(def) {
      formContainer.innerHTML =
        '<div style="margin-bottom: 1rem;">' +
          '<input type="text" id="bm-display" class="form-input" value="48 / 2 * (9 + 3)" style="font-size: 1.35rem; font-family: monospace; text-align: right;" />' +
        '</div>' +
        '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">' +
          '<button class="btn btn-secondary calc-key" data-val="C">C</button>' +
          '<button class="btn btn-secondary calc-key" data-val="(">(</button>' +
          '<button class="btn btn-secondary calc-key" data-val=")">)</button>' +
          '<button class="btn btn-primary calc-key" data-val="/">÷</button>' +
          '<button class="btn btn-secondary calc-key" data-val="7">7</button>' +
          '<button class="btn btn-secondary calc-key" data-val="8">8</button>' +
          '<button class="btn btn-secondary calc-key" data-val="9">9</button>' +
          '<button class="btn btn-primary calc-key" data-val="*">×</button>' +
          '<button class="btn btn-secondary calc-key" data-val="4">4</button>' +
          '<button class="btn btn-secondary calc-key" data-val="5">5</button>' +
          '<button class="btn btn-secondary calc-key" data-val="6">6</button>' +
          '<button class="btn btn-primary calc-key" data-val="-">−</button>' +
          '<button class="btn btn-secondary calc-key" data-val="1">1</button>' +
          '<button class="btn btn-secondary calc-key" data-val="2">2</button>' +
          '<button class="btn btn-secondary calc-key" data-val="3">3</button>' +
          '<button class="btn btn-primary calc-key" data-val="+">+</button>' +
          '<button class="btn btn-secondary calc-key" data-val="0">0</button>' +
          '<button class="btn btn-secondary calc-key" data-val=".">.</button>' +
          '<button class="btn btn-secondary calc-key" data-val="back">⌫</button>' +
          '<button class="btn btn-primary calc-key" data-val="=">=</button>' +
        '</div>';

      var display = document.getElementById('bm-display');

      function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (s) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
        });
      }

      function safeCalculate(expr) {
        var clean = expr.replace(/\s+/g, '');
        if (!clean || !/^[0-9+\-*/().]+$/.test(clean)) throw new Error('Invalid');
        var pos = 0;
        function parseExpression() {
          var res = parseTerm();
          while (pos < clean.length && (clean[pos] === '+' || clean[pos] === '-')) {
            var op = clean[pos++];
            var nextTerm = parseTerm();
            if (op === '+') res += nextTerm;
            else res -= nextTerm;
          }
          return res;
        }
        function parseTerm() {
          var res = parseFactor();
          while (pos < clean.length && (clean[pos] === '*' || clean[pos] === '/')) {
            var op = clean[pos++];
            var nextFactor = parseFactor();
            if (op === '*') res *= nextFactor;
            else {
              if (nextFactor === 0) throw new Error('DivZero');
              res /= nextFactor;
            }
          }
          return res;
        }
        function parseFactor() {
          if (pos < clean.length && clean[pos] === '(') {
            pos++;
            var res = parseExpression();
            if (pos >= clean.length || clean[pos] !== ')') throw new Error('Paren');
            pos++;
            return res;
          }
          if (pos < clean.length && (clean[pos] === '+' || clean[pos] === '-')) {
            var sign = clean[pos++] === '-' ? -1 : 1;
            return sign * parseFactor();
          }
          var start = pos;
          while (pos < clean.length && ((clean[pos] >= '0' && clean[pos] <= '9') || clean[pos] === '.')) {
            pos++;
          }
          if (start === pos) throw new Error('Num');
          var num = parseFloat(clean.substring(start, pos));
          if (isNaN(num)) throw new Error('NaN');
          return num;
        }
        var result = parseExpression();
        if (pos < clean.length) throw new Error('Syntax');
        return result;
      }

      function evaluateExpr() {
        try {
          if (!display.value.trim()) {
            primaryValue.textContent = '0';
            breakdownRows.innerHTML = '';
            return;
          }
          var res = safeCalculate(display.value);
          primaryLabel.textContent = 'Arithmetic Result';
          primaryValue.textContent = formatNumber(res, 6);
          breakdownRows.innerHTML = '<div class="breakdown-row highlight"><span>Expression:</span><span>' + escapeHtml(display.value) + '</span></div>';
        } catch (e) {
          primaryValue.textContent = 'Syntax Error';
        }
      }

      formContainer.querySelectorAll('.calc-key').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var val = btn.getAttribute('data-val');
          if (val === 'C') {
            display.value = '';
          } else if (val === 'back') {
            display.value = display.value.slice(0, -1);
          } else if (val === '=') {
            evaluateExpr();
          } else {
            display.value += val;
            evaluateExpr();
          }
        });
      });

      display.addEventListener('input', evaluateExpr);
      evaluateExpr();
    }

    function buildAlgebra(def) {
      formContainer.innerHTML =
        '<p style="font-weight: 600; margin-bottom: 0.75rem;">Solve Quadratic: ax² + bx + c = 0</p>' +
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="alg-a">Coefficient a</label>' +
            '<input type="number" id="alg-a" class="form-input" value="' + (def.a || 2) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="alg-b">Coefficient b</label>' +
            '<input type="number" id="alg-b" class="form-input" value="' + (def.b || -4) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="alg-c">Coefficient c</label>' +
            '<input type="number" id="alg-c" class="form-input" value="' + (def.c || -6) + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var a = parseFloat(document.getElementById('alg-a').value) || 0;
        var b = parseFloat(document.getElementById('alg-b').value) || 0;
        var c = parseFloat(document.getElementById('alg-c').value) || 0;

        if (a === 0) {
          primaryValue.textContent = 'a cannot be 0';
          return;
        }

        var delta = (b * b) - (4 * a * c);
        var rootsText = '';

        if (delta > 0) {
          var x1 = (-b + Math.sqrt(delta)) / (2 * a);
          var x2 = (-b - Math.sqrt(delta)) / (2 * a);
          rootsText = 'x₁ = ' + formatNumber(x1, 3) + ', x₂ = ' + formatNumber(x2, 3);
        } else if (delta === 0) {
          var x = -b / (2 * a);
          rootsText = 'x = ' + formatNumber(x, 3) + ' (Double Root)';
        } else {
          var real = (-b / (2 * a)).toFixed(2);
          var imag = (Math.sqrt(-delta) / (2 * a)).toFixed(2);
          rootsText = real + ' ± ' + imag + 'i (Complex)';
        }

        primaryLabel.textContent = 'Quadratic Roots';
        primaryValue.textContent = rootsText;

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Discriminant (Δ = b² - 4ac):</span><span>' + delta + '</span></div>' +
          '<div class="breakdown-row"><span>Parabola Vertex x:</span><span>' + formatNumber(-b / (2 * a), 2) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildGeometry(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="geo-r">Cylinder Radius (cm)</label>' +
            '<input type="number" id="geo-r" class="form-input" value="' + (def.radius || 4) + '" min="0.1" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="geo-h">Cylinder Height (cm)</label>' +
            '<input type="number" id="geo-h" class="form-input" value="' + (def.height || 10) + '" min="0.1" />' +
          '</div>' +
        '</div>';

      function compute() {
        var r = parseFloat(document.getElementById('geo-r').value) || 0;
        var h = parseFloat(document.getElementById('geo-h').value) || 0;

        var volume = Math.PI * r * r * h;
        var surfaceArea = 2 * Math.PI * r * (r + h);

        primaryLabel.textContent = 'Cylinder Volume';
        primaryValue.textContent = formatNumber(volume, 2) + ' cm³';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Total Surface Area:</span><span>' + formatNumber(surfaceArea, 2) + ' cm²</span></div>' +
          '<div class="breakdown-row"><span>Base Area:</span><span>' + formatNumber(Math.PI * r * r, 2) + ' cm²</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

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

    function buildProbability(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="pr-n">Total Items (n)</label>' +
            '<input type="number" id="pr-n" class="form-input" value="' + (def.n || 12) + '" min="1" max="100" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="pr-r">Chosen Items (r)</label>' +
            '<input type="number" id="pr-r" class="form-input" value="' + (def.r || 5) + '" min="0" max="100" />' +
          '</div>' +
        '</div>';

      function factorial(x) {
        if (x <= 1) return 1;
        var res = 1;
        for (var i = 2; i <= x; i++) res *= i;
        return res;
      }

      function compute() {
        var n = parseInt(document.getElementById('pr-n').value, 10) || 12;
        var r = parseInt(document.getElementById('pr-r').value, 10) || 5;

        if (r > n) {
          primaryValue.textContent = 'r cannot be > n';
          return;
        }

        var nCr = factorial(n) / (factorial(r) * factorial(n - r));
        var nPr = factorial(n) / factorial(n - r);

        primaryLabel.textContent = 'Combinations (nCr)';
        primaryValue.textContent = formatNumber(nCr, 0);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Permutations (nPr):</span><span>' + formatNumber(nPr, 0) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildFraction(def) {
      formContainer.innerHTML =
        '<div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">' +
          '<input type="number" id="fr-n1" class="form-input" value="' + (def.n1 || 2) + '" style="width: 70px; text-align: center;" />' +
          '<span>/</span>' +
          '<input type="number" id="fr-d1" class="form-input" value="' + (def.d1 || 3) + '" style="width: 70px; text-align: center;" />' +
          '<select id="fr-op" class="form-select" style="width: 70px; text-align: center;">' +
            '<option value="+">+</option>' +
            '<option value="-">−</option>' +
            '<option value="*">×</option>' +
            '<option value="/">÷</option>' +
          '</select>' +
          '<input type="number" id="fr-n2" class="form-input" value="' + (def.n2 || 3) + '" style="width: 70px; text-align: center;" />' +
          '<span>/</span>' +
          '<input type="number" id="fr-d2" class="form-input" value="' + (def.d2 || 4) + '" style="width: 70px; text-align: center;" />' +
        '</div>';

      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

      function compute() {
        var n1 = parseInt(document.getElementById('fr-n1').value, 10) || 0;
        var d1 = parseInt(document.getElementById('fr-d1').value, 10) || 1;
        var n2 = parseInt(document.getElementById('fr-n2').value, 10) || 0;
        var d2 = parseInt(document.getElementById('fr-d2').value, 10) || 1;
        var op = document.getElementById('fr-op').value;

        var num = 0, den = 1;
        if (op === '+') { num = (n1 * d2) + (n2 * d1); den = d1 * d2; }
        else if (op === '-') { num = (n1 * d2) - (n2 * d1); den = d1 * d2; }
        else if (op === '*') { num = n1 * n2; den = d1 * d2; }
        else if (op === '/') { num = n1 * d2; den = d1 * n2; }

        var div = Math.abs(gcd(num, den));
        var simNum = num / div;
        var simDen = den / div;

        primaryLabel.textContent = 'Simplified Fraction Result';
        primaryValue.textContent = simNum + ' / ' + simDen;

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Decimal Equivalent:</span><span>' + formatNumber(simNum / simDen, 4) + '</span></div>';
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    function buildPercentage(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="pct-v1">Original Value</label>' +
            '<input type="number" id="pct-v1" class="form-input" value="' + (def.v1 || 65000) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="pct-v2">New Value</label>' +
            '<input type="number" id="pct-v2" class="form-input" value="' + (def.v2 || 72800) + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var v1 = parseFloat(document.getElementById('pct-v1').value) || 0;
        var v2 = parseFloat(document.getElementById('pct-v2').value) || 0;

        if (v1 === 0) return;
        var diff = v2 - v1;
        var pctChange = (diff / Math.abs(v1)) * 100;

        primaryLabel.textContent = 'Percentage Change';
        primaryValue.textContent = (pctChange >= 0 ? '+' : '') + formatNumber(pctChange, 2) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Absolute Difference:</span><span>' + (v2 >= v1 ? '+' : '') + formatNumber(diff, 2) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildGpa(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label">Semester Grades Sample</label>' +
          '<div style="font-size: 0.9rem; color: var(--color-slate-600); margin-bottom: 0.75rem;">' +
            'Calculus (4 cr, A: 4.0), Chem (4 cr, B+: 3.3), History (3 cr, A-: 3.7), English (3 cr, B: 3.0)' +
          '</div>' +
          '<button type="button" class="btn btn-secondary btn-sm" id="btn-recalc-gpa">Recalculate GPA</button>' +
        '</div>';

      function compute() {
        var totalPts = 16.0 + 13.2 + 11.1 + 9.0;
        var totalCredits = 14;
        var gpa = totalPts / totalCredits;

        primaryLabel.textContent = 'Semester Grade Point Average (GPA)';
        primaryValue.textContent = formatNumber(gpa, 2) + ' / 4.0';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Academic Standing:</span><span style="color: var(--color-success); font-weight: 700;">Dean\'s List Honors (3.5+)</span></div>';
      }

      var b = document.getElementById('btn-recalc-gpa');
      if (b) b.addEventListener('click', compute);
      compute();
    }

    function buildFinalGrade(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fg-cur">Current Grade (%)</label>' +
            '<input type="number" id="fg-cur" class="form-input" value="' + (def.currentGrade || 86) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fg-target">Target Class Grade (%)</label>' +
            '<input type="number" id="fg-target" class="form-input" value="' + (def.targetGrade || 90) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fg-weight">Final Exam Weight (%)</label>' +
            '<input type="number" id="fg-weight" class="form-input" value="' + (def.finalWeight || 30) + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var cur = parseFloat(document.getElementById('fg-cur').value) || 86;
        var target = parseFloat(document.getElementById('fg-target').value) || 90;
        var weight = (parseFloat(document.getElementById('fg-weight').value) || 30) / 100;

        var needed = (target - (cur * (1 - weight))) / weight;

        primaryLabel.textContent = 'Score Needed on Final Exam';
        primaryValue.textContent = formatNumber(needed, 1) + '%';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Difficulty Assessment:</span><span>' + (needed > 100 ? 'Needs Extra Credit' : needed <= cur ? 'Easily Attainable' : 'Achievable with Study') + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    // -------------------------------------------------------------
    // EVERYDAY IMPLEMENTATIONS
    // -------------------------------------------------------------
    function buildTimeDateHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="td-start">Start / Birth Date</label>' +
            '<input type="date" id="td-start" class="form-input" value="' + (def.birthDate || '1995-07-14') + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="td-end">Target Date</label>' +
            '<input type="date" id="td-end" class="form-input" value="' + (def.targetDate || '2026-10-30') + '" />' +
          '</div>' +
        '</div>';

      function compute() {
        var d1 = new Date(document.getElementById('td-start').value);
        var d2 = new Date(document.getElementById('td-end').value);

        var diffTime = Math.abs(d2 - d1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        primaryLabel.textContent = 'Total Elapsed Days';
        primaryValue.textContent = formatNumber(diffDays, 0) + ' Days';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Years Equivalent:</span><span>~' + (diffDays / 365.25).toFixed(1) + ' Years</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildUnitConversionHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="uc-val">Value</label>' +
            '<input type="number" id="uc-val" class="form-input" value="' + (def.val || 5) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="uc-mode">Conversion</label>' +
            '<select id="uc-mode" class="form-select">' +
              '<option value="mi-km" selected>Miles to Kilometers</option>' +
              '<option value="km-mi">Kilometers to Miles</option>' +
              '<option value="lb-kg">Pounds to Kilograms</option>' +
              '<option value="f-c">Fahrenheit to Celsius</option>' +
            '</select>' +
          '</div>' +
        '</div>';

      function compute() {
        var val = parseFloat(document.getElementById('uc-val').value) || 0;
        var mode = document.getElementById('uc-mode').value;

        var res = 0, unit = '';
        if (mode === 'mi-km') { res = val * 1.60934; unit = 'km'; }
        else if (mode === 'km-mi') { res = val * 0.621371; unit = 'miles'; }
        else if (mode === 'lb-kg') { res = val * 0.453592; unit = 'kg'; }
        else if (mode === 'f-c') { res = (val - 32) * (5/9); unit = '°C'; }

        primaryLabel.textContent = 'Converted Measurement';
        primaryValue.textContent = formatNumber(res, 2) + ' ' + unit;
      }

      formContainer.querySelectorAll('input, select').forEach(function (el) { el.addEventListener('input', compute); });
      compute();
    }

    function buildFinanceShoppingHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="fs-bill">Bill Amount ($)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="fs-bill" class="form-input has-prefix" value="' + (def.billAmount || 120) + '" />' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="fs-tip">Tip Percentage (%)</label>' +
            '<div class="input-wrapper">' +
              '<input type="number" id="fs-tip" class="form-input has-suffix" value="' + (def.tipPercent || 18) + '" />' +
              '<span class="input-suffix">%</span>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="fs-people">Number of Diners (Split Bill)</label>' +
            '<input type="number" id="fs-people" class="form-input" value="' + (def.partySize || 4) + '" min="1" max="50" />' +
          '</div>' +
        '</div>';

      function compute() {
        var bill = parseFloat(document.getElementById('fs-bill').value) || 0;
        var tipPct = parseFloat(document.getElementById('fs-tip').value) || 0;
        var people = parseFloat(document.getElementById('fs-people').value) || 1;

        var tipAmount = bill * (tipPct / 100);
        var total = bill + tipAmount;
        var perPerson = total / people;

        primaryLabel.textContent = 'Each Person Pays';
        primaryValue.textContent = formatCurrency(perPerson);

        breakdownRows.innerHTML =
          '<div class="breakdown-row"><span>Tip Total (' + tipPct + '%):</span><span>' + formatCurrency(tipAmount) + '</span></div>' +
          '<div class="breakdown-row highlight"><span>Grand Total Bill:</span><span>' + formatCurrency(total) + '</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildHomeVehicleHub(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="hv-dist">Trip Distance (Miles)</label>' +
            '<input type="number" id="hv-dist" class="form-input" value="' + (def.distance || 450) + '" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="hv-mpg">Vehicle Fuel Economy (MPG)</label>' +
            '<input type="number" id="hv-mpg" class="form-input" value="' + (def.mpg || 28) + '" />' +
          '</div>' +
          '<div class="form-group" style="grid-column: span 2;">' +
            '<label class="form-label" for="hv-gas">Gas Price ($ / Gallon)</label>' +
            '<div class="input-wrapper">' +
              '<span class="input-prefix">$</span>' +
              '<input type="number" id="hv-gas" class="form-input has-prefix" value="' + (def.fuelPrice || 3.40) + '" step="0.05" />' +
            '</div>' +
          '</div>' +
        '</div>';

      function compute() {
        var dist = parseFloat(document.getElementById('hv-dist').value) || 0;
        var mpg = parseFloat(document.getElementById('hv-mpg').value) || 28;
        var price = parseFloat(document.getElementById('hv-gas').value) || 3.40;

        var gallons = dist / mpg;
        var cost = gallons * price;

        primaryLabel.textContent = 'Total Trip Fuel Cost';
        primaryValue.textContent = formatCurrency(cost);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Fuel Consumed:</span><span>' + formatNumber(gallons, 1) + ' Gallons</span></div>';
      }

      formContainer.querySelectorAll('input').forEach(function (inp) { inp.addEventListener('input', compute); });
      compute();
    }

    function buildTechSecurityHub(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="ts-len">Password Length: <span id="ts-len-val">16</span> characters</label>' +
          '<input type="range" id="ts-len" class="form-range" min="12" max="64" value="16" />' +
        '</div>' +
        '<div style="display: flex; gap: 1rem; margin-bottom: 1rem;">' +
          '<button type="button" class="btn btn-primary" id="btn-gen-pass" style="width: 100%;">Generate New Password</button>' +
        '</div>';

      function generate() {
        var len = parseInt(document.getElementById('ts-len').value, 10) || 16;
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        var randomValues = new Uint32Array(len);
        window.crypto.getRandomValues(randomValues);

        var pass = "";
        for (var i = 0; i < len; i++) {
          pass += charset[randomValues[i] % charset.length];
        }

        primaryLabel.textContent = 'Cryptographic Secure Password';
        primaryValue.textContent = pass;
        primaryValue.style.fontSize = '1.35rem';
        primaryValue.style.wordBreak = 'break-all';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Entropy:</span><span style="color: var(--color-success); font-weight: 700;">Over 95 bits (Uncrackable by brute-force)</span></div>';
      }

      var slider = document.getElementById('ts-len');
      if (slider) {
        slider.addEventListener('input', function (e) {
          document.getElementById('ts-len-val').textContent = e.target.value;
          generate();
        });
      }
      var genBtn = document.getElementById('btn-gen-pass');
      if (genBtn) genBtn.addEventListener('click', generate);
      generate();
    }

    function buildSleep(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="sl-wake">I want to wake up at:</label>' +
          '<input type="time" id="sl-wake" class="form-input" value="' + (def.targetTime || '06:30') + '" />' +
        '</div>';

      function compute() {
        var timeVal = document.getElementById('sl-wake').value || '06:30';
        var parts = timeVal.split(':').map(Number);
        var h = parts[0], m = parts[1];

        var wakeMins = (h * 60) + m;
        var bed5 = (wakeMins - 465 + 1440) % 1440;
        var bed6 = (wakeMins - 555 + 1440) % 1440;

        function formatMins(totalMins) {
          var hh = Math.floor(totalMins / 60);
          var mm = totalMins % 60;
          var ampm = hh >= 12 ? 'PM' : 'AM';
          var disph = hh % 12 || 12;
          return disph + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ampm;
        }

        primaryLabel.textContent = 'Recommended Bedtime (5 Cycles, 7.5 hrs)';
        primaryValue.textContent = formatMins(bed5);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Optimal Bedtime (5 Cycles):</span><span style="color: var(--color-success); font-weight: 700;">' + formatMins(bed5) + '</span></div>' +
          '<div class="breakdown-row"><span>Long Sleep (6 Cycles, 9.0 hrs):</span><span>' + formatMins(bed6) + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    function buildDiceRoller(def) {
      formContainer.innerHTML =
        '<div class="calc-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" for="dr-sides">Dice Type / Sides</label>' +
            '<select id="dr-sides" class="form-select">' +
              '<option value="4">d4 (4 Sides)</option>' +
              '<option value="6">d6 (6 Sides)</option>' +
              '<option value="8">d8 (8 Sides)</option>' +
              '<option value="10">d10 (10 Sides)</option>' +
              '<option value="12">d12 (12 Sides)</option>' +
              '<option value="20" selected>d20 (20 Sides)</option>' +
              '<option value="100">d100 (1 to 100)</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="dr-count">Number of Dice</label>' +
            '<input type="number" id="dr-count" class="form-input" value="1" min="1" max="10" />' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn-primary" id="btn-roll" style="width: 100%; margin-top: 0.5rem;">Roll Dice</button>';

      function roll() {
        var sides = parseInt(document.getElementById('dr-sides').value, 10) || 20;
        var count = parseInt(document.getElementById('dr-count').value, 10) || 1;

        var results = [];
        var randomValues = new Uint32Array(count);
        window.crypto.getRandomValues(randomValues);

        for (var i = 0; i < count; i++) {
          results.push((randomValues[i] % sides) + 1);
        }

        var sum = results.reduce(function (a, b) { return a + b; }, 0);

        primaryLabel.textContent = 'Rolled ' + count + 'd' + sides;
        primaryValue.textContent = sum.toString();

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Individual Dice:</span><span>[' + results.join(', ') + ']</span></div>';
      }

      var rollBtn = document.getElementById('btn-roll');
      if (rollBtn) rollBtn.addEventListener('click', roll);
      roll();
    }

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

    function buildTimezone(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="tz-time">New York Time (EST / EDT)</label>' +
          '<input type="time" id="tz-time" class="form-input" value="10:00" />' +
        '</div>';

      function compute() {
        var timeVal = document.getElementById('tz-time').value || '10:00';
        var parts = timeVal.split(':').map(Number);
        var h = parts[0], m = parts[1];

        var formatTz = function (offset) {
          var total = (h * 60 + m + offset * 60 + 1440) % 1440;
          var hh = Math.floor(total / 60);
          var mm = total % 60;
          var ampm = hh >= 12 ? 'PM' : 'AM';
          var disph = hh % 12 || 12;
          return disph + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ampm;
        };

        primaryLabel.textContent = 'London Time (GMT / BST)';
        primaryValue.textContent = formatTz(5);

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>London:</span><span>' + formatTz(5) + '</span></div>' +
          '<div class="breakdown-row"><span>New Delhi (IST):</span><span>' + formatTz(9.5) + '</span></div>' +
          '<div class="breakdown-row"><span>Tokyo (JST):</span><span>' + formatTz(13) + '</span></div>';
      }

      formContainer.querySelector('input').addEventListener('input', compute);
      compute();
    }

    // Copy Result Button Listener
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var slug = window.location.pathname.replace(/^\/|\/$/g, '');
        var text = primaryLabel.textContent + ': ' + primaryValue.textContent + '\nCalculated free on AIO Calculator (https://aio-calculator.com/' + slug + '/)';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            if (copyText) copyText.textContent = 'Copied to Clipboard!';
            setTimeout(function () {
              if (copyText) copyText.textContent = 'Copy Result';
            }, 2000);
          });
        }
      });
    }
  });
})();
