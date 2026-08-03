/**
 * İL EĞİTİM PROFİLLERİ — `/hacamat-kursu/[il]` silosunun ayrıştırıcı veri katmanı.
 *
 * NEDEN VAR:
 *   81 il sayfası üretmenin tek meşru yolu, her sayfanın GERÇEKTEN farklı bir şey
 *   söylemesidir. Şablona `${il}` yerleştirmek kopya içerik üretir; kardeş
 *   domainde bu ölçüldü (5-gram Jaccard ile il-il benzerlik %46-58) ve ancak
 *   benzersiz METİN EKLENEREK %18-22'ye indirilebildi. Silmek oranı düşürmez,
 *   paydayı da küçültür.
 *
 * KARDEŞ DOMAINDEN AYRIŞMA (kritik):
 *   konyahacamat.net'te de bir il profili dosyası var, ancak o dosya KARGO
 *   eksenlidir (komşu iller, Konya'ya mesafe, sevkiyat koridoru, gönderi riski).
 *   Buradaki alanlar bilinçli olarak BAŞKA bir eksende yazılmıştır: kursiyerin
 *   KENDİ şehrinde uygulama yaparken karşılaşacağı koşullar, şehrin gerçek şifa
 *   mirası, mesleki dokusu ve Konya'daki uygulama kampına geliş biçimi.
 *   İki dosyada aynı cümle, aynı ölçü ya da aynı çerçeve KULLANILMAZ.
 *
 * DÜRÜSTLÜK KURALI:
 *   Şehir bazlı iş verimiz (mezun sayısı, danışan sayısı, memnuniyet oranı) YOK.
 *   Bu dosyada UYDURMA İSTATİSTİK BULUNMAZ ve eklenmemelidir. Yalnızca kamuya
 *   açık, doğrulanabilir olgular (iklim rejimi, coğrafya, tarihî kurum, yerel
 *   üretim geleneği) ve bunlardan çıkan ölçülü çıkarımlar yer alır.
 *
 * TARİHÎ NOT KURALI:
 *   `miras` alanında yalnızca gerçekten var olmuş kurum/kişi/gelenek anılır
 *   (ör. Kayseri Gevher Nesibe Darüşşifası, Amasya'da Sabuncuoğlu Şerefeddin,
 *   Bergama Asklepionu). Şehre yakıştırma tarih YAZILMAZ. Bu alan bir "eski
 *   zamanda da böyle yapılırdı" iddiası değil, kültürel bağlam cümlesidir;
 *   hiçbir tedavi etkinliği iması taşımaz.
 */

import { PROVINCES } from "./tr-provinces";

/**
 * İklim sınıfı — YAPISAL alan. İçerik motoru buna göre FARKLI blok basar,
 * yalnızca farklı cümle değil. Tıbbi sülüğün canlı bir organizma olması ve
 * su sıcaklığına bağımlı çalışması nedeniyle bu ayrım dolgu değil, eğitimin
 * fiilî konusudur.
 */
export type IklimSinifi =
  /** Uzun ve sert kış — donma, su sıcaklığının aşırı düşmesi, yol kapanması */
  | "donma-riski"
  /** Uzun ve yüksek yaz sıcaklığı — su ısınması, oksijen azalması, serinletme */
  | "asiri-sicak"
  /** Yüksek nem ve yağış — malzeme kuruluğu, küflenme, pansuman bakımı */
  | "yuksek-nem"
  /** Belirgin uç koşul içermeyen ılıman/karasal hat */
  | "iliman-karasal";

/** Konya'daki yüz yüze uygulama kampına geliş mesafesi sınıfı. */
export type UlasimSinifi = "yakin" | "orta" | "uzak";

export interface ProvinceEducationProfile {
  /** Yapısal alan — koşullu blok seçimini sürer. */
  iklim: IklimSinifi;
  /**
   * Kursiyerin kendi şehrinde uygulama yaparken karşılaşacağı SOMUT koşul ve
   * bunun eğitimdeki karşılığı. Bu alan sayfanın en özgün parçasıdır.
   */
  iklimDersi: string;
  /** Uygulama takvimini fiilen etkileyen mevsimsel gerçek. */
  mevsimNotu: string;
  /** Şehrin doğrulanabilir şifa/gelenek mirası — kültürel bağlam cümlesi. */
  miras: string;
  /** Şehrin gerçek mesleki/toplumsal dokusu ve bunun uygulamaya yansıması. */
  toplum: string;
  ulasimSinifi: UlasimSinifi;
  /** Konya'daki uygulama kampına geliş biçimi. */
  ulasim: string;
}

