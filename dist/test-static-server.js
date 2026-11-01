import http from 'http';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath);

  // If directory or trailing slash, serve index.html
  if (reqPath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
  } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(8765, async () => {
  console.log('Testing static server on port 8765...');
  const testUrls = [
    '/',
    '/mortgage-calculator/',
    '/bmi-ideal-weight-calculator/',
    '/time-date-calculator/',
    '/free-online-dice-roller/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/js/calculators.js',
    '/assets/search-index.json',
    '/sitemap.xml',
    '/robots.txt',
    '/llms.txt'
  ];

  let allPassed = true;

  for (const url of testUrls) {
    try {
      const resp = await fetch(`http://127.0.0.1:8765${url}`);
      if (resp.status === 200) {
        console.log(`✓ 200 OK: ${url} (${resp.headers.get('content-type')})`);
      } else {
        console.error(`✗ FAIL: ${url} returned ${resp.status}`);
        allPassed = false;
      }
    } catch (err) {
      console.error(`✗ ERROR: ${url} - ${err.message}`);
      allPassed = false;
    }
  }

  server.close(() => {
    if (allPassed) {
      console.log('ALL STATIC SERVER CHECKS PASSED.');
      process.exit(0);
    } else {
      console.error('SOME STATIC SERVER CHECKS FAILED.');
      process.exit(1);
    }
  });
});
