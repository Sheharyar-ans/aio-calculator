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
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const h1s = [...c.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length !== 1) console.log(f, 'H1 count:', h1s.length);
});
