export const oggNotesMeta = {
  title: 'ÖGG Çalışma Notları',
  subtitle: 'Silahlı özel güvenlik temel eğitiminden düzenlenmiş kişisel ders notları',
  updatedAt: '2026-09-30',
  notice:
    'Bu içerik kişisel çalışma notudur. Mevzuat, sınav uygulaması ve kurum prosedürleri değişebilir; resmî işlem ve güncel uygulamada EGM Özel Güvenlik Denetleme Başkanlığı ile yürürlükteki mevzuat esas alınmalıdır.',
}

export const oggNoteTopics = [
  {
    id: 'ozel-guvenlik-hukuku',
    no: '01',
    course: 'Özel Güvenlik Hukuku ve Kişi Hakları',
    short: '5188, görev-yetki sınırları, eğitim, kimlik ve temel hukuki çerçeve.',
    tag: 'Hukuk',
    tone: 'law',
    keyline: 'ÖGG, kamu güvenliğini tamamlayıcı mahiyette görev yapar.',
    sections: [
      {
        title: 'Hukuki çerçeve',
        bullets: [
          'Türkiye’de özel güvenlik hizmetlerinin temel çerçevesi 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve ilgili yönetmeliktir.',
          'Özel güvenlik teşkilatı genel kolluk değildir; polis, jandarma ve sahil güvenlikten farklı bir statüde görev yapar.',
          'Görev ve yetkiler kural olarak görev alanı ve görev süresiyle bağlantılıdır.',
        ],
      },
      {
        title: 'İzinler ve organizasyon',
        bullets: [
          'Özel güvenlik uygulamaları; kişi koruma, özel güvenlik birimi, özel güvenlik şirketi, eğitim kurumu ve alarm izleme merkezi gibi farklı yapılarda yürütülebilir.',
          'Komisyon; koruma ve güvenlik hizmetinin kapsamı, personel, silah/teçhizat ve görev alanı gibi başlıklarda karar verir.',
          'Zorunlu hâllerde görev alanının genişletilmesi veya daraltılması ile ek güvenlik önlemleri farklı idari mekanizmalardır; sınavda birbirine karıştırılmamalıdır.',
        ],
      },
      {
        title: 'ÖGG’nin temel yetkileri',
        bullets: [
          'Duyarlı kapı, dedektör ve X-Ray gibi güvenlik sistemleriyle kontrol yapma.',
          'Kanunda belirtilen etkinlik ve durumlarda kimlik sorma.',
          'Suçüstü hâlinde CMK 90 çerçevesinde yakalama; olay yeri ve delilleri koruma.',
          'Kanuni şartlar oluştuğunda emanete alma, yardım amacıyla yakalama ve zor kullanma yetkileri.',
          'Yangın, deprem ve imdat istenmesi gibi durumlarda görev alanındaki işyeri veya konutlara girme.',
        ],
      },
      {
        title: 'Zor kullanma ve emir',
        bullets: [
          'Zor kullanma; zorunluluk, kanunilik, ölçülülük ve direnmenin niteliğiyle bağlantılı değerlendirilir.',
          'Konusu suç teşkil eden emir yerine getirilmez.',
          'Genel kollukla birlikte görev yapılırken görevle ilgili koordinasyon ve emir-komuta ilişkisi ayrıca önem taşır.',
        ],
      },
      {
        title: 'Eğitim, kimlik ve çalışma',
        bullets: [
          'Temel eğitim ve yenileme eğitimi ayrı süreçlerdir; silahlı eğitimde silah bilgisi ve atış bölümü ayrıca bulunur.',
          'Özel güvenlik kimlik kartı valilik tarafından düzenlenir ve süreli olarak yenilenir.',
          'ÖGG, kanunda belirtilen koruma ve güvenlik hizmetleri dışında çalıştırılamaz.',
        ],
      },
    ],
    exam: [
      '5188 → kamu güvenliğini tamamlayıcı mahiyet',
      'Yetki → görev alanı + görev zamanı',
      'CMK 90 → suçüstü hâlinde yakalama',
      'Konusu suç olan emir → yerine getirilmez',
    ],
  },
  {
    id: 'guvenlik-tedbirleri',
    no: '02',
    course: 'Güvenlik Tedbirleri',
    short: 'Nokta ve devriye hizmetleri, olay yeri, bulgu-delil ayrımı ve önleyici güvenlik.',
    tag: 'Saha',
    tone: 'security',
    keyline: 'Önleyici güvenlikte amaç, olayı mümkünse gerçekleşmeden fark etmek ve riski azaltmaktır.',
    sections: [
      {
        title: 'Nokta hizmeti',
        bullets: [
          'Nokta; kamu düzeninin korunması, suçların önlenmesi ve belirli bir yerin güvenliğinin sağlanması için sınırları tanımlanmış görev yeridir.',
          'Nokta görevlisi, görev yerini usulüne uygun devir teslim yapılmadan terk etmemelidir.',
          'Görev alanının sınırları, sorumluluğun ve müdahalenin kapsamını belirler.',
        ],
      },
      {
        title: 'Devriye',
        bullets: [
          'Devriye; belirli bir güzergâh ve zaman planı içerisinde çevreyi gözlemek, riskleri fark etmek ve gerektiğinde müdahale/bildirim yapmak için yürütülür.',
          'Yaya, araçlı, bisikletli veya farklı araçlarla yapılan devriye türleri bulunabilir.',
          'Devriyenin önleyici, koruyucu, yardım ve olay sonrası adli nitelikli görevleri birbirinden ayrılır.',
        ],
      },
      {
        title: 'Eşgal, bulgu ve delil',
        bullets: [
          'Eşgal; kişi veya malın tanıtılmasına yarayan ayırt edici bilgilerin sistemli şekilde aktarılmasıdır.',
          'Bulgu, olay yeri–fail–mağdur ilişkisini kurmaya yardımcı materyaldir.',
          'Her delil bir bulgu olabilir; ancak her bulgu, hukuken delil niteliği kazanmış değildir.',
          'Biyolojik, kimyasal, fiziksel ve iz niteliğindeki bulgular olay yeri incelemesinde farklı kategorilerde değerlendirilir.',
        ],
      },
      {
        title: 'Olay yerinde temel yaklaşım',
        bullets: [
          'Olay yerinin doğal hâlini mümkün olduğunca korumak esastır.',
          'Yetkisiz temas, taşıma ve temizlik delilin bozulmasına yol açabilir.',
          'ÖGG’nin rolü; güvenliği sağlamak, alanı korumak, genel kolluğu bilgilendirmek ve teslim sürecini desteklemektir.',
        ],
      },
    ],
    exam: [
      'Nokta → sınırları belirlenmiş sabit görev alanı',
      'Devriye → önleyici / koruyucu / yardım / adli amaçlar',
      'Her delil bulgudur; her bulgu delil değildir',
      'Olay yeri → koru, bildir, teslim et',
    ],
  },
  {
    id: 'temel-ilk-yardim',
    no: '03',
    course: 'Temel İlk Yardım',
    short: 'Olay yeri güvenliği, bilinç-solunum kontrolü, temel yaşam desteği ve AED farkındalığı.',
    tag: 'Sağlık',
    tone: 'aid',
    keyline: 'İlk yardımda önce güvenlik, sonra değerlendirme ve profesyonel yardım çağrısı gelir.',
    sections: [
      {
        title: 'Öncelik sırası',
        bullets: [
          'Kendinin, yaralının ve çevrenin güvenliğini değerlendir.',
          '112 Acil’i veya uygun profesyonel yardım hattını mümkün olan en erken aşamada devreye sok.',
          'Amaç; yaşamı korumak, kötüleşmeyi önlemek ve profesyonel yardım gelene kadar temel desteği sürdürmektir.',
        ],
      },
      {
        title: 'Bilinç yoksa',
        bullets: [
          'Hava yolu, solunum ve dolaşım bulguları temel değerlendirme mantığının merkezindedir.',
          'Solunum değerlendirmesi eğitimlerde “bak–dinle–hisset” yaklaşımıyla öğretilir.',
          'Temel yaşam desteğinde yetişkin için yaygın eğitim oranı 30 göğüs basısı + 2 soluktur; uygulama, güncel ilk yardım eğitimi çerçevesinde yapılmalıdır.',
        ],
      },
      {
        title: 'AED / OED',
        bullets: [
          'Otomatik eksternal defibrilatör, cihazın sesli/görsel talimatları izlenerek kullanılır.',
          'Pedlerin çıplak ve mümkün olduğunca kuru cilde doğru konumda yapışması gerekir.',
          'Şok analizi ve uygulaması sırasında hastaya temas edilmemesi cihazın temel güvenlik kuralıdır.',
        ],
      },
      {
        title: 'Pozisyonlar',
        bullets: [
          'Bilinci kapalı ama normal soluyan kişide, uygun şartlarda kurtarma pozisyonu düşünülebilir.',
          '“Şok pozisyonu” gibi uygulamalar her yaralıya otomatik uygulanmaz; travma türü ve güncel ilk yardım protokolü dikkate alınmalıdır.',
        ],
      },
    ],
    exam: [
      'Önce olay yeri güvenliği',
      'Bilinç–hava yolu–solunum değerlendirmesi',
      '112 / profesyonel yardım erken çağrılır',
      'AED → cihaz talimatını izle, analiz/şok sırasında temas etme',
    ],
  },
  {
    id: 'guvenlik-sistemleri',
    no: '04',
    course: 'Güvenlik Sistem ve Cihazları',
    short: 'Fiziki-elektronik sistemler, sensör mantığı, dedektörler ve geçiş kontrol sistemleri.',
    tag: 'Teknik',
    tone: 'systems',
    keyline: 'Elektronik güvenlik zinciri: algıla → filtrele → değerlendir → uyar/karar üret.',
    sections: [
      {
        title: 'Fiziki ve elektronik sistemler',
        bullets: [
          'Fiziki güvenlik sistemleri çoğunlukla insan kontrolü ve operatör değerlendirmesiyle anlam kazanır.',
          'Elektronik sistemler; sensör, kontrol paneli, filtreleme ve alarm/karar mantığıyla çalışır.',
          'Teknik sistemler güvenlik personelinin yerini tamamen almak için değil, görüş ve karar kapasitesini desteklemek için kullanılır.',
        ],
      },
      {
        title: 'Dedektörler',
        bullets: [
          'El tipi ve kapı tipi metal dedektörleri farklı kontrol senaryolarında kullanılır.',
          'Alarm alınması tek başına “yasak madde bulundu” anlamına gelmez; alarmın kaynağı usulüne uygun şekilde açıklığa kavuşturulur.',
          'Cihazların üretici kullanım talimatı, test ve kalibrasyon gereklilikleri önemlidir.',
        ],
      },
      {
        title: 'Geçiş ve kimlik sistemleri',
        bullets: [
          'Kartlı geçiş sistemleri, biyometrik sistemler ve kapalı devre kimlik/izleme sistemleri erişim kontrolünün temel araçlarındandır.',
          'Yetkilendirme, kayıt tutma ve kişisel veri güvenliği birlikte düşünülmelidir.',
        ],
      },
    ],
    exam: [
      'Sensör → filtre → değerlendirme → karar/alarm',
      'El tipi / kapı tipi metal dedektörü',
      'Kartlı geçiş / biyometri / CCTV',
      'Alarm → kaynağı doğrula',
    ],
  },
  {
    id: 'silah-bilgisi',
    no: '05',
    course: 'Silah Bilgisi ve Atış',
    short: 'Silah emniyeti, temel parça adları, mühimmat bileşenleri ve teorik sınıflandırmalar.',
    tag: 'Silahlı',
    tone: 'weapons',
    keyline: 'Silah eğitiminde ana eksen emniyet, sorumluluk ve kontrollü eğitim ortamıdır.',
    sections: [
      {
        title: 'Temel sınıflandırma',
        bullets: [
          'Yarı otomatik sistemlerde ilk dolduruştan sonra her tetik hareketinde tek atım gerçekleşir.',
          'Otomatik sistemlerde tetik mekanizması basılı tutulduğu sürece sistem, tasarımına göre ardışık atış yapabilir.',
          'Bu sınıflandırma teorik bilgidir; uygulama yalnızca yetkili eğitim/poligon ortamında yapılmalıdır.',
        ],
      },
      {
        title: 'Fişek ve şarjör',
        bullets: [
          'Bir fişek temel olarak kapsül, barut, çekirdek ve kovandan oluşur.',
          'Şarjör; gövde/tüp, yay, gerdel ve taban/kapak gibi parçalardan oluşan besleme sistemidir.',
          'Parça isimlerini bilmek sınav sorularında mekanizma mantığını anlamayı kolaylaştırır.',
        ],
      },
      {
        title: 'Tabanca terminolojisi',
        bullets: [
          'Alt gövdede kabze, tetik, tetik korkuluğu ve şarjör mandalı gibi parçalar bulunur.',
          'Üst sürgüde gez, arpacık, kovan atma penceresi ve iğne/tırnak mekanizmasıyla ilgili parçalar bulunur.',
          'Namlu ve geri getirme sistemi, atış mekanizmasının temel parçaları arasındadır.',
        ],
      },
      {
        title: 'Bakım ve emniyet',
        bullets: [
          'Ders notlarında silahın atıştan sonra temizlenmesi özellikle vurgulanmıştır.',
          'Bakım, arıza giderme, sökme-takma ve atış uygulamaları yalnızca eğitimci gözetiminde ve üretici prosedürlerine uygun yürütülmelidir.',
          'Görev silahı; görev, ruhsat/izin ve kurum prosedürleri çerçevesinde taşınır ve muhafaza edilir.',
        ],
      },
    ],
    exam: [
      'Fişek → kapsül + barut + çekirdek + kovan',
      'Yarı otomatik → her tetik hareketinde tek atım',
      'Gez + arpacık → nişan hattı terminolojisi',
      'Ana yaklaşım → emniyet + yetkili eğitim + prosedür',
    ],
  },
  {
    id: 'kalabalik-yonetimi',
    no: '06',
    course: 'Kalabalık Yönetimi',
    short: 'Grup-kalabalık ayrımı, kalabalık psikolojisi, panik ve toplumsal olaylarda güvenlik yaklaşımı.',
    tag: 'Topluluk',
    tone: 'crowd',
    keyline: 'Kalabalık yönetiminde amaç gerilimi büyütmek değil, güvenliği ve kontrollü tahliyeyi korumaktır.',
    sections: [
      {
        title: 'Grup ve kalabalık',
        bullets: [
          'Grup; amaç/fikir birliği, etkileşim, süreklilik ve çoğu zaman liderlik yapısı gösterir.',
          'Kalabalık; daha geçici, gevşek örgütlü ve üyelerin birbirini tanımadığı insan topluluğudur.',
          'Organize/organize olmayan ve aktif/pasif ayrımları sınavlarda sık kullanılan sınıflandırmalardır.',
        ],
      },
      {
        title: 'Kalabalık psikolojisi',
        bullets: [
          'Telkine açıklık, taklit, yayılma, duygusallık ve anonimlik gibi etkiler kalabalık davranışını değiştirebilir.',
          'Panikte bilgi eksikliği, çıkışların tıkanması, ani tehlike algısı ve taklit davranışı riski büyütebilir.',
          'Açık, güvenilir ve tek merkezli iletişim panik yönetiminde kritik unsurdur.',
        ],
      },
      {
        title: 'Görüşme ve gerilim düşürme',
        bullets: [
          'Kişisel mesafe, açık beden dili ve kaçış/geri çekilme alanı güvenlik görevlisinin riskini etkiler.',
          'Sözlü temas mümkün olduğunca sakin, anlaşılır ve tırmandırmayan biçimde yürütülmelidir.',
          'Müdahale, kanuni yetki ve ölçülülük çerçevesinde değerlendirilir.',
        ],
      },
      {
        title: '2911 çerçevesi',
        bullets: [
          'Toplantı ve gösteri yürüyüşü hakkı Anayasa ve 2911 sayılı Kanun çerçevesinde düzenlenir.',
          'Yer, zaman, bildirim/organizasyon ve kamu düzenine ilişkin ayrıntılar güncel mevzuattan kontrol edilmelidir.',
        ],
      },
    ],
    exam: [
      'Grup → süreklilik + etkileşim + amaç birliği',
      'Kalabalık → geçicilik + düşük örgütlenme',
      'Panik → bilgi, çıkış ve iletişim yönetimi',
      'Müdahale → kanunilik + ölçülülük',
    ],
  },
  {
    id: 'kisi-koruma',
    no: '07',
    course: 'Kişi Koruma',
    short: 'Koruma prensipleri, risk analizi, koruma halkaları ve öncü planlama.',
    tag: 'VIP',
    tone: 'protection',
    keyline: 'Kişi korumada temel yaklaşım; riskleri önceden görmek, rutini azaltmak ve güvenli alternatif plan oluşturmaktır.',
    sections: [
      {
        title: 'Koruma türleri',
        bullets: [
          'Birebir/refakat koruması, yakın koruma, konut-işyeri koruması ve çağrı üzerine koruma gibi farklı uygulama biçimleri bulunur.',
          'Koruma kararı ve uygulamanın kapsamı idari/adli karara ve güncel mevzuata göre değişebilir.',
        ],
      },
      {
        title: 'Koruma prensipleri',
        bullets: [
          'Tam güvenlik mümkün değildir; risk sürekli yeniden değerlendirilir.',
          'Rutini azaltmak, mahremiyeti korumak ve plan bilgisini ihtiyaç kadar paylaşmak temel prensiplerdendir.',
          'Korunan kişinin alışkanlıkları, güzergâhları ve çevresel riskleri planlamada dikkate alınır.',
        ],
      },
      {
        title: 'Koruma halkaları',
        bullets: [
          'İç, orta ve dış halka kavramları koruma katmanlarını anlatmak için kullanılır.',
          'Her katmanın görevi; tehdidi mümkün olduğunca erken fark etmek ve korunan kişiye ulaşmadan önce kontrol etmektir.',
        ],
      },
      {
        title: 'Öncü çalışma ve güzergâh',
        bullets: [
          'Etkinlik/güzergâh önceden değerlendirilir; giriş-çıkışlar, güvenli alanlar ve alternatif güzergâhlar planlanır.',
          'Darboğazlar ve hareketin yavaşladığı noktalar risk analizi açısından önemlidir.',
          'Acil durumda kullanılacak alternatif planın önceden belirlenmiş olması karar süresini kısaltır.',
        ],
      },
    ],
    exam: [
      'Tam koruma yok → sürekli risk değerlendirmesi',
      'Rutinden kaçınma',
      'İç / orta / dış koruma halkası',
      'Öncü çalışma → risk + güzergâh + alternatif plan',
    ],
  },
  {
    id: 'yangin-guvenligi',
    no: '08',
    course: 'Yangın Güvenliği ve Tabii Afet',
    short: 'Yanma üçgeni, yangın sınıfları, algılama-söndürme sistemleri ve acil durum ekipleri.',
    tag: 'Yangın',
    tone: 'fire',
    keyline: 'Yangınla mücadelede doğru sınıflandırma, doğru söndürücü ve güvenli tahliye birbirinden ayrılamaz.',
    sections: [
      {
        title: 'Yanma ve yangın',
        bullets: [
          'Yanma; yanıcı madde, ısı ve oksijenin uygun şartlarda birleşmesiyle gerçekleşen kimyasal süreçtir.',
          'Yangın, kontrol dışına çıkmış yanma olayıdır.',
          'Yangın güvenliğinde önleme, erken algılama, bildirim, tahliye ve uygun söndürme birlikte ele alınır.',
        ],
      },
      {
        title: 'Yangın sınıfları',
        bullets: [
          'TS EN 2 sınıflandırmasında A: katı, B: sıvı/sıvılaşabilen katı, C: gaz, D: metal, F: pişirme yağları yangınlarıdır.',
          'Elektrik, güncel TS EN 2 sınıflandırmasında ayrı bir “E yangın sınıfı” değildir; elektrik enerjisi kesilmeden müdahale özel risk taşır.',
          'Söndürücü seçimi; yanan madde sınıfına, ortama ve ekipmanın uygunluğuna göre yapılır.',
        ],
      },
      {
        title: 'Acil durum ekipleri',
        bullets: [
          'İşyerlerinde acil durum organizasyonunda söndürme, kurtarma, koruma ve ilk yardım rolleri bulunabilir.',
          'Görev dağılımı ve ekip sayıları işyerinin risk sınıfı, çalışan sayısı ve yürürlükteki iş sağlığı-güvenliği düzenlemelerine göre planlanır.',
        ],
      },
      {
        title: 'Algılama ve söndürme',
        bullets: [
          'Duman, ısı ve alev algılama sistemleri yangının erken fark edilmesine yardımcı olur.',
          'Sprinkler, köpüklü, gazlı ve kuru kimyevi tozlu söndürme sistemleri farklı riskler için tasarlanır.',
          'Yangın söndürücülerin periyodik kontrol ve bakımı, ilgili standart ve üretici talimatlarına göre yapılır.',
        ],
      },
    ],
    exam: [
      'Yanma üçgeni → yakıt + ısı + oksijen',
      'A / B / C / D / F sınıfları',
      'Elektrik → ayrı E sınıfı değil; enerjili ekipmanda özel risk',
      'Söndürme + kurtarma + koruma + ilk yardım',
    ],
  },
  {
    id: 'genel-kolluk-iliskileri',
    no: '09',
    course: 'Genel Kolluklar İlişkileri',
    short: 'Genel kolluk–özel güvenlik koordinasyonu, KAAN, ÖGNET, PATBİS ve ÖZGE.',
    tag: 'Koordinasyon',
    tone: 'law-enforcement',
    keyline: 'ÖGG ile genel kolluk arasındaki ilişki; bildirim, koordinasyon, olay yeri ve teslim süreçleri etrafında kurulur.',
    sections: [
      {
        title: 'Genel kolluk',
        bullets: [
          'Genel kolluk kavramı; polis, jandarma ve sahil güvenliği kapsar.',
          'Özel güvenlik görevlileri, yetkileri çerçevesinde olayları genel kolluğa bildirir ve teslim/koordinasyon süreçlerini destekler.',
        ],
      },
      {
        title: 'KAAN',
        bullets: [
          'KAAN, “Genel Kolluk–Özel Güvenlik İşbirliği ve Entegrasyonu” uygulamasıdır.',
          'Amaç; iletişimi hızlandırmak, olayları erken bildirmek, suç önleme kapasitesini ve olay sonrası koordinasyonu güçlendirmektir.',
        ],
      },
      {
        title: 'Dijital sistemler ve projeler',
        bullets: [
          'ÖGNET, özel güvenlik alanındaki birçok işlem ve kaydın dijital ortamda yürütülmesini sağlayan otomasyondur.',
          'PATBİS, silah ve sivil kullanım amaçlı patlayıcı maddelerle ilgili kayıt/işlem süreçlerinde kullanılan bilgi sistemidir.',
          'ÖZGE, özel güvenlik eğitimlerinin alan ve branş bazında geliştirilmesine yönelik çalışmaları ifade eder.',
        ],
      },
      {
        title: 'Sınav ve denetim',
        bullets: [
          'Özel Güvenlik Denetleme Başkanlığı; özel güvenlik alanında eğitim/sınav, şirket ve eğitim kurumu işlemleri, denetim ve koordinasyon gibi geniş bir görev alanına sahiptir.',
          'Sınav sorularında proje adlarının açılımları ve hangi birimin yürüttüğü sıkça eşleştirme şeklinde sorulur.',
        ],
      },
    ],
    exam: [
      'KAAN → Kolluk–ÖGG işbirliği ve entegrasyonu',
      'ÖGNET → özel güvenlik bilgi sistemi otomasyonu',
      'PATBİS → patlayıcı ve silah bilgi sistemi',
      'ÖZGE → alan/branş eğitimlerinin geliştirilmesi',
    ],
  },
  {
    id: 'etkili-iletisim',
    no: '10',
    course: 'Etkili İletişim',
    short: 'İletişim süreci, kaynak-mesaj-kanal-hedef, geribildirim ve iletişimi etkileyen faktörler.',
    tag: 'İletişim',
    tone: 'communication',
    keyline: 'İletişim yalnızca konuşmak değil; doğru kodlamak, doğru kanalı seçmek ve geribildirimi okumaktır.',
    sections: [
      {
        title: 'Temel amaçlar',
        bullets: [
          'Bilgi aktarmak, haberleşmek, paylaşmak, etkilemek, ikna etmek ve ortak anlam üretmek iletişimin temel amaçlarındandır.',
          'Güvenlik görevinde iletişim; gerilimi azaltma, yönlendirme, bilgi toplama ve doğru bildirim açısından kritik bir araçtır.',
        ],
      },
      {
        title: 'İletişim süreci',
        bullets: [
          'Kaynak → mesaj → kanal → hedef → geribildirim temel akışı oluşturur.',
          'Kaynak mesajı kodlar; alıcı mesajı çözümler ve geribildirim üretir.',
          'Kalıp ifadeler, beden dili ve bağlam mesajın farklı anlaşılmasına neden olabilir.',
        ],
      },
      {
        title: 'İletişimi etkileyen faktörler',
        bullets: [
          'Yaş, eğitim, sosyal konum ve kişisel deneyim gibi bireysel faktörler algıyı etkiler.',
          'Resmiyet/samimiyet gibi sosyal ortam özellikleri iletişimin tonunu değiştirir.',
          'Isı, ışık, kalabalık ve gürültü gibi fiziksel çevre koşulları iletişim kalitesini doğrudan etkileyebilir.',
        ],
      },
      {
        title: 'Kitle iletişim araçları',
        bullets: [
          'Telefon, radyo, televizyon, gazete/dergi, internet ve dijital platformlar kitle iletişim araçları arasında sayılır.',
          'Araç ile iletişimin gerçekleştiği ortamın birbirinden ayrılması sınavlarda kavramsal soru olarak gelebilir.',
        ],
      },
    ],
    exam: [
      'Kaynak → mesaj → kanal → hedef → geribildirim',
      'Kaynak kodlar, hedef kod çözer',
      'Fiziksel ortam → ısı / ışık / gürültü / kalabalık',
      'İletişim → bilgi + etkileşim + geribildirim',
    ],
  },
]

export const oggOfficialReferences = [
  {
    label: 'EGM · Özel Güvenlik Faaliyetleri Hakkında',
    href: 'https://egm.gov.tr/ozelguvenlik/ozel-guvenlik-faaliyetleri-hakkinda',
  },
  {
    label: 'EGM · Özel Güvenlik Denetleme Başkanlığı',
    href: 'https://egm.gov.tr/ozelguvenlik',
  },
  {
    label: 'İstanbul İtfaiyesi · TS EN 2 yangın sınıfları',
    href: 'https://itfaiye.ibb.gov.tr/tr/terminoloji.html',
  },
]
