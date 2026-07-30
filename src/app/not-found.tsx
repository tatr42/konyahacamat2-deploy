import Link from "next/link";
import { PROGRAM_PAGES } from "@/data/nav";

export default function NotFound() {
  return (
    <section className="container-ak py-24 lg:py-32 text-center flex flex-col items-center">
      <span className="eyebrow-ak">404</span>
      <h1 className="font-display text-3xl lg:text-5xl font-semibold text-navy mt-3">
        Aradığınız sayfa bulunamadı
      </h1>
      <div className="rule-gold mt-5" />
      <p className="text-ink-soft mt-5 max-w-lg leading-relaxed">
        Bağlantı taşınmış veya kaldırılmış olabilir. Aşağıdaki sayfalardan devam edebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-navy">
          Ana Sayfa
        </Link>
        {PROGRAM_PAGES.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="btn-ghost">
            {p.short}
          </Link>
        ))}
      </div>
    </section>
  );
}
