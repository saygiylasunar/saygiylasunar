<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <IntentModal />
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import IntentModal from './components/IntentModal.vue'
import { locale, t } from './i18n.js'

const route = useRoute()

watchEffect(() => {
  locale.value
  const titleKey = route.meta.title
  const label = titleKey && titleKey !== 'home' ? t(`nav.${titleKey}`, '') : ''
  document.title = label ? `${label} — ${t('meta.title')}` : t('meta.title')
  document.documentElement.lang = locale.value
})
</script>