export const PROVINCE_EDU_PROFILES: Record<string, ProvinceEducationProfile> = {
  adana: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Çukurova'da yaz sıcaklığı aylarca yüksek bir bantta kalır. Sülüğün tutulduğu kabın güneş gören bir odada bekletilmesi suyu ısıtır, ısınan suda çözünmüş oksijen azalır ve canlı halsizleşir. Adana'da çalışan uygulayıcıya kabın kuzeye bakan serin bir bölmede tutulması, yaz aylarında su değişim sıklığının artırılması ve seans öncesi su sıcaklığının elle değil ölçerek kontrol edilmesi ayrıca gösterilir.",
    mevsimNotu:
      "Temmuz–ağustosta öğle saatlerindeki uygulama hem danışanı hem uygulayıcıyı zorlar; seansların sabahın erken saatlerine alınması yerleşik bir pratiktir.",
    miras:
      "Adana, Anadolu'yu Doğu Akdeniz ve Mezopotamya hattına bağlayan geçiş koridorunda kurulmuştur; şehrin halk hekimliği dilinde Akdeniz ve Güneydoğu gelenekleri iç içedir.",
    toplum:
      "Tarım ve sanayi işçiliğinin yoğun olduğu bir ildir; uzun süre ayakta çalışmaya bağlı sırt ve omuz yakınmaları, uygulayıcıya en sık gelen başvuru başlıklarındandır.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya ile Adana arasında düzenli otobüs seferleri vardır; Toros geçişi üzerinden karayoluyla gelen kursiyerler kampa aynı gün ulaşabilir.",
  },
  adiyaman: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Adıyaman'da yaz kurak ve sıcaktır; kapalı bir odada bırakılan sülük kabının suyu gün içinde hızla ısınır. Kursiyere, kabın gölgede ve hava akımı olan bir yerde tutulması, buharlaşmayla azalan suyun aynı sıcaklıkta su ile tamamlanması ve kap kapağının hava alacak şekilde kapatılması anlatılır.",
    mevsimNotu:
      "Yaz ortasında gündüz uygulaması pratik değildir; ilkbahar ve sonbahar, bölgede uygulama yoğunluğunun arttığı dönemlerdir.",
    miras:
      "Nemrut Dağı ve Perre antik kenti çevresinde Kommagene dönemine uzanan yerleşik bir kültür katmanı bulunur; bölgede bitkisel karışım ve aktarlık geleneği bugün de sürer.",
    toplum:
      "Tarım ve tekstil ağırlıklı bir çalışma dokusu vardır; uygulayıcının karşısına çoğunlukla fiziksel yükle çalışan yetişkinler çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya karayoluyla mesafe uzundur; kursiyerlerin çoğu uygulama kampını iki gecelik bir Konya programına yayarak planlar.",
  },
  afyonkarahisar: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Afyonkarahisar karasal bir hatta yer alır; kış gecelerinde iç mekân sıcaklığı bile hızlı düşebilir. Kursiyere, sülük kabının dış duvara bitişik ve ısıtılmayan bir odada bırakılmaması, gece sıcaklığının kabın bulunduğu noktada ölçülmesi öğretilir.",
    mevsimNotu:
      "Kış aylarında uygulama sonrası danışanın soğuğa çıkmadan önce dinlendirilmesi için oda düzeninin ayrıca planlanması gerekir.",
    miras:
      "Afyonkarahisar, Türkiye'nin en zengin jeotermal kaynaklarına sahip illerindendir; şehirde sıcak su ve şifa arayışı yüzyıllardır süren yerleşik bir alışkanlıktır.",
    toplum:
      "Mermer işleme ve gıda sanayii önemli bir istihdam alanıdır; tozlu ve ağır iş kollarında çalışanların kas-iskelet yakınmaları uygulayıcının sık karşılaştığı tablodur.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın kuzeybatı komşusudur; Akşehir üzerinden karayoluyla gelen kursiyerler uygulama kampına günübirlik katılabilir.",
  },
  agri: {
    iklim: "donma-riski",
    iklimDersi:
      "Ağrı, Türkiye'nin en sert kış koşullarının görüldüğü illerdendir. Isıtılmayan bir odada bırakılan kapta suyun yüzeyi donabilir; donma noktasına yaklaşan suda sülük hareketsizleşir ve seansa alınmaz. Kursiyere, kabın yaşam alanının ısıtılan bölümünde tutulması, taşıma sırasında kabın doğrudan dış havaya çıkarılmaması ve araçta kalorifer menfezinin karşısına konmaması ayrı ayrı gösterilir.",
    mevsimNotu:
      "Aralık–mart arasında ilçe yollarının kapanabildiği günler olur; bölgedeki uygulayıcılar randevuları hava koşuluna göre esnek planlar.",
    miras:
      "Ağrı Dağı eteklerindeki yayla kültürü, yüksek rakımlı otlaklarda toplanan bitkilere dayanan bir halk hekimliği dili üretmiştir.",
    toplum:
      "Hayvancılık başlıca geçim kaynağıdır; açık havada ve soğukta uzun süre çalışan yetişkinler uygulayıcının başlıca danışan grubudur.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya mesafe Türkiye'nin en uzun iç hatlarından biridir; kursiyerler genellikle havayoluyla Ankara ya da İstanbul aktarmalı gelmeyi tercih eder.",
  },
  amasya: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Amasya, Yeşilırmak vadisinde nispeten korunaklı bir mikro iklime sahiptir; uç sıcaklıklar kıyı ve doğu illerine göre daha yumuşaktır. Buna karşılık vadi tabanında kış sabahları sis ve nem birlikte görülür; kursiyere pamuklu malzemenin nemli ortamda saklanmaması ve steril paketlerin kapalı dolapta tutulması hatırlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; yaz sıcağı kısa sürdüğü için takvim yıl geneline yayılabilir.",
    miras:
      "Amasya, 1308 tarihli Darüşşifası ve 15. yüzyılda burada çalışan hekim Sabuncuoğlu Şerefeddin ile Anadolu tıp tarihinin en somut duraklarındandır; Cerrâhiyyetü'l-Hâniyye adlı eseri dönemin uygulamalarını resimlerle aktarır.",
    toplum:
      "Öğrenci nüfusu ve kamu istihdamı belirgindir; masa başı çalışmaya bağlı boyun ve omuz yakınmaları başvuru nedenleri arasında öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Ankara üzerinden karayoluyla bağlanır; kursiyerler uygulama kampını genellikle tek gecelik bir programla tamamlar.",
  },
  ankara: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Ankara'da kış kuru ve soğuk, yaz kuru ve sıcaktır; iki uç arasındaki fark kapalı mekân koşullarını da değiştirir. Kışın sürekli çalışan kalorifer odanın nemini düşürür ve sülük kabındaki su beklenenden hızlı buharlaşır. Kursiyere su seviyesinin haftalık değil, ısıtma sezonunda daha sık kontrol edilmesi öğretilir.",
    mevsimNotu:
      "Şehir içi ulaşım süreleri uzun olduğu için randevu aralıklarının geniş tutulması, danışanın seans öncesi dinlenmiş gelmesini sağlar.",
    miras:
      "Ankara, Cumhuriyet döneminin ilk sağlık kurumlarının kurulduğu şehirdir; ayrıca Ahi geleneğinin Anadolu'daki güçlü duraklarından biri olarak esnaf etiği kavramını taşımıştır.",
    toplum:
      "Kamu ve hizmet sektörü ağırlıklıdır; uzun süre oturarak çalışan yetişkinler uygulayıcının en sık gördüğü profildir.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya ile arasında yüksek hızlı tren bağlantısı vardır; kursiyerler uygulama kampına günübirlik gidip dönebilir.",
  },
  antalya: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Antalya'da yaz sıcaklığı yüksek nemle birlikte görülür; bu bileşim hem sülüğün tutulduğu suyu ısıtır hem de uygulama odasının serinletilmesini zorlaştırır. Kursiyere klima akımının doğrudan danışanın açık cilt bölgesine ve sülük kabına gelmemesi, kabın klimalı odada ani sıcaklık düşüşüne maruz bırakılmaması anlatılır.",
    mevsimNotu:
      "Turizm sezonunda şehrin çalışma temposu değişir; uygulayıcılar seans saatlerini sezon dışına ve sabah saatlerine kaydırır.",
    miras:
      "Toros eteklerindeki yaylalar Türkiye'nin en zengin endemik bitki örtülerinden birine sahiptir; bölgedeki bitki toplama ve aktarlık geleneği bu çeşitlilikten beslenir.",
    toplum:
      "Turizm ve hizmet sektörü baskındır; ayakta uzun vardiya çalışan yetişkinlerde bacak ağırlığı ve sırt yorgunluğu sık dile getirilen yakınmalardır.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın güney komşusudur; Seydişehir–Akseki üzerindeki Toros geçişiyle karayoluyla doğrudan bağlanır.",
  },
  artvin: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Artvin'de yağış ve nem yıl boyunca yüksektir; kapalı dolapta bekleyen pamuklu ve kâğıt ambalajlı malzeme nem çeker. Kursiyere steril malzemenin orijinal paketinde ve nem almayan kapalı kutuda saklanması, paketi açılmış malzemenin seans sonuna bırakılmadan imha edilmesi ayrıca vurgulanır.",
    mevsimNotu:
      "Kış aylarında yüksek kesimlerdeki ulaşım aksayabilir; ilçelerden gelen danışanlar için randevuların hava durumuna göre teyitlenmesi yerleşik bir alışkanlıktır.",
    miras:
      "Kaçkar eteklerindeki yayla kültürü, mevsimlik göç ve yüksek rakım bitkileriyle şekillenmiş bir halk hekimliği dili barındırır.",
    toplum:
      "Tarım, ormancılık ve enerji yatırımları başlıca çalışma alanlarıdır; eğimli arazide çalışmaya bağlı diz ve bel yakınmaları öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya en uzak illerdendir; kursiyerler genellikle Trabzon üzerinden havayolu bağlantısıyla gelmeyi tercih eder.",
  },
  aydin: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Büyük Menderes vadisinde yaz sıcaklığı iç kesimlerde daha da yükselir. Kursiyere, sülük kabının vadi tabanındaki evlerde zemin kata ya da kuzey cepheye alınması, taşıma sırasında kabın araç bagajında bırakılmaması — bagaj sıcaklığının kabin sıcaklığından belirgin biçimde yüksek olması nedeniyle — öğretilir.",
    mevsimNotu:
      "Yaz aylarında tarım işçiliği yoğunlaştığı için seans talebi akşam saatlerine kayar; uygulayıcının çalışma düzenini buna göre kurması gerekir.",
    miras:
      "Aydın'ın antik adı Tralleis'tir; Bizans döneminin tanınmış hekimlerinden Trallesli Aleksandros bu şehirde doğmuş ve dönemin tıp literatürüne kalıcı bir eser bırakmıştır.",
    toplum:
      "İncir, zeytin ve pamuk tarımı belirleyicidir; hasat dönemlerinde eğilerek çalışmaya bağlı bel yakınmaları belirgin biçimde artar.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Afyonkarahisar üzerinden karayoluyla bağlanır; İzmir aktarmalı havayolu da tercih edilen bir seçenektir.",
  },
  balikesir: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Balıkesir hem Marmara hem Ege koşullarını birlikte yaşar; kıyı ilçeleri nemli, iç kesimler karasaldır. Kursiyere, aynı il içinde farklı ilçelerde çalışırken saklama koşullarının tek bir kurala bağlanamayacağı, kabın bulunduğu odanın ölçülen sıcaklığının esas alınması gerektiği anlatılır.",
    mevsimNotu:
      "Kıyı ilçelerinde yaz nüfusu artar; uygulayıcıların sezonluk yoğunluğa göre randevu aralığını genişletmesi gerekir.",
    miras:
      "Kaz Dağları çevresi zengin bitki örtüsü ve zeytin geleneğiyle bilinir; yörede bitkisel yağ ve merhem hazırlama alışkanlığı köklüdür.",
    toplum:
      "Tarım, hayvancılık ve turizm bir arada bulunur; mevsimlik iş yoğunluğu danışan profilini yıl içinde değiştirir.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya karayoluyla Kütahya–Afyonkarahisar hattı üzerinden ulaşılır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
  bilecik: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Bilecik, Marmara ile İç Anadolu arasında geçiş kuşağındadır; kışlar Marmara kıyısına göre daha sert geçer. Kursiyere, ısıtmasız depo ya da kilerde sülük kabı bırakılmaması ve kışın taşıma süresinin mümkün olduğunca kısaltılması öğretilir.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en dengeli dönemlerdir; kış aylarında seans sonrası dinlenme süresi uzun tutulur.",
    miras:
      "Söğüt ve çevresi Osmanlı'nın kuruluş coğrafyasıdır; bölgede kuşaktan kuşağa aktarılan geleneksel uygulama alışkanlığı güçlüdür.",
    toplum:
      "Mermer ve seramik sanayii istihdamda öne çıkar; vardiyalı ve ağır iş kollarında çalışanların omuz-sırt yakınmaları sık görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "Eskişehir üzerinden Konya'ya karayolu ve demiryolu bağlantısı vardır; kursiyerler yüksek hızlı treni Eskişehir'den kullanabilir.",
  },
  bingol: {
    iklim: "donma-riski",
    iklimDersi:
      "Bingöl yüksek rakımlı bir ildir ve kış uzun sürer. Isıtmanın kesildiği saatlerde oda sıcaklığı hızla düşer; sülüğün bulunduğu suyun sıcaklığı kritik eşiğin altına inerse canlı seansa uygun olmaz. Kursiyere kabın gece boyunca sabit ısıtılan bir odada tutulması ve sıcaklığın sabah ilk iş olarak kontrol edilmesi öğretilir.",
    mevsimNotu:
      "Kar yağışının yoğun olduğu haftalarda ilçe bağlantıları aksar; randevuların hafta içine ve gündüz saatlerine toplanması pratik bir çözümdür.",
    miras:
      "Yüksek rakımlı otlaklarıyla bilinen ilde karakovan arıcılığı köklü bir üretim geleneğidir; yöresel şifa dili bu üretim etrafında şekillenmiştir.",
    toplum:
      "Hayvancılık ve tarım ağırlıklıdır; soğukta ve açık alanda çalışmaya bağlı eklem yakınmaları sık dile getirilir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya karayolu mesafesi uzundur; kursiyerler genellikle Elazığ ya da Diyarbakır üzerinden havayolu aktarmasıyla gelir.",
  },
  bitlis: {
    iklim: "donma-riski",
    iklimDersi:
      "Bitlis'te kar örtüsü uzun süre kalır ve gece sıcaklıkları belirgin biçimde düşer. Kursiyere, sülük kabının araçla taşınması gerektiğinde kabın önceden ısıtılmış kabine alınması, ancak kalorifer menfezinden uzak tutulması — ani ısınmanın da en az ani soğuma kadar zararlı olması nedeniyle — anlatılır.",
    mevsimNotu:
      "Kış boyunca Rahva düzlüğünde tipi görülebilir; bölgedeki uygulayıcılar randevu iptallerini normal bir işleyiş parçası olarak planlar.",
    miras:
      "Ahlat'taki Selçuklu mezar taşları bölgenin köklü taş işçiliği ve yerleşik kültür geçmişini gösterir; yörede kuşaklar boyu aktarılan geleneksel uygulama bilgisi canlıdır.",
    toplum:
      "Tarım, hayvancılık ve tütün üretimi belirleyicidir; el emeğine dayalı işlerde el bileği ve omuz yakınmaları öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya doğrudan karayolu yolculuğu uzun sürer; Van ya da Muş havalimanları üzerinden aktarmalı ulaşım tercih edilir.",
  },
  bolu: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Bolu ormanlık ve nemli bir kuşaktadır; kış aylarında iç mekânda yoğuşma görülebilir. Kursiyere, steril malzemenin duvara temas eden dolaplarda saklanmaması, uygulama odasının seans öncesi havalandırılması ancak hava akımının danışanın üzerine gelmemesi öğretilir.",
    mevsimNotu:
      "Kar yağışının yoğun olduğu dönemde geçiş trafiği aksar; ilçelerden gelen danışanlar için randevu teyidi önem kazanır.",
    miras:
      "Bolu, Anadolu'nun aşçılık geleneğinde özel bir yere sahiptir; yöresel beslenme ve bitki kullanımı bilgisi kuşaktan kuşağa aktarılmıştır.",
    toplum:
      "Ormancılık, turizm ve gıda üretimi öne çıkar; açık havada ve eğimli arazide çalışanların diz-bel yakınmaları sık görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla bağlanır; kursiyerler uygulama kampını tek gecelik programla tamamlayabilir.",
  },
  burdur: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Göller yöresinde yer alan Burdur'da gece-gündüz sıcaklık farkı belirgindir. Kursiyere, gün içinde uygun görünen bir odanın gece koşullarının ayrıca değerlendirilmesi, sülük kabının pencere önünde bırakılmaması öğretilir.",
    mevsimNotu:
      "Yaz aylarında kuru sıcak, kış aylarında keskin soğuk görülür; iki dönemde de seans sonrası dinlenme koşulu ayrı planlanır.",
    miras:
      "Sagalassos antik kenti ve Salda çevresi bölgenin derin yerleşim geçmişini gösterir; yörede bitkisel ürün ve gül-lavanta işleme geleneği yaygındır.",
    toplum:
      "Tarım, mermer ve hayvancılık başlıca geçim kaynaklarıdır; fiziksel iş yoğunluğu danışan profilini belirler.",
    ulasimSinifi: "yakin",
    ulasim:
      "Isparta üzerinden Konya'ya karayoluyla kısa sürede ulaşılır; kursiyerler kampa günübirlik katılabilir.",
  },
  bursa: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Bursa'da ovada ılıman, Uludağ eteklerinde belirgin biçimde soğuk bir hat vardır. Kursiyere, aynı il içinde farklı rakımlarda çalışırken saklama koşulunun değişeceği; kabın bulunduğu noktanın ölçülmüş sıcaklığının, ilin genel iklim tarifinden daha belirleyici olduğu anlatılır.",
    mevsimNotu:
      "Yaz aylarında nem artışı görülür; uygulama odasının serin ve havalandırılabilir olması sezon boyunca öncelik kazanır.",
    miras:
      "Bursa'da 1400 yılında tamamlanan Yıldırım Bayezid Darüşşifası Osmanlı'nın ilk hastane yapılarındandır; Çekirge'deki kaplıcalar şehrin şifa arayışıyla anılan geçmişinin bir diğer katmanıdır.",
    toplum:
      "Otomotiv ve tekstil sanayii yoğun istihdam üretir; vardiyalı çalışma düzeni ve tekrarlı hareketler kas-iskelet yakınmalarını öne çıkarır.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya karayoluyla Eskişehir hattı üzerinden bağlanır; Bursa'dan hareketle uygulama kampı tek gecelik programa sığar.",
  },
  canakkale: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Çanakkale Boğazı çevresinde yıl boyu kuvvetli rüzgâr görülür; bu, uygulama odasının havalandırılmasında dikkat gerektirir. Kursiyere, seans sırasında açık pencereden gelen doğrudan hava akımının danışanın açık cilt bölgesine gelmemesi gerektiği ayrıca hatırlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için elverişlidir; yaz aylarında kıyı ilçelerinde nüfus arttığı için randevu düzeni sıkışır.",
    miras:
      "Assos ve Troya çevresi Anadolu'nun en eski yerleşim katmanlarındandır; Kaz Dağları eteklerindeki bitki toplama geleneği bölgede sürer.",
    toplum:
      "Tarım, balıkçılık ve turizm bir aradadır; mevsimlik çalışma temposu danışan yoğunluğunu yıl içinde değiştirir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya doğrudan bağlantı uzundur; kursiyerler genellikle Bursa ya da İstanbul aktarmasıyla gelmeyi planlar.",
  },
  cankiri: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Çankırı karasal bir hatta yer alır ve kış geceleri sert geçer. Kursiyere, sülük kabının ısıtılmayan giriş holü ya da balkona bırakılmaması, kışın taşıma sırasında kabın yalıtımlı bir kutu içine alınması öğretilir.",
    mevsimNotu:
      "Kış aylarında gece donları belirgindir; seans takvimi gündüz saatlerine toplanır.",
    miras:
      "Çankırı'daki 1235 tarihli Cemaleddin Ferruh Darüşşifası Anadolu Selçuklu döneminin sağlık yapılarındandır; şehrin tuz mağarası da yörede uzun süredir bilinen bir yerel değerdir.",
    toplum:
      "Kamu istihdamı ve tarım öne çıkar; küçük yerleşimlerde uygulayıcıya erişim sınırlı olduğu için danışanlar il merkezine yönelir.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla bağlanır; kursiyerler yüksek hızlı treni Ankara'dan kullanabilir.",
  },
  corum: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Çorum, Karadeniz'e komşu olmakla birlikte iç kesimde karasal bir iklim yaşar; kış kuru ve soğuktur. Kursiyere, ısıtma sezonunda düşen iç mekân neminin sülük kabındaki su seviyesini beklenenden hızlı düşürdüğü, bu nedenle kontrol sıklığının artırılması gerektiği anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; yaz kısa ve kuru geçer.",
    miras:
      "Boğazkale'deki Hattuşa, Anadolu'nun en eski devlet merkezlerinden biridir; şehrin kültürel hafızası bu derin yerleşim geçmişine dayanır.",
    toplum:
      "Makine sanayii ve tarım bir aradadır; atölye çalışanlarının el, bilek ve omuz yakınmaları sık görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Ankara üzerinden karayoluyla ulaşılır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
  denizli: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Denizli'de yaz uzun ve sıcak geçer; iç kesimde nem düşük olduğu için buharlaşma hızlıdır. Kursiyere, sülük kabındaki su kaybının yaz aylarında gözle takip edilemeyecek kadar hızlı olabileceği, seviyenin işaretlenerek izlenmesi ve tamamlamanın aynı sıcaklıktaki suyla yapılması öğretilir.",
    mevsimNotu:
      "Temmuz–ağustosta seanslar sabaha alınır; sonbahar bölgede uygulama için en dengeli dönemdir.",
    miras:
      "Pamukkale'deki Hierapolis, antik dönemden bu yana termal kaynaklarıyla anılan bir merkezdir; şehrin şifa arayışıyla kurulan ilişkisi çok eskidir.",
    toplum:
      "Tekstil ve ev tekstili üretimi yoğundur; tezgâh başında uzun süre aynı pozisyonda çalışanlarda boyun ve omuz yakınmaları öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Afyonkarahisar üzerinden karayoluyla bağlanır; kursiyerler uygulama kampına tek gecelik programla katılabilir.",
  },
  diyarbakir: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Diyarbakır'da yaz sıcaklığı Türkiye'nin en yüksek değerlerine ulaşır ve gece bile belirgin biçimde düşmez. Bu, sülük saklamada gündüz-gece dengelemesine güvenilemeyeceği anlamına gelir. Kursiyere, yaz aylarında kabın sürekli iklimlendirilen bir odada tutulması, klimanın gece kapatılmasının su sıcaklığını hızla yükselttiği ölçümle gösterilir.",
    mevsimNotu:
      "Haziran–eylül arasında gündüz uygulaması pratik değildir; bölgedeki uygulayıcılar seansları erken sabah ve geç akşam saatlerine yayar.",
    miras:
      "Diyarbakır surları ve Artuklu dönemi yapıları şehrin köklü kurumsal geçmişini gösterir; bölgede aktarlık ve bitkisel karışım geleneği bugün de canlıdır.",
    toplum:
      "Ticaret, tarım ve inşaat başlıca çalışma alanlarıdır; açık alanda sıcak altında çalışmaya bağlı yorgunluk şikâyetleri yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu bağlantısı aktarmalıdır; kursiyerler uygulama kampını iki gecelik bir programa yayarak planlar.",
  },
  edirne: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Edirne'de kış nemli-soğuk, yaz kuru-sıcaktır; iki uç arasında geçiş hızlıdır. Kursiyere, mevsim dönümlerinde saklama koşulunun yeniden değerlendirilmesi ve sabit bir 'yıl boyu düzen' varsayılmaması öğretilir.",
    mevsimNotu:
      "Yaz ortasında sıcaklık Trakya'da yüksek değerlere ulaşır; seans saatleri buna göre öne alınır.",
    miras:
      "Edirne'deki 1488 tarihli II. Bayezid Külliyesi Darüşşifası, su sesi ve müzik kullanımıyla bilinen bölümüyle Osmanlı sağlık yapıları içinde ayrı bir yer tutar; yapı bugün sağlık müzesi olarak korunmaktadır.",
    toplum:
      "Tarım, sınır ticareti ve üniversite nüfusu bir aradadır; farklı yaş gruplarından danışan görülür.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya İstanbul aktarmalı olarak ulaşılır; kursiyerler uygulama kampını iki gecelik programla planlar.",
  },
  elazig: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Elazığ'da kış soğuk, yaz sıcak ve kurudur; Keban çevresinde göl etkisi yerel farklar üretir. Kursiyere, ilin genel iklim tarifine değil kendi çalışma mekânının ölçülen koşullarına göre saklama düzeni kurması gerektiği anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; kışın ulaşım aksamaları randevu planını etkiler.",
    miras:
      "Harput, Anadolu'nun eski yerleşim ve ilim merkezlerinden biridir; şehirdeki geleneksel bilgi aktarımı bu köke dayanır.",
    toplum:
      "Kamu, eğitim ve tarım öne çıkar; masa başı ve saha çalışanları danışan profilinde birlikte görülür.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya karayolu mesafesi uzundur; kursiyerler havayolu aktarmasını sıklıkla tercih eder.",
  },
  erzincan: {
    iklim: "donma-riski",
    iklimDersi:
      "Erzincan ovası çevresindeki yüksek kütlelerin arasında kalır; kış uzun ve sert geçer. Kursiyere, sülük kabının kış aylarında dış duvara bitişik odalarda tutulmaması, taşımanın yalıtımlı kutu ile ve mümkün olan en kısa sürede yapılması öğretilir.",
    mevsimNotu:
      "Aralık–mart arasında yol koşulları randevu planını doğrudan etkiler; uygulayıcılar bu dönemde esnek takvim kurar.",
    miras:
      "Kemaliye ve Munzur çevresi zengin bir bitki örtüsüne sahiptir; yörede dağdan bitki toplama geleneği sürer.",
    toplum:
      "Tarım, hayvancılık ve kamu istihdamı belirleyicidir; soğukta çalışmaya bağlı eklem yakınmaları öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya karayolu yolculuğu uzun sürer; kursiyerler havayolu aktarmasıyla gelmeyi tercih eder.",
  },
  erzurum: {
    iklim: "donma-riski",
    iklimDersi:
      "Erzurum, yüksek rakımı nedeniyle Türkiye'nin en uzun ve en sert kışlarını yaşayan illerindendir. Burada sülük taşımanın kuralı, sıcak illerdekinin tam tersidir: sıcak iklimde amaç kabı serin tutmakken, Erzurum'da amaç suyun donma noktasına yaklaşmasını engellemektir. Kursiyere, kabın yalıtımlı bir taşıma kutusuna alınması, kutunun içine doğrudan ısı kaynağı konmaması, aracın kalorifer menfezinin karşısına yerleştirilmemesi ve varış noktasında kabın oda sıcaklığına kademeli olarak alınması ayrı ayrı gösterilir. Ani ısı değişimi, soğuğun kendisi kadar risklidir.",
    mevsimNotu:
      "Kış aylarında kar ve buzlanma nedeniyle şehir içi ulaşım bile aksayabilir; seans takvimi hava koşuluna göre kurulur ve ilçelerden gelecek danışanlar için teyit alınır.",
    miras:
      "Erzurum'daki Yakutiye ve Çifte Minareli medreseler, şehrin Anadolu'nun ilim merkezlerinden biri olduğu dönemin taş kayıtlarıdır; yörede kışa dayanıklı beslenme ve geleneksel bakım alışkanlıkları köklüdür.",
    toplum:
      "Hayvancılık, üniversite nüfusu ve kış turizmi bir aradadır; soğukta uzun süre çalışan yetişkinlerde eklem ve sırt yakınmaları belirgin biçimde öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Doğu Anadolu'nun bölge merkezidir; Konya'ya havayolu aktarmasıyla ulaşılır ve kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  eskisehir: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Eskişehir karasal bir hatta yer alır; kış soğuk, yaz ılıktır. Kursiyere, ısıtma sezonunda kuruyan iç mekân havasının su seviyesini düşürdüğü, ayrıca merkezi ısıtmanın gece kısıldığı binalarda oda sıcaklığının sabaha karşı belirgin düştüğü ölçümle gösterilir.",
    mevsimNotu:
      "Yıl geneline yayılabilen dengeli bir takvim kurulabilir; uç dönem yaz ortası ve kış ortasıdır.",
    miras:
      "Odunpazarı'ndaki lületaşı işçiliği ve Seyitgazi çevresindeki tarihî yapılar şehrin köklü el sanatı ve gelenek hafızasını yansıtır.",
    toplum:
      "Üniversite ve sanayi nüfusu belirgindir; genç yetişkinler ile vardiyalı çalışanlar danışan profilinde birlikte yer alır.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya ile arasında yüksek hızlı tren bağlantısı vardır; kursiyerler uygulama kampına günübirlik katılabilir.",
  },
  gaziantep: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Gaziantep'te yaz uzun ve sıcaktır; şehrin sanayi dokusu nedeniyle çalışma mekânlarının çoğu üst katlarda ve ısınmaya açıktır. Kursiyere, sülük kabının atölye ya da üst kat deposunda tutulmaması, iklimlendirilen bir odada ve doğrudan güneş görmeyen bir noktada saklanması öğretilir.",
    mevsimNotu:
      "Haziran–eylül arasında seanslar sabah erken saatlere alınır; kış aylarında takvim rahatlar.",
    miras:
      "Gaziantep'te bakırcılık ve aktarlık, bedesten çevresinde yüzyıllardır süren canlı zanaat gelenekleridir; şehirde baharat ve bitkisel ürün bilgisi gündelik hayatın parçasıdır.",
    toplum:
      "Sanayi ve ticaret yoğun istihdam üretir; uzun vardiya ve tekrarlı hareket kaynaklı kas-iskelet yakınmaları başvuru nedenlerinde öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya karayoluyla Adana hattı üzerinden bağlanır; havayolu aktarması da yaygın bir tercihtir.",
  },
  giresun: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Giresun'da yağış yıl geneline yayılır ve nem yüksek kalır. Kursiyere, steril malzemenin nem almayan kapalı kutuda saklanması, uygulama sonrası pansumanın nemli ortamda daha sık kontrol edilmesi ve danışana bu konuda net bakım talimatı verilmesi ayrıca vurgulanır.",
    mevsimNotu:
      "Fındık hasadı döneminde bölgenin çalışma temposu tamamen değişir; seans talebi hasat sonrasına kayar.",
    miras:
      "Karadeniz kıyı kuşağında ot ve bitki toplama geleneği köklüdür; yayla kültürü bu bilgiyi kuşaklar boyunca taşımıştır.",
    toplum:
      "Fındık tarımı ve balıkçılık başlıca geçim kaynaklarıdır; eğimli arazide çalışmaya bağlı bel ve diz yakınmaları belirgindir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya Ankara üzerinden karayoluyla ya da Ordu-Giresun havalimanı aktarmasıyla ulaşılır.",
  },
  gumushane: {
    iklim: "donma-riski",
    iklimDersi:
      "Gümüşhane, Karadeniz kıyısına yakın olmasına rağmen dağların gerisinde kaldığı için sert bir kış yaşar; kıyı iklimi buraya ulaşmaz. Kursiyere, komşu illerdeki uygulamaya bakarak saklama düzeni kurmanın yanıltıcı olduğu, kendi mekânının kış gece sıcaklığının ölçülmesi gerektiği anlatılır.",
    mevsimNotu:
      "Kış aylarında Zigana geçişi hava koşullarından etkilenir; ilçelerden gelen danışanlar için randevu teyidi önem kazanır.",
    miras:
      "Şehir adını tarihî gümüş madenciliğinden alır; Santa harabeleri ve pestil-köme üretimi yörenin köklü üretim kültürünü gösterir.",
    toplum:
      "Tarım, hayvancılık ve madencilik geçmişi belirleyicidir; ağır fiziksel işlerde çalışanların sırt yakınmaları öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya doğrudan bağlantı yoktur; kursiyerler Trabzon üzerinden havayolu aktarmasıyla gelir.",
  },
  hakkari: {
    iklim: "donma-riski",
    iklimDersi:
      "Hakkâri, Türkiye'nin en yüksek rakımlı illerindendir; kış çok uzun sürer ve gece sıcaklıkları uçlara iner. Kursiyere, sülük kabının kesintisiz ısıtılan tek bir odada tutulması, elektrik kesintisi ihtimaline karşı kabın yalıtımlı kutuya alınabilecek şekilde hazır bulundurulması öğretilir.",
    mevsimNotu:
      "Kar nedeniyle yol kapanmaları uzun sürebilir; uygulayıcının malzeme stoğunu mevsim başında planlaması gerekir.",
    miras:
      "Cilo-Sat dağ kuşağındaki yayla kültürü, yüksek rakım bitkilerine dayalı bir halk hekimliği dili üretmiştir.",
    toplum:
      "Hayvancılık ve sınır ticareti başlıca geçim kaynaklarıdır; açık alanda ve soğukta çalışmaya bağlı eklem yakınmaları yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya ulaşım Van aktarmalıdır; kursiyerler uygulama kampını iki gecelik programa yayarak planlar.",
  },
  hatay: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Hatay'da yaz sıcaklığı yüksek nemle birlikte görülür; bu bileşim hem saklamayı hem pansuman bakımını etkiler. Kursiyere, uygulama sonrası kapama malzemesinin nemli havada daha erken değiştirilmesi ve danışanın bu konuda açıkça bilgilendirilmesi ayrıca öğretilir.",
    mevsimNotu:
      "Yaz aylarında öğle saatleri uygulama için elverişsizdir; sonbahar bölgede en dengeli dönemdir.",
    miras:
      "Antakya, tarih boyunca farklı geleneklerin bir arada yaşadığı bir şehirdir; defne sabunu üretimi ve aktarlık bugün de şehrin gündelik kültürünün parçasıdır.",
    toplum:
      "Tarım, ticaret ve sanayi bir aradadır; deprem sonrası dönemde fiziksel ve ruhsal yorgunluk şikâyetleri danışan görüşmelerinde sık dile getirilmektedir; uygulayıcının sınırlarını bilmesi ve gerektiğinde hekime yönlendirmesi bu ilde özellikle önemlidir.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Adana üzerinden karayoluyla bağlanır; kursiyerler uygulama kampını tek ya da iki gecelik programla planlar.",
  },
  isparta: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Isparta yüksek bir platoda yer alır; yaz serin, kış soğuk geçer. Kursiyere, göller yöresinin gece-gündüz farkının belirgin olduğu, sülük kabının gündüz uygun görünen bir pencere kenarında gece boyunca bırakılmaması öğretilir.",
    mevsimNotu:
      "Gül hasadı döneminde bölgenin çalışma temposu değişir; seans talebi hasat sonrasına yoğunlaşır.",
    miras:
      "Isparta, gül yetiştiriciliği ve gül yağı üretimiyle Türkiye'nin merkezidir; bitkisel ürün işleme kültürü şehirde gündelik hayatın parçasıdır.",
    toplum:
      "Tarım, halıcılık ve üniversite nüfusu bir aradadır; el emeğine dayalı işlerde bilek ve omuz yakınmaları öne çıkar.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın batı komşusudur; karayoluyla kısa sürede ulaşılır ve kursiyerler uygulama kampına günübirlik katılabilir.",
  },
  mersin: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Mersin kıyı şeridinde yaz sıcaklığı yüksek nemle birliktedir; iç kesimde Toros eteklerine çıkıldıkça koşullar hızla değişir. Kursiyere, aynı il içinde kıyı ve dağ ilçelerinde çalışırken tek bir saklama kuralına güvenilemeyeceği, ölçüme dayalı karar verilmesi gerektiği anlatılır.",
    mevsimNotu:
      "Yaz aylarında seanslar sabaha alınır; kış ayları bölgede uygulama için en rahat dönemdir.",
    miras:
      "Tarsus ve çevresi Anadolu'nun en eski kesintisiz yerleşimlerindendir; şehir tarih boyunca Akdeniz ticaretinin ve kültür geçişinin durağı olmuştur.",
    toplum:
      "Liman, lojistik ve tarım öne çıkar; ağır yük taşıma ve uzun vardiya kaynaklı bel yakınmaları sık görülür.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın güney komşusudur; karayoluyla doğrudan bağlanır ve kursiyerler kampa günübirlik katılabilir.",
  },
  istanbul: {
    iklim: "iliman-karasal",
    iklimDersi:
      "İstanbul'da iklim ılıman görünse de uygulama koşulunu belirleyen asıl etken mekândır: küçük, havalandırması sınırlı iş yerlerinde nem ve sıcaklık gün içinde dalgalanır. Kursiyere, sülük kabının klima ünitesinin doğrudan altına ya da radyatör üstüne konmaması ve iki uç arasındaki dalgalanmanın kaydedilerek izlenmesi öğretilir.",
    mevsimNotu:
      "Şehir içi ulaşım süreleri randevu planını doğrudan etkiler; seans aralıklarının geniş tutulması danışanın dinlenmiş gelmesini sağlar.",
    miras:
      "Süleymaniye Külliyesi'ndeki darüşşifa ve tıp medresesi ile Fatih Külliyesi'ndeki darüşşifa, Osmanlı'nın kurumsal sağlık geleneğinin en bilinen örnekleridir.",
    toplum:
      "Hizmet sektörü ve ofis çalışması baskındır; uzun süre oturmaya ve ekran başında çalışmaya bağlı boyun-omuz yakınmaları en sık dile getirilen başlıklardır.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya havayolu ve yüksek hızlı tren ile bağlanır; kursiyerler uygulama kampını tek gecelik programla tamamlayabilir.",
  },
  izmir: {
    iklim: "asiri-sicak",
    iklimDersi:
      "İzmir'de yaz uzun ve sıcak, kış ılıman geçer; kıyıda nem, iç ilçelerde kuru sıcak belirleyicidir. Kursiyere, yaz aylarında sülük kabının gündüz saatlerinde iklimlendirilen bir odada tutulması ve akşam serinliğine güvenilerek klimanın kapatılmasının su sıcaklığını yükselttiği ölçümle gösterilir.",
    mevsimNotu:
      "Temmuz–ağustosta seanslar sabaha alınır; ilkbahar ve sonbahar en dengeli dönemlerdir.",
    miras:
      "Bergama'daki Asklepion, antik dünyanın en tanınmış şifa merkezlerinden biridir; hekim Galenos bu şehirde doğmuş ve dönemin tıp anlayışını yüzyıllar boyunca etkileyen eserler bırakmıştır. Kupa ve kan alma uygulamalarının tarihini anlatan kaynaklarda bu coğrafya sık anılır.",
    toplum:
      "Ticaret, sanayi ve hizmet sektörü bir aradadır; farklı meslek gruplarından geniş bir danışan çeşitliliği görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya havayolu ve karayoluyla bağlanır; kursiyerler uygulama kampını tek gecelik programla planlayabilir.",
  },
  kars: {
    iklim: "donma-riski",
    iklimDersi:
      "Kars'ta kış uzun ve çok soğuktur; donma riski yılın önemli bir bölümünde gerçek bir kısıttır. Kursiyere, sülük kabının kesintisiz ısıtılan bir odada tutulması, kısa mesafeli taşımalarda bile yalıtımlı kutu kullanılması ve dışarıda geçirilen sürenin dakika bazında kısaltılması öğretilir.",
    mevsimNotu:
      "Aralık–nisan arasında hava koşulları randevu planını belirler; uygulayıcılar bu dönemde yoğunluğu gündüz saatlerine toplar.",
    miras:
      "Ani harabeleri bölgenin köklü şehir geleneğini gösterir; Kars'ta peynir ve hayvansal ürün işleme kültürü yerleşiktir.",
    toplum:
      "Hayvancılık başlıca geçim kaynağıdır; soğukta ve açık alanda çalışmaya bağlı eklem ve sırt yakınmaları belirgindir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  kastamonu: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Kastamonu'da kıyı kuşağı nemli, iç kesim soğuk ve karasaldır; il içindeki fark belirgindir. Kursiyere, nemli ilçelerde steril malzemenin nem almayan kutuda saklanması, iç kesimde ise kış gece sıcaklığının ayrıca ölçülmesi gerektiği anlatılır.",
    mevsimNotu:
      "Kış aylarında yüksek kesimlerde ulaşım aksar; ilkbahar ve sonbahar uygulama için en elverişli dönemlerdir.",
    miras:
      "Kastamonu'daki 13. yüzyıl tarihli darüşşifa yapısı Anadolu'nun erken dönem sağlık kurumlarındandır; Taşköprü sarımsağı da yörenin uzun soluklu üretim geleneğinin bir parçasıdır.",
    toplum:
      "Ormancılık, tarım ve kamu istihdamı öne çıkar; kırsal yerleşimlerin dağınık olması danışanların il merkezine yönelmesine yol açar.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla bağlanır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
  kayseri: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Kayseri, Erciyes eteğinde yüksek bir platoda yer alır; kış sert, yaz kuru geçer ve gece-gündüz farkı yıl boyu belirgindir. Kursiyere, gündüz uygun görünen bir odanın gece koşulunun ayrıca ölçülmesi ve sülük kabının bu ölçüme göre konumlandırılması öğretilir.",
    mevsimNotu:
      "Kış aylarında gece donları görülür; seans takvimi gündüz saatlerine toplanır.",
    miras:
      "Kayseri'deki 1206 tarihli Gevher Nesibe Darüşşifası ve bitişiğindeki tıp medresesi, Anadolu'da hastane ile eğitimin bir arada kurulduğu en erken örneklerdendir; şehrin tıp tarihindeki yeri bu yapıyla anılır.",
    toplum:
      "Sanayi ve ticaret yoğun istihdam üretir; fabrika ve atölye çalışanlarının sırt-omuz yakınmaları başvuru nedenlerinde öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya karayoluyla doğrudan bağlanır; kursiyerler uygulama kampına tek gecelik programla katılabilir.",
  },
  kirklareli: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Kırklareli'nde Istranca kuşağı nemli, güney kesim daha kuru bir karakter taşır. Kursiyere, ormanlık ilçelerde malzeme saklamada nem kontrolünün, ova kesiminde ise kış gece sıcaklığının öncelikli olduğu anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için elverişlidir; kış aylarında seans sonrası dinlenme süresi uzatılır.",
    miras:
      "Istranca (Yıldız) Dağları'nın bitki örtüsü Trakya'nın en zengin kuşağıdır; yörede bitki toplama ve arıcılık geleneği sürer.",
    toplum:
      "Tarım, hayvancılık ve sınır ticareti belirleyicidir; tarımsal iş yoğunluğu mevsime göre danışan profilini değiştirir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya İstanbul aktarmalı ulaşılır; kursiyerler uygulama kampını iki gecelik programla planlar.",
  },
  kirsehir: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Kırşehir bozkır kuşağında yer alır; kış soğuk ve rüzgârlı, yaz kuru ve sıcaktır. Kursiyere, rüzgâra açık binalarda iç mekân sıcaklığının beklenenden hızlı düştüğü, sülük kabının dış duvara bitişik olmayan bir bölmede tutulması öğretilir.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en dengeli dönemlerdir; iki uç mevsimde seans saatleri kaydırılır.",
    miras:
      "Kırşehir, Ahi Evran'ın şehridir ve Ahilik geleneğinin merkezi sayılır; bu gelenek meslek ahlakı, ustalık ve kalfalık ilişkisini kurumsallaştırmıştır — eğitim programımızın etik modülü de aynı çerçeveye dayanır.",
    toplum:
      "Tarım ve kamu istihdamı öne çıkar; küçük yerleşimlerden gelen danışanlar il merkezine yönelir.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Aksaray üzerinden karayoluyla bağlanır; kursiyerler kampa günübirlik ya da tek gecelik programla katılabilir.",
  },
  kocaeli: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Kocaeli'nde nem yıl boyu yüksektir ve sanayi dokusu nedeniyle çalışma mekânlarının çoğu kapalı, havalandırması sınırlı alanlardır. Kursiyere, uygulama odasının seans öncesi havalandırılması, steril malzemenin nemden korunması ve pansuman kontrol aralığının kısaltılması ayrıca öğretilir.",
    mevsimNotu:
      "Yaz aylarında nem ve sıcaklık birlikte artar; seanslar sabah ve akşam saatlerine yayılır.",
    miras:
      "İzmit körfezi çevresi tarih boyunca geçiş ve ticaret koridoru olmuştur; şehrin kültürel dokusu göçle gelen farklı gelenekleri bir arada barındırır.",
    toplum:
      "Ağır sanayi ve lojistik baskındır; vardiyalı çalışma ve ağır yük taşıma kaynaklı bel-sırt yakınmaları en sık başvuru nedenlerindendir.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya İstanbul ya da Eskişehir aktarmalı yüksek hızlı tren bağlantısı kullanılabilir.",
  },
  konya: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Konya, Türkiye'nin en az yağış alan bölgelerinden birinde, geniş bir platoda yer alır; hava kurudur ve gece-gündüz sıcaklık farkı belirgindir. Kuru hava, sülük kabındaki suyun buharlaşmasını hızlandırır. Uygulama kampı bu ilde yapıldığı için kursiyerler bu koşulu doğrudan gözlemler: kabın su seviyesi işaretlenir, gün içindeki değişim birlikte izlenir.",
    mevsimNotu:
      "Kış soğuk ve kuru, yaz sıcak ve kurudur; uygulama kampı takvimi iki uç mevsim dışına planlanır.",
    miras:
      "Konya, Anadolu Selçuklu'nun başkentidir; Karatay Medresesi ve çevresindeki yapılar şehrin ilim geleneğinin somut kayıtlarıdır. Akademimizin merkezi ve yüz yüze uygulama kampı bu şehirdedir.",
    toplum:
      "Tarım, sanayi ve ticaret bir aradadır; şehir aynı zamanda Türkiye'nin farklı illerinden gelen kursiyerlerin uygulama için buluştuğu noktadır.",
    ulasimSinifi: "yakin",
    ulasim:
      "Uygulama kampının yapıldığı şehirdir; Konya'da yaşayan kursiyerler tüm yüz yüze modüllere ulaşım sorunu yaşamadan katılır.",
  },
  kutahya: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Kütahya karasal bir hatta yer alır ve kış uzun sürer. Kursiyere, ısıtmanın gece kısıldığı binalarda sabaha karşı oda sıcaklığının belirgin düştüğü, bu nedenle sülük kabının ısıtma programının kesintisiz olduğu bir bölmede tutulması gerektiği anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; kışın seans sonrası dinlenme süresi uzatılır.",
    miras:
      "Kütahya çini geleneğiyle bilinir; ayrıca ilde çok sayıda jeotermal kaynak bulunur ve sıcak su kullanımı yörede eski bir alışkanlıktır.",
    toplum:
      "Madencilik, seramik ve tarım öne çıkar; tozlu ortamda ve ağır iş kollarında çalışanların yakınmaları belirgindir.",
    ulasimSinifi: "orta",
    ulasim:
      "Afyonkarahisar üzerinden Konya'ya karayoluyla bağlanır; kursiyerler kampa tek gecelik programla katılabilir.",
  },
  malatya: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Malatya'da yaz sıcak ve kuru, kış soğuktur; iki uç arasındaki fark yıllık en geniş aralıklardandır. Kursiyere, saklama düzeninin mevsim başında yeniden kurulması ve tek bir yıllık düzenin yeterli olmayacağı öğretilir.",
    mevsimNotu:
      "Kayısı hasadı döneminde bölgenin çalışma temposu tamamen değişir; seans talebi hasat sonrasına kayar.",
    miras:
      "Aslantepe Höyüğü Anadolu'nun en eski yerleşim katmanlarındandır; şehirdeki kayısı işleme kültürü de kuşaklar boyu aktarılan bir üretim geleneğidir.",
    toplum:
      "Tarım ve gıda işleme baskındır; hasat döneminde eğilerek ve ayakta uzun süre çalışmaya bağlı bel yakınmaları artar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ya da Kayseri üzerinden karayoluyla ulaşılır.",
  },
  manisa: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Gediz vadisinde yaz sıcaklığı yüksek değerlere ulaşır ve uzun sürer. Kursiyere, sülük kabının vadi tabanındaki iş yerlerinde üst katta değil zemin katta ve kuzey cephede tutulması, yaz aylarında su değişim aralığının kısaltılması öğretilir.",
    mevsimNotu:
      "Bağ ve zeytin hasadı dönemlerinde bölgenin temposu değişir; seans talebi hasat sonrasına yoğunlaşır.",
    miras:
      "Manisa, Mesir Macunu geleneğiyle ve 1539 tarihli Hafsa Sultan Külliyesi'ndeki darüşşifa yapısıyla bilinir; şehirdeki bitkisel karışım kültürü bu köke dayanır.",
    toplum:
      "Tarım ve sanayi bir aradadır; hasat işçiliği ile fabrika vardiyası danışan profilini birlikte belirler.",
    ulasimSinifi: "orta",
    ulasim:
      "İzmir üzerinden havayoluyla ya da Afyonkarahisar hattından karayoluyla Konya'ya ulaşılır.",
  },
  kahramanmaras: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Kahramanmaraş'ta ova kesiminde yaz çok sıcak, dağlık kesimde belirgin biçimde serindir; il içindeki bu fark saklama koşulunu doğrudan değiştirir. Kursiyere, aynı ilde iki farklı düzen kurmanın gerekebileceği ve kararın ölçüme dayandırılması gerektiği anlatılır.",
    mevsimNotu:
      "Yaz aylarında ovada gündüz uygulaması elverişsizdir; yayla kesiminde takvim yıl geneline yayılabilir.",
    miras:
      "Şehirde dondurma ve salep geleneği, dağ bitkilerinin gündelik kullanımıyla birlikte gelişmiştir; yörede bitkisel ürün bilgisi yaygındır.",
    toplum:
      "Tekstil ve tarım baskındır; deprem sonrası dönemde fiziksel yorgunluk ve uyku düzeni şikâyetleri danışan görüşmelerinde sık dile getirilmektedir; uygulayıcının hekime yönlendirme refleksi bu ilde ayrıca önemlidir.",
    ulasimSinifi: "orta",
    ulasim:
      "Konya'ya Adana ya da Kayseri üzerinden karayoluyla bağlanır.",
  },
  mardin: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Mardin'de yaz uzun ve çok sıcaktır; taş yapıların iç mekânı gündüz serin kalsa da gece ısıyı geri verir. Kursiyere, geleneksel taş binalarda çalışırken oda sıcaklığının gün içindeki seyrinin ayrıca ölçülmesi, sülük kabının bu seyre göre konumlandırılması öğretilir.",
    mevsimNotu:
      "Haziran–eylül arasında gündüz uygulaması elverişsizdir; seanslar erken sabaha ve geç akşama alınır.",
    miras:
      "Mardin'deki Artuklu dönemi külliyesinde yer alan maristan yapısı, bölgenin kurumsal sağlık geçmişini gösteren örneklerdendir; şehrin telkâri ve zanaat geleneği de aynı köke dayanır.",
    toplum:
      "Ticaret, tarım ve turizm bir aradadır; sıcak altında açık alanda çalışanların yorgunluk şikâyetleri yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  mugla: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Muğla'da kıyı ilçelerinde yaz sıcaklığı nemle, iç kesimde ise kuru sıcakla birlikte görülür. Kursiyere, deniz seviyesinden yüksekteki ilçelerde (Muğla merkez gibi) koşulların kıyıdan belirgin biçimde farklı olduğu ve saklama düzeninin buna göre kurulması gerektiği anlatılır.",
    mevsimNotu:
      "Turizm sezonunda kıyı ilçelerinde çalışma temposu değişir; seans takvimi sezon dışına kayar.",
    miras:
      "Datça yarımadasındaki Knidos, antik dünyanın bilinen tıp okullarından birine ev sahipliği yapmıştır; yörede çam balı ve bitkisel ürün üretimi bugün de sürer.",
    toplum:
      "Turizm, tarım ve arıcılık öne çıkar; ayakta uzun vardiya çalışan sezonluk personel danışan profilinde belirgindir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya karayoluyla Denizli–Afyonkarahisar hattı üzerinden ya da havayolu aktarmasıyla ulaşılır.",
  },
  mus: {
    iklim: "donma-riski",
    iklimDersi:
      "Muş ovası çevresi kışın uzun süre kar örtüsü altında kalır ve gece sıcaklıkları düşer. Kursiyere, sülük kabının ısıtılmayan hiçbir bölmede bırakılmaması, kış aylarında taşımanın yalıtımlı kutuyla ve doğrudan ısı kaynağı olmadan yapılması öğretilir.",
    mevsimNotu:
      "Kış aylarında ilçe yolları aksayabilir; randevular gündüz saatlerine ve hava koşuluna göre planlanır.",
    miras:
      "Malazgirt Ovası bölgenin tarihî hafızasında merkezî bir yer tutar; yaylalarda bitki toplama geleneği bugün de sürer.",
    toplum:
      "Tarım ve hayvancılık başlıca geçim kaynaklarıdır; soğukta ve açık alanda çalışmaya bağlı yakınmalar öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  nevsehir: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Nevşehir yüksek bir platoda yer alır; kış soğuk ve rüzgârlı geçer. Kursiyere, tüf kayaya oyulmuş ya da yarı gömük mekânlarda sıcaklığın dış havadan bağımsız seyredebileceği, bu nedenle varsayım yerine ölçümle karar verilmesi gerektiği anlatılır.",
    mevsimNotu:
      "Turizm sezonunda şehrin temposu değişir; seans takvimi sezon dışına kaydırılabilir.",
    miras:
      "Kapadokya bölgesinin merkezindedir; Hacıbektaş, Anadolu'nun köklü irfan geleneklerinden birinin merkezi olarak şehrin kültürel hafızasında yer tutar.",
    toplum:
      "Turizm, tarım ve el sanatları öne çıkar; sezonluk çalışma düzeni danışan yoğunluğunu belirler.",
    ulasimSinifi: "yakin",
    ulasim:
      "Aksaray üzerinden Konya'ya karayoluyla kısa sürede ulaşılır; kursiyerler kampa günübirlik katılabilir.",
  },
  nigde: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Niğde, Aladağlar eteğinde yüksek bir platodadır; gece sıcaklıkları yaz aylarında bile belirgin biçimde düşer. Kursiyere, gündüz sıcak görünen bir mekânın gece koşulunun ayrıca değerlendirilmesi ve sülük kabının bu iki ölçüme göre konumlandırılması öğretilir.",
    mevsimNotu:
      "Elma hasadı döneminde kırsalda iş yoğunluğu artar; seans talebi buna göre kayar.",
    miras:
      "Aladağlar ve çevresindeki yaylalar zengin bir bitki örtüsüne sahiptir; yörede dağ bitkisi toplama alışkanlığı sürer.",
    toplum:
      "Tarım ve soğuk hava depoculuğu öne çıkar; depo ve hasat işlerinde çalışanların bel yakınmaları sık görülür.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın doğu komşusudur; karayoluyla kısa sürede ulaşılır ve kursiyerler kampa günübirlik katılabilir.",
  },
  ordu: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Ordu'da yağış yıl geneline yayılır ve nem sürekli yüksektir. Kursiyere, steril malzemenin nem almayan kapalı kutuda tutulması, uygulama sonrası kapama malzemesinin nemli havada daha erken değiştirilmesi ve danışana yazılı bakım talimatı verilmesi öğretilir.",
    mevsimNotu:
      "Fındık hasadı döneminde bölgenin çalışma düzeni tamamen değişir; seans talebi hasat sonrasına yoğunlaşır.",
    miras:
      "Karadeniz yayla kültüründe bitki toplama ve yöresel karışım hazırlama geleneği köklüdür; Boztepe çevresindeki yayla hareketliliği bu kültürün parçasıdır.",
    toplum:
      "Fındık tarımı ve balıkçılık baskındır; eğimli arazide çalışmaya bağlı diz ve bel yakınmaları belirgindir.",
    ulasimSinifi: "uzak",
    ulasim:
      "Ordu-Giresun havalimanı üzerinden aktarmalı olarak ya da Ankara üzerinden karayoluyla Konya'ya ulaşılır.",
  },
  rize: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Rize, Türkiye'nin en çok yağış alan ilidir; nem yıl boyunca yüksek kalır. Bu ilde saklamanın kritik konusu sıcaklık değil nemdir: kâğıt ve pamuklu ambalajlı steril malzeme nem çeker ve steriliteye güven kaybolur. Kursiyere, malzemenin nem geçirmeyen kapalı kutularda ve yerden yüksekte tutulması, ambalajı gevşemiş ya da nemlenmiş her malzemenin tereddütsüz imha edilmesi öğretilir.",
    mevsimNotu:
      "Çay hasadı dönemlerinde bölgenin çalışma temposu tamamen değişir; seans talebi hasat aralıklarına göre planlanır.",
    miras:
      "Doğu Karadeniz'in yayla kültürü, yüksek yağışlı kuşağın zengin bitki örtüsüne dayanan bir halk hekimliği dili üretmiştir.",
    toplum:
      "Çay tarımı baskındır; eğimli arazide sırtta yük taşımaya bağlı bel ve omuz yakınmaları en sık dile getirilen başlıklardandır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Trabzon üzerinden havayolu aktarmasıyla Konya'ya ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  sakarya: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Sakarya'da nem yüksek, kışlar ılıman-yağışlıdır. Kursiyere, uygulama odasının seans öncesi havalandırılması ancak nemli dış havanın içeri dolmasına izin verilmemesi, steril malzemenin kapalı ve kuru bir dolapta tutulması anlatılır.",
    mevsimNotu:
      "Yaz aylarında nem ve sıcaklık birlikte artar; seanslar sabah saatlerine yayılır.",
    miras:
      "Sapanca ve çevresi tarih boyunca geçiş yolu üzerinde olmuştur; ilde farklı bölgelerden gelen toplulukların gelenekleri bir arada yaşar.",
    toplum:
      "Otomotiv sanayii ve tarım bir aradadır; vardiyalı çalışma kaynaklı kas-iskelet yakınmaları öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Eskişehir üzerinden yüksek hızlı tren ya da karayoluyla Konya'ya ulaşılır.",
  },
  samsun: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Samsun kıyı kuşağında nem yüksektir; iç kesimdeki ovalarda koşullar biraz daha kurudur. Kursiyere, kıyıda malzeme neminin, iç kesimde ise kış gece sıcaklığının öncelikli kontrol başlığı olduğu öğretilir.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için elverişlidir; yaz aylarında nem artışı seans konforunu etkiler.",
    miras:
      "Bafra ve Çarşamba ovaları bölgenin en verimli tarım alanlarıdır; yörede bitkisel ürün kullanımı gündelik hayatın parçasıdır.",
    toplum:
      "Tarım, liman ve ticaret öne çıkar; bölgenin sağlık hizmetlerinde merkez konumunda olması danışan çeşitliliğini artırır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ya da Ankara üzerinden karayoluyla ulaşılır.",
  },
  siirt: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Siirt'te yaz uzun ve çok sıcaktır; gece sıcaklıkları da yüksek kalır. Kursiyere, gündüz-gece dengelemesine güvenilemeyeceği, yaz aylarında sülük kabının sürekli iklimlendirilen bir odada tutulması ve su sıcaklığının günde iki kez ölçülmesi öğretilir.",
    mevsimNotu:
      "Haziran–eylül arasında gündüz uygulaması elverişsizdir; seanslar erken sabah ve geç akşam saatlerine alınır.",
    miras:
      "Siirt'te bıttım (menengiç) sabunu ve yöresel bitkisel ürün üretimi köklü bir gelenektir; bu üretim şehrin gündelik kültürünün parçasıdır.",
    toplum:
      "Tarım, hayvancılık ve ticaret öne çıkar; sıcak altında açık alanda çalışanların yorgunluk şikâyetleri yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  sinop: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Sinop, Türkiye'nin en kuzey noktasındadır; nem yıl boyu yüksek, sıcaklık ılımandır. Kursiyere, ılıman sıcaklığın saklamayı kolaylaştırdığı ancak nemin steril malzeme için asıl risk olduğu, kontrol listesinin buna göre kurulması gerektiği anlatılır.",
    mevsimNotu:
      "Kış aylarında rüzgâr ve yağış belirgindir; uygulama odasının havalandırılmasında hava akımı yönü gözetilir.",
    miras:
      "Sinop, antik dönemden bu yana Karadeniz'in korunaklı limanlarından biridir; şehrin kültürel hafızası bu köklü liman geçmişine dayanır.",
    toplum:
      "Balıkçılık, tarım ve turizm öne çıkar; denizde çalışmaya bağlı sırt ve omuz yakınmaları sık görülür.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya Ankara üzerinden karayoluyla ulaşılır; kursiyerler uygulama kampını iki gecelik programla planlar.",
  },
  sivas: {
    iklim: "donma-riski",
    iklimDersi:
      "Sivas, geniş bir platoda yer alır ve Türkiye'nin en uzun kış süresine sahip illerindendir. Kursiyere, sülük kabının kış boyunca kesintisiz ısıtılan bir odada tutulması, ısıtmanın gece kısıldığı binalarda kabın yalıtımlı bir kutu içinde bekletilmesi ve sabah ölçüm alınmadan seans planlanmaması öğretilir.",
    mevsimNotu:
      "Kış aylarında ilçe bağlantıları aksayabilir; randevular gündüz saatlerine toplanır ve teyitli çalışılır.",
    miras:
      "Sivas'taki 1217 tarihli darüşşifa ile Divriği'deki Ulu Cami ve Darüşşifa yapısı Anadolu'nun en bilinen sağlık kurumları arasındadır; Divriği yapısı UNESCO listesindedir. Kangal'daki termal kaynak da yörede uzun süredir bilinen bir yerel değerdir.",
    toplum:
      "Tarım, hayvancılık ve demiryolu-sanayi geçmişi belirleyicidir; soğukta çalışmaya bağlı eklem yakınmaları öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Kayseri üzerinden Konya'ya karayoluyla bağlanır; havayolu aktarması da kullanılan bir seçenektir.",
  },
  tekirdag: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Tekirdağ'da kıyı kesimi ılıman, iç kesim daha kuru ve rüzgârlıdır. Kursiyere, kuvvetli rüzgârın uygulama odasının havalandırılmasında dikkat gerektirdiği ve doğrudan hava akımının danışanın üzerine gelmemesi gerektiği anlatılır.",
    mevsimNotu:
      "Yaz aylarında Trakya'da sıcaklık yükselir; seanslar sabah saatlerine alınır.",
    miras:
      "Trakya'nın bağcılık ve tarım geleneği köklüdür; şehir tarih boyunca Marmara ticaretinin duraklarından biri olmuştur.",
    toplum:
      "Sanayi ve tarım bir aradadır; fabrika vardiyası ile tarım işçiliği danışan profilini birlikte belirler.",
    ulasimSinifi: "uzak",
    ulasim:
      "İstanbul aktarmasıyla Konya'ya ulaşılır; kursiyerler uygulama kampını iki gecelik programla planlar.",
  },
  tokat: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Tokat, Yeşilırmak vadisinde korunaklı bir mikro iklime sahiptir; uç koşullar komşu illere göre yumuşaktır. Kursiyere, vadi tabanında kış sabahlarında görülen sis ve nemin malzeme saklamada gözetilmesi gerektiği öğretilir.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; takvim yıl geneline yayılabilir.",
    miras:
      "Tokat'taki Gök Medrese, 13. yüzyılda darüşşifa olarak da kullanılmış Selçuklu yapılarındandır; şehirdeki bakır işçiliği ve yazmacılık geleneği de aynı döneme uzanır.",
    toplum:
      "Tarım ve gıda işleme öne çıkar; hasat dönemlerinde bel ve omuz yakınmaları artar.",
    ulasimSinifi: "orta",
    ulasim:
      "Kayseri ya da Ankara üzerinden Konya'ya karayoluyla ulaşılır.",
  },
  trabzon: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Trabzon'da nem yıl boyu yüksektir ve yağış her mevsime dağılır. Kursiyere, steril malzemenin nem geçirmeyen kutularda saklanması, uygulama sonrası pansumanın nemli havada daha sık kontrol edilmesi ve danışana bu konuda açık talimat verilmesi öğretilir.",
    mevsimNotu:
      "Yağışlı dönemlerde ulaşım aksayabilir; ilçelerden gelen danışanlar için randevu teyidi yerleşik bir alışkanlıktır.",
    miras:
      "Trabzon, Karadeniz'in köklü liman ve ticaret şehirlerindendir; yayla kültürüne dayalı bitki toplama geleneği bölgede sürer.",
    toplum:
      "Ticaret, balıkçılık ve tarım bir aradadır; bölgenin sağlık hizmetlerinde merkez konumunda olması danışan çeşitliliğini artırır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  tunceli: {
    iklim: "donma-riski",
    iklimDersi:
      "Tunceli dağlık ve yüksek rakımlı bir ildir; kış uzun sürer ve vadi tabanında bile gece sıcaklıkları düşer. Kursiyere, sülük kabının ısıtılan tek bir odada tutulması ve kış aylarında ilçeler arası taşımanın mümkün olduğunca ertelenmesi öğretilir.",
    mevsimNotu:
      "Kış aylarında ilçe yolları kapanabilir; malzeme stoğunun mevsim başında planlanması gerekir.",
    miras:
      "Munzur Vadisi Türkiye'nin en zengin endemik bitki alanlarındandır; yörede dağdan bitki toplama geleneği canlıdır.",
    toplum:
      "Hayvancılık, arıcılık ve kamu istihdamı öne çıkar; dağınık yerleşim danışanların il merkezine yönelmesine yol açar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Elazığ üzerinden havayolu aktarmasıyla Konya'ya ulaşılır.",
  },
  sanliurfa: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Şanlıurfa'da yaz Türkiye'nin en sıcak ve en uzun yazlarındandır; gece bile serinleme sınırlıdır. Kursiyere, yaz aylarında sülük kabının kesintisiz iklimlendirilen bir odada tutulması, elektrik kesintisi ihtimaline karşı yalıtımlı kutunun hazır bulundurulması ve su sıcaklığının günde iki kez kayıt altına alınması öğretilir.",
    mevsimNotu:
      "Mayıs–eylül arasında gündüz uygulaması pratik değildir; seanslar erken sabaha ve gece saatlerine yayılır.",
    miras:
      "Harran, ortaçağda çeviri ve bilim geleneğinin merkezlerinden biriydi; buradan yetişen âlimler dönemin matematik, astronomi ve tıp literatürüne katkı yapmıştır. Göbeklitepe ve Balıklıgöl de şehrin çok katmanlı hafızasının parçasıdır.",
    toplum:
      "Tarım ve ticaret baskındır; sulama tarımında açık alanda çalışanların sıcak kaynaklı yorgunluk şikâyetleri yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ya da Gaziantep–Adana hattından karayoluyla ulaşılır.",
  },
  usak: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Uşak karasal bir hatta yer alır; yaz kuru-sıcak, kış soğuktur. Kursiyere, kuru havanın sülük kabındaki su kaybını hızlandırdığı ve seviye takibinin haftalık değil daha sık yapılması gerektiği anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en dengeli dönemlerdir.",
    miras:
      "Uşak, halıcılık ve dokuma geleneğiyle bilinir; el emeğine dayalı üretim kültürü şehirde yerleşiktir.",
    toplum:
      "Tekstil ve deri sanayii öne çıkar; tezgâh başında uzun süre aynı pozisyonda çalışanlarda boyun-omuz yakınmaları belirgindir.",
    ulasimSinifi: "orta",
    ulasim:
      "Afyonkarahisar üzerinden Konya'ya karayoluyla bağlanır; kursiyerler kampa tek gecelik programla katılabilir.",
  },
  van: {
    iklim: "donma-riski",
    iklimDersi:
      "Van'da kış uzun ve sert geçer; göl etkisi kıyı şeridinde koşulları bir miktar yumuşatsa da iç kesimde donma riski gerçektir. Kursiyere, göl kıyısındaki koşullara bakarak ilçe merkezleri için düzen kurmanın yanıltıcı olduğu, her mekânın kendi ölçümüyle değerlendirilmesi gerektiği öğretilir.",
    mevsimNotu:
      "Kış aylarında yüksek kesimlerde ulaşım aksar; randevular gündüz saatlerine toplanır.",
    miras:
      "Van Kalesi ve çevresi Urartu döneminden bu yana kesintisiz yerleşim taşır; yörede otlaklardan bitki toplama geleneği sürer.",
    toplum:
      "Ticaret, hayvancılık ve üniversite nüfusu bir aradadır; bölgenin merkez ili olması danışan çeşitliliğini artırır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  yozgat: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Yozgat bozkır kuşağında ve nispeten yüksek bir platodadır; kış soğuk ve rüzgârlı geçer. Kursiyere, rüzgâra açık binalarda ısı kaybının hızlı olduğu ve sülük kabının iç bölmelerde tutulması gerektiği anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; kışın seans sonrası dinlenme süresi uzatılır.",
    miras:
      "Çapanoğlu Camii ve Çamlık çevresi şehrin köklü yerleşim ve vakıf geleneğini gösterir; yörede bitkisel ürün kullanımı yaygındır.",
    toplum:
      "Tarım ve kamu istihdamı öne çıkar; kırsaldan gelen danışanlar il merkezine yönelir.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara ya da Kırşehir üzerinden Konya'ya karayoluyla ulaşılır.",
  },
  zonguldak: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Zonguldak'ta nem yüksek, yağış yıl geneline yayılıdır. Kursiyere, steril malzemenin nem almayan kutularda saklanması ve maden bölgesindeki iş yerlerinde toz-nem birlikteliğinin uygulama odası hijyenini doğrudan etkilediği, odanın ayrı ve kapalı tutulması gerektiği öğretilir.",
    mevsimNotu:
      "Vardiya düzeni nedeniyle seans talebi gün içine dağılır; uygulayıcının çalışma saatlerini buna göre kurması gerekir.",
    miras:
      "Zonguldak, Türkiye'nin taşkömürü madenciliğinin merkezidir; şehrin toplumsal hafızası bu ağır iş kolunun etrafında şekillenmiştir.",
    toplum:
      "Madencilik ve ağır sanayi baskındır; yer altında ve zorlayıcı pozisyonlarda çalışmaya bağlı sırt, bel ve omuz yakınmaları bu ilde en sık dile getirilen başlıklardır.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla bağlanır; kursiyerler uygulama kampını tek gecelik programla tamamlayabilir.",
  },
  aksaray: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Aksaray, Tuz Gölü ile Hasan Dağı arasındaki kurak bir düzlükte yer alır; hava kurudur ve buharlaşma hızlıdır. Kursiyere, sülük kabındaki su seviyesinin işaretlenerek izlenmesi ve tamamlamanın aynı sıcaklıktaki suyla yapılması öğretilir.",
    mevsimNotu:
      "Yaz kuru-sıcak, kış soğuk geçer; ilkbahar ve sonbahar uygulama için en dengeli dönemlerdir.",
    miras:
      "Ihlara Vadisi ve Sultanhanı Kervansarayı, şehrin Selçuklu yol ağındaki konumunu gösterir; Aksaray tarih boyunca Konya'ya bağlı bir menzil noktası olmuştur.",
    toplum:
      "Tarım, hayvancılık ve otomotiv sanayii bir aradadır; fabrika vardiyası ile tarım işçiliği danışan profilini birlikte belirler.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın doğu komşusudur; karayoluyla kısa sürede ulaşılır ve kursiyerler kampa günübirlik katılabilir.",
  },
  bayburt: {
    iklim: "donma-riski",
    iklimDersi:
      "Bayburt, Türkiye'nin en yüksek rakımlı il merkezlerindendir; kış uzun ve sert geçer. Kursiyere, sülük kabının kesintisiz ısıtılan bir odada tutulması ve kış aylarında dış ortama çıkarılan her dakikanın kayıt altına alınacak kadar önemli olduğu öğretilir.",
    mevsimNotu:
      "Kış aylarında geçit yolları hava koşullarından etkilenir; randevular teyitli ve gündüz saatlerinde planlanır.",
    miras:
      "Baksı ve çevresindeki yayla kültürü, yüksek rakım bitkilerine dayanan bir yerel bilgi birikimi taşır.",
    toplum:
      "Hayvancılık ve tarım baskındır; soğukta çalışmaya bağlı eklem yakınmaları öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Trabzon ya da Erzurum üzerinden havayolu aktarmasıyla Konya'ya ulaşılır.",
  },
  karaman: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Karaman, Konya platosunun güney ucunda yer alır; hava kuru, gece-gündüz farkı belirgindir. Kursiyere, kuru havanın su kaybını hızlandırdığı ve Toros eteğindeki ilçelerde rakıma bağlı olarak koşulların değiştiği anlatılır.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en elverişli dönemlerdir; yaz kuru-sıcak geçer.",
    miras:
      "Karaman, Karamanoğlu Mehmet Bey'in Türkçenin resmî dil olarak ilan edildiği kararla anılan şehridir; yörede köklü bir yazılı gelenek hafızası vardır.",
    toplum:
      "Gıda sanayii ve tarım öne çıkar; üretim bandında ayakta uzun süre çalışanların bel ve bacak yakınmaları sık görülür.",
    ulasimSinifi: "yakin",
    ulasim:
      "Konya'nın güney komşusudur; karayoluyla kısa sürede ulaşılır ve kursiyerler kampa günübirlik katılabilir.",
  },
  kirikkale: {
    iklim: "iliman-karasal",
    iklimDersi:
      "Kırıkkale karasal bir hatta yer alır; yaz kuru-sıcak, kış soğuktur. Kursiyere, sanayi tesisi çevresindeki iş yerlerinde toz yükünün yüksek olabileceği ve uygulama odasının bu ortamdan ayrı, kapalı bir bölme olarak kurulması gerektiği öğretilir.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için en dengeli dönemlerdir.",
    miras:
      "Kırıkkale, Cumhuriyet döneminin sanayi yatırımlarıyla kurulmuş bir şehirdir; toplumsal hafızası fabrika kültürüyle şekillenmiştir.",
    toplum:
      "Savunma ve makine sanayii baskındır; vardiyalı çalışma ve tekrarlı hareket kaynaklı yakınmalar öne çıkar.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayolu ya da yüksek hızlı tren bağlantısıyla ulaşılır.",
  },
  batman: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Batman'da yaz çok sıcak ve uzun sürer; gece serinlemesi sınırlıdır. Kursiyere, sülük kabının yaz boyunca sürekli iklimlendirilen bir odada tutulması ve klimanın gece kapatılmasının su sıcaklığını hızla yükselttiği ölçümle gösterilir.",
    mevsimNotu:
      "Haziran–eylül arasında gündüz uygulaması elverişsizdir; seanslar erken sabah ve geç akşam saatlerine alınır.",
    miras:
      "Hasankeyf ve çevresi Dicle havzasının en eski yerleşim katmanlarındandır; bölgede aktarlık ve bitkisel ürün kullanımı yaygındır.",
    toplum:
      "Petrol sanayii, ticaret ve tarım bir aradadır; açık alanda sıcak altında çalışanların yorgunluk şikâyetleri yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Konya'ya havayolu aktarmasıyla ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  sirnak: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Şırnak'ta ova kesiminde yaz çok sıcak, dağlık kesimde kış sert geçer; il içinde iki uç bir aradadır. Kursiyere, aynı ilde iki ayrı saklama düzeni kurulması gerekebileceği ve kararın mekânın ölçümüne dayandırılması gerektiği anlatılır.",
    mevsimNotu:
      "Ova kesiminde yaz, dağlık kesimde kış uygulama takvimini daraltır; iki dönem ayrı planlanır.",
    miras:
      "Cizre, ortaçağın önemli ilim ve zanaat merkezlerinden biriydi; mühendis ve mucit el-Cezerî çalışmalarının önemli bölümünü bu şehirde üretmiştir.",
    toplum:
      "Ticaret, hayvancılık ve sınır ekonomisi öne çıkar; açık alanda çalışmaya bağlı yakınmalar yaygındır.",
    ulasimSinifi: "uzak",
    ulasim:
      "Şırnak ya da Mardin üzerinden havayolu aktarmasıyla Konya'ya ulaşılır.",
  },
  bartin: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Bartın'da nem yüksek, yağış yıl geneline yayılıdır. Kursiyere, steril malzemenin nem geçirmeyen kutuda ve yerden yüksekte saklanması, ambalajı nemlenmiş malzemenin kullanılmayıp imha edilmesi öğretilir.",
    mevsimNotu:
      "Yağışlı dönemlerde kırsal ulaşım aksar; randevu teyidi yerleşik bir alışkanlıktır.",
    miras:
      "Amasra, Karadeniz'in en eski liman yerleşimlerindendir; ilde ahşap işçiliği ve tel kırma dokuma gibi köklü el sanatları sürer.",
    toplum:
      "Ormancılık, tarım ve turizm öne çıkar; eğimli arazide çalışmaya bağlı diz ve bel yakınmaları görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla ulaşılır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
  ardahan: {
    iklim: "donma-riski",
    iklimDersi:
      "Ardahan, Türkiye'nin en soğuk il merkezlerindendir; kış çok uzun sürer ve gece sıcaklıkları uçlara iner. Bu ilde sülük saklamanın tek kritik konusu donmaya karşı korumadır. Kursiyere, kabın kesintisiz ısıtılan bir odada tutulması, taşımanın kış aylarında zorunlu olmadıkça yapılmaması ve zorunlu hâllerde yalıtımlı kutu ile ısı kaynağı olmadan taşınması ayrı ayrı gösterilir.",
    mevsimNotu:
      "Kış yılın büyük bölümünü kaplar; uygulayıcıların malzeme stoğunu sonbaharda tamamlaması pratik bir zorunluluktur.",
    miras:
      "Çıldır Gölü çevresindeki yayla kültürü, kısa yaz döneminde toplanan bitkilere dayanan bir yerel bilgi birikimi taşır.",
    toplum:
      "Hayvancılık başlıca geçim kaynağıdır; soğukta ve açık alanda çalışmaya bağlı eklem yakınmaları bu ilde belirgin biçimde öne çıkar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Kars üzerinden havayolu aktarmasıyla Konya'ya ulaşılır; kursiyerler uygulama kampını iki gecelik programa yayar.",
  },
  igdir: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Iğdır, Doğu Anadolu'da olmasına rağmen Aras Ovası'nın alçak konumu nedeniyle bölgenin geri kalanından belirgin biçimde ılık bir mikro iklim yaşar; yaz sıcak geçer. Kursiyere, coğrafi bölgeye bakarak saklama düzeni kurmanın yanıltıcı olduğu, komşu illerdeki donma önlemlerinin burada değil sıcak iklim önlemlerinin geçerli olduğu özellikle anlatılır.",
    mevsimNotu:
      "Yaz aylarında gündüz sıcaklığı yüksektir; seanslar sabah saatlerine alınır, kış ise bölge ortalamasına göre yumuşak geçer.",
    miras:
      "Aras Ovası'nın verimli toprakları kayısı ve pamuk tarımına imkân verir; bu üretim çeşitliliği bölgede alışılmadık bir durumdur ve şehrin karakterini belirler.",
    toplum:
      "Tarım ve sınır ticareti öne çıkar; hasat döneminde eğilerek çalışmaya bağlı bel yakınmaları artar.",
    ulasimSinifi: "uzak",
    ulasim:
      "Iğdır ya da Kars havalimanları üzerinden aktarmalı olarak Konya'ya ulaşılır.",
  },
  yalova: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Yalova'da nem yüksek, kış ılıman geçer. Kursiyere, ılıman sıcaklığın sülük saklamayı kolaylaştırdığı ancak yüksek nemin steril malzeme için asıl risk olduğu, kontrol listesinin sıcaklık değil nem odaklı kurulması gerektiği öğretilir.",
    mevsimNotu:
      "Yaz aylarında nem ve sıcaklık birlikte artar; uygulama odasının serin ve havalandırılabilir olması öncelik kazanır.",
    miras:
      "Yalova, termal kaynaklarıyla bilinen bir ildir; sıcak su kullanımı yörede uzun süredir yerleşik bir alışkanlıktır.",
    toplum:
      "Tarım, süs bitkiciliği ve turizm öne çıkar; sera ve fidanlık işlerinde eğilerek çalışmaya bağlı bel yakınmaları görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "İstanbul ya da Bursa üzerinden Konya'ya ulaşılır; kursiyerler uygulama kampını tek gecelik programla planlar.",
  },
  karabuk: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Karabük'te vadi konumu nedeniyle nem ve sanayi kaynaklı hava yükü bir aradadır. Kursiyere, uygulama odasının dış ortamdan ayrı ve kapalı tutulması, havalandırmanın filtreli ya da kontrollü yapılması ve steril malzemenin nemden korunması ayrıca öğretilir.",
    mevsimNotu:
      "Kış aylarında vadi tabanında sis ve nem birlikte görülür; seans takvimi gündüz saatlerine toplanır.",
    miras:
      "Safranbolu, adını taşıdığı safran bitkisinin yetiştirildiği yöredir ve korunmuş Osmanlı şehir dokusuyla UNESCO listesindedir; safran, yörede yüzyıllardır bilinen bir yerel üründür.",
    toplum:
      "Demir-çelik sanayii baskındır; ağır sanayide vardiyalı çalışmaya bağlı sırt ve omuz yakınmaları en sık başvuru nedenlerindendir.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla bağlanır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
  kilis: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Kilis'te yaz uzun ve sıcaktır; gece serinlemesi sınırlıdır. Kursiyere, küçük ölçekli iş yerlerinde tek bir odanın hem bekleme hem uygulama alanı olarak kullanılmasının hijyen açısından sakıncalı olduğu, sülük kabının bu ortak alanda tutulmaması gerektiği öğretilir.",
    mevsimNotu:
      "Haziran–eylül arasında seanslar erken sabaha alınır; kış aylarında takvim rahatlar.",
    miras:
      "Kilis, tarih boyunca Halep hattının Anadolu'ya açılan kapısı olmuştur; şehirdeki zeytinyağı ve aktarlık geleneği bu geçiş kültürünün parçasıdır.",
    toplum:
      "Tarım ve sınır ticareti öne çıkar; küçük esnaf yoğunluğu danışan profilini belirler.",
    ulasimSinifi: "orta",
    ulasim:
      "Gaziantep üzerinden Konya'ya karayolu ya da havayolu aktarmasıyla ulaşılır.",
  },
  osmaniye: {
    iklim: "asiri-sicak",
    iklimDersi:
      "Osmaniye, Çukurova ile Amanoslar arasında kalır; ovada yaz çok sıcak, dağ eteklerinde belirgin biçimde serindir. Kursiyere, kısa mesafede bile rakıma bağlı olarak koşulların değiştiği ve saklama kararının ilin adına göre değil mekânın ölçümüne göre verilmesi gerektiği anlatılır.",
    mevsimNotu:
      "Yaz aylarında ovada gündüz uygulaması elverişsizdir; sonbahar en dengeli dönemdir.",
    miras:
      "Karatepe-Aslantaş çevresi Geç Hitit dönemine uzanan bir yerleşim katmanı taşır; yörede yer fıstığı ve bitkisel ürün üretimi yaygındır.",
    toplum:
      "Tarım, demir-çelik ve lojistik bir aradadır; ağır yük taşımaya bağlı bel yakınmaları sık görülür.",
    ulasimSinifi: "orta",
    ulasim:
      "Adana üzerinden Konya'ya karayoluyla bağlanır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
  duzce: {
    iklim: "yuksek-nem",
    iklimDersi:
      "Düzce'de nem yüksek, yağış yıl geneline yayılıdır ve ovada sis sık görülür. Kursiyere, steril malzemenin nem almayan kapalı kutuda saklanması ve uygulama odasının zemin katta değil mümkünse nemden uzak bir bölmede kurulması öğretilir.",
    mevsimNotu:
      "İlkbahar ve sonbahar uygulama için elverişlidir; kış aylarında sis nedeniyle ulaşım aksayabilir.",
    miras:
      "Düzce ovası ve Akçakoca kıyısı, orman ve tarım kültürünün bir arada yaşadığı bir yöredir; bölgede fındık ve bitkisel ürün üretimi yaygındır.",
    toplum:
      "Tarım, orman ürünleri ve sanayi bir aradadır; fabrika vardiyası ile tarım işçiliği danışan profilini birlikte belirler.",
    ulasimSinifi: "orta",
    ulasim:
      "Ankara üzerinden Konya'ya karayoluyla ulaşılır; kursiyerler kampı tek gecelik programla tamamlayabilir.",
  },
};

/**
 * Bütünlük denetimi — 81 ilin tamamının profili bulunmalıdır.
 * Eksik profil, şablona düşen ve dolayısıyla kopya içerik üreten bir sayfa
 * demektir; bu yüzden hata build sırasında atılır, sessizce geçilmez.
 */
export function assertEduProfilesComplete(): void {
  const missing = PROVINCES.filter((p) => !PROVINCE_EDU_PROFILES[p.slug]).map((p) => p.slug);
  if (missing.length > 0) {
    throw new Error(
      `province-education-profiles: ${missing.length} il profili eksik → ${missing.join(", ")}`,
    );
  }
  const extra = Object.keys(PROVINCE_EDU_PROFILES).filter(
    (slug) => !PROVINCES.some((p) => p.slug === slug),
  );
  if (extra.length > 0) {
    throw new Error(`province-education-profiles: tanınmayan il slug'ı → ${extra.join(", ")}`);
  }
}

export function getEduProfile(slug: string): ProvinceEducationProfile | undefined {
  return PROVINCE_EDU_PROFILES[slug];
}
