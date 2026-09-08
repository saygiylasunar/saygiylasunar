## Inspect. Understand. Compose. Process.

ReversenUI, generatif görsel çıktısını yalnızca bir resim dosyası olarak değil, yeniden incelenebilir bir **AI engineering artifact** olarak ele alan local-first bir çalışma alanı.

## Inspector

ComfyUI tarafından gömülebilen workflow ve API prompt metadata alanları okunarak node tipleri, model/checkpoint isimleri, LoRA, VAE, text encoder, sampler, scheduler ve prompt bilgileri tekrar görünür hale getiriliyor.

Amaç ham metadata dökmek değil; üretimin hangi bileşenlere bağlı olduğunu anlaşılır biçimde göstermek.

## Prompt Architect

Prompt sistemi tek bir model ailesine sabitlenmiyor.

FLUX ve SDXL gibi farklı profiller kendi encoder ve conditioning özellikleriyle tanımlanıyor. Semantic parçalar, priority ve numeric emphasis ayrı katmanlarda tutuluyor.

## Desktop workbench

Electron shell içinde ComfyUI, Jupyter ve TensorBoard gibi yerel araçlar bağımsız workspace’ler olarak barındırılabiliyor.

Kaynak tüketimi için background workspace hibernation yaklaşımı kullanılıyor: pasif renderer yalnızca gizlenmek yerine gerektiğinde yok edilip persistent session üzerinden yeniden oluşturulabiliyor.

## Temel ilkeler

- local-first,
- non-destructive,
- extensible,
- transparent,
- resource-aware.

ReversenUI’nin mimari sınırı herhangi bir tek AI aracına bağlanmak değil; yerel AI araçları arasında anlaşılır bir mühendislik yüzeyi oluşturmak.
