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

const all = getAllHtml('.');
let updated = 0;

for (const p of all) {
  let c = fs.readFileSync(p, 'utf8');
  let mod = false;

  if (c.includes('href="/favicon.svg"') && !c.includes('href="/favicon.ico"')) {
    c = c.replace(
      '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
      '<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">'
    );
    mod = true;
  }

  if (c.includes('href="/apple-touch-icon.png"') && !c.includes('rel="shortcut icon"')) {
    c = c.replace(
      '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
      '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="shortcut icon" href="/favicon.ico">'
    );
    mod = true;
  }

  if (mod) {
    fs.writeFileSync(p, c, 'utf8');
    updated++;
  }
}

console.log(`Updated favicon tags in ${updated} HTML files.`);
