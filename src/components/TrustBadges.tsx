import Image from "next/image";
import { SITE, yearsExp } from "@/data/site";

/**
 * Güven rozetleri — sabit 4'lü set. Ana sayfa, il sayfaları (81x) ve
 * iletişim sayfasında aynı bileşen tekrar kullanılır (tutarlılık + tek
 * bakım noktası). Metinler SITE'tan türetilir — sayı/adres tek kaynaktan
 * gelir, sayfa başına elle tekrar yazılmaz.
 */
export default function TrustBadges() {
  const badges = [
    {
      src: "/img/guven/deneyim.svg",
      title: `${yearsExp()}+ Yıl Tecrübe`,
      desc: `${SITE.founded}'ten bu yana kesintisiz saha tecrübesi`,
    },
    {
      src: "/img/guven/uzman-kadro.svg",
      title: "Uzman Eğitmen Kadrosu",
      desc: "Sahada yetişmiş, uygulamayı bizzat gözeten eğitmen kadrosu",
    },
    {
      src: "/img/guven/steril-set.svg",
      title: "%100 Steril Set",
      desc: "Her kursiyer için tek kullanımlık, steril ekipman",
    },
    {
      src: "/img/guven/konya-merkez.svg",
      title: `Konya ${SITE.address.district} Merkez`,
      desc: "Yüz yüze uygulama için sabit, güvenilir merkez altyapısı",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((b) => (
        <div key={b.title} className="card-ak p-5 text-center flex flex-col items-center">
          <Image src={b.src} alt="" width={96} height={96} aria-hidden="true" className="w-14 h-14" />
          <span className="block font-semibold text-navy text-[14px] mt-3">{b.title}</span>
          <span className="block text-ink-soft text-[12.5px] leading-relaxed mt-1.5">{b.desc}</span>
        </div>
      ))}
    </div>
  );
}
