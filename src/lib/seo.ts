import type { Metadata } from "next";

/**
 * Sayfa metadata üreticisi — canonical + OpenGraph'ı tek yerden kurar.
 * `title` layout şablonuyla "%s | Ebusadullah Akademi" olarak tamamlanır.
 *
 * BAŞLIK KURALI: bu sitenin başlıklarında "Konya Hacamat" kalıbı KULLANILMAZ;
 * kardeş domainlerle SERP'te aynı görünüp birbirini bastırmamaları için
 * buradaki dil hep eğitim/akademi niyetlidir.
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string; // "/hacamat-egitimi" gibi
}): Metadata {
  const canonical = opts.path;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      type: "website",
      // OG görseli RASTER olmalı: WhatsApp, Facebook, LinkedIn ve X
      // paylaşımlarda SVG'yi render etmez, kart görselsiz görünür.
      images: [{ url: "/og.png", width: 1200, height: 630, alt: opts.title }],
    },
  };
}
