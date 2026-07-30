import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { getAllPosts, formatDate, CLUSTERS, type ClusterKey } from "@/lib/mdx";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Blog — Eğitim ve Uygulayıcılık Yazıları",
  description:
    "Hacamat ve sülük eğitimi, uygulayıcılık, hijyen standartları ve mesleki etik üzerine yazılar. Ebusadullah Akademi bilgi merkezi.",
  path: "/blog",
});

export default function Page() {
  const posts = getAllPosts();
  const clusters = Object.keys(CLUSTERS) as ClusterKey[];

  return (
    <>
      <PageHero
        eyebrow="Bilgi Merkezi"
        title="Eğitim ve uygulayıcılık yazıları"
        lead="Programlarımızın müfredatını besleyen konuları burada ayrıntılı olarak ele alıyoruz."
        crumb={[{ name: "Blog", path: "/blog" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak">
          {posts.length === 0 ? (
            <div className="card-ak p-10 text-center">
              <BookOpen size={28} className="text-gold mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-navy">
                Yazılar hazırlanıyor
              </h2>
              <p className="text-ink-soft mt-2">
                Bilgi merkezi içerikleri yakında burada yayınlanacak.
              </p>
            </div>
          ) : (
            clusters.map((key) => {
              const clusterPosts = posts.filter((p) => p.cluster === key);
              if (clusterPosts.length === 0) return null;
              return (
                <div key={key} className="mb-14 last:mb-0">
                  <SectionHeading eyebrow="Konu Kümesi" title={CLUSTERS[key]} />
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clusterPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="card-ak p-6 flex flex-col hover:border-navy/30 transition-colors"
                      >
                        <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-gold">
                          {formatDate(p.date)}
                          {p.pillar && (
                            <span className="px-2 py-0.5 rounded bg-navy-tint text-navy tracking-normal">
                              Sütun yazı
                            </span>
                          )}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-navy leading-snug mt-3">
                          {p.title}
                        </h3>
                        <p className="text-ink-soft text-[14px] leading-relaxed mt-3 flex-1">
                          {p.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-navy font-semibold text-[13.5px] mt-5">
                          Yazıyı okuyun <ArrowRight size={14} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
