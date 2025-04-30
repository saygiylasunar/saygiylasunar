<template>
  <section class="section" id="cv-dna">
    <h2 class="section-title">{{ $t('cv.title') }}</h2>

    <svg
      class="dna-svg"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        v-for="(item, i) in timeline"
        :key="i"
        :transform="`translate(${(i % 2 === 0 ? 200 : 800)}, ${i * 80 + 40})`"
        class="dna-node"
      >
        <a v-if="item.link" :href="item.link" target="_blank">
          <circle class="dna-circle linkable" r="12" />
        </a>
        <circle v-else class="dna-circle" r="10" />
        <text class="dna-title" x="0" y="-20" text-anchor="middle">
          {{ item.title || item.school || item.organization }}
        </text>
        <text class="dna-detail" x="0" y="30" text-anchor="middle">
          {{ item.detail || item.department || item.role }}
        </text>
        <text class="dna-date" x="0" y="48" text-anchor="middle">
          {{ item.year || item.date || item.duration }}
        </text>
      </g>
    </svg>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()

// Tüm verileri tek bir timeline dizisinde birleştiriyoruz
const timeline = [
  ...tm('cv.details.education'),
  ...tm('cv.details.experience'),
  ...tm('cv.details.skills'),
  ...tm('cv.details.projects'),
  ...tm('cv.details.volunteer'),
  ...tm('cv.details.academic')
]
</script>

<style scoped>
.section-title {
  font-size: 2rem;
  text-align: center;
  color: var(--color-accent);
  font-weight: var(--font-weight-bold);
  margin-bottom: 2rem;
}

.dna-svg {
  width: 100%;
  height: auto;
  max-height: 100vh;
  display: block;
  margin: 0 auto;
}

.dna-node {
  transition: transform 0.3s ease;
  cursor: default;
}
.dna-node:hover {
  transform: scale(1.1);
}

.dna-circle {
  fill: var(--color-accent);
  transition: r 0.3s ease;
}
.linkable {
  fill: var(--color-accent-light);
  cursor: pointer;
}

.dna-title {
  font-size: 0.9rem;
  font-weight: bold;
  fill: var(--color-text);
}
.dna-detail,
.dna-date {
  font-size: 0.75rem;
  fill: var(--color-text-secondary);
}
</style>
