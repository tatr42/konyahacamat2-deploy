import { Phone, ClipboardList } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/data/site";

/** Mobil alt CTA şeridi — telefon + kayıt (masaüstünde gizli). */
export default function StickyCta() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-line bg-surface/95 backdrop-blur">
      <a
        href={`tel:${SITE.phoneTR}`}
        className="flex items-center justify-center gap-2 py-3.5 text-[13px] font-semibold text-navy border-r border-line"
      >
        <Phone size={16} />
        Hemen Ara
      </a>
      <Link
        href="/kayit"
        className="flex items-center justify-center gap-2 py-3.5 text-[13px] font-semibold text-white bg-navy"
      >
        <ClipboardList size={16} />
        Kayıt Ol
      </Link>
    </div>
  );
}
