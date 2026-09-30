<template>
  <div class="page-view ogg-view">
    <section class="ogg-hero">
      <div class="container ogg-hero-grid">
        <div class="ogg-hero-copy">
          <p class="ogg-tech-label">ÖGG // FIELD NOTES · 2026</p>
          <h1>{{ oggNotesMeta.title }}</h1>
          <p class="ogg-lead">
            {{ oggNotesMeta.subtitle }}. Dağınık ders notlarını; tanım, kritik bilgi,
            sınav hatırlatması ve kısa özet düzeninde yeniden toparladım.
          </p>

          <div class="ogg-actions">
            <a class="ogg-primary-button" href="#ders-notlari">Notlara git</a>
            <button type="button" class="ogg-secondary-button" @click="downloadCalendar">
              Programı indir (.ics)
            </button>
          </div>
        </div>

        <aside class="ogg-summary" aria-label="ÖGG sayfası özeti">
          <div>
            <strong>{{ oggNoteTopics.length }}</strong>
            <span>notlandırılmış ders</span>
          </div>
          <div>
            <strong>{{ uniqueScheduleCourses }}</strong>
            <span>programdaki ders</span>
          </div>
          <div>
            <strong>{{ oggSchedule.length }}</strong>
            <span>eğitim günü</span>
          </div>
          <div>
            <strong>{{ totalSlots }}</strong>
            <span>40 dk. ders</span>
          </div>
        </aside>
      </div>
    </section>

    <nav class="ogg-topic-nav-wrap" aria-label="Ders notlarına hızlı geçiş">
      <div class="container">
        <div class="ogg-topic-nav">
          <a
            v-for="topic in oggNoteTopics"
            :key="topic.id"
            :href="`#${topic.id}`"
            :title="topic.course"
          >
            <span>{{ topic.no }}</span>
            {{ shortCourse(topic.course) }}
          </a>
        </div>
      </div>
    </nav>

    <section id="ders-notlari" class="ogg-notes-section">
      <div class="container ogg-notes-layout">
        <aside class="ogg-notes-index" aria-label="Ders içindekiler">
          <p class="ogg-tech-label">INDEX // 10</p>
          <ol>
            <li v-for="topic in oggNoteTopics" :key="`toc-${topic.id}`">
              <a :href="`#${topic.id}`">
                <span>{{ topic.no }}</span>
                {{ topic.course }}
              </a>
            </li>
          </ol>
          <p class="ogg-index-footnote">
            Programda olup Notion arşivinde ders notu bulunmayan başlıklar bu listede gösterilmez.
          </p>
        </aside>

        <main class="ogg-article">
          <section class="ogg-editor-note" aria-labelledby="editor-note-title">
            <div>
              <p class="ogg-tech-label">READ ME // ÇALIŞMA NOTU</p>
              <h2 id="editor-note-title">Notları yayıma uygun hâle getirdim.</h2>
            </div>
            <p>
              Yazım tekrarlarını temizledim, benzer maddeleri birleştirdim ve ders başlıklarını
              mevcut Eylül 2026 kurs programıyla eşleştirdim. Ham notlardaki tartışmalı veya
              güncelliği değişebilecek noktaları da yayımlanabilir bir dille yeniden çerçeveledim.
            </p>
            <p class="ogg-warning">{{ oggNotesMeta.notice }}</p>
          </section>

          <article
            v-for="topic in oggNoteTopics"
            :id="topic.id"
            :key="topic.id"
            class="ogg-note"
            :data-tone="topic.tone"
          >
            <header class="ogg-note-head">
              <div class="ogg-note-number">{{ topic.no }}</div>
              <div class="ogg-note-heading">
                <div class="ogg-note-meta">
                  <span>{{ topic.tag }}</span>
                  <span>ÖGG · Temel Eğitim</span>
                </div>
                <h2>{{ topic.course }}</h2>
                <p>{{ topic.short }}</p>
              </div>
            </header>

            <blockquote class="ogg-keyline">
              <span>KEYLINE</span>
              <p>{{ topic.keyline }}</p>
            </blockquote>

            <div class="ogg-note-sections">
              <section v-for="section in topic.sections" :key="section.title">
                <h3>{{ section.title }}</h3>
                <ul>
                  <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
                </ul>
              </section>
            </div>

            <section class="ogg-exam-box" aria-label="Sınav için hızlı tekrar">
              <header>
                <span class="ogg-tech-label">QUICK RECALL</span>
                <h3>Sınav için hızlı tekrar</h3>
              </header>
              <ul>
                <li v-for="item in topic.exam" :key="item">{{ item }}</li>
              </ul>
            </section>

            <a class="ogg-back-top" href="#ders-notlari">↑ İçindekilere dön</a>
          </article>

          <section class="ogg-reference-section" aria-labelledby="official-references">
            <p class="ogg-tech-label">VERIFY // OFFICIAL</p>
            <h2 id="official-references">Resmî kaynaklardan kontrol et</h2>
            <p>
              Bu sayfa ders çalışmak için hazırlanmış kişisel bir derlemedir. Güncel mevzuat ve
              uygulama ayrıntılarında aşağıdaki resmî kaynakları esas al.
            </p>
            <div class="ogg-reference-grid">
              <a
                v-for="reference in oggOfficialReferences"
                :key="reference.href"
                :href="reference.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ reference.label }}</span>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </section>

          <section class="ogg-schedule-section" aria-labelledby="schedule-archive-title">
            <div class="ogg-schedule-head">
              <div>
                <p class="ogg-tech-label">ARCHIVE // SEP 2026</p>
                <h2 id="schedule-archive-title">Kurs programı arşivi</h2>
                <p>
                  Eski /ogg sayfasındaki ÖGYS programını burada koruyorum. Notların hangi ders
                  akışından üretildiğini görmek veya takvim dosyasını almak için açabilirsin.
                </p>
              </div>
              <button type="button" class="ogg-secondary-button" @click="downloadCalendar">
                .ics indir
              </button>
            </div>

            <details class="ogg-program-archive">
              <summary>
                <span>Eylül 2026 eğitim programını göster</span>
                <small>{{ oggSchedule.length }} gün · {{ totalSlots }} ders</small>
              </summary>

              <div class="ogg-program-days">
                <details v-for="day in oggSchedule" :key="day.date" class="ogg-program-day">
                  <summary>
                    <div>
                      <strong>{{ dayNumber(day.date) }}</strong>
                      <span>{{ monthShort(day.date) }}</span>
                    </div>
                    <p>
                      <b>{{ weekday(day.date) }}</b>
                      <small>{{ groupSessions(day.sessions).length }} ders bloğu</small>
                    </p>
                  </summary>

                  <div class="ogg-program-blocks">
                    <div
                      v-for="(group, index) in groupSessions(day.sessions)"
                      :key="`${day.date}-${group.start}-${index}`"
                      class="ogg-program-block"
                    >
                      <time>{{ group.start }}–{{ group.end }}</time>
                      <div>
                        <strong>{{ group.course }}</strong>
                        <span>
                          {{ group.type }} · {{ group.instructor }} · {{ group.room }} ·
                          {{ group.count }} × 40 dk
                        </span>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <footer class="ogg-program-source">
                <span>Kaynak: {{ oggScheduleMeta.source }}</span>
                <span>{{ oggScheduleMeta.provider }}</span>
              </footer>
            </details>
          </section>
        </main>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  oggNotesMeta,
  oggNoteTopics,
  oggOfficialReferences,
} from '../content/oggNotes.js'
import { oggSchedule, oggScheduleMeta } from '../content/oggSchedule.js'

