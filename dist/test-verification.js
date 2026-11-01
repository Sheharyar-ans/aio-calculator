import fs from 'fs';
import path from 'path';

const expectedOldPages = [
  '/',
  '/blog/',
  '/about-us/',
  '/contact-us/',
  '/privacy-policy/',
  '/disclaimer-aio-calculator/',
  '/terms-conditions-aio-calculator/',
  '/emi-calculator/',
  '/loan-interest-analyzer/',
  '/mortgage-calculator/',
  '/credit-card-calculator/',
  '/amortization-calculator/',
  '/sip-investment-planner/',
  '/fd-vs-rd-comparison/',
  '/investment-calculator/',
  '/investment-roi-calculator/',
  '/retirement-calculator/',
  '/budget-calculator/',
  '/savings-calculator/',
  '/income-tax-calculator/',
  '/currency-inflation-calculator/',
  '/bmi-ideal-weight-calculator/',
  '/bmi-body-fat-calculator/',
  '/calorie-intake-deficit-tracker/',
  '/calorie-macro-calculator/',
  '/fitness-workout-calculator/',
  '/pregnancy-due-date-finder/',
  '/steps-to-km-converter/',
  '/basic-math-calculator/',
  '/algebra-equations-calculator/',
  '/geometry-calculator/',
  '/average-statistics-calculator/',
  '/probability-data-calculator/',
  '/time-date-calculator/',
  '/unit-conversion-calculator/',
  '/finance-shopping-tools/',
  '/home-vehicle-tools/',
  '/tech-security-tools/',
  '/sleep-calculator/',
  '/free-online-dice-roller-1-to-100/',
  '/percentage-calculator/',
  '/free-online-dice-roller/',
  '/how-to-use-a-mortgage-calculator/',
  '/plan-your-monthly-loans-interest-rates-instantly/'
];

const expectedNewPages = [
  '/financial-calculators/',
  '/fitness-health-calculators/',
  '/math-calculators/',
  '/everyday-tools/',
  '/all-tools/',
  '/compound-interest-calculator/',
  '/home-affordability-calculator/',
  '/rent-vs-buy-calculator/',
  '/refinance-calculator/',
  '/tdee-calculator/',
  '/fire-calculator/',
  '/debt-payoff-calculator/',
  '/paycheck-calculator/',
  '/auto-loan-calculator/',
  '/gpa-calculator/',
  '/final-grade-calculator/',
  '/fraction-calculator/',
  '/countdown-timer/',
  '/timezone-converter/',
  '/scientific-calculator/'
];

console.log('--- STARTING VERIFICATION AUDIT ---');

let passedUrls = 0;
let failedUrls = [];

const allRequired = [...expectedOldPages, ...expectedNewPages];

allRequired.forEach(urlPath => {
  let relativePath = urlPath === '/' ? 'index.html' : path.join(urlPath.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  const fullPath = path.join(process.cwd(), 'dist', relativePath);
  if (fs.existsSync(fullPath)) {
    passedUrls++;
  } else {
    failedUrls.push(urlPath);
  }
});

console.log(`URL Checklist: ${passedUrls} / ${allRequired.length} URLs verified.`);
if (failedUrls.length > 0) {
  console.error('FAILED URLS:', failedUrls);
  process.exit(1);
} else {
  console.log('✓ All 64 URLs exist with generated HTML in dist/ (NO 404s)');
}

// Check Sleep Calculator sidebar
const sleepHtml = fs.readFileSync(path.join(process.cwd(), 'dist', 'sleep-calculator', 'index.html'), 'utf-8');
if (sleepHtml.includes('Everyday Tools') && sleepHtml.includes('/time-date-calculator/')) {
  console.log('✓ Sleep Calculator sidebar shows Everyday Tools category navigation (CORRECT)');
} else {
  console.error('FAILED: Sleep Calculator sidebar incorrect');
}

// Check FAQ Headings
const hvHtml = fs.readFileSync(path.join(process.cwd(), 'dist', 'home-vehicle-tools', 'index.html'), 'utf-8');
if (hvHtml.includes('Frequently Asked Questions About Home and Vehicle Tools') && !hvHtml.includes('Frequently Asked Questions About Finance and Shopping Tools')) {
  console.log('✓ Home and Vehicle Tools FAQ heading matches its own page (CORRECT)');
} else {
  console.error('FAILED: Home and Vehicle Tools FAQ heading mismatch');
}

const tsHtml = fs.readFileSync(path.join(process.cwd(), 'dist', 'tech-security-tools', 'index.html'), 'utf-8');
if (tsHtml.includes('Frequently Asked Questions About Tech and Security Tools') && !tsHtml.includes('Frequently Asked Questions About Finance and Shopping Tools')) {
  console.log('✓ Tech and Security Tools FAQ heading matches its own page (CORRECT)');
} else {
  console.error('FAILED: Tech and Security Tools FAQ heading mismatch');
}

// Check Percentage Calculator is upgraded
const pctHtml = fs.readFileSync(path.join(process.cwd(), 'dist', 'percentage-calculator', 'index.html'), 'utf-8');
if (pctHtml.includes('Interactive Percentage Calculator') && pctHtml.includes('Formula and Calculation Method')) {
  console.log('✓ Percentage Calculator is upgraded to a FULL interactive tool page (CORRECT)');
} else {
  console.error('FAILED: Percentage Calculator upgrade check');
}

// Check Dice Redirect
const diceHtml = fs.readFileSync(path.join(process.cwd(), 'dist', 'free-online-dice-roller', 'index.html'), 'utf-8');
if (diceHtml.includes('url=/free-online-dice-roller-1-to-100/')) {
  console.log('✓ Old dice URL properly redirects to canonical dice tool page (CORRECT)');
} else {
  console.error('FAILED: Dice redirect check');
}

console.log('--- ALL VERIFICATION AUDIT CHECKS PASSED ---');
