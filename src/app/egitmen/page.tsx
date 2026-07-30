import Link from "next/link";
import { Award, BookOpen, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE, yearsExp } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Eğitmen — Ebusadullah Hoca",
  description:
    "Ebusadullah Hoca: 1994'ten bu yana hacamat ve sülük terapisi uygulayan, 1200'den fazla kursiyere eğitim vermiş kurucu eğitmen. Eğitim yaklaşımı ve müfredattaki rolü.",
  path: "/egitmen",
});

/**
 * Eğitmen sayfası — E-E-A-T'nin "kim öğretiyor?" ayağı.
 * Person JSON-LD layout'ta global basıldığı için burada tekrar edilmez.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Kurucu Eğitmen"
        title="Ebusadullah Hoca"
        lead={`${SITE.founded} yılından bu yana hacamat ve sülük terapisi uygulayan, ${SITE.graduates}'den fazla kursiyere eğitim vermiş kurucu eğitmen.`}
        crumb={[{ name: "Eğitmen", path: "/egitmen" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <SectionHeading eyebrow="Yaklaşım" title="Sahada öğrenilen, sınıfta aktarılan bilgi" />
              <div className="mt-5 space-y-4 text-ink-soft leading-relaxed text-[15.5px]">
                <p>
                  {SITE.founded} yılında başlayan uygulama pratiği, bugün Akademi&apos;nin
                  müfredatının omurgasını oluşturuyor. Eğitim programları kitaptan
                  aktarılan teorik başlıklardan değil; yıllar içinde karşılaşılan gerçek
                  durumlardan, yapılan hatalardan ve bu hataların nasıl önleneceğinden
                  besleniyor.
                </p>
                <p>
                  Derslerde tekniğin kendisi kadar sınırları da anlatılır: hangi danışana
                  uygulama yapılmaz, hangi belirti hekime yönlendirmeyi gerektirir, hijyen
                  zinciri nerede kırılır. Bir uygulayıcının en değerli yetkinliği, ne zaman
                  &quot;bu iş bende değil&quot; diyebildiğidir.
                </p>
                <p>
                  Uygulama oturumları küçük gruplarla yürütülür; her kursiyerin eğitmen
                  gözetiminde birebir pratik yapması ve hatasının anında düzeltilmesi esastır.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Uzmanlık Alanları" title="Neyi öğretiyor?" />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <BookOpen size={18} />, t: "Hacamat (kupa terapisi)", d: "Kuru ve yaş uygulama, nokta haritası, cilt tepkilerinin okunması." },
                  { icon: <Users size={18} />, t: "Sülük terapisi", d: "Tıbbi sülük biyolojisi, saklama koşulları, seans yönetimi." },
                  { icon: <ShieldCheck size={18} />, t: "Hijyen ve steril çalışma", d: "Tek kullanımlık malzeme disiplini, çapraz bulaş önleme, atık yönetimi." },
                  { icon: <Award size={18} />, t: "Uygulayıcı etiği", d: "Danışan iletişimi, dürüst tanıtım dili, mesleki sınırlar." },
                ].map((x) => (
                  <div key={x.t} className="card-ak p-5">
                    <span className="w-9 h-9 rounded-md bg-navy-tint text-navy flex items-center justify-center mb-3">
                      {x.icon}
                    </span>
                    <h3 className="font-semibold text-navy text-[15px]">{x.t}</h3>
                    <p className="text-ink-soft text-[14px] leading-relaxed mt-1.5">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card-ak p-6">
              <span className="eyebrow-ak">Özet</span>
              <dl className="mt-4 space-y-4">
                {[
                  { l: "Başlangıç", v: `${SITE.founded}` },
                  { l: "Saha tecrübesi", v: `${yearsExp()}+ yıl` },
                  { l: "Kursiyer", v: `${SITE.graduates}+` },
                  { l: "Merkez", v: `${SITE.address.district}/${SITE.address.city}` },
                ].map((r) => (
                  <div key={r.l} className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-3 last:border-0 last:pb-0">
                    <dt className="text-ink-soft text-[13.5px]">{r.l}</dt>
                    <dd className="font-display text-navy font-semibold">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card-ak p-6 bg-navy-tint/50">
              <span className="eyebrow-ak">Programlar</span>
              <ul className="mt-4 space-y-3">
                {PROGRAMS.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="flex items-center justify-between gap-3 text-navy font-semibold text-[14.5px] hover:text-gold transition-colors"
                    >
                      {p.title}
                      <ArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Eğitmenle ön görüşme yapın"
        lead="Hangi programın size uygun olduğunu konuşmak için kısa bir ön görüşme yeterli."
        waText="Merhaba, eğitim programları için ön görüşme yapmak istiyorum."
      />
    </>
  );
}
