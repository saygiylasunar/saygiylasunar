Generatif görsel üretiminde sonuç dosyası çoğu araçta sürecin son noktası gibi davranıyor. Oysa PNG veya başka bir çıktı çoğu zaman geride önemli mühendislik izleri bırakıyor: kullanılan workflow, prompt, checkpoint, LoRA, VAE, sampler veya scheduler bilgileri.

**ReversenUI** bu dosyayı yalnızca görüntü olarak değil, yeniden okunabilecek bir mühendislik artifaktı olarak ele alma fikrinden çıktı.

## Inspector

İlk katman dosyanın kendisini okumak.

ComfyUI çıktılarında bulunabilen `workflow` ve API `prompt` metadata alanlarını çözümleyerek node tipleri, model isimleri, LoRA’lar, VAE’ler, sampler ve scheduler gibi parçaları tekrar görünür hale getiriyorum.

Buradaki amaç “metadata gösteren başka bir panel” yapmak değil.

Asıl amaç, bir üretimin **hangi bileşenlere bağımlı olduğunu anlayabilmek**.

## Prompt Architect

Prompt tarafında tek bir modele göre sabitlenmiş form yaklaşımını istemedim.

FLUX ve SDXL gibi farklı model ailelerinin conditioning davranışları ve metin encoder yapıları aynı değil. Bu yüzden Prompt Architect profil tabanlı davranıyor.

Temel fikir:

- model ailesini bil,
- semantic parçaları düzenli katmanlarda tut,
- priority ile numeric emphasis’i birbirinden ayır,
- model destekliyorsa negative promptu ayrı üret.

Bu, “prompt yazma kutusu”ndan ziyade promptun yapısını açıklanabilir hale getiren bir editör yaklaşımı.

## Yerel araçları tek uygulamaya gömmek yerine workspace olarak görmek

ReversenUI’nin masaüstü tarafında ComfyUI, Jupyter veya TensorBoard gibi araçları kendi çekirdeğinin parçasıymış gibi yeniden yazmak yerine bağımsız workspace’ler olarak ele alıyorum.

Electron shell bunları sekmelerde veya bölünmüş layout’larda barındırabiliyor.

## Local-first neden mimari karar?

Local-first benim için yalnızca gizlilik etiketi değil.

AI araçlarının büyük kısmı zaten localhost servisleri, yerel modeller, büyük dosyalar, GPU’ya bağlı process’ler ve kişiye özel model klasörleri üzerinden çalışıyor.

Bu yüzden ReversenUI’nin görevi buluta yeni bir bağımlılık eklemek değil, zaten yerelde yaşayan araçlar arasında **anlaşılır bir mühendislik yüzeyi** oluşturmak.
