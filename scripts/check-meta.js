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
const titleIssues = [];
const descIssues = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);

  if (titleMatch) {
    const title = titleMatch[1].trim();
    if (title.length < 50 || title.length > 60) {
      titleIssues.push({ file: f, len: title.length, title });
    }
  }

  if (descMatch) {
    const desc = descMatch[1].trim();
    if (desc.length < 140 || desc.length > 155) {
      descIssues.push({ file: f, len: desc.length, desc });
    }
  }
});

console.log(`Title issues (outside 50-60 chars): ${titleIssues.length}`);
titleIssues.slice(0, 10).forEach(t => console.log(`  [${t.file}] (${t.len}) "${t.title}"`));

console.log(`Description issues (outside 140-155 chars): ${descIssues.length}`);
descIssues.slice(0, 10).forEach(d => console.log(`  [${d.file}] (${d.len}) "${d.desc}"`));
