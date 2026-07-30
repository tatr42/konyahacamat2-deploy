import { pageMeta } from "@/lib/seo";
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

/** Program SSS'lerini de tek sayfada topla — kullanıcı hepsini burada bulur. */
const ALL_FAQS = [...GENERAL_FAQS, ...PROGRAMS.flatMap((p) => p.faqs)];

export default function Page() {
  return (
    <>
      <Jsonld data={faqPageSchema(ALL_FAQS)} />

      <PageHero
        eyebrow="Yardım"
        title="Sıkça sorulan sorular"
        lead="Katılım şartlarından belgenin kapsamına kadar en çok merak edilen başlıklar."
        crumb={[{ name: "S.S.S.", path: "/sss" }]}
      />

      <FaqSection items={GENERAL_FAQS} eyebrow="Genel" title="Genel sorular" id="genel" />

      {PROGRAMS.map((p) => (
        <FaqSection
          key={p.slug}
          items={p.faqs}
          eyebrow="Program"
          title={`${p.title} hakkında`}
          id={p.slug}
        />
      ))}

      <CtaBand
        title="Sorunuzun cevabı burada yoksa"
        lead="Aklınıza takılan her şeyi doğrudan sorabilirsiniz; aynı gün içinde yanıtlıyoruz."
      />
    </>
  );
}
