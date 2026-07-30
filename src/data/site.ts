/**
 * Merkezi site yapılandırması — TÜM sabit kurum bilgisi tek yerden.
 * Bileşenler ve JSON-LD şemaları buradan beslenir (tek kaynak).
 *
 * NOT: Bu site (konyahacamat.com.tr) SADECE EĞİTİM/AKADEMİ odaklıdır.
 * Hacamat hizmeti → konyahacamat.com · Sülük hizmeti/satışı → konyahacamat.net
 *
 * Marka adı bilinçli olarak "Ebusadullah Akademi" — kardeş sitelerle
 * SERP'te başlık benzerliği (kanibalizasyon) yaşamamak için.
 */

export const SITE = {
  name: "Ebusadullah Akademi",
  legalName: "Ebusadullah Hacamat & Akademi",
  shortName: "Ebusadullah Akademi",
  domain: "konyahacamat.com.tr",
  baseUrl: "https://www.konyahacamat.com.tr",

  // İletişim
  phoneTR: "+905544062383",
  phoneTRDisplay: "+90 554 406 23 83",
  phoneDE: "+491634492870",
  phoneDEDisplay: "+49 163 449 28 70",
  waTR: "905544062383",
  waDE: "491634492870",
  email: "info@konyahacamat.net",

  // Adres (NAP — üç sitede birebir aynı)
  address: {
    street: "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4",
    district: "Meram",
    city: "Konya",
    region: "Konya",
    postalCode: "42040",
    country: "TR",
  },
  hours: "Pzt–Cmt 09:00–18:00 · Pazar kapalı",

  // Kurum geçmişi
  founded: 1994,
  graduates: 1200,

  /**
   * Kardeş domainler (ekosistem çapraz link).
   * `live: false` olanlara LİNK VERİLMEZ — ölü/boş domaine link SEO'ya zarar verir.
   * konyahacamat.com şu an uykuda; canlanınca `live: true` yapılacak.
   */
  sisters: {
    suluk: { url: "https://www.konyahacamat.net", label: "Sülük Terapisi", live: true },
    hacamat: { url: "https://www.konyahacamat.com", label: "Hacamat Uygulama", live: false },
  },

  social: {
    instagram: "https://www.instagram.com/konya_hacamat",
    facebook: "https://www.facebook.com/konyahacamat.com.tr/",
  },

  developer: { name: "Tatar Yazılım", url: "https://tataryazilim.com" },
} as const;

/** WhatsApp derin bağlantısı — ön dolgulu mesajla. */
export function waLink(text: string, de = false): string {
  const num = de ? SITE.waDE : SITE.waTR;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

/** 1994'ten bugüne yıl (deneyim rozetleri için — her yıl otomatik artar). */
export function yearsExp(): number {
  return new Date().getFullYear() - SITE.founded;
}
