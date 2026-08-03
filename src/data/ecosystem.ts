/**
 * EKOSİSTEM ÇAPRAZ LİNK KURALLARI — üç domainin birbirine bağlanma disiplini.
 *
 * Ekosistem:
 *   konyahacamat.com.tr → EĞİTİM / AKADEMİ   (bu site)
 *   konyahacamat.net    → SÜLÜK hizmeti ve tıbbi sülük / malzeme satışı
 *   konyahacamat.com    → HACAMAT hizmeti (şu an uykuda)
 *
 * ÜÇ KURAL — hepsi bu modülde zorunlu tutulur, sayfa kodunda elle link YAZILMAZ:
 *
 * 1. ÖLÜ DOMAINE LİNK VERİLMEZ.
 *    `SITE.sisters[].live === false` olan domaine üretilen her link `null`
 *    döner. Sayfa kodu `null` gelince bloğu hiç basmaz.
 *
 * 2. AYNI ÇIPA METNİ ÇOK SAYIDA SAYFADA TEKRARLANMAZ.
 *    81 il sayfasının tamamından aynı metinle aynı adrese link vermek,
 *    Google'ın "site geneli çapraz link" (link şeması) olarak okuduğu bir
 *    ayak izidir. Bu yüzden il sayfalarının kardeş linki hem HEDEF hem ÇIPA
 *    bakımından ile göre değişir: her il, kardeş domaindeki KENDİ iline
 *    karşılık gelen sayfaya bağlanır. Böylece 81 link = 81 farklı URL.
 *
 * 3. 301'LENEN URL'E LİNK VERİLMEZ.
 *    `.net`'in `hacamat-kursu` silosu bu siteye devredilmektedir; o yollara
 *    link verilirse 301 zinciri oluşur. `NET_FORBIDDEN_PREFIXES` bunu
 *    derleme anında yakalar.
 */

import { SITE } from "./site";
import { pickOne, seedFor } from "@/lib/rotate";

/** Kardeş domainde ARTIK YAŞAMAYAN (bu siteye devredilen) yol önekleri. */
const NET_FORBIDDEN_PREFIXES = ["/hacamat-kursu", "/egitimler"];

export interface SisterLink {
  href: string;
  /** Çıpa metni — sayfadan sayfaya değişir (bkz. kural 2). */
  anchor: string;
  /** Linki çevreleyen bağlam cümlesi. */
  context: string;
}

function netUrl(path: string): string {
  if (NET_FORBIDDEN_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) {
    throw new Error(
      `ecosystem: "${path}" konyahacamat.net üzerinde 301'lenmektedir; bu yola link verilemez.`,
    );
  }
  return `${SITE.sisters.suluk.url}${path}`;
}

/** Kardeş domain canlı değilse link üretilmez. */
function ifLive(key: keyof typeof SITE.sisters, make: () => SisterLink): SisterLink | null {
  return SITE.sisters[key].live ? make() : null;
}

/**
 * İl sayfasına özel kardeş link — hedef URL ile birlikte DEĞİŞİR.
 *
 * Uygulayıcı olacak kursiyerin gerçek ihtiyacı, kendi ilinde tıbbi sülük ve
 * malzeme temin edebilmektir; bu yüzden bağlantı hem konu hem lokasyon
 * bakımından yerindedir (dolgu link değildir).
 */
/**
 * Çevre cümleleri havuzdan gelir ve ile göre döner. Sabit bir cümle 81 sayfada
 * birebir tekrarlanır ve ortak metin oranını (Jaccard) gereksiz yere yükseltir;
 * ayrıca 81 özdeş çıpa-bağlam kalıbı, çapraz linki "şablon" gibi gösterir.
 */
const SUPPLY_CONTEXT = [
  "Eğitim sonrası kendi uygulamanızı kurarken canlı tıbbi sülüğü güvenilir ve izlenebilir bir kaynaktan almanız gerekir. Tedarik, satış ve kargo süreci kardeş sitemiz üzerinden yürütülür:",
  "Programı tamamladıktan sonra karşılaşacağınız ilk pratik soru tedariktir: canlı sülüğü nereden, hangi koşulda ve ne sıklıkta alacaksınız? Bu başlık kardeş sitemizde ayrıntılı ele alınır:",
  "Uygulamaya başlarken canlı tıbbi sülüğün kaynağı, taşınma biçimi ve teslim süresi doğrudan seans güvenliğini etkiler. Satış ve gönderi tarafı bu sitenin değil kardeş sitemizin konusudur:",
  "Eğitim, sülüğün nasıl kullanılacağını öğretir; nereden temin edileceği ise ayrı bir konudur. Tedarik süreci kardeş sitemiz üzerinden yürür:",
];

