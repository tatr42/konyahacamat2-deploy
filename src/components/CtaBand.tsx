import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/data/site";

/** Dönüşüm bandı — WhatsApp/telefon (lead-gen). */
export default function CtaBand({
  title = "Kayıt ve kontenjan bilgisi için bize yazın",
  lead = "Dönem tarihleri, program kapsamı ve ücretlendirme hakkında en hızlı yanıtı WhatsApp üzerinden alırsınız.",
  waText = "Merhaba, Ebusadullah Akademi eğitim programları hakkında bilgi almak istiyorum.",
}: {
  title?: string;
  lead?: string;
  waText?: string;
}) {
  return (
    <section className="py-14 lg:py-16 bg-navy text-white bg-grid-navy">
      <div className="container-ak flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl lg:text-[2rem] font-semibold leading-snug">
            {title}
          </h2>
          <div className="rule-gold mt-4" />
          <p className="mt-4 text-white/70 leading-relaxed text-[15px]">{lead}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a href={waLink(waText)} target="_blank" rel="noopener noreferrer nofollow" className="btn-wa">
            <MessageCircle size={17} />
            WhatsApp&apos;tan Yazın
          </a>
          <a href={`tel:${SITE.phoneTR}`} className="btn-ghost !bg-transparent !text-white !border-white/25 hover:!bg-white/10">
            <Phone size={16} />
            {SITE.phoneTRDisplay}
          </a>
          <Link href="/kayit" className="btn-ghost !bg-white !text-navy !border-white">
            Kayıt Formu
          </Link>
        </div>
      </div>
    </section>
  );
}
