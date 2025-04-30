<template>
  <section class="section" id="cv">
    <!-- Başlık i18n'den çekiliyor -->
    <h2 class="section-title">{{ $t("cv.title") || "CV" }}</h2>

    <div class="accordion">
      <!-- Anahtarlar üzerinden her CV bölümü döngüye alınıyor -->
      <div
        v-for="(key, index) in cvKeys"
        :key="key"
        class="accordion-item"
      >
        <!-- Başlıklar her key'e göre dinamik ve çok dilli -->
        <button class="accordion-header" @click="toggle(index)">
          {{ $t(`cv.${key}.title`) }}
        </button>

        <!-- Accordion içeriği sadece açık olan index için gösterilir -->
        <div class="accordion-body" v-show="openIndex === index">
          <!-- Alt içerik, JSON'dan $t ile çekiliyor -->
          <div
            class="cv-card"
            v-for="(item, idx) in $t(`cv.details.${key}`)"
            :key="idx"
          >
            <!-- Farklı veri yapıları için esnek başlık tanımı -->
            <h3>{{ item.title || item.school || item.institution || item.organization || item.event }}</h3>

            <!-- Detay alanı dinamik -->
            <p>{{ item.detail || item.department || item.role }}</p>

            <!-- Tarih / süre bilgisi varsa göster -->
            <p v-if="item.date || item.dates || item.duration || item.year">
              <em>{{ item.date || item.dates || item.duration || item.year }}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// i18n çeviri anahtarlarını temel alan sıralı kategori listesi
const cvKeys = [
  'education',
  'experience',
  'volunteer',
  'skills',
  'projects',
  'academic'
]

// Accordion açık/kapalı durumunu kontrol eder
const openIndex = ref(0)

// Tıklanınca aç/kapat mantığı
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .accordion-header {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-medium);
    font-size: 1rem;
    text-align: left;
    color: var(--color-text);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .accordion-header:hover {
    background: var(--color-accent-light);
  }
  
  .accordion-body {
    padding: 1rem 1.5rem;
    border-left: 4px solid var(--color-accent);
    background: var(--color-background);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
  
  .cv-card {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
  }
  
  .cv-card:last-child {
    border-bottom: none;
  }
  
  .cv-card h3 {
    font-size: 1.1rem;
    font-weight: var(--font-weight-medium);
    margin: 0 0 0.5rem;
  }
  
  .cv-card p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    margin: 0;
  }
  </style>  