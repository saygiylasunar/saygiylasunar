<template>
  <div class="draw-page">
    <header class="header">
      <h1>🎲 {{ pageTitle }}</h1>
      <p class="subtitle">
        Bu sayfa, iki kümedeki öğeleri rastgele ve tekil eşleştirir. Kod içinde
        açıklamalar ve imza mevcuttur.
      </p>
    </header>

    <!-- STEP 1: CONFIG -->
    <section class="card" :class="{ inactive: step > 1 }">
      <div class="card-head">
        <h2>1) Çekiliş Bilgileri</h2>
        <div class="actions">
          <button
            v-if="step === 1"
            class="btn primary"
            :disabled="!isConfigValid"
            @click="confirmConfig"
          >
            Onayla
          </button>
          <button v-else class="btn ghost" @click="backTo(1)">Geri dön</button>
        </div>
      </div>

      <div class="grid-2">
        <label class="field">
          <span>Çekiliş İsmi</span>
          <input
            v-model.trim="config.drawName"
            type="text"
            placeholder="Örn: Yeni Yıl Hediyeleri"
          />
        </label>
        <label class="field">
          <span>Eşleşme Adedi</span>
          <select v-model.number="config.pairCount">
            <option v-for="n in pairOptions" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </label>
        <label class="field">
          <span>A Kümesi Adı</span>
          <input
            v-model.trim="config.setALabel"
            type="text"
            placeholder="Örn: Kişiler"
          />
        </label>
        <label class="field">
          <span>B Kümesi Adı</span>
          <input
            v-model.trim="config.setBLabel"
            type="text"
            placeholder="Örn: Hediyeler"
          />
        </label>
      </div>
      <p class="hint">
        Onayladıktan sonra bu bölüm deaktif olur; gerekirse "Geri dön" ile
        tekrar düzenleyebilirsiniz.
      </p>
    </section>

    <!-- STEP 2: INPUTS -->
    <section class="card" :class="{ inactive: step > 2, dim: step < 2 }">
      <div class="card-head">
        <h2>2) Kümeleri Doldur</h2>
        <div class="actions">
          <button
            v-if="step === 2 && aLocked && bLocked"
            class="btn ghost"
            @click="backTo(2)"
          >
            Geri dön
          </button>
          <button v-else class="btn ghost" @click="backTo(1)">
            1. Aşamaya dön
          </button>
        </div>
      </div>

      <div class="columns">
        <!-- Set A -->
        <div class="col">
          <div class="col-head">
            <h3>{{ config.setALabel }} (A)</h3>
            <div class="col-actions">
              <button
                v-if="!aLocked"
                class="btn primary"
                :disabled="!isAValid"
                @click="lockA"
              >
                A Kümesini Onayla
              </button>
              <button v-else class="btn ghost" @click="unlockA">Düzenle</button>
            </div>
          </div>

          <div class="inputs" :class="{ disabled: aLocked }">
            <div v-for="(v, i) in setA" :key="'a-' + i" class="input-row">
              <span class="idx">{{ i + 1 }}</span>
              <input
                :disabled="aLocked || step !== 2"
                v-model.trim="setA[i]"
                type="text"
                :placeholder="aPlaceholder"
                @blur="touchA[i] = true"
              />
            </div>
          </div>
          <p class="subhint" v-if="!aLocked">
            B kümesi onaylanana kadar pasif kalır.
          </p>
        </div>

        <!-- Set B -->
        <div class="col" :class="{ disabled: !aLocked }">
          <div class="col-head">
            <h3>{{ config.setBLabel }} (B)</h3>
            <div class="col-actions">
              <button
                v-if="aLocked && !bLocked"
                class="btn primary"
                :disabled="!isBValid"
                @click="lockB"
              >
                B Kümesini Onayla
              </button>
              <button
                v-else-if="aLocked && bLocked"
                class="btn ghost"
                @click="unlockB"
              >
                Düzenle
              </button>
            </div>
          </div>

          <div
            class="inputs"
            :class="{ disabled: !aLocked || bLocked === true }"
          >
            <div v-for="(v, i) in setB" :key="'b-' + i" class="input-row">
              <span class="idx">{{ i + 1 }}</span>
              <input
                :disabled="!aLocked || bLocked || step !== 2"
                v-model.trim="setB[i]"
                type="text"
                :placeholder="bPlaceholder"
                @blur="touchB[i] = true"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="step === 2 && aLocked && bLocked" class="proceed">
        <button class="btn success" @click="goToStep(3)">Devam Et</button>
      </div>
    </section>

    <!-- STEP 3: DRAW -->
    <section class="card" :class="{ dim: step < 3 }">
      <div class="card-head">
        <h2>3) Eşleştir ve Kaydet</h2>
        <div class="actions">
          <button class="btn ghost" @click="backTo(2)">2. Aşamaya dön</button>
        </div>
      </div>

      <div class="draw-panel">
        <button
          class="btn primary big"
          :disabled="step !== 3"
          @click="performDraw"
        >
          Eşleştir (Çekiliş Yap)
        </button>
        <p class="hint">
          Bu tuşa her bastığınızda yeni bir rastgele eşleşme seti oluşturulur ve
          aşağıya eklenir.
        </p>
      </div>

      <div class="results" v-if="results.length">
        <h3>Sonuçlar</h3>
        <ol class="result-list">
          <li v-for="(r, idx) in results" :key="r.id" class="result-item">
            <div class="row">
              <strong>Satır {{ idx + 1 }}. Çekiliş</strong>
              <span class="ts">{{ r.timestamp }}</span>
            </div>
            <div class="pairs">
              <div v-for="(pair, i) in r.pairs" :key="i" class="pair">
                <span class="token a">{{ pair[0] }}</span>
                <span class="sep">—</span>
                <span class="token b">{{ pair[1] }}</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <footer class="footer">
      <details>
        <summary>Şeffaflık Beyanı ve İmza</summary>
        <div class="disclosure">
          <p>
            Rastgelelik <code>window.crypto.getRandomValues</code> üzerinden
            üretilen sayılarla sağlanır; eşleşmeler her iki kümenin bütün
            öğelerini tam ve tekil kullanacak şekilde oluşturulur (B kümesi
            rastgele permüte edilir ve A sırası ile eşleştirilir).
          </p>
          <p class="sig">
            İmza: <strong>Ersen FİLİZ Saygıyla Sunar</strong> — Kaynak kodu
            açıklamalı ve okunabilir yazılmıştır.
          </p>
        </div>
      </details>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * Çekiliş Sayfası (Cekilis.vue)
 * -------------------------------------------------------------
 * Şeffaflık ve Doğrulanabilirlik:
 * - Eşleştirme, A ve B kümelerinin boyutu eşitlenip onaylandıktan sonra yapılır.
 * - Rastgelelik güvenli sayılabilecek bir kaynakla (window.crypto) üretilir.
 * - Her çekilişte B kümesi Fisher–Yates ile karıştırılır, A sırasıyla eşlenir.
 * - Her eleman her çekilişte en fazla bir kez kullanılır (tekil eşleşme).
 * - Kod sade, yorumlu ve incelenebilir tutulmuştur.
 *
 * İmza: Ersen FİLİZ Saygıyla Sunar
 * -------------------------------------------------------------
 */
