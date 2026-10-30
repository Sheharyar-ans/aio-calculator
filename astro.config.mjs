import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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

// https://astro.build/config
export default defineConfig({
  site: 'https://aio-calculator.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://aio-calculator.com/free-online-dice-roller/',
      serialize(item) {
        if (articleDates[item.url]) {
          item.lastmod = articleDates[item.url];
        }
        return item;
      }
    })
  ],
  redirects: {
    '/free-online-dice-roller/': '/free-online-dice-roller-1-to-100/'
  }
});
