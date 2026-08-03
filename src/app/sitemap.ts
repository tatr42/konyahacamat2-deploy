import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { ALL_PAGES } from "@/data/nav";
import { getAllPosts } from "@/lib/mdx";
import { PROVINCES } from "@/data/tr-provinces";

/**
 * Sitemap — sayfa kaydı (data/nav) + il kurs silosu + MDX blog yazıları.
 *
 * İl silosu (2026-08-03) kardeş domainden devralındı; 81 il sayfası burada
 * listelenir. Ölçek büyüdüğü için tek kural şudur: sitemap'e yalnızca
 * `generateStaticParams` ile GERÇEKTEN üretilen URL'ler girer — ikisi de
 * `tr-provinces` listesinden beslendiği için kaymaları imkânsızdır.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const priority: Record<string, number> = {
    "hacamat-egitimi": 0.9,
    "suluk-egitimi": 0.9,
    "hacamat-kursu": 0.9,
    egitmen: 0.7,
    "sertifika-dogrulama": 0.6,
    mezunlar: 0.6,
    kayit: 0.8,
    gizlilik: 0.3,
    "cerez-politikasi": 0.3,
  };

  const pages: MetadataRoute.Sitemap = ALL_PAGES.map((p) => ({
    url: `${SITE.baseUrl}/${p.slug}`,
    changeFrequency: "monthly",
    priority: priority[p.slug] ?? 0.5,
  }));

  const cities: MetadataRoute.Sitemap = PROVINCES.map((p) => ({
    url: `${SITE.baseUrl}/hacamat-kursu/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.baseUrl}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00`),
    changeFrequency: "monthly",
    priority: p.pillar ? 0.8 : 0.6,
  }));

  return [
    { url: SITE.baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...pages,
    ...cities,
    ...posts,
  ];
}
