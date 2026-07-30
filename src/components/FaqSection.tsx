import { Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

/**
 * SSS akordeonu — `details/summary` ile (JS gerekmez, bot da içeriği görür).
 * FAQPage JSON-LD'si sayfanın kendisinde basılır (şema tekrarı olmasın).
 */
export default function FaqSection({
  items,
  title = "Sıkça Sorulan Sorular",
  eyebrow = "S.S.S.",
  id = "sikca-sorulan-sorular",
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
  id?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-canvas-deep border-t border-line">
      <div className="container-ak max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} id={id} />
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details key={item.q} className="card-ak group">
              <summary className="flex items-start justify-between gap-4 p-5">
                <h3 className="font-semibold text-[15.5px] text-navy leading-snug">
                  {item.q}
                </h3>
                <Plus
                  size={18}
                  className="shrink-0 mt-0.5 text-gold transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="px-5 pb-5 text-ink-soft leading-relaxed text-[15px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
