<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @click.self="close">
        <section class="intent-modal" role="dialog" aria-modal="true" :aria-labelledby="titleId">
          <button class="modal-close" type="button" :aria-label="t('common.close')" @click="close">×</button>
          <p class="eyebrow">{{ t('intent.eyebrow') }}</p>
          <h2 :id="titleId">{{ t('intent.title') }}</h2>

          <div class="intent-about">
            <p class="mini-title">{{ t('intent.aboutTitle') }}</p>
            <p>{{ t('intent.aboutOne') }}</p>
            <p>{{ t('intent.aboutTwo') }}</p>
          </div>

          <div class="intent-actions">
            <button class="intent-card intent-card-primary" type="button" @click="choose('/services')">
              <span>01</span>
              <strong>{{ t('intent.workTitle') }}</strong>
              <small>{{ t('intent.workText') }}</small>
            </button>
            <button class="intent-card" type="button" @click="choose('/about')">
              <span>02</span>
              <strong>{{ t('intent.knowTitle') }}</strong>
              <small>{{ t('intent.knowText') }}</small>
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '../i18n.js'

const router = useRouter()
const open = ref(false)
const titleId = 'intent-title'

function close() {
  open.value = false
  sessionStorage.setItem('intent-seen-v2', 'true')
}

function choose(path) {
  close()
  router.push(path)
}

function reopen() {
  open.value = true
}

onMounted(() => {
  if (!sessionStorage.getItem('intent-seen-v2')) {
    window.setTimeout(() => {
      open.value = true
    }, 350)
  }
  window.addEventListener('open-intent', reopen)
})

onUnmounted(() => window.removeEventListener('open-intent', reopen))
</script>
