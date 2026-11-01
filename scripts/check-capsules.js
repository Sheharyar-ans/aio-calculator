import fs from 'fs';
import path from 'path';

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
const report = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Look for direct-answer-lead or similar
  const match = content.match(/class=["'][^"']*direct-answer-lead[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>/i);
  if (match) {
    let text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    text = text.replace(/^Direct Answer:\s*/i, '');
    const words = text.split(' ').filter(Boolean);
    report.push({ file: f, wordCount: words.length, text });
  } else {
    report.push({ file: f, wordCount: 0, text: 'NO CAPSULE FOUND' });
  }
});

console.log('Total files checked:', report.length);
const invalid = report.filter(r => r.wordCount < 40 || r.wordCount > 48);
console.log('Capsules needing adjustment to 40-48 words (target ~45 words):', invalid.length);
invalid.slice(0, 15).forEach(r => {
  console.log(`[${r.file}] words: ${r.wordCount} -> "${r.text.substring(0, 70)}..."`);
});
