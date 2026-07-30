import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE, yearsExp } from "@/data/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Hakkımızda",
  description:
    "Ebusadullah Akademi; hacamat ve sülük terapisi alanında 1994'ten bu yana süren saha tecrübesini eğitim programlarına dönüştüren Konya merkezli bir uygulama akademisidir.",
  path: "/hakkimizda",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Kurum"
        title="Ebusadullah Akademi hakkında"
        lead="Saha tecrübesini sistemli bir müfredata dönüştüren, Konya merkezli bir uygulama akademisiyiz."
        crumb={[{ name: "Hakkımızda", path: "/hakkimizda" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <SectionHeading eyebrow="Kimiz?" title="Bir uygulama geleneğinden doğan akademi" />
              <div className="mt-5 space-y-4 text-ink-soft leading-relaxed text-[15.5px]">
                <p>
                  Ebusadullah Akademi, {SITE.founded} yılında başlayan hacamat ve sülük
                  terapisi uygulamalarının {yearsExp()} yıllık birikimi üzerine kurulmuştur.
                  Kuruluş amacımız basit: bu alanda öğrenmek isteyen kişilerin bilgiyi
                  kulaktan dolma değil, sistemli ve sınırları belli bir müfredattan almasını
                  sağlamak.
                </p>
                <p>
                  Eğitimlerimiz, teorik modüllerin çevrimiçi işlendiği ve uygulamanın
                  Konya&apos;daki merkezimizde yüz yüze yapıldığı karma bir yapıdadır.
                  Uygulama oturumları küçük gruplarla yürütülür; her kursiyerin eğitmen
                  gözetiminde pratik yapması esastır.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="İlkelerimiz" title="Eğitimde neyi savunuyoruz?" />
              <ul className="mt-6 space-y-4">
                {[
                  {
                    t: "Hijyen tartışmaya kapalıdır",
                    d: "Tek kullanımlık malzeme, steril çalışma alanı ve doğru atık yönetimi; müfredatın vazgeçilmez, ayrı başlıklı modülleridir.",
                  },
                  {
                    t: "Sınırları öğretmeyen eğitim eksiktir",
                    d: "Uygulamanın yapılmaması gereken durumlar, risk grupları ve hekime yönlendirme refleksi tekniğin kendisi kadar önemlidir.",
                  },
                  {
                    t: "Abartılı vaat yok",
                    d: "Hacamat ve sülük geleneksel ve tamamlayıcı uygulamalardır; tedavi garantisi verilmez, hekim tedavisinin yerine konmaz. Eğitimde de bu dil kullanılır.",
                  },
                  {
                    t: "Belgenin kapsamı açıkça söylenir",
                    d: "Verdiğimiz belge kurum sertifikasıdır; resmî yetki veya akreditasyon iddiası taşımaz ve bunu her aşamada net biçimde belirtiriz.",
                  },
                ].map((x) => (
                  <li key={x.t} className="card-ak p-5">
                    <h3 className="font-semibold text-navy">{x.t}</h3>
                    <p className="text-ink-soft text-[14.5px] leading-relaxed mt-1.5">{x.d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Ekosistem" title="Üç site, üç ayrı görev" />
              <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
                Aynı kurumun farklı ihtiyaçlara hizmet eden siteleri vardır. Bu site
                yalnızca <strong className="text-ink">eğitim</strong> içindir: programlar,
                müfredat, eğitmen ve sertifika süreçleri burada anlatılır. Uygulama
                (seans) ve malzeme talepleri ise kardeş sitelerimiz üzerinden yürür.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={SITE.sisters.suluk.url}
                  target="_blank"
                  rel="noopener"
                  className="card-ak p-5 hover:border-navy/30 transition-colors"
                >
                  <span className="eyebrow-ak">Uygulama & Ürün</span>
                  <h3 className="font-semibold text-navy mt-2">konyahacamat.net</h3>
                  <p className="text-ink-soft text-[14px] mt-1.5 leading-relaxed">
                    Sülük terapisi, malzeme temini ve randevu.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-navy text-[13.5px] font-semibold mt-3">
                    Siteye gidin <ExternalLink size={13} />
                  </span>
                </a>
                <div className="card-ak p-5 opacity-70">
                  <span className="eyebrow-ak">Hacamat Uygulama</span>
                  <h3 className="font-semibold text-navy mt-2">konyahacamat.com</h3>
                  <p className="text-ink-soft text-[14px] mt-1.5 leading-relaxed">
                    Hacamat seansları için ayrı sitemiz yakında yayında olacak.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card-ak p-6">
              <span className="eyebrow-ak">Künye</span>
              <dl className="mt-4 space-y-3 text-[14.5px]">
                {[
                  { l: "Kurum", v: SITE.legalName },
                  { l: "Kuruluş", v: String(SITE.founded) },
                  { l: "Merkez", v: `${SITE.address.district}/${SITE.address.city}` },
                  { l: "Çalışma saatleri", v: SITE.hours },
                ].map((r) => (
                  <div key={r.l} className="border-b border-line-soft pb-3 last:border-0 last:pb-0">
                    <dt className="text-ink-soft text-[13px]">{r.l}</dt>
                    <dd className="text-navy font-medium mt-0.5">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link href="/egitmen" className="card-ak p-6 block bg-navy-tint/50 hover:border-navy/30 transition-colors">
              <span className="eyebrow-ak">Eğitmen</span>
              <h3 className="font-display text-lg font-semibold text-navy mt-2">
                Ebusadullah Hoca
              </h3>
              <p className="text-ink-soft text-[14px] mt-1.5 leading-relaxed">
                Kurucu eğitmenin yaklaşımı ve uzmanlık alanları.
              </p>
            </Link>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
