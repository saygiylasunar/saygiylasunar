<template>
  <div class="page-view lands-view">
    <section class="page-hero compact-hero">
      <div class="container">
        <p class="eyebrow">{{ t('lands.eyebrow') }}</p>
        <h1>{{ t('lands.title') }}</h1>
        <p>{{ t('lands.intro') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container lands-selector-layout">
        <div class="lands-selector-copy" v-reveal>
          <p class="eyebrow">{{ t('lands.selectorEyebrow') }}</p>
          <h2>{{ t('lands.selectorTitle') }}</h2>
          <p>{{ t('lands.selectorNote') }}</p>

          <div class="parcel-button-row">
            <button
              v-for="parcel in publishedParcels"
              :key="parcel.id"
              type="button"
              :class="{ 'is-active': parcel.id === selectedId }"
              @click="selectParcel(parcel.id)"
            >
              {{ parcel.ada }}/{{ parcel.parsel }}
            </button>
          </div>
        </div>

        <div class="parcel-schematic" v-reveal>
          <svg viewBox="0 0 720 340" role="img" :aria-label="t('lands.selectorTitle')">
            <g
              v-for="(parcel, index) in publishedParcels"
              :key="parcel.id"
              class="parcel-shape"
              :class="{ 'is-active': parcel.id === selectedId }"
              role="button"
              tabindex="0"
              @click="selectParcel(parcel.id)"
              @keydown.enter.prevent="selectParcel(parcel.id)"
              @keydown.space.prevent="selectParcel(parcel.id)"
            >
              <polygon :points="schematicPoints[index]" />
              <text :x="index === 0 ? 220 : 510" y="175">{{ parcel.ada }}/{{ parcel.parsel }}</text>
            </g>
          </svg>
          <small>{{ t('lands.selectorNote') }}</small>
        </div>
      </div>
    </section>

    <section v-if="selectedParcel" class="section section-tinted">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('lands.detailsEyebrow') }}</p>
          <h2>{{ t('lands.detailsTitle') }} · {{ selectedParcel.ada }}/{{ selectedParcel.parsel }}</h2>
          <p>{{ localize(selectedParcel.description) }}</p>
        </header>

        <div class="parcel-detail-grid" v-reveal>
          <dl class="parcel-facts">
            <div>
              <dt>{{ t('lands.area') }}</dt>
              <dd>{{ formatArea(selectedParcel.tapuAlanM2) }}</dd>
            </div>
            <div>
              <dt>{{ t('lands.unitPrice') }}</dt>
              <dd>{{ formatMoney(parcels.config.fiyatM2) }} / m²</dd>
            </div>
            <div class="parcel-price-row">
              <dt>{{ t('lands.totalPrice') }}</dt>
              <dd>{{ formatMoney(totalPrice) }}</dd>
            </div>
            <div>
              <dt>{{ t('lands.status') }}</dt>
              <dd><span class="status-pill">{{ t(`lands.statuses.${selectedParcel.durum}`) }}</span></dd>
            </div>
            <div>
              <dt>{{ t('lands.location') }}</dt>
              <dd>{{ parcels.config.mahalle }} · {{ parcels.config.ilce }} · {{ parcels.config.il }}</dd>
            </div>
          </dl>

          <div class="parcel-technical-copy">
            <article>
              <span>{{ t('lands.zoning') }}</span>
              <p>{{ localize(selectedParcel.imarDurumu) }}</p>
            </article>
            <article>
              <span>{{ t('lands.deed') }}</span>
              <p>{{ localize(selectedParcel.tapuDurumu) }}</p>
            </article>
            <a class="button button-primary" :href="parcelMailHref">{{ t('lands.contactParcel') }} →</a>
          </div>
        </div>
      </div>
    </section>

    <section v-if="selectedParcel" class="section">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('lands.galleryEyebrow') }}</p>
          <h2>{{ t('lands.galleryTitle') }}</h2>
        </header>

        <div class="parcel-gallery-grid">
          <article v-for="item in galleryItems" :key="item.key" class="parcel-gallery-card" v-reveal>
            <img v-if="item.src" :src="item.src" :alt="item.label" loading="lazy" decoding="async" />
            <div v-else class="parcel-gallery-placeholder">
              <span>{{ item.index }}</span>
              <strong>{{ item.label }}</strong>
              <small>{{ t('lands.imagePending') }}</small>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container narrow-container legal-notice" v-reveal>
        <p class="eyebrow">{{ t('lands.legalTitle') }}</p>
        <p v-for="paragraph in t('lands.legal')" :key="paragraph">{{ paragraph }}</p>
        <p><strong>{{ t('lands.representative') }}</strong></p>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container" v-reveal>
        <p class="eyebrow">{{ t('lands.contact') }}</p>
        <a class="email-display" :href="`mailto:${site.brand.email}`">{{ site.brand.email }} ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPublishedParcels, parcelTotalPrice, parcels, site } from '../lib/content.js'
import { locale, localize, t } from '../lib/locale.js'

const route = useRoute()
const router = useRouter()
const publishedParcels = getPublishedParcels()
const initialId = publishedParcels.some((parcel) => parcel.id === route.query.parsel)
  ? route.query.parsel
  : publishedParcels[0]?.id
const selectedId = ref(initialId)
const schematicPoints = ['80,70 340,48 370,270 115,292', '395,58 650,88 625,292 375,265']

const selectedParcel = computed(() => publishedParcels.find((parcel) => parcel.id === selectedId.value))
const totalPrice = computed(() => parcelTotalPrice(selectedParcel.value))
const galleryItems = computed(() =>
  parcels.config.galleryOrder.map((key, index) => ({
    key,
    index: String(index + 1).padStart(2, '0'),
    label: t(`lands.gallery.${key}`),
    src: selectedParcel.value?.images?.[key] || '',
  })),
)
const parcelMailHref = computed(() => {
  const parcel = selectedParcel.value
  const subject = parcel ? `${parcels.config.ilce} ${parcel.ada}/${parcel.parsel} parsel bilgi talebi` : 'Arsa portföyü bilgi talebi'
  return `mailto:${site.brand.email}?subject=${encodeURIComponent(subject)}`
})

function selectParcel(id) {
  selectedId.value = id
  router.replace({ query: { ...route.query, parsel: id } })
}

function formatArea(value) {
  return new Intl.NumberFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + ' m²'
}

function formatMoney(value) {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value)
}

watch(
  () => route.query.parsel,
  (id) => {
    if (publishedParcels.some((parcel) => parcel.id === id)) selectedId.value = id
  },
)
</script>
