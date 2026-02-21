#!/usr/bin/env node
/**
 * Generate PWA icon PNGs from scratch (no dependencies).
 * Run: node scripts/generate-icons.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, filepath) {
  function pixelColor(x, y, w, h) {
    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) / 2;
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > r) return [0, 0, 0, 0];

    let alpha = 255;
    if (dist > r - 1.5) alpha = Math.round(255 * Math.max(0, (r - dist) / 1.5));

    const t = (x + y) / (w + h);
    let rr = Math.round(255 * (1 - t) + 255 * t);
    let gg = Math.round(139 * (1 - t) + 107 * t);
    let bb = Math.round(85 * (1 - t) + 53 * t);

    const margin = w * 0.22;
    const top = h * 0.25;
    const bottom = h * 0.75;
    const letterW = w - 2 * margin;
    const stroke = letterW * 0.16;
    const lx = x - margin;
    const ly = y - top;
    const lh = bottom - top;

    let isM = false;
    if (y >= top && y <= bottom && x >= margin && x <= w - margin && lh > 0) {
      if (lx <= stroke) isM = true;
      else if (lx >= letterW - stroke) isM = true;
      else if (lx <= letterW / 2) {
        const diagX = (ly / lh) * (letterW / 2);
        if (Math.abs(lx - diagX) < stroke * 0.8) isM = true;
      } else {
        const diagX = letterW - (ly / lh) * (letterW / 2);
        if (Math.abs(lx - diagX) < stroke * 0.8) isM = true;
      }
    }

    if (isM) return [255, 255, 255, alpha];
    return [rr, gg, bb, alpha];
  }

  const raw = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter byte
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelColor(x, y, width, height);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
      raw[offset++] = a;
    }
  }

  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
      }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const typeData = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeData));
    return Buffer.concat([len, typeData, crc]);
  }

  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  const compressed = zlib.deflateSync(raw, { level: 9 });
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(filepath, Buffer.concat([sig, ihdr, idat, iend]));
  const size = fs.statSync(filepath).size;
  console.log(`Created ${filepath} (${size} bytes)`);
}

const base = path.join(__dirname, '..', 'public', 'icons');
createPNG(192, 192, path.join(base, 'icon-192.png'));
createPNG(512, 512, path.join(base, 'icon-512.png'));
console.log('Done!');