const totalSlots = computed(() =>
  oggSchedule.reduce((sum, day) => sum + day.sessions.length, 0),
)

const uniqueScheduleCourses = computed(
  () => new Set(oggSchedule.flatMap((day) => day.sessions.map((session) => session.course))).size,
)

function shortCourse(course) {
  return course
    .replace('Özel Güvenlik ', '')
    .replace(' ve Kişi Hakları', '')
    .replace('Güvenlik Sistem ve Cihazları', 'Sistemler')
    .replace('Yangın Güvenliği ve Tabii Afet', 'Yangın')
    .replace('Genel Kolluklar İlişkileri', 'Kolluk')
    .replace('Silah Bilgisi ve Atış', 'Silah')
}

function parseDate(date) {
  return new Date(`${date}T12:00:00`)
}

function weekday(date) {
  return new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(parseDate(date))
}

function dayNumber(date) {
  return String(parseDate(date).getDate()).padStart(2, '0')
}

function monthShort(date) {
  return new Intl.DateTimeFormat('tr-TR', { month: 'short' })
    .format(parseDate(date))
    .replace('.', '')
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

  const calendar = [
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

  const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' })
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
  --ogg-accent: #278c91;
  --ogg-accent-soft: color-mix(in srgb, var(--ogg-accent) 12%, transparent);
  --ogg-card: color-mix(in srgb, var(--surface-solid) 94%, transparent);
  --ogg-tech:
    "EFSS", "Saygiyla Sunar", ui-monospace, "Cascadia Code", "Roboto Mono", "SFMono-Regular", Menlo, Monaco,
    Consolas, monospace;
  padding-bottom: 84px;
}

.ogg-tech-label {
  margin: 0;
  color: var(--ogg-accent);
  font-family: var(--ogg-tech);
  font-size: 0.72rem;
  font-weight: 760;
  letter-spacing: 0.105em;
  text-transform: uppercase;
}

.ogg-hero {
  padding: clamp(72px, 9vw, 124px) 0 clamp(42px, 6vw, 72px);
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--ogg-accent) 7%, transparent),
      transparent 44%
    );
}

