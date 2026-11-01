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
let totalSchemas = 0;
let jsonErrors = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  for (const m of matches) {
    totalSchemas++;
    try {
      JSON.parse(m[1].trim());
    } catch (e) {
      jsonErrors.push({ file, error: e.message });
    }
  }
}

console.log('Total JSON-LD blocks checked:', totalSchemas);
console.log('JSON parse errors count:', jsonErrors.length);
if (jsonErrors.length > 0) {
  console.log('Errors:', jsonErrors);
}
