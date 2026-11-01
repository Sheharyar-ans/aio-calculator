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

const faviconBlock = `<!-- Favicons & App Icons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2563eb">
<meta name="application-name" content="AIO Calculator">
<meta name="apple-mobile-web-app-title" content="AIO Calculator">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`;

const ogImageBlock = `<meta property="og:image" content="https://aio-calculator.com/logo.png">
<meta property="og:image:width" content="512">
<meta property="og:image:height" content="512">
<meta property="og:image:type" content="image/png">`;

const twitterImageBlock = `<meta name="twitter:image" content="https://aio-calculator.com/logo.png">`;

const files = getAllHtmlFiles('.');
let updatedCount = 0;

for (const file of files) {
  let slug = path.dirname(file).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === 'free-online-dice-roller') continue; // 301 redirect page

  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Inject Favicon block if not present
  if (!html.includes('href="/favicon.svg"')) {
    // Insert right before </head> or after canonical
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n${faviconBlock}`);
      changed = true;
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', `${faviconBlock}\n</head>`);
      changed = true;
    }
  }

  // 2. Inject og:image into OpenGraph section
  if (!html.includes('og:image') && html.includes('<meta property="og:type"')) {
    html = html.replace(/(<meta property="og:type"[^>]*>)/, `$1\n${ogImageBlock}`);
    changed = true;
  }

  // 3. Inject twitter:image into Twitter section
  if (!html.includes('twitter:image') && html.includes('<meta name="twitter:description"')) {
    html = html.replace(/(<meta name="twitter:description"[^>]*>)/, `$1\n${twitterImageBlock}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    updatedCount++;
  }
}

console.log(`Injected favicons, og:image, and GEO/AEO meta tags into ${updatedCount} HTML pages.`);
