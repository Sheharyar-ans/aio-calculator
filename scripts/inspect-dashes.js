import fs from 'fs';

const sample = fs.readFileSync('mortgage-calculator/index.html', 'utf8');
const clean = sample.replace(/<!--[\s\S]*?-->/g, '');

const emDashes = clean.match(/—/g) || [];
const enDashes = clean.match(/–/g) || [];
const doubleHyphens = clean.match(/--/g) || [];

console.log('mortgage-calculator/index.html:');
console.log('  Em-dashes (—):', emDashes.length);
console.log('  En-dashes (–):', enDashes.length);
console.log('  Double hyphens (--):', doubleHyphens.length);

// Let's see some instances of double hyphens
const dhMatches = [...clean.matchAll(/([^\n]{0,30}--[^\n]{0,30})/g)].slice(0, 5);
console.log('Sample double-hyphens:', dhMatches.map(m => m[1]));

// Let's see some instances of em-dashes
const emMatches = [...clean.matchAll(/([^\n]{0,30}—[^\n]{0,30})/g)].slice(0, 5);
console.log('Sample em-dashes:', emMatches.map(m => m[1]));
