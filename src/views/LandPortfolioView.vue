<template>
  <div class="page-view lands-view">
    <section class="land-widget-section">
      <div class="container">
        <header class="land-widget-intro">
          <div>
            <p class="eyebrow">{{ t('lands.eyebrow') }}</p>
            <h1>{{ copy.title }}</h1>
          </div>
          <p class="land-widget-location">{{ parcels.config.mahalle }} · {{ parcels.config.ilce }} · {{ parcels.config.il }}</p>
        </header>

        <div class="land-widget">
          <section class="land-widget-legal" :aria-label="copy.legalHeading">
            <div class="land-widget-legal-head">
              <strong>{{ copy.legalHeading }}</strong>
              <span>{{ copy.legalLead }}</span>
            </div>

            <div class="land-widget-legal-main">
              <p v-for="paragraph in t('lands.legal')" :key="paragraph">{{ paragraph }}</p>
            </div>

            <p class="land-widget-representative">
              <strong>{{ t('lands.representative') }}</strong>
            </p>

            <div class="land-widget-legal-notes">
              <p>{{ copy.noPaymentLong }}</p>
              <p>{{ copy.officialCheck }}</p>
            </div>
          </section>

          <aside class="land-widget-list" aria-label="Parseller">
            <span class="land-widget-column-label">{{ copy.parcelsTitle }}</span>
            <button
              v-for="parcel in publishedParcels"
              :key="parcel.id"
              type="button"
              class="land-widget-parcel"
              :class="{ 'is-active': parcel.id === selectedId }"
              @click="selectParcel(parcel.id)"
            >
              <span>
                <strong>{{ parcel.ada }}/{{ parcel.parsel }}</strong>
                <small>{{ formatArea(parcel.tapuAlanM2) }}</small>
              </span>
              <b>{{ formatMoney(parcelTotalPrice(parcel)) }}</b>
            </button>
          </aside>

          <div class="land-widget-visual">
            <img
              v-if="selectedVisual"
              :src="selectedVisual.src"
              :alt="selectedVisual.label"
              loading="eager"
              decoding="async"
            />

            <div v-else class="land-widget-schematic">
              <svg viewBox="0 0 720 420" role="img" :aria-label="copy.visualPending">
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
                  <text :x="index === 0 ? 220 : 510" y="215">{{ parcel.ada }}/{{ parcel.parsel }}</text>
                </g>
              </svg>
              <div>
                <strong>{{ selectedParcel?.ada }}/{{ selectedParcel?.parsel }}</strong>
                <span>{{ copy.visualPending }}</span>
              </div>
            </div>
          </div>

          <aside
            v-if="selectedParcel"
            class="land-widget-summary"
            :class="`status-${selectedParcel.durum}`"
          >
            <div class="land-widget-status-row">
              <span>{{ copy.selected }}</span>
              <b>{{ t(`lands.statuses.${selectedParcel.durum}`) }}</b>
            </div>

            <div class="land-widget-price">
              <small>{{ copy.salePrice }}</small>
              <strong>{{ formatMoney(totalPrice) }}</strong>
            </div>

            <dl>
              <div>
                <dt>{{ t('lands.area') }}</dt>
                <dd>{{ formatArea(selectedParcel.tapuAlanM2) }}</dd>
              </div>
              <div>
                <dt>{{ t('lands.location') }}</dt>
                <dd>{{ parcels.config.mahalle }} / {{ parcels.config.ilce }}</dd>
              </div>
            </dl>

            <a class="button button-primary" :href="parcelMailHref">{{ copy.askInfo }}</a>
          </aside>

          <section v-if="selectedParcel" class="land-widget-technical">
            <div class="land-widget-technical-head">
              <strong>{{ copy.technicalTitle }}</strong>
              <span>{{ copy.technicalLead }}</span>
            </div>
            <div class="land-widget-technical-grid">
              <article>
                <strong>{{ t('lands.zoning') }}</strong>
                <p>{{ localize(selectedParcel.imarDurumu) }}</p>
              </article>
              <article>
                <strong>{{ t('lands.deed') }}</strong>
                <p>{{ localize(selectedParcel.tapuDurumu) }}</p>
              </article>
            </div>
          </section>
        </div>

        <p class="land-widget-footnote">{{ copy.priceRule }}</p>
      </div>
    </section>

    <div v-if="selectedParcel" class="land-mobile-bar">
      <div>
        <span>{{ selectedParcel.ada }}/{{ selectedParcel.parsel }}</span>
        <strong>{{ formatMoney(totalPrice) }}</strong>
      </div>
      <a class="button button-primary" :href="parcelMailHref">{{ copy.askInfo }}</a>
    </div>
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
const schematicPoints = ['80,82 340,58 370,336 115,354', '395,70 650,100 625,354 375,330']

const copy = computed(() => locale.value === 'tr'
  ? {
      title: "Kayran'da Satılık Arsalar",
      parcelsTitle: 'Parseller',
      selected: 'Seçili parsel',
      salePrice: 'Satış fiyatı',
      askInfo: 'Bilgi al',
      technicalTitle: 'Tapu ve imar bilgileri',
      technicalLead: 'Seçili parsele ait yayımlanmış temel bilgiler.',
      legalHeading: 'Önemli bilgilendirme',
      legalLead: 'Satış sürecine ilişkin esas açıklamalar aşağıda açıkça yer almaktadır.',
      visualPending: 'Parsel görseli hazırlanıyor',
      priceRule: 'Fiyat, tapu alanının tam m² kısmı × 5.000 TL kuralıyla hesaplanır.',
      officialCheck: 'Tapu, imar, yapılaşma ve uygulamaya ilişkin nihai ve güncel bilgiler ilgili kamu kurumlarından teyit edilmelidir.',
      noPaymentLong: 'Bu internet sayfası üzerinden kapora, satış bedeli veya başka bir taşınmaz ödemesi tahsil edilmez.',
    }
  : {
      title: 'Land for Sale in Kayran',
      parcelsTitle: 'Parcels',
      selected: 'Selected parcel',
      salePrice: 'Sale price',
      askInfo: 'Ask for details',
      technicalTitle: 'Title deed and zoning information',
      technicalLead: 'Published basic information for the selected parcel.',
      legalHeading: 'Important information',
      legalLead: 'The essential statements concerning the sale process are shown openly below.',
      visualPending: 'Parcel visual is being prepared',
      priceRule: 'Price is calculated as the whole-number part of the registered m² × TRY 5,000.',
      officialCheck: 'Final and current title deed, zoning, construction and implementation information should be confirmed with the relevant public authorities.',
      noPaymentLong: 'No deposit, sale price or other real-estate payment is collected through this website.',
    })

const selectedParcel = computed(() => publishedParcels.find((parcel) => parcel.id === selectedId.value))
const totalPrice = computed(() => parcelTotalPrice(selectedParcel.value))
const galleryItems = computed(() =>
  parcels.config.galleryOrder.map((key) => ({
    key,
    label: t(`lands.gallery.${key}`),
    src: selectedParcel.value?.images?.[key] || '',
  })),
)
const selectedVisual = computed(() => galleryItems.value.find((item) => item.src) || null)
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