.ogg-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.55fr);
  gap: clamp(42px, 8vw, 112px);
  align-items: end;
}

.ogg-hero h1 {
  max-width: 880px;
  margin: 16px 0 20px;
  font-family: var(--ogg-tech);
  font-size: clamp(3rem, 7.4vw, 7.2rem);
  font-weight: 760;
  letter-spacing: -0.075em;
  line-height: 0.92;
}

.ogg-lead {
  max-width: 760px;
  margin: 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.45vw, 1.18rem);
  line-height: 1.72;
}

.ogg-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.ogg-primary-button,
.ogg-secondary-button {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 999px;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 740;
  text-decoration: none;
  cursor: pointer;
}

.ogg-primary-button {
  border: 1px solid var(--text);
  background: var(--text);
  color: var(--bg);
}

.ogg-secondary-button {
  border: 1px solid var(--line-strong);
  background: var(--surface-solid);
  color: var(--text);
}

.ogg-primary-button:hover,
.ogg-secondary-button:hover {
  transform: translateY(-1px);
}

.ogg-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  padding: 19px;
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
  font-family: var(--ogg-tech);
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  line-height: 1;
}

.ogg-summary span {
  color: var(--muted);
  font-size: 0.78rem;
}

.ogg-topic-nav-wrap {
  position: sticky;
  z-index: 9;
  top: 0;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 91%, transparent);
  backdrop-filter: blur(16px);
}

.ogg-topic-nav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: thin;
  scroll-snap-type: x proximity;
}

.ogg-topic-nav a {
  min-height: 40px;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-solid);
  color: var(--text);
  font-size: 0.78rem;
  text-decoration: none;
  scroll-snap-align: start;
}

.ogg-topic-nav a:hover {
  border-color: var(--ogg-accent);
}

.ogg-topic-nav a span {
  color: var(--ogg-accent);
  font-family: var(--ogg-tech);
  font-size: 0.68rem;
  font-weight: 800;
}

