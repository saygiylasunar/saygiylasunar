<template>
  <section class="v5-hero-lab" :data-direction="direction">
    <div class="container v5-lab-switcher" aria-label="V5 hero direction prototype">
      <span>{{ copy.prototype }}</span>
      <div>
        <button
          v-for="option in directions"
          :key="option.id"
          type="button"
          :class="{ 'is-active': direction === option.id }"
          :aria-pressed="direction === option.id"
          @click="direction = option.id"
        >
          <b>{{ option.id }}</b>
          <span>{{ option.label }}</span>
        </button>
      </div>
    </div>

    <div v-if="direction === 'A'" class="container v5-stage v5-stage-a">
      <div class="v5-a-author">
        <p class="v5-kicker">{{ copy.authorKicker }}</p>
        <h1><span>Ersen</span><span>Filiz</span></h1>
        <p class="v5-orientation">{{ copy.orientation }}</p>
        <div class="v5-actions">
          <RouterLink to="/projects">{{ copy.archive }} <span aria-hidden="true">→</span></RouterLink>
          <a :href="projectMailHref">{{ copy.contact }}</a>
        </div>
      </div>

      <aside class="v5-current-sheet" aria-label="Current work">
        <div class="v5-sheet-head">
          <span>{{ copy.current }}</span>
          <b>S/</b>
        </div>
        <dl>
          <div v-for="row in copy.currentRows" :key="row[0]">
            <dt>{{ row[0] }}</dt>
            <dd>{{ row[1] }}</dd>
          </div>
        </dl>
        <div class="v5-sheet-foot">
          <span>{{ copy.active }}</span>
          <span>saygiylasunar.com</span>
        </div>
      </aside>
    </div>

    <div v-else-if="direction === 'B'" class="container v5-stage v5-stage-b">
      <div class="v5-console-intro">
        <p class="v5-kicker">EF / 2026</p>
        <h1>{{ site.brand.name }}</h1>
        <p class="v5-orientation">{{ copy.orientation }}</p>
        <div class="v5-actions">
          <RouterLink to="/projects">{{ copy.archive }} <span aria-hidden="true">→</span></RouterLink>
          <a :href="projectMailHref">{{ copy.contact }}</a>
        </div>
      </div>

      <div class="v5-console-grid">
        <section class="v5-console-cell v5-console-current">
          <span class="v5-cell-label">CURRENT</span>
          <strong>{{ copy.consoleTitle }}</strong>
          <p>{{ copy.consoleSub }}</p>
        </section>

        <section class="v5-console-cell v5-console-threads">
          <span class="v5-cell-label">{{ copy.threads }}</span>
          <ol>
            <li v-for="(row, index) in copy.currentRows" :key="row[1]">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <small>{{ row[0] }}</small>
                <strong>{{ row[1] }}</strong>
              </div>
            </li>
          </ol>
        </section>

        <div class="v5-console-status">
          <span>{{ copy.lastUpdated }}</span>
          <span><i></i>{{ copy.active }}</span>
        </div>
      </div>
    </div>

    <div v-else class="container v5-stage v5-stage-c">
      <div class="v5-c-author">
        <p class="v5-kicker">EF / AUTHOR</p>
        <h1>{{ site.brand.name }}</h1>
        <p class="v5-orientation">{{ copy.orientation }}</p>
        <div class="v5-c-index">
          <div v-for="row in copy.currentRows" :key="row[1]">
            <span>{{ row[0] }}</span>
            <strong>{{ row[1] }}</strong>
          </div>
        </div>
        <div class="v5-actions">
          <RouterLink to="/projects">{{ copy.archive }} <span aria-hidden="true">→</span></RouterLink>
          <a :href="projectMailHref">{{ copy.contact }}</a>
        </div>
      </div>

      <figure class="v5-artifact">
        <figcaption>
          <span>{{ copy.artifactKicker }}</span>
          <strong>{{ copy.artifactTitle }}</strong>
        </figcaption>

        <div class="v5-artifact-stage" aria-hidden="true">
          <div class="v5-pixel-source">
            <span
              v-for="cell in 64"
              :key="cell"
              :class="{ 'is-on': sourcePixels.includes(cell) }"
            ></span>
          </div>
          <div class="v5-artifact-process">
            <span>{{ copy.input }}</span>
            <i>→</i>
            <span>{{ copy.process }}</span>
            <i>→</i>
            <span>{{ copy.output }}</span>
          </div>
          <div class="v5-pixel-output">
            <span
              v-for="cell in 64"
              :key="cell"
              :class="{ 'is-on': outputPixels.includes(cell) }"
            ></span>
          </div>
        </div>

        <p>{{ copy.artifactText }}</p>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { site } from '../lib/content.js'
import { locale } from '../lib/locale.js'
import { getV5HeroCopy } from '../content/v5Home.js'

const props = defineProps({
  projectMailHref: {
    type: String,
    required: true,
  },
})

const directions = [
  { id: 'A', label: 'Editorial' },
  { id: 'B', label: 'Console' },
  { id: 'C', label: 'Artifact' },
]

const storedDirection = localStorage.getItem('v5-hero-direction')
const direction = ref(directions.some((item) => item.id === storedDirection) ? storedDirection : 'A')
const copy = computed(() => getV5HeroCopy(locale.value))

const sourcePixels = [3, 4, 11, 12, 18, 19, 20, 27, 28, 29, 35, 36, 37, 43, 44, 51, 52, 59]
const outputPixels = [4, 5, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 35, 36, 37, 44, 45, 52]

watch(direction, (value) => localStorage.setItem('v5-hero-direction', value))
</script>

<style scoped src="../styles/v5-hero-lab.css"></style>
