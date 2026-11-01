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
console.log(`Auditing ${files.length} HTML files...`);

let emDashCount = 0;
let bannedWordFound = {};
let h1Issues = [];
let capsuleIssues = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, '');

  // 1. Em-dashes & en-dashes & double hyphens
  const emDashes = cleanContent.match(/[—–]|--/g);
  if (emDashes) {
    emDashCount += emDashes.length;
  }

  // 2. Banned AI Words
  for (const word of bannedWords) {
    const reg = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    const matches = cleanContent.match(reg);
    if (matches) {
      bannedWordFound[word] = (bannedWordFound[word] || 0) + matches.length;
    }
  }

  // 3. H1 count
  const h1Matches = [...cleanContent.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length !== 1) {
    h1Issues.push({ file, count: h1Matches.length });
  }

  // 4. Direct Answer Capsule word count
  const capsuleMatch = cleanContent.match(/class=["'][^"']*direct-answer[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>/i);
  if (capsuleMatch) {
    const text = capsuleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    // remove "Direct Answer:" prefix if present
    const cleanText = text.replace(/^Direct Answer:\s*/i, '');
    const words = cleanText.split(' ').filter(Boolean).length;
    if (words < 40 || words > 48) {
      capsuleIssues.push({ file, words });
    }
  }
}

console.log('--- AUDIT SUMMARY ---');
console.log(`Total em-dashes/en-dashes found: ${emDashCount}`);
console.log('Banned words found:', bannedWordFound);
console.log(`Pages with non-1 H1: ${h1Issues.length}`);
console.log(`Pages with capsule word count outside 40-48: ${capsuleIssues.length}`);
