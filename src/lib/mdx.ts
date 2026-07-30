import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugifyTr } from "@/lib/slug";

/**
 * MDX blog okuyucusu — `src/content/blog/*.mdx` dosyalarını okur,
 * frontmatter'ı parse edip doğrular ve tarihe göre (yeniden eskiye) sıralar.
 *
 * Yeni yazı eklemek: klasöre bir .mdx dosyası koymak yeterli —
 * liste, detay, sitemap ve JSON-LD otomatik güncellenir (SSG).
 *
 * Zorunlu frontmatter: title, slug, date (YYYY-MM-DD) ve açıklama
 * (`description` VEYA eş anlamlısı `excerpt`).
 * Opsiyonel: cluster/category (konu kümesi), image, pillar, draft (true → gizli).
 *
 * Not: `excerpt` ve `category` takma adları bilinçli desteklenir — içerik
 * üretiminde yaygın olan bu adlandırmayla yazılan dosyalar da build'i
 * düşürmeden çalışsın diye.
 */

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

/** Konu kümeleri — iç linkleme ve "aynı kümeden" önerileri için. */
export const CLUSTERS = {
  "hacamat-egitimi": "Hacamat Eğitimi",
  "suluk-egitimi": "Sülük Eğitimi",
  uygulayicilik: "Uygulayıcılık & Meslek",
} as const;

export type ClusterKey = keyof typeof CLUSTERS;

export interface PostMeta {
  title: string;
  description: string;
  slug: string;
  date: string; // YYYY-MM-DD
  cluster?: ClusterKey;
  image?: string;
  /** Pillar (sütun) yazı mı — küme ana sayfası gibi davranır. */
  pillar?: boolean;
}

export interface Post extends PostMeta {
  /** MDX gövdesi (frontmatter hariç) — next-mdx-remote'a verilir. */
  content: string;
}

/** Tek dosyayı oku + frontmatter'ı doğrula. Hatalı dosya build'i düşürür (bilinçli). */
function parseFile(filename: string): Post & { draft?: boolean } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  // description ↔ excerpt eş anlamlı; ikisinden biri yeterli.
  const description =
    typeof data.description === "string" && data.description
      ? data.description
      : typeof data.excerpt === "string"
        ? data.excerpt
        : "";

  for (const [field, value] of [
    ["title", data.title],
    ["slug", data.slug],
    ["date", data.date],
    ["description/excerpt", description],
  ] as const) {
    if (!value || typeof value !== "string") {
      throw new Error(`Blog frontmatter eksik/hatalı: "${field}" — ${filename}`);
    }
  }

  // cluster ↔ category eş anlamlı; bilinmeyen değer sessizce yok sayılır
  // (yazı yine yayınlanır, yalnızca küme grubuna girmez).
  const rawCluster =
    typeof data.cluster === "string" ? data.cluster : typeof data.category === "string" ? data.category : "";
  const cluster = rawCluster in CLUSTERS ? (rawCluster as ClusterKey) : undefined;

  return {
    title: data.title,
    description,
    slug: data.slug,
    date: data.date,
    cluster,
    image: typeof data.image === "string" ? data.image : undefined,
    pillar: data.pillar === true,
    draft: data.draft === true,
    content,
  };
}

/** Tüm yayındaki yazılar — tarihe göre yeniden eskiye. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Slug ile tek yazı; bulunamazsa null. */
export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/** Aynı kümeden diğer yazılar (iç linkleme — yetim sayfa bırakmamak için). */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCluster = others.filter((p) => p.cluster && p.cluster === post.cluster);
  return [...sameCluster, ...others.filter((p) => !sameCluster.includes(p))].slice(0, limit);
}

/**
 * MDX gövdesindeki h2/h3 başlıklarından İçindekiler çıkarır.
 * id üretimi PostBody'deki başlık bileşenleriyle AYNI slug fonksiyonunu
 * kullanır — böylece linkler ile başlık id'leri birebir eşleşir.
 * Kod bloğu içindeki "#" satırları atlanır.
 */
export function extractToc(source: string): { id: string; text: string; level: 2 | 3 }[] {
  const out: { id: string; text: string; level: 2 | 3 }[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;

    // Markdown vurgularını temizle (**kalın**, *italik*, `kod`)
    const text = m[2].replace(/[*`_]/g, "").trim();
    if (!text) continue;

    out.push({ id: slugifyTr(text), text, level: m[1] === "##" ? 2 : 3 });
  }
  return out;
}

/** Görünüm için Türkçe tarih ("20 Temmuz 2026"). */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
