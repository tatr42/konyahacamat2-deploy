/**
 * İL BAZLI ROTASYON — programatik sayfalarda ortak metin oranını düşürür.
 *
 * Neden ayrı modül: hem içerik motoru (`city-course-content`) hem kardeş link
 * üreticisi (`data/ecosystem`) aynı tohumlama mantığını kullanmalı. İki yerde
 * ayrı ayrı yazılırsa tohumlar hizalanır ve rotasyonun anlamı kalmaz.
 */

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Rotasyon tohumu — il slug'ı + havuza özel "tuz" ile FNV-1a karması.
 *
 * NEDEN PLAKA KODU DEĞİL (ölçümle bulunan hata):
 *   İlk sürümde tohum doğrudan plaka koduydu. Havuz uzunlukları 12, 4, 3 ve
 *   20 olduğu için, plaka farkı 60 olan iller (60; bu sayıların ortak katı)
 *   TÜM havuzlarda aynı kaydırmaya düşüyordu. Sonuç: Bartın(74)↔Bolu(14),
 *   Bilecik(11)↔Kırıkkale(71), Denizli(20)↔Osmaniye(80) çiftleri neredeyse
 *   birebir aynı bloğu basıyor ve Jaccard %45-53'e çıkıyordu.
 *
 *   Karma bu hizalanmayı kırar; havuza özel tuz ise farklı havuzların
 *   birbiriyle hizalanmasını önler.
 */
export function seedFor(slug: string, salt: string): number {
  let h = 0x811c9dc5;
  const s = `${salt}:${slug}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Havuzdan `count` adet eleman seçer.
 *
 * `stride` havuz uzunluğuyla ARALARINDA ASAL olmalıdır; aksi hâlde aynı
 * sayfada tekrar eden madde çıkar. Bu teste bırakılmaz — uygunsuz bir çift
 * verilirse build sırasında hata atılır.
 */
export function rotate<T>(pool: T[], count: number, seed: number, stride: number): T[] {
  if (gcd(stride, pool.length) !== 1) {
    throw new Error(
      `rotate: stride ${stride} ile havuz uzunluğu ${pool.length} aralarında asal değil — ` +
        `aynı sayfada tekrar eden madde oluşur.`,
    );
  }
  const out: T[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) out.push(pool[(seed + i * stride) % pool.length]);
  return out;
}

/** Havuzdan tek eleman. */
export function pickOne<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}
