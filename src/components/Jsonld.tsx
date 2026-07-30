/** JSON-LD enjeksiyon yardımcısı — şema objesini script etiketine basar. */
export default function Jsonld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
