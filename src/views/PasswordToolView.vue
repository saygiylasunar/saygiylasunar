<template>
  <section class="page-hero compact-hero">
    <div class="container narrow-container">
      <p class="eyebrow">{{ t('password.eyebrow') }}</p>
      <h1>{{ t('password.title') }}</h1>
      <p>{{ t('password.intro') }}</p>
    </div>
  </section>

  <section class="section">
    <div class="container narrow-container">
      <div class="password-tool" v-reveal>
        <div class="password-output">
          <code>{{ password }}</code>
          <button type="button" @click="copyPassword">{{ copied ? t('password.copied') : t('password.copy') }}</button>
        </div>

        <label class="range-control">
          <span>{{ t('password.length') }}: <strong>{{ length }}</strong></span>
          <input v-model.number="length" type="range" min="8" max="48" step="1" @input="generatePassword" />
        </label>

        <div class="option-grid">
          <label><input v-model="options.lowercase" type="checkbox" @change="generatePassword" /> {{ t('password.lowercase') }}</label>
          <label><input v-model="options.uppercase" type="checkbox" @change="generatePassword" /> {{ t('password.uppercase') }}</label>
          <label><input v-model="options.numbers" type="checkbox" @change="generatePassword" /> {{ t('password.numbers') }}</label>
          <label><input v-model="options.symbols" type="checkbox" @change="generatePassword" /> {{ t('password.symbols') }}</label>
        </div>

        <p v-if="error" class="tool-error">{{ t('password.error') }}</p>
        <button class="button button-primary full-button" type="button" @click="generatePassword">
          {{ t('password.generate') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { t } from '../i18n.js'

const groups = {
  lowercase: 'abcdefghijkmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  numbers: '23456789',
  symbols: '!@#$%&*+-_=?.',
}

const length = ref(20)
const password = ref('')
const copied = ref(false)
const error = ref(false)
const options = reactive({
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: false,
})

function secureIndex(max) {
  if (max <= 0) return 0
  const limit = Math.floor(0x100000000 / max) * max
  const buffer = new Uint32Array(1)
  do {
    crypto.getRandomValues(buffer)
  } while (buffer[0] >= limit)
  return buffer[0] % max
}

function shuffle(value) {
  const characters = [...value]
  for (let index = characters.length - 1; index > 0; index -= 1) {
    const randomIndex = secureIndex(index + 1)
    ;[characters[index], characters[randomIndex]] = [characters[randomIndex], characters[index]]
  }
  return characters.join('')
}

function generatePassword() {
  copied.value = false
  const selectedGroups = Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => groups[key])

  if (!selectedGroups.length) {
    error.value = true
    password.value = '—'
    return
  }

  error.value = false
  const required = selectedGroups.map((group) => group[secureIndex(group.length)])
  const pool = selectedGroups.join('')
  const remaining = Array.from(
    { length: Math.max(0, length.value - required.length) },
    () => pool[secureIndex(pool.length)],
  )
  password.value = shuffle([...required, ...remaining].join('')).slice(0, length.value)
}

async function copyPassword() {
  if (!password.value || password.value === '—') return
  await navigator.clipboard.writeText(password.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}

onMounted(generatePassword)
</script>
