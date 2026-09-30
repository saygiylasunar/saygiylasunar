<template>
  <div class="page-view ogg-index-view">
    <section class="index-hero">
      <div class="container index-hero-grid">
        <div>
          <p class="tech-label">ÖGG // AKADEMİK NOT ARŞİVİ · 2026</p>
          <h1>{{ oggLessonsMeta.title }}</h1>
          <p class="lead">{{ oggLessonsMeta.description }}</p>
          <div class="hero-actions">
            <a class="primary" href="#dersler">Derslere git</a>
            <button class="secondary" type="button" @click="downloadCalendar">Programı indir (.ics)</button>
          </div>
        </div>

        <aside class="index-stats">
          <div><strong>{{ oggLessons.length }}</strong><span>tam ders</span></div>
          <div><strong>{{ totalCategories }}</strong><span>ana konu</span></div>
          <div><strong>{{ sourceImages }}</strong><span>kaynak görsel</span></div>
          <div><strong>{{ totalSlots }}</strong><span>40 dk. ders</span></div>
        </aside>
      </div>
    </section>

    <section id="dersler" class="lesson-directory">
      <div class="container">
        <header class="directory-head">
          <div>
            <p class="tech-label">DERSLER // TAM SÜRÜM</p>
            <h2>Her ders ayrı, her konu kendi hiyerarşisinde.</h2>
          </div>
          <p>
            İçerikler Notion’daki kurs notları ve sağlanan PowerPoint ders slaytlarının özetlenmiş hâli değildir.
            Kaynaklardaki sınav dili korunmuş; başlık yapısı, tekrar eden sunum işaretleri ve okunabilirlik
            akademik blog düzenine göre yeniden işlenmiştir.
          </p>
        </header>

        <div class="lesson-grid">
          <RouterLink
            v-for="lesson in oggLessons"
            :key="lesson.id"
            class="lesson-card"
            :to="`/ogg/${lesson.slug}`"
          >
            <div class="lesson-card-top">
              <span>{{ lesson.no }}</span>
              <small>{{ lesson.tag }}</small>
            </div>
            <h3>{{ lesson.title }}</h3>
            <div class="lesson-card-meta">
              <span>{{ lesson.categories.length }} ana konu</span>
              <span v-if="lesson.imageCount">{{ lesson.imageCount }} görsel</span>
            </div>
            <strong class="lesson-open">Tam dersi aç →</strong>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="editorial-note">
      <div class="container editorial-grid">
        <div>
          <p class="tech-label">EDİTORYAL YAPI</p>
          <h2>Not defteri + kurs slaytı → akademik blog.</h2>
        </div>
        <div>
          <p>
            Düzenleme katmanı dört seviyede ilerliyor:
            <b>ders → ana konu → alt konu → bilgi / ezber / istisna.</b>
            Ders sırasında alınmış kısa ifadeler silinmek yerine ilgili kavramın altında korunuyor.
          </p>
          <p>
            Mevzuata bağlı içeriklerde bu arşiv çalışma kaynağıdır; resmî işlem ve güncel uygulama
            için yürürlükteki mevzuat ile EGM Özel Güvenlik Denetleme Başkanlığı kaynakları esas alınır.
          </p>
        </div>
      </div>
    </section>

    <section class="schedule-archive">
      <div class="container">
        <header class="schedule-head">
          <div>
            <p class="tech-label">KURS PROGRAMI // EYLÜL 2026</p>
            <h2>ÖGYS program arşivi</h2>
            <p>Notların hangi ders akışından üretildiğini görmek için eski programı da koruyorum.</p>
          </div>
          <button class="secondary" type="button" @click="downloadCalendar">.ics indir</button>
        </header>

        <details class="schedule-details">
          <summary>
            <span>{{ oggSchedule.length }} eğitim gününü göster</span>
            <small>{{ totalSlots }} ders · {{ uniqueCourses }} farklı ders</small>
          </summary>

          <div class="schedule-days">
            <details v-for="day in oggSchedule" :key="day.date" class="schedule-day">
              <summary>
                <time>{{ dayLabel(day.date) }}</time>
                <span>{{ groupSessions(day.sessions).length }} ders bloğu</span>
              </summary>
              <div class="schedule-blocks">
                <div v-for="(group,index) in groupSessions(day.sessions)" :key="`${day.date}-${index}`">
                  <time>{{ group.start }}–{{ group.end }}</time>
                  <p><strong>{{ group.course }}</strong><span>{{ group.type }} · {{ group.instructor }} · {{ group.room }} · {{ group.count }} × 40 dk</span></p>
                </div>
              </div>
            </details>
          </div>

          <footer>
            {{ oggScheduleMeta.source }} · {{ oggScheduleMeta.provider }}
          </footer>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { oggLessons, oggLessonsMeta } from '../content/oggLessonsFull.js'
