<template>
  <div class="page-view lands-view">
    <section class="land-hero">
      <div class="container land-hero-inner">
        <p class="eyebrow">{{ t('lands.eyebrow') }}</p>
        <h1>{{ copy.title }}</h1>
        <p class="land-location-line">{{ parcels.config.mahalle }} · {{ parcels.config.ilce }} · {{ parcels.config.il }}</p>
        <p class="land-hero-intro">{{ copy.intro }}</p>
        <div class="land-trust-row" aria-label="Important information">
          <span>{{ copy.noBrokerage }}</span>
          <span>{{ copy.noCommission }}</span>
          <span>{{ copy.noPayment }}</span>
        </div>
      </div>
    </section>

    <section class="land-important section-tinted">
      <div class="container">
        <header class="land-simple-heading">
          <p class="eyebrow">{{ copy.importantEyebrow }}</p>
          <h2>{{ copy.importantTitle }}</h2>
        </header>

        <div class="land-disclaimer-grid">
          <article v-for="item in quickDisclaimers" :key="item.title" class="land-disclaimer-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.text }}</p>
          </article>
        </div>

        <p class="land-official-note">{{ copy.officialCheck }}</p>
      </div>
    </section>

    <section class="section land-picker-section">
      <div class="container">
        <header class="land-simple-heading">
          <p class="eyebrow">{{ copy.parcelsEyebrow }}</p>
          <h2>{{ copy.parcelsTitle }}</h2>
          <p>{{ copy.parcelsNote }}</p>
        </header>

        <div class="land-parcel-cards">
          <button
            v-for="parcel in publishedParcels"
            :key="parcel.id"
            type="button"
            class="land-parcel-card"
            :class="{ 'is-active': parcel.id === selectedId }"
            @click="selectParcel(parcel.id)"
          >
            <span class="land-parcel-label">{{ copy.parcelLabel }}</span>
            <strong>{{ parcel.ada }}/{{ parcel.parsel }}</strong>
            <div class="land-parcel-card-meta">
              <span>{{ formatArea(parcel.tapuAlanM2) }}</span>
              <b>{{ formatMoney(parcelTotalPrice(parcel)) }}</b>
            </div>
            <small>{{ t(`lands.statuses.${parcel.durum}`) }}</small>
          </button>
        </div>

        <details class="land-map-details">
          <summary>{{ copy.showMap }}</summary>
          <div class="parcel-schematic">
            <svg viewBox="0 0 720 340" role="img" :aria-label="copy.showMap">
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
            <small>{{ copy.mapNote }}</small>
          </div>
        </details>
      </div>
    </section>

    <section v-if="selectedParcel" class="section section-tinted land-selected-section">
      <div class="container">
        <div class="land-selected-card">
          <div class="land-selected-head">
            <div>
              <p class="eyebrow">{{ copy.selected }}</p>
              <h2>{{ selectedParcel.ada }}/{{ selectedParcel.parsel }}</h2>
            </div>
            <span class="status-pill">{{ t(`lands.statuses.${selectedParcel.durum}`) }}</span>
          </div>

          <div class="land-price-block">
            <span>{{ copy.salePrice }}</span>
            <strong>{{ formatMoney(totalPrice) }}</strong>
            <small>{{ copy.priceRule }}</small>
          </div>

          <div class="land-key-facts">
            <article>
              <span>{{ t('lands.area') }}</span>
              <strong>{{ formatArea(selectedParcel.tapuAlanM2) }}</strong>
            </article>
            <article>
              <span>{{ t('lands.location') }}</span>
              <strong>{{ parcels.config.mahalle }} / {{ parcels.config.ilce }}</strong>
            </article>
            <article>
              <span>{{ t('lands.unitPrice') }}</span>
              <strong>{{ formatMoney(parcels.config.fiyatM2) }} / m²</strong>
            </article>
          </div>

          <p class="land-selected-description">{{ localize(selectedParcel.description) }}</p>

          <a class="button button-primary land-primary-cta" :href="parcelMailHref">{{ copy.askInfo }}</a>

          <details class="land-technical-details">
            <summary>{{ copy.technicalTitle }}</summary>
            <div class="land-technical-content">
              <article>
                <strong>{{ t('lands.zoning') }}</strong>
                <p>{{ localize(selectedParcel.imarDurumu) }}</p>
              </article>
              <article>
                <strong>{{ t('lands.deed') }}</strong>
                <p>{{ localize(selectedParcel.tapuDurumu) }}</p>
              </article>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section v-if="selectedParcel" class="section land-gallery-section">
      <div class="container">
        <header class="land-simple-heading">
          <p class="eyebrow">{{ t('lands.galleryEyebrow') }}</p>
          <h2>{{ copy.photosTitle }}</h2>
        </header>

        <div class="parcel-gallery-grid land-gallery-grid">
          <article v-for="item in galleryItems" :key="item.key" class="parcel-gallery-card">
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

    <section class="section land-legal-section section-tinted">
      <div class="container narrow-container">
        <details class="land-legal-details">
          <summary>{{ copy.fullLegal }}</summary>
          <div class="land-legal-copy">
            <p v-for="paragraph in t('lands.legal')" :key="paragraph">{{ paragraph }}</p>
            <p><strong>{{ t('lands.representative') }}</strong></p>
            <p>{{ copy.noPaymentLong }}</p>
          </div>
        </details>
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
const schematicPoints = ['80,70 340,48 370,270 115,292', '395,58 650,88 625,292 375,265']

