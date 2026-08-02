# Görsel Planı — Ebusadullah Akademi

Görselleri siz hazırlıyorsunuz. Bu dosya, **hangi görselin nereye gireceğini**,
ölçüsünü ve dosya adını gösterir. Çekimler geldiğinde tek tek yerine takılır;
kod tarafında ek iş çıkmaz.

## Kural: dosya adı ve klasör

Tüm görseller `public/img/` klasörüne konur. Dosya adları **küçük harf, Türkçe
karaktersiz, tire ayraçlı** olmalıdır.

Format: **WebP tercih edilir** (JPG de olur). Ham fotoğrafı gönderin, dönüştürme
ve boyutlandırmayı biz yaparız.

---

## 1. Öncelikli görseller (site açılışı için yeterli)

| # | Dosya adı | Nerede kullanılacak | Önerilen ölçü | Çekim notu |
|---|---|---|---|---|
| 1 | `egitmen-portre.webp` | `/egitmen` sayfası üst blok | 1200×1500 (dikey) | Ebusadullah Hoca, sade arka plan, göğüs üstü. Tek dikey çekim isteyen görsel budur. |
| 2 | `uygulama-kampi.webp` | Ana sayfa hero yanı | 1600×1200 (yatay) | Eğitmen bir kursiyere gösterirken. Yüzler görünmese de olur. |
| 3 | `egitim-alani.webp` | `/hacamat-egitimi` üst blok | 1600×1200 (yatay) | Çalışma alanının düzenli hâli, masa kurulumu. |
| 4 | `malzeme-seti.webp` | `/suluk-egitimi` üst blok | 1600×1200 (yatay) | Steril paketler, kupalar, tek kullanımlık set — yakın çekim. |
| 5 | `sertifika-ornegi.webp` | `/sertifika-dogrulama` | 1400×1000 (yatay) | Belgenin fotoğrafı, **isim kısmı kapatılmış**. |
| 6 | `merkez-dis.webp` | `/iletisim` sayfası | 1600×1000 (yatay) | Merkezin girişi / tabela. |

## 2. İkinci grup (blog kapakları)

Blog yazılarının kapağı yok. Aşağıdaki 6 görsel, 15 yazıya konusuna göre
dağıtılabilir — her yazıya ayrı fotoğraf gerekmez.

| # | Dosya adı | Hangi yazılarda | Çekim notu |
|---|---|---|---|
| 7 | `blog-hacamat-uygulama.webp` | Hacamat kümesi (5 yazı) | Kupa uygulaması sırasında yakın çekim |
| 8 | `blog-suluk.webp` | Sülük kümesi (5 yazı) | Sülük barındırma kabı veya uygulama hazırlığı |
| 9 | `blog-hijyen.webp` | Hijyen/kriz yazıları | Eldiven, dezenfeksiyon, steril paket açma anı |
| 10 | `blog-egitim-sinif.webp` | Eğitim/kariyer yazıları | Ders anı, defter, sunum |
| 11 | `blog-sertifika.webp` | Sertifika yazıları | Belge teslimi anı |
| 12 | `blog-danisan-gorusme.webp` | Danışan iletişimi yazısı | Ön görüşme masası (yüz görünmeden) |

Kapak ölçüsü: **1200×630** (sosyal paylaşımda da bu oran kullanılır).

---

## 3. Çekim kuralları

- **Yatay çekin** (portre hariç). Telefon yeterli.
- Gündüz, pencere ışığı. **Flaş kullanmayın.**
- Arka plan sade olsun; dağınık masa, kablo, kişisel eşya görünmesin.
- Kursiyer veya danışan **yüzü görünecekse yazılı izin şart** — izin yoksa
  yüz görünmeyecek açıdan çekin.
- Hijyen görsellerinde eldiven takılı olsun; kural ihlali gösteren bir kare
  yayınlanamaz (eğitim sitesi olduğumuz için görsel de bir örnektir).
- Aynı sahnenin 3–4 farklı açısını çekin, seçimi biz yaparız.

---

## 4. Görsel geldiğinde ne olacak?

1. `public/img/` altına eklenir.
2. Sayfa/blog frontmatter'ına bağlanır (blog için `image:` alanı hazır).
3. `next/image` ile otomatik olarak WebP'ye çevrilir, boyutlandırılır ve
   tembel yüklenir (LCP görselleri hariç — onlar öncelikli yüklenir).
4. **Alt metni** yazılır: her görselin ne gösterdiği açıkça belirtilir
   (görme engelli kullanıcılar ve arama motorları için).

## 5. Şu an görselsiz çalışan yerler

Aşağıdaki bölümler görsel gelmeden de düzgün görünüyor; görsel eklenince
otomatik zenginleşir:

- Ana sayfa hero (şu an tipografi + kart düzeni)
- Program sayfaları (modül listeleri ve kartlar)
- Blog kartları (tarih + başlık + özet)
- Sosyal paylaşım görseli (`og.png` — marka kartı olarak hazır)
