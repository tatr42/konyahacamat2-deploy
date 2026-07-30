import { ShieldCheck, Info } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CREDENTIAL } from "@/data/programs";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CertificateChecker from "@/components/CertificateChecker";
import FaqSection from "@/components/FaqSection";
import Jsonld from "@/components/Jsonld";
import { faqPageSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Sertifika Doğrulama",
  description:
    "Ebusadullah Akademi kurum sertifikasının doğruluğunu sertifika numarasıyla kontrol edin. Belge sahibi, program adı ve veriliş tarihi görüntülenir.",
  path: "/sertifika-dogrulama",
});

const FAQS = [
  {
    q: "Sertifika numarasını nerede bulabilirim?",
    a: "Belgenizin sağ alt köşesinde 'EA-' ile başlayan numara yer alır. Doğrulama sorgusunda bu numarayı tire işaretleriyle birlikte girmeniz gerekir.",
  },
  {
    q: "Doğrulama sonucunda hangi bilgiler görünür?",
    a: "Yalnızca belgenin geçerli olup olmadığı, belge numarası, tamamlanan programın adı ve veriliş tarihi görüntülenir. Belge sahibinin adı, ili ve iletişim bilgileri bu sayfada yayınlanmaz.",
  },
  {
    q: "Numaram sistemde bulunamadı, ne yapmalıyım?",
    a: "Önce numarayı belgede yazdığı gibi girdiğinizden emin olun. Kayıt hâlâ görünmüyorsa WhatsApp üzerinden bize ulaşın; kaydı elden kontrol edip size dönüş yapalım.",
  },
  {
    q: "Bu belge resmî bir yetki veriyor mu?",
    a: `Hayır. ${CREDENTIAL} kurumumuza ait bir katılım ve yeterlilik belgesidir; resmî yetki, akreditasyon veya sağlık mesleği icra hakkı ifade etmez.`,
  },
];

export default function Page() {
  return (
    <>
      <Jsonld data={faqPageSchema(FAQS)} />

      <PageHero
        eyebrow="Belge Kontrolü"
        title="Sertifika Doğrulama"
        lead="Akademi tarafından düzenlenen belgelerin doğruluğunu sertifika numarasıyla kontrol edebilirsiniz."
        crumb={[{ name: "Sertifika Doğrulama", path: "/sertifika-dogrulama" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak max-w-3xl">
          <SectionHeading
            eyebrow="Sorgulama"
            title="Sertifika numarasını girin"
            lead="Numara belgenizin sağ alt köşesinde yer alır. Sorgu yalnızca belgenin geçerliliğini gösterir."
          />
          <div className="mt-8">
            <CertificateChecker />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card-ak p-6">
              <ShieldCheck size={22} className="text-gold mb-3" />
              <h3 className="font-semibold text-navy">Neden doğrulama var?</h3>
              <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">
                Sağlık alanına yakın eğitimlerde belge taklidi sık görülür. Doğrulama
                sayfası, elinizdeki belgenin gerçekten Akademi tarafından düzenlenip
                düzenlenmediğini üçüncü kişilerin de kontrol edebilmesini sağlar.
              </p>
            </div>
            <div className="card-ak p-6 border-l-[3px] border-l-navy">
              <Info size={22} className="text-navy mb-3" />
              <h3 className="font-semibold text-navy">Belgenin kapsamı</h3>
              <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">
                {CREDENTIAL}; kurumumuzun kendi belgesidir. Resmî yetki, akreditasyon
                veya meslek icra hakkı sağlamaz. Bu sınırı hem eğitim boyunca hem
                belgenin üzerinde açıkça belirtiriz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={FAQS} title="Doğrulama hakkında sorular" />
    </>
  );
}
