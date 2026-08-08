<template>
  <div class="page-view lands-view">
    <section class="land-widget-section">
      <div class="container">
        <header class="land-widget-intro">
          <div>
            <p class="eyebrow">{{ copy.eyebrow }}</p>
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

          <aside class="land-widget-list" :aria-label="copy.parcelsTitle">
            <div class="land-widget-list-head">
              <span class="land-widget-column-label">{{ copy.parcelsTitle }}</span>
              <b class="land-widget-count">{{ publishedParcels.length }}</b>
            </div>
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
            <div class="land-widget-media-head" :aria-label="copy.galleryTitle">
              <button
                v-for="item in availableGalleryItems"
                :key="item.key"
                type="button"
                :class="{ 'is-active': item.key === selectedVisual?.key }"
                @click="selectImage(item.key)"
              >{{ item.label }}</button>

              <a
                class="land-widget-earth-link"
                :href="parcels.config.earthProjectUrl"
                target="_blank"
                rel="noopener noreferrer"
              >{{ copy.openEarth }} ↗</a>
            </div>

            <div class="land-widget-main-visual">
              <img
                v-if="selectedVisual && !imageLoadError"
                :key="selectedVisual.src"
                :src="selectedVisual.src"
                :alt="`${selectedParcel?.ada}/${selectedParcel?.parsel} · ${selectedVisual.label}`"
                loading="eager"
                decoding="async"
                @error="imageLoadError = true"
              />

              <div v-else class="land-widget-image-fallback">
                <strong>{{ selectedParcel?.ada }}/{{ selectedParcel?.parsel }}</strong>
                <span>{{ copy.visualUnavailable }}</span>
                <a
                  class="button button-ghost"
                  :href="parcels.config.earthProjectUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ copy.openEarth }} ↗</a>
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

            <div class="land-widget-contact-block">
              <a
                class="button button-primary"
                :href="whatsappHref"
                target="_blank"
                rel="noopener noreferrer"
              >{{ copy.askInfo }}</a>
              <small>Ersen Filiz · +90 546 963 3690</small>
            </div>
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
      <a
        class="button button-primary"
        :href="whatsappHref"
        target="_blank"
        rel="noopener noreferrer"
      >{{ copy.askInfoShort }}</a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPublishedParcels, parcelTotalPrice, parcels } from '../lib/content.js'
import { locale, localize, t } from '../lib/locale.js'

const route = useRoute()
const router = useRouter()
const publishedParcels = getPublishedParcels()
const initialId = publishedParcels.some((parcel) => parcel.id === route.query.parsel)
  ? route.query.parsel
  : publishedParcels[0]?.id
const selectedId = ref(initialId)
const activeImageKey = ref('')
const imageLoadError = ref(false)
const whatsappMessage = 'Arsalar hk bilgi almak istiyorum'
const preferredImageKeys = ['googleEarth', 'arazi', 'uzay', 'imar', 'dokum', 'tumImar']

const copy = computed(() => locale.value === 'tr'
  ? {
      eyebrow: 'Aile taşınmazları',
      title: 'Kayran Parsel Bilgileri',
      parcelsTitle: 'Parseller',
      selected: 'Seçili parsel',
      salePrice: 'Satış fiyatı',
      askInfo: "WhatsApp'tan bilgi al",
      askInfoShort: 'WhatsApp',
      technicalTitle: 'Tapu ve imar bilgileri',
      technicalLead: 'Seçili parsele ait yayımlanmış temel bilgiler.',
      legalHeading: 'Önemli bilgilendirme',
      legalLead: 'Satış sürecine ilişkin esas açıklamalar aşağıda açıkça yer almaktadır.',
      openEarth: "Google Earth'te aç",
      galleryTitle: 'Harita ve parsel görselleri',
      visualUnavailable: 'Görsel yüklenemedi. Google Earth bağlantısından konumu inceleyebilirsiniz.',
      priceRule: 'Fiyat, tapu alanının tam m² kısmı × 5.000 TL kuralıyla hesaplanır.',
      officialCheck: 'Tapu, imar, yapılaşma ve uygulamaya ilişkin nihai ve güncel bilgiler ilgili kamu kurumlarından teyit edilmelidir.',
      noPaymentLong: 'Bu internet sayfası üzerinden kapora, satış bedeli veya başka bir taşınmaz ödemesi tahsil edilmez.',
    }
  : {
      eyebrow: 'Family-owned properties',
      title: 'Kayran Parcel Information',
      parcelsTitle: 'Parcels',
      selected: 'Selected parcel',
      salePrice: 'Sale price',
      askInfo: 'Ask via WhatsApp',
      askInfoShort: 'WhatsApp',
      technicalTitle: 'Title deed and zoning information',
      technicalLead: 'Published basic information for the selected parcel.',
      legalHeading: 'Important information',
      legalLead: 'The essential statements concerning the sale process are shown openly below.',
      openEarth: 'Open in Google Earth',
      galleryTitle: 'Map and parcel images',
      visualUnavailable: 'The image could not be loaded. You can inspect the location using the Google Earth link.',
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
const availableGalleryItems = computed(() => galleryItems.value.filter((item) => item.src))
const selectedVisual = computed(() =>
  availableGalleryItems.value.find((item) => item.key === activeImageKey.value)
  || availableGalleryItems.value[0]
  || null,
)
const whatsappHref = computed(() => `https://wa.me/905469633690?text=${encodeURIComponent(whatsappMessage)}`)

function setDefaultImage() {
  const images = selectedParcel.value?.images || {}
  activeImageKey.value = preferredImageKeys.find((key) => images[key]) || ''
  imageLoadError.value = false
}

function selectParcel(id) {
  if (id === selectedId.value) return
  selectedId.value = id
  router.replace({ query: { ...route.query, parsel: id } })
}

function selectImage(key) {
  activeImageKey.value = key
  imageLoadError.value = false
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

watch(selectedId, setDefaultImage, { immediate: true })

watch(
  () => route.query.parsel,
  (id) => {
    if (publishedParcels.some((parcel) => parcel.id === id)) selectedId.value = id
  },
)
</script>