import { computed, reactive, ref, watch } from 'vue';

// ——— Step State ———
const step = ref<1 | 2 | 3>(1);
function goToStep(n: 1 | 2 | 3) {
  step.value = n;
}
function backTo(n: 1 | 2 | 3) {
  step.value = n;
}

// ——— Config (Step 1) ———
const pairOptions = Array.from({ length: 50 }, (_, i) => i + 1); // 1..50 arası
const config = reactive({
  drawName: '',
  pairCount: 3,
  setALabel: 'Kişiler',
  setBLabel: 'Materyaller',
});

const isConfigValid = computed(
  () =>
    config.pairCount > 0 &&
    config.setALabel.trim().length >= 1 &&
    config.setBLabel.trim().length >= 1
);
function confirmConfig() {
  if (!isConfigValid.value) return;
  // boyuta göre input dizilerini hazırla
  setA.value = Array.from({ length: config.pairCount }, () => '');
  setB.value = Array.from({ length: config.pairCount }, () => '');
  touchA.value = Array.from({ length: config.pairCount }, () => false);
  touchB.value = Array.from({ length: config.pairCount }, () => false);
  aLocked.value = false;
  bLocked.value = false;
  goToStep(2);
}

// ——— Inputs (Step 2) ———
const setA = ref<string[]>([]);
const setB = ref<string[]>([]);
const touchA = ref<boolean[]>([]);
const touchB = ref<boolean[]>([]);
const aLocked = ref(false);
const bLocked = ref(false);

const MIN_LEN = 3;

const isAValid = computed(
  () =>
    setA.value.length === config.pairCount &&
    setA.value.every((s) => (s?.trim().length || 0) >= MIN_LEN)
);
const isBValid = computed(
  () =>
    setB.value.length === config.pairCount &&
    setB.value.every((s) => (s?.trim().length || 0) >= MIN_LEN)
);

function lockA() {
  if (isAValid.value) aLocked.value = true;
}
function unlockA() {
  aLocked.value = false;
}
function lockB() {
  if (aLocked.value && isBValid.value) bLocked.value = true;
}
function unlockB() {
  if (aLocked.value) bLocked.value = false;
}

watch(
  () => config.pairCount,
  () => {
    // config değişirse mevcut girdileri yeni boyuta uydur
    const len = config.pairCount;
    setA.value = (setA.value || []).slice(0, len);
    while (setA.value.length < len) setA.value.push('');
    setB.value = (setB.value || []).slice(0, len);
    while (setB.value.length < len) setB.value.push('');
    touchA.value = Array.from({ length: len }, (_, i) =>
      Boolean(touchA.value?.[i])
    );
    touchB.value = Array.from({ length: len }, (_, i) =>
      Boolean(touchB.value?.[i])
    );
  }
);

