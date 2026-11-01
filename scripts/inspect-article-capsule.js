import fs from 'fs';

const c = fs.readFileSync('./credit-card-payoff-plan/index.html', 'utf8');
const h1Idx = c.indexOf('<h1');
console.log(c.slice(h1Idx, h1Idx + 800));
