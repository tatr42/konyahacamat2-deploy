/**
 * Türkçe ek uyumu — il adlarına kesme işaretli hâl eki getirir.
 *
 * 81 il adı şablona girdiği için "Uşak'da", "Bilecik'da", "Kars'da" gibi
 * hatalar sayfa sayfa çoğalır ve metnin güvenilirliğini düşürür. Bu modül
 * iki kuralı birlikte uygular:
 *   1. Büyük ünlü uyumu — son ünlü kalın (a, ı, o, u) ise "a", ince ise "e".
 *   2. Ünsüz benzeşmesi — sözcük sert ünsüzle (f, s, t, k, ç, ş, h, p)
 *      bitiyorsa bulunma/ayrılma ekinin ünsüzü sertleşir (d → t).
 *
 * Özel adlarda ek kesme işaretiyle ayrılır ve sözcüğün yazımı korunur
 * (Sinop'a, Tokat'a — yumuşama yazıya yansıtılmaz).
 */

const KALIN = "aıouâî";
const INCE = "eiöü";
const SERT_UNSUZ = "fstkçşhp";

/**
 * İSTİSNALAR — "-eli" ile biten il adları (Kocaeli, Kırklareli, Tunceli)
 * yapıca iyelik eki taşıdığı için hâl ekinden önce kaynaştırma "n"si alır:
 * Kocaeli'NDE, Kocaeli'NE, Kocaeli'NDEN. Kural motoru bunu üretemez, tabloyla
 * verilir. Ayrıca resmî yazımda kesme sonrası ek küçük harfle devam eder.
 */
const IYELIK_ISTISNA = new Set(["Kocaeli", "Kırklareli", "Tunceli"]);

/** Sözcüğün son ünlüsüne göre kalın/ince ayrımı. */
function sonUnluKalinMi(word: string): boolean {
  const lower = word.toLocaleLowerCase("tr");
  for (let i = lower.length - 1; i >= 0; i--) {
    const ch = lower[i];
    if (KALIN.includes(ch)) return true;
    if (INCE.includes(ch)) return false;
  }
  return true; // ünlü bulunamazsa kalın varsayılır
}

function sertUnsuzleMiBitiyor(word: string): boolean {
  const last = word.toLocaleLowerCase("tr").slice(-1);
  return SERT_UNSUZ.includes(last);
}

function unluIleMiBitiyor(word: string): boolean {
  const last = word.toLocaleLowerCase("tr").slice(-1);
  return KALIN.includes(last) || INCE.includes(last);
}

/** Bulunma hâli: Konya'da · Uşak'ta · Bilecik'te · Kocaeli'nde */
export function locative(name: string): string {
  if (IYELIK_ISTISNA.has(name)) return `${name}'nde`;
  const d = sertUnsuzleMiBitiyor(name) ? "t" : "d";
  const v = sonUnluKalinMi(name) ? "a" : "e";
  return `${name}'${d}${v}`;
}

/** Ayrılma hâli: Konya'dan · Uşak'tan · Bilecik'ten · Kocaeli'nden */
export function ablative(name: string): string {
  if (IYELIK_ISTISNA.has(name)) return `${name}'nden`;
  const d = sertUnsuzleMiBitiyor(name) ? "t" : "d";
  const v = sonUnluKalinMi(name) ? "a" : "e";
  return `${name}'${d}${v}n`;
}

/** Yönelme hâli: Konya'ya · Uşak'a · Bilecik'e · Kocaeli'ne */
export function dative(name: string): string {
  if (IYELIK_ISTISNA.has(name)) return `${name}'ne`;
  const v = sonUnluKalinMi(name) ? "a" : "e";
  const buffer = unluIleMiBitiyor(name) ? "y" : "";
  return `${name}'${buffer}${v}`;
}

/** İlgi hâli: Konya'nın · Uşak'ın · Bilecik'in · İzmir'in */
export function genitive(name: string): string {
  const kalin = sonUnluKalinMi(name);
  const lower = name.toLocaleLowerCase("tr");
  let v: string;
  if (kalin) {
    v = /[ou]/.test(lower.split("").reverse().find((c) => KALIN.includes(c) || INCE.includes(c)) ?? "")
      ? "u"
      : "ı";
  } else {
    v = /[öü]/.test(lower.split("").reverse().find((c) => KALIN.includes(c) || INCE.includes(c)) ?? "")
      ? "ü"
      : "i";
  }
  const buffer = unluIleMiBitiyor(name) ? "n" : "";
  return `${name}'${buffer}${v}n`;
}
