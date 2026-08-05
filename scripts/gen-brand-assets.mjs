// Kare marka SVG'sinden (logo-square.svg) favicon/PWA rasterlerini üretir.
// Kaynak değiştiğinde: node scripts/gen-brand-assets.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const svg = readFileSync(new URL("../public/logo-square.svg", import.meta.url));

const targets = [
  { out: "src/app/apple-icon.png", size: 180 },
  { out: "public/icon-192.png", size: 192 },
  { out: "public/icon-512.png", size: 512 },
  { out: "public/logo.png", size: 512 },
];

for (const t of targets) {
  const dest = fileURLToPath(new URL(`../${t.out}`, import.meta.url));
  await sharp(svg, { density: 384 }).resize(t.size, t.size).png().toFile(dest);
  console.log(`✓ ${t.out} (${t.size}x${t.size})`);
}
