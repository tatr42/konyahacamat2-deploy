/**
 * KOPYA İÇERİK ÖLÇÜMÜ — 5-gram shingle Jaccard.
 *
 * Kullanım:
 *   npm run build && npm run seo:dup
 *
 * NE ÖLÇER:
 *   1. Bu sitedeki il sayfalarının birbirine benzerliği (silo içi).
 *   2. Aynı ilin kardeş domaindeki (konyahacamat.net) karşılığıyla
 *      benzerliği — çapraz domain kopya riski. `.net` deposu yanınızda
 *      derlenmişse otomatik bulunur, yoksa bu bölüm atlanır.
 *
 * NEDEN <main> İÇİ:
 *   Navbar ve footer her sayfada aynıdır. Tüm HTML üzerinden ölçmek, gerçek
 *   içerik farkını gizleyip her siteyi olduğundan kötü gösterir. Google da
 *   şablon bloklarını (boilerplate) ayrıştırır; ölçüm buna yaklaşmalıdır.
 *
 * KRİTİK KAVRAM — Jaccard bir ORANDIR:
 *   Tekrarlanan metni SİLMEK oranı düşürmez, paydayı da küçültür. Oranı
 *   düşürmenin iki yolu vardır: benzersiz metin EKLEMEK veya ortak metni
 *   ÇEŞİTLENDİRMEK (havuzdan il bazlı seçim). Bu depoda ikisi de kullanılır.
 *
 * HEDEFLER (2026-08-03 itibarıyla tutturuldu):
 *   il-il medyan  < %25   → ölçülen %14,7
 *   il-il p95     < %30   → ölçülen %25,7
 *   çapraz domain < %10   → ölçülen %0,2
 */

import fs from "node:fs";
import path from "node:path";

const N = 5;
const SELF = ".next/server/app/hacamat-kursu";
const SIBLING = "../hacamat-site/.next/server/app/hacamat-kursu";

function mainOf(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : html;
}

function toText(html) {
  return mainOf(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a#0-9a-z]+;/gi, " ")
    .toLocaleLowerCase("tr")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(text) {
  const w = text.split(" ").filter(Boolean);
  const s = new Set();
  for (let i = 0; i + N <= w.length; i++) s.add(w.slice(i, i + N).join(" "));
  return s;
}

function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function load(dir) {
  const out = new Map();
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".html")) continue;
    const text = toText(fs.readFileSync(path.join(dir, f), "utf8"));
    out.set(f.replace(".html", ""), { sh: shingles(text), words: text.split(" ").length });
  }
  return out;
}

const pct = (x) => `%${(x * 100).toFixed(1)}`;

function summarize(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const q = (p) => s[Math.min(s.length - 1, Math.floor(s.length * p))];
  return { min: s[0], p25: q(0.25), medyan: q(0.5), p75: q(0.75), p95: q(0.95), max: s[s.length - 1] };
}

const self = load(SELF);
if (self.size === 0) {
  console.error(`Derlenmiş sayfa bulunamadı: ${SELF}\nÖnce "npm run build" çalıştırın.`);
  process.exit(1);
}

const words = [...self.values()].map((v) => v.words).sort((a, b) => a - b);
console.log(`İl sayfası: ${self.size} · <main> kelime medyanı: ${words[Math.floor(words.length / 2)]}\n`);

const keys = [...self.keys()];
const scores = [];
const pairs = [];
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const s = jaccard(self.get(keys[i]).sh, self.get(keys[j]).sh);
    scores.push(s);
    pairs.push([keys[i], keys[j], s]);
  }
}

console.log(`=== SİLO İÇİ: il ↔ il (${scores.length} çift) ===`);
for (const [k, v] of Object.entries(summarize(scores))) console.log(`  ${k.padEnd(7)} ${pct(v)}`);

console.log("\n  Eşik dağılımı:");
for (const t of [0.25, 0.3, 0.35, 0.4]) {
  const n = scores.filter((x) => x > t).length;
  console.log(`    >${pct(t)}: ${String(n).padStart(4)} çift (${pct(n / scores.length)})`);
}

pairs.sort((a, b) => b[2] - a[2]);
console.log("\n  En benzer 8 çift (elle iyileştirme adayları):");
for (const [a, b, s] of pairs.slice(0, 8)) console.log(`    ${pct(s).padStart(6)}  ${a} ↔ ${b}`);

const sibling = load(SIBLING);
if (sibling.size > 0) {
  const cross = keys.filter((k) => sibling.has(k)).map((k) => [k, jaccard(self.get(k).sh, sibling.get(k).sh)]);
  console.log(`\n=== ÇAPRAZ DOMAIN: com.tr ↔ .net, aynı il (${cross.length} il) ===`);
  for (const [k, v] of Object.entries(summarize(cross.map((c) => c[1])))) {
    console.log(`  ${k.padEnd(7)} ${pct(v)}`);
  }
  cross.sort((a, b) => b[1] - a[1]);
  console.log(`  En benzer: ${cross.slice(0, 5).map(([k, s]) => `${k} ${pct(s)}`).join(" · ")}`);
} else {
  console.log(`\n(Çapraz domain ölçümü atlandı — ${SIBLING} bulunamadı.`);
  console.log(` Kardeş depoda "npm run build" çalıştırılırsa bu bölüm de ölçülür.)`);
}

const worst = pairs[0][2];
if (worst > 0.5) {
  console.error(`\nUYARI: en kötü çift ${pct(worst)} — %50 üzeri, yayın öncesi düzeltilmeli.`);
  process.exit(1);
}
