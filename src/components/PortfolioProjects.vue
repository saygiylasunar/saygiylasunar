<template>
  <section class="section" id="portfolio">
    <h2 class="section-title">{{ $t("cv.projects.title") }}</h2>
    <p class="section-sub">{{ $t("cv.projects.description") }}</p>

    <div class="projects-grid">
      <div
        v-for="(project, index) in $t('cv.details.projects')"
        :key="index"
        class="project-card"
      >
        <!-- Proje adı -->
        <h3>{{ project.name }}</h3>

        <!-- Proje tipi (UI/UX, PDF, vs.) -->
        <p class="project-type">{{ project.type }}</p>

        <!-- Açıklama -->
        <p class="project-desc">{{ project.description }}</p>

        <!-- Eğer varsa link -->
        <a v-if="project.link" :href="project.link" class="project-link" target="_blank">
          {{ $t("viewProject") }}
        </a>
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
  text-align: center;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}
.section-sub {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}
.projects-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.project-card {
  background: var(--color-surface);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}
.project-card h3 {
  margin-bottom: 0.5rem;
  color: var(--color-text);
}
.project-type {
  font-size: 0.9rem;
  color: var(--color-accent);
  font-weight: 500;
}
.project-desc {
  margin: 0.5rem 0 1rem;
  color: var(--color-text-secondary);
}
.project-link {
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: underline;
}
</style>