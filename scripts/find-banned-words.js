import fs from 'fs';
import path from 'path';

const bannedWords = [
  'delve', 'delving', 'tapestry', "in today's fast-paced world", "in today's digital landscape",
  'furthermore', 'testament to', 'a beacon of', 'pivotal', 'vital', 'crucial',
  'robust', 'seamless', 'seamlessly', 'plethora', 'myriad', 'game-changer',
  'foster', 'fostering', 'holistic', 'leverage', 'leveraging', 'empower', 'empowering'
];

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.git', '_astro_source_archive', 'dist'].includes(file)) continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = getAllHtmlFiles('.');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  for (const word of bannedWords) {
    const reg = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    const matches = [...content.matchAll(reg)];
    if (matches.length > 0) {
      console.log(`[${f}] found '${word}':`, matches.map(m => m.index));
      matches.forEach(m => {
        const snippet = content.substring(Math.max(0, m.index - 30), Math.min(content.length, m.index + 40)).replace(/\n/g, ' ');
        console.log(`   Snippet: "...${snippet}..."`);
      });
    }
  }
});
