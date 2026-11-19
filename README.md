# Mert Teknik — Web sitesi

## Dosya yapısı

- `index.html` — Sayfa yapısı, SEO meta etiketleri, header/footer ve içerik alanları
- `style.css` — Tasarım, responsive düzen ve animasyonlar
- `script.js` — Slider etkileşimleri, kampanya ekleme/silme, Bootstrap toast, video modalı
- `assets/` — Kendi logo, görsel ve video kapaklarınızı koyabileceğiniz klasör

## Yerelde çalıştırma

1. ZIP dosyasını çıkartın.
2. `index.html` dosyasını tarayıcıda açın.
3. Daha sağlıklı geliştirme için VS Code içinden Live Server kullanın.

Bootstrap 5.3.3, Bootstrap Icons ve Google Fonts CDN üzerinden yüklenir. Bu nedenle ilk açılışta internet bağlantısı gerekir.

## Telefon ve WhatsApp

Telefon numarası mevcut taslakta `0536 636 74 16` olarak işlendi. Numara değişirse HTML içindeki `tel:+905366367416` ve `https://wa.me/905366367416` bağlantılarını güncelleyin.

## Görsel ekleme

- Hero slider görselleri: `style.css` içinde `.photo-one`, `.photo-two`, `.photo-three` sınıflarının `background-image` adreslerini değiştirin.
- Galeri görselleri: `.gallery-feature`, `.gallery-photo-a`, `.gallery-photo-b` sınıflarını güncelleyin.
- Kendi görsellerinizi `assets/` klasörüne koyup örneğin `background-image: url('assets/servis-1.jpg')` kullanabilirsiniz.

## Video ekleme

`script.js` dosyasının başındaki `MEDIA_VIDEO_URL` alanına:
- YouTube için `https://www.youtube.com/embed/VIDEO_ID`
- MP4 için `assets/servis-video.mp4` veya tam MP4 URL'si

yazın. YouTube normal izleme linki yerine embed linki kullanın.

## Kampanya yönetimi

“Kampanya ekle” penceresi kampanyaları tarayıcının `localStorage` alanında tutar. Bu, başlangıç/demo amaçlı bir istemci tarafı özelliktir:
- Kampanyalar yalnızca aynı tarayıcı ve cihazda görünür.
- Siteyi ziyaret eden herkesin ortak kampanyaları görmesi için bir backend, yönetim paneli ve veritabanı bağlantısı gerekir.
- Gerçek yönetim paneli için kimlik doğrulama eklenmelidir. Bu örnekteki buton herkese açıktır; üretim ortamında doğrudan kullanılmamalıdır.

## Yayına almadan önce

1. Gerçek servis bölgesi, açık adres, çalışma saatleri ve sosyal medya bağlantılarını ekleyin.
2. Marka logolarını kullanmadan önce kullanım izni ve servis statüsünü doğrulayın. Sayfadaki marka isimleri tek başına yetkili servis olduğunuzu ifade etmez.
3. Gerçek servis fotoğraflarıyla demo görselleri değiştirin.
4. Google Search Console, Analytics/Consent tercihi ve gerçek favicon ekleyin.
5. Telefon ve WhatsApp numarasını doğrulayın.
6. Kampanya alanını ortak kullanıma açacaksanız sunucu taraflı yönetim paneli kurun.
