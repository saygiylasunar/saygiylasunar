<template>
  <div class="page-view tools-view">
    <section class="page-hero compact-hero">
      <div class="container narrow-container">
        <p class="eyebrow">{{ localize(tools.meta).eyebrow }}</p>
        <h1>{{ localize(tools.meta).title }}</h1>
        <p>{{ localize(tools.meta).intro }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container tools-grid">
        <RouterLink v-for="tool in tools.items" :key="tool.slug" class="tool-card" :to="tool.path" v-reveal>
          <div class="tool-card-top">
            <span class="tool-card-index">{{ tool.index }}</span>
            <span class="tool-card-glyph" aria-hidden="true">{{ tool.glyph }}</span>
          </div>
          <h2>{{ localize(tool.title) }}</h2>
          <p>{{ localize(tool.description) }}</p>
          <strong>{{ t('common.openTool') }} →</strong>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import tools from '../content/tools.json'
import { localize, t } from '../lib/locale.js'
</script>
