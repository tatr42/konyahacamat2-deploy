import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/ProgramPage";

export const metadata = pageMeta({
  title: "Hacamat Eğitimi — Kupa Terapisi Uzmanlık Programı",
  description:
    "Hacamat eğitimi: kuru ve yaş uygulama teknikleri, nokta haritası, hijyen ve steril çalışma disiplini. Çevrimiçi teorik modüller + Konya'da yüz yüze uygulama kampı, kurum sertifikası.",
  path: "/hacamat-egitimi",
});

export default function Page() {
  return <ProgramPage slug="hacamat-egitimi" />;
}
