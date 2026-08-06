export const services = [
  {
    slug: 'artificial-intelligence',
    number: '01',
    title: { tr: 'Yapay Zekâ', en: 'Artificial Intelligence' },
    short: {
      tr: 'AI destekli ürünler, üretim akışları ve iş otomasyonları.',
      en: 'AI-assisted products, production workflows and business automation.',
    },
    description: {
      tr: 'Üretken yapay zekâyı yalnızca içerik üretmek için değil; prototipleme, iş akışı tasarımı, araştırma ve operasyonel verimlilik için kullanıyorum.',
      en: 'I use generative AI not only for content production, but also for prototyping, workflow design, research and operational efficiency.',
    },
    outcomes: {
      tr: ['AI destekli ürün prototipi', 'Görsel üretim workflow’u', 'LLM tabanlı yardımcı araç', 'İş akışı analizi ve otomasyon planı'],
      en: ['AI-assisted product prototype', 'Visual generation workflow', 'LLM-powered utility', 'Workflow analysis and automation plan'],
    },
    palette: ['ComfyUI', 'Flux', 'SDXL', 'Qwen Edit', 'LoRA', 'Python', 'JavaScript'],
  },
  {
    slug: 'design',
    number: '02',
    title: { tr: 'Tasarım', en: 'Design' },
    short: {
      tr: 'Marka, UI/UX ve dijital görsel iletişim sistemleri.',
      en: 'Brand, UI/UX and digital visual communication systems.',
    },
    description: {
      tr: 'Görsel kimlik, dijital arayüz ve içerik tasarımını ürünün hedefiyle ilişkilendirerek bütünlüklü bir sistem hâline getiriyorum.',
      en: 'I connect visual identity, digital interface and content design to the product goal and turn them into a coherent system.',
    },
    outcomes: {
      tr: ['Görsel kimlik sistemi', 'Web veya uygulama arayüzü', 'Sosyal medya tasarım sistemi', 'Sunum ve yayın tasarımı'],
      en: ['Visual identity system', 'Web or application interface', 'Social media design system', 'Presentation and editorial design'],
    },
    palette: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe XD', 'SVG', 'UI/UX'],
  },
  {
    slug: 'software-systems',
    number: '03',
    title: { tr: 'Kodlama ve Sistem Geliştirme', en: 'Software & Systems Development' },
    short: {
      tr: 'Web ürünleri, entegrasyonlar ve sürdürülebilir dijital altyapılar.',
      en: 'Web products, integrations and sustainable digital infrastructure.',
    },
    description: {
      tr: 'İhtiyaca özel web ürünleri, arayüzler ve operasyon sistemleri geliştiriyorum; gereksiz servis ve bağımlılıkları azaltmaya öncelik veriyorum.',
      en: 'I develop custom web products, interfaces and operational systems, prioritizing fewer unnecessary services and dependencies.',
    },
    outcomes: {
      tr: ['Kurumsal veya kişisel web sitesi', 'MVP ve ürün prototipi', 'API ve servis entegrasyonu', 'Dijital operasyon arayüzü'],
      en: ['Institutional or personal website', 'MVP and product prototype', 'API and service integration', 'Digital operations interface'],
    },
    palette: ['Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SCSS', 'SQL', 'Firebase', 'Netlify'],
  },
  {
    slug: 'music-sound',
    number: '04',
    title: { tr: 'Müzik ve Ses', en: 'Music & Sound' },
    short: {
      tr: 'Dijital projeler, oyunlar ve yaratıcı işler için ses üretimi.',
      en: 'Sound production for digital products, games and creative work.',
    },
    description: {
      tr: 'Müzik, atmosfer ve ses düzenleme çalışmalarını görsel veya interaktif projenin kimliğiyle birlikte ele alıyorum.',
      en: 'I approach music, atmosphere and audio editing together with the identity of the visual or interactive project.',
    },
    outcomes: {
      tr: ['Kısa tema veya jenerik', 'Oyun atmosferi', 'Dijital proje müziği', 'AI destekli müzik üretim akışı'],
      en: ['Short theme or intro', 'Game atmosphere', 'Music for a digital project', 'AI-assisted music production workflow'],
    },
    palette: ['FL Studio', 'Adobe Audition', 'Suno', 'FADR', 'Audio editing'],
  },
  {
    slug: 'game-development',
    number: '05',
    title: { tr: 'Oyun Geliştirme', en: 'Game Development' },
    short: {
      tr: 'Konseptten oynanabilir prototipe oyun sistemleri ve görsel yön.',
      en: 'Game systems and art direction from concept to playable prototype.',
    },
    description: {
      tr: 'Oyun fikrini; sistem tasarımı, arayüz, sanat yönü, karakter, ses ve teknik prototip bileşenleriyle birlikte geliştiriyorum.',
      en: 'I develop game ideas together with systems design, interface, art direction, characters, sound and technical prototyping.',
    },
    outcomes: {
      tr: ['Oynanabilir prototip', 'Oyun sistemi dokümanı', 'UI/UX ve sanat yönü', 'Karakter ve dünya konsepti'],
      en: ['Playable prototype', 'Game systems document', 'UI/UX and art direction', 'Character and world concept'],
    },
    palette: ['Godot', 'Unity', 'Blender', 'Figma', 'Aseprite', 'AI-assisted prototyping'],
  },
  {
    slug: 'institutional-nonprofit',
    number: '06',
    title: { tr: 'Kurumsal ve STK Çözümleri', en: 'Institutional & Nonprofit Solutions' },
    short: {
      tr: 'Dijital dönüşüm, kurumsal iletişim ve operasyon sistemleri.',
      en: 'Digital transformation, institutional communication and operations systems.',
    },
    description: {
      tr: 'Kurum ve sivil toplum yapılarında web, içerik, marka, ekip ve operasyon ihtiyaçlarını birlikte değerlendirerek uygulanabilir sistemler kuruyorum.',
      en: 'I build practical systems for institutions and nonprofits by evaluating web, content, brand, team and operations needs together.',
    },
    outcomes: {
      tr: ['Kurumsal web dönüşümü', 'İçerik ve arşiv sistemi', 'Kurumsal iletişim yapısı', 'Etkinlik ve ekip operasyon planı'],
      en: ['Institutional web transformation', 'Content and archive system', 'Institutional communication structure', 'Event and team operations plan'],
    },
    palette: ['Google Workspace', 'Web operations', 'Brand systems', 'Documentation', 'Process design'],
  },
]

export function getService(slug) {
  return services.find((service) => service.slug === slug)
}
