## Bir web sitesi değil, süreklilik problemi

Beyaz Önlüklüler çalışmasını yalnızca yeni bir arayüz üretimi olarak ele almadım.

Kurumsal web, içerik yönetimi, DNS, e-posta sürekliliği ve operasyon ihtiyaçları birbirine bağlıydı. Dolayısıyla çözümün de aynı şekilde **tek bir dijital sistem** gibi düşünülmesi gerekiyordu.

## Yaklaşım

Çalışma birkaç katmana ayrıldı:

- kamusal web yüzeyi,
- içerik mimarisi,
- içerik yönetim akışı,
- DNS ve alan adı sürekliliği,
- Google Workspace / e-posta operasyonu,
- Netlify tabanlı yayın süreci.

Astro ve Sanity gibi araçlar bu yapıda amaç değil; kurumsal içeriği daha sürdürülebilir biçimde taşıyan parçalar.

## Tasarım ilkesi

STK ve kurumsal yapılarda gösterişli arayüz tek başına başarı ölçütü değil.

Önemli olan:

- bilgiyi bulmanın kolay olması,
- içerik güncellemenin belirli kişilere bağımlı kalmaması,
- iletişim altyapısının kopmaması,
- teknik yapının devredilebilir olması.

Bu yüzden proje, görsel yenilemeden çok **dijital operasyonun sadeleştirilmesi** olarak konumlanıyor.
