import fs from 'fs';

const c = fs.readFileSync('./assets/js/calculators.js', 'utf8');
const prefixes = [...c.matchAll(/<span class=["']input-prefix["']>([^<]+)<\/span>/g)];
const labels = [...c.matchAll(/<label[^>]*>([^<]*\(\$\)[^<]*)<\/label>/g)];
console.log('Total input-prefix spans in calculators.js:', prefixes.length);
console.log('Sample prefixes:', prefixes.map(p => p[1]));
console.log('Total ($) labels in calculators.js:', labels.length);
console.log('Sample labels:', labels.slice(0, 10).map(l => l[1].trim()));
