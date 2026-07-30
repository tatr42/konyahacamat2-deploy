import Link from "next/link";
import { MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE, waLink } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CredentialNote from "@/components/CredentialNote";

export const metadata = pageMeta({
  title: "Kayıt ve Başvuru",
  description:
    "Hacamat ve sülük eğitim programlarına kayıt süreci: ön görüşme, dönem seçimi, çevrimiçi modüller ve Konya'da uygulama kampı. Kontenjan bilgisi için bize yazın.",
  path: "/kayit",
});

/**
 * Kayıt sayfası — form YOK, WhatsApp lead-gen.
 * Kişisel veri toplayan bir form eklenirse KVKK aydınlatma metni ve açık
 * rıza akışı da gerekir; mevcut kurguda süreç bilinçli olarak WhatsApp üzerinden.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Başvuru"
        title="Kayıt ve başvuru süreci"
        lead="Kayıt, kısa bir ön görüşmeyle başlar. Hangi programın size uygun olduğunu birlikte belirleriz."
        crumb={[{ name: "Kayıt", path: "/kayit" }]}
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={waLink("Merhaba, eğitim programlarına kayıt yaptırmak istiyorum. Bilgi alabilir miyim?")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-wa"
          >
            <MessageCircle size={17} />
            WhatsApp&apos;tan Başvurun
          </a>
          <a href={`tel:${SITE.phoneTR}`} className="btn-ghost !bg-white !text-navy !border-white">
            <Phone size={16} />
            {SITE.phoneTRDisplay}
          </a>
        </div>
      </PageHero>

      <section className="py-14 lg:py-20">
        <div className="container-ak grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <SectionHeading eyebrow="Adımlar" title="Kayıt nasıl ilerler?" />
              <ol className="mt-7 space-y-4">
                {[
                  { t: "Ön görüşme", d: "WhatsApp veya telefonla kısa bir görüşme yaparız; hedefinizi ve varsa deneyiminizi konuşuruz." },
                  { t: "Program ve dönem seçimi", d: "Size uygun programı, dönem tarihini ve uygulama kampı takvimini belirleriz." },
                  { t: "Kayıt ve erişim", d: "Kayıt tamamlandığında çevrimiçi teorik modüllere erişiminiz açılır." },
                  { t: "Uygulama kampı", d: "Konya'daki merkezimizde eğitmen gözetiminde birebir uygulama yaparsınız." },
                  { t: "Değerlendirme ve belge", d: "Yeterlilik değerlendirmesinin ardından kurum sertifikanız düzenlenir." },
                ].map((s, i) => (
                  <li key={s.t} className="card-ak p-5 flex gap-4">
                    <span className="module-no">{i + 1}</span>
                    <span>
                      <span className="block font-semibold text-navy">{s.t}</span>
                      <span className="block text-ink-soft text-[14.5px] leading-relaxed mt-1">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionHeading eyebrow="Hazırlık" title="Başvurmadan önce bilmeniz gerekenler" />
              <ul className="mt-6 space-y-3">
                {[
                  "Programa katılmak için sağlık alanında diploma şartı aranmaz; 18 yaşını doldurmuş olmak yeterlidir.",
                  "Uygulama modülü Konya'da yüz yüze yapılır; bu bölüm uzaktan tamamlanamaz.",
                  "Uygulama seti program paketine dahil edilebilir ya da kendiniz temin edebilirsiniz.",
                  "Kontenjan, uygulama oturumlarının küçük gruplarla yürütülmesi nedeniyle sınırlıdır.",
                ].map((x) => (
                  <li key={x} className="flex gap-3 text-[15.5px] text-ink leading-relaxed">
                    <CheckCircle2 size={19} className="text-gold shrink-0 mt-0.5" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <CredentialNote />
          </div>

          <aside className="space-y-5">
            <div className="card-ak p-6">
              <span className="eyebrow-ak">Programlar</span>
              <ul className="mt-4 space-y-4">
                {PROGRAMS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`} className="font-semibold text-navy hover:text-gold transition-colors">
                      {p.title}
                    </Link>
                    <p className="text-ink-soft text-[13.5px] leading-relaxed mt-1">{p.tagline}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-ak p-6 bg-navy-tint/50">
              <span className="eyebrow-ak">Hızlı İletişim</span>
              <p className="text-ink-soft text-[14.5px] leading-relaxed mt-3">
                Sorularınızı doğrudan yazabilirsiniz; kontenjan ve ücret bilgisini
                aynı gün içinde paylaşıyoruz.
              </p>
              <a
                href={waLink("Merhaba, eğitim programları için kontenjan ve ücret bilgisi alabilir miyim?")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-wa w-full mt-4"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
