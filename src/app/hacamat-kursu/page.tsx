import Link from "next/link";
import { ExternalLink, MapPin, Wifi, GraduationCap, ShieldCheck } from "lucide-react";

import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import { PROVINCES } from "@/data/tr-provinces";
import { PROGRAMS } from "@/data/programs";
import { therapyServiceLink, hacamatServiceLink } from "@/data/ecosystem";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CredentialNote from "@/components/CredentialNote";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "İl İl Hacamat Kursu ve Sülük Eğitimi",
  description:
    "Türkiye'nin 81 ilinden katılabileceğiniz hacamat ve sülük terapisi eğitimi. Teorik modüller çevrimiçi, uygulama Konya'da yüz yüze. İlinizi seçerek yerel koşullara göre hazırlanmış sayfaya ulaşın.",
  path: "/hacamat-kursu",
});

/** Bölge sırası — coğrafi mantıkla, alfabetik değil. */
const REGION_ORDER = [
  "İç Anadolu",
  "Marmara",
  "Ege",
  "Akdeniz",
  "Karadeniz",
  "Doğu Anadolu",
  "Güneydoğu Anadolu",
];

/**
 * İL KURS HUB'I — silonun giriş kapısı.
 *
 * Hizmet niyetini kardeş domaine devreden bağlamsal link BU SAYFADA durur;
 * il sayfalarında tekrarlanmaz. Gerekçe: aynı çıpa metniyle 81 sayfadan
 * çıkan çapraz link, site geneli link şeması ayak izi üretir (bkz.
 * `data/ecosystem.ts` kural 2).
 */
export default function Page() {
  const byRegion = REGION_ORDER.map((region) => ({
    region,
    provinces: PROVINCES.filter((p) => p.region === region).sort((a, b) =>
      a.name.localeCompare(b.name, "tr"),
    ),
  })).filter((g) => g.provinces.length > 0);

  const therapy = therapyServiceLink();
  const hacamat = hacamatServiceLink();

  return (
    <>
      <PageHero
        eyebrow="81 İl · Katılım Kapsamı"
        title="İl il hacamat kursu ve sülük eğitimi"
        lead="Teorik modüller çevrimiçi yürütüldüğü için programlarımıza Türkiye'nin her ilinden katılabilirsiniz. Uygulama kampı ise Konya'daki merkezimizde, eğitmen gözetiminde yüz yüze yapılır."
        crumb={[{ name: "Hacamat Kursu", path: "/hacamat-kursu" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Wifi size={20} />,
                t: "Teorik bölüm çevrimiçi",
                d: "Programa katılmak için Konya'da yaşamanız gerekmez; dersleri bulunduğunuz ilden izlersiniz.",
              },
              {
                icon: <MapPin size={20} />,
                t: "Uygulama Konya'da",
                d: `Yüz yüze uygulama kampı ${SITE.address.district}/${SITE.address.city} adresindeki merkezimizde yapılır.`,
              },
              {
                icon: <ShieldCheck size={20} />,
                t: "Kurum sertifikası",
                d: "Program sonunda düzenlenen belge kurumumuza aittir; resmî yetki ya da akreditasyon iddiası taşımaz.",
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
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-canvas-deep border-y border-line">
        <div className="container-ak max-w-3xl">
          <SectionHeading
            eyebrow="Neden İl Sayfası?"
            title="Aynı program, farklı yerel koşullar"
          />
          <div className="mt-5 space-y-4 text-ink-soft leading-relaxed text-[15.5px]">
            <p>
              Program içeriği her il için aynıdır; değişen, uygulamanın yapılacağı
              yerin koşullarıdır. Tıbbi sülük canlı bir organizmadır ve bulunduğu suyun
              sıcaklığına bağımlı çalışır. Erzurum&apos;da bir uygulayıcının çözmesi gereken
              sorun suyun donma noktasına yaklaşmasıyken, Şanlıurfa&apos;da aynı sorun tam
              tersidir: ısınan suda çözünmüş oksijenin azalması. Rize&apos;de ise belirleyici
              olan sıcaklık değil, steril malzemenin nem çekmesidir.
            </p>
            <p>
              Bu yüzden il sayfalarımız birbirinin kopyası değildir. Her sayfa; o ilin
              iklim rejimine göre farklı bir kontrol listesi, mevsime göre farklı bir
              çalışma takvimi ve Konya&apos;ya olan mesafesine göre farklı bir kamp katılım
              planı taşır. Şehrin şifa geleneğine ve mesleki dokusuna dair bağlam da
              buna eklenir.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-ak">
          <SectionHeading
            eyebrow="İl Seçimi"
            title="Bulunduğunuz ili seçin"
            lead="Her il sayfasında, o ilde uygulama yapacak bir kursiyerin bilmesi gereken yerel koşullar ayrıca ele alınır."
          />
          <div className="mt-10 space-y-10">
            {byRegion.map((g) => (
              <div key={g.region}>
                <h3 className="font-display text-lg font-semibold text-navy flex items-center gap-2.5">
                  <span className="w-1 h-5 bg-gold rounded-full" />
                  {g.region}
                  <span className="text-[13px] font-sans font-normal text-ink-soft/70">
                    ({g.provinces.length} il)
                  </span>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {g.provinces.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/hacamat-kursu/${p.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-line bg-surface text-[14px] text-navy hover:border-navy hover:bg-navy-tint transition-colors"
                      >
                        <MapPin size={14} className="text-gold" />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-canvas-deep border-y border-line">
        <div className="container-ak">
          <SectionHeading eyebrow="Programlar" title="İki eğitim programı" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROGRAMS.map((prog) => (
              <Link key={prog.slug} href={`/${prog.slug}`} className="card-ak p-6 block">
                <span className="w-10 h-10 rounded-md bg-navy-tint text-navy flex items-center justify-center mb-4">
                  <GraduationCap size={20} />
                </span>
                <h3 className="font-semibold text-navy">{prog.title}</h3>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">{prog.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <CredentialNote />
          </div>
        </div>
      </section>

      {/* Hizmet niyeti devri — YALNIZCA bu sayfada, il sayfalarında değil */}
      {(therapy || hacamat) && (
        <section className="py-14 lg:py-20">
          <div className="container-ak max-w-3xl">
            <SectionHeading eyebrow="Doğru Adres" title="Eğitim mi arıyorsunuz, uygulama mı?" />
            <div className="mt-6 space-y-5">
              {[therapy, hacamat].map(
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
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
