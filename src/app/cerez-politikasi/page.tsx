import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = pageMeta({
  title: "Çerez Politikası",
  description:
    "Bu sitede çerez kullanımı, tarayıcınızda saklanan bilgiler ve bunları nasıl temizleyeceğiniz — sade bir dille açıklama.",
  path: "/cerez-politikasi",
});

/**
 * Çerez sayfası — sade dille (kullanıcı kararı).
 *
 * ÖNEMLİ: Metin sitenin BUGÜNKÜ durumunu anlatır — analitik, reklam veya
 * takip çerezi YOKTUR. İleride analitik (ör. GA4) veya gömülü içerik
 * eklenirse bu sayfa ve gerekiyorsa bir onay bandı GÜNCELLENMELİDİR.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Bilgilendirme"
        title="Çerez politikası"
        lead="Bu sitede hangi çerezlerin kullanıldığını ve tarayıcınızda ne saklandığını açıkça yazıyoruz."
        crumb={[{ name: "Çerez Politikası", path: "/cerez-politikasi" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak max-w-3xl space-y-12">
          <div className="card-ak p-6 border-l-[3px] border-l-gold">
            <h2 className="font-semibold text-navy">Kısa cevap</h2>
            <p className="text-ink-soft text-[15.5px] leading-relaxed mt-2">
              Bu sitede sizi tanımak, takip etmek veya reklam göstermek için çerez
              kullanılmıyor. Site tamamen statik çalışır; gezinmek için tarayıcınıza
              bir şey kaydetmemiz gerekmez.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Tanım" title="Çerez nedir?" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              Çerez, ziyaret ettiğiniz sitelerin tarayıcınıza bıraktığı küçük bir metin
              dosyasıdır. Bazı siteler bunu oturumunuzu açık tutmak için, bazıları ise
              sizi farklı sitelerde izleyip reklam göstermek için kullanır.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Durum" title="Bu sitede ne var?" />
            <div className="mt-6 space-y-4">
              <div className="card-ak p-5">
                <h3 className="font-semibold text-navy">Zorunlu teknik kayıtlar</h3>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-1.5">
                  Sitenin barındırıldığı altyapı, güvenlik ve performans için standart
                  sunucu kayıtları tutabilir. Bunlar sizi kişi olarak tanımlamak için
                  kullanılmaz.
                </p>
              </div>
              <div className="card-ak p-5">
                <h3 className="font-semibold text-navy">Analitik veya reklam çerezi</h3>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-1.5">
                  <strong className="text-ink">Kullanılmıyor.</strong> Ziyaretçi
                  davranışını izleyen bir ölçümleme aracı veya reklam ağı bu sitede
                  bulunmuyor.
                </p>
              </div>
              <div className="card-ak p-5">
                <h3 className="font-semibold text-navy">Dış bağlantılar</h3>
                <p className="text-ink-soft text-[14.5px] leading-relaxed mt-1.5">
                  Sitedeki WhatsApp ve sosyal medya bağlantılarına tıkladığınızda ilgili
                  uygulamanın kendi sitesine geçersiniz. Oradan sonrası o hizmetin kendi
                  çerez ve gizlilik kurallarına tabidir.
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Kontrol" title="Tarayıcınızda nasıl temizlersiniz?" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              Tüm tarayıcılar, saklanan site verilerini görüntülemenize ve silmenize izin
              verir. Genellikle <strong className="text-ink">Ayarlar → Gizlilik ve
              güvenlik → Tarama verilerini temizle</strong> adımlarıyla ulaşırsınız.
              Çerezleri tamamen engellemeniz durumunda bu sitenin çalışmasında bir sorun
              yaşanmaz.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Değişiklik" title="İleride ne olabilir?" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              İleride ziyaretçi istatistiği tutan bir araç eklersek, bu sayfayı
              güncelleyip hangi aracın ne topladığını burada açıkça yazarız. Kişisel
              bilgilerinizle ilgili genel yaklaşımımız için{" "}
              <Link href="/gizlilik" className="text-navy underline underline-offset-2 hover:text-gold">
                gizlilik sayfamıza
              </Link>{" "}
              bakabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