.ogg-notes-section {
  padding: clamp(42px, 7vw, 88px) 0;
}

.ogg-notes-layout {
  display: grid;
  grid-template-columns: minmax(210px, 260px) minmax(0, 820px);
  gap: clamp(36px, 7vw, 94px);
  justify-content: center;
  align-items: start;
}

.ogg-notes-index {
  position: sticky;
  top: 84px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--ogg-card);
}

.ogg-notes-index ol {
  display: grid;
  gap: 3px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.ogg-notes-index a {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  padding: 8px 5px;
  border-radius: 8px;
  color: var(--text);
  font-size: 0.77rem;
  line-height: 1.35;
  text-decoration: none;
}

.ogg-notes-index a:hover {
  background: var(--ogg-accent-soft);
}

.ogg-notes-index a span {
  color: var(--ogg-accent);
  font-family: var(--ogg-tech);
  font-size: 0.68rem;
  font-weight: 800;
}

.ogg-index-footnote {
  margin: 14px 0 0;
  padding-top: 13px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.7rem;
  line-height: 1.55;
}

.ogg-article {
  min-width: 0;
}

.ogg-editor-note,
.ogg-note,
.ogg-reference-section,
.ogg-schedule-section {
  scroll-margin-top: 88px;
}

.ogg-editor-note {
  display: grid;
  gap: 16px;
  margin-bottom: 58px;
  padding: clamp(22px, 4vw, 34px);
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--ogg-card);
}

.ogg-editor-note h2,
.ogg-reference-section h2,
.ogg-schedule-section h2 {
  margin: 7px 0 0;
  font-size: clamp(1.65rem, 4vw, 2.6rem);
  letter-spacing: -0.045em;
}

.ogg-editor-note > p {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}

.ogg-warning {
  padding: 14px 16px;
  border-left: 3px solid var(--ogg-accent);
  background: var(--ogg-accent-soft);
  color: var(--text) !important;
  font-size: 0.86rem;
}

.ogg-note {
  --topic: var(--ogg-accent);
  padding: clamp(12px, 1vw, 4px) 0 clamp(58px, 8vw, 94px);
}

