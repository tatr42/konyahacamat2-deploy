/** Bölüm başlığı — akademik düzen: etiket + başlık + altın kural. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center flex flex-col items-center" : ""}>
      {eyebrow && <span className="eyebrow-ak mb-3">{eyebrow}</span>}
      <h2
        id={id}
        className="font-display text-2xl lg:text-[2rem] leading-snug font-semibold text-navy max-w-3xl"
      >
        {title}
      </h2>
      <div className="rule-gold mt-4" />
      {lead && (
        <p className="mt-4 text-ink-soft leading-relaxed max-w-2xl text-[15px]">{lead}</p>
      )}
    </div>
  );
}
