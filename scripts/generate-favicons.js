import fs from 'fs';
import zlib from 'zlib';

// Pure Node.js PNG encoder
function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crc = crc32(typeAndData);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([lenBuf, typeAndData, crcBuf]);
}

function createPng(width, height, renderPixel) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = renderPixel(x, y, width, height);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const idatData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

// Brand Logo rendering function
function brandPixel(x, y, width, height) {
  // Normalized 0..1 coordinates
  const nx = x / width;
  const ny = y / height;

  // Squircle background corner radius test
  const r = 0.22;
  const dx = Math.max(0, Math.abs(nx - 0.5) - (0.5 - r));
  const dy = Math.max(0, Math.abs(ny - 0.5) - (0.5 - r));
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > r) {
    return [0, 0, 0, 0]; // Transparent outside squircle
  }

  // Background Gradient (#2563eb to #1d4ed8)
  const grad = ny;
  const bgR = Math.round(37 + (29 - 37) * grad);
  const bgG = Math.round(99 + (78 - 99) * grad);
  const bgB = Math.round(235 + (216 - 235) * grad);

  // Calculator outer frame: x in [0.22, 0.78], y in [0.18, 0.82]
  const fxMin = 0.22, fxMax = 0.78;
  const fyMin = 0.18, fyMax = 0.82;
  const strokeW = 0.055;

  // Frame boundary with rounded corners
  const fRad = 0.08;
  const fdx = Math.max(0, Math.abs(nx - 0.5) - ((fxMax - fxMin) / 2 - fRad));
  const fdy = Math.max(0, Math.abs(ny - 0.5) - ((fyMax - fyMin) / 2 - fRad));
  const fDist = Math.sqrt(fdx * fdx + fdy * fdy);

  const inOuter = (fDist <= fRad) && (nx >= fxMin - 0.02 && nx <= fxMax + 0.02 && ny >= fyMin - 0.02 && ny <= fyMax + 0.02);
  const inInner = (fDist <= fRad - strokeW) && (nx >= fxMin + strokeW && nx <= fxMax - strokeW && ny >= fyMin + strokeW && ny <= fyMax - strokeW);

  // Frame line
  if (inOuter && !inInner) {
    return [255, 255, 255, 255];
  }

  // Inside calculator body
  // 1. Display Screen Bar: y in [0.30, 0.35], x in [0.32, 0.68]
  if (ny >= 0.29 && ny <= 0.35 && nx >= 0.32 && nx <= 0.68) {
    return [255, 255, 255, 255];
  }

  // 2. Buttons Grid
  const btnRows = [0.47, 0.59, 0.71];
  const btnCols = [0.35, 0.50, 0.65];
  const btnR = 0.038;

  for (let rIdx = 0; rIdx < btnRows.length; rIdx++) {
    for (let cIdx = 0; cIdx < btnCols.length; cIdx++) {
      // Equals button in bottom-right row spans two rows or standard
      if (cIdx === 2 && rIdx === 1) {
        // Tall bar
        if (nx >= 0.61 && nx <= 0.69 && ny >= 0.56 && ny <= 0.74) {
          return [96, 165, 250, 255]; // Light blue accent button (=)
        }
      } else if (cIdx === 2 && rIdx === 2) {
        // Covered by tall bar
      } else {
        const cx = btnCols[cIdx];
        const cy = btnRows[rIdx];
        const bDist = Math.sqrt((nx - cx) * (nx - cx) + (ny - cy) * (ny - cy));
        if (bDist <= btnR) {
          return [255, 255, 255, 255];
        }
      }
    }
  }

  // Inside frame background: slight translucent deep blue
  if (inInner) {
    return [15, 23, 42, 230]; // Slate dark glass background
  }

  return [bgR, bgG, bgB, 255];
}

// Generate ICO container with 16x16, 32x32, 48x48
function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(images.length, 4); // count

  let offset = 6 + images.length * 16;
  const dirEntries = [];
  const imgBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry[0] = img.width >= 256 ? 0 : img.width;
    entry[1] = img.height >= 256 ? 0 : img.height;
    entry[2] = 0; // color palette
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.data.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset

    dirEntries.push(entry);
    imgBuffers.push(img.data);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imgBuffers]);
}

// Generate files
const png16 = createPng(16, 16, brandPixel);
const png32 = createPng(32, 32, brandPixel);
const png48 = createPng(48, 48, brandPixel);
const png180 = createPng(180, 180, brandPixel);
const png192 = createPng(192, 192, brandPixel);
const png512 = createPng(512, 512, brandPixel);
const ico = createIco([
  { width: 16, height: 16, data: png16 },
  { width: 32, height: 32, data: png32 },
  { width: 48, height: 48, data: png48 }
]);

const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#brandGrad)"/>
  <rect x="14" y="11" width="36" height="42" rx="6" fill="#0f172a" fill-opacity="0.85" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="20" y="17" width="24" height="6" rx="2" fill="#ffffff"/>
  <circle cx="23" cy="30" r="2.5" fill="#ffffff"/>
  <circle cx="32" cy="30" r="2.5" fill="#ffffff"/>
  <circle cx="41" cy="30" r="2.5" fill="#ffffff"/>
  <circle cx="23" cy="38" r="2.5" fill="#ffffff"/>
  <circle cx="32" cy="38" r="2.5" fill="#ffffff"/>
  <rect x="38.5" y="35.5" width="5" height="13" rx="2.5" fill="#60a5fa"/>
  <circle cx="23" cy="46" r="2.5" fill="#ffffff"/>
  <circle cx="32" cy="46" r="2.5" fill="#ffffff"/>
</svg>`;

const webmanifest = JSON.stringify({
  name: "AIO Calculator",
  short_name: "AIO Calc",
  icons: [
    { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png" }
  ],
  theme_color: "#2563eb",
  background_color: "#ffffff",
  display: "standalone",
  start_url: "/"
}, null, 2);

// Save to root, public/, and dist/
const targetDirs = ['.', 'public', 'dist', 'dist/public'];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/favicon.ico`, ico);
  fs.writeFileSync(`${dir}/favicon.svg`, svgFavicon);
  fs.writeFileSync(`${dir}/favicon-16x16.png`, png16);
  fs.writeFileSync(`${dir}/favicon-32x32.png`, png32);
  fs.writeFileSync(`${dir}/apple-touch-icon.png`, png180);
  fs.writeFileSync(`${dir}/favicon-192x192.png`, png192);
  fs.writeFileSync(`${dir}/favicon-512x512.png`, png512);
  fs.writeFileSync(`${dir}/logo.png`, png512);
  fs.writeFileSync(`${dir}/site.webmanifest`, webmanifest);
}

console.log('All favicon and brand assets generated successfully across directories.');
