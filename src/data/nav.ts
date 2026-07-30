/**
 * Sayfa kaydı — TEK KAYNAK. Navbar, Footer ve sitemap buradan beslenir.
 * Yeni sayfa eklemek: buraya bir satır + ilgili route klasörü.
 *
 * KANİBALİZASYON KURALI: bu sitede il/ilçe kurs sayfası YOKTUR.
 * İl bazlı kurs sorguları konyahacamat.net'in silosuna aittir; buradaki
 * şehir sinyali yalnızca /mezunlar sayfasıyla verilir.
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
