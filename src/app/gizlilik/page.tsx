import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = pageMeta({
  title: "Gizlilik ve Kişisel Veriler",
  description:
    "Ebusadullah Akademi olarak hangi bilgileri neden topladığımızı, nasıl sakladığımızı, kimlerle paylaştığımızı ve bilgilerinizin silinmesini nasıl isteyebileceğinizi sade bir dille açıklıyoruz.",
  path: "/gizlilik",
});

/**
 * Gizlilik sayfası — bilinçli olarak SADE dille yazıldı (kullanıcı kararı).
 * Hukuki danışmanlık metni değildir; kurumun veri pratiğini herkesin
 * anlayacağı biçimde anlatır. Uygulama değişirse bu metin de güncellenmelidir.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Bilgilendirme"
        title="Gizlilik ve kişisel veriler"
        lead="Hangi bilgiyi neden istediğimizi, ne kadar sakladığımızı ve nasıl sildirebileceğinizi sade bir dille anlatıyoruz."
        crumb={[{ name: "Gizlilik", path: "/gizlilik" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak max-w-3xl space-y-12">
          <div>
            <SectionHeading eyebrow="Özet" title="Kısaca" />
            <ul className="mt-6 space-y-3 text-[15.5px] text-ink leading-relaxed">
              {[
                "Sitede üyelik yoktur; gezinmek için hiçbir bilgi vermeniz gerekmez.",
                "Bize yalnızca siz yazdığınızda (WhatsApp, telefon, e-posta) bilgi iletmiş olursunuz.",
                "Bilgilerinizi satmıyor, pazarlama amacıyla üçüncü kişilere aktarmıyoruz.",
                "İstediğiniz an bilgilerinizin silinmesini talep edebilirsiniz.",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5" />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Veriler" title="Hangi bilgileri alıyoruz?" />
            <div className="mt-6 space-y-5 text-ink-soft leading-relaxed text-[15.5px]">
              <div>
                <h3 className="font-semibold text-navy mb-2">Bize kendiniz ilettikleriniz</h3>
                <p>
                  WhatsApp, telefon veya e-posta ile ulaştığınızda adınız, iletişim
                  bilginiz ve yazdığınız mesaj bize ulaşır. Eğitim programlarına kayıt
                  olursanız; katılım için gerekli iletişim bilgileri ve programı
                  tamamladığınıza dair kayıt tutulur.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2">Otomatik oluşan teknik kayıtlar</h3>
                <p>
                  Site barındırma altyapımız, güvenlik ve hata takibi amacıyla standart
                  sunucu kayıtları (istek zamanı, tarayıcı bilgisi gibi) tutabilir. Bu
                  kayıtlar kişisel profil çıkarmak için kullanılmaz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2">Sağlık bilgileri</h3>
                <p>
                  Eğitim başvurusu sırasında sağlık durumunuza dair bir bilgi
                  paylaşırsanız, bu bilgiyi yalnızca programa katılım uygunluğunu
                  değerlendirmek için kullanırız; başka hiçbir amaçla kullanmayız ve
                  üçüncü kişilerle paylaşmayız.
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Amaç" title="Neden alıyoruz?" />
            <ul className="mt-6 space-y-2.5 text-ink-soft text-[15.5px] leading-relaxed">
              <li>• Sorularınıza yanıt verebilmek ve size dönüş yapabilmek</li>
              <li>• Eğitim kaydınızı oluşturmak, dönem planlamasını yapmak</li>
              <li>• Programı tamamlayanların belge kaydını tutmak</li>
              <li>• Yasal olarak tutmamız gereken kayıtları saklamak</li>
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Paylaşım" title="Kimlerle paylaşıyoruz?" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              Bilgilerinizi satmıyoruz ve reklam amacıyla kimseye vermiyoruz. Yalnızca
              şu durumlarda paylaşım söz konusu olur: sitenin barındırıldığı teknik
              altyapı sağlayıcısı, iletişim için kullandığınız uygulamanın kendi
              hizmet sağlayıcısı (örneğin WhatsApp) ve yasal bir yükümlülük
              doğduğunda yetkili kurumlar.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Süre" title="Ne kadar saklıyoruz?" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              İletişim mesajlarını, ilgilendiğiniz konu sonuçlanana kadar tutarız.
              Eğitim ve belge kayıtları ise belgenin doğrulanabilmesi için saklanır;
              belgenizin geçerliliğini üçüncü kişilerin kontrol edebilmesi bu kaydın
              varlığına bağlıdır. Silinmesini istediğinizde kaydınızı sileriz — bu
              durumda belgenizin sitemizden doğrulanamayacağını da hatırlatırız.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Haklarınız" title="Ne talep edebilirsiniz?" />
            <ul className="mt-6 space-y-2.5 text-ink-soft text-[15.5px] leading-relaxed">
              <li>• Hakkınızda hangi bilgilerin tutulduğunu öğrenmek</li>
              <li>• Yanlış bilgilerin düzeltilmesini istemek</li>
              <li>• Bilgilerinizin silinmesini istemek</li>
              <li>• Verdiğiniz onayı geri çekmek</li>
            </ul>
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              Bunun için{" "}
              <a href={`mailto:${SITE.email}`} className="text-navy underline underline-offset-2 hover:text-gold">
                {SITE.email}
              </a>{" "}
              adresine yazmanız veya {SITE.phoneTRDisplay} numarasından bize ulaşmanız
              yeterlidir.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Sertifika Doğrulama" title="Belge kaydı nasıl görünür?" />
            <p className="mt-5 text-ink-soft leading-relaxed text-[15.5px]">
              Sertifika doğrulama sayfamız, belge numarası sorgulandığında belgenin
              geçerli olup olmadığını, programın adını ve veriliş tarihini gösterir.
              Mezunlarımızın kimlik bilgileri bu sayfada yayınlanmaz. Ayrıntı için{" "}
              <Link href="/sertifika-dogrulama" className="text-navy underline underline-offset-2 hover:text-gold">
                sertifika doğrulama
              </Link>{" "}
              sayfasına bakabilirsiniz.
            </p>
          </div>

          <div className="card-ak p-6 bg-navy-tint/50">
            <h2 className="font-semibold text-navy">Bu metin değişirse</h2>
            <p className="text-ink-soft text-[15px] leading-relaxed mt-2">
              Çalışma şeklimiz değiştiğinde bu sayfayı güncelleriz. Sayfanın en güncel
              hâli her zaman burada yayınlanır.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
