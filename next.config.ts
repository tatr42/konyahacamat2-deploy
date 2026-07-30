import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/data/legacy-redirects";

const NET = "https://www.konyahacamat.net";

/**
 * ESKİ SİTE GEÇİŞİ — konyahacamat.com.tr
 *
 * Bu domainde daha önce 3.983 URL'lik bir WordPress sitesi yayındaydı. Yeni
 * (Akademi) site canlıya alındığında o URL'lerin tamamı 404 olurdu; aşağıdaki
 * kurallar bunu engeller.
 *
 * İki katman:
 *   1. `LEGACY_REDIRECTS` — il adı güvenle tespit edilen 502 URL, kardeş
 *      domaindeki EŞLEŞEN il sayfasına birebir gider.
 *   2. Aşağıdaki önek kuralları — geri kalan tüm eski URL aileleri, konusuna
 *      en yakın hub sayfasına gider. Sıra önemlidir: birebir kurallar önce
 *      tanımlanır, önek kuralları en sonda kalır.
 *
 * Not: Lokasyon içerikleri bilinçli olarak konyahacamat.net'e devredilir —
 * bu site yalnızca eğitim niyetine hizmet eder ve eski hizmet/satış
 * içerikleriyle rekabet etmemelidir.
 */
/**
 * `permanent: true` Next.js'te 308 üretir. Google 308'i 301 ile eşdeğer sayar,
 * ancak eski tarayıcılar ve bazı SEO araçları 301'i daha güvenilir işler.
 * Site taşımasında sürprize yer bırakmamak için açıkça 301 kullanıyoruz.
 */
const PERM = { statusCode: 301 as const };

const legacyExact = LEGACY_REDIRECTS.map(([source, destination]) => ({
  source,
  destination,
  ...PERM,
}));

const legacyFamilies = [
  // Kurs aileleri → .net kurs hub'ı
  { source: "/hacamat-suluk-kurslari/:slug*", destination: `${NET}/hacamat-kursu` },
  { source: "/hastaliklar-ve-tedavileri/:slug*", destination: `${NET}/hacamat-kursu` },
  // Kupa / malzeme aileleri → .net malzeme hub'ı
  { source: "/hacamat-kupalari/:slug*", destination: `${NET}/kupa-malzemeleri` },
  { source: "/portfolio-item/:slug*", destination: `${NET}/kupa-malzemeleri` },
  { source: "/portfolio-types/:slug*", destination: `${NET}/kupa-malzemeleri` },
  { source: "/malzemeleri-hacamat-malzemeleri-hacamat-malzemeleri/:slug*", destination: `${NET}/kupa-malzemeleri` },
  // WordPress arşiv sayfaları (etiket/kategori/yazar) → kendi blogumuz
  { source: "/tag/:slug*", destination: "/blog" },
  { source: "/category/:slug*", destination: "/blog" },
  { source: "/author/:slug*", destination: "/hakkimizda" },
  // WordPress teknik yolları
  { source: "/wp-content/:path*", destination: "/" },
  { source: "/wp-includes/:path*", destination: "/" },
  { source: "/feed", destination: "/blog" },
  { source: "/:slug*/feed", destination: "/blog" },
].map((r) => ({ ...r, ...PERM }));

/** Eski sitenin 15 sabit sayfası — elle eşlendi. */
const legacyPages = [
  { source: "/kurumsal", destination: "/hakkimizda" },
  { source: "/blog", destination: "/blog" }, // aynı yol, kural gereksiz ama envanterde var
  { source: "/privacy-policy", destination: "/gizlilik" },
  { source: "/konya-hacamat-ebusadullah-iletisim-0554-406-23-83", destination: "/iletisim" },
  { source: "/basinda-biz-konya-hacamat-ebusadullah", destination: "/hakkimizda" },
  { source: "/hacamat-resimleri-galerisihacamat-fotograflari", destination: `${NET}/galeri` },
  { source: "/urunlerimiz", destination: `${NET}/kupa-malzemeleri` },
  { source: "/hacamat-tedavisi", destination: `${NET}/hizmetler/hacamat` },
  { source: "/suluk-tedavisi-tedavisi-merkezi-konya-hacamat-ebusadullah", destination: `${NET}/hizmetler/suluk` },
  { source: "/hacamat-takvimi", destination: `${NET}/takvim` },
  { source: "/suluk-kursu-hacamat-ebuasdullah-tibbi-suluk-ve-hacamat-malzemeler", destination: "/suluk-egitimi" },
  { source: "/malzemeleri-hacamat-malzemeleri-hacamat-malzemeleri/hacamat-suluk-kursu", destination: "/hacamat-egitimi" },
  { source: "/malzemeleri-hacamat-malzemeleri-hacamat-malzemeleri/il-il-hacamat-ve-suluk-kursu", destination: `${NET}/hacamat-kursu` },
  { source: "/malzemeleri-hacamat-malzemeleri-hacamat-malzemeleri/hacamat-suluk-kursu/hastaliklar-ve-tedavileri-konya-hacamat", destination: "/hacamat-egitimi" },
]
  .filter((r) => r.source !== r.destination) // kendine yönlendirme olmasın (/blog)
  .map((r) => ({ ...r, ...PERM }));

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    // Marka görselleri yerel SVG (logo, OG) — next/image ile servis edilir.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // Sıra: elle eşlenen sayfalar → birebir il eşleşmeleri → aile önekleri.
    return [...legacyPages, ...legacyExact, ...legacyFamilies];
  },
};

export default nextConfig;
