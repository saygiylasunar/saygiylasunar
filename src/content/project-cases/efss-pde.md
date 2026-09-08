## Pixel dönüşümünü açık bir sınır haline getirmek

EFSS PDE, ComfyUI tarafında üretilen görseli kesin bir native pixel gridine deterministik biçimde dönüştürmeye odaklanan node sistemi.

Amaç “pixel-art filtresi” eklemek değil; hangi örnekleme ve palette mapping kararının sonucu nasıl değiştirdiğini açık hale getirmek.

## Pixel Canvas

Native hedef çözünürlük ile generation canvas arasında integer-aligned ilişki kuruluyor.

Bu, özellikle logical sampling yöntemlerinin her hedef hücre için tutarlı kaynak alanına sahip olmasını sağlıyor.

## Sampling yöntemleri

### Medoid

Hedef hücrenin ortalama rengine en yakın gerçek kaynak pixeli seçer. Yeni ortalama renk icat etmeden hücrenin genel yapısını temsil etmeye çalışır.

### Area

Hücre alanını ortalar. Fotoğrafik veya depth içeren bölgelerde kararlı olabilir; fakat kaynakta bulunmayan ara renkler oluşturabilir.

### Nearest

Tek bir kaynak örneği alır. Keskin ve hızlıdır, fakat ince detayları örnekleme konumuna bağlı olarak kaçırabilir.

## Palette ve guiding

Manuel palette contract veya otomatik palette çıkarımı ile mapping aynı hedef grid üzerinde çalışabilir.

Ardından conservative neighborhood cleanup ile indexed pixel çıktısı üzerinde kontrollü guiding uygulanır.

Bu yaklaşımın temel motivasyonu, downscale işlemini “küçült ve umut et” yerine **açıklanabilir bir pixel conversion pipeline** haline getirmek.
