import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/ProgramPage";

export const metadata = pageMeta({
  title: "Sülük Eğitimi — Hirudoterapi Uzmanlık Programı",
  description:
    "Sülük (hirudoterapi) eğitimi: tıbbi sülük biyolojisi, saklama ve besleme koşulları, uygulama bölgeleri, kontrendikasyonlar ve atık yönetimi. Çevrimiçi dersler + Konya'da uygulama.",
  path: "/suluk-egitimi",
});

export default function Page() {
  return <ProgramPage slug="suluk-egitimi" />;
}
