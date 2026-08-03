/**
 * Sayfa kaydı — TEK KAYNAK. Navbar, Footer ve sitemap buradan beslenir.
 * Yeni sayfa eklemek: buraya bir satır + ilgili route klasörü.
 *
 * LOKASYON SİLOSU (karar güncellendi, 2026-08-03):
 * İl bazlı kurs sayfaları ARTIK BU SİTEDEDİR — `/hacamat-kursu/{il}`, 81 il.
 * Eğitim niyeti bu domaine toplandığı için kardeş domain konyahacamat.net'in
 * eski `hacamat-kursu` silosu buraya 301'lenir. Sayfalar `data/nav`de tek tek
 * kayıtlı DEĞİLDİR; yalnızca hub (`hacamat-kursu`) kayıtlıdır, il sayfaları
 * `tr-provinces` listesinden türetilir ve sitemap'e oradan eklenir.
 */

export interface SitePage {
  slug: string; // URL parçası (kök dizin) → /slug
  nav: string; // menüde görünen kısa etiket
  short: string; // breadcrumb / kart başlığı
}

/** Eğitim programları (ana silo — sitenin para sayfaları). */
export const PROGRAM_PAGES: SitePage[] = [
  { slug: "hacamat-egitimi", nav: "Hacamat Eğitimi", short: "Hacamat Eğitimi" },
  { slug: "suluk-egitimi", nav: "Sülük Eğitimi", short: "Sülük Eğitimi" },
  { slug: "hacamat-kursu", nav: "İl İl Kurs", short: "İl İl Hacamat Kursu" },
];

/** Kurum & güven sayfaları. */
export const INSTITUTION_PAGES: SitePage[] = [
  { slug: "egitmen", nav: "Eğitmen", short: "Eğitmen" },
  { slug: "sertifika-dogrulama", nav: "Sertifika Doğrulama", short: "Sertifika Doğrulama" },
  { slug: "mezunlar", nav: "Mezunlar", short: "Mezunlar" },
];

/** Kurumsal sayfalar. */
export const CORP_PAGES: SitePage[] = [
  { slug: "hakkimizda", nav: "Hakkımızda", short: "Hakkımızda" },
  { slug: "sss", nav: "S.S.S.", short: "Sıkça Sorulan Sorular" },
  { slug: "iletisim", nav: "İletişim", short: "İletişim" },
  { slug: "kayit", nav: "Kayıt", short: "Kayıt & Başvuru" },
];

/** Yasal / bilgilendirme sayfaları — yalnızca footer ve sitemap'te görünür. */
export const LEGAL_PAGES: SitePage[] = [
  { slug: "gizlilik", nav: "Gizlilik", short: "Gizlilik ve Kişisel Veriler" },
  { slug: "cerez-politikasi", nav: "Çerezler", short: "Çerez Politikası" },
];

/** Sitemap ve tam liste için birleşik. */
export const ALL_PAGES: SitePage[] = [
  ...PROGRAM_PAGES,
  ...INSTITUTION_PAGES,
  ...CORP_PAGES,
  ...LEGAL_PAGES,
];
