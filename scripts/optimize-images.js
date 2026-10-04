const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const imageDir = path.join(root, 'assets', 'images');

async function optimizeImages() {
  if (!fs.existsSync(imageDir)) {
    console.log('Image directory not found:', imageDir);
    return;
  }

  const files = fs.readdirSync(imageDir)
    .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  for (const file of files) {
    const input = path.join(imageDir, file);
    const output = path.join(imageDir, `${path.parse(file).name}.webp`);

    if (file.toLowerCase().endsWith('.webp')) {
      continue;
    }

    await sharp(input)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(output);

    console.log(`Converted: ${file} -> ${path.basename(output)}`);
  }

  console.log('Image optimization complete.');
}

optimizeImages().catch((error) => {
  console.error('Error optimizing images:', error);
  process.exit(1);
});
