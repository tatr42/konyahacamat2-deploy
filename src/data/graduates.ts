/**
 * Mezun & sertifika kayıt verisi.
 *
 * ⚠️ İÇERİK SORUMLULUĞU: Aşağıdaki kayıtlar YER TUTUCUDUR ve bilinçli olarak
 * "ÖRNEK" ibaresiyle işaretlenmiştir. Site yayına alınmadan ÖNCE müşteriden
 * gelen gerçek mezun/sertifika kayıtlarıyla değiştirilmelidir. Uydurma mezun
 * adı veya sahte belge numarası yayınlamak hem güveni hem KVKK uyumunu bozar.
 *
 * Mezun listesi KVKK gereği tam ad yerine "ad + soyadı baş harfi" biçiminde
 * tutulur; yayın öncesi mezunlardan açık rıza alınmalıdır.
 */

export interface CertificateRecord {
  /** Sertifika numarası — doğrulama sorgusunda kullanılır (büyük harf). */
  code: string;
  /** Ad + soyad baş harfi (KVKK) — ör. "Ahmet Y." */
  holder: string;
  /** Tamamlanan program adı */
  program: string;
  /** Veriliş tarihi (YYYY-MM-DD) */
  issued: string;
  /** Mezunun bulunduğu il (opsiyonel) */
  city?: string;
}

/**
 * Sertifika kayıt defteri.
 *
 * BİLİNÇLİ OLARAK BOŞ: Site canlıya alınacağı için uydurma kayıt yayınlanmaz;
 * sahte belge numarası göstermek ziyaretçiyi yanıltır. Müşteriden gerçek mezun
 * listesi geldiğinde buraya eklenir ve doğrulama anında çalışır başlar.
 *
 * Kayıt eklerken: `holder` alanına TAM AD YAZILMAZ (KVKK) — ad + soyad baş
 * harfi kullanılır ve mezundan açık rıza alınmış olmalıdır.
 */
export const CERTIFICATES: CertificateRecord[] = [];

/** Sertifika numarasıyla kayıt arama — boşluk/küçük harf toleranslı. */
export function findCertificate(code: string): CertificateRecord | null {
  const norm = code.trim().toUpperCase().replace(/\s+/g, "");
  return CERTIFICATES.find((c) => c.code.toUpperCase().replace(/\s+/g, "") === norm) ?? null;
}

/**
 * Mezun görüşleri — müşteri metinleri gelene kadar BOŞ.
 * Boş olduğunda ilgili bölüm sayfada hiç render edilmez (uydurma referans yok).
 */
export interface Testimonial {
  name: string;
  city: string;
  program: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [];
