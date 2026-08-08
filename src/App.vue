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
    <IntentModal v-if="route.name !== 'lands'" />
    <LandsFab />
    <ToolsFab />
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
import { getProject, getService } from './lib/content.js'
import { locale, localize, t } from './lib/locale.js'

const route = useRoute()

function ensureMeta(selector, attribute, value) {
  const element = document.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

function baseDescription() {
  return locale.value === 'tr'
    ? 'Ersen Filiz Saygıyla Sunar; Ersen Filiz’in yazılım, yapay zekâ, tasarım ve yaratıcı teknoloji çalışmalarını, Saygıyla Sunar sanatçı adıyla yayımlanan müziklerle bir araya getirir.'
    : 'Ersen Filiz Saygıyla Sunar brings together Ersen Filiz’s software, artificial intelligence, design and creative technology work with music released under the artist name Saygıyla Sunar.'
}

function routeTitle() {
  if (route.name === 'service-detail') return localize(getService(route.params.slug)?.title)
  if (route.name === 'project-detail') return localize(getProject(route.params.slug)?.title)
  if (route.name === 'music') return locale.value === 'tr' ? 'Müzik · Saygıyla Sunar' : 'Music · Saygıyla Sunar'
  if (route.name === 'home') return ''
  return t(`meta.${route.meta.title || ''}`, '')
}

function routeDescription() {
  if (route.name === 'service-detail') {
    return localize(getService(route.params.slug)?.short) || baseDescription()
  }
  if (route.name === 'project-detail') {
    return localize(getProject(route.params.slug)?.summary) || baseDescription()
  }
  if (route.name === 'music') {
    return locale.value === 'tr'
      ? 'Saygıyla Sunar, Ersen Filiz’in müzik yayınlarında kullandığı sanatçı adıdır. Spotify, YouTube Music ve Apple Music dinleme bağlantılarına buradan ulaşabilirsiniz.'
      : 'Saygıyla Sunar is the artist name used by Ersen Filiz for music releases. Find Spotify, YouTube Music and Apple Music listening links here.'
  }
  return baseDescription()
}

watchEffect(() => {
  locale.value
  route.fullPath

  const title = routeTitle()
  const description = routeDescription()
  const siteTitle = 'Ersen Filiz Saygıyla Sunar'
  const fullTitle = title ? `${title} — ${siteTitle}` : `${siteTitle} — Yazılım, Yapay Zekâ, Tasarım ve Müzik`
  const canonical = `${window.location.origin}${route.path}`

  document.title = fullTitle
  document.documentElement.lang = locale.value
  ensureMeta('meta[name="description"]', 'content', description)
  ensureMeta('meta[name="author"]', 'content', 'Ersen Filiz')
  ensureMeta('meta[property="og:title"]', 'content', fullTitle)
  ensureMeta('meta[property="og:description"]', 'content', description)
  ensureMeta('meta[property="og:url"]', 'content', canonical)
  ensureMeta('meta[name="twitter:title"]', 'content', fullTitle)
  ensureMeta('meta[name="twitter:description"]', 'content', description)
  ensureMeta('link[rel="canonical"]', 'href', canonical)
})
</script>
