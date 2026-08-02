/**
 * Eğitim programı verisi — sayfalar ve Course JSON-LD tek kaynaktan beslenir.
 *
 * SERTİFİKA DİLİ KURALI (kullanıcı kararı, 2026-07-25):
 * Verilen belge Akademi'nin KENDİ kurum sertifikasıdır. Hiçbir yerde
 * "akredite", "onaylı", "resmi", "uluslararası geçerli" ifadesi KULLANILMAZ —
 * sağlık eğitiminde kanıtlanamayan yetki iddiası hem Google (YMYL güven
 * sinyali) hem mevzuat açısından risktir.
 */

export const CREDENTIAL = "Ebusadullah Akademi kurum katılım ve uzmanlık sertifikası";

export interface Module {
  title: string;
  detail: string;
}

/**
 * Terapi bağlamı — sayfaya derinlik katan ama KANİBALİZASYON ÜRETMEYEN blok.
 *
 * Kural: uygulamanın NE OLDUĞU burada kısaca (2–3 paragraf) anlatılır, çünkü
 * eğitimi anlamak için gerekli. Ancak "hacamat tedavisi", "sülük seansı",
 * "randevu" gibi HİZMET niyetli sorgular bu sitenin hedefi DEĞİLDİR; o niyet
 * bağlamsal linkle kardeş domaine devredilir. Bu yüzden blok kısadır ve
 * kendi başına bir "hacamat nedir" sayfasına dönüşmez.
 */
export interface TherapyContext {
  title: string;
  paragraphs: string[];
  /** Hizmet niyetini devreden bağlamsal link */
  handoff: { text: string; anchor: string; href: string };
}

export interface Program {
  slug: "hacamat-egitimi" | "suluk-egitimi";
  /** Sayfa H1 */
  title: string;
  /** Course şemasındaki resmi program adı */
  courseName: string;
  tagline: string;
  description: string;
  /** Kimler için uygundur */
  audience: string[];
  modules: Module[];
  /** Program çıktıları */
  outcomes: string[];
  durationLabel: string;
  /** ISO 8601 süre — CourseInstance için */
  durationISO: string;
  format: string;
  /** Uygulamanın kendisine dair kısa bağlam + kardeş siteye devir */
  therapy: TherapyContext;
  faqs: { q: string; a: string }[];
}

