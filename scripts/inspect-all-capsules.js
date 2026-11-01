import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '_astro_source_archive', 'dist', '_scroll_world_ref'].includes(f)) continue;
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

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/class=["'][^"']*direct-answer[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>/i);
  let slug = path.dirname(file).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === '.') slug = 'home';
  if (m) {
    const raw = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const clean = raw.replace(/^Direct Answer:\s*/i, '');
    const words = clean.split(' ').filter(Boolean).length;
    capsules[slug] = { words, text: clean };
  } else {
    capsules[slug] = null;
  }
}

const withCapsule = Object.keys(capsules).filter(k => capsules[k] !== null);
const withoutCapsule = Object.keys(capsules).filter(k => capsules[k] === null);

console.log('Total pages with capsules:', withCapsule.length);
console.log('Total pages without capsules:', withoutCapsule.length);
console.log('Pages without capsules:', withoutCapsule);
