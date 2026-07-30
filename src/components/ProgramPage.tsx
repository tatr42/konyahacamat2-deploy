import Link from "next/link";
import { CheckCircle2, Users, Clock, Wifi, ArrowRight, ExternalLink } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import { getProgram, type Program } from "@/data/programs";
import { courseSchema, faqPageSchema } from "@/lib/schema";
import Jsonld from "@/components/Jsonld";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import CredentialNote from "@/components/CredentialNote";
import Toc from "@/components/Toc";

/**
 * Program (kurs) sayfası — iki eğitim de bu bileşeni kullanır.
 * Course + CourseInstance + FAQPage JSON-LD burada basılır.
 */
export default function ProgramPage({ slug }: { slug: Program["slug"] }) {
  const p = getProgram(slug);
  const other = slug === "hacamat-egitimi" ? getProgram("suluk-egitimi") : getProgram("hacamat-egitimi");

  const toc = [
    { id: "program-hakkinda", text: "Program hakkında" },
    { id: "kimler-katilabilir", text: "Kimler katılabilir?" },
    { id: "mufredat", text: "Müfredat ve modüller" },
    { id: "kazanimlar", text: "Program kazanımları" },
    { id: "belge", text: "Sertifika ve belge" },
    { id: "sikca-sorulan-sorular", text: "Sıkça sorulan sorular" },
  ];

  return (
    <>
      <Jsonld data={courseSchema(p)} />
      <Jsonld data={faqPageSchema(p.faqs)} />

      <PageHero
        eyebrow="Eğitim Programı"
        title={p.title}
        lead={p.tagline}
        crumb={[{ name: p.title, path: `/${p.slug}` }]}
      >
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {[
            { icon: <Clock size={17} />, l: "Süre", v: p.durationLabel },
            { icon: <Wifi size={17} />, l: "Format", v: p.format },
            { icon: <Users size={17} />, l: "Grup", v: "Sınırlı kontenjan, küçük gruplar" },
          ].map((x) => (
            <div key={x.l} className="border border-white/15 rounded-md p-4 bg-white/[0.05]">
              <span className="flex items-center gap-2 text-gold-soft text-[11px] font-semibold tracking-[0.18em] uppercase">
                {x.icon}
                {x.l}
              </span>
              <span className="block text-white/85 text-[13.5px] leading-snug mt-2">{x.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={waLink(`Merhaba, ${p.courseName} hakkında bilgi almak istiyorum.`)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-wa"
          >
            WhatsApp&apos;tan Bilgi Alın
          </a>
          <Link href="/kayit" className="btn-ghost !bg-white !text-navy !border-white">
            Kayıt Formu
          </Link>
        </div>
      </PageHero>

      <div className="container-ak py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* İçindekiler — masaüstünde yapışkan yan sütun */}
        <aside className="lg:col-span-3 order-1">
          <Toc items={toc} />
        </aside>

        <div className="lg:col-span-9 order-2 space-y-14">
          <section>
            <SectionHeading eyebrow="Genel Bakış" title="Program hakkında" id="program-hakkinda" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">{p.description}</p>
            <p className="mt-4 text-ink-soft leading-relaxed text-[15.5px]">
              Eğitim, ezberden değil uygulamadan beslenir: her teorik başlık, {SITE.founded}&apos;ten
              bu yana süren saha pratiğinden gelen örneklerle işlenir. Amacımız yalnızca tekniği
              göstermek değil; hangi durumda uygulamanın yapılmayacağını, danışanın ne zaman
              hekime yönlendirileceğini ve hijyen zincirinin nerede kırıldığını da öğretmektir.
            </p>
          </section>

          <section>
            <SectionHeading eyebrow="Katılım" title="Kimler katılabilir?" id="kimler-katilabilir" />
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.audience.map((a) => (
                <li key={a} className="card-ak p-4 flex gap-3 text-[15px] text-ink">
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading
              eyebrow="Müfredat"
              title="Müfredat ve modüller"
              id="mufredat"
              lead={`${p.modules.length} modül · ${p.durationLabel}`}
            />
            <ol className="mt-7 space-y-3">
              {p.modules.map((m, i) => (
                <li key={m.title} className="card-ak p-5 flex gap-4">
                  <span className="module-no">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-navy text-[15.5px]">{m.title}</span>
                    <span className="block text-ink-soft text-[14.5px] leading-relaxed mt-1.5">
                      {m.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <SectionHeading eyebrow="Kazanımlar" title="Program kazanımları" id="kazanimlar" />
            <ul className="mt-6 space-y-3">
              {p.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15.5px] text-ink leading-relaxed">
                  <CheckCircle2 size={19} className="text-gold shrink-0 mt-0.5" />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading eyebrow="Belge" title="Sertifika ve belge" id="belge" />
            <div className="mt-6">
              <CredentialNote />
            </div>
          </section>

          {/* İç linkleme — diğer program + kardeş site köprüsü */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link href={`/${other.slug}`} className="card-ak p-6 hover:border-navy/30 transition-colors">
              <span className="eyebrow-ak">Diğer Program</span>
              <h3 className="font-display text-lg font-semibold text-navy mt-2">{other.title}</h3>
              <p className="text-ink-soft text-[14px] mt-2 leading-relaxed">{other.tagline}</p>
              <span className="inline-flex items-center gap-1.5 text-navy font-semibold text-[13.5px] mt-4">
                İnceleyin <ArrowRight size={14} />
              </span>
            </Link>
            <a
              href={SITE.sisters.suluk.url}
              target="_blank"
              rel="noopener"
              className="card-ak p-6 bg-navy-tint/50 hover:border-navy/30 transition-colors"
            >
              <span className="eyebrow-ak">Uygulama / Malzeme</span>
              <h3 className="font-display text-lg font-semibold text-navy mt-2">
                Seans veya malzeme mi arıyorsunuz?
              </h3>
              <p className="text-ink-soft text-[14px] mt-2 leading-relaxed">
                Uygulama ve ürün talepleri kardeş sitemiz konyahacamat.net üzerinden yürütülür.
              </p>
              <span className="inline-flex items-center gap-1.5 text-navy font-semibold text-[13.5px] mt-4">
                konyahacamat.net <ExternalLink size={14} />
              </span>
            </a>
          </section>
        </div>
      </div>

      <FaqSection items={p.faqs} title={`${p.title} — Sıkça sorulan sorular`} />

      <CtaBand
        title={`${p.title} için kontenjan bilgisi alın`}
        waText={`Merhaba, ${p.courseName} için kontenjan ve kayıt bilgisi almak istiyorum.`}
      />
    </>
  );
}
