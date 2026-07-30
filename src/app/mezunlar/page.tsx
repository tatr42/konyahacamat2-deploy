import Link from "next/link";
import { MapPin, Wifi, GraduationCap, ExternalLink } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import { PROVINCES } from "@/data/tr-provinces";
import { TESTIMONIALS } from "@/data/graduates";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Mezun Ağı ve Katılım Haritası",
  description:
    "Ebusadullah Akademi programlarına Türkiye'nin dört bir yanından katılım sağlanır. Teorik dersler çevrimiçi, uygulama Konya'da yüz yüze yapılır.",
  path: "/mezunlar",
});

/**
 * Mezun ağı sayfası — şehir sinyalini DOORWAY ÜRETMEDEN veren tek sayfa.
 *
 * Kanibalizasyon kuralı: il listesi burada sadece kapsam anlatımıdır;
 * il başına ayrı sayfa/route ÜRETİLMEZ ve iller linklenmez. İl bazlı kurs
 * sorguları kardeş domain konyahacamat.net'in mevcut silosuna aittir.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Katılım Haritası"
        title="Mezun ağımız Türkiye geneline yayılır"
        lead="Teorik modüller çevrimiçi yürütüldüğü için programlarımıza her ilden katılım sağlanabilir; uygulama kampı ise Konya'daki merkezimizde yüz yüze yapılır."
        crumb={[{ name: "Mezunlar", path: "/mezunlar" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Wifi size={20} />,
                t: "Her ilden katılım",
                d: "Teorik dersler çevrimiçi işlendiği için programa katılmak üzere Konya'da yaşamak gerekmez.",
              },
              {
                icon: <MapPin size={20} />,
                t: "Uygulama Konya'da",
                d: `Uygulama kampı ${SITE.address.district}/${SITE.address.city} adresindeki merkezimizde, eğitmen gözetiminde yapılır.`,
              },
              {
                icon: <GraduationCap size={20} />,
                t: `${SITE.graduates}+ kursiyer`,
                d: `${SITE.founded}'ten bu yana süren eğitim geçmişimizde farklı şehirlerden katılımcılar yer aldı.`,
              },
            ].map((x) => (
              <div key={x.t} className="card-ak p-6">
                <span className="w-10 h-10 rounded-md bg-navy-tint text-navy flex items-center justify-center mb-4">
                  {x.icon}
                </span>
                <h2 className="font-semibold text-navy">{x.t}</h2>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <SectionHeading
              eyebrow="Kapsam"
              title="Katılım sağlanabilen iller"
              lead="Aşağıdaki illerin tamamından programlarımıza çevrimiçi katılım mümkündür. Uygulama modülü için Konya'ya kısa bir ziyaret planlanır."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {PROVINCES.map((p) => (
                <li
                  key={p.slug}
                  className="px-3 py-1.5 rounded-md border border-line bg-surface text-[13px] text-ink-soft"
                >
                  {p.name}
                </li>
              ))}
            </ul>
            <p className="text-ink-soft/80 text-[13px] leading-relaxed mt-5 max-w-3xl">
              Not: Bu liste katılım kapsamını gösterir; her ilde şubemiz olduğu
              anlamına gelmez. Tek merkezimiz Konya Meram&apos;dadır.
            </p>
          </div>

          {/* Mezun görüşleri — müşteri metni gelmeden bölüm hiç render edilmez */}
          {TESTIMONIALS.length > 0 && (
            <div className="mt-14">
              <SectionHeading eyebrow="Mezun Görüşleri" title="Programı tamamlayanlar ne diyor?" />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                {TESTIMONIALS.map((t) => (
                  <blockquote key={t.name} className="card-ak p-6">
                    <p className="text-ink leading-relaxed text-[15px]">“{t.quote}”</p>
                    <footer className="mt-4 text-[13.5px] text-ink-soft">
                      <strong className="text-navy">{t.name}</strong> · {t.city} · {t.program}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Kardeş site köprüsü — il bazlı kurs sorguları oraya aittir */}
          <div className="mt-12 card-ak p-6 lg:p-7 bg-navy-tint/50 max-w-3xl">
            <h2 className="font-display text-lg font-semibold text-navy">
              Şehrinizdeki uygulama ve malzeme talepleri
            </h2>
            <p className="text-ink-soft text-[15px] leading-relaxed mt-2">
              Seans, ürün ve il bazlı hizmet bilgileri kardeş sitemizde ayrıntılı olarak
              yer alır. Eğitim dışındaki tüm talepler için oraya göz atabilirsiniz.
            </p>
            <a
              href={SITE.sisters.suluk.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-navy font-semibold text-[14px] mt-4 hover:text-gold transition-colors"
            >
              konyahacamat.net <ExternalLink size={14} />
            </a>
          </div>

          <div className="mt-8">
            <Link href="/sertifika-dogrulama" className="btn-ghost">
              Sertifika doğrulama sayfası
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Siz de mezun ağımıza katılın"
        lead="Dönem tarihleri ve kontenjan bilgisi için bize yazın; hangi programın uygun olduğunu birlikte belirleyelim."
      />
    </>
  );
}
