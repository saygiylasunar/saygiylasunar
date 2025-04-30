<template>
  <section class="section" id="inspirations">
    <h2 class="section-title">{{ $t("inspirations.title") }}</h2>

    <div class="inspiration-grid">
      <div
        v-for="(inspiration, i) in $t('inspirations.items')"
        :key="i"
        class="inspiration-card"
      >
        <img :src="inspiration.image" :alt="inspiration.name" />
        <h3>{{ inspiration.name }}</h3>
        <p>{{ inspiration.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  overflow: hidden;
  text-align: center;
  padding: 1rem;
  transition: transform 0.4s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.inspiration-card:hover {
  transform: rotateY(6deg) scale(1.03);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.inspiration-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
}

.inspiration-card h3 {
  font-size: 1.2rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.inspiration-card p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
</style>
