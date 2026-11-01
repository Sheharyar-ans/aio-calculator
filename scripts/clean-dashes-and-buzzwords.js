import fs from 'fs';
import path from 'path';

const bannedWordReplacements = [
  // Multi-word phrases first
  { regex: /\bin today's fast-paced world\b/gi, replacement: "in contemporary financial management" },
  { regex: /\bin today's digital landscape\b/gi, replacement: "in modern computing environments" },
  { regex: /\btestament to\b/gi, replacement: "clear evidence of" },
  { regex: /\ba beacon of\b/gi, replacement: "a model of" },
  { regex: /\bgame-changer\b/gi, replacement: "major breakthrough" },
  
  // Single words
  { regex: /\bdelving into\b/gi, replacement: "examining" },
  { regex: /\bdelve into\b/gi, replacement: "examine" },
  { regex: /\bdelve\b/gi, replacement: "examine" },
  { regex: /\bdelving\b/gi, replacement: "examining" },
  { regex: /\btapestry\b/gi, replacement: "framework" },
  { regex: /\bfurthermore\b/gi, replacement: "in addition" },
  { regex: /\bpivotal\b/gi, replacement: "central" },
  { regex: /\bvital\b/gi, replacement: "essential" },
  { regex: /\bcrucial\b/gi, replacement: "fundamental" },
  { regex: /\brobust\b/gi, replacement: "reliable" },
  { regex: /\bseamlessly\b/gi, replacement: "directly" },
  { regex: /\bseamless\b/gi, replacement: "smooth" },
  { regex: /\bplethora of\b/gi, replacement: "wide range of" },
  { regex: /\bplethora\b/gi, replacement: "broad selection" },
  { regex: /\bmyriad of\b/gi, replacement: "multitude of" },
  { regex: /\bmyriad\b/gi, replacement: "numerous" },
  { regex: /\bfostering\b/gi, replacement: "encouraging" },
  { regex: /\bfoster\b/gi, replacement: "support" },
  { regex: /\bholistic\b/gi, replacement: "comprehensive" },
  { regex: /\bleveraging\b/gi, replacement: "applying" },
  { regex: /\bleverage\b/gi, replacement: "apply" },
  { regex: /\bempowering\b/gi, replacement: "guiding" },
  { regex: /\bempower\b/gi, replacement: "guide" }
];

const cssVarMap = [
  { from: /var\(--color-primary-light\)/g, to: '#eff6ff' },
  { from: /var\(--color-primary-hover\)/g, to: '#1d4ed8' },
  { from: /var\(--color-primary\)/g, to: '#2563eb' },
  { from: /var\(--color-slate-900\)/g, to: '#0f172a' },
  { from: /var\(--color-slate-800\)/g, to: '#1e293b' },
  { from: /var\(--color-slate-700\)/g, to: '#334155' },
  { from: /var\(--color-slate-600\)/g, to: '#475569' },
  { from: /var\(--color-slate-500\)/g, to: '#64748b' },
  { from: /var\(--color-slate-400\)/g, to: '#94a3b8' },
  { from: /var\(--color-slate-300\)/g, to: '#cbd5e1' },
  { from: /var\(--color-slate-200\)/g, to: '#e2e8f0' },
  { from: /var\(--color-slate-100\)/g, to: '#f1f5f9' },
  { from: /var\(--color-slate-50\)/g, to: '#f8fafc' },
  { from: /var\(--radius-sm\)/g, to: '4px' },
  { from: /var\(--radius-md\)/g, to: '8px' },
  { from: /var\(--radius-lg\)/g, to: '12px' },
  { from: /var\(--shadow-sm\)/g, to: '0 1px 2px 0 rgba(0,0,0,0.05)' },
  { from: /var\(--shadow-md\)/g, to: '0 4px 6px -1px rgba(0,0,0,0.1)' }
];

function cleanContent(html) {
  let res = html;

  // 1. Replace CSS variables in inline styles
  for (const item of cssVarMap) {
    res = res.replace(item.from, item.to);
  }

  // 2. Replace em-dashes and en-dashes
  // In visible text and titles
  res = res.replace(/&mdash;/g, ': ');
  res = res.replace(/&ndash;/g, ' - ');
  res = res.replace(/\s*[—–]\s*/g, ': ');
  res = res.replace(/([a-zA-Z0-9])[—–]([a-zA-Z0-9])/g, '$1: $2');
  res = res.replace(/[—–]/g, ': ');

  // 3. Replace any double hyphen in text (outside HTML comments)
  // Let's protect HTML comments first
  const comments = [];
  res = res.replace(/<!--[\s\S]*?-->/g, (match) => {
    comments.push(match);
    return `___HTML_COMMENT_${comments.length - 1}___`;
  });

  // Replace any remaining `--` outside comments
  res = res.replace(/--/g, ' - ');

  // 4. Banned words
  for (const item of bannedWordReplacements) {
    res = res.replace(item.regex, (m) => {
      // Preserve first letter uppercase if original was uppercase
      if (m[0] === m[0].toUpperCase()) {
        return item.replacement.charAt(0).toUpperCase() + item.replacement.slice(1);
      }
      return item.replacement;
    });
  }

  // 5. Remove any markdown backticks in text
  res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
  res = res.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Restore HTML comments
  res = res.replace(/___HTML_COMMENT_(\d+)___/g, (match, idx) => comments[Number(idx)]);

  return res;
}

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
console.log(`Processing ${files.length} HTML files...`);

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const cleaned = cleanContent(content);
  if (content !== cleaned) {
    fs.writeFileSync(f, cleaned);
  }
}

console.log('Finished initial cleanup of dashes and buzzwords.');
