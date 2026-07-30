"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, GraduationCap, ChevronRight, ChevronDown } from "lucide-react";
import { SITE } from "@/data/site";
import { PROGRAM_PAGES, INSTITUTION_PAGES } from "@/data/nav";

/**
 * Akademik başlık — iki katmanlı: üstte ince kurum şeridi (iletişim + saat),
 * altta ana gezinme. Kardeş sitelerin tek katmanlı/koyu navbar'ından bilinçli
 * olarak farklıdır (aynı marka, farklı site iskeleti).
 *
 * Menü GRUPLANMIŞTIR: 9 düz link 1180px konteynerde logoyla birlikte taşıyor
 * ve satır kırıyordu. Üst seviye 6 öğeye indirildi; program ve kurum sayfaları
 * iki açılır menüde toplandı (açılma hover + klavye focus ile, JS state yok).
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const flatLinks = [
    ...PROGRAM_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.nav })),
    ...INSTITUTION_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.nav })),
    { href: "/blog", label: "Blog" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/iletisim", label: "İletişim" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Üst kurum şeridi */}
      <div className="hidden md:block bg-navy text-white/70">
        <div className="container-ak flex items-center justify-between h-9 text-[12px]">
          <span className="tracking-wide">
            {SITE.founded}&apos;ten bu yana · Konya merkezli uygulama akademisi
          </span>
          <div className="flex items-center gap-5">
            <span>{SITE.hours}</span>
            <a href={`tel:${SITE.phoneTR}`} className="flex items-center gap-1.5 text-white hover:text-gold-soft transition-colors">
              <Phone size={13} />
              {SITE.phoneTRDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Ana gezinme */}
      <div className="bg-surface/95 backdrop-blur border-b border-line">
        <div className="container-ak flex items-center justify-between gap-8 h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.name} ana sayfa`}>
            <span className="w-10 h-10 rounded-md bg-navy flex items-center justify-center text-gold-soft shrink-0">
              <GraduationCap size={22} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[17px] lg:text-lg font-semibold text-navy whitespace-nowrap">
                Ebusadullah Akademi
              </span>
              <span className="hidden sm:block text-[10px] tracking-[0.2em] uppercase text-ink-soft whitespace-nowrap">
                Hacamat &amp; Sülük Eğitimleri
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Ana menü">
            <Dropdown label="Eğitimler" items={PROGRAM_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.short }))} />
            <Dropdown label="Akademi" items={INSTITUTION_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.short }))} />
            {[
              { href: "/blog", label: "Blog" },
              { href: "/hakkimizda", label: "Hakkımızda" },
              { href: "/iletisim", label: "İletişim" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-ink-soft hover:text-navy transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/kayit" className="btn-navy !py-2.5 !px-5 text-[13px] whitespace-nowrap">
              Kayıt Ol
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-md border border-line flex items-center justify-center text-navy shrink-0"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobil menü — düz liste (gruplama masaüstüne özgü) */}
      {open && (
        <div className="lg:hidden bg-surface border-b border-line shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
          <nav className="container-ak py-4 flex flex-col" aria-label="Mobil menü">
            {flatLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 border-b border-line-soft text-[15px] text-ink"
              >
                {l.label}
                <ChevronRight size={16} className="text-ink-soft" />
              </Link>
            ))}
            <Link href="/kayit" onClick={() => setOpen(false)} className="btn-navy mt-4">
              Kayıt Ol
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * Masaüstü açılır menü — fare, klavye ve dokunmatik için state ile yönetilir.
 *
 * Not: açık/kapalı durumu CSS `group-hover`/`group-focus-within` ile YAPILMADI;
 * `invisible` ile `visible` aynı utility ailesinden olduğu için Tailwind'in
 * sıralamasında varyant kaybediyordu (panel klavyeyle hiç açılmıyordu).
 * Tek bir className ifadesiyle durum değiştirmek bu çakışmayı tamamen kaldırır.
 *
 * Panel her zaman DOM'da: linkler sunucudan gelen HTML'de yer alır (botlar görür).
 */
function Dropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          // Fare/dokunma ile tıklamada hover zaten açmış olur; toggle etmek
          // menüyü anında kapatırdı. Klavyeyle etkinleştirmede (detail === 0)
          // ise aç/kapa davranışı korunur.
          if (e.detail === 0) setOpen((v) => !v);
          else setOpen(true);
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 text-[14px] font-medium transition-colors whitespace-nowrap ${
          open ? "text-navy" : "text-ink-soft hover:text-navy"
        }`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-0 top-full pt-3 transition-opacity duration-150 ${
          open ? "opacity-100" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul className="min-w-[220px] card-ak shadow-lg py-2">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-[14px] text-ink-soft hover:text-navy hover:bg-navy-tint/60 transition-colors whitespace-nowrap"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