const MATERIAL_CONTEXT = [
  "Uygulama seti, tek kullanımlık kupa ve sarf malzemesi tedariki eğitimin kapsamı dışındadır; bu başlık kardeş sitemizde ayrıca ele alınır:",
  "Kupa, lanset ve sarf malzemesini hangi ölçütle seçeceğinizi programda anlatıyoruz; ürünün kendisi ise kardeş sitemizden temin edilir:",
  "Kendi çalışma alanınızı kurarken ihtiyaç duyacağınız malzeme listesi eğitimde çıkarılır. Bu malzemelerin satışı kardeş sitemizde yapılır:",
  "Malzeme seçimi eğitimin, malzeme tedariki ise kardeş sitemizin konusudur. Ürün ve gönderi bilgisi için:",
];

export function citySupplyLink(provinceSlug: string, provinceName: string): SisterLink | null {
  return ifLive("suluk", () => ({
    href: netUrl(`/suluk-satisi/${provinceSlug}`),
    anchor: `${provinceName} tıbbi sülük temini`,
    context: pickOne(SUPPLY_CONTEXT, seedFor(provinceSlug, "supply-context")),
  }));
}

/** İl sayfasındaki malzeme (kupa, lanset, sarf) bağlantısı. */
export function cityMaterialLink(provinceSlug: string, provinceName: string): SisterLink | null {
  return ifLive("suluk", () => ({
    href: netUrl(`/kupa-malzemeleri/${provinceSlug}`),
    anchor: `${provinceName} hacamat kupası ve sarf malzemeleri`,
    context: pickOne(MATERIAL_CONTEXT, seedFor(provinceSlug, "material-context")),
  }));
}

/**
 * HİZMET niyetini devreden link — "eğitim değil, seans arıyorum" diyen
 * ziyaretçiyi doğru domaine gönderir. Program ve hub sayfalarında kullanılır;
 * il sayfalarında KULLANILMAZ (kural 2: aynı çıpa 81 kez tekrarlanmasın).
 */
export function therapyServiceLink(): SisterLink | null {
  return ifLive("suluk", () => ({
    href: netUrl("/hizmetler/suluk"),
    anchor: "sülük terapisi (hirudoterapi) seans hizmeti",
    context:
      "Eğitim değil, uygulama mı arıyorsunuz? Danışan olarak seans talepleri bu sitede karşılanmaz; kardeş sitemize yönlendirilir:",
  }));
}

/** Hacamat hizmeti — `.com` uyanana kadar `null` döner, blok basılmaz. */
export function hacamatServiceLink(): SisterLink | null {
  return ifLive("hacamat", () => ({
    href: `${SITE.sisters.hacamat.url}/hacamat-nedir`,
    anchor: "hacamat uygulama hizmeti",
    context: "Hacamat seansı ve randevu talepleri kardeş sitemiz üzerinden karşılanır:",
  }));
}

/**
 * Konu (lokasyon değil) niyetli derinlik linkleri — blog ve program
 * sayfalarında kullanılır. Çıpa metinleri birbirinden farklıdır.
 */
export const NET_TOPIC_LINKS = {
  sulukPillar: {
    href: `${SITE.sisters.suluk.url}/blog/suluk-tedavisi-hirudoterapi-nedir`,
    anchor: "hirudoterapinin kapsamlı anlatımı",
  },
  hacamatPillar: {
    href: `${SITE.sisters.suluk.url}/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir`,
    anchor: "hacamatın tarihi ve uygulama esasları",
  },
  kontrendikasyon: {
    href: `${SITE.sisters.suluk.url}/blog/suluk-tedavisi-kimlere-uygulanmaz`,
    anchor: "sülük uygulanmaması gereken durumlar",
  },
  sonrasiBakim: {
    href: `${SITE.sisters.suluk.url}/blog/suluk-uygulamasi-sonrasi-bakim`,
    anchor: "uygulama sonrası bakım protokolü",
  },
} as const;
