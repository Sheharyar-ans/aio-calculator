// Mathematical Engine Accuracy Verification Suite

const tests = [
  {
    name: 'EMI Calculator',
    inputs: { P: 25000, rate: 8.0, years: 3 },
    calculate: ({ P, rate, years }) => {
      const r = (rate / 12) / 100;
      const n = years * 12;
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return emi.toFixed(2);
    },
    expected: '783.41'
  },
  {
    name: 'Mortgage Calculator (P&I)',
    inputs: { loan: 405000, rate: 6.54, years: 30 },
    calculate: ({ loan, rate, years }) => {
      const r = (rate / 12) / 100;
      const n = years * 12;
      const pi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return pi.toFixed(2);
    },
    expected: '2570.54'
  },
  {
    name: 'SIP Investment Planner',
    inputs: { pmt: 500, rate: 10.0, years: 15 },
    calculate: ({ pmt, rate, years }) => {
      const i = (rate / 12) / 100;
      const n = years * 12;
      const fv = pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      return Math.round(fv);
    },
    expected: 208962
  },
  {
    name: 'Fixed Deposit (FD) Compounding',
    inputs: { p: 12000, rate: 6.5, years: 2 },
    calculate: ({ p, rate, years }) => {
      const r = rate / 100;
      const maturity = p * Math.pow(1 + r / 4, 4 * years);
      return maturity.toFixed(2);
    },
    expected: '13651.67'
  },
  {
    name: 'Investment ROI (CAGR)',
    inputs: { cost: 60000, finalVal: 95000, years: 4 },
    calculate: ({ cost, finalVal, years }) => {
      const cagr = (Math.pow(finalVal / cost, 1 / years) - 1) * 100;
      return cagr.toFixed(2);
    },
    expected: '12.17'
  },
  {
    name: 'Compound Interest with Monthly Additions',
    inputs: { P: 15000, pmt: 350, rate: 8.0, years: 25 },
    calculate: ({ P, pmt, rate, years }) => {
      const r = (rate / 100) / 12;
      const n = years * 12;
      const fvP = P * Math.pow(1 + r, n);
      const fvPmt = pmt * ((Math.pow(1 + r, n) - 1) / r);
      return Math.round(fvP + fvPmt);
    },
    expected: 442962
  },
  {
    name: 'BMI (Metric)',
    inputs: { weightKg: 78.0, heightM: 1.778 },
    calculate: ({ weightKg, heightM }) => {
      const bmi = weightKg / (heightM * heightM);
      return bmi.toFixed(1);
    },
    expected: '24.7'
  },
  {
    name: 'TDEE (Mifflin-St Jeor Male Baseline)',
    inputs: { wt: 84, ht: 183, age: 32, act: 1.375 },
    calculate: ({ wt, ht, age, act }) => {
      const bmr = (10 * wt) + (6.25 * ht) - (5 * age) + 5;
      return Math.round(bmr * act);
    },
    expected: 2515
  },
  {
    name: 'Steps to Distance (km)',
    inputs: { steps: 10000, heightCm: 178 },
    calculate: ({ steps, heightCm }) => {
      const strideM = (heightCm * 0.415) / 100;
      const km = (steps * strideM) / 1000;
      return km.toFixed(2);
    },
    expected: '7.39'
  },
  {
    name: 'Quadratic Discriminant & Positive Root',
    inputs: { a: 2, b: -4, c: -6 },
    calculate: ({ a, b, c }) => {
      const delta = (b * b) - (4 * a * c);
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      return x1;
    },
    expected: 3
  },
  {
    name: 'Combinations (12C5)',
    inputs: { n: 12, r: 5 },
    calculate: ({ n, r }) => {
      const f = (x) => (x <= 1 ? 1 : x * f(x - 1));
      return f(n) / (f(r) * f(n - r));
    },
    expected: 792
  },
  {
    name: 'Percentage Increase',
    inputs: { v1: 65000, v2: 72800 },
    calculate: ({ v1, v2 }) => {
      const pct = ((v2 - v1) / v1) * 100;
      return pct.toFixed(1);
    },
    expected: '12.0'
  },
  {
    name: 'Final Grade Required Score',
    inputs: { cur: 86.0, target: 90.0, weight: 0.30 },
    calculate: ({ cur, target, weight }) => {
      const needed = (target - (cur * (1 - weight))) / weight;
      return needed.toFixed(1);
    },
    expected: '99.3'
  },
  {
    name: 'Fuel Trip Cost',
    inputs: { dist: 450, mpg: 28, price: 3.40 },
    calculate: ({ dist, mpg, price }) => {
      const cost = (dist / mpg) * price;
      return cost.toFixed(2);
    },
    expected: '54.64'
  }
];

console.log('--- TESTING CALCULATION ENGINES WITH WORKED EXAMPLES ---');
let allPassed = true;

tests.forEach(t => {
  const result = t.calculate(t.inputs);
  const match = result == t.expected;
  if (!match) allPassed = false;
  console.log(`${match ? '✓ PASS' : '✗ FAIL'}: [${t.name}] Output: ${result} | Expected: ${t.expected}`);
});

if (allPassed) {
  console.log('\n✓ ALL WORKED EXAMPLE TEST CASES PRODUCED 100% IDENTICAL MATHEMATICAL OUTPUTS');
} else {
  console.error('\n✗ ONE OR MORE TEST CASES FAILED');
  process.exit(1);
}