export const PROGRAMS: Program[] = [
  {
    slug: "hacamat-egitimi",
    title: "Hacamat Eğitimi",
    courseName: "Hacamat (Kupa Terapisi) Uzmanlık Eğitimi",
    tagline: "Teorik temel + Konya'da uygulamalı kamp + kurum sertifikası",
    description:
      "Hacamat eğitimi; kuru ve yaş uygulamanın teorik temelini, nokta haritasını, hijyen ve steril çalışma disiplinini, danışan değerlendirmesini ve uygulama sonrası bakımı kapsayan bütüncül bir programdır. Dersler çevrimiçi işlenir, uygulama modülü Konya'daki merkezimizde yüz yüze yapılır.",
    audience: [
      "Mesleğe sıfırdan başlamak isteyenler",
      "Geleneksel ve tamamlayıcı uygulamalarla ilgilenen sağlık çalışanları",
      "Kendi uygulama merkezini açmayı planlayanlar",
      "Aile içi uygulama için doğru bilgiyi kaynağından öğrenmek isteyenler",
    ],
    modules: [
      { title: "Hacamatın Tanımı, Tarihi ve Kaynakları", detail: "Uygulamanın geleneksel dayanakları, kavram sözlüğü ve modern literatürdeki yeri." },
      { title: "Anatomi ve Nokta Haritası", detail: "Kâhil (ense-omuz) bölgesi başta olmak üzere klasik noktalar, seçim mantığı ve kaçınılması gereken bölgeler." },
      { title: "Kuru Hacamat Tekniği", detail: "Vakum yönetimi, süre, kupa seçimi ve cilt tepkilerinin okunması." },
      { title: "Yaş Hacamat Tekniği", detail: "Çizik derinliği, sıralama, kanama kontrolü ve işlem sonrası kapama." },
      { title: "Hijyen, Sterilizasyon ve Atık Yönetimi", detail: "Tek kullanımlık malzeme disiplini, çapraz bulaş önleme, kesici-delici atık prosedürü." },
      { title: "Danışan Değerlendirme ve Sınırlar", detail: "Uygulanmaması gereken durumlar, ilaç kullanımı sorgusu, hekime yönlendirme refleksi." },
      { title: "Uygulama Kampı (Konya, Yüz Yüze)", detail: "Eğitmen gözetiminde birebir uygulama, hata düzeltme ve değerlendirme." },
      { title: "Meslekleşme ve Etik", detail: "Danışan iletişimi, kayıt tutma, tanıtımda dürüst dil ve etik sınırlar." },
    ],
    outcomes: [
      "Kuru ve yaş hacamatı steril koşullarda, doğru nokta seçimiyle uygulayabilme",
      "Uygulanmaması gereken durumları tanıyıp danışanı hekime yönlendirebilme",
      "Kendi çalışma alanının hijyen düzenini kurabilme",
      "Danışan kaydı ve takip sürecini yönetebilme",
    ],
    durationLabel: "Teorik modüller + 2 günlük yüz yüze uygulama kampı",
    durationISO: "P6W",
    format: "Çevrimiçi teorik dersler · Konya'da yüz yüze uygulama",
    therapy: {
      title: "Neyi öğretiyoruz? Hacamat uygulaması kısaca",
      paragraphs: [
        "Hacamat (kupa terapisi), belirli bölgelere vakumlu kupa uygulanarak yapılan geleneksel bir yöntemdir. Kuru hacamatta yalnızca vakum uygulanır; yaş hacamatta ise vakum sonrası yüzeysel çiziklerle işlem tamamlanır. İkisi farklı teknik, farklı hazırlık ve farklı hijyen disiplini gerektirir — eğitimde bu ayrım ayrı modüllerde işlenir.",
        "Uygulamada noktalar rastgele seçilmez; kâhil (ense-omuz) bölgesi başta olmak üzere klasik bir harita mantığı vardır. Ancak asıl belirleyici olan, danışanın durumuna göre uygulamanın yapılıp yapılmayacağına karar verebilmektir. Bu yüzden programımızda teknik kadar sınırlar da öğretilir: kan sulandırıcı kullanımı, kanama bozuklukları ve gebelik gibi durumlarda uygulama yapılmaz, danışan hekime yönlendirilir.",
        "Hacamat ve sülük geleneksel ve tamamlayıcı uygulamalardır; hekim tedavisinin yerine geçmez ve eğitimde bu dil özenle korunur.",
      ],
      handoff: {
        text: "Eğitim değil, uygulama mı arıyorsunuz? Seans ve randevu talepleri kardeş sitemiz üzerinden yürütülür:",
        anchor: "Konya hacamat ve sülük terapisi hizmetleri",
        href: "https://www.konyahacamat.net/hizmetler/hacamat",
      },
    },
    faqs: [
      {
        q: "Hacamat eğitimi için ön şart var mı?",
        a: "Sağlık alanında diploma şartı aranmaz; programa sıfırdan başlayanlar için temel modüller baştan işlenir. Yalnızca 18 yaşını doldurmuş olmak ve uygulama kampına katılabilecek durumda olmak gerekir.",
      },
      {
        q: "Eğitim sonunda hangi belge veriliyor?",
        a: `Program sonunda ${CREDENTIAL} düzenlenir. Bu belge Akademi'nin kendi kurum belgesidir; herhangi bir resmî yetki, akreditasyon veya meslek icra hakkı ifade etmez. Belgenin doğruluğu sitemizdeki sertifika doğrulama sayfasından kontrol edilebilir.`,
      },
      {
        q: "Dersler tamamen online mı?",
        a: "Teorik modüller çevrimiçi işlenir ve tekrar izlenebilir. Uygulama modülü ise Konya'daki merkezimizde yüz yüze yapılır; hacamat el becerisi gerektirdiği için bu bölüm uzaktan tamamlanamaz.",
      },
      {
        q: "Eğitim ücreti ne kadar?",
        a: "Ücret; seçilen program kapsamına, uygulama seti dahil olup olmamasına ve dönem kontenjanına göre değişir. Güncel tutarı ve taksit seçeneklerini WhatsApp üzerinden netleştiriyoruz.",
      },
      {
        q: "Eğitim setini kendim mi temin edeceğim?",
        a: "Uygulama seti (steril kupa, tek kullanımlık malzeme) program paketine dahil edilebilir ya da kendiniz temin edebilirsiniz. Malzeme tedariği konusunda kardeş sitemiz üzerinden de destek veriyoruz.",
      },
      {
        q: "Kursu bitirince muayenehane açabilir miyim?",
        a: "Hayır. Bu eğitim mesleki yeterlilik kazandırmaya yönelik bir kurum programıdır; klinik açma veya tıbbi işlem yapma yetkisi vermez. Türkiye'de geleneksel ve tamamlayıcı tıp uygulamalarının yasal çerçevesi ilgili mevzuatla belirlenir, bunu eğitim boyunca açıkça anlatıyoruz.",
      },
    ],
  },
  {
    slug: "suluk-egitimi",
    title: "Sülük (Hirudoterapi) Eğitimi",
    courseName: "Sülük Terapisi (Hirudoterapi) Uzmanlık Eğitimi",
    tagline: "Tıbbi sülük biyolojisinden uygulama disiplinine kadar bütüncül program",
    description:
      "Sülük eğitimi; tıbbi sülüğün biyolojisi, doğru tür seçimi, saklama ve besleme koşulları, uygulama bölgeleri, işlem sonrası bakım ve atık yönetimi konularını kapsar. Hacamattan farklı bir canlı materyalle çalışıldığı için hijyen ve etik başlıkları ayrı ele alınır.",
    audience: [
      "Hacamat eğitimini tamamlayıp alanını genişletmek isteyenler",
      "Geleneksel uygulamalarla ilgilenen sağlık çalışanları",
      "Sülük uygulaması yapan ancak bilgisini sistematikleştirmek isteyenler",
    ],
    modules: [
      { title: "Tıbbi Sülük Biyolojisi", detail: "Hirudo verbana ve akrabaları, salgı içeriği, etki mekanizması hakkında güncel bilgi." },
      { title: "Tür Seçimi ve Tedarik", detail: "Tıbbi sülük ile doğal ortam sülüğü farkı, güvenilir tedarik ve kabul kriterleri." },
      { title: "Saklama, Besleme ve Bakım", detail: "Su kalitesi, sıcaklık, karantina süresi ve canlı materyalin refahı." },
      { title: "Uygulama Bölgeleri ve Seans Yönetimi", detail: "Bölge seçimi, sülük tutunma teknikleri, seans süresi ve gözlem." },
      { title: "İşlem Sonrası Bakım ve Kanama Yönetimi", detail: "Sızıntı süresi, pansuman, danışanın bilgilendirilmesi." },
      { title: "Kontrendikasyonlar ve Risk Yönetimi", detail: "Kan sulandırıcı kullanımı, alerji, bağışıklık durumu ve hekime yönlendirme." },
      { title: "Atık Yönetimi ve Etik", detail: "Kullanılmış sülüğün imhası, tekrar kullanım yasağı, dürüst tanıtım dili." },
      { title: "Uygulama Kampı (Konya, Yüz Yüze)", detail: "Eğitmen gözetiminde birebir uygulama ve değerlendirme." },
    ],
    outcomes: [
      "Tıbbi sülüğü uygun koşullarda saklayıp güvenle uygulayabilme",
      "Risk grubundaki danışanı tanıyıp uygulamadan kaçınabilme",
      "İşlem sonrası bakımı ve atık sürecini kurallara uygun yönetebilme",
    ],
    durationLabel: "Teorik modüller + yüz yüze uygulama oturumu",
    durationISO: "P4W",
    format: "Çevrimiçi teorik dersler · Konya'da yüz yüze uygulama",
    therapy: {
      title: "Neyi öğretiyoruz? Sülük terapisi kısaca",
      paragraphs: [
        "Sülük terapisi (hirudoterapi), kontrollü koşullarda üretilen tıbbi sülüğün belirli bir bölgeye uygulanmasıyla yapılır. Hacamattan en önemli farkı, canlı bir materyalle çalışılmasıdır: sülüğün nereden geldiği, nasıl saklandığı ve uygulama sonrası ne olacağı, tekniğin kendisi kadar belirleyicidir.",
        "Bu nedenle eğitimimiz yalnızca uygulama anını değil; tedarik ve karantina, su kalitesi ve barındırma koşulları, seans yönetimi, işlem sonrası bakım ve atık yönetimini de kapsar. Tek danışan – tek sülük kuralı ve kullanılmış materyalin mevzuata uygun imhası, programın tartışmaya kapalı başlıklarındandır.",
        "Sülük uygulaması da geleneksel ve tamamlayıcı bir yöntemdir; tedavi garantisi içeren bir dil kullanılmaz ve risk grubundaki danışan hekime yönlendirilir.",
      ],
      handoff: {
        text: "Uygulama yaptırmak veya tıbbi sülük temin etmek istiyorsanız kardeş sitemize göz atın:",
        anchor: "sülük terapisi ve tıbbi sülük satışı",
        href: "https://www.konyahacamat.net/hizmetler/suluk",
      },
    },
    faqs: [
      {
        q: "Sülük eğitimi için önce hacamat eğitimi almak şart mı?",
        a: "Şart değil; iki program bağımsız alınabilir. Ancak ikisini birlikte tamamlayanlar için ortak hijyen ve danışan değerlendirme modülleri tekrar edilmez.",
      },
      {
        q: "Uygulamada kullanılan sülükler nereden temin ediliyor?",
        a: "Eğitimde tıbbi sülük kullanılır ve güvenilir tedarik zinciri anlatılır. Doğadan toplanan sülüklerin neden kullanılmaması gerektiği ayrı bir modül başlığıdır.",
      },
      {
        q: "Sülük eğitimi sonunda hangi belge veriliyor?",
        a: `Program sonunda ${CREDENTIAL} düzenlenir. Belge kurum belgesidir; resmî yetki veya akreditasyon iddiası taşımaz.`,
      },
      {
        q: "Bir sülük birden fazla kişide kullanılabilir mi?",
        a: "Kesinlikle hayır. Tek danışan – tek sülük kuralı programın en katı başlıklarındandır; kullanılan sülüğün imhası da mevzuata uygun şekilde anlatılır.",
      },
      {
        q: "Eğitim kaç kişilik gruplarla yapılıyor?",
        a: "Uygulama oturumları küçük gruplarla yürütülür; herkesin eğitmen gözetiminde birebir uygulama yapabilmesi esastır. Dönem kontenjanı bu nedenle sınırlıdır.",
      },
    ],
  },
];

export function getProgram(slug: Program["slug"]): Program {
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Program bulunamadı: ${slug}`);
  return p;
}