import { oggSchedule, oggScheduleMeta } from '../content/oggSchedule.js'

const totalCategories=computed(()=>oggLessons.reduce((sum,lesson)=>sum+lesson.categories.length,0))
const sourceImages=computed(()=>oggLessons.reduce((sum,lesson)=>sum+lesson.imageCount,0))
const totalSlots=computed(()=>oggSchedule.reduce((sum,day)=>sum+day.sessions.length,0))
const uniqueCourses=computed(()=>new Set(oggSchedule.flatMap(day=>day.sessions.map(x=>x.course))).size)

function parseDate(value){return new Date(`${value}T12:00:00`)}
function dayLabel(value){
  return new Intl.DateTimeFormat('tr-TR',{day:'numeric',month:'long',weekday:'long'}).format(parseDate(value))
}
function groupSessions(sessions){
  return sessions.reduce((groups,session)=>{
    const previous=groups.at(-1)
    const [start,end]=session.time.split(' - ')
    const same=previous&&previous.course===session.course&&previous.type===session.type&&previous.instructor===session.instructor&&previous.room===session.room
    if(same){previous.end=end;previous.count+=1;return groups}
    groups.push({...session,start,end,count:1});return groups
  },[])
}
function icsEscape(value){
  return String(value).replaceAll('\\','\\\\').replaceAll(';','\\;').replaceAll(',','\\,').replaceAll('\n','\\n')
}
function icsDateTime(date,time){return `${date.replaceAll('-','')}T${time.replace(':','')}00`}
function downloadCalendar(){
  const events=[]
  oggSchedule.forEach(day=>groupSessions(day.sessions).forEach((group,index)=>{
    events.push([
      'BEGIN:VEVENT',
      `UID:ogg-${day.date}-${group.start.replace(':','')}-${index}@saygiylasunar.com`,
      `DTSTART;TZID=Europe/Istanbul:${icsDateTime(day.date,group.start)}`,
      `DTEND;TZID=Europe/Istanbul:${icsDateTime(day.date,group.end)}`,
      `SUMMARY:${icsEscape(`ÖGG · ${group.course} (${group.type})`)}`,
      `DESCRIPTION:${icsEscape(`${group.instructor} · ${group.room} · ${group.count} ders`)}`,
      `LOCATION:${icsEscape(group.room)}`,
      'END:VEVENT',
    ].join('\r\n'))
  }))
  const calendar=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Saygiyla Sunar//OGG Kurs Programi//TR','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:ÖGG Kurs Programı','X-WR-TIMEZONE:Europe/Istanbul',...events,'END:VCALENDAR'].join('\r\n')
  const blob=new Blob([calendar],{type:'text/calendar;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const link=document.createElement('a');link.href=url;link.download='ogg-kurs-programi-eylul-2026.ics';document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url)
}
</script>

<style scoped>
.ogg-index-view{--tech:"EFSS","Saygiyla Sunar",ui-monospace,"Cascadia Code","SFMono-Regular",Menlo,monospace;--accent:#278c91;padding-bottom:86px}
.tech-label{margin:0;color:var(--accent);font-family:var(--tech);font-size:.68rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
.index-hero{padding:clamp(72px,9vw,124px) 0 clamp(44px,6vw,72px);border-bottom:1px solid var(--line);background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 7%,transparent),transparent 45%)}
.index-hero-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(270px,.6fr);gap:clamp(40px,8vw,110px);align-items:end}
.index-hero h1{max-width:880px;margin:15px 0 20px;font-family:var(--tech);font-size:clamp(3rem,7vw,6.8rem);font-weight:760;letter-spacing:-.075em;line-height:.93}
.lead{max-width:760px;margin:0;color:var(--muted);font-size:clamp(1rem,1.45vw,1.17rem);line-height:1.72}
.hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.primary,.secondary{min-height:46px;display:inline-flex;align-items:center;justify-content:center;padding:0 18px;border-radius:999px;font:inherit;font-size:.86rem;font-weight:740;text-decoration:none;cursor:pointer}
.primary{border:1px solid var(--text);background:var(--text);color:var(--bg)}
.secondary{border:1px solid var(--line-strong);background:var(--surface-solid);color:var(--text)}
.index-stats{display:grid;grid-template-columns:1fr 1fr;overflow:hidden;border:1px solid var(--line);border-radius:20px;background:var(--surface-solid)}
.index-stats>div{min-height:112px;display:flex;flex-direction:column;justify-content:space-between;padding:18px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.index-stats>div:nth-child(2n){border-right:0}.index-stats>div:nth-last-child(-n+2){border-bottom:0}
.index-stats strong{font-family:var(--tech);font-size:clamp(1.6rem,3vw,2.3rem)}.index-stats span{color:var(--muted);font-size:.76rem}
.lesson-directory{padding:clamp(50px,8vw,96px) 0}
.directory-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.8fr);gap:clamp(30px,7vw,86px);align-items:end;margin-bottom:34px}
.directory-head h2,.editorial-note h2,.schedule-head h2{margin:8px 0 0;font-size:clamp(1.8rem,4.4vw,3.2rem);letter-spacing:-.05em;line-height:1.05}
.directory-head>p{margin:0;color:var(--muted);line-height:1.72}
.lesson-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.lesson-card{min-height:250px;display:flex;flex-direction:column;padding:22px;border:1px solid var(--line);border-radius:18px;background:var(--surface-solid);color:var(--text);text-decoration:none;transition:transform .18s ease,border-color .18s ease}
.lesson-card:hover{transform:translateY(-2px);border-color:var(--accent)}
.lesson-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.lesson-card-top>span{color:var(--accent);font-family:var(--tech);font-size:.8rem;font-weight:800}
.lesson-card-top small{color:var(--muted);font-family:var(--tech);font-size:.62rem;text-transform:uppercase}
.lesson-card h3{max-width:420px;margin:26px 0 0;font-size:clamp(1.35rem,3vw,2rem);letter-spacing:-.035em;line-height:1.08}
.lesson-card-meta{display:flex;flex-wrap:wrap;gap:12px;margin-top:15px;color:var(--muted);font-size:.7rem}
.lesson-open{margin-top:auto;padding-top:26px;color:var(--accent);font-family:var(--tech);font-size:.69rem}
.editorial-note{padding:clamp(50px,8vw,90px) 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg-soft)}
.editorial-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(34px,8vw,110px)}
.editorial-grid>div:last-child{display:grid;gap:14px}.editorial-grid p:not(.tech-label){margin:0;color:var(--muted);line-height:1.76}.editorial-grid b{color:var(--text)}
.schedule-archive{padding:clamp(50px,8vw,90px) 0}
.schedule-head{display:flex;align-items:end;justify-content:space-between;gap:28px}.schedule-head>div{max-width:700px}.schedule-head p:not(.tech-label){margin:12px 0 0;color:var(--muted)}
.schedule-details{margin-top:24px;border:1px solid var(--line);border-radius:18px;background:var(--surface-solid);overflow:hidden}
.schedule-details>summary{min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 18px;cursor:pointer;list-style:none}.schedule-details>summary::-webkit-details-marker,.schedule-day>summary::-webkit-details-marker{display:none}
.schedule-details>summary span{font-weight:740}.schedule-details>summary small{color:var(--muted);font-family:var(--tech);font-size:.65rem}
.schedule-days{display:grid;gap:7px;padding:0 14px 16px}.schedule-day{border:1px solid var(--line);border-radius:11px}
.schedule-day>summary{min-height:54px;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:0 13px;cursor:pointer;list-style:none}.schedule-day>summary time{font-size:.82rem;font-weight:700}.schedule-day>summary span{color:var(--muted);font-size:.68rem}
.schedule-blocks{padding:0 13px 10px}.schedule-blocks>div{display:grid;grid-template-columns:100px 1fr;gap:12px;padding:10px 0;border-top:1px solid var(--line)}.schedule-blocks time{color:var(--accent);font-family:var(--tech);font-size:.66rem}.schedule-blocks p{display:flex;flex-direction:column;gap:3px;margin:0}.schedule-blocks strong{font-size:.8rem}.schedule-blocks span{color:var(--muted);font-size:.68rem}
.schedule-details footer{padding:12px 16px;border-top:1px solid var(--line);color:var(--muted);font-size:.68rem}
@media(max-width:900px){.index-hero-grid,.directory-head,.editorial-grid{grid-template-columns:1fr}.index-stats{max-width:620px}}
@media(max-width:720px){.index-hero{padding:62px 0 38px}.index-hero h1{font-size:clamp(2.6rem,12vw,4.2rem)}.hero-actions{display:grid}.primary,.secondary{width:100%;min-height:48px}.lesson-grid{grid-template-columns:1fr}.lesson-card{min-height:220px;padding:19px}.schedule-head{display:grid}.schedule-head .secondary{width:auto;justify-self:start}.schedule-details>summary{align-items:flex-start;flex-direction:column;justify-content:center;padding:13px 16px}.schedule-blocks>div{grid-template-columns:82px 1fr}}
</style>
