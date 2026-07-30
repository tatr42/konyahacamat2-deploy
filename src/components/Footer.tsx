import Link from "next/link";
import { MapPin, Phone, Mail, Clock, GraduationCap } from "lucide-react";
import { SITE } from "@/data/site";
import { PROGRAM_PAGES, INSTITUTION_PAGES, CORP_PAGES, LEGAL_PAGES } from "@/data/nav";

/**
 * Footer — NAP + gezinme + kardeş domain köprüsü.
 *
 * EKOSİSTEM KURALI: kardeş domainlere yalnızca `live: true` ise link verilir.
 * Uykuda/boş domaine link vermek (konyahacamat.com şu an öyle) hem kullanıcıyı
 * boş sayfaya düşürür hem SEO'ya zarar eder — o yüzden sadece "yakında" yazar.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { suluk, hacamat } = SITE.sisters;

  return (
    <footer className="bg-navy text-white/70">
      <div className="container-ak py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Kurum */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-gold-soft">
                <GraduationCap size={22} />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                Ebusadullah Akademi
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Hacamat ve sülük terapisi alanında {SITE.founded}&apos;ten bu yana
              süren saha tecrübesiyle eğitim veren Konya merkezli uygulama akademisi.
            </p>
          </div>

          {/* Programlar */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Eğitim Programları
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PROGRAM_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-gold-soft transition-colors">
                    {p.short}
                  </Link>
                </li>
              ))}
              {INSTITUTION_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-gold-soft transition-colors">
                    {p.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Kurumsal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog" className="hover:text-gold-soft transition-colors">
                  Blog
                </Link>
              </li>
              {CORP_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-gold-soft transition-colors">
                    {p.short}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Kardeş siteler — uygulama/hizmet niyeti buraya devredilir */}
            <h3 className="text-white font-semibold mt-7 mb-3 text-sm tracking-wide uppercase">
              Uygulama Yaptırmak İsteyenler
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={suluk.url}
                  className="hover:text-gold-soft transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  {suluk.label} — konyahacamat.net
                </a>
              </li>
              <li className="text-white/40">
                {hacamat.live ? (
                  <a href={hacamat.url} className="hover:text-gold-soft transition-colors" target="_blank" rel="noopener">
                    {hacamat.label} — konyahacamat.com
                  </a>
                ) : (
                  <>Hacamat uygulama sitesi — yakında</>
                )}
              </li>
            </ul>
          </div>

          {/* İletişim (NAP) */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              İletişim
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin size={16} className="shrink-0 mt-0.5 text-gold-soft" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.district}/{SITE.address.city}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={16} className="shrink-0 mt-0.5 text-gold-soft" />
                <a href={`tel:${SITE.phoneTR}`} className="hover:text-gold-soft transition-colors">
                  {SITE.phoneTRDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail size={16} className="shrink-0 mt-0.5 text-gold-soft" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-soft transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock size={16} className="shrink-0 mt-0.5 text-gold-soft" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ak py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>
              © {year} {SITE.legalName}. Tüm hakları saklıdır.
            </span>
            {LEGAL_PAGES.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="hover:text-gold-soft transition-colors">
                {p.short}
              </Link>
            ))}
          </span>
          <span>
            Geliştirici:{" "}
            <a href={SITE.developer.url} target="_blank" rel="noopener" className="hover:text-gold-soft transition-colors">
              {SITE.developer.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
