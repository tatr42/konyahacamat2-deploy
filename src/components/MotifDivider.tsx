/**
 * Geleneksel motif şeridi — bölüm ayırıcı.
 *
 * KULLANIM KURALI (kullanıcı kararı): küçük ve SEYREK. Sitenin tamamına
 * serpiştirilmez; yalnızca ana sayfada bir-iki geçiş noktasında ve footer
 * öncesinde kullanılır. Dekoratif olduğu için `alt=""` ve `aria-hidden`
 * verilir — ekran okuyucu bunu okumamalıdır.
 */
export default function MotifDivider({
  tone = "light",
}: {
  /** light: açık zeminde · dark: lacivert zeminde */
  tone?: "light" | "dark";
}) {
  return (
    <div
      aria-hidden="true"
      className={tone === "dark" ? "bg-navy" : "bg-canvas-deep"}
      style={{
        height: 26,
        backgroundImage: "url('/img/motif-serit.webp')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 26px",
        backgroundPosition: "center",
        opacity: tone === "dark" ? 0.5 : 0.75,
      }}
    />
  );
}
