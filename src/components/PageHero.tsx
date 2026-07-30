import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import Jsonld from "@/components/Jsonld";

/**
 * Sayfa başlığı bandı — görsel breadcrumb + BreadcrumbList JSON-LD birlikte.
 * Akademik düzen: sola dayalı başlık, altında altın kural çizgisi.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Ana sayfa hariç kırıntılar — ör. [{ name: "Hacamat Eğitimi", path: "/hacamat-egitimi" }] */
  crumb: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  const items = [
    { name: "Ana Sayfa", url: SITE.baseUrl },
    ...crumb.map((c) => ({ name: c.name, url: `${SITE.baseUrl}${c.path}` })),
  ];

  return (
    <section className="bg-navy text-white bg-grid-navy border-b border-white/10">
      <Jsonld data={breadcrumbSchema(items)} />
      <div className="container-ak py-10 lg:py-14">
        <nav aria-label="Kırıntı navigasyonu" className="flex items-center gap-1.5 text-[12.5px] text-white/50 mb-6 flex-wrap">
          <Link href="/" className="hover:text-gold-soft transition-colors">
            Ana Sayfa
          </Link>
          {crumb.map((c, i) => (
            <span key={c.path} className="flex items-center gap-1.5">
              <ChevronRight size={13} />
              {i === crumb.length - 1 ? (
                <span className="text-white/80">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-gold-soft transition-colors">
                  {c.name}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && <span className="eyebrow-ak mb-3">{eyebrow}</span>}
        <h1 className="font-display text-3xl lg:text-[2.75rem] leading-tight font-semibold max-w-4xl">
          {title}
        </h1>
        <div className="rule-gold mt-5" />
        {lead && (
          <p className="mt-5 text-white/70 leading-relaxed max-w-3xl text-[15px] lg:text-base">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
