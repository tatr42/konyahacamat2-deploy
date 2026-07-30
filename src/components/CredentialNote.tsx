import { ShieldCheck } from "lucide-react";
import { CREDENTIAL } from "@/data/programs";

/**
 * Sertifika şeffaflık notu — KURUM belgesi olduğunu açıkça yazar.
 *
 * Bu bileşen bilinçli olarak her program sayfasında bulunur: sağlık
 * eğitiminde belgenin kapsamını net söylemek hem kullanıcı güveni (E-E-A-T)
 * hem de yanlış beklenti/mevzuat riski açısından zorunludur.
 */
export default function CredentialNote() {
  return (
    <div className="card-ak p-6 lg:p-7 border-l-[3px] border-l-gold">
      <div className="flex items-start gap-4">
        <ShieldCheck size={22} className="text-gold shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-navy mb-2">Belge hakkında şeffaf bilgi</h3>
          <p className="text-ink-soft leading-relaxed text-[15px]">
            Program sonunda düzenlenen belge, <strong className="text-ink">{CREDENTIAL}</strong>&apos;dır.
            Bu belge kurumumuza aittir; herhangi bir resmî yetki, akreditasyon ya da
            sağlık mesleği icra hakkı ifade etmez. Türkiye&apos;de geleneksel ve
            tamamlayıcı uygulamaların yasal çerçevesi ilgili mevzuatla belirlenir ve
            bunu eğitim boyunca açıkça anlatırız. Belgenizin doğruluğunu{" "}
            <a href="/sertifika-dogrulama" className="text-navy underline underline-offset-2 hover:text-gold">
              sertifika doğrulama
            </a>{" "}
            sayfasından kontrol edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
