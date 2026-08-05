import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  MapPin,
  Thermometer,
} from "lucide-react";

import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import { assertEduProfilesComplete } from "@/data/province-education-profiles";
import { buildCityCourseContent, allCitySlugs } from "@/lib/city-course-content";
import { locative } from "@/lib/tr-case";
import { faqPageSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FaqSection from "@/components/FaqSection";
import CredentialNote from "@/components/CredentialNote";
import CtaBand from "@/components/CtaBand";
import Jsonld from "@/components/Jsonld";
import TrustBadges from "@/components/TrustBadges";

/**
 * İL KURS SAYFASI — `/hacamat-kursu/{il}`
 *
 * Bu silo, daha önce kardeş domain konyahacamat.net üzerinde yayınlanan
 * `hacamat-kursu` silosunun devamıdır. Eğitim niyeti bu domaine toplandığı
 * için `.net` tarafındaki karşılıkları 301 ile buraya yönlendirilir; aynı
 * şekilde bu domainde daha önce yayında olan WordPress sitesinin il bazlı
 * kurs URL'leri de buraya bağlanır (aynı domain içinde kaldıkları için
 * devir kaybı yaşanmaz).
 *
 * KOPYA İÇERİK: sayfanın gövdesi `lib/city-course-content` tarafından il
 * profilinden üretilir; iklim sınıfı ve ulaşım sınıfı FARKLI BLOK bastırır.
 * Tekrarlaması gereken bilgi (program akışı, sertifika kapsamı) paragraf
 * olarak değil bileşen olarak sunulur.
 */

export function generateStaticParams() {
  // Eksik profil = şablona düşen sayfa = kopya içerik. Build'de yakalanır.
  assertEduProfilesComplete();
  return allCitySlugs().map((il) => ({ il }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ il: string }> }) {
  const { il } = await params;
  const c = buildCityCourseContent(il);
  if (!c) return {};
  return pageMeta({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/hacamat-kursu/${il}`,
  });
}

export default async function Page({ params }: { params: Promise<{ il: string }> }) {
  const { il } = await params;
  const c = buildCityCourseContent(il);
  if (!c) notFound();

  const { province: p, profile } = c;

  return (
    <>
      <Jsonld data={faqPageSchema(c.faqs)} />

      <PageHero
        eyebrow={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        crumb={[
          { name: "Hacamat Kursu", path: "/hacamat-kursu" },
          { name: p.name, path: `/hacamat-kursu/${p.slug}` },
        ]}
      />

      {/* Şehre özgü anlatım — sayfanın özgün gövdesi */}
      <section className="py-14 lg:py-20">
        <div className="container-ak max-w-3xl">
          {c.blocks.map((b, i) => (
            <div key={b.id} className={i > 0 ? "mt-12" : ""}>
              <SectionHeading title={b.heading} id={b.id} />
              <div className="mt-5 space-y-4">
                {b.paragraphs.map((par, j) => (
                  <p key={j} className="text-ink-soft leading-relaxed text-[15.5px]">
                    {par}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* İklim sınıfına göre DEĞİŞEN kontrol listesi */}
      <section className="py-14 lg:py-16 bg-canvas-deep border-y border-line">
        <div className="container-ak max-w-3xl">
          <div className="card-ak p-6 lg:p-8 border-l-[3px] border-l-navy">
            <div className="flex items-start gap-4">
              <Thermometer size={22} className="text-navy shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-xl lg:text-2xl font-semibold text-navy leading-snug">
                  {c.climateChecklist.title}
                </h2>
                <div className="rule-gold mt-4" />
                <p className="mt-4 text-ink-soft leading-relaxed text-[15px]">
                  {c.climateChecklist.intro}
                </p>
                <ul className="mt-5 space-y-3">
                  {c.climateChecklist.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={17} className="text-gold shrink-0 mt-[3px]" />
                      <span className="text-ink-soft text-[15px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ulaşım sınıfına göre DEĞİŞEN kamp planı */}
      <section className="py-14 lg:py-20">
        <div className="container-ak">
          <SectionHeading
            eyebrow="Program İşleyişi"
            title={c.campTitle}
            lead={profile.ulasim}
            id="kamp-katilimi"
          />
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.campSteps.map((s, i) => (
              <li key={s.label} className="card-ak p-6">
                <span className="module-no mb-4">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-semibold text-navy">{s.label}</h3>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Program sayfalarına iç link — para sayfaları */}
      <section className="py-14 lg:py-16 bg-canvas-deep border-y border-line">
        <div className="container-ak">
          <SectionHeading
            eyebrow="Programlar"
            title={`${p.name} kursiyerlerinin katıldığı iki program`}
            lead={c.programsLead}
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROGRAMS.map((prog) => (
              <Link key={prog.slug} href={`/${prog.slug}`} className="card-ak p-6 group block">
                <span className="w-10 h-10 rounded-md bg-navy-tint text-navy flex items-center justify-center mb-4">
                  <GraduationCap size={20} />
                </span>
                <h3 className="font-semibold text-navy flex items-center gap-1.5">
                  {prog.title}
                  <ArrowUpRight
                    size={16}
                    className="text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </h3>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">{prog.tagline}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <CredentialNote />
          </div>
        </div>
      </section>

      {/* Kardeş domain köprüsü — hedef URL il başına DEĞİŞİR (link ayak izi olmasın) */}
      {(c.supplyLink || c.materialLink) && (
        <section className="py-14 lg:py-20">
          <div className="container-ak max-w-3xl">
            <SectionHeading
              eyebrow="Eğitim Sonrası"
              title={c.supplyHeading}
              id="tedarik"
            />
            <div className="mt-6 space-y-5">
              {[c.supplyLink, c.materialLink].map(
                (l) =>
                  l && (
                    <div key={l.href} className="card-ak p-6">
                      <p className="text-ink-soft leading-relaxed text-[15px]">{l.context}</p>
                      <a
                        href={l.href}
                        className="mt-3 inline-flex items-center gap-1.5 font-medium text-navy underline underline-offset-4 hover:text-gold transition-colors"
                      >
                        {l.anchor}
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  ),
              )}
            </div>
            <p className="mt-5 text-[13.5px] text-ink-soft/80 leading-relaxed">
              Tedarik ve seans hizmetleri {SITE.sisters.suluk.url.replace("https://www.", "")}{" "}
              üzerinden yürütülür. Bu site yalnızca eğitim programlarını kapsar.
            </p>
          </div>
        </section>
      )}

      {/* Bölge içi iç link ağı */}
      {c.regionSiblings.length > 0 && (
        <section className="py-14 lg:py-16 bg-canvas-deep border-y border-line">
          <div className="container-ak">
            <SectionHeading
              eyebrow="Yakın İller"
              title={`${p.region} bölgesindeki diğer il sayfaları`}
            />
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {c.regionSiblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/hacamat-kursu/${s.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-line bg-surface text-[14px] text-navy hover:border-navy hover:bg-navy-tint transition-colors"
                  >
                    <MapPin size={14} className="text-gold" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-ink-soft">
              <Link href="/hacamat-kursu" className="underline underline-offset-4 hover:text-gold">
                81 ilin tamamını görün
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Güven rozetleri — CTA'dan hemen önce son güvence katmanı.
          Düz zemin: hemen ardından gelen FaqSection zaten bg-canvas-deep
          kullanıyor, aynı tonu üst üste yığmamak için burada nötr kalır. */}
      <section className="py-14 lg:py-16">
        <div className="container-ak">
          <SectionHeading
            eyebrow="Güvenceler"
            title={`${locative(p.name)} kursiyerlerimizin bize güvenme sebepleri`}
            center
          />
          <div className="mt-10">
            <TrustBadges />
          </div>
        </div>
      </section>

      <FaqSection items={c.faqs} title={`${p.name} için sık sorulanlar`} />

      <CtaBand
        title={`${p.name} kontenjanı ve dönem tarihleri için yazın`}
        lead={`${profile.ulasim} ${c.ctaLead}`}
        waText={`Merhaba, ${p.name} için hacamat ve sülük eğitimi programı hakkında bilgi almak istiyorum.`}
      />

      <section className="pb-14">
        <div className="container-ak max-w-3xl">
          <p className="text-[13px] text-ink-soft/75 leading-relaxed flex items-start gap-2">
            <CalendarDays size={15} className="shrink-0 mt-0.5" />
            {c.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
