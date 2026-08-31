<template>
  <div class="page-view ogg-view">
    <section class="ogg-hero">
      <div class="container ogg-hero-grid">
        <div>
          <p class="eyebrow">ÖGG · Silahlı Özel Güvenlik</p>
          <h1>Kurs Programı</h1>
          <p class="ogg-lead">
            ÖGYS ekranındaki tekrarları sadeleştirilmiş bloklara dönüştürdüm. Saat, ders,
            eğitmen ve sınıf bilgileri tek bakışta görülebilir; istersen 40 dakikalık
            ders saatlerini de açabilirsin.
          </p>
          <div class="ogg-actions">
            <button type="button" class="ogg-primary-button" @click="downloadCalendar">
              Takvime aktar (.ics)
            </button>
            <span v-if="nextDetailedDay" class="ogg-next-chip">
              <b>{{ relativeLabel(nextDetailedDay.date) || 'Sıradaki' }}</b>
              {{ shortDate(nextDetailedDay.date) }} · {{ firstStart(nextDetailedDay) }}
            </span>
          </div>
        </div>

        <aside class="ogg-summary" aria-label="Program özeti">
          <div>
            <strong>{{ oggSchedule.length }}</strong>
            <span>detaylı gün</span>
          </div>
          <div>
            <strong>{{ totalSlots }}</strong>
            <span>40 dk. ders</span>
          </div>
          <div>
            <strong>{{ totalDuration }}</strong>
            <span>toplam eğitim</span>
          </div>
          <div>
            <strong>{{ oggPendingDates.length }}</strong>
            <span>detayı beklenen gün</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="ogg-date-nav-section">
      <div class="container">
        <div class="ogg-date-nav" aria-label="Tarihe git">
          <button
            v-for="date in allDates"
            :key="date"
            type="button"
            :class="{
              'is-pending': oggPendingDates.includes(date),
              'is-today': relativeLabel(date) === 'Bugün',
            }"
            @click="scrollToDate(date)"
          >
            <small>{{ weekday(date) }}</small>
            <strong>{{ dayNumber(date) }}</strong>
            <span>Eyl</span>
          </button>
        </div>
      </div>
    </section>

    <section class="ogg-program-section">
      <div class="container ogg-program-layout">
        <main class="ogg-days">
          <article
            v-for="day in oggSchedule"
            :id="`day-${day.date}`"
            :key="day.date"
            class="ogg-day"
          >
            <header class="ogg-day-head">
              <div class="ogg-date-block">
                <strong>{{ dayNumber(day.date) }}</strong>
                <span>{{ weekday(day.date) }}</span>
              </div>
              <div>
                <p class="ogg-day-kicker">
                  {{ relativeLabel(day.date) || 'Eylül 2026' }}
                </p>
                <h2>{{ longDate(day.date) }}</h2>
              </div>
              <span class="ogg-day-count">{{ day.sessions.length }} ders</span>
            </header>

            <div class="ogg-blocks">
              <section
                v-for="(group, index) in groupSessions(day.sessions)"
                :key="`${day.date}-${group.start}-${index}`"
                class="ogg-course-block"
                :class="courseClass(group.course)"
              >
                <div class="ogg-time-column">
                  <strong>{{ group.start }}</strong>
                  <span>{{ group.end }}</span>
                  <small>{{ group.count }} × 40 dk</small>
                </div>

                <div class="ogg-course-content">
                  <div class="ogg-course-title-row">
                    <h3>{{ group.course }}</h3>
                    <span :class="['ogg-type', group.type === 'Uygulama' ? 'is-practice' : '']">
                      {{ group.type }}
                    </span>
                  </div>
                  <p>
                    <strong>{{ group.instructor }}</strong>
                    <span aria-hidden="true">·</span>
                    {{ group.room }}
                  </p>
                </div>
              </section>
            </div>

            <details class="ogg-exact-times">
              <summary>40 dakikalık ders saatlerini göster</summary>
              <div class="ogg-slot-list">
                <div v-for="(session, index) in day.sessions" :key="`${day.date}-slot-${index}`">
                  <strong>{{ session.time }}</strong>
                  <span>{{ session.course }} · {{ session.type }}</span>
                </div>
              </div>
            </details>
          </article>

          <section class="ogg-pending" aria-labelledby="pending-title">
            <header>
              <p class="eyebrow">Devamı gelecek</p>
              <h2 id="pending-title">Detayı beklenen tarihler</h2>
              <p>
                Ana ÖGYS programında bu tarihler görünüyor. Ayrıntı ekran görüntüleri geldikçe
                aynı veri yapısına eklenecek.
              </p>
            </header>
            <div class="ogg-pending-grid">
              <article
                v-for="date in oggPendingDates"
                :id="`day-${date}`"
                :key="date"
                class="ogg-pending-card"
              >
                <strong>{{ longDate(date) }}</strong>
                <span>Program detayı bekleniyor</span>
              </article>
            </div>
          </section>
        </main>

        <aside class="ogg-side-note">
          <p class="eyebrow">Kaynak</p>
          <strong>{{ oggScheduleMeta.provider }}</strong>
          <p>{{ oggScheduleMeta.source }}</p>
          <dl>
            <div>
              <dt>Son düzenleme</dt>
              <dd>{{ longDate(oggScheduleMeta.updatedAt) }}</dd>
            </div>
            <div>
              <dt>Program aralığı</dt>
              <dd>1–18 Eylül 2026</dd>
            </div>
          </dl>
          <p class="ogg-source-warning">
            Bu sayfa kişisel çalışma kolaylığı için düzenlenmiştir. Resmî değişikliklerde ÖGYS
            programı esas alınmalıdır.
          </p>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { oggPendingDates, oggSchedule, oggScheduleMeta } from '../content/oggSchedule.js'

