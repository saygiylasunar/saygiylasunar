<template>
  <div v-if="visible" ref="rootRef" class="tools-fab-shell" :class="{ 'is-open': open }">
    <Transition name="tools-pop">
      <aside v-if="open" id="tools-quick-panel" class="tools-quick-panel" aria-label="Mini tools">
        <header class="tools-quick-head">
          <div>
            <strong>{{ localize(tools.meta).floatingTitle }}</strong>
            <span>{{ localize(tools.meta).floatingNote }}</span>
          </div>
          <button type="button" class="tools-quick-close" aria-label="Close" @click="open = false">×</button>
        </header>

        <nav class="tools-quick-list" aria-label="Quick tools">
          <RouterLink
            v-for="tool in quickTools"
            :key="tool.slug"
            :to="tool.path"
            class="tools-quick-link"
          >
            <span class="tools-quick-glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span>{{ localize(tool.title) }}</span>
            <b aria-hidden="true">→</b>
          </RouterLink>
        </nav>

        <RouterLink class="tools-quick-all" to="/tools">
          {{ localize(tools.meta).viewAll }} →
        </RouterLink>
      </aside>
    </Transition>

    <button
      class="tools-fab"
      type="button"
      :aria-expanded="open"
      aria-controls="tools-quick-panel"
      :aria-label="localize(tools.meta).floatingTitle"
      @click="open = !open"
    >
      <span aria-hidden="true">T+</span>
      <small>{{ open ? '×' : 'TOOLS' }}</small>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import tools from '../content/tools.json'
import { localize } from '../lib/locale.js'

const route = useRoute()
const rootRef = ref(null)
const open = ref(false)
const visible = computed(() => !route.path.startsWith('/tools'))
const quickTools = tools.items.slice(0, 5)

function onPointerDown(event) {
  if (!open.value || rootRef.value?.contains(event.target)) return
  open.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') open.value = false
}

watch(() => route.fullPath, () => {
  open.value = false
})

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('keydown', onKeydown)
})
</script>
