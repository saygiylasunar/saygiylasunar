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
    <IntentModal />
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import IntentModal from './components/IntentModal.vue'
import { getProject, getService } from './lib/content.js'
import { locale, localize, t } from './lib/locale.js'

const route = useRoute()

function ensureMeta(selector, attribute, value) {
  const element = document.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

function routeTitle() {
  if (route.name === 'service-detail') return localize(getService(route.params.slug)?.title)
  if (route.name === 'project-detail') return localize(getProject(route.params.slug)?.title)
  if (route.name === 'home') return ''
  return t(`meta.${route.meta.title || ''}`, '')
}

function routeDescription() {
  if (route.name === 'service-detail') {
    return localize(getService(route.params.slug)?.short) || t('meta.description')
  }
  if (route.name === 'project-detail') {
    return localize(getProject(route.params.slug)?.summary) || t('meta.description')
  }
  return t('meta.description')
}

watchEffect(() => {
  locale.value
  route.fullPath

  const title = routeTitle()
  const description = routeDescription()
  const siteTitle = t('meta.title')
  const fullTitle = title ? `${title} — ${siteTitle}` : siteTitle
  const canonical = `${window.location.origin}${route.path}`

  document.title = fullTitle
  document.documentElement.lang = locale.value
  ensureMeta('meta[name="description"]', 'content', description)
  ensureMeta('meta[property="og:title"]', 'content', fullTitle)
  ensureMeta('meta[property="og:description"]', 'content', description)
  ensureMeta('meta[property="og:url"]', 'content', canonical)
  ensureMeta('link[rel="canonical"]', 'href', canonical)
})
</script>