const totalSlots = computed(() =>
  oggSchedule.reduce((sum, day) => sum + day.sessions.length, 0),
)

const totalDuration = computed(() => {
  const minutes = totalSlots.value * 40
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} sa ${rest} dk` : `${hours} saat`
})

const allDates = computed(() =>
  [...oggSchedule.map((day) => day.date), ...oggPendingDates].sort(),
)

const todayKey = localDateKey(new Date())
const nextDetailedDay = computed(() => oggSchedule.find((day) => day.date >= todayKey) || null)

function localDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDate(date) {
  return new Date(`${date}T12:00:00`)
}

function weekday(date) {
  return new Intl.DateTimeFormat('tr-TR', { weekday: 'short' })
    .format(parseDate(date))
    .replace('.', '')
}

function dayNumber(date) {
  return String(parseDate(date).getDate()).padStart(2, '0')
}

function shortDate(date) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(parseDate(date))
}

function longDate(date) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(parseDate(date))
}

function relativeLabel(date) {
  const target = Date.parse(`${date}T00:00:00`)
  const today = Date.parse(`${todayKey}T00:00:00`)
  const difference = Math.round((target - today) / 86_400_000)
  if (difference === 0) return 'Bugün'
  if (difference === 1) return 'Yarın'
  return ''
}

function firstStart(day) {
  return day.sessions[0]?.time.split(' - ')[0] || ''
}

function groupSessions(sessions) {
  return sessions.reduce((groups, session) => {
    const previous = groups.at(-1)
    const [start, end] = session.time.split(' - ')
    const sameBlock =
      previous &&
      previous.course === session.course &&
      previous.type === session.type &&
      previous.instructor === session.instructor &&
      previous.room === session.room

    if (sameBlock) {
      previous.end = end
      previous.count += 1
      return groups
    }

    groups.push({
      ...session,
      start,
      end,
      count: 1,
    })
    return groups
  }, [])
}

function courseClass(course) {
  if (course.includes('Hukuku')) return 'course-law'
  if (course.includes('Tedbirleri')) return 'course-security'
  if (course.includes('Yardım')) return 'course-first-aid'
  if (course.includes('Sistem')) return 'course-systems'
  if (course.includes('Uyuşturucu')) return 'course-narcotics'
  if (course.includes('Silah')) return 'course-weapons'
  return ''
}

function scrollToDate(date) {
  document.getElementById(`day-${date}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function icsEscape(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,')
    .replaceAll('\n', '\\n')
}

function icsDateTime(date, time) {
  return `${date.replaceAll('-', '')}T${time.replace(':', '')}00`
}

function downloadCalendar() {
  const events = []

  oggSchedule.forEach((day) => {
    groupSessions(day.sessions).forEach((group, index) => {
      events.push(
        [
          'BEGIN:VEVENT',
          `UID:ogg-${day.date}-${group.start.replace(':', '')}-${index}@saygiylasunar.com`,
          `DTSTART;TZID=Europe/Istanbul:${icsDateTime(day.date, group.start)}`,
          `DTEND;TZID=Europe/Istanbul:${icsDateTime(day.date, group.end)}`,
          `SUMMARY:${icsEscape(`ÖGG · ${group.course} (${group.type})`)}`,
          `DESCRIPTION:${icsEscape(`${group.instructor} · ${group.room} · ${group.count} ders`)}`,
          `LOCATION:${icsEscape(group.room)}`,
          'END:VEVENT',
        ].join('\r\n'),
      )
    })
  })

  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Saygiyla Sunar//OGG Kurs Programi//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:ÖGG Kurs Programı',
    'X-WR-TIMEZONE:Europe/Istanbul',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'ogg-kurs-programi-eylul-2026.ics'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.ogg-view {
  --ogg-teal: #278c91;
  --ogg-teal-soft: color-mix(in srgb, var(--ogg-teal) 12%, transparent);
  --ogg-card: color-mix(in srgb, var(--surface-solid) 92%, transparent);
  padding-bottom: 80px;
}

.ogg-hero {
  padding: clamp(72px, 8vw, 116px) 0 42px;
  border-bottom: 1px solid var(--line);
}

.ogg-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.55fr);
  gap: clamp(40px, 8vw, 110px);
  align-items: end;
}

