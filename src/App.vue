<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <IntentModal v-if="route.name !== 'lands' && route.name !== 'ogg' && route.name !== 'ogg-lesson'" />
    <LandsFab v-if="route.name !== 'ogg' && route.name !== 'ogg-lesson'" />
    <ToolsFab v-if="route.name !== 'ogg' && route.name !== 'ogg-lesson'" />
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import IntentModal from './components/IntentModal.vue'
import LandsFab from './components/LandsFab.vue'
import ToolsFab from './components/ToolsFab.vue'
import { locale } from './lib/locale.js'
import { applyRouteSeo } from './lib/seo.js'

const route = useRoute()

watchEffect(() => {
  route.fullPath
  locale.value

  document.documentElement.dataset.section = route.meta.section || 'studio'
  applyRouteSeo(route, locale.value)
})
</script>
