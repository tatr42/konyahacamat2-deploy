import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/data/site";
import { educationalOrganizationSchema, instructorSchema } from "@/lib/schema";
import Jsonld from "@/components/Jsonld";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import StickyCta from "@/components/StickyCta";

/* Tipografi — üç sitede de FARKLI çift kullanılır (kopya görünüm olmasın):
   .net Playfair+DM Sans · .com Lora+Manrope · .com.tr Newsreader+Inter

   Fontlar `next/font/google` ile DEĞİL, `public/fonts` altından self-hosted
   olarak yüklenir (@font-face tanımları globals.css içinde). Böylece build
   Google'a bağımlı olmaz ve ziyaretçi üçüncü taraf sunucuya istek atmaz. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: "Hacamat ve Sülük Eğitimi | Ebusadullah Akademi",
    template: "%s | Ebusadullah Akademi",
  },
  description:
    "Hacamat (kupa terapisi) ve sülük terapisi eğitimleri. Çevrimiçi teorik modüller, Konya'da yüz yüze uygulama kampı, kurum sertifikası. 1994'ten bu yana saha tecrübesi.",
  keywords: [
    "hacamat eğitimi",
    "hacamat kursu",
    "sülük eğitimi",
    "hirudoterapi eğitimi",
    "hacamat sertifikası",
    "kupa terapisi eğitimi",
  ],
  authors: [{ name: SITE.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.baseUrl,
    siteName: SITE.name,
    title: "Hacamat ve Sülük Eğitimi | Ebusadullah Akademi",
    description:
      "Hacamat ve sülük terapisi uzmanlık eğitimleri: çevrimiçi teorik modüller + Konya'da yüz yüze uygulama kampı.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hacamat ve Sülük Eğitimi | Ebusadullah Akademi",
    description: "Çevrimiçi teorik modüller + Konya'da yüz yüze uygulama kampı.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* Gövde fontunun latin dilimi ilk boyamada gerekli — erken indir. */}
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Jsonld data={educationalOrganizationSchema()} />
        <Jsonld data={instructorSchema()} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
        <StickyCta />
        {/* Mobil alt CTA şeridi içeriği örtmesin */}
        <div className="lg:hidden h-14" aria-hidden="true" />
      </body>
    </html>
  );
}
