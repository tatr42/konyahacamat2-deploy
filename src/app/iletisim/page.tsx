import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE, waLink } from "@/data/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = pageMeta({
  title: "İletişim",
  description:
    "Ebusadullah Akademi iletişim bilgileri: Konya Meram adresi, telefon, WhatsApp ve e-posta. Eğitim programları hakkında bilgi almak için bize ulaşın.",
  path: "/iletisim",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Bize Ulaşın"
        title="İletişim"
        lead="Eğitim programları, dönem tarihleri ve kontenjan hakkında en hızlı yanıtı WhatsApp üzerinden alırsınız."
        crumb={[{ name: "İletişim", path: "/iletisim" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-ak grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Kurum Bilgileri" title="Akademi merkezi" />
            <ul className="mt-7 space-y-5">
              {[
                {
                  icon: <MapPin size={19} />,
                  l: "Adres",
                  v: `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.district}/${SITE.address.city}`,
                },
                { icon: <Phone size={19} />, l: "Telefon", v: SITE.phoneTRDisplay, href: `tel:${SITE.phoneTR}` },
                { icon: <Mail size={19} />, l: "E-posta", v: SITE.email, href: `mailto:${SITE.email}` },
                { icon: <Clock size={19} />, l: "Çalışma saatleri", v: SITE.hours },
              ].map((r) => (
                <li key={r.l} className="flex gap-4">
                  <span className="w-10 h-10 rounded-md bg-navy-tint text-navy flex items-center justify-center shrink-0">
                    {r.icon}
                  </span>
                  <span>
                    <span className="block text-[12px] tracking-[0.18em] uppercase text-ink-soft">
                      {r.l}
                    </span>
                    {r.href ? (
                      <a href={r.href} className="block text-navy font-medium mt-1 hover:text-gold transition-colors">
                        {r.v}
                      </a>
                    ) : (
                      <span className="block text-ink mt-1 leading-relaxed">{r.v}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink("Merhaba, Ebusadullah Akademi eğitimleri hakkında bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-wa"
              >
                <MessageCircle size={17} />
                WhatsApp (Türkiye)
              </a>
              <a
                href={waLink("Hallo, ich möchte Informationen über die Schulungen erhalten.", true)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-ghost"
              >
                WhatsApp (Almanya) · {SITE.phoneDEDisplay}
              </a>
            </div>
          </div>

          <div className="card-ak p-6 lg:p-8 h-fit">
            <SectionHeading eyebrow="Nasıl İlerliyoruz?" title="İlk temas ve ön görüşme" />
            <ol className="mt-6 space-y-4">
              {[
                "WhatsApp veya telefonla bize ulaşırsınız.",
                "Hedefinizi ve varsa geçmiş deneyiminizi kısaca konuşuruz.",
                "Size uygun programı, dönem tarihini ve kontenjan durumunu paylaşırız.",
                "Kayıt sonrası çevrimiçi modüllere erişiminiz açılır, uygulama tarihini planlarız.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="module-no">{i + 1}</span>
                  <span className="text-ink-soft text-[15px] leading-relaxed pt-1.5">{s}</span>
                </li>
              ))}
            </ol>
            <p className="text-ink-soft/80 text-[13.5px] leading-relaxed mt-6 pt-6 border-t border-line-soft">
              Not: Bu site yalnızca eğitim programları içindir. Uygulama (seans) ve
              malzeme talepleri için kardeş sitemiz{" "}
              <a href={SITE.sisters.suluk.url} target="_blank" rel="noopener" className="text-navy underline underline-offset-2">
                konyahacamat.net
              </a>{" "}
              üzerinden ilerleyebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
