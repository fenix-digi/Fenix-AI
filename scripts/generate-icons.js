import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create public/icon.svg
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <!-- Background squircle -->
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  
  <!-- Outer subtle tech ring -->
  <circle cx="256" cy="256" r="210" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.2" stroke-dasharray="16 12"/>
  <circle cx="256" cy="256" r="175" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.25"/>

  <!-- AI sparkle stars -->
  <path d="M120 130 Q120 160 90 160 Q120 160 120 190 Q120 160 150 160 Q120 160 120 130 Z" fill="#ffffff" opacity="0.9"/>
  <path d="M390 110 Q390 130 370 130 Q390 130 390 150 Q390 130 410 130 Q390 130 390 110 Z" fill="#fef08a" opacity="0.95"/>
  <path d="M400 370 Q400 390 380 390 Q400 390 400 410 Q400 390 420 390 Q400 390 400 370 Z" fill="#ffffff" opacity="0.8"/>

  <!-- Phone / Smart Device Outline -->
  <rect x="176" y="96" width="160" height="320" rx="28" fill="#0f172a" fill-opacity="0.25" stroke="#ffffff" stroke-width="6" stroke-opacity="0.4" filter="url(#shadow)"/>
  <circle cx="256" cy="392" r="8" fill="#ffffff" opacity="0.6"/>

  <!-- Central Devanagari character 'म' for Mitra / Maharashtra -->
  <text x="256" y="300" font-family="'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, sans-serif" font-size="190" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#shadow)">म</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

// Helper to write a valid uncompressed PNG file of width x height with RGB background
function createPng(width, height, isMaskable = false) {
  // Simple PNG encoder
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: 2 (RGB)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    // CRC calculation
    let c = ~0;
    const typeAndData = buf.subarray(4, 8 + len);
    for (let i = 0; i < typeAndData.length; i++) {
      c ^= typeAndData[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    buf.writeInt32BE(~c, 8 + len);
    return buf;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data: filter byte (0) + width * 3 bytes per scanline
  const scanlineLength = 1 + width * 3;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = isMaskable ? width * 0.38 : width * 0.46;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // Warm amber / orange gradient
        const t = (x + y) / (width + height);
        const r = Math.round(245 - t * 30);
        const g = Math.round(158 - t * 70);
        const b = Math.round(11 + t * 20);
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
      } else {
        if (isMaskable) {
          // Full bleed background for maskable icon
          rawData[pxOffset] = 234;
          rawData[pxOffset + 1] = 88;
          rawData[pxOffset + 2] = 12;
        } else {
          // Dark sleek theme background
          rawData[pxOffset] = 15;
          rawData[pxOffset + 1] = 23;
          rawData[pxOffset + 2] = 42;
        }
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate PNGs
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));

console.log('PWA icons created successfully in /public');