const copy = computed(() => locale.value === 'tr'
  ? {
      title: "Kayran'da Satılık Arsalar",
      intro: 'Satışa sunulan aile taşınmazlarını parsel parsel, açık fiyat ve temel bilgilerle inceleyebilirsiniz.',
      noBrokerage: 'Emlak aracılığı yok',
      noCommission: 'Komisyon yok',
      noPayment: 'Siteden kapora / ödeme alınmaz',
      importantEyebrow: 'Önce bunu bilin',
      importantTitle: 'Satış süreci nasıl yürütülüyor?',
      parcelsEyebrow: 'Satılık parseller',
      parcelsTitle: 'İlgilendiğiniz parsele dokunun',
      parcelsNote: 'Alanı ve satış fiyatını doğrudan görün. Ayrıntılar seçtiğiniz parselin altında açılır.',
      parcelLabel: 'Ada / Parsel',
      showMap: 'Parsel krokisini göster',
      mapNote: 'Bu kroki şimdilik seçim amaçlı temsili gösterimdir; resmî kadastro haritası değildir.',
      selected: 'Seçili parsel',
      salePrice: 'Satış fiyatı',
      priceRule: 'Fiyat, tapu alanının tam m² kısmı × 5.000 TL kuralıyla hesaplanır.',
      askInfo: 'Bu parsel için bilgi al',
      technicalTitle: 'Tapu ve imar bilgilerini göster',
      photosTitle: 'Fotoğraf ve belgeler',
      fullLegal: 'Ayrıntılı bilgilendirme ve hukuki açıklamalar',
      officialCheck: 'Tapu, imar, yapılaşma ve uygulamaya ilişkin nihai ve güncel bilgiler ilgili kamu kurumlarından teyit edilmelidir.',
      noPaymentLong: 'Bu internet sayfası üzerinden kapora, satış bedeli veya başka bir taşınmaz ödemesi tahsil edilmez.',
    }
  : {
      title: 'Land for Sale in Kayran',
      intro: 'Review the family-owned properties offered for sale with clear parcel, area and price information.',
      noBrokerage: 'No brokerage service',
      noCommission: 'No commission',
      noPayment: 'No deposit / payment on this site',
      importantEyebrow: 'Important first',
      importantTitle: 'How is the sale process handled?',
      parcelsEyebrow: 'Available parcels',
      parcelsTitle: 'Tap the parcel you are interested in',
      parcelsNote: 'See the registered area and sale price directly. Details open below the selected parcel.',
      parcelLabel: 'Block / Parcel',
      showMap: 'Show parcel sketch',
      mapNote: 'This sketch is currently a schematic selector and is not an official cadastral map.',
      selected: 'Selected parcel',
      salePrice: 'Sale price',
      priceRule: 'Price is calculated as the whole-number part of the registered m² × TRY 5,000.',
      askInfo: 'Ask about this parcel',
      technicalTitle: 'Show title deed and zoning information',
      photosTitle: 'Photos and documents',
      fullLegal: 'Detailed information and legal notice',
      officialCheck: 'Final and current title deed, zoning, construction and implementation information should be confirmed with the relevant public authorities.',
      noPaymentLong: 'No deposit, sale price or other real-estate payment is collected through this website.',
    })

const quickDisclaimers = computed(() => locale.value === 'tr'
  ? [
      {
        title: 'Aile taşınmazları',
        text: 'Bu sayfadaki taşınmazlar ilgili hak sahiplerinin bilgisi ve rızası dahilinde satışa sunulmaktadır.',
      },
      {
        title: 'Aracılık hizmeti değil',
        text: 'Bu sayfa üçüncü kişilere yönelik emlak aracılığı, komisyonculuk veya bağımsız ilan hizmeti sunmaz.',
      },
      {
        title: 'Resmî işlemler yetkili kişilerle',
        text: 'Satış, devir ve gerekli resmî işlemler hak sahipleri ile yetkili temsilci Tolga Yalçın aracılığıyla yürütülür.',
      },
    ]
  : [
      {
        title: 'Family-owned properties',
        text: 'The properties on this page are offered for sale with the knowledge and consent of the relevant right holders.',
      },
      {
        title: 'Not a brokerage service',
        text: 'This page does not provide real-estate brokerage, commission-based or independent listing services for third parties.',
      },
      {
        title: 'Official procedures through authorized parties',
        text: 'Sale, transfer and required official procedures are carried out through the right holders and authorized representative Tolga Yalçın.',
      },
    ])

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
