Pixel art üretiminde küçültme işlemi çoğu zaman son adımdaki basit bir `resize()` çağrısı gibi ele alınıyor. Benim ilgilendiğim problem ise tam tersine, **hangi bilginin hangi örnekleme yöntemiyle korunacağına karar veren kontrollü bir dönüşüm**.

Bir görseli yüksek çözünürlükten 64×64 gibi kesin bir hedef gridine indirdiğimizde tek bir “doğru” yöntem yok. Çünkü keskin kontur, yumuşak ışık geçişi, ince çizgi ve küçük kontrast detayı aynı biçimde davranmıyor.

## Nearest neden bazı yerlerde iyi?

Nearest-neighbor yeni renk üretmez. Kaynaktan tek bir örneği seçer. Bu yüzden:

- sert konturları canlı tutabilir,
- palette dışına çıkmaz,
- pixel-art hissini bozacak blur üretmez.

Ama aynı özellik ince bir detayı tamamen kaçırmasına da neden olabilir. Hedef hücrenin yanlış noktasından örnek alınırsa küçük bir göz, çizgi veya highlight ortadan kaybolabilir.

## Area neden başka bir problemi çözüyor?

Area yaklaşımı hedef hücreye düşen alanı ortalamaya daha yakındır. Fotoğrafik veya depth içeren bölgelerde daha kararlı sonuç verir. Fakat ortalama, kaynakta hiç bulunmayan ara renkler oluşturabilir.

Pixel art için bu bazen yapısal kayıp demektir: kenar hâlâ oradadır ama keskinliği ve palette ilişkisi değişmiştir.

## Medoid fikri

EFSS PDE tarafında kullandığım yaklaşımın önemli parçalarından biri **medoid sampling**.

Mantık basit: hedef hücrenin ortalama rengini doğrudan yeni pixel yapmak yerine, o ortalamaya en yakın **gerçek kaynak pixelini** seç.

Böylece iki şeyi aynı anda korumaya çalışıyoruz:

1. Hücrenin genel görsel temsilini.
2. Kaynakta gerçekten var olan renklerden birini.

Bu, ortalamanın kararlılığı ile nearest’ın “gerçek pixel seçme” davranışı arasında daha kontrollü bir ara çözüm sağlıyor.

## Problemi tersine tile generation gibi düşünmek

Upscale workflow’larında görüntünün tile’lara bölünüp her parçanın kontrollü biçimde yeniden üretilmesi yaygın bir fikir. Downscale tarafında bunun tersini düşünmek faydalı:

> Her hedef pixel, kaynak görüntünün kendisine ait küçük bir bölgesinden sorumlu.

Dolayısıyla soru “bu resmi nasıl küçültürüm?” olmaktan çıkıyor.

Asıl soru:

> Bu hedef hücrenin temsilcisi hangi kaynak bilgisinden seçilmeli?

Kontur ağırlıklı hücre ile blur/depth ağırlıklı hücre aynı sampling politikasını kullanmak zorunda değil. Uzun vadede ilginç alanlardan biri de **lokal yapıya göre sampling yöntemini değiştiren hibrit mapping**.

Bu yüzden EFSS PDE’yi bir filtre koleksiyonu olarak değil, pixel dönüşüm sınırını açık ve deterministik hale getiren bir sistem olarak ele alıyorum.
