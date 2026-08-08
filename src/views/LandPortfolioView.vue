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
              <button
                v-if="selectedVisual && !imageLoadError"
                :key="selectedVisual.src"
                type="button"
                class="land-widget-image-open"
                :aria-label="`${copy.openLarge}: ${selectedVisual.label}`"
                @click="openLightbox"
              >
                <img
                  :src="selectedVisual.src"
                  :alt="`${selectedParcel?.ada}/${selectedParcel?.parsel} · ${selectedVisual.label}`"
                  loading="eager"
                  decoding="async"
                  @error="imageLoadError = true"
                />
                <span class="land-widget-expand-hint">{{ copy.openLarge }} ↗</span>
              </button>

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

    <div
      v-if="lightboxOpen && selectedVisual"
      class="land-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="copy.viewerTitle"
    >
      <header class="land-lightbox-head">
        <div>
          <strong>{{ selectedParcel?.ada }}/{{ selectedParcel?.parsel }}</strong>
          <span>{{ selectedVisual.label }}</span>
        </div>
        <div class="land-lightbox-controls">
          <button type="button" :aria-label="copy.zoomOut" :disabled="zoom <= 1" @click="zoomBy(-0.25)">−</button>
          <button type="button" class="land-lightbox-zoom" :aria-label="copy.resetZoom" @click="resetTransform">{{ Math.round(zoom * 100) }}%</button>
          <button type="button" :aria-label="copy.zoomIn" :disabled="zoom >= 5" @click="zoomBy(0.25)">+</button>
          <button type="button" class="land-lightbox-close" :aria-label="copy.closeViewer" @click="closeLightbox">×</button>
        </div>
      </header>

      <button
        v-if="availableGalleryItems.length > 1"
        type="button"
        class="land-lightbox-nav is-prev"
        :aria-label="copy.previousImage"
        @click="cycleImage(-1)"
      >‹</button>

      <div
        class="land-lightbox-canvas"
        :class="{ 'is-zoomed': zoom > 1, 'is-dragging': dragging }"
        @wheel.prevent="onLightboxWheel"
        @pointerdown="startPan"
        @pointermove="movePan"
        @pointerup="endPan"
        @pointercancel="endPan"
      >
        <img
          :key="`lightbox-${selectedVisual.src}`"
          :src="selectedVisual.src"
          :alt="`${selectedParcel?.ada}/${selectedParcel?.parsel} · ${selectedVisual.label}`"
          :style="lightboxImageStyle"
          draggable="false"
        />
      </div>

      <button
        v-if="availableGalleryItems.length > 1"
        type="button"
        class="land-lightbox-nav is-next"
        :aria-label="copy.nextImage"
        @click="cycleImage(1)"
      >›</button>

      <footer class="land-lightbox-foot">
        <span>{{ copy.viewerHelp }}</span>
        <div class="land-lightbox-dots" :aria-label="copy.galleryTitle">
          <button
            v-for="item in availableGalleryItems"
            :key="`lightbox-${item.key}`"
            type="button"
            :class="{ 'is-active': item.key === selectedVisual.key }"
            :aria-label="item.label"
            @click="selectImage(item.key)"
          ></button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
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
const lightboxOpen = ref(false)
const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const dragging = ref(false)
const whatsappMessage = 'Arsalar hk bilgi almak istiyorum'
const preferredImageKeys = ['googleEarth', 'arazi', 'uzay', 'imar', 'dokum', 'tumImar']
let dragOrigin = { x: 0, y: 0, panX: 0, panY: 0 }
let previousBodyOverflow = ''

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
      openLarge: 'Büyük görüntü',
      viewerTitle: 'Parsel görsel görüntüleyici',
      zoomIn: 'Yakınlaştır',
      zoomOut: 'Uzaklaştır',
      resetZoom: 'Yakınlaştırmayı sıfırla',
      closeViewer: 'Görüntüleyiciyi kapat',
      previousImage: 'Önceki görsel',
      nextImage: 'Sonraki görsel',
      viewerHelp: 'Tekerlek ile yakınlaştır · Yakınken sürükle · ← → ile görsel değiştir · Esc ile kapat',
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
      openLarge: 'Open large',
      viewerTitle: 'Parcel image viewer',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      resetZoom: 'Reset zoom',
      closeViewer: 'Close viewer',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      viewerHelp: 'Wheel to zoom · Drag while zoomed · ← → to change image · Esc to close',
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
const lightboxImageStyle = computed(() => ({
  transform: `translate3d(${panX.value}px, ${panY.value}px, 0) scale(${zoom.value})`,
}))

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
  resetTransform()
}

function openLightbox() {
  if (!selectedVisual.value || imageLoadError.value) return
  resetTransform()
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  lightboxOpen.value = true
}

function closeLightbox() {
  if (!lightboxOpen.value) return
  lightboxOpen.value = false
  dragging.value = false
  document.body.style.overflow = previousBodyOverflow
  resetTransform()
}

function resetTransform() {
  zoom.value = 1
  panX.value = 0
  panY.value = 0
}

function setZoom(nextZoom) {
  zoom.value = Math.min(5, Math.max(1, nextZoom))
  if (zoom.value === 1) {
    panX.value = 0
    panY.value = 0
  }
}

function zoomBy(delta) {
  setZoom(zoom.value + delta)
}

function onLightboxWheel(event) {
  zoomBy(event.deltaY < 0 ? 0.25 : -0.25)
}

function startPan(event) {
  if (zoom.value <= 1) return
  dragging.value = true
  dragOrigin = {
    x: event.clientX,
    y: event.clientY,
    panX: panX.value,
    panY: panY.value,
  }
  event.currentTarget.setPointerCapture?.(event.pointerId)
}

function movePan(event) {
  if (!dragging.value) return
  panX.value = dragOrigin.panX + event.clientX - dragOrigin.x
  panY.value = dragOrigin.panY + event.clientY - dragOrigin.y
}

function endPan(event) {
  if (!dragging.value) return
  dragging.value = false
  event.currentTarget.releasePointerCapture?.(event.pointerId)
}

function cycleImage(direction) {
  const items = availableGalleryItems.value
  if (items.length < 2 || !selectedVisual.value) return
  const currentIndex = items.findIndex((item) => item.key === selectedVisual.value.key)
  const nextIndex = (currentIndex + direction + items.length) % items.length
  selectImage(items[nextIndex].key)
}

function onKeydown(event) {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') cycleImage(-1)
  if (event.key === 'ArrowRight') cycleImage(1)
  if (event.key === '+' || event.key === '=') zoomBy(0.25)
  if (event.key === '-') zoomBy(-0.25)
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

watch(selectedId, () => {
  setDefaultImage()
  closeLightbox()
}, { immediate: true })

watch(
  () => route.query.parsel,
  (id) => {
    if (publishedParcels.some((parcel) => parcel.id === id)) selectedId.value = id
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (lightboxOpen.value) document.body.style.overflow = previousBodyOverflow
})
</script>
