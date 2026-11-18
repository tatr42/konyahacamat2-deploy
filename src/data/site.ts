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
  waTR: "905544062383",
  email: "info@konyahacamat.net",

  // Adres (NAP — üç sitede birebir aynı) — işletme tarafından 2026-08-11'de teyit edildi
  address: {
    street: "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-2",
    district: "Meram",
    city: "Konya",
    region: "Konya",
    postalCode: "42100",
    country: "TR",
  },
  hours: "Pzt–Cmt 09:00–18:00 · Pazar kapalı",

  /**
   * Google İşletme Profili — üç sitede AYNI kayda işaret eder.
   *
   * Koordinat, işletme pin'inin kendisidir (ilçe/şehir merkezi DEĞİL).
   * Gömülü harita CID ile açılır; böylece Google adresi yeniden geokodlamaz
   * ve kartta işletme adı, puanı ve yol tarifi doğrudan kayıttan gelir.
   */
  googlePlace: {
    name: "KONYA HACAMAT EBUSADULLAH",
    placeId: "ChIJS2aWjgOF0BQR6HthfVrvn2g",
    cid: "7539007473171135464",
    plusCode: "VF8V+HH Meram, Konya",
    geo: { latitude: 37.866483, longitude: 32.493991 },
  },

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
export function waLink(text: string): string {
  return `https://wa.me/${SITE.waTR}?text=${encodeURIComponent(text)}`;
}

/**
 * Gömülü harita `src`'si — adres metnini geokodlamak yerine işletme
 * kaydını doğrudan açar. API anahtarı gerekmez.
 */
export function mapEmbedSrc(zoom = 17): string {
  return `https://maps.google.com/maps?cid=${SITE.googlePlace.cid}&hl=tr&z=${zoom}&output=embed`;
}

/** Google Haritalar işletme profili (kanonik bağlantı). */
export function mapPlaceHref(): string {
  return `https://www.google.com/maps?cid=${SITE.googlePlace.cid}`;
}

/** "Yol tarifi al" — hedef, adres metni değil işletme kaydının kendisi. */
export function mapDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    SITE.googlePlace.name,
  )}&destination_place_id=${SITE.googlePlace.placeId}`;
}

/** 1994'ten bugüne yıl (deneyim rozetleri için — her yıl otomatik artar). */
export function yearsExp(): number {
  return new Date().getFullYear() - SITE.founded;
}
