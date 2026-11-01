import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '_astro_source_archive', 'dist'].includes(f)) continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (f.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const currencySelectorHtml = '<div class="header-currency-wrapper"><svg class="currency-globe-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><select id="global-currency-select" class="header-currency-select" aria-label="Select Currency"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="INR">INR (₹)</option><option value="PKR">PKR (Rs)</option><option value="AED">AED (AED)</option><option value="SAR">SAR (SAR)</option><option value="CAD">CAD (C$)</option><option value="AUD">AUD (A$)</option><option value="JPY">JPY (¥)</option><option value="CNY">CNY (¥)</option><option value="CHF">CHF (CHF)</option><option value="BRL">BRL (R$)</option><option value="TRY">TRY (₺)</option><option value="ZAR">ZAR (R)</option><option value="SGD">SGD (S$)</option><option value="NZD">NZD (NZ$)</option><option value="MYR">MYR (RM)</option><option value="PHP">PHP (₱)</option><option value="BDT">BDT (৳)</option><option value="NGN">NGN (₦)</option></select></div>';

const currencyScriptTag = '<script src="/assets/js/currency.js" defer></script>';

const files = getAllHtmlFiles('.');
let updatedHeaders = 0;
let updatedScripts = 0;

for (const file of files) {
  let slug = path.dirname(file).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === 'free-online-dice-roller') continue; // redirect page

  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Inject Header Currency Selector if not already present
  if (!html.includes('header-currency-wrapper') && html.includes('<div class="header-actions">')) {
    html = html.replace('<div class="header-actions">', `<div class="header-actions">${currencySelectorHtml}`);
    changed = true;
    updatedHeaders++;
  }

  // 2. Inject script tag for currency.js before calculators or main.js
  if (!html.includes('/assets/js/currency.js')) {
    if (html.includes('<script src="/assets/js/calculators/')) {
      html = html.replace(/(<script src="\/assets\/js\/calculators\/[^"]+" defer><\/script>)/, `${currencyScriptTag}$1`);
      changed = true;
      updatedScripts++;
    } else if (html.includes('<script src="/assets/js/main.js" defer></script>')) {
      html = html.replace('<script src="/assets/js/main.js" defer></script>', `${currencyScriptTag}<script src="/assets/js/main.js" defer></script>`);
      changed = true;
      updatedScripts++;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html);
  }
}

console.log(`Injected currency selector into ${updatedHeaders} headers.`);
console.log(`Injected currency.js script tag into ${updatedScripts} pages.`);
