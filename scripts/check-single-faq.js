import fs from 'fs';

const c = fs.readFileSync('./gpa-final-grade-planning-guide/index.html', 'utf8');
const h3s = [...c.matchAll(/<h3[^>]*class=["'][^"']*faq-question[^"']*["'][^>]*>([\s\S]*?)<\/h3>/gi)];
console.log('On page questions:', h3s.map(m => m[1].replace(/<[^>]+>/g, '').trim()));