// ——— Step 3: Draw ———
interface DrawRecord {
  id: string;
  timestamp: string;
  pairs: [string, string][];
}
const results = ref<DrawRecord[]>([]);

function performDraw() {
  if (step.value !== 3) return;
  if (!aLocked.value || !bLocked.value) return;
  // Güvenli random ile B kümesini permüte et ve A ile sırayla eşleştir
  const a = [...setA.value];
  const b = shuffle([...setB.value]);
  const pairs: [string, string][] = a.map((av, i) => [av, b[i]]);
  const rec: DrawRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleString(),
    pairs,
  };
  results.value.unshift(rec);
}

function shuffle<T>(arr: T[]): T[] {
  // Fisher–Yates + window.crypto tabanlı karıştırma
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function secureRandomInt(min: number, max: number): number {
  // [min, max] aralığında tam sayı — bias azaltmak için 32-bit rastgelelik ve yeniden örnekleme
  const range = max - min + 1;
  if (range <= 0) return min;
  const maxUnbiased = Math.floor(0x100000000 / range) * range - 1;
  const u32 = new Uint32Array(1);
  let r: number;
  do {
    crypto.getRandomValues(u32);
    r = u32[0];
  } while (r > maxUnbiased);
  return min + (r % range);
}

const pageTitle = computed(() =>
  config.drawName?.trim() ? `Çekiliş: ${config.drawName}` : 'Çekiliş'
);

const aPlaceholder = 'Lütfen İsim/Değer Giriniz ✍️';
const bPlaceholder = 'Lütfen İsim/Değer Giriniz 🎁';
</script>

<style scoped>
:root {
  color-scheme: dark light;
}
* {
  box-sizing: border-box;
}
.draw-page {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem 4rem;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
    'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
}
.header h1 {
  margin: 0;
  font-size: 1.8rem;
}
.subtitle {
  opacity: 0.7;
  margin-top: 0.25rem;
}

.card {
  background: var(--card-bg, #0f172a0d);
  border: 1px solid #36415233;
  border-radius: 16px;
  padding: 1rem;
  margin-top: 1rem;
  backdrop-filter: blur(4px);
}
.card.inactive {
  opacity: 0.6;
  pointer-events: none;
}
.card.dim {
  opacity: 0.6;
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.card-head h2 {
  margin: 0;
  font-size: 1.2rem;
}
.actions {
  display: flex;
  gap: 0.5rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field > span {
  font-size: 0.9rem;
  opacity: 0.85;
}
.field input,
.field select {
  width: 100%;
  padding: 0.6rem 0.7rem;
  border-radius: 10px;
  border: 1px solid #33415555;
  background: #0b122033;
  color: inherit;
  outline: none;
}
.field input:focus,
.field select:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px #3b82f633;
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.col {
  border: 1px dashed #47556955;
  border-radius: 12px;
  padding: 0.75rem;
}
.col.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.col-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.col-head h3 {
  margin: 0;
}

.inputs {
  display: grid;
  gap: 0.5rem;
}
.inputs.disabled {
  opacity: 0.7;
  pointer-events: none;
}
.input-row {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 0.5rem;
  align-items: center;
}
.idx {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #64748b33;
  font-size: 0.85rem;
}
.input-row input {
  padding: 0.55rem 0.65rem;
  border-radius: 10px;
  border: 1px solid #33415555;
  background: #0b122033;
  color: inherit;
}

.proceed {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
}

.draw-panel {
  display: grid;
  gap: 0.5rem;
  justify-items: start;
}
.btn {
  border: 1px solid #33415566;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  background: #0b122033;
  color: inherit;
}
.btn.primary {
  border-color: #60a5fa;
}
.btn.success {
  border-color: #34d399;
}
.btn.ghost {
  background: transparent;
}
.btn.big {
  font-size: 1.05rem;
  padding: 0.7rem 1rem;
  border-width: 2px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  opacity: 0.7;
  font-size: 0.9rem;
}
.subhint {
  opacity: 0.7;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.results {
  margin-top: 1rem;
}
.result-list {
  display: grid;
  gap: 0.75rem;
  padding-left: 1rem;
}
.result-item {
  border: 1px solid #33415555;
  border-radius: 12px;
  padding: 0.75rem;
  list-style: none;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.ts {
  opacity: 0.7;
  font-size: 0.85rem;
}
.pairs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.35rem 0.75rem;
  margin-top: 0.5rem;
}
.pair {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  background: #0b122033;
  border: 1px solid #33415555;
}
.token {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.token.a::before {
  content: 'A';
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background: #60a5fa33;
  border: 1px solid #60a5fa66;
  font-size: 0.7rem;
}
.token.b::before {
  content: 'B';
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background: #34d39933;
  border: 1px solid #34d39966;
  font-size: 0.7rem;
}
.sep {
  opacity: 0.65;
}

.footer {
  margin-top: 2rem;
  opacity: 0.9;
}
.disclosure {
  padding: 0.5rem 0;
}

@media (max-width: 760px) {
  .grid-2,
  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
