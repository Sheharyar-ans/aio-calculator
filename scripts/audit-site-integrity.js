import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/`);

let brokenLinks = [];
let deadHashLinks = [];
let missingAssets = [];
let malformedSchemas = [];
let totalLinksChecked = 0;

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');

  // 1. Check all href attributes
  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  for (const href of hrefMatches) {
    totalLinksChecked++;
    if (href === '#' || href.startsWith('#')) {
      // Check if # is just a dead anchor
      if (href === '#') {
        deadHashLinks.push({ file: relPath, href });
      }
      continue;
    }

    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://')) {
      // If external domain, check if it's our canonical domain
      if (href.startsWith('https://aio-calculator.com/')) {
        const pathPart = href.replace('https://aio-calculator.com', '');
        checkInternalPath(relPath, pathPart);
      }
      continue;
    }

    if (href.startsWith('/')) {
      checkInternalPath(relPath, href);
    }
  }

  // 2. Check all script src attributes
  const scriptMatches = [...content.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  for (const src of scriptMatches) {
    if (src.startsWith('/')) {
      const assetDiskPath = path.join(distDir, src);
      if (!fs.existsSync(assetDiskPath)) {
        missingAssets.push({ file: relPath, asset: src, type: 'script' });
      }
    }
  }

  // 3. Check all link rel="stylesheet" attributes
  const cssMatches = [...content.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g)].map(m => m[1]);
  for (const href of cssMatches) {
    if (href.startsWith('/')) {
      const assetDiskPath = path.join(distDir, href);
      if (!fs.existsSync(assetDiskPath)) {
        missingAssets.push({ file: relPath, asset: href, type: 'stylesheet' });
      }
    }
  }

  // 4. Validate JSON-LD schemas
  const schemaMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
  for (const schemaRaw of schemaMatches) {
    try {
      JSON.parse(schemaRaw);
    } catch (e) {
      malformedSchemas.push({ file: relPath, error: e.message });
    }
  }
}

function checkInternalPath(file, internalPath) {
  const cleanPath = internalPath.split('?')[0].split('#')[0];
  let targetPath;
  if (cleanPath.endsWith('/')) {
    targetPath = path.join(distDir, cleanPath, 'index.html');
  } else if (path.extname(cleanPath)) {
    targetPath = path.join(distDir, cleanPath);
  } else {
    targetPath = path.join(distDir, cleanPath, 'index.html');
  }

  if (!fs.existsSync(targetPath)) {
    brokenLinks.push({ file, link: internalPath, expected: targetPath });
  }
}

console.log(`\n--- AUDIT RESULTS ---`);
console.log(`Total HTML pages inspected: ${htmlFiles.length}`);
console.log(`Total links audited: ${totalLinksChecked}`);
console.log(`Broken internal links: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  console.log('Broken links details:', brokenLinks);
}
console.log(`Dead '#' hash links: ${deadHashLinks.length}`);
if (deadHashLinks.length > 0) {
  console.log('Dead hash links details:', deadHashLinks.slice(0, 10));
}
console.log(`Missing assets: ${missingAssets.length}`);
if (missingAssets.length > 0) {
  console.log('Missing assets details:', missingAssets);
}
console.log(`Malformed JSON-LD schemas: ${malformedSchemas.length}`);
if (malformedSchemas.length > 0) {
  console.log('Malformed schemas details:', malformedSchemas);
}
