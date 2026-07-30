import { MessageCircle } from "lucide-react";
import { waLink } from "@/data/site";

/** Sağ-alt sabit WhatsApp balonu (mobilde alt CTA şeridinin üstünde). */
export default function WhatsAppWidget() {
  return (
    <a
      href={waLink("Merhaba, Ebusadullah Akademi eğitimleri hakkında bilgi almak istiyorum.")}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed right-4 bottom-[84px] lg:bottom-6 z-40 w-13 h-13 lg:w-14 lg:h-14 rounded-full bg-wa text-white flex items-center justify-center shadow-lg shadow-navy/20 hover:scale-105 transition-transform"
      style={{ width: 54, height: 54 }}
    >
      <MessageCircle size={26} />
    </a>
  );
}
