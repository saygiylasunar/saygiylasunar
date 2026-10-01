<template>
  <div class="page-view home-view">
    <section class="hero-section">
      <div class="hero-orbit hero-orbit-one" aria-hidden="true"></div>
      <div class="hero-orbit hero-orbit-two" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot"></span>{{ copy.eyebrow }}</p>
          <h1>{{ site.brand.name }} · {{ site.brand.studio }}</h1>
          <p class="hero-intro">{{ copy.intro }}</p>
          <div class="hero-actions">
            <RouterLink class="button button-primary" to="/projects">{{ copy.projects }} →</RouterLink>
            <RouterLink class="button button-ghost" to="/blog">Blog →</RouterLink>
          </div>
        </div>

        <aside class="identity-panel">
          <span class="identity-code">EF / 2026</span>
          <div class="identity-main">
            <strong>{{ site.brand.name }}</strong>
            <p>{{ copy.role }}</p>
            <p>Software · AI · UI/UX · Design</p>
          </div>
          <div class="identity-tags">
            <span>Vue</span><span>ComfyUI</span><span>Figma</span><span>Git</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section home-directory-section">
      <div class="container">
        <header class="section-heading">
          <p class="eyebrow">{{ copy.directoryEyebrow }}</p>
          <h2>{{ copy.directoryTitle }}</h2>
        </header>
        <div class="home-directory">
          <RouterLink v-for="item in directory" :key="item.to" class="home-directory-card" :to="item.to">
            <span>{{ item.index }}</span>
            <strong>{{ item.title }}</strong>
            <small>{{ item.meta }}</small>
            <b aria-hidden="true">↗</b>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section-tinted" id="services">
      <div class="container">
        <header class="section-heading section-heading-row">
          <div>
            <p class="eyebrow">{{ copy.servicesEyebrow }}</p>
            <h2>{{ copy.servicesTitle }}</h2>
          </div>
          <RouterLink class="text-link" to="/services">{{ copy.all }} →</RouterLink>
        </header>
        <div class="service-grid">
          <ServiceCard v-for="service in services" :key="service.slug" :service="service" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-heading section-heading-row">
          <div>
            <p class="eyebrow">{{ copy.projectsEyebrow }}</p>
            <h2>{{ copy.featuredProjects }}</h2>
          </div>
          <RouterLink class="text-link" to="/projects">{{ copy.all }} →</RouterLink>
        </header>
        <div class="project-grid">
          <ProjectCard v-for="project in featuredProjects" :key="project.slug" :project="project" />
        </div>
      </div>
    </section>

    <section class="section section-tinted home-blog-preview">
      <div class="container">
        <header class="section-heading section-heading-row">
          <div>
            <p class="eyebrow">Blog</p>
            <h2>{{ copy.latest }}</h2>
          </div>
          <RouterLink class="text-link" to="/blog">{{ copy.all }} →</RouterLink>
        </header>

        <div class="home-blog-grid">
          <RouterLink v-for="entry in latestBlog" :key="entry.slug" class="home-blog-card" :to="`/blog/${entry.slug}`">
            <span>{{ localize(entry.category) }}</span>
            <h3>{{ localize(entry.title) }}</h3>
            <p>{{ localize(entry.description) }}</p>
            <time :datetime="entry.publishedAt">{{ formatDate(entry.publishedAt) }}</time>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container experience-preview">
        <div>
          <p class="eyebrow">{{ copy.experience }}</p>
          <h2>{{ copy.experienceTitle }}</h2>
          <RouterLink class="button button-light" to="/experience">{{ copy.experience }} →</RouterLink>
        </div>
        <div class="experience-stack">
          <article v-for="item in experiencePreview" :key="localize(item.institution)">
            <span>{{ localize(item.period) }}</span>
            <h3>{{ localize(item.institution) }}</h3>
            <p>{{ localize(item.role) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container">
        <p class="eyebrow">{{ copy.contact }}</p>
        <h2>{{ site.brand.email }}</h2>
        <div class="hero-actions">
          <a class="button button-primary" :href="`mailto:${site.brand.email}`">{{ copy.email }}</a>
          <RouterLink class="button button-ghost" to="/contact">{{ copy.contact }} →</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { blogEntries } from '../lib/blog.js'
import { experience, projects, services, site } from '../lib/content.js'
import { locale, localize } from '../lib/locale.js'

const featuredProjects = projects.filter((project) => project.featured)
const latestBlog = blogEntries.slice(0, 3)
const experiencePreview = [
  experience.nonprofit[0],
  experience.professional[0],
  experience.professional[1],
]

const copy = computed(() => locale.value === 'tr'
  ? {
      eyebrow: 'Bilgisayar mühendisi · bağımsız dijital üretim',
      intro: 'Yazılım, yapay zekâ, UI/UX, grafik tasarım, yaratıcı teknoloji, müzik ve bağımsız ürün geliştirme çalışmaları.',
      role: 'Bilgisayar Mühendisi',
      projects: 'Projeler',
      directoryEyebrow: 'Site dizini',
      directoryTitle: 'Çalışmalar, yayınlar ve araçlar.',
      servicesEyebrow: 'Çalışma alanları',
      servicesTitle: 'Hizmet ve üretim disiplinleri',
      projectsEyebrow: 'Projeler',
      featuredProjects: 'Seçili proje kayıtları',
      latest: 'Son yayınlar',
      experience: 'Deneyim',
      experienceTitle: 'Profesyonel ve kurumsal kayıtlar',
      contact: 'İletişim',
      email: 'E-posta gönder',
      all: 'Tümünü gör',
    }
  : {
      eyebrow: 'Computer engineer · independent digital production',
      intro: 'Software, artificial intelligence, UI/UX, graphic design, creative technology, music and independent product development.',
      role: 'Computer Engineer',
      projects: 'Projects',
      directoryEyebrow: 'Site index',
      directoryTitle: 'Work, publishing and tools.',
      servicesEyebrow: 'Capabilities',
      servicesTitle: 'Services and production disciplines',
      projectsEyebrow: 'Projects',
      featuredProjects: 'Selected project records',
      latest: 'Latest publications',
      experience: 'Experience',
      experienceTitle: 'Professional and institutional records',
      contact: 'Contact',
      email: 'Send email',
      all: 'View all',
    })

const directory = computed(() => [
  { index: '01', to: '/projects', title: copy.value.projects, meta: `${projects.length} ${locale.value === 'tr' ? 'kayıt' : 'records'}` },
  { index: '02', to: '/blog', title: 'Blog', meta: `${blogEntries.length} ${locale.value === 'tr' ? 'yayın' : 'published'}` },
  { index: '03', to: '/tools', title: locale.value === 'tr' ? 'Araçlar' : 'Tools', meta: '7 browser utilities' },
  { index: '04', to: '/experience', title: copy.value.experience, meta: locale.value === 'tr' ? 'İş · eğitim · yetkinlik' : 'Work · education · skills' },
  { index: '05', to: '/ogg', title: 'ÖGG', meta: locale.value === 'tr' ? '11 ders · 105 konu' : '11 subjects · 105 topics' },
  { index: '06', to: '/arsalar', title: locale.value === 'tr' ? 'Arsalar' : 'Land', meta: locale.value === 'tr' ? 'Parsel bilgi görünümü' : 'Parcel information' },
])

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
