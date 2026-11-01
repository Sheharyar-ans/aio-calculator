import fs from 'fs';
import path from 'path';

const dir = './assets/js/calculators';
const results = {};

for (const file of fs.readdirSync(dir)) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n');
  const hits = [];
  lines.forEach((line, idx) => {
    // Look for literal $ outside regex or comments
    if (line.includes('$') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
      hits.push({ line: idx + 1, text: line.trim() });
    }
  });
  if (hits.length > 0) {
    results[file] = hits;
  }
}

console.log('Calculators with literal $ count:', Object.keys(results).length);
for (const [file, hits] of Object.entries(results)) {
  console.log(`\n--- ${file} (${hits.length} hits) ---`);
  hits.slice(0, 5).forEach(h => console.log(`  L${h.line}: ${h.text}`));
}
