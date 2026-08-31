const slot = (time, course, type, instructor, room) => ({
  time,
  course,
  type,
  instructor,
  room,
})

const LAW = 'Özel Güvenlik Hukuku ve Kişi Hakları'
const SECURITY = 'Güvenlik Tedbirleri'
const FIRST_AID = 'Temel İlk Yardım'
const SYSTEMS = 'Güvenlik Sistem ve Cihazları'
const NARCOTICS = 'Uyuşturucu Madde Bilgileri'
const WEAPONS = 'Silah Bilgisi ve Atış'
const CROWD = 'Kalabalık Yönetimi'
const FIRE = 'Yangın Güvenliği ve Tabii Afet'
const LAW_ENFORCEMENT = 'Genel Kolluklar İlişkileri'
const COMMUNICATION = 'Etkili İletişim'
const PROTECTION = 'Kişi Koruma'

export const oggSchedule = [
  {
    date: '2026-09-01',
    sessions: [
      slot('08:50 - 09:30', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('11:20 - 12:00', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('12:10 - 12:50', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:50 - 14:30', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('14:40 - 15:20', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-02',
    sessions: [
      slot('08:50 - 09:30', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('11:20 - 12:00', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('12:10 - 12:50', FIRST_AID, 'Teorik', 'Ömer Evran', 'A Sınıfı'),
      slot('13:00 - 13:40', FIRST_AID, 'Teorik', 'Ömer Evran', 'A Sınıfı'),
      slot('13:50 - 14:30', FIRST_AID, 'Uygulama', 'Ömer Evran', 'Uygulama Sınıfı'),
      slot('14:40 - 15:20', FIRST_AID, 'Uygulama', 'Ömer Evran', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-03',
    sessions: [
      slot('08:50 - 09:30', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('11:20 - 12:00', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('12:10 - 12:50', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:50 - 14:30', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('14:40 - 15:20', SECURITY, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-04',
    sessions: [
      slot('08:50 - 09:30', FIRST_AID, 'Teorik', 'Ömer Evran', 'A Sınıfı'),
      slot('09:40 - 10:20', FIRST_AID, 'Teorik', 'Ömer Evran', 'A Sınıfı'),
      slot('10:30 - 11:10', FIRST_AID, 'Teorik', 'Ömer Evran', 'A Sınıfı'),
      slot('11:20 - 12:00', FIRST_AID, 'Teorik', 'Ömer Evran', 'A Sınıfı'),
      slot('12:10 - 12:50', FIRST_AID, 'Uygulama', 'Ömer Evran', 'Uygulama Sınıfı'),
      slot('13:00 - 13:40', FIRST_AID, 'Uygulama', 'Ömer Evran', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-05',
    sessions: [
      slot('08:50 - 09:30', SYSTEMS, 'Uygulama', 'Fatih Özkan', 'Uygulama Sınıfı'),
      slot('09:40 - 10:20', SYSTEMS, 'Uygulama', 'Fatih Özkan', 'Uygulama Sınıfı'),
      slot('10:30 - 11:10', SYSTEMS, 'Uygulama', 'Fatih Özkan', 'Uygulama Sınıfı'),
      slot('11:20 - 12:00', SYSTEMS, 'Uygulama', 'Fatih Özkan', 'Uygulama Sınıfı'),
      slot('12:10 - 12:50', SYSTEMS, 'Uygulama', 'Fatih Özkan', 'Uygulama Sınıfı'),
      slot('13:00 - 13:40', NARCOTICS, 'Teorik', 'Kadri Kutlukız', 'A Sınıfı'),
      slot('13:50 - 14:30', NARCOTICS, 'Teorik', 'Kadri Kutlukız', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-07',
    sessions: [
      slot('08:50 - 09:30', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('11:20 - 12:00', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('12:10 - 12:50', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:50 - 14:30', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('14:40 - 15:20', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-08',
    sessions: [
      slot('08:50 - 09:30', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('09:40 - 10:20', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('10:30 - 11:10', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('11:20 - 12:00', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('12:10 - 12:50', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:50 - 14:30', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('14:40 - 15:20', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-09',
    sessions: [
      slot('08:50 - 09:30', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('09:40 - 10:20', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('10:30 - 11:10', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('11:20 - 12:00', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('12:10 - 12:50', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:50 - 14:30', WEAPONS, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-10',
    sessions: [
      slot('13:00 - 13:40', WEAPONS, 'Uygulama', 'Levent Yıldız', 'Emniyet Poligonu 2'),
      slot('13:50 - 14:30', WEAPONS, 'Uygulama', 'Levent Yıldız', 'Emniyet Poligonu 2'),
      slot('14:40 - 15:20', WEAPONS, 'Uygulama', 'Levent Yıldız', 'Emniyet Poligonu 2'),
      slot('15:30 - 16:10', WEAPONS, 'Uygulama', 'Levent Yıldız', 'Emniyet Poligonu 2'),
      slot('16:20 - 17:00', WEAPONS, 'Uygulama', 'Levent Yıldız', 'Emniyet Poligonu 2'),
    ],
  },
  {
    date: '2026-09-11',
    sessions: [
      slot('08:50 - 09:30', CROWD, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', CROWD, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', CROWD, 'Uygulama', 'Dede Yaşar', 'Uygulama Sınıfı'),
      slot('11:20 - 12:00', CROWD, 'Uygulama', 'Dede Yaşar', 'Uygulama Sınıfı'),
      slot('12:10 - 12:50', CROWD, 'Uygulama', 'Dede Yaşar', 'Uygulama Sınıfı'),
      slot('13:00 - 13:40', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('13:50 - 14:30', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('14:40 - 15:20', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-12',
    sessions: [
      slot('08:50 - 09:30', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('09:40 - 10:20', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('10:30 - 11:10', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('11:20 - 12:00', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('12:10 - 12:50', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('13:00 - 13:40', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('13:50 - 14:30', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
      slot('14:40 - 15:20', FIRE, 'Teorik', 'M.T. Şakir Büyükkoşucu', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-14',
    sessions: [
      slot('08:50 - 09:30', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('11:20 - 12:00', LAW, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('12:10 - 12:50', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:50 - 14:30', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('14:40 - 15:20', SECURITY, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-15',
    sessions: [
      slot('08:50 - 09:30', CROWD, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', CROWD, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', CROWD, 'Uygulama', 'Dede Yaşar', 'Uygulama Sınıfı'),
      slot('11:20 - 12:00', CROWD, 'Uygulama', 'Dede Yaşar', 'Uygulama Sınıfı'),
      slot('12:10 - 12:50', CROWD, 'Uygulama', 'Dede Yaşar', 'Uygulama Sınıfı'),
      slot('13:00 - 13:40', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('13:50 - 14:30', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('14:40 - 15:20', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-16',
    sessions: [
      slot('08:50 - 09:30', LAW_ENFORCEMENT, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('09:40 - 10:20', LAW_ENFORCEMENT, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('10:30 - 11:10', LAW_ENFORCEMENT, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('11:20 - 12:00', LAW_ENFORCEMENT, 'Teorik', 'Dede Yaşar', 'A Sınıfı'),
      slot('12:10 - 12:50', SECURITY, 'Teorik', 'Levent Yıldız', 'A Sınıfı'),
      slot('13:00 - 13:40', SECURITY, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('13:50 - 14:30', SECURITY, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('14:40 - 15:20', SECURITY, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
    ],
  },
  {
    date: '2026-09-17',
    sessions: [
      slot('08:50 - 09:30', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('09:40 - 10:20', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('10:30 - 11:10', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('11:20 - 12:00', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('12:10 - 12:50', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('13:00 - 13:40', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('13:50 - 14:30', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('14:40 - 15:20', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
    ],
  },
  {
    date: '2026-09-18',
    sessions: [
      slot('08:50 - 09:30', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('09:40 - 10:20', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('10:30 - 11:10', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('11:20 - 12:00', COMMUNICATION, 'Teorik', 'Fatime Şule Doğancı', 'A Sınıfı'),
      slot('12:10 - 12:50', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('13:00 - 13:40', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
      slot('13:50 - 14:30', PROTECTION, 'Uygulama', 'Levent Yıldız', 'Uygulama Sınıfı'),
    ],
  },
]

export const oggPendingDates = []

export const oggScheduleMeta = {
  provider: 'Yavuz Özel Güvenlik Hizmetleri Sanayi ve Ticaret Limited Şirketi',
  source: 'ÖGYS Mobil Uygulaması ekran görüntüleri',
  updatedAt: '2026-08-31',
}
