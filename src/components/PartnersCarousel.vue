<template>
  <section class="section" id="partners">
    <h2 class="section-title">{{ $t("partners.title") }}</h2>
    <p class="section-sub">{{ $t("partners.description") }}</p>

    <div class="carousel-track">
      <div
        class="carousel-item"
        v-for="(partner, i) in $t('partners.items')"
        :key="i"
      >
        <img
          :src="partner.logo"
          :alt="partner.name"
          class="partner-logo"
        />
      </div>
      <!-- Clone for infinite scroll loop -->
      <div
        class="carousel-item clone"
        v-for="(partner, i) in $t('partners.items')"
        :key="'clone-' + i"
      >
        <img
          :src="partner.logo"
          :alt="partner.name"
          class="partner-logo"
        />
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
  text-align: center;
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}
.section-sub {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.carousel-track {
  display: flex;
  gap: 2rem;
  animation: scroll 30s linear infinite;
  width: fit-content;
  padding: 1rem;
}

.carousel-item {
  flex: 0 0 auto;
}

.partner-logo {
  height: 60px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.8;
  transition: all 0.3s ease;
}
.partner-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
}

/* Sonsuz döngü efekti */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
