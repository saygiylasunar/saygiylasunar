Bir font projesinde en kolay tuzak, her harfi kendi başına “güzel” hale getirmeye çalışmak.

Ben Saygıyla Sunar Font tarafında problemi farklı kuruyorum: **harflerin ortak bir geometrik dil içinde nasıl davranması gerektiğini** önce tanımlamak.

## Harf değil motif

Birçok glif aynı temel hareketleri paylaşır:

- yuvarlak gövdeler,
- dikey taşıyıcılar,
- çapraz bağlantılar,
- terminal açıları,
- iç boşluk oranları.

Bu parçaları tekrar eden motifler olarak ele aldığımızda `a`, `e`, `o` veya `0` birbirinden bağımsız çizimler olmaktan çıkar.

Aynı sistemin farklı kombinasyonları haline gelir.

## Monospace yalnızca eş genişlik değildir

Bir fontun terminal fontu gibi eş genişlikli olması, her karaktere aynı kutuyu vermekten ibaret değil.

Asıl problem şu:

> Çok farklı görsel yoğunluğa sahip glifler aynı advance width içinde dengeli görünebiliyor mu?

`i` ile `m`, `1` ile `0` aynı hücreye sığar; fakat optik ağırlıkları aynı değildir.

Bu yüzden programatik sistemin yalnızca ölçüyü değil, stroke dağılımını ve iç boşlukları da kontrol etmesi gerekir.

## Parametrelerle düşünmek

Glifleri programatik geometriyle üretmenin avantajı, tasarım kararlarını parametre haline getirebilmek.

Örneğin:

- x-height,
- cap height,
- stroke,
- width,
- corner radius,
- slant,
- terminal angle,
- overshoot,
- aperture,
- counter oranı.

Bir parametre değiştiğinde tek bir harfi değil, sistemin tamamını test edebiliriz.

## Hata da sistem hatası olur

Bu yaklaşımın güzel yanı şu: küçük `a` garip görünüyorsa soru yalnızca “a harfini nasıl düzeltirim?” değildir.

Daha yararlı soru:

> Bu harfte bozulmaya neden olan ortak motif veya kural hangisi?

Böylece düzeltme başka glifleri de iyileştirebilir.

Font mühendisliği tarafında benim ilgimi çeken yer tam olarak burası: tipografiyi çizim koleksiyonu olmaktan çıkarıp **tekrar üretilebilir bir görsel sistem** haline getirmek.
