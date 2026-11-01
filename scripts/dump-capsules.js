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

const files = getAllHtmlFiles('.');
const capsules = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/class=["'][^"']*direct-answer[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>/i);
  let slug = path.dirname(f).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === '.') slug = 'home';
  if (m) {
    const raw = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().replace(/^Direct Answer:\s*/i, '');
    capsules[slug] = { file: f, words: raw.split(' ').filter(Boolean).length, text: raw };
  }
}

fs.writeFileSync('./scripts/current-capsules.json', JSON.stringify(capsules, null, 2));
console.log('Saved capsules count:', Object.keys(capsules).length);
