import fs from 'fs';
import pageMeta from './meta-definitions.js';

console.log('Total pageMeta definitions:', Object.keys(pageMeta).length);
for (const [slug, m] of Object.entries(pageMeta)) {
  console.log(`${slug}:`);
  console.log(`  Title (${m.title.length}): ${m.title}`);
  console.log(`  Desc  (${m.desc.length}): ${m.desc}`);
}
