/**
 * İL KURS SAYFASI İÇERİK MOTORU.
 *
 * TASARIM İLKESİ — "yapı değişsin, sadece kelime değil":
 *   Kopya içerik ölçümünde (5-gram Jaccard) belirleyici olan, sayfaların
 *   ORTAK metin oranıdır. Şablona `${il}` yerleştirmek bu oranı düşürmez.
 *   Bu yüzden burada üç mekanizma birlikte çalışır:
 *     1. `iklim` sınıfı FARKLI BLOK bastırır (dört ayrı kontrol listesi
 *        havuzu) — donma riski olan ilde sıcak iklim metni hiç üretilmez.
 *     2. `ulasimSinifi` kamp katılım planını üç ayrı havuzdan kurar.
 *     3. Her havuzdan seçim İL BAZINDA DÖNER (bkz. `rotate`). Aynı sınıftaki
 *        iki il aynı maddeleri değil, kesişimi küçük iki alt küme gösterir.
 *
 * ÖLÇÜM GEÇMİŞİ (bu dosyanın neden böyle olduğu):
 *   İlk sürümde her iklim sınıfı SABİT 6 maddelik bir liste basıyordu.
 *   21 il "aşırı sıcak" listesini harfi harfine paylaşınca ölçüm şöyleydi:
 *     il-il Jaccard (yalnız <main>): medyan %28,2 · en kötü çift %58,9
 *   Rotasyon eklendikten sonraki değerler README/oturum kaydındadır.
 *   Hedef: medyan < %25, en kötü çift < %35.
 *
 * TEKRARLANAN BİLGİ METİNDE DEĞİL YAPIDA:
 *   Program akışı, sertifika kapsamı ve hijyen ilkeleri gibi her ilde AYNI
 *   olması gereken bilgiler paragraf olarak değil, bileşen/liste olarak
 *   sunulur. Aynı bilgi tekrar eder ama kopya METİN üretmez.
 *
 * YMYL DİLİ:
 *   Hiçbir blokta hastalık iyileştirme iddiası, "kesin sonuç", "şifa garantisi"
 *   ya da mevzuat uygunluk iddiası yer almaz. Sertifika dili `CREDENTIAL`
 *   sabitinden gelir ve kurum belgesi olduğu her sayfada açıkça yazılır.
 */

import { PROVINCES, type Province } from "@/data/tr-provinces";
import {
  PROVINCE_EDU_PROFILES,
  type IklimSinifi,
  type ProvinceEducationProfile,
  type UlasimSinifi,
} from "@/data/province-education-profiles";
import { citySupplyLink, cityMaterialLink, type SisterLink } from "@/data/ecosystem";
import { locative, dative, ablative, genitive } from "@/lib/tr-case";
import { rotate, pickOne, seedFor } from "@/lib/rotate";

