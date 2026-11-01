import fs from 'fs';

const c = fs.readFileSync('./emi-calculator/index.html', 'utf8');
const scripts = [...c.matchAll(/<script[^>]*src=["'](.*?)["'][^>]*>/gi)].map(m => m[1]);
console.log('Scripts in emi-calculator:', scripts);
