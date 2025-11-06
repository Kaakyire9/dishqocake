// Simple script to generate 1200x630 WebP Open Graph images from
// photographic product images in /public/products into /public/og
// Usage:
//   npm install sharp
//   node ./scripts/generate-og.js

const fs = require('fs');
const path = require('path');

async function main() {
  const sharp = require('sharp');
  const prodDir = path.join(__dirname, '..', 'public', 'products');
  const outDir = path.join(__dirname, '..', 'public', 'og');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(prodDir).filter((f) => /\.png$|\.jpg$|\.jpeg$/i.test(f));

  for (const file of files) {
    try {
      const src = path.join(prodDir, file);
      const name = path.parse(file).name;
      const out = path.join(outDir, `${name}.webp`);
      // Resize and crop to 1200x630 with center gravity to best frame cakes
      await sharp(src).resize(1200, 630, { fit: 'cover', position: 'centre' }).webp({ quality: 84 }).toFile(out);
      console.log('Written', out);
    } catch (err) {
      console.error('Failed to process', file, err.message || err);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
