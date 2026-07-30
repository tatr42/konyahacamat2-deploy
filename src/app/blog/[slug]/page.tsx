import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SITE } from "@/data/site";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  extractToc,
  CLUSTERS,
} from "@/lib/mdx";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import Jsonld from "@/components/Jsonld";
import Toc from "@/components/Toc";
import CtaBand from "@/components/CtaBand";
import { PostBody, MedicalDisclaimer, AuthorBox } from "@/components/PostBody";

/** Tüm yazılar build'de statik üretilir (tam SSG). */
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content).filter((h) => h.level === 2);
  const related = getRelatedPosts(post);

  return (
    <>
      <Jsonld data={articleSchema(post)} />
      <Jsonld
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: SITE.baseUrl },
          { name: "Blog", url: `${SITE.baseUrl}/blog` },
          { name: post.title, url: `${SITE.baseUrl}/blog/${post.slug}` },
        ])}
      />

      {/* Başlık bandı */}
      <section className="bg-navy text-white bg-grid-navy border-b border-white/10">
        <div className="container-ak py-10 lg:py-14 max-w-4xl">
          <nav aria-label="Kırıntı navigasyonu" className="text-[12.5px] text-white/50 mb-6">
            <Link href="/" className="hover:text-gold-soft transition-colors">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-gold-soft transition-colors">Blog</Link>
          </nav>
          {post.cluster && <span className="eyebrow-ak mb-3">{CLUSTERS[post.cluster]}</span>}
          <h1 className="font-display text-3xl lg:text-[2.6rem] leading-tight font-semibold">
            {post.title}
          </h1>
          <div className="rule-gold mt-5" />
          <p className="mt-5 text-white/70 leading-relaxed text-[15.5px]">{post.description}</p>
          <span className="inline-flex items-center gap-2 text-white/50 text-[13px] mt-6">
            <CalendarDays size={14} />
            {formatDate(post.date)}
          </span>
        </div>
      </section>

      <div className="container-ak py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <aside className="lg:col-span-3 order-1">
          <Toc items={toc} />
        </aside>

        <article className="lg:col-span-9 order-2 max-w-3xl">
          <PostBody source={post.content} />
          <MedicalDisclaimer />
          <AuthorBox />

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-semibold text-navy">İlgili yazılar</h2>
              <div className="rule-gold mt-3 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="card-ak p-5 flex flex-col hover:border-navy/30 transition-colors"
                  >
                    <h3 className="font-semibold text-navy text-[14.5px] leading-snug flex-1">
                      {r.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-navy text-[13px] font-semibold mt-4">
                      Okuyun <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      <CtaBand />
    </>
  );
}
