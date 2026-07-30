import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ShieldAlert, Award } from "lucide-react";
import { SITE, yearsExp } from "@/data/site";
import { slugifyTr } from "@/lib/slug";

/**
 * MDX gövde stilleri + otomatik başlık id'si.
 *
 * h2/h3'lere Türkçe-duyarlı id verilir; İçindekiler bileşeni bu id'lere
 * bağlanır. id üretimi SUNUCUDA olur — statik HTML'de hazır gelir.
 */
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={typeof props.children === "string" ? slugifyTr(props.children) : undefined}
      className="font-display text-2xl font-semibold text-navy mt-12 mb-4 scroll-mt-28"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      id={typeof props.children === "string" ? slugifyTr(props.children) : undefined}
      className="font-display text-xl font-semibold text-navy mt-8 mb-3 scroll-mt-28"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-ink-soft leading-[1.8] text-[16px] my-4" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-5 space-y-2.5 list-disc pl-5 marker:text-gold text-ink-soft leading-relaxed" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-5 space-y-2.5 list-decimal pl-5 marker:text-gold marker:font-semibold text-ink-soft leading-relaxed" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="text-ink font-semibold" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="my-6 border-l-[3px] border-gold bg-gold-tint/60 px-5 py-4 rounded-r-md text-ink leading-relaxed" {...props} />
  ),
  a: ({ href = "", ...props }: React.ComponentProps<"a">) => {
    const external = href.startsWith("http");
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="text-navy underline underline-offset-2 hover:text-gold transition-colors"
        {...props}
      />
    ) : (
      <Link href={href} className="text-navy underline underline-offset-2 hover:text-gold transition-colors" {...props} />
    );
  },
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-left text-[15px] border-collapse" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="border-b-2 border-line px-3 py-2 font-semibold text-navy" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border-b border-line-soft px-3 py-2 text-ink-soft" {...props} />
  ),
};

export function PostBody({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}

/** YMYL (sağlık) içerikte zorunlu: tıbbi sorumluluk notu. */
export function MedicalDisclaimer() {
  return (
    <div className="mt-12 card-ak p-6 border-l-[3px] border-l-gold flex items-start gap-4">
      <ShieldAlert size={21} className="text-gold shrink-0 mt-0.5" />
      <p className="text-ink-soft text-[14.5px] leading-relaxed">
        <strong className="text-ink">Bilgilendirme:</strong> Bu yazı eğitim ve
        bilgilendirme amaçlıdır; tıbbi teşhis veya tedavi yerine geçmez. Hacamat ve
        sülük geleneksel ve tamamlayıcı uygulamalardır. Kronik hastalığınız veya
        düzenli ilaç kullanımınız varsa uygulamadan önce hekiminize danışın.
      </p>
    </div>
  );
}

/** E-E-A-T: içeriği kimin hazırladığı. */
export function AuthorBox() {
  return (
    <div className="mt-5 card-ak p-6 flex items-start gap-5">
      <span className="w-12 h-12 rounded-md bg-navy-tint text-navy flex items-center justify-center shrink-0">
        <Award size={24} />
      </span>
      <div>
        <span className="eyebrow-ak">Bu içeriği hazırlayan</span>
        <h3 className="font-display text-lg font-semibold text-navy mt-1.5">
          {SITE.name}
        </h3>
        <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">
          {SITE.founded}&apos;ten bu yana süren {yearsExp()} yıllık saha tecrübesi ve{" "}
          {SITE.graduates}&apos;den fazla kursiyer. İçerikler, uygulama birikimi ve
          güncel hijyen standartları esas alınarak hazırlanır.{" "}
          <Link href="/egitmen" className="text-navy underline underline-offset-2 hover:text-gold">
            Eğitmen hakkında
          </Link>
        </p>
      </div>
    </div>
  );
}
