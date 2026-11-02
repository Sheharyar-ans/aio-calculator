import fs from 'fs';
import path from 'path';

function getAllHtml(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '_astro_source_archive'].includes(f)) continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res = res.concat(getAllHtml(p));
    } else if (f.endsWith('.html')) {
      res.push(p);
    }
  }
  return res;
}

const footerCurrencyHtml = `<div class="footer-currency-wrapper"><svg class="currency-globe-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><select id="global-currency-select" class="footer-currency-select" aria-label="Select Currency"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="INR">INR (₹)</option><option value="PKR">PKR (Rs)</option><option value="AED">AED (AED)</option><option value="SAR">SAR (SAR)</option><option value="CAD">CAD (C$)</option><option value="AUD">AUD (A$)</option><option value="JPY">JPY (¥)</option><option value="CNY">CNY (¥)</option><option value="CHF">CHF (CHF)</option><option value="BRL">BRL (R$)</option><option value="TRY">TRY (₺)</option><option value="ZAR">ZAR (R)</option><option value="SGD">SGD (S$)</option><option value="NZD">NZD (NZ$)</option><option value="MYR">MYR (RM)</option><option value="PHP">PHP (₱)</option><option value="BDT">BDT (৳)</option><option value="NGN">NGN (₦)</option></select></div>`;

const allFiles = getAllHtml('.');
let modified = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Remove header-currency-wrapper from header
  if (content.includes('header-currency-wrapper')) {
    content = content.replace(/<div class="header-currency-wrapper">[\s\S]*?<\/div>\s*(?=<button id="search-trigger-btn")/i, '');
    changed = true;
  }

  // 2. Add footer-currency-wrapper into footer-bottom if not present
  if (content.includes('class="footer-bottom"') && !content.includes('footer-currency-wrapper')) {
    // Find footer-bottom and insert footerCurrencyHtml before its closing </div>
    // Match <div class="footer-bottom">...</div>
    content = content.replace(/(<div class="footer-bottom">[\s\S]*?)(<\/div>\s*<\/div>\s*<\/footer>)/i, (m, p1, p2) => {
      return p1 + '\n' + footerCurrencyHtml + p2;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modified++;
  }
}

console.log(`Updated ${modified} HTML files: moved currency dropdown to footer right bottom.`);
