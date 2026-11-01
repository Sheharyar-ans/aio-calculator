import fs from 'fs';

const articleDates = {
  'https://aio-calculator.com/compound-interest-formula-explained/': '2026-10-31',
  'https://aio-calculator.com/how-much-house-can-you-afford/': '2026-11-04',
  'https://aio-calculator.com/rent-vs-buy-which-is-better/': '2026-11-10',
  'https://aio-calculator.com/debt-snowball-vs-avalanche/': '2026-11-13',
  'https://aio-calculator.com/tdee-macros-protein-guide/': '2026-11-18',
  'https://aio-calculator.com/how-to-calculate-emi-and-save-interest/': '2026-11-25',
  'https://aio-calculator.com/credit-card-payoff-plan/': '2026-11-29',
  'https://aio-calculator.com/retirement-savings-by-age-and-fire-number/': '2026-12-05',
  'https://aio-calculator.com/gpa-final-grade-planning-guide/': '2026-12-08',
  'https://aio-calculator.com/percentage-tricks-everyday-life/': '2026-12-13',
  'https://aio-calculator.com/how-to-use-a-mortgage-calculator/': '2026-10-28',
  'https://aio-calculator.com/plan-your-monthly-loans-interest-rates-instantly/': '2026-10-25'
};

const defaultDate = '2026-11-01';

const sitemap = fs.readFileSync('sitemap-0.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(url => {
  const date = articleDates[url] || defaultDate;
  xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync('sitemap-0.xml', xml, 'utf8');
fs.writeFileSync('dist/sitemap-0.xml', xml, 'utf8');
console.log(`Updated sitemap-0.xml with ${urls.length} URLs, all with valid <lastmod>`);