.ogg-view h1 {
  max-width: 760px;
  margin-bottom: 22px;
  font-size: clamp(3rem, 7vw, 6.8rem);
}

.ogg-lead {
  max-width: 760px;
  margin-bottom: 28px;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
}

.ogg-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.ogg-primary-button {
  min-height: 46px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  cursor: pointer;
  font-weight: 700;
}

.ogg-primary-button:hover {
  transform: translateY(-1px);
}

.ogg-next-chip {
  min-height: 46px;
  display: inline-flex;
  gap: 7px;
  align-items: center;
  padding: 0 16px;
  border: 1px solid color-mix(in srgb, var(--ogg-teal) 42%, var(--line));
  border-radius: 999px;
  background: var(--ogg-teal-soft);
  color: var(--text);
}

.ogg-next-chip b {
  color: var(--ogg-teal);
}

.ogg-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--ogg-card);
}

.ogg-summary > div {
  min-height: 116px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.ogg-summary > div:nth-child(2n) {
  border-right: 0;
}

.ogg-summary > div:nth-last-child(-n + 2) {
  border-bottom: 0;
}

.ogg-summary strong {
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  line-height: 1;
}

.ogg-summary span {
  color: var(--muted);
  font-size: 0.82rem;
}

.ogg-date-nav-section {
  position: sticky;
  z-index: 8;
  top: 0;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(16px);
}

.ogg-date-nav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.ogg-date-nav button {
  min-width: 70px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'weekday weekday' 'number month';
  gap: 0 4px;
  padding: 9px 11px;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: var(--surface-solid);
  cursor: pointer;
  text-align: left;
}

.ogg-date-nav button:hover,
.ogg-date-nav button.is-today {
  border-color: var(--ogg-teal);
}

.ogg-date-nav button.is-pending {
  opacity: 0.56;
}

.ogg-date-nav small {
  grid-area: weekday;
  color: var(--muted);
  font-size: 0.68rem;
  text-transform: uppercase;
}

.ogg-date-nav strong {
  grid-area: number;
  font-size: 1.15rem;
}

.ogg-date-nav span {
  grid-area: month;
  align-self: end;
  color: var(--muted);
  font-size: 0.7rem;
}

.ogg-program-section {
  padding: clamp(38px, 6vw, 82px) 0;
}

.ogg-program-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 270px;
  gap: clamp(34px, 6vw, 72px);
  align-items: start;
}

.ogg-days {
  display: grid;
  gap: 28px;
}

.ogg-day {
  scroll-margin-top: 104px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--ogg-card);
  box-shadow: 0 18px 50px rgba(18, 20, 23, 0.035);
}

.ogg-day-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--line);
}

.ogg-date-block {
  width: 62px;
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: var(--text);
  color: var(--bg);
}

.ogg-date-block strong {
  font-size: 1.35rem;
  line-height: 1;
}

.ogg-date-block span {
  margin-top: 5px;
  font-size: 0.65rem;
  text-transform: uppercase;
}

.ogg-day-kicker {
  margin: 0 0 3px;
  color: var(--ogg-teal);
  font-size: 0.72rem;
  font-weight: 760;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ogg-view .ogg-day h2,
.ogg-view .ogg-pending h2 {
  margin: 0;
  font-size: clamp(1.35rem, 2.6vw, 2.1rem);
  letter-spacing: -0.035em;
}

.ogg-day-count {
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.74rem;
  white-space: nowrap;
}

.ogg-blocks {
  padding: 10px 20px 4px;
}

.ogg-course-block {
  --course: var(--ogg-teal);
  position: relative;
  display: grid;
  grid-template-columns: 128px 1fr;
  min-height: 112px;
  border-bottom: 1px solid var(--line);
}

.ogg-course-block::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 20px;
  bottom: 20px;
  width: 4px;
  border-radius: 999px;
  background: var(--course);
}

.ogg-course-block:last-child {
  border-bottom: 0;
}

