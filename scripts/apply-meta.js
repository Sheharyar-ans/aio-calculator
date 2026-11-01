import fs from 'fs';
import path from 'path';
import pageMeta from './meta-definitions.js';

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

const files = getAllHtmlFiles('.');
let updatedCount = 0;

for (const file of files) {
  let slug = path.dirname(file).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === '.') slug = 'index';
  if (slug === 'free-online-dice-roller') continue; // redirect page

  const meta = pageMeta[slug];
  if (!meta) {
    console.warn('No meta definition for slug:', slug, file);
    continue;
  }

  let html = fs.readFileSync(file, 'utf8');

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace meta name="description"
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']>/i, `<meta name="description" content="${meta.desc}">`);

  // Replace og:title
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']>/i, `<meta property="og:title" content="${meta.title}">`);

  // Replace og:description
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']>/i, `<meta property="og:description" content="${meta.desc}">`);

  // Replace twitter:title
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']>/i, `<meta name="twitter:title" content="${meta.title}">`);

  // Replace twitter:description
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']>/i, `<meta name="twitter:description" content="${meta.desc}">`);

  fs.writeFileSync(file, html);
  updatedCount++;
}

console.log(`Updated metadata for ${updatedCount} HTML pages.`);
