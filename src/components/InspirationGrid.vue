<template>
  <section class="section" id="inspirations">
    <h2 class="section-title">{{ $t('inspirations.title') }}</h2>

    <div class="inspiration-grid">
      <div
        class="inspiration-card"
        v-for="(inspiration, i) in inspirations"
        :key="i"
        :style="`animation-delay: ${i * 100}ms`"
      >
        <img
          :src="getImageUrl(inspiration.image)"
          :alt="inspiration.name"
          class="profile-img"
        />
        <h3>{{ $t(`inspirations.names.${inspiration.slug}`) }}</h3>
        <h4>{{ $t(`inspirations.titles.${inspiration.slug}`) }}</h4>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const inspirations = computed(() => [
{ image: 'Nadide.jpg', slug: 'Nadide' },  
{ image: 'Murat.jpeg', slug: 'Murat' },
  { image: 'Kübra.jpeg', slug: 'Kübra' }
  
])

function getImageUrl(filename) {
  try {
    return new URL(`../assets/inspirations/${filename}`, import.meta.url).href
  } catch (e) {
    return ''
  }
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

.inspiration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.inspiration-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  text-align: center;
  padding: 1rem;
  transition: transform 0.4s ease, box-shadow 0.3s ease;
  animation: fadeUp 0.6s ease forwards;
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.inspiration-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.profile-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 3px solid var(--color-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.inspiration-card h3 {
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.25rem;
  color: var(--color-text);
}

.inspiration-card h4 {
  font-size: 0.95rem;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
}
</style>
