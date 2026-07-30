import { List } from "lucide-react";

/**
 * İçindekiler — SUNUCUDA üretilir (client DOM taraması yok).
 * Başlık id'leri sayfa bileşeninde sabit verildiği için linkler statik
 * HTML'de hazır gelir; Google JS çalıştırmadan görür, CLS oluşmaz.
 */
export default function Toc({ items }: { items: { id: string; text: string }[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="İçindekiler" className="card-ak p-5 lg:sticky lg:top-28">
      <span className="flex items-center gap-2 eyebrow-ak mb-4">
        <List size={14} />
        İçindekiler
      </span>
      <ol className="space-y-2.5 text-[14px]">
        {items.map((it, i) => (
          <li key={it.id} className="flex gap-2.5">
            <span className="text-gold/70 font-display text-[13px] pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a href={`#${it.id}`} className="text-ink-soft hover:text-navy transition-colors leading-snug">
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
