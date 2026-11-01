import fs from 'fs';
import path from 'path';
import capsules from './capsule-definitions.js';

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
let appliedCount = 0;

for (const file of files) {
  let slug = path.dirname(file).replace(/\\/g, '/').replace(/^\.\//, '');
  if (slug === '.') slug = 'home';
  if (slug === 'free-online-dice-roller') continue;

  const capsuleText = capsules[slug];
  if (!capsuleText) continue;

  let html = fs.readFileSync(file, 'utf8');

  // Check if direct-answer-lead or direct-answer exists (as div or p)
  const regex = /(<(?:div|p)[^>]*class=["'][^"']*direct-answer(?:-lead)?[^"']*["'][^>]*>)([\s\S]*?)(<\/(?:div|p)>)/i;
  
  if (regex.test(html)) {
    html = html.replace(regex, (m, open, oldContent, close) => {
      // Check if original had <strong>Direct Answer:</strong>
      if (oldContent.includes('Direct Answer:')) {
        return `${open}<strong>Direct Answer:</strong> ${capsuleText}${close}`;
      }
      return `${open}${capsuleText}${close}`;
    });
  } else {
    // Insert directly beneath H1
    const h1Match = html.match(/(<h1[^>]*>[\s\S]*?<\/h1>)/i);
    if (h1Match) {
      const leadHtml = `\n<div class="direct-answer-lead" style="font-size: 1.15rem; line-height: 1.6; color: #1e293b; margin-bottom: 1.5rem; border-left: 3px solid #2563eb; padding-left: 1rem;">${capsuleText}</div>`;
      html = html.replace(h1Match[0], `${h1Match[0]}${leadHtml}`);
    }
  }

  fs.writeFileSync(file, html);
  appliedCount++;
}

console.log(`Applied calibrated direct answer capsules to ${appliedCount} pages.`);
