## Harf koleksiyonu değil, ortak geometri

Saygıyla Sunar Font çalışmasında amaç tek tek hoş görünen glifler üretmek değil; aynı ölçü, terminal davranışı ve motif ailesi içinde çalışan bir yazı sistemi kurmak.

Programatik geometri yaklaşımı sayesinde stroke, genişlik, yükseklik, radius, overshoot ve benzeri kararlar tekrar kullanılabilir parametreler halinde tutulabiliyor.

## Monospace problemi

Eş genişlikli bir fontta her karakter aynı advance width değerini paylaşabilir; fakat görsel yoğunlukları aynı değildir.

Bu nedenle yalnızca kutuyu eşitlemek yeterli olmaz. İç boşluk, stroke dağılımı ve optik denge de sistematik biçimde kontrol edilmelidir.

## Motif tabanlı tasarım

Yuvarlak gövde, dik taşıyıcı, çapraz parça, açık aperture veya terminal açısı gibi tekrar eden parçalar ortak motifler olarak ele alınıyor.

Bir glif bozulduğunda düzeltilecek şey yalnızca o harf değil; bozulmaya neden olan ortak kural olabilir.

Bu yaklaşım fontu tek seferlik çizimlerden çıkarıp **tekrar üretilebilir bir tasarım sistemi** haline getiriyor.
