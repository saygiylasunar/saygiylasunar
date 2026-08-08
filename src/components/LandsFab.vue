<template>
  <RouterLink
    v-if="visible"
    class="lands-fab"
    to="/arsalar"
    :aria-label="label"
  >
    <span class="lands-fab-icon" aria-hidden="true">⌖</span>
    <span class="lands-fab-copy">
      <strong>{{ label }}</strong>
      <small>{{ note }}</small>
    </span>
    <span class="lands-fab-arrow" aria-hidden="true">→</span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { locale } from '../lib/locale.js'

const route = useRoute()
const visible = computed(() => route.path !== '/arsalar')
const label = computed(() => locale.value === 'tr' ? 'ARSALAR' : 'LANDS')
const note = computed(() => locale.value === 'tr' ? 'Satılık parseller' : 'Parcels for sale')
</script>
