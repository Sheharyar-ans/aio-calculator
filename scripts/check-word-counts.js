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
const toolsNeedingWords = [];

for (const file of files) {
  let slug = path.dirname(file).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === '.') slug = 'home';
  // Skip utility/legal pages: about, contact, privacy, terms, disclaimer, redirect
  if (['about-us', 'contact-us', 'privacy-policy', 'terms-conditions-aio-calculator', 'disclaimer-aio-calculator', 'free-online-dice-roller'].includes(slug)) continue;

  const content = fs.readFileSync(file, 'utf8');
  const text = content.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  if (words < 1200) {
    toolsNeedingWords.push({ slug, file, words, needed: 1200 - words });
  }
}

console.log('Tools/Guides under 1200 words count:', toolsNeedingWords.length);
toolsNeedingWords.sort((a, b) => a.words - b.words).forEach(t => {
  console.log(`${t.slug}: ${t.words} words (needs +${t.needed})`);
});