.course-law { --course: #5369c8; }
.course-security { --course: #278c91; }
.course-first-aid { --course: #c84d68; }
.course-systems { --course: #a56b2d; }
.course-narcotics { --course: #7558a6; }
.course-weapons { --course: #4e5964; }

.ogg-time-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 18px 18px 0;
  border-right: 1px solid var(--line);
}

.ogg-time-column strong {
  font-size: 1.04rem;
}

.ogg-time-column span,
.ogg-time-column small {
  color: var(--muted);
}

.ogg-time-column small {
  margin-top: 6px;
  font-size: 0.72rem;
}

.ogg-course-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 0 18px 22px;
}

.ogg-course-title-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;
}

.ogg-course-content h3 {
  margin: 0;
  font-size: clamp(1.05rem, 2vw, 1.45rem);
  letter-spacing: -0.025em;
}

.ogg-course-content p {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 10px 0 0;
  font-size: 0.9rem;
}

.ogg-course-content p strong {
  color: var(--text);
}

.ogg-type {
  padding: 5px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--course) 12%, transparent);
  color: var(--course);
  font-size: 0.7rem;
  font-weight: 760;
  white-space: nowrap;
}

.ogg-type.is-practice {
  background: color-mix(in srgb, var(--course) 19%, transparent);
}

.ogg-exact-times {
  margin: 6px 20px 20px;
  border-top: 1px dashed var(--line);
}

.ogg-exact-times summary {
  padding: 14px 0 0;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 650;
}

.ogg-slot-list {
  display: grid;
  gap: 7px;
  margin-top: 12px;
}

.ogg-slot-list > div {
  display: grid;
  grid-template-columns: 116px 1fr;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 9px;
  background: var(--bg-soft);
  font-size: 0.78rem;
}

.ogg-slot-list span {
  color: var(--muted);
}

.ogg-pending {
  padding: clamp(32px, 5vw, 52px) 0 0;
  scroll-margin-top: 104px;
}

.ogg-pending > header > p:last-child {
  max-width: 640px;
  margin-top: 12px;
}

.ogg-pending-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.ogg-pending-card {
  scroll-margin-top: 104px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px;
  border: 1px dashed var(--line-strong);
  border-radius: 14px;
}

.ogg-pending-card span {
  color: var(--muted);
  font-size: 0.78rem;
}

.ogg-side-note {
  position: sticky;
  top: 102px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface-solid);
}

.ogg-side-note > strong {
  display: block;
  margin-bottom: 10px;
  line-height: 1.35;
}

.ogg-side-note > p {
  font-size: 0.82rem;
}

.ogg-side-note dl {
  margin: 18px 0;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.ogg-side-note dl > div + div {
  margin-top: 10px;
}

.ogg-side-note dt {
  color: var(--muted);
  font-size: 0.7rem;
}

.ogg-side-note dd {
  margin: 2px 0 0;
  font-size: 0.82rem;
  font-weight: 650;
}

.ogg-source-warning {
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .ogg-hero-grid,
  .ogg-program-layout {
    grid-template-columns: 1fr;
  }

  .ogg-summary {
    max-width: 620px;
  }

  .ogg-side-note {
    position: static;
    order: -1;
  }
}

@media (max-width: 620px) {
  .ogg-hero {
    padding-top: 54px;
  }

  .ogg-view h1 {
    font-size: clamp(2.8rem, 15vw, 4.4rem);
  }

  .ogg-summary > div {
    min-height: 100px;
    padding: 15px;
  }

  .ogg-date-nav-section {
    top: 0;
  }

  .ogg-program-layout {
    width: min(calc(100% - 24px), var(--container));
  }

  .ogg-day-head {
    grid-template-columns: auto 1fr;
    gap: 12px;
    padding: 14px;
  }

  .ogg-date-block {
    width: 54px;
    height: 54px;
  }

  .ogg-day-count {
    grid-column: 1 / -1;
    width: max-content;
  }

  .ogg-blocks {
    padding-inline: 14px;
  }

  .ogg-course-block {
    grid-template-columns: 92px 1fr;
  }

  .ogg-course-block::before {
    left: -14px;
  }

  .ogg-time-column {
    padding-right: 10px;
  }

  .ogg-time-column strong {
    font-size: 0.9rem;
  }

  .ogg-course-content {
    padding-left: 14px;
  }

  .ogg-course-title-row {
    display: block;
  }

  .ogg-type {
    display: inline-block;
    margin-top: 8px;
  }

  .ogg-course-content p {
    display: block;
    font-size: 0.82rem;
  }

  .ogg-course-content p span {
    margin-inline: 4px;
  }

  .ogg-exact-times {
    margin-inline: 14px;
  }

  .ogg-slot-list > div {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .ogg-pending-grid {
    grid-template-columns: 1fr;
  }
}
</style>
