export const projects = [
  {
    slug: 'loravow',
    title: 'LoraVow',
    category: { tr: 'Web Ürünü · Sistem Geliştirme', en: 'Web Product · Systems Development' },
    summary: {
      tr: 'Etkinlik katılımcılarının medya dosyalarını alıcının kendi depolama alanına aktarması için geliştirilen ürün.',
      en: 'A product designed to transfer event guests’ media files into the recipient’s own storage.',
    },
    featured: true,
  },
  {
    slug: 'beyaz-onlukluler-digital-transformation',
    title: 'Beyaz Önlüklüler — Dijital Dönüşüm',
    category: { tr: 'Kurumsal · STK · Web', en: 'Institutional · Nonprofit · Web' },
    summary: {
      tr: 'Kurumsal web, içerik, DNS, e-posta sürekliliği ve operasyon ihtiyaçlarının birlikte ele alındığı dönüşüm çalışması.',
      en: 'A transformation project combining institutional web, content, DNS, email continuity and operational needs.',
    },
    featured: true,
  },
  {
    slug: 'cuvuk',
    title: 'Çuvuk',
    category: { tr: 'Oyun Geliştirme', en: 'Game Development' },
    summary: {
      tr: 'Yumuşak low-poly dünyada geçen izometrik toplama, keşif ve çatışma oyunu girişimi.',
      en: 'An isometric collection, exploration and combat game project set in a soft low-poly world.',
    },
    featured: true,
  },
  {
    slug: 'ersen-please',
    title: 'Ersen Please!',
    category: { tr: 'Oyun · Görsel Anlatı', en: 'Game · Visual Narrative' },
    summary: {
      tr: 'Soğuk ve bürokratik bir dünyada geçen, karar ve kontrol temalı oyun girişimi.',
      en: 'A game project about decisions and control in a cold, bureaucratic world.',
    },
    featured: true,
  },
  {
    slug: 'association-member-management',
    title: 'Dernek Üye Kayıt ve Yönetim Arayüzü',
    category: { tr: 'UI/UX · Operasyon', en: 'UI/UX · Operations' },
    summary: {
      tr: 'Üyelik başvurusu, kayıt takibi ve temel yönetim süreçleri için arayüz çalışması.',
      en: 'An interface concept for membership applications, tracking and core management processes.',
    },
  },
  {
    slug: 'password-generator',
    title: 'Sade Parola Oluşturucu',
    category: { tr: 'Mini Araç · Güvenlik', en: 'Mini Utility · Security' },
    summary: {
      tr: 'Tarayıcı içinde çalışan, sade ve hızlı parola oluşturma aracı.',
      en: 'A simple and fast password generator that runs entirely in the browser.',
    },
    toolPath: '/tools/password',
  },
  {
    slug: 'metadata-cleaner',
    title: 'Görsel Metadata Temizleme Aracı',
    category: { tr: 'Mini Araç · Gizlilik', en: 'Mini Utility · Privacy' },
    summary: {
      tr: 'Görsellerde bulunan EXIF ve benzeri metadata alanlarını temizlemeye yönelik araç çalışması.',
      en: 'A utility concept for removing EXIF and related metadata from images.',
    },
  },
  {
    slug: 'ai-visual-workflows',
    title: 'AI Destekli Görsel Üretim İş Akışları',
    category: { tr: 'Yapay Zekâ · Görsel Üretim', en: 'Artificial Intelligence · Visual Production' },
    summary: {
      tr: 'Tutarlı karakter, düzenleme ve kontrollü üretim için geliştirilen düğüm tabanlı iş akışları.',
      en: 'Node-based workflows for consistent characters, editing and controlled visual production.',
    },
  },
  {
    slug: 'music-sound-experiments',
    title: 'Müzik ve Ses Üretim Çalışmaları',
    category: { tr: 'Müzik · Yaratıcı Teknoloji', en: 'Music · Creative Technology' },
    summary: {
      tr: 'Dijital projeler, oyun atmosferleri ve AI destekli müzik üretimi üzerine çalışmalar.',
      en: 'Experiments in digital project music, game atmospheres and AI-assisted music production.',
    },
  },
]

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
