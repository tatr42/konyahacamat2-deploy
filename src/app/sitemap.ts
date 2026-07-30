import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { ALL_PAGES } from "@/data/nav";
import { getAllPosts } from "@/lib/mdx";

/**
 * Sitemap — sayfa kaydı (data/nav) + MDX blog yazılarından otomatik üretilir.
 * Toplam URL sayısı düşüktür ve öyle kalmalıdır: bu site "kaliteli, sınırlı
 * ölçek" stratejisiyle çalışır, programatik il sayfası üretmez.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const priority: Record<string, number> = {
    "hacamat-egitimi": 0.9,
    "suluk-egitimi": 0.9,
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
    ...posts,
  ];
}
