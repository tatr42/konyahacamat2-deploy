import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  MapPin,
  Wifi,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";
import { SITE, yearsExp } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import { getAllPosts, formatDate } from "@/lib/mdx";
import { faqPageSchema } from "@/lib/schema";
import Jsonld from "@/components/Jsonld";
import SectionHeading from "@/components/SectionHeading";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import CredentialNote from "@/components/CredentialNote";
import MotifDivider from "@/components/MotifDivider";

/**
 * ANA SAYFA — akademi/eğitim niyeti.
 *
 * Kanibalizasyon notu: sayfa hacamat ve sülüğün NE OLDUĞUNU anlatmaz
 * (o içerik kardeş domainlerin işi); burada anlatılan bu alanların NASIL
 * ÖĞRENİLECEĞİDİR. Hizmet/randevu arayan kullanıcı kardeş siteye yönlendirilir.
 */

const HOME_FAQS = [
  {
    q: "Ebusadullah Akademi nedir?",
    a: `Ebusadullah Akademi, hacamat (kupa terapisi) ve sülük terapisi alanında eğitim veren Konya merkezli bir uygulama akademisidir. ${SITE.founded} yılından bu yana süren saha tecrübesiyle teorik dersleri çevrimiçi, uygulama modülünü ise Konya'daki merkezde yüz yüze yürütür.`,
  },
  {
    q: "Hacamat eğitimi ile sülük eğitimi arasındaki fark nedir?",
    a: "Hacamat eğitimi kuru ve yaş kupa uygulamasını, nokta haritasını ve hijyen disiplinini kapsar. Sülük eğitimi ise canlı materyalle çalışmayı; tıbbi sülüğün biyolojisini, saklama koşullarını, uygulama ve atık yönetimini konu alır. İki program bağımsız alınabilir.",
  },
  {
    q: "Eğitimler tamamen uzaktan mı yapılıyor?",
    a: "Teorik modüller çevrimiçidir ve tekrar izlenebilir. Uygulama modülü Konya'daki merkezimizde yüz yüze yapılır; el becerisi gerektiren bölüm uzaktan tamamlanamaz.",
  },
  {
    q: "Eğitim sonunda verilen belge resmî bir yetki sağlıyor mu?",
    a: "Hayır. Verilen belge Akademi'nin kendi kurum sertifikasıdır; resmî yetki, akreditasyon veya sağlık mesleği icra hakkı ifade etmez. Bunu program boyunca açıkça anlatırız.",
  },
  {
    q: "Uygulama yaptırmak istiyorum, eğitim değil. Ne yapmalıyım?",
    a: "Bu site yalnızca eğitim içindir. Sülük terapisi ve malzeme talepleriniz için kardeş sitemiz konyahacamat.net üzerinden bize ulaşabilir ya da doğrudan telefonla randevu alabilirsiniz.",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Jsonld data={faqPageSchema(HOME_FAQS)} />

      {/* ── HERO ── */}
      <section className="bg-navy text-white bg-grid-navy">
        <div className="container-ak py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow-ak mb-4">
                <BadgeCheck size={14} />
                Konya merkezli uygulama akademisi
              </span>
              <h1 className="font-display text-[2.1rem] sm:text-4xl lg:text-[3.25rem] leading-[1.15] font-semibold">
                Hacamat ve sülük terapisini
                <span className="text-gold-soft"> kaynağından öğrenin</span>
              </h1>
              <div className="rule-gold mt-6" />
              <p className="mt-6 text-white/75 leading-relaxed text-[15.5px] lg:text-[17px] max-w-2xl">
                {SITE.founded}&apos;ten bu yana süren saha tecrübesiyle hazırlanmış
                hacamat ve sülük eğitim programları. Teorik modüller çevrimiçi,
                uygulama Konya&apos;daki merkezimizde yüz yüze; program sonunda
                kurum sertifikası düzenlenir.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/hacamat-egitimi" className="btn-ghost !bg-white !text-navy !border-white">
                  <GraduationCap size={17} />
                  Hacamat Eğitimi
                </Link>
                <Link href="/suluk-egitimi" className="btn-ghost !bg-transparent !text-white !border-white/30 hover:!bg-white/10">
                  Sülük Eğitimi
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { n: `${yearsExp()}+`, l: "Yıl saha tecrübesi" },
                  { n: `${SITE.graduates}+`, l: "Kursiyer" },
                  { n: "2", l: "Uzmanlık programı" },
                ].map((s) => (
                  <div key={s.l} className="border-l-2 border-gold/60 pl-3">
                    <dt className="font-display text-2xl lg:text-3xl font-semibold text-white">{s.n}</dt>
                    <dd className="text-[11.5px] text-white/60 leading-snug mt-1">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Görsel + program kartı */}
            <div className="lg:col-span-5 space-y-5">
              <figure className="rounded-lg overflow-hidden border border-white/15">
                <Image
                  src="/img/hacamat-coklu-kupa.webp"
                  alt="Eldivenli uygulayıcı tarafından sırt bölgesine yerleştirilmiş hacamat kupaları"
                  width={864}
                  height={486}
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="w-full h-auto object-cover"
                />
              </figure>

              <div className="bg-white/[0.06] border border-white/15 rounded-lg p-7 backdrop-blur-sm">
                <span className="eyebrow-ak mb-4">Program Yapısı</span>
                <ul className="space-y-5">
                  {[
                    { icon: <Wifi size={18} />, t: "Çevrimiçi teorik modüller", d: "Kayıtlı dersler, kendi hızınızda tekrar" },
                    { icon: <MapPin size={18} />, t: "Konya'da uygulama kampı", d: "Eğitmen gözetiminde birebir uygulama" },
                    { icon: <ShieldCheck size={18} />, t: "Hijyen ve güvenlik disiplini", d: "Steril çalışma, atık yönetimi, sınırlar" },
                    { icon: <BadgeCheck size={18} />, t: "Kurum sertifikası", d: "Doğrulanabilir belge numarası" },
                  ].map((r) => (
                    <li key={r.t} className="flex gap-4">
                      <span className="w-9 h-9 rounded-md bg-gold/15 text-gold-soft flex items-center justify-center shrink-0">
                        {r.icon}
                      </span>
                      <span>
                        <span className="block font-semibold text-white text-[15px]">{r.t}</span>
                        <span className="block text-white/60 text-[13px] mt-0.5">{r.d}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motif — hero ile programlar arasındaki tek geçiş şeridi */}
      <MotifDivider />

      {/* ── PROGRAMLAR ── */}
      <section className="py-16 lg:py-24">
        <div className="container-ak">
          <SectionHeading
            eyebrow="Eğitim Programları"
            title="İki uzmanlık alanı, tek disiplin: doğru ve güvenli uygulama"
            lead="Her iki program da teorik temel, hijyen disiplini ve eğitmen gözetiminde uygulama olmak üzere aynı omurga üzerine kurulur."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROGRAMS.map((p) => (
              <article key={p.slug} className="card-ak p-7 lg:p-8 flex flex-col">
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-navy">
                  {p.title}
                </h3>
                <p className="text-gold text-[13px] font-semibold mt-2">{p.tagline}</p>
                <p className="text-ink-soft leading-relaxed text-[15px] mt-4 flex-1">
                  {p.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {p.modules.slice(0, 4).map((m) => (
                    <li key={m.title} className="flex gap-2.5 text-[14px] text-ink">
                      <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
                      {m.title}
                    </li>
                  ))}
                  <li className="text-[13px] text-ink-soft pl-3.5">
                    + {p.modules.length - 4} modül daha
                  </li>
                </ul>
                <Link
                  href={`/${p.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-navy font-semibold text-[14px] hover:text-gold transition-colors"
                >
                  Program detayını inceleyin
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SÜREÇ ── */}
      <section className="py-16 lg:py-24 bg-canvas-deep border-y border-line">
        <div className="container-ak">
          <SectionHeading
            eyebrow="Nasıl İlerler?"
            title="Kayıttan sertifikaya dört adım"
          />
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: "Ön görüşme", d: "Hedefinizi ve geçmişinizi konuşur, hangi programın uygun olduğunu birlikte belirleriz." },
              { t: "Teorik modüller", d: "Çevrimiçi dersleri kendi hızınızda tamamlar, soru-cevap oturumlarına katılırsınız." },
              { t: "Uygulama kampı", d: "Konya'daki merkezimizde eğitmen gözetiminde birebir uygulama yaparsınız." },
              { t: "Değerlendirme & belge", d: "Yeterlilik değerlendirmesinin ardından kurum sertifikanız düzenlenir." },
            ].map((s, i) => (
              <li key={s.t} className="card-ak p-6">
                <span className="module-no mb-4">{i + 1}</span>
                <h3 className="font-semibold text-navy mt-1">{s.t}</h3>
                <p className="text-ink-soft text-[14px] leading-relaxed mt-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── NEDEN AKADEMİ + BELGE ŞEFFAFLIĞI ── */}
      <section className="py-16 lg:py-24">
        <div className="container-ak grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Neden Ebusadullah Akademi"
              title="Kitaptan değil, sahadan gelen bir müfredat"
              lead={`${SITE.founded} yılından bu yana süren uygulama pratiği, eğitimin her modülüne gerçek vaka deneyimi olarak yansır.`}
            />
            {/* Arşiv şeridi — "1994'ten beri" iddiasının görsel kanıtı.
                Kareler küçük: düşük çözünürlüklü arşiv malzemesi. */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { src: "/img/arsiv-uygulama-1.webp", w: 469, h: 532, alt: "Arşiv: erken dönem hacamat uygulaması" },
                { src: "/img/arsiv-bas-uygulama.webp", w: 516, h: 254, alt: "Arşiv: baş bölgesi hacamat uygulaması" },
                { src: "/img/arsiv-sirt-uygulama.webp", w: 240, h: 254, alt: "Arşiv: sırt bölgesi hacamat uygulaması" },
              ].map((img) => (
                <figure key={img.src} className="rounded-md overflow-hidden border border-line bg-canvas-deep">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    sizes="(max-width: 640px) 30vw, 150px"
                    className="w-full h-24 object-cover"
                  />
                </figure>
              ))}
            </div>

            <ul className="mt-8 space-y-5">
              {[
                { icon: <Users size={19} />, t: `${SITE.graduates}+ kursiyer`, d: "Farklı illerden katılımcılarla yürütülmüş program geçmişi." },
                { icon: <ShieldCheck size={19} />, t: "Hijyen önce gelir", d: "Steril çalışma, tek kullanımlık malzeme ve atık yönetimi ayrı modüldür." },
                { icon: <BookOpen size={19} />, t: "Sınırları anlatan eğitim", d: "Uygulanmaması gereken durumlar ve hekime yönlendirme refleksi müfredatın parçasıdır." },
                { icon: <CalendarDays size={19} />, t: "Küçük gruplar", d: "Uygulama oturumlarında herkesin birebir pratik yapabilmesi esastır." },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <span className="w-10 h-10 rounded-md bg-navy-tint text-navy flex items-center justify-center shrink-0">
                    {f.icon}
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{f.t}</span>
                    <span className="block text-ink-soft text-[14.5px] leading-relaxed mt-1">{f.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:pt-14">
            <CredentialNote />
            {/* Hizmet niyetini kardeş siteye devret — kanibalizasyonu önleyen köprü.
                Anchor metinleri hizmet niyetlidir; bu sayfa o sorgularda
                yarışmaz, niyeti sahibine yönlendirir. */}
            <div className="card-ak p-6 lg:p-7 bg-navy-tint/60">
              <h3 className="font-semibold text-navy mb-2">
                Eğitim değil, uygulama mı arıyorsunuz?
              </h3>
              <p className="text-ink-soft leading-relaxed text-[15px]">
                Bu site yalnızca eğitim programlarımızı anlatır. Aynı kurumun
                uygulama tarafı kardeş sitemizde yürür:
              </p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {[
                  { href: `${SITE.sisters.suluk.url}/hizmetler/suluk`, label: "Sülük terapisi (hirudoterapi) seansı" },
                  { href: `${SITE.sisters.suluk.url}/hizmetler/hacamat`, label: "Kuru ve yaş hacamat uygulaması" },
                  { href: `${SITE.sisters.suluk.url}/suluk-satisi`, label: "Tıbbi sülük satışı" },
                  { href: `${SITE.sisters.suluk.url}/kupa-malzemeleri`, label: "Hacamat kupası ve malzemeleri" },
                ].map((l) => (
                  <li key={l.href} className="flex gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="text-navy font-medium underline underline-offset-2 hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      {posts.length > 0 && (
        <section className="py-16 lg:py-24 bg-canvas-deep border-y border-line">
          <div className="container-ak">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Bilgi Merkezi"
                title="Eğitim ve uygulayıcılık yazıları"
              />
              <Link href="/blog" className="btn-ghost !py-2.5">
                Tüm yazılar
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card-ak p-6 flex flex-col hover:border-navy/30 transition-colors">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold">
                    {formatDate(p.date)}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-navy leading-snug mt-3 flex-1">
                    {p.title}
                  </h3>
                  <p className="text-ink-soft text-[14px] leading-relaxed mt-3 line-clamp-3">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-navy font-semibold text-[13.5px] mt-5">
                    Yazıyı okuyun <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection items={HOME_FAQS} eyebrow="S.S.S." title="Sıkça sorulan sorular" />

      <CtaBand />
    </>
  );
}
