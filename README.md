# AŞEAH Konsültasyon Asistanı – kurulum ve kullanım

Çocuk enfeksiyon hastalıkları konsültasyonlarını sesli dikteyle şablona yerleştiren, hasta bazında arşivleyen ve Word/PDF çıktı veren uygulama. **Hasta verisi hiçbir sunucuya gönderilmez; yalnız kullandığınız cihazın tarayıcısında saklanır.** GitHub Pages yalnız uygulamanın kodunu barındırır.

## 1. Yayınlama (GitHub Pages)
Aşı planlayıcıdaki adımların aynısı, **yeni bir depo** ile (ör. `konsultasyon`): zip'i açın → depoda "uploading an existing file" → klasörün **içindekileri** sürükleyin → Commit → Settings → Pages → Branch: main, /(root) → Save. Adres: `https://KULLANICIADI.github.io/konsultasyon/`

## 2. Verileriniz nerede, nasıl korunur?
- Kayıtlar, uygulamayı açtığınız **tarayıcı + cihaz** içinde (IndexedDB) durur. Başka tarayıcı/cihaz bunları görmez.
- Tarayıcının "site verilerini temizle" işlemi kayıtları siler. Bu yüzden:
  - **Düzenli yedek alın** (üst menü → Yedek al). Uygulama 7 günü geçen yedeksizlikte uyarır.
  - Yedeği kurumunuzun izin verdiği güvenli bir yere (şifreli USB, kurum ağ sürücüsü) koyun.
- **Şifreleme:** Ayarlar → "Arşivi parolayla şifrele". Kayıtlar ve yedek dosyaları AES-256 ile şifrelenir; 15 dakika işlem yapılmazsa arşiv kilitlenir. **Parola unutulursa kayıtlar kurtarılamaz.** Ortak kullanılan hastane bilgisayarlarında şifreleme önerilir.
- **Yeni cihaza geçiş:** eski cihazda Yedek al → yeni cihazda Ayarlar → Yedekten geri yükle (şifreliyse aynı parolayla açılır).
- **Kayıp yok ilkesi:** Silinen hasta/konsültasyon "Kaldırılanlar"a gider, geri alınabilir. Tamamlanmış not düzenlenirken eski sürüm sürüm geçmişinde saklanır. Yedek birleştirmede aynı kaydın eski hali geçmişe yazılır.

## 3. Sesli dikte
- Chrome, Edge veya Safari'de "Dikteyi başlat". Bölüm değiştirmek için cümleye bölüm adıyla başlayın: "öykü…", "fizik muayene…", "laboratuvar CRP 85 prokalsitonin 1 virgül 4…", "kültürler…", "tedavi meropenem 3. gün…". Sonra **Nota yerleştir**.
- Tarayıcı cihaz içi Türkçe tanımayı destekliyorsa ses cihazdan çıkmaz (dil paketi bir kez indirilir). Desteklemiyorsa ses tarayıcı üreticisinin sunucusunda yazıya çevrilebilir; uygulama ilk kullanımda bunu sorar. **Dikte ederken hasta adı ve kimlik numarası söylemeyin**; bunları hasta kartına elle girin.
- Alternatif: işletim sisteminin diktesi (Windows Win+H, macOS dikte, telefon klavyesi mikrofonu) ile metni kutuya yazdırıp "Nota yerleştir".

## 4. Kanıta dayalı değerlendirme (Claude ile)
1. "Vakayı Claude'a kopyala": ad, protokol ve TC numarası maskelenmiş, doğum tarihi yaşa çevrilmiş vaka özeti ve yanıt talimatı panoya kopyalanır. Göndermeden önce serbest metni kontrol edin.
2. Claude sohbetine yapıştırın. Claude güncel kılavuz ve PubMed kaynaklarını web aramasıyla doğrulayarak "Değerlendirme / Öneriler / Kaynaklar" başlıklarıyla yanıt verir.
3. "Claude yanıtını içe aktar" → "Ayrıştır": değerlendirme, ayırıcı tanılar, tedavi seçenekleri, öneriler ve kaynaklar madde madde, tümü işaretli gelir. Uygun olmayanların işaretini kaldırın, "Seçilenleri nota ekle". Her kaynağı tıklayıp kontrol edin; nihai karar ve doz sorumluluğu hekimdedir.

### Öneri seçenekleri (1.1)
Not metninden tanınan konular için ayırıcı tanı, tetkik, tedavi, izlem ve enfeksiyon kontrolü maddeleri listelenir. İşaretlenen madde nota girer, işaret kaldırılınca çıkar; nottaki madde düzenlenebilir veya × ile silinir. mg/kg dozlar yalnız kılavuz metninden doğrulanan seçeneklerde verilir ve ağırlığa göre hesaplanır; diğerlerinde "dozu kaynaktan doğrulayın" yazar.

### Ek notlar / Rekonsültasyon (1.1)
Kültür sonucu çıktığında veya klinik değiştiğinde konsültasyonun altındaki "+ Ek not ekle" ile tarihli not yazın veya dikte edin. Tamamlanmış nota da eklenir; ana not değişmez. Laboratuvar değerleri eğilim tablosuna girer; her ek not ayrı Word/PDF olarak alınabilir.

## 5. Kaynaklar
- **Doğrulanmış rehber kütüphanesi:** not metnindeki konulara (febril nötropeni, kateter, menenjit, İYE, osteomiyelit, dirençli gram-negatif vb.) göre otomatik önerilir; tek tıkla nota eklenir.
- **PubMed araması:** yalnız arama kelimeleri gönderilir. Hastane ağı NCBI'a erişimi engellerse uygulama PubMed'i yeni sekmede açar; bulduğunuz PMID'yi "Kaynağı el ile ekle"ye yapıştırın.
- UpToDate, Red Book, IDSA, ECIL, SB, WHO, CDC düğmeleri ilgili sitede arama açar (UpToDate için kurum erişiminiz gerekir).

## 6. Çıktı
- **Word (.docx):** çevrimdışı oluşturulur, kurumsal başlık ve tıklanabilir kaynaklarla.
- **PDF:** "PDF / Yazdır" → hedef "PDF olarak kaydet".

## 7. Güncelleme
`index.html` içindeki `APP_VERSION` ile `sw.js` içindeki `VERSION` değerini aynı yeni numara yapın, `CHANGELOG.md`'ye not düşün, dosyaları depoya yükleyin. Kullanıcılar "Yeni sürüm hazır – Kaydet ve yenile" bildirimini görür; veriler etkilenmez.

## 8. Yasal not
Uygulama hekim karar desteği ve kayıt aracıdır. Kişisel sağlık verisi KVKK kapsamında özel nitelikli veridir: kurumunuzun bilgi güvenliği politikasına uyun, şifrelemeyi açın, yedekleri güvenli saklayın, kimlik bilgilerini harici servislere (dikte servisi, yapay zekâ) göndermeyin. Herkese açık dağıtım öncesi tıbbi cihaz yazılımı mevzuatı açısından değerlendirme önerilir.
