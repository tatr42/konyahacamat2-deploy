import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import SectionHeading from "@/components/SectionHeading";
import { PROGRAMS, CREDENTIAL } from "@/data/programs";
import { SITE } from "@/data/site";
import { faqPageSchema } from "@/lib/schema";
import Jsonld from "@/components/Jsonld";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Sıkça Sorulan Sorular",
  description:
    "Hacamat ve sülük eğitimi hakkında sık sorulan sorular: katılım şartları, süre, uygulama kampı, sertifikanın kapsamı, ücretlendirme ve kayıt süreci.",
  path: "/sss",
});

/** Genel sorular — program sayfalarındaki SSS'lerle çakışmayanlar. */
const GENERAL_FAQS = [
  {
    q: "Eğitime katılmak için Konya'da yaşamam gerekiyor mu?",
    a: "Hayır. Teorik modüller çevrimiçi işlenir ve tekrar izlenebilir. Yalnızca uygulama kampı için Konya'daki merkezimize kısa bir ziyaret planlanır.",
  },
  {
    q: "Eğitim ücretleri nasıl belirleniyor?",
    a: "Ücret; seçilen program, uygulama setinin dahil olup olmaması ve dönem kontenjanına göre değişir. Sitede sabit fiyat yayınlamak yerine güncel tutarı görüşmede paylaşıyoruz.",
  },
  {
    q: "Taksit imkânı var mı?",
    a: "Dönem koşullarına göre ödeme planı yapılabilir. Ayrıntıları ön görüşmede netleştiriyoruz.",
  },
  {
    q: "İki programa birden kayıt olabilir miyim?",
    a: "Evet. Hacamat ve sülük programlarını birlikte alanlarda ortak modüller (hijyen, danışan değerlendirme) tekrar edilmez, süreç buna göre planlanır.",
  },
  {
    q: "Sertifikam kaybolursa ne yapmalıyım?",
    a: "Kayıt defterimizde numaranız saklıdır. Bize ulaştığınızda belgenizi yeniden düzenliyoruz; ayrıca sertifika doğrulama sayfasından kaydınızı her zaman kontrol edebilirsiniz.",
  },
  {
    q: "Bu eğitim bana klinik açma veya tıbbi işlem yapma yetkisi verir mi?",
    a: `Hayır. ${CREDENTIAL} bir kurum belgesidir; resmî yetki, akreditasyon veya sağlık mesleği icra hakkı sağlamaz. Geleneksel ve tamamlayıcı uygulamaların yasal çerçevesi ilgili mevzuatla belirlenir.`,
  },
  {
    q: "Eğitim yerine seans/uygulama yaptırmak istiyorum.",
    a: `Bu site yalnızca eğitim içindir. Sülük terapisi ve malzeme talepleriniz için kardeş sitemiz konyahacamat.net üzerinden ilerleyebilir ya da ${SITE.phoneTRDisplay} numarasından randevu alabilirsiniz.`,
  },
  {
    q: "Derslere sonradan katılırsam kaçırdığım konuları nasıl telafi ederim?",
    a: "Teorik modüller kayıtlıdır ve kendi hızınızda izlenebilir. Soru-cevap oturumları ise dönem boyunca tekrarlanır.",
  },
];

/**
 * KOPYA İÇERİK KURALI: Program SSS'leri BU SAYFADA TEKRARLANMAZ.
 *
 * Önceden hem burada hem program sayfalarında aynı soru-cevap metni ve aynı
 * FAQPage şeması basılıyordu; bu, kendi koyduğumuz "her içerik tek yerde"
 * kuralına aykırıydı. Artık burada yalnızca genel sorular yer alır, program
 * soruları için ilgili sayfaya bağlamsal link verilir.
 */

export default function Page() {
  return (
    <>
      <Jsonld data={faqPageSchema(GENERAL_FAQS)} />

      <PageHero
        eyebrow="Yardım"
        title="Sıkça sorulan sorular"
        lead="Katılım şartlarından belgenin kapsamına kadar en çok merak edilen başlıklar."
        crumb={[{ name: "S.S.S.", path: "/sss" }]}
      />

      <FaqSection items={GENERAL_FAQS} eyebrow="Genel" title="Genel sorular" id="genel" />

      {/* Program soruları burada tekrarlanmaz — kendi sayfalarına yönlendirilir */}
      <section className="py-14 lg:py-20">
        <div className="container-ak max-w-3xl">
          <SectionHeading
            eyebrow="Programa Özel"
            title="Belirli bir program hakkında soru"
            lead="Süre, müfredat, katılım şartları ve belge kapsamına dair sorular, ilgili programın kendi sayfasında ayrıntılı olarak yanıtlanır."
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROGRAMS.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}#sikca-sorulan-sorular`}
                className="card-ak p-6 hover:border-navy/30 transition-colors"
              >
                <span className="eyebrow-ak">S.S.S.</span>
                <h3 className="font-display text-lg font-semibold text-navy mt-2">
                  {p.title}
                </h3>
                <p className="text-ink-soft text-[14px] leading-relaxed mt-2">
                  {p.faqs.length} soru — süre, katılım, belge ve uygulama kampı.
                </p>
                <span className="inline-flex items-center gap-1.5 text-navy font-semibold text-[13.5px] mt-4">
                  Soruları görün <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Sorunuzun cevabı burada yoksa"
        lead="Aklınıza takılan her şeyi doğrudan sorabilirsiniz; aynı gün içinde yanıtlıyoruz."
      />
    </>
  );
}
