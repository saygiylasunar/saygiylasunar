<template>
  <div class="page-view blog-view">
    <section class="page-hero compact-hero blog-hero">
      <div class="container">
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.intro }}</p>
      </div>
    </section>

    <section class="section blog-section-index">
      <div class="container">
        <header class="section-heading">
          <p class="eyebrow">{{ copy.sectionsEyebrow }}</p>
          <h2>{{ copy.sectionsTitle }}</h2>
        </header>

        <div class="blog-section-grid">
          <button
            type="button"
            class="blog-section-card"
            :class="{ 'is-active': activeSection === 'all' }"
            @click="activeSection = 'all'"
          >
            <span>00</span>
            <strong>{{ copy.all }}</strong>
            <small>{{ entries.length }} {{ copy.publishedCount }}</small>
          </button>

          <button
            v-for="(section, index) in blogSections"
            :key="section.slug"
            type="button"
            class="blog-section-card"
            :class="{ 'is-active': activeSection === section.slug }"
            @click="activeSection = section.slug"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ localize(section.title) }}</strong>
            <small>{{ sectionCount(section.slug) }} {{ copy.publishedCount }}</small>
          </button>
        </div>
      </div>
    </section>

    <section class="section blog-feed-section">
      <div class="container">
        <header class="section-heading section-heading-row">
          <div>
            <p class="eyebrow">{{ copy.feedEyebrow }}</p>
            <h2>{{ copy.feedTitle }}</h2>
          </div>
          <span class="blog-feed-count">{{ filteredEntries.length }} / {{ entries.length }}</span>
        </header>

        <div v-if="filteredEntries.length" class="blog-grid">
          <article v-for="entry in filteredEntries" :key="entry.slug" class="blog-card">
            <div class="blog-card-meta">
              <span>{{ localize(entry.category) }}</span>
              <time :datetime="entry.publishedAt">{{ formatDate(entry.publishedAt) }}</time>
            </div>
            <h2>{{ localize(entry.title) }}</h2>
            <p>{{ localize(entry.description) }}</p>
            <div class="tag-cloud compact-tags">
              <span v-for="tag in entry.tags" :key="tag">#{{ tag }}</span>
            </div>
            <RouterLink class="blog-read-link" :to="`/blog/${entry.slug}`">
              {{ copy.read }} →
            </RouterLink>
          </article>
        </div>

        <div v-else class="blog-empty">
          <strong>{{ copy.emptyTitle }}</strong>
          <p>{{ copy.emptyText }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { blogEntries as entries, blogSections } from '../lib/blog.js'
import { locale, localize } from '../lib/locale.js'

const activeSection = ref('all')

const copy = computed(() => locale.value === 'tr'
  ? {
      eyebrow: 'Blog · Notlar · Araştırma',
      title: 'Teknik, güvenlik ve üretim notları.',
      intro: 'Yazılım, yapay zekâ, ComfyUI, oyun teorisi, güvenlik, kimlik doğrulama, sağlık okuryazarlığı ve psikoloji başlıklarında kaynaklı ve güncellenebilir yayın alanı.',
      sectionsEyebrow: 'Konu dizini',
      sectionsTitle: 'Aynı arşiv, farklı disiplinler.',
      feedEyebrow: 'Yayınlar',
      feedTitle: 'Yayımlanan yazılar',
      all: 'Tümü',
      publishedCount: 'yayın',
      read: 'Yazıyı aç',
      emptyTitle: 'Bu başlıkta henüz yayın yok.',
      emptyText: 'Kategori hazır; içerik yayımlandığında burada listelenecek.',
    }
  : {
      eyebrow: 'Blog · Notes · Research',
      title: 'Technical, security and production notes.',
      intro: 'A source-aware publishing space for software, AI, ComfyUI, game theory, security, authentication, health literacy and psychology.',
      sectionsEyebrow: 'Topic index',
      sectionsTitle: 'One archive, multiple disciplines.',
      feedEyebrow: 'Publications',
      feedTitle: 'Published articles',
      all: 'All',
      publishedCount: 'published',
      read: 'Open article',
      emptyTitle: 'No publication in this section yet.',
      emptyText: 'The category is ready and will populate when articles are published.',
    })

const filteredEntries = computed(() =>
  activeSection.value === 'all'
    ? entries
    : entries.filter((entry) => entry.section === activeSection.value),
)

function sectionCount(slug) {
  return entries.filter((entry) => entry.section === slug).length
}

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