.ogg-note[data-tone="law"] { --topic: #6476d1; }
.ogg-note[data-tone="security"] { --topic: #278c91; }
.ogg-note[data-tone="aid"] { --topic: #c85672; }
.ogg-note[data-tone="systems"] { --topic: #a97336; }
.ogg-note[data-tone="weapons"] { --topic: #68727d; }
.ogg-note[data-tone="crowd"] { --topic: #7566bb; }
.ogg-note[data-tone="protection"] { --topic: #9b6384; }
.ogg-note[data-tone="fire"] { --topic: #c76643; }
.ogg-note[data-tone="law-enforcement"] { --topic: #4f7aa6; }
.ogg-note[data-tone="communication"] { --topic: #5a8f70; }

.ogg-note-head {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 20px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}

.ogg-note-number {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--topic) 60%, var(--line));
  border-radius: 14px;
  background: color-mix(in srgb, var(--topic) 10%, transparent);
  color: var(--topic);
  font-family: var(--ogg-tech);
  font-size: 1rem;
  font-weight: 820;
}

.ogg-note-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 9px;
}

.ogg-note-meta span {
  padding: 4px 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--topic) 10%, transparent);
  color: var(--topic);
  font-family: var(--ogg-tech);
  font-size: 0.62rem;
  font-weight: 760;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.ogg-note-heading h2 {
  margin: 0;
  font-size: clamp(1.9rem, 4.4vw, 3.25rem);
  letter-spacing: -0.055em;
  line-height: 1.05;
}

.ogg-note-heading > p {
  max-width: 680px;
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.65;
}

.ogg-keyline {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 18px;
  margin: 22px 0 30px;
  padding: 16px 18px;
  border: 1px solid color-mix(in srgb, var(--topic) 32%, var(--line));
  border-radius: 14px;
  background: color-mix(in srgb, var(--topic) 7%, transparent);
}

.ogg-keyline span {
  color: var(--topic);
  font-family: var(--ogg-tech);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.ogg-keyline p {
  margin: 0;
  font-size: 0.94rem;
  font-weight: 650;
  line-height: 1.55;
}

.ogg-note-sections {
  display: grid;
  gap: 28px;
}

.ogg-note-sections section {
  padding-bottom: 26px;
  border-bottom: 1px solid var(--line);
}

.ogg-note-sections h3,
.ogg-exam-box h3 {
  margin: 0 0 13px;
  font-size: clamp(1.12rem, 2.7vw, 1.42rem);
  letter-spacing: -0.025em;
}

.ogg-note-sections ul,
.ogg-exam-box ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 1.15rem;
}

.ogg-note-sections li,
.ogg-exam-box li {
  padding-left: 4px;
  line-height: 1.72;
}

.ogg-note-sections li::marker {
  color: var(--topic);
}

.ogg-exam-box {
  display: grid;
  grid-template-columns: minmax(160px, 0.38fr) minmax(0, 0.62fr);
  gap: 28px;
  margin-top: 28px;
  padding: 20px;
  border: 1px solid color-mix(in srgb, var(--topic) 42%, var(--line));
  border-radius: 18px;
  background: color-mix(in srgb, var(--topic) 6%, transparent);
}

.ogg-exam-box .ogg-tech-label {
  color: var(--topic);
  margin-bottom: 7px;
}

.ogg-exam-box li {
  font-family: var(--ogg-tech);
  font-size: 0.78rem;
  line-height: 1.55;
}

.ogg-back-top {
  display: inline-flex;
  margin-top: 18px;
  color: var(--muted);
  font-size: 0.72rem;
  text-decoration: none;
}

.ogg-back-top:hover {
  color: var(--text);
}

.ogg-reference-section,
.ogg-schedule-section {
  margin-top: 12px;
  padding: clamp(28px, 5vw, 42px);
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--ogg-card);
}

.ogg-reference-section > p:not(.ogg-tech-label),
.ogg-schedule-head p {
  margin: 13px 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.ogg-reference-grid {
  display: grid;
  gap: 9px;
  margin-top: 22px;
}

.ogg-reference-grid a {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface-solid);
  color: var(--text);
  font-size: 0.84rem;
  text-decoration: none;
}

.ogg-reference-grid a:hover {
  border-color: var(--ogg-accent);
}

.ogg-reference-grid b {
  color: var(--ogg-accent);
}

.ogg-schedule-section {
  margin-top: 24px;
}

.ogg-schedule-head {
  display: flex;
  gap: 24px;
  align-items: end;
  justify-content: space-between;
}

.ogg-schedule-head > div {
  max-width: 610px;
}

.ogg-program-archive {
  margin-top: 24px;
  border-top: 1px solid var(--line);
}

.ogg-program-archive > summary {
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  cursor: pointer;
  list-style: none;
}

.ogg-program-archive > summary::-webkit-details-marker,
.ogg-program-day > summary::-webkit-details-marker {
  display: none;
}

.ogg-program-archive > summary span {
  font-weight: 740;
}

.ogg-program-archive > summary small {
  color: var(--muted);
  font-family: var(--ogg-tech);
  font-size: 0.68rem;
}

.ogg-program-days {
  display: grid;
  gap: 8px;
  padding: 4px 0 20px;
}

.ogg-program-day {
  border: 1px solid var(--line);
  border-radius: 13px;
  background: var(--surface-solid);
}

.ogg-program-day > summary {
  min-height: 64px;
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 12px;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  list-style: none;
}

.ogg-program-day > summary > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 12px;
  border-right: 1px solid var(--line);
}

.ogg-program-day > summary strong {
  font-family: var(--ogg-tech);
  font-size: 1.15rem;
}

.ogg-program-day > summary span,
.ogg-program-day > summary small {
  color: var(--muted);
  font-size: 0.7rem;
}

.ogg-program-day > summary p {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
}

.ogg-program-day > summary b {
  font-size: 0.86rem;
}

.ogg-program-blocks {
  padding: 0 12px 12px 82px;
}

.ogg-program-block {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 12px;
  padding: 11px 0;
  border-top: 1px solid var(--line);
}

.ogg-program-block time {
  color: var(--ogg-accent);
  font-family: var(--ogg-tech);
  font-size: 0.69rem;
}

.ogg-program-block > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ogg-program-block strong {
  font-size: 0.82rem;
}

.ogg-program-block span {
  color: var(--muted);
  font-size: 0.7rem;
  line-height: 1.45;
}

.ogg-program-source {
  display: grid;
  gap: 4px;
  padding: 14px 0 0;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.7rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .ogg-hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .ogg-summary {
    max-width: 620px;
  }

  .ogg-notes-layout {
    grid-template-columns: 1fr;
  }

  .ogg-notes-index {
    display: none;
  }
}

@media (max-width: 720px) {
  .ogg-view {
    padding-bottom: 56px;
  }

  .ogg-hero {
    padding: 64px 0 38px;
  }

  .ogg-hero h1 {
    margin-top: 13px;
    font-size: clamp(2.65rem, 13vw, 4.4rem);
    line-height: 0.96;
  }

  .ogg-lead {
    font-size: 0.98rem;
    line-height: 1.68;
  }

  .ogg-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .ogg-primary-button,
  .ogg-secondary-button {
    width: 100%;
    min-height: 48px;
  }

  .ogg-summary > div {
    min-height: 96px;
    padding: 15px;
  }

  .ogg-topic-nav-wrap .container {
    padding-right: 0;
  }

  .ogg-topic-nav {
    padding-right: 18px;
  }

  .ogg-topic-nav a {
    min-height: 42px;
  }

  .ogg-notes-section {
    padding-top: 32px;
  }

  .ogg-editor-note {
    margin-bottom: 48px;
    border-radius: 18px;
  }

  .ogg-note {
    padding-bottom: 66px;
  }

  .ogg-note-head {
    grid-template-columns: 48px 1fr;
    gap: 13px;
  }

  .ogg-note-number {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    font-size: 0.82rem;
  }

  .ogg-note-heading h2 {
    font-size: clamp(1.75rem, 8.4vw, 2.5rem);
  }

  .ogg-note-heading > p {
    font-size: 0.9rem;
  }

  .ogg-keyline {
    grid-template-columns: 1fr;
    gap: 7px;
    margin-top: 18px;
  }

  .ogg-note-sections {
    gap: 22px;
  }

  .ogg-note-sections li {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .ogg-exam-box {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .ogg-reference-section,
  .ogg-schedule-section {
    padding: 22px 18px;
    border-radius: 18px;
  }

  .ogg-schedule-head {
    display: grid;
    gap: 18px;
  }

  .ogg-schedule-head .ogg-secondary-button {
    width: auto;
    justify-self: start;
  }

  .ogg-program-archive > summary {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 12px 0;
  }

  .ogg-program-blocks {
    padding-left: 12px;
  }

  .ogg-program-block {
    grid-template-columns: 84px 1fr;
  }
}

@media (max-width: 420px) {
  .ogg-summary {
    grid-template-columns: 1fr 1fr;
  }

  .ogg-summary strong {
    font-size: 1.55rem;
  }

  .ogg-note-head {
    grid-template-columns: 1fr;
  }

  .ogg-note-number {
    width: 42px;
    height: 42px;
  }

  .ogg-program-block {
    grid-template-columns: 1fr;
    gap: 5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ogg-view *,
  .ogg-view *::before,
  .ogg-view *::after {
    scroll-behavior: auto !important;
    transition: none !important;
  }
}
</style>
