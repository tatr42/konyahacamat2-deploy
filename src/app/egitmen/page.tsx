import Link from "next/link";
import Image from "next/image";
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
              {/* Portre bilinçli olarak KÜÇÜK: sayfanın konusu kişi kültü değil,
                  aktarılan yöntem. Metnin yanına yerleşir, metni ezmez. */}
              <figure className="float-none sm:float-right sm:ml-6 mb-5 sm:mb-3 mt-5 w-40 sm:w-44 shrink-0">
                <Image
                  src="/img/egitmen-portre.webp"
                  alt="Ebusadullah Hoca — Ebusadullah Akademi kurucu eğitmeni"
                  width={533}
                  height={660}
                  priority
                  sizes="176px"
                  className="w-full h-auto rounded-lg border border-line object-cover"
                />
                <figcaption className="text-[11.5px] text-ink-soft leading-snug mt-2 text-center">
                  Ebusadullah Hoca
                </figcaption>
              </figure>
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

            {/* Arşiv — 1994'ten bu yana süren pratiğin somut kanıtı.
                Görseller düşük çözünürlüklü olduğu için KÜÇÜK kullanılır;
                büyütmek kalite kaybını görünür kılardı. */}
            <div className="clear-both">
              <SectionHeading
                eyebrow="Arşivden"
                title="Yılların uygulama pratiği"
                lead="Aşağıdaki kareler, Akademi'nin müfredatını besleyen saha tecrübesinin ilk yıllarından."
              />
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { src: "/img/arsiv-uygulama-1.webp", w: 469, h: 532, alt: "Arşiv: Ebusadullah Hoca'nın erken dönem hacamat uygulaması" },
                  { src: "/img/arsiv-sirt-uygulama.webp", w: 240, h: 254, alt: "Arşiv: sırt bölgesine hacamat uygulaması" },
                  { src: "/img/arsiv-bas-uygulama.webp", w: 516, h: 254, alt: "Arşiv: baş bölgesi hacamat uygulaması" },
                  { src: "/img/arsiv-uygulama-2.webp", w: 853, h: 396, alt: "Arşiv: uygulama sırasında eğitmen ve danışan" },
                ].map((img) => (
                  <figure key={img.src} className="rounded-md overflow-hidden border border-line bg-canvas-deep">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      sizes="(max-width: 640px) 45vw, 160px"
                      className="w-full h-28 sm:h-32 object-cover"
                    />
                  </figure>
                ))}
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
            {/* Eğitmenin KENDİ aldığı belge — kurumumuzun akredite olduğu
                anlamına GELMEZ; alt yazıda bu ayrım açıkça yapılır. */}
            <figure className="card-ak p-5">
              <span className="eyebrow-ak">Eğitmenin Belgesi</span>
              <Image
                src="/img/egitmen-sertifika-2012.webp"
                alt="Eğitmenin 2012 yılında aldığı hacamat (cupping) eğitim sertifikası"
                width={785}
                height={1095}
                sizes="(max-width: 1024px) 60vw, 300px"
                className="w-full h-auto rounded-md border border-line mt-3"
              />
              <figcaption className="text-[12.5px] text-ink-soft leading-relaxed mt-3">
                Eğitmenimizin 2012&apos;de tamamladığı hacamat (cupping) eğitimine ait
                belge. Bu belge <strong className="text-ink">eğitmene aittir</strong>;
                Akademi&apos;nin herhangi bir kurum tarafından akredite edildiği anlamına
                gelmez.
              </figcaption>
            </figure>

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
