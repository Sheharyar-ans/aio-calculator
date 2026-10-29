import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aio-calculator.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://aio-calculator.com/free-online-dice-roller/'
    })
  ],
  redirects: {
    '/free-online-dice-roller/': '/free-online-dice-roller-1-to-100/'
  }
});
