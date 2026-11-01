import fs from 'fs';

const c = fs.readFileSync('./index.html', 'utf8');
const head = c.slice(c.indexOf('<head>'), c.indexOf('</head>') + 7);
console.log('Head slice:');
console.log(head.slice(0, 1000));
