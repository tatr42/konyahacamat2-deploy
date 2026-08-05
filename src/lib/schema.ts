/**
 * JSON-LD şema üreticileri — SITE tek kaynağından beslenir.
 *
 * konyahacamat.com.tr AKADEMİ otoritesidir:
 *   EducationalOrganization (kurum) + Course/CourseInstance (programlar)
 *   + Person (eğitmen) + FAQPage + BreadcrumbList + Article (blog).
 *
 * Kardeş domainlere `sameAs` ile bağlanırız — Google için bu "kopya site"
 * değil, "aynı kurumun farklı odaklı varlıkları" sinyalidir. ÖLÜ domaine
 * link verilmez (SITE.sisters[].live kontrolü).
 *
 * MedicalBusiness/LocalBusiness şeması bu sitede BİLİNÇLİ OLARAK YOKTUR —
 * hizmet niyeti kardeş domainlere aittir.
 */

import { SITE, mapPlaceHref } from "@/data/site";
import { CREDENTIAL, type Program } from "@/data/programs";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.district,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/** Yalnızca CANLI kardeş domainler + sosyal hesaplar. */
function sameAsLinks(): string[] {
  const sisters = Object.values(SITE.sisters)
    .filter((s) => s.live)
    .map((s) => s.url);
  return [...sisters, SITE.social.instagram, SITE.social.facebook];
}

/** Kurum varlığı — sitenin kök entity'si. */
export function educationalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE.baseUrl}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: "Ebusadullah Hacamat Akademisi",
    description:
      "Hacamat (kupa terapisi) ve sülük terapisi (hirudoterapi) alanında eğitim veren uygulama akademisi. 1994'ten bu yana süren saha tecrübesi, çevrimiçi teorik dersler ve Konya'da yüz yüze uygulama kampı.",
    url: SITE.baseUrl,
    // Yapısal veride raster kullanılır — Google logo/görsel alanlarında
    // .png/.jpg bekler, SVG'yi güvenilir biçimde işlemez.
    logo: `${SITE.baseUrl}/logo.png`,
    image: `${SITE.baseUrl}/og.png`,
    email: SITE.email,
    telephone: SITE.phoneTR,
    foundingDate: String(SITE.founded),
    address: postalAddress,
    areaServed: { "@type": "Country", name: "Türkiye" },
    knowsLanguage: "tr",
    sameAs: sameAsLinks(),
  };
}

/** Eğitmen — E-E-A-T'nin "Experience/Expertise" ayağı. */
export function instructorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.baseUrl}/egitmen#person`,
    name: "Ebusadullah Hoca",
    jobTitle: "Kurucu Eğitmen",
    description: `${SITE.founded} yılından bu yana hacamat ve sülük terapisi uygulayan, ${SITE.graduates}'den fazla kursiyere eğitim vermiş kurucu eğitmen.`,
    worksFor: { "@id": `${SITE.baseUrl}/#organization` },
    url: `${SITE.baseUrl}/egitmen`,
    knowsAbout: [
      "Hacamat (kupa terapisi)",
      "Sülük terapisi (hirudoterapi)",
      "Geleneksel ve tamamlayıcı uygulama hijyeni",
    ],
  };
}

/**
 * Program şeması. `educationalCredentialAwarded` KURUM sertifikası olarak
 * yazılır — akreditasyon/resmî yetki iddiası içermez (bkz. data/programs.ts).
 */
export function courseSchema(p: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE.baseUrl}/${p.slug}#course`,
    name: p.courseName,
    description: p.description,
    url: `${SITE.baseUrl}/${p.slug}`,
    provider: { "@id": `${SITE.baseUrl}/#organization` },
    inLanguage: "tr",
    educationalCredentialAwarded: CREDENTIAL,
    teaches: p.outcomes,
    syllabusSections: p.modules.map((m, i) => ({
      "@type": "Syllabus",
      name: m.title,
      description: m.detail,
      position: i + 1,
    })),
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: `${p.courseName} — Çevrimiçi Teorik Modüller`,
        courseMode: "online",
        courseWorkload: p.durationISO,
        inLanguage: "tr",
        instructor: { "@id": `${SITE.baseUrl}/egitmen#person` },
      },
      {
        "@type": "CourseInstance",
        name: `${p.courseName} — Konya Uygulama Kampı`,
        courseMode: "onsite",
        inLanguage: "tr",
        instructor: { "@id": `${SITE.baseUrl}/egitmen#person` },
        // `Place` — `hasMap`/`geo` yalnızca burada geçerli; sitenin kök
        // varlığı olan EducationalOrganization bir Place değildir, oraya
        // konum alanı yazılmaz (bkz. dosya başı notu).
        location: {
          "@type": "Place",
          name: SITE.legalName,
          address: postalAddress,
          geo: {
            "@type": "GeoCoordinates",
            latitude: SITE.googlePlace.geo.latitude,
            longitude: SITE.googlePlace.geo.longitude,
          },
          hasMap: mapPlaceHref(),
        },
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    author: { "@id": `${SITE.baseUrl}/egitmen#person` },
    publisher: { "@id": `${SITE.baseUrl}/#organization` },
    mainEntityOfPage: `${SITE.baseUrl}/blog/${a.slug}`,
    inLanguage: "tr",
    ...(a.image ? { image: `${SITE.baseUrl}${a.image}` } : {}),
  };
}
