import fs from 'fs';
import path from 'path';

function copyDir(src, dest, ignore = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    if (ignore.includes(item)) continue;
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath, ignore);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const ignoreList = ['node_modules', '.git', '_astro_source_archive', 'dist', 'scripts'];
console.log('Syncing root files to dist/...');
copyDir('.', 'dist', ignoreList);
console.log('Successfully synchronized root to dist/.');