export interface CityBlock {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Checklist {
  title: string;
  intro: string;
  items: string[];
}

export interface CampStep {
  label: string;
  detail: string;
}

export interface CityCourseContent {
  province: Province;
  profile: ProvinceEducationProfile;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  blocks: CityBlock[];
  climateChecklist: Checklist;
  campTitle: string;
  campSteps: CampStep[];
  faqs: { q: string; a: string }[];
  supplyLink: SisterLink | null;
  materialLink: SisterLink | null;
  regionSiblings: Province[];
  /** Aşağıdakiler de ile göre DÖNER — 81 sayfada birebir aynı metin kalmasın. */
  programsLead: string;
  supplyHeading: string;
  ctaLead: string;
  disclaimer: string;
}

/* ------------------------------------------------------------------ */
/* İklim sınıfına göre KONTROL LİSTESİ — dört havuz, ile göre seçim     */
/* ------------------------------------------------------------------ */

interface ChecklistPool {
  title: (name: string) => string;
  intro: string[];
  items: string[];
}

const IKLIM_HAVUZLARI: Record<IklimSinifi, ChecklistPool> = {
  "donma-riski": {
    title: (name) => `Soğuk iklim kontrol listesi — ${locative(name)} uygulama yaparken`,
    intro: [
      "Tıbbi sülük canlı bir organizmadır ve bulunduğu suyun sıcaklığına bağımlıdır. Donma noktasına yaklaşan suda canlı hareketsizleşir ve seansa alınmaz. Bu ilde eğitimin ayrı bir başlığı, soğuğa karşı çalışma disiplinidir:",
      "Uzun kışın geçtiği illerde saklama bir bakım işi değil, planlama işidir. Sıcaklık düştükçe sülüğün hareketi azalır, tutunma davranışı zayıflar ve seans güvenilirliğini kaybeder. Programda bu ile özgü şu başlıklar ayrıca çalışılır:",
      "Soğuk, sülük uygulamasında en sık gözden kaçan kısıttır; çünkü sorun seans anında değil, ondan önceki saklama ve taşıma aşamasında oluşur. Bu ilde çalışacak kursiyer için kontrol listesi şöyledir:",
      "Bu ilde saklama, yılın büyük bölümünde tek bir soruya indirgenir: su kaç dereceye kadar düştü? Cevabı tahminle değil ölçümle verildiğinde seans güvenli kalır. Programda çalışılan başlıklar şunlardır:",
      "Kışın uzun sürdüğü yerlerde asıl risk ani bir donma değil, sıcaklığın günlerce sınırda seyretmesidir. Bu yavaş etki fark edilmediği için ayrı bir disiplin gerektirir:",
      "Sülüğün soğuğa tepkisi kademelidir: önce hareket azalır, sonra tutunma zayıflar. Bunu erken görebilmek için bu ilde şu alışkanlıklar kurulur:",
    ],
    items: [
      "Kabın bulunduğu odanın gece sıcaklığı ölçülür; gündüz ölçümü tek başına yanıltıcıdır.",
      "Isıtmanın gece kısıldığı binalarda kap, ısıtma programı kesintisiz olan bölmeye alınır.",
      "Taşımada yalıtımlı kutu kullanılır; kutunun içine doğrudan ısı kaynağı (termofor, ısıtıcı) konmaz.",
      "Araçta kap, kalorifer menfezinin karşısına yerleştirilmez — ani ısınma en az ani soğuma kadar risklidir.",
      "Varışta kap oda sıcaklığına kademeli alınır; su bir defada değiştirilmez.",
      "Elektrik veya doğal gaz kesintisi ihtimaline karşı yalıtımlı kutu hazır bulundurulur.",
      "Kap; dış duvara bitişik dolapta, giriş holünde, balkonda veya ısıtılmayan depoda bırakılmaz.",
      "Sabah ilk iş su sıcaklığı okunur ve kayda geçirilir; seans planı bu okumaya göre yapılır.",
      "Kış malzeme stoğu sonbaharda tamamlanır — yol kapanması tedariki günlerce erteleyebilir.",
      "Danışan seans sonrası doğrudan soğuğa çıkarılmaz; dinlenme alanı ısıtılmış olarak planlanır.",
      "Kar ve tipi ihtimali olan günlerde randevular teyitli verilir; iptal işleyişin normal parçası sayılır.",
      "Uygulama odası seans öncesi ısıtılır, ancak sıcak hava akımı doğrudan açık cilt bölgesine yönlendirilmez.",
    ],
  },
  "asiri-sicak": {
    title: (name) => `Sıcak iklim kontrol listesi — ${locative(name)} uygulama yaparken`,
    intro: [
      "Isınan suda çözünmüş oksijen azalır; sülük halsizleşir ve tutunma davranışı bozulur. Sıcak illerde eğitimin ayrı bir başlığı, ısıya karşı çalışma disiplinidir:",
      "Bu ilde belirleyici olan tek bir sıcak gün değil, sıcağın süresidir. Haftalarca yüksek seyreden sıcaklık, kısa süreli önlemleri işe yaramaz kılar. Programda şu başlıklar ayrıca çalışılır:",
      "Sıcak iklimde saklamanın kuralı soğuk iklimin tam tersidir: burada amaç ısınmayı engellemektir. Bu ilde çalışacak kursiyer için kontrol listesi şöyledir:",
      "Bu ilde kabın konumu, kabın kendisinden daha önemlidir: aynı odanın iki farklı köşesi arasında birkaç derece fark olabilir. Programda çalışılan başlıklar şunlardır:",
      "Sıcakta hata genellikle ihmalden değil, iyi niyetli bir müdahaleden çıkar: suyu soğutmak için buz eklemek gibi. Bu yüzden liste hem yapılacakları hem yapılmayacakları içerir:",
      "Yaz boyunca sabit kalan yüksek sıcaklık, kısa süreli çözümleri işe yaramaz kılar; kalıcı bir düzen gerekir. Bu ilde kurulan düzen şöyledir:",
    ],
    items: [
      "Kap doğrudan güneş gören hiçbir yüzeye ve pencere önüne konmaz.",
      "Yaz aylarında su değişim aralığı kısaltılır; su seviyesi işaretlenerek izlenir.",
      "Tamamlama, aynı sıcaklığa getirilmiş suyla yapılır; doğrudan musluk suyu eklenmez.",
      "İklimlendirme gece kapatılmaz — kapatıldığında su sıcaklığının kaç saatte kaç derece yükseldiği bir kez ölçülerek görülür.",
      "Taşımada kap araç bagajına konmaz; bagaj sıcaklığı kabin sıcaklığının belirgin üzerindedir.",
      "Klima akımı doğrudan kabın ya da danışanın açık cilt bölgesinin üzerine gelmez.",
      "Kap üst katta veya çatı arasında değil, mümkünse zemin katta ve kuzey cephede tutulur.",
      "Su sıcaklığı elle değil termometreyle, günde iki kez okunur ve kayda geçirilir.",
      "Elektrik kesintisi ihtimaline karşı gölgeli ve hava akımı olan bir yedek konum önceden belirlenir.",
      "Seanslar günün en sıcak saatlerine değil, erken sabaha veya geç akşama planlanır.",
      "Danışan sıcaktan gelmişse seans öncesi dinlendirilir; terli cilde uygulama yapılmaz.",
      "Buharlaşma hızlandığı için kabın kapağı hava alacak biçimde, ancak tamamen açık bırakılmadan kapatılır.",
    ],
  },
  "yuksek-nem": {
    title: (name) => `Yüksek nem kontrol listesi — ${locative(name)} uygulama yaparken`,
    intro: [
      "Bu ilde kritik değişken sıcaklık değil nemdir. Kâğıt ve pamuklu ambalajlı steril malzeme nem çeker; nem çekmiş ambalajda steriliteye güvenilmez. Eğitimin ayrı bir başlığı, neme karşı malzeme disiplinidir:",
      "Nem, sıcaklık gibi anlık okunabilen bir değişken değildir; etkisini haftalar içinde ambalaj üzerinde gösterir. Bu yüzden bu ilde kontrol listesi sülükten çok malzeme üzerinedir:",
      "Yağışın yıla yayıldığı illerde uygulama sonrası bakım da farklılaşır: kapama malzemesi daha çabuk nemlenir, takip aralığı kısalır. Bu ilde çalışacak kursiyer için liste şöyledir:",
      "Bu ilde en sık yapılan hata, malzemeyi “kapalı dolapta duruyor” diye güvende saymaktır. Kapalı dolap nemi dışarıda tutmaz; nem geçirmez ambalaj tutar. Programda çalışılan başlıklar şunlardır:",
      "Nemin zararı gözle görülmediği için ölçülmeden fark edilmez. Bu ilde kontrol listesi bir alışkanlık listesi olarak kurulur:",
      "Yüksek nemde hem depolama hem uygulama sonrası takip değişir; ikisi birlikte planlanmazsa biri diğerini boşa çıkarır:",
    ],
    items: [
      "Steril malzeme orijinal ambalajında, nem geçirmeyen kapalı kutuda saklanır.",
      "Kutular yerden yüksekte ve dış duvara temas etmeyecek şekilde konumlandırılır.",
      "Ambalajı gevşemiş, nemlenmiş ya da şüpheli her malzeme kullanılmaz, imha edilir.",
      "Uygulama odası seans öncesi havalandırılır; hava akımı danışanın üzerine yönlendirilmez.",
      "Uygulama sonrası kapama malzemesi, kuru iklimlere göre daha erken değiştirilir.",
      "Danışana bakım talimatı sözlü değil yazılı verilir; nemli havada takip aralığı kısadır.",
      "Dolap içine nem tutucu konur ve düzenli değiştirilir; kutu içi kontrolü aylık yapılır.",
      "Zemin katta ve bodrumda malzeme deposu kurulmaz; yoğuşma en çok orada görülür.",
      "Kışın iç mekân yoğuşması için duvar ile dolap arasında hava boşluğu bırakılır.",
      "Stok, uzun süre bekleyecek büyük partiler yerine sık ve küçük partiler hâlinde tutulur.",
      "Danışana, pansumanın ıslanması hâlinde ne yapacağı seans çıkışında anlatılır.",
      "Uygulama odasının nem oranı bir kez ölçülür; kalıcı yüksek nem varsa çalışma düzeni yeniden kurulur.",
    ],
  },
  "iliman-karasal": {
    title: (name) => `Mevsim geçişi kontrol listesi — ${locative(name)} uygulama yaparken`,
    intro: [
      "Bu ilde tek bir uç koşul yoktur; asıl zorluk mevsimler arasındaki geniş fark ve gece-gündüz salınımıdır. Yılın tamamı için kurulan sabit bir düzen, iki uç dönemde yanıltır:",
      "Ilıman görünen iller, uç koşulu olmadığı için en çok ihmal edilen illerdir. Oysa aynı oda kışın ve yazın iki farklı ortamdır. Programda bu ile özgü şu başlıklar çalışılır:",
      "Burada kontrol listesinin amacı bir tehlikeyi önlemek değil, alışkanlığın körleşmesini önlemektir: koşullar yavaş değiştiği için fark edilmez. Bu ilde çalışacak kursiyer için liste şöyledir:",
      "Bu ilde risk keskin değil sinsidir: hiçbir gün “olağanüstü” olmadığı için düzen hiç gözden geçirilmez. Programda çalışılan başlıklar şunlardır:",
      "Gece ile gündüz arasındaki fark, mevsimler arasındaki farktan daha çok hata üretir; çünkü aynı gün içinde olur ve kimse ölçmez. Bu ilde liste şöyledir:",
      "Ilıman iller için kurulan kontrol listesi, uç koşullardan çok geçiş dönemlerine odaklanır:",
    ],
    items: [
      "Saklama düzeni yıl başında bir kez değil, her mevsim dönümünde yeniden değerlendirilir.",
      "Gündüz uygun görünen bir konumun gece sıcaklığı ayrıca ölçülür.",
      "Isıtma sezonunda iç mekân nemi düştüğü için su seviyesi daha sık kontrol edilir.",
      "Kap, dış duvara bitişik bölmelerde ve ısıtılmayan giriş veya balkon alanlarında bırakılmaz.",
      "Yaz aylarında kabın konumu değiştirilir; kış konumu yaz için varsayılmaz.",
      "Ölçüm kayıt altına alınır — hafızaya değil kayda dayanan bir düzen kurulur.",
      "İki uç mevsimde seans saatleri kaydırılır; ara mevsimlerde takvim serbest bırakılabilir.",
      "Kalorifer sezonunun başladığı ve bittiği hafta, kontrol sıklığı bilinçli olarak artırılır.",
      "Aynı il içinde farklı rakımda çalışılıyorsa her mekân için ayrı ölçüm yapılır.",
      "Danışanın seans sonrası dinlenme süresi kışın uzatılır, yazın serinleme için ayrılır.",
      "Malzeme stoğu mevsimlik değil kullanım hızına göre planlanır; uzun bekleyen stok gözden geçirilir.",
      "Yılda bir kez tüm saklama düzeni baştan gözden geçirilir ve yazılı hâle getirilir.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Ulaşım sınıfına göre KAMP PLANI — üç havuz, ile göre seçim           */
/* ------------------------------------------------------------------ */

const KAMP_HAVUZLARI: Record<UlasimSinifi, (name: string) => CampStep[]> = {
  yakin: (name) => [
    { label: "Teorik modüller", detail: "Çevrimiçi işlenir; kendi programınıza göre izler ve soru saatlerine katılırsınız." },
    { label: "Günübirlik uygulama", detail: `Konya'ya yakınlık nedeniyle uygulama günlerine ${ablative(name)} sabah gelip akşam dönebilirsiniz; konaklama zorunlu değildir.` },
    { label: "Tekrar imkânı", detail: "Yakın illerden gelen kursiyerler uygulama gününü sonraki dönemlerde tekrar izleyebilir." },
    { label: "Değerlendirme", detail: "Uygulama sonunda eğitmen gözetiminde değerlendirme yapılır ve kurum sertifikası düzenlenir." },
    { label: "Esnek tarih", detail: `${name} yakınlığı sayesinde uygulama gününü kendi takviminize göre farklı dönemlerden seçebilirsiniz.` },
    { label: "Malzeme teslimi", detail: "Uygulama seti kampta elden teslim edilir; kargo beklemeniz gerekmez." },
    { label: "Soru saati", detail: "Kamp sonrası ilk ay içinde yüz yüze bir soru saatine katılabilirsiniz." },
  ],
  orta: (name) => [
    { label: "Teorik modüller", detail: "Çevrimiçi işlenir; yol planı yapmadan önce teorik bölümü tamamlamanız beklenir." },
    { label: "Tek gecelik program", detail: `${name} mesafesinde kursiyerlerin çoğu uygulama kampını tek gecelik bir Konya programına sığdırır.` },
    { label: "Tarih planlama", detail: "Dönem tarihleri önceden paylaşılır; ulaşım ve konaklamanızı buna göre planlayabilirsiniz." },
    { label: "Değerlendirme", detail: "Uygulama sonunda eğitmen gözetiminde değerlendirme yapılır ve kurum sertifikası düzenlenir." },
    { label: "Konaklama yönlendirmesi", detail: "Merkeze yakın konaklama seçenekleri için yönlendirme yapılır; rezervasyon size aittir." },
    { label: "Yoğun gün düzeni", detail: `${ablative(name)} gelen kursiyerler için uygulama günü sabah erken başlar ve tek günde tamamlanacak şekilde kurgulanır.` },
    { label: "Malzeme teslimi", detail: "Uygulama seti kampta teslim edilir; dönüşte yanınızda götürürsünüz." },
  ],
  uzak: (name) => [
    { label: "Teorik modüller", detail: "Çevrimiçi işlenir; uzak illerdeki kursiyerler için programın büyük bölümü yolculuk gerektirmez." },
    { label: "İki gecelik program", detail: `${name} mesafesinde kursiyerler uygulama kampını genellikle iki gecelik bir Konya programına yayar; bu, yol yorgunluğunun uygulama gününe taşınmasını önler.` },
    { label: "Yoğunlaştırılmış takvim", detail: "Uzak illerden gelenler için uygulama günleri ardışık planlanır; tek seyahatte tamamlanır." },
    { label: "Değerlendirme", detail: "Uygulama sonunda eğitmen gözetiminde değerlendirme yapılır ve kurum sertifikası düzenlenir." },
    { label: "Varış günü dinlenme", detail: `${ablative(name)} gelen kursiyerlere uygulama öncesi bir dinlenme yarım günü bırakmalarını öneriyoruz.` },
    { label: "Uzaktan takip", detail: "Dönüşten sonra ilk uygulamalarınızı çevrimiçi görüşmeyle birlikte değerlendirebiliriz." },
    { label: "Malzeme kargosu", detail: "Uygulama seti isterseniz kampta teslim edilir, isterseniz adresinize kargolanır." },
  ],
};

/* ------------------------------------------------------------------ */
/* Bölgeye göre giriş çerçevesi — bölge başına 3 varyant                */
/* ------------------------------------------------------------------ */

const BOLGE_CERCEVESI: Record<string, string[]> = {
  "İç Anadolu": [
    "İç Anadolu'nun bozkır kuşağında uygulama yapmak, kuru hava ve geniş gece-gündüz farkıyla çalışmayı öğrenmek demektir.",
    "Bu bölgede suyun buharlaşması beklenenden hızlıdır; saklama düzeni bunun üzerine kurulur.",
    "İç Anadolu'da mesafeler uzun, yerleşimler dağınıktır; uygulayıcı çoğu zaman il merkezinde toplanan bir talebe cevap verir.",
    "Kışın kuru soğuk, yazın kuru sıcak; iki uçta da belirleyici olan nem değil sıcaklık farkıdır.",
    "Bozkır illerinde danışanların önemli bölümü çevre ilçelerden gelir; bu, randevu aralıklarını doğrudan etkiler.",
  ],
  Akdeniz: [
    "Akdeniz kuşağında uygulama yapmak, yılın uzun bir bölümünde ısıyla birlikte çalışmayı planlamak demektir.",
    "Bu bölgede kıyı ile dağ eteği arasındaki fark kısa mesafede belirginleşir; tek bir çalışma düzeni her ilçe için geçerli olmaz.",
    "Akdeniz'de sezonluk nüfus hareketi randevu yoğunluğunu yıl içinde değiştirir; takvim buna göre kurulur.",
    "Sıcak dönem uzun sürdüğü için burada saklama bir mevsim işi değil, yılın yarısına yayılan bir düzen işidir.",
    "Akdeniz'de gündüz saatlerinin kullanılamadığı haftalar olur; uygulayıcı çalışma saatini erkene çekmeyi baştan planlar.",
  ],
  Ege: [
    "Ege'de uygulama yapmak, kıyı ile iç kesim arasındaki farkı aynı il içinde yönetmeyi gerektirir.",
    "Bu bölgede hasat dönemleri çalışma temposunu belirler; seans talebi tarım takvimine göre dalgalanır.",
    "Ege'nin iç vadilerinde yaz sıcağı kıyıdan daha serttir; saklama kararı ilin adına göre değil mekânın ölçümüne göre verilir.",
    "Ege'de tarım ve turizm aynı ilde farklı takvimler üretir; danışan profili ilçeden ilçeye değişebilir.",
    "Kıyıda nem, iç kesimde kuruluk baskındır; tek bir saklama düzeni ilin tamamı için yeterli olmaz.",
  ],
  Marmara: [
    "Marmara'da uygulama yapmak, yoğun nüfus ve dar çalışma mekânlarının getirdiği hijyen düzenini kurmayı gerektirir.",
    "Bu bölgede ulaşım süreleri randevu planını doğrudan etkiler; seans aralıkları geniş tutulur.",
    "Marmara'da sanayi istihdamı yoğundur; vardiyalı çalışan danışanlar için akşam saatleri belirleyici olur.",
    "Bölgede çalışma mekânları genellikle küçüktür; hijyen düzeni alan kısıtı gözetilerek kurulur.",
    "Marmara'da danışan çeşitliliği yüksektir; aynı hafta içinde çok farklı meslek gruplarıyla çalışırsınız.",
  ],
  Karadeniz: [
    "Karadeniz kuşağında uygulama yapmak, nemin steril malzeme üzerindeki etkisini sürekli hesaba katmayı gerektirir.",
    "Bu bölgede yağış yıla yayıldığı için depolama, mevsimlik değil sürekli bir disiplindir.",
    "Karadeniz'de eğimli arazide çalışma yaygındır; danışanların yakınmaları da büyük ölçüde bu zeminde şekillenir.",
    "Kıyı ile iç kesim arasındaki fark bu bölgede kısa mesafede belirginleşir; dağın gerisi kıyı iklimini almaz.",
    "Hasat dönemleri bölgenin çalışma temposunu tamamen değiştirir; seans talebi bu takvime göre dalgalanır.",
  ],
  "Doğu Anadolu": [
    "Doğu Anadolu'da uygulama yapmak, uzun kışı bir kısıt olarak değil planlamanın parçası olarak görmeyi gerektirir.",
    "Bu bölgede rakım, iklim tarifinden daha belirleyicidir; aynı il içinde iki ayrı düzen kurmak gerekebilir.",
    "Doğu Anadolu'da malzeme tedariki mevsime bağlıdır; stok planı sonbaharda yapılır.",
    "Kış yılın önemli bir bölümünü kapladığı için burada takvim, hava koşulunu bir değişken olarak baştan içerir.",
    "Açık alanda ve soğukta çalışan danışan oranı yüksektir; başvuru nedenleri de büyük ölçüde bunun etrafında toplanır.",
  ],
  "Güneydoğu Anadolu": [
    "Güneydoğu'da uygulama yapmak, uzun ve sıcak yaz döneminde çalışma düzenini baştan kurmayı gerektirir.",
    "Bu bölgede gece serinlemesi sınırlıdır; gündüz-gece dengelemesine güvenen bir saklama düzeni işe yaramaz.",
    "Güneydoğu'da açık alanda çalışan danışan oranı yüksektir; başvuru nedenleri de büyük ölçüde bunun etrafında toplanır.",
    "Yaz döneminin uzunluğu, uygulayıcının çalışma saatlerini yılın yarısında yeniden kurmasını gerektirir.",
    "Bölgede aktarlık ve bitkisel ürün kültürü canlıdır; danışanlar geleneksel yöntemlere aşinadır.",
  ],
};

/* ------------------------------------------------------------------ */
/* Blok bağlaç cümleleri — sabit değil, ile göre döner                  */
/* ------------------------------------------------------------------ */

const IKLIM_BAGLAC = [
  "Bu konu programda teorik bir bilgi olarak değil, kursiyerin kendi çalışma mekânı üzerinden çözdüğü bir uygulama sorusu olarak işlenir: mekânın koşulları ölçülür, kayda geçirilir ve saklama düzeni bu kayda göre kurulur.",
  "Eğitimde bu başlık ezberlenecek bir kural listesi olarak verilmez. Kursiyer kendi odasının sıcaklığını ölçer, bir süre boyunca kaydeder ve saklama düzenini bu kayıt üzerine kurar; böylece kural değil yöntem öğrenilmiş olur.",
  "Programda bu konu, kursiyerin kendi şehrindeki koşulu bir vaka gibi ele almasıyla işlenir: hangi ölçüm alınacak, hangi eşikte ne yapılacak ve hangi durumda seans ertelenecek — üçü de yazılı hâle getirilir.",
  "Bu başlık eğitimin en somut bölümlerindendir: kursiyer kendi mekânının ölçümlerini getirir, birlikte değerlendirilir ve ona özel bir saklama protokolü çıkarılır.",
  "Konu eğitimde bir ölçüm alışkanlığı olarak kurulur: tahmin etmek yerine okumak, hatırlamak yerine yazmak. Yerel koşulun kendisi değişmez ama ona verilen tepki öğrenilebilir.",
  "Programda bu başlığın amacı kursiyeri korkutmak değil, kararı nesnelleştirmektir: hangi ölçüm hangi eşikte hangi kararı doğurur, önceden yazılır.",
  "Eğitimde bu konu iki soruyla çözülür: mekânınızın en kötü koşulu nedir ve o koşulda ne yaparsınız? Cevaplar kursiyerin kendi ölçümleriyle çıkar.",
  "Bu bölüm, kursiyerin şehrini bir kısıt listesi olarak değil bir çalışma çerçevesi olarak görmesini hedefler; koşulu bilen uygulayıcı, koşula rağmen düzenli çalışır.",
];

/**
 * Sayfa iskeletindeki cümleler de havuzdan gelir.
 *
 * Ölçüm gerekçesi: bu dört metin sabit bırakıldığında 81 sayfanın tamamında
 * birebir aynı ~200 kelime bulunuyordu. Jaccard'da bu, hiçbir il çiftinin
 * altına inemeyeceği bir TABAN oluşturur (ölçülen taban %18,0). Metni silmek
 * tabanı düşürmez — çünkü payda da küçülür; tek çözüm metni çeşitlendirmektir.
 */
const PROGRAM_LEAD = [
  "İl sayfaları programın yerel bağlamını anlatır; modül listesi, süre ve kapsam bilgisi program sayfalarında yer alır.",
  "Bu sayfada şehre özgü koşulları bulacaksınız. Programın modül modül içeriği, süresi ve kimlere uygun olduğu ise aşağıdaki iki sayfada ayrıntılı yazılıdır.",
  "Hangi programın size uygun olduğunu ilinizden bağımsız olarak seçersiniz; il sayfası yalnızca uygulamanın yerel koşullarını ekler.",
  "Aşağıdaki iki program da aynı hijyen ve sınır disipliniyle yürütülür; aralarındaki fark uygulanan yöntemdir.",
  "İki programın da çekirdeği aynıdır: anatomi, hijyen ve uygulanmaması gereken durumlar. Ayrıştıkları nokta teknik bölümdür.",
  "Programı seçerken ölçüt bulunduğunuz il değil, hangi uygulamayı yapmak istediğinizdir. Kararsızsanız kayıt öncesi görüşmede birlikte netleştiriyoruz.",
  "Aşağıdaki sayfalarda modüllerin tamamını, süreyi ve kimlerin katılabileceğini bulacaksınız; burada anlatılan ise uygulamanın yerel tarafıdır.",
  "Eğitimin omurgası her ilde aynıdır. Değişen tek şey, öğrendiğinizi uygulayacağınız yerin koşullarıdır.",
];

const SUPPLY_HEADING = [
  "Uygulamanızı kurarken tedarik tarafı",
  "Eğitim bittikten sonra: malzeme ve sülük tedariki",
  "Kendi çalışma alanınızı kurarken ihtiyacınız olanlar",
  "Tedarik: eğitimin bittiği, uygulamanın başladığı yer",
  "Sülük ve malzeme nereden temin edilir?",
  "Programdan sonraki ilk pratik adım: tedarik",
  "Çalışma alanınızın malzeme ve sülük ihtiyacı",
  "Eğitimin kapsamı dışında kalan başlık: tedarik",
];

const CTA_LEAD = [
  "Dönem takvimi, program kapsamı ve kayıt koşullarını WhatsApp üzerinden hızlıca paylaşıyoruz.",
  "Kontenjan ve tarih bilgisini en hızlı WhatsApp üzerinden alırsınız; hangi programın size uygun olduğunu birlikte belirleyelim.",
  "Başlamadan önce beklentinizi konuşmayı tercih ediyoruz; kısa bir görüşme çoğu soruyu baştan çözüyor.",
  "Dönem tarihleri ve kayıt adımları için yazmanız yeterli; ayrıntıları size özel çıkarıyoruz.",
  "Kontenjan sınırlı olduğu için dönem tarihlerini erken sormanızı öneriyoruz.",
  "Program kapsamı, süre ve katılım koşullarını tek mesajla öğrenebilirsiniz.",
  "Hangi programın işinize yarayacağını konuşalım; yanlış beklentiyle başlayan bir katılım kimseye fayda sağlamıyor.",
  "Size uygun dönemi ve katılım biçimini birlikte planlayalım.",
];

const DISCLAIMER = [
  "Hacamat ve sülük geleneksel ve tamamlayıcı uygulamalardır; hekim tanı ve tedavisinin yerine geçmez. Bu sayfa bir eğitim programını tanıtır, tedavi vaadi içermez.",
  "Bu sayfa bir eğitim programını anlatır. Hacamat ve sülük uygulamaları geleneksel ve tamamlayıcı yöntemlerdir; hekim tanısının ya da tedavisinin yerini almaz ve burada hiçbir tedavi sonucu vaat edilmez.",
  "Sayfadaki bilgiler eğitim içeriğine ilişkindir. Geleneksel ve tamamlayıcı uygulamalar hekim tedavisinin alternatifi değildir; herhangi bir rahatsızlık için önce hekiminize başvurun.",
  "Buradaki anlatım eğitim programının kapsamını gösterir. Hacamat ve sülük, hekim tedavisini tamamlayabilen geleneksel yöntemlerdir; onun yerine geçmez ve bu sayfada sonuç garantisi verilmez.",
  "Anlatılan konu bir eğitim programıdır. Geleneksel uygulamalar tıbbi tedavinin yerini tutmaz; sağlıkla ilgili kararlarınızı hekiminizle birlikte verin.",
  "Bu metin tedavi tavsiyesi değildir. Hacamat ve sülük geleneksel yöntemlerdir ve hekim değerlendirmesinin yerine geçmez; sayfada hiçbir iyileşme iddiası bulunmaz.",
  "Eğitim programına ilişkin bilgilendirmedir. Geleneksel ve tamamlayıcı uygulamalar hekim tedavisiyle yarışmaz, onu tamamlayabilir; hastalık iyileştirme iddiası taşımaz.",
  "Sayfa eğitim tanıtımı amacıyla hazırlanmıştır. Uygulamaların hiçbiri hekim tanısının veya reçetesinin alternatifi değildir.",
];

const TAKVIM_BAGLAC = [
  "Uygulayıcının randevu düzenini yerel takvime göre kurması, danışan devamlılığını doğrudan etkiler.",
  "Yerel çalışma temposunu tanımayan bir randevu düzeni, dolu görünüp boş geçen günler üretir.",
  "Takvimi yerel gerçeğe göre kurmak, hem danışanın seansa gelebilmesini hem uygulayıcının gününü verimli geçirmesini sağlar.",
  "Randevu saatlerini yerel işleyişe uydurmak, iptal oranını düşüren en basit ve en ucuz önlemdir.",
  "Şehrin kendi ritmine oturmayan bir çalışma saati, uygulayıcının en çok vakit kaybettiği yerdir.",
  "Danışanın hangi saatte gelebildiği, hangi seansı istediğinden çoğu zaman daha belirleyicidir.",
  "Yerel takvimi tanımak, boş geçen günleri azaltır ve yoğun dönemlerde kontenjanı doğru bölmenizi sağlar.",
  "Seans planını yerel çalışma düzenine göre kurmak, danışanın seansı yarıda bırakma ihtimalini düşürür.",
];

/* ------------------------------------------------------------------ */
/* SSS — üçü ilden türer, üçü havuzdan döner                            */
/* ------------------------------------------------------------------ */

const SSS_HAVUZU: { q: string; a: string }[] = [
  {
    q: "Eğitimin tamamı çevrimiçi mi?",
    a: "Hayır. Teorik modüller çevrimiçi işlenir, uygulama modülü Konya'daki merkezimizde yüz yüze yapılır. Uygulamalı bölüm olmadan program tamamlanmış sayılmaz ve sertifika düzenlenmez.",
  },
  {
    q: "Sağlık alanında bir diplomam yok, katılabilir miyim?",
    a: "Katılabilirsiniz. Program, mesleğe sıfırdan başlayanlar için de kurgulanmıştır. Ancak verilen belge bir sağlık meslek yetkisi değildir; kapsamı programın kendisiyle sınırlıdır.",
  },
  {
    q: "Verilen sertifika resmî bir yetki sağlıyor mu?",
    a: "Hayır. Verilen belge Akademi'nin kendi kurum sertifikasıdır; katılımı ve program içeriğinde gösterilen yeterliği belgeler. Sağlık alanındaki uygulamalara ilişkin yasal çerçeveyi resmî kaynaklardan doğrulamanız gerekir.",
  },
  {
    q: "Programın süresi ne kadar?",
    a: "Teorik modüller kendi hızınızda ilerlediğiniz bir takvime yayılır; yüz yüze uygulama bölümü ise belirli dönem tarihlerinde yapılır. Güncel dönem takvimini kayıt aşamasında paylaşıyoruz.",
  },
  {
    q: "Eğitimde hangi malzemeler kullanılıyor?",
    a: "Uygulama modülünde tek kullanımlık steril malzeme kullanılır. Kendi uygulamanızı kurarken hangi malzemeyi hangi ölçütle seçeceğiniz de programın konularındandır.",
  },
  {
    q: "Kursu tamamlayan herkes uygulama yapabilir mi?",
    a: "Program teknik yeterliği hedefler, ancak asıl vurgu sınırların bilinmesidir. Uygulanmaması gereken durumları tanımak ve gerektiğinde danışanı hekime yönlendirmek eğitimin ayrılmaz parçasıdır.",
  },
  {
    q: "Hacamat ve sülük eğitimini birlikte alabilir miyim?",
    a: "Alabilirsiniz. İki program ayrı ayrı yürütülür; birlikte almak isteyen kursiyerler için ortak bir takvim kurulur.",
  },
  {
    q: "Uygulama gününde kaç kişi oluyoruz?",
    a: "Uygulama grupları bilinçli olarak küçük tutulur; amaç her kursiyerin eğitmen gözetiminde bizzat uygulama yapabilmesidir.",
  },
  {
    q: "Eğitim sonrası destek veriliyor mu?",
    a: "Evet. Mezunlarımız uygulamada karşılaştıkları durumları eğitmene danışabilir. Bu destek bir tedavi danışmanlığı değil, uygulama ve hijyen disiplinine ilişkin mesleki yönlendirmedir.",
  },
  {
    q: "Kadın kursiyerler için ayrı düzenleme var mı?",
    a: "Uygulama oturumlarında mahremiyet gözetilerek düzenleme yapılır; talebinizi kayıt aşamasında iletmeniz yeterlidir.",
  },
  {
    q: "Sertifikamın doğruluğunu üçüncü kişiler nasıl teyit eder?",
    a: "Sitemizdeki sertifika doğrulama sayfasından belge numarasıyla sorgulama yapılabilir. Bu, belgenin bize ait olduğunu teyit eder; yasal bir yetki beyanı değildir.",
  },
  {
    q: "Eğitim ücreti ve ödeme koşullarını nereden öğrenebilirim?",
    a: "Dönem ücretleri ve ödeme seçenekleri kontenjana ve programa göre değiştiği için sitede sabit bir liste yayımlamıyoruz; kayıt kanallarımızdan güncel bilgiyi alabilirsiniz.",
  },
  {
    q: "Teorik dersleri sonradan tekrar izleyebilir miyim?",
    a: "Evet. Çevrimiçi modüller kayıt altındadır ve program süresince tekrar izlenebilir. Uygulama bölümünün tekrarı ise dönem takvimine bağlıdır.",
  },
  {
    q: "Uygulamayı kendi aile bireylerim üzerinde yapabilir miyim?",
    a: "Programa katılanların bir bölümü bu amaçla gelir. Yine de aynı sınırlar geçerlidir: uygulanmaması gereken durumlar ve hekime yönlendirme refleksi, aile içi uygulamada da değişmez.",
  },
  {
    q: "Eğitim sırasında canlı sülükle mi çalışılıyor?",
    a: "Uygulama modülünde eğitmen gözetiminde gerçek malzeme ve canlı tıbbi sülükle çalışılır; teorik bölüm ise görsel ve yazılı materyalle yürütülür.",
  },
  {
    q: "Kendi uygulama merkezimi açmak istiyorum, program bunu kapsıyor mu?",
    a: "Programda çalışma alanının hijyen düzeni, kayıt tutma ve danışan iletişimi başlıkları yer alır. Ancak iş yeri açılışına ilişkin izin ve mevzuat süreçleri eğitimin kapsamı dışındadır ve ilgili resmî kurumlardan öğrenilmelidir.",
  },
  {
    q: "Uygulama kampına kaç kez katılabilirim?",
    a: "Program bir kez katılım üzerine kurgulanmıştır. Tekrar katılım talepleri kontenjan durumuna göre değerlendirilir.",
  },
  {
    q: "Eğitim dili nedir?",
    a: "Programın tamamı Türkçe yürütülür. Yurt dışından katılan kursiyerlerimiz için ek bir çeviri hizmeti sunulmamaktadır.",
  },
  {
    q: "Hangi durumlarda uygulama yapılmaz, bu eğitimde anlatılıyor mu?",
    a: "Evet ve programın en çok vurgulanan başlıklarındandır. Kan sulandırıcı kullanımı, kanama bozuklukları ve gebelik gibi durumlar ayrı bir modülde ele alınır; bu başlık teknik derslerden önce gelir.",
  },
  {
    q: "Kayıt için ön görüşme yapılıyor mu?",
    a: "Evet. Beklentinizin programla örtüşüp örtüşmediğini kayıt öncesi konuşuyoruz; amaç, yanlış beklentiyle başlayan bir katılımın önüne geçmektir.",
  },
];

function cityFaqs(p: Province, prof: ProvinceEducationProfile): { q: string; a: string }[] {
  const iklimSorusu: Record<IklimSinifi, { q: string; a: string }> = {
    "donma-riski": {
      q: `${locative(p.name)} kış aylarında sülük saklamak sorun olur mu?`,
      a: `${prof.iklimDersi} Programda bu başlık ayrı bir oturumda ele alınır; soğuk iklimde çalışan kursiyerler için kontrol listesi üzerinden ilerlenir.`,
    },
    "asiri-sicak": {
      q: `${genitive(p.name)} yaz sıcağında sülük nasıl saklanmalı?`,
      a: `${prof.iklimDersi} Eğitimde sıcak iklimde çalışan kursiyerler için ayrı bir kontrol listesi üzerinden ilerlenir.`,
    },
    "yuksek-nem": {
      q: `${genitive(p.name)} nemli havası steril malzemeyi etkiler mi?`,
      a: `${prof.iklimDersi} Programda nemli iklimde malzeme saklama ve pansuman takibi ayrı bir başlıktır.`,
    },
    "iliman-karasal": {
      q: `${locative(p.name)} mevsim değişimi çalışma düzenini nasıl etkiler?`,
      a: `${prof.iklimDersi} Eğitimde saklama düzeninin mevsim dönümlerinde yeniden kurulması ayrıca çalışılır.`,
    },
  };

  return [
    iklimSorusu[prof.iklim],
    {
      q: `${locative(p.name)} yüz yüze eğitim veriyor musunuz?`,
      a: `Teorik modüller çevrimiçi olduğu için ${locative(p.name)} bulunmanız yeterlidir. Yüz yüze uygulama modülü ise yalnızca Konya'daki merkezimizde yapılır. ${prof.ulasim}`,
    },
    {
      q: `${locative(p.name)} uygulamaya başlarken hangi dönem daha uygun?`,
      a: `${prof.mevsimNotu} Bu nedenle ${locative(p.name)} çalışacak kursiyerlere, uygulama takvimini yerel koşula göre kurmalarını öneriyoruz.`,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Sınıf içi indeks — havuz seçiminde ÇAKIŞMAYI DAĞITIR                 */
/* ------------------------------------------------------------------ */

/**
 * Bir ilin, kendi iklim/ulaşım sınıfı içindeki sırası.
 *
 * NEDEN KARMA YETMEDİ (ölçümle bulundu): tohum karma olduğunda kaydırma
 * değeri havuz uzunluğuna göre RASTGELE dağılır. 16 ilin bulunduğu bir
 * sınıfta 12'lik havuz için, doğum günü problemi gereği birkaç çift aynı
 * kaydırmayı alır ve BİREBİR aynı 6 maddeyi basar (Bartın↔Bolu %49,9).
 *
 * Sınıf içi indeks kullanmak bunu ortadan kaldırır: sınıftaki iller
 * havuz üzerinde eşit aralıklarla dağıtılır, sınıf havuzdan küçükse hiçbir
 * iki il aynı kaydırmayı almaz.
 */
function classIndex<K extends string>(
  slug: string,
  keyOf: (p: ProvinceEducationProfile) => K,
): number {
  const target = PROVINCE_EDU_PROFILES[slug];
  if (!target) return 0;
  const same = PROVINCES.map((p) => p.slug)
    .filter((sl) => {
      const pr = PROVINCE_EDU_PROFILES[sl];
      return pr && keyOf(pr) === keyOf(target);
    })
    .sort();
  return Math.max(0, same.indexOf(slug));
}

/* ------------------------------------------------------------------ */
/* Ana üretici                                                          */
/* ------------------------------------------------------------------ */

export function buildCityCourseContent(slug: string): CityCourseContent | null {
  const province = PROVINCES.find((p) => p.slug === slug);
  const profile = PROVINCE_EDU_PROFILES[slug];
  if (!province || !profile) return null;

  const name = province.name;
  const loc = locative(name);
  const abl = ablative(name);
  const dat = dative(name);
  const gen = genitive(name);

  // Her havuz KENDİ tohumunu alır — havuzlar birbiriyle hizalanmasın.
  const s = (salt: string) => seedFor(province.slug, salt);

  const bolge = BOLGE_CERCEVESI[province.region];

  const blocks: CityBlock[] = [
    {
      id: "genel-bakis",
      heading: `${gen} eğitim bağlamı`,
      paragraphs: [
        bolge ? pickOne(bolge, s("bolge")) : "",
        profile.miras,
        profile.toplum,
      ].filter(Boolean),
    },
    {
      id: "iklim-ve-uygulama",
      heading: `${loc} iklim koşulları uygulamayı nasıl değiştirir?`,
      paragraphs: [profile.iklimDersi, pickOne(IKLIM_BAGLAC, s("iklim-baglac"))],
    },
    {
      id: "mevsim-ve-takvim",
      heading: `${loc} mevsim ve çalışma takvimi`,
      paragraphs: [
        profile.mevsimNotu,
        `${pickOne(TAKVIM_BAGLAC, s("takvim-baglac"))} ${dat} özgü bu koşul, program içindeki "danışan yönetimi" modülünde kendi örneğinizle ele alınır.`,
      ],
    },
  ];

  const iklimHavuz = IKLIM_HAVUZLARI[profile.iklim];
  const iklimIdx = classIndex(province.slug, (pr) => pr.iklim);
  const ulasimIdx = classIndex(province.slug, (pr) => pr.ulasimSinifi);
  const metaDescription = `${name} hacamat kursu ve sülük eğitimi: çevrimiçi teorik modüller, Konya'da yüz yüze uygulama kampı ve kurum sertifikası. ${loc} çalışacak uygulayıcılar için iklim, saklama ve takvim başlıkları programda ayrıca ele alınır.`;

  return {
    province,
    profile,
    h1: `${name} Hacamat Kursu ve Sülük Eğitimi`,
    eyebrow: `${province.region} · Eğitim Programı`,
    metaTitle: `${name} Hacamat Kursu ve Sülük Eğitimi`,
    metaDescription: metaDescription.slice(0, 300),
    lead: `${abl} katılan kursiyerler için hacamat ve sülük terapisi eğitimi; teorik modüller çevrimiçi, uygulama Konya'daki merkezimizde yüz yüze yürütülür. Bu sayfada ${loc} uygulama yapacak bir kursiyerin bilmesi gereken yerel koşulları da bulacaksınız.`,
    blocks,
    climateChecklist: {
      title: iklimHavuz.title(name),
      intro: pickOne(iklimHavuz.intro, iklimIdx),
      // 12'lik havuzdan 6 madde, adım 5 (12 ile aralarında asal).
      // Kaydırma karma DEĞİL sınıf içi indekstir — aynı iklim sınıfındaki
      // iller havuza eşit aralıkla dağılsın, ikisi aynı listeyi basmasın.
      items: rotate(iklimHavuz.items, 6, iklimIdx, 5),
    },
    campTitle: `${abl} uygulama kampına katılım`,
    // 7'lik havuzdan 4 adım, adım 3 (7 ile aralarında asal).
    campSteps: rotate(KAMP_HAVUZLARI[profile.ulasimSinifi](name), 4, ulasimIdx, 3),
    faqs: [
      ...cityFaqs(province, profile),
      // 20'lik havuzdan 3 soru, adım 7 (20 ile aralarında asal).
      ...rotate(SSS_HAVUZU, 3, s("sss"), 7),
    ],
    supplyLink: citySupplyLink(province.slug, name),
    materialLink: cityMaterialLink(province.slug, name),
    regionSiblings: PROVINCES.filter(
      (p) => p.region === province.region && p.slug !== province.slug,
    ).slice(0, 8),
    programsLead: pickOne(PROGRAM_LEAD, s("program-lead")),
    supplyHeading: pickOne(SUPPLY_HEADING, s("supply-heading")),
    ctaLead: pickOne(CTA_LEAD, s("cta-lead")),
    disclaimer: pickOne(DISCLAIMER, s("disclaimer")),
  };
}

/** Statik üretim için tüm il slug'ları. */
export function allCitySlugs(): string[] {
  return PROVINCES.map((p) => p.slug);
}
