<template>
  <div v-if="lesson" class="page-view ogg-lesson-view">
    <header class="lesson-hero">
      <div class="container lesson-hero-inner">
        <RouterLink class="lesson-back" to="/ogg">← ÖGG derslerine dön</RouterLink>
        <div class="lesson-kicker">
          <span>{{ lesson.no }}</span>
          <span>{{ lesson.tag }}</span>
          <span>Tam sürüm</span>
        </div>
        <h1>{{ lesson.title }}</h1>
        <p>
          Silahlı özel güvenlik temel eğitimi konularının ders ve konu hiyerarşisine göre
          düzenlenmiş kapsamlı çalışma sürümüdür.
        </p>
        <div class="lesson-meta">
          <span>{{ lesson.categories.length }} ana konu</span>
          <span v-if="lesson.imageCount">{{ lesson.imageCount }} kaynak görsel</span>
          <span>Son kaynak düzenlemesi: {{ formatDate(lesson.updatedAt) }}</span>
        </div>
      </div>
    </header>

    <nav class="lesson-mobile-nav" aria-label="Ders konuları">
      <div class="container">
        <div>
          <a v-for="(category,index) in lesson.categories" :key="category.id" :href="`#${category.id}`">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ category.title }}
          </a>
        </div>
      </div>
    </nav>

    <div class="container lesson-layout">
      <aside class="lesson-toc">
        <p class="tech-label">İÇİNDEKİLER // {{ lesson.categories.length }}</p>
        <ol>
          <li v-for="(category,index) in lesson.categories" :key="`toc-${category.id}`">
            <a :href="`#${category.id}`">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              {{ category.title }}
            </a>
          </li>
        </ol>

        <div class="lesson-author-card">
          <p class="tech-label">HAZIRLAYAN</p>
          <strong>Ersen Filiz</strong>
          <small>@saygiylasunar</small>
          <p>ÖGG çalışma arşivinin derlenmesi, düzenlenmesi ve web uygulaması.</p>
          <nav aria-label="Hazırlayan bağlantıları">
            <a href="https://saygiylasunar.com" target="_blank" rel="noopener noreferrer">Website ↗</a>
            <a href="https://github.com/saygiylasunar" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://x.com/saygiylasunar" target="_blank" rel="noopener noreferrer">X ↗</a>
            <a href="https://instagram.com/saygiylasunar" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          </nav>
          <div class="related-work">
            <span>İLGİLİ ÇALIŞMA</span>
            <a href="https://yavuzozelguvenlik.netlify.app" target="_blank" rel="noopener noreferrer">Yavuz ÖGG web görünümü ↗</a>
            <small>Kurs programı ve kurum bilgileri</small>
          </div>
        </div>
      </aside>

      <main class="lesson-article">
        <section v-if="lesson.introHtml" class="lesson-intro">
          <p class="tech-label">DERS GİRİŞİ</p>
          <div class="prose" v-html="lesson.introHtml"></div>
        </section>

        <section
          v-for="(category,index) in lesson.categories"
          :id="category.id"
          :key="category.id"
          class="lesson-category"
        >
          <header>
            <span>{{ lesson.no }}.{{ String(index + 1).padStart(2, '0') }}</span>
            <h2>{{ category.title }}</h2>
          </header>
          <div class="prose" v-html="category.html"></div>

          <div v-if="category.examNotes?.length" class="exam-note-stack">
            <article v-for="(note,noteIndex) in category.examNotes" :key="`${category.id}-exam-${noteIndex}`" class="exam-note">
              <p class="tech-label">{{ note.label }}</p>
              <blockquote>{{ note.wording }}</blockquote>
              <div class="exam-note-academic">
                <strong>Güncel / akademik karşılığı</strong>
                <p>{{ note.academic }}</p>
              </div>
            </article>
          </div>

          <a class="category-top" href="#top">↑ Ders başına dön</a>
        </section>

        <section v-if="lesson.references?.length" class="lesson-references" aria-labelledby="official-sources-title">
          <p class="tech-label">DOĞRULAMA // RESMÎ KAYNAKLAR</p>
          <h2 id="official-sources-title">Resmî doğrulama kaynakları</h2>
          <div>
            <a
              v-for="reference in lesson.references"
              :key="reference.href"
              :href="reference.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ reference.label }}</span><b aria-hidden="true">↗</b>
            </a>
          </div>
        </section>

        <aside class="lesson-source-note">
          <p class="tech-label">KULLANIM NOTU</p>
          <p>
            Bu çalışma arşivi sınav hazırlığı için düzenlenmiştir. Sınavda kullanılan ders terminolojisi
            korunurken, güncel veya teknik açıklamalar ayrı notlar hâlinde gösterilir.
            Mevzuata bağlı uygulamalarda yürürlükteki resmî kaynaklar esas alınmalıdır.
          </p>
        </aside>

        <aside class="lesson-author-card lesson-author-mobile">
          <p class="tech-label">HAZIRLAYAN</p>
          <strong>Ersen Filiz · @saygiylasunar</strong>
          <p>ÖGG çalışma arşivinin derlenmesi, düzenlenmesi ve web uygulaması.</p>
          <nav aria-label="Hazırlayan bağlantıları">
            <a href="https://saygiylasunar.com" target="_blank" rel="noopener noreferrer">Website ↗</a>
            <a href="https://github.com/saygiylasunar" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://x.com/saygiylasunar" target="_blank" rel="noopener noreferrer">X ↗</a>
            <a href="https://instagram.com/saygiylasunar" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://yavuzozelguvenlik.netlify.app" target="_blank" rel="noopener noreferrer">Yavuz ÖGG ↗</a>
          </nav>
        </aside>
      </main>
    </div>
  </div>

  <div v-else class="page-view">
    <div class="container lesson-missing">
      <p>Ders bulunamadı.</p>
      <RouterLink to="/ogg">ÖGG dizinine dön</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { oggLessons } from '../content/oggLessonsFull.js'

const route=useRoute()
const lesson=computed(()=>oggLessons.find(item=>item.slug===route.params.slug))

function formatDate(value){
  if(!value) return '—'
  const date=new Date(value)
  return new Intl.DateTimeFormat('tr-TR',{day:'numeric',month:'long',year:'numeric'}).format(date)
}
</script>

<style scoped>
.ogg-lesson-view {
  --tech: "EFSS", "Saygiyla Sunar", ui-monospace, "Cascadia Code", "SFMono-Regular", Menlo, monospace;
  --accent: #278c91;
  padding-bottom: 88px;
}
.lesson-hero { padding: clamp(72px,9vw,120px) 0 46px; border-bottom: 1px solid var(--line); }
.lesson-hero-inner { max-width: 980px; }
.lesson-back { display:inline-flex; margin-bottom:32px; color:var(--muted); font-size:.78rem; text-decoration:none; }
.lesson-kicker { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.lesson-kicker span { padding:5px 8px; border:1px solid var(--line); border-radius:999px; color:var(--accent); font-family:var(--tech); font-size:.63rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase; }
.lesson-hero h1 { max-width:900px; margin:0; font-size:clamp(2.8rem,7vw,6.4rem); letter-spacing:-.07em; line-height:.96; }
.lesson-hero p { max-width:760px; margin:20px 0 0; color:var(--muted); font-size:clamp(1rem,1.5vw,1.16rem); line-height:1.72; }
.lesson-meta { display:flex; flex-wrap:wrap; gap:8px 18px; margin-top:24px; color:var(--muted); font-family:var(--tech); font-size:.68rem; }
.lesson-mobile-nav { position:sticky; z-index:8; top:0; border-bottom:1px solid var(--line); background:color-mix(in srgb,var(--bg) 92%,transparent); backdrop-filter:blur(16px); }
.lesson-mobile-nav .container>div { display:flex; gap:8px; overflow-x:auto; padding:10px 0; scrollbar-width:thin; }
.lesson-mobile-nav a { min-height:40px; display:inline-flex; flex:0 0 auto; align-items:center; gap:7px; max-width:260px; padding:0 12px; border:1px solid var(--line); border-radius:999px; background:var(--surface-solid); color:var(--text); font-size:.75rem; text-decoration:none; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.lesson-mobile-nav a span { color:var(--accent); font-family:var(--tech); font-size:.62rem; font-weight:800; }
.lesson-layout { display:grid; grid-template-columns:250px minmax(0,780px); gap:clamp(40px,7vw,92px); justify-content:center; align-items:start; padding-top:clamp(42px,7vw,80px); }
.lesson-toc { position:sticky; top:84px; max-height:calc(100vh - 110px); overflow:auto; padding:18px; border:1px solid var(--line); border-radius:17px; background:var(--surface-solid); }
.tech-label { margin:0; color:var(--accent); font-family:var(--tech); font-size:.66rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
.lesson-toc ol { display:grid; gap:2px; margin:13px 0 0; padding:0; list-style:none; }
.lesson-toc a { display:grid; grid-template-columns:24px 1fr; gap:7px; padding:7px 4px; border-radius:8px; color:var(--text); font-size:.73rem; line-height:1.35; text-decoration:none; }
.lesson-toc a:hover { background:color-mix(in srgb,var(--accent) 10%,transparent); }
.lesson-toc a span { color:var(--accent); font-family:var(--tech); font-size:.61rem; }
.lesson-author-card{margin-top:18px;padding-top:18px;border-top:1px solid var(--line)}
.lesson-author-card>strong{display:block;margin-top:9px;font-size:.88rem}
.lesson-author-card>small{display:block;margin-top:2px;color:var(--muted);font-family:var(--tech);font-size:.64rem}
.lesson-author-card>p:not(.tech-label){margin:9px 0 0;color:var(--muted);font-size:.69rem;line-height:1.52}
.lesson-author-card nav{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px}
.lesson-author-card nav a{display:flex;min-height:32px;align-items:center;padding:0 8px;border:1px solid var(--line);border-radius:8px;color:var(--text);font-family:var(--tech);font-size:.61rem;text-decoration:none}
.lesson-author-card nav a:hover{border-color:var(--accent)}
.related-work{margin-top:14px;padding-top:13px;border-top:1px solid var(--line)}
.related-work>span{display:block;color:var(--accent);font-family:var(--tech);font-size:.56rem;font-weight:800;letter-spacing:.08em}
.related-work>a{display:block;margin-top:6px;color:var(--text);font-size:.68rem;font-weight:700;text-decoration:none}
.related-work>small{display:block;margin-top:3px;color:var(--muted);font-size:.59rem;line-height:1.4}
.lesson-author-mobile{display:none;padding:20px;border:1px solid var(--line);border-radius:16px;background:var(--surface-solid)}
.lesson-author-mobile nav{grid-template-columns:repeat(2,minmax(0,1fr))}
.lesson-article { min-width:0; }
.lesson-intro { margin-bottom:54px; padding:22px; border:1px solid var(--line); border-radius:18px; background:var(--surface-solid); }
.lesson-category { scroll-margin-top:84px; padding:0 0 clamp(56px,8vw,86px); }
.lesson-category>header { display:grid; grid-template-columns:58px 1fr; gap:16px; align-items:start; padding-bottom:20px; border-bottom:1px solid var(--line); }
.lesson-category>header>span { width:52px; height:42px; display:grid; place-items:center; border-radius:10px; background:color-mix(in srgb,var(--accent) 10%,transparent); color:var(--accent); font-family:var(--tech); font-size:.68rem; font-weight:800; }
.lesson-category h2 { margin:0; font-size:clamp(1.65rem,4vw,2.7rem); letter-spacing:-.045em; line-height:1.08; }
.prose { padding-top:24px; font-size:1rem; line-height:1.78; }
.prose :deep(p) { margin:0 0 17px; }
.prose :deep(h3), .prose :deep(h4), .prose :deep(h5), .prose :deep(h6) { margin:32px 0 12px; line-height:1.18; letter-spacing:-.025em; }
.prose :deep(h3) { font-size:1.45rem; }
.prose :deep(h4) { font-size:1.18rem; }
.prose :deep(h5), .prose :deep(h6) { font-size:1rem; }
.prose :deep(ul), .prose :deep(ol) { display:grid; gap:8px; margin:0 0 20px; padding-left:1.25rem; }
.prose :deep(li) { padding-left:3px; }
.prose :deep(li::marker) { color:var(--accent); }
.prose :deep(blockquote) { margin:18px 0; padding:12px 15px; border-left:3px solid var(--accent); background:color-mix(in srgb,var(--accent) 7%,transparent); }
.prose :deep(code) { font-family:var(--tech); font-size:.87em; }
.prose :deep(hr) { margin:28px 0; border:0; border-top:1px solid var(--line); }
.prose :deep(.ogg-data-table) { overflow-x:auto; margin:20px 0; border:1px solid var(--line); border-radius:12px; }
.prose :deep(table) { width:100%; border-collapse:collapse; min-width:520px; font-size:.82rem; }
.prose :deep(th), .prose :deep(td) { padding:10px 12px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; }
.prose :deep(th) { background:var(--bg-soft); font-family:var(--tech); font-size:.7rem; }
.prose :deep(.editorial-warning) { margin:20px 0; padding:14px 16px; border-left:3px solid #b78638; border-radius:0 10px 10px 0; background:color-mix(in srgb,#b78638 8%,transparent); }
.prose :deep(.study-figure) { margin:22px 0; padding:16px; overflow:hidden; border:1px solid var(--line); border-radius:14px; background:var(--bg-soft); }
.prose :deep(.study-figure>b) { display:block; margin-bottom:12px; color:var(--accent); font-family:var(--tech); font-size:.66rem; letter-spacing:.08em; }
.prose :deep(.study-flow) { display:flex; align-items:center; gap:8px; overflow-x:auto; padding-bottom:3px; scrollbar-width:thin; }
.prose :deep(.study-flow span) { min-height:42px; display:flex; align-items:center; flex:0 0 auto; max-width:190px; padding:7px 11px; border:1px solid var(--line); border-radius:10px; background:var(--surface-solid); font-size:.76rem; line-height:1.3; }
.prose :deep(.study-flow i) { color:var(--accent); font-style:normal; font-weight:800; }
.prose :deep(.concept-grid) { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
.prose :deep(.concept-grid>div) { padding:12px; border:1px solid var(--line); border-radius:10px; background:var(--surface-solid); }
.prose :deep(.concept-grid strong) { display:block; margin-bottom:4px; color:var(--accent); font-family:var(--tech); font-size:.72rem; }
.prose :deep(.concept-grid small) { color:var(--muted); font-size:.72rem; line-height:1.45; }
.prose :deep(.ring-figure) { position:relative; width:min(320px,82vw); aspect-ratio:1; margin:10px auto 0; }
.prose :deep(.ring-figure .ring) { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); display:grid; place-items:start center; padding-top:11px; border:1px solid var(--line-strong); border-radius:50%; font-family:var(--tech); font-size:.62rem; font-weight:800; }
.prose :deep(.ring-figure .outer) { width:100%; height:100%; background:color-mix(in srgb,var(--accent) 4%,transparent); }
.prose :deep(.ring-figure .middle) { width:68%; height:68%; background:var(--bg-soft); }
.prose :deep(.ring-figure .inner) { width:38%; height:38%; background:var(--surface-solid); }
.prose :deep(.ring-figure .vip) { position:absolute; inset:50% auto auto 50%; transform:translate(-50%,-50%); z-index:3; padding:7px 9px; border-radius:999px; background:var(--text); color:var(--bg); font-family:var(--tech); font-size:.62rem; font-weight:800; }
.prose :deep(.vehicle-figure) { display:grid; grid-template-columns:1fr 1.2fr 1fr; gap:8px; align-items:stretch; }
.prose :deep(.vehicle-figure>div) { min-height:72px; display:grid; place-items:center; padding:10px; border:1px solid var(--line); border-radius:12px; background:var(--surface-solid); text-align:center; font-size:.72rem; line-height:1.4; }
.prose :deep(.vehicle-figure .main) { border-color:var(--accent); }
.prose :deep(.visual-caption) { margin:12px 0 0; color:var(--muted); font-size:.7rem; line-height:1.5; }
@media(max-width:520px){ .prose :deep(.concept-grid){grid-template-columns:1fr}.prose :deep(.vehicle-figure){grid-template-columns:1fr}.prose :deep(.study-flow){padding-bottom:8px} }\n.prose :deep(.ogg-image-transcript) { display:grid; gap:4px; margin:20px 0; padding:14px; border:1px dashed var(--line-strong); border-radius:12px; background:var(--bg-soft); }
.prose :deep(.ogg-image-transcript b) { color:var(--accent); font-family:var(--tech); font-size:.72rem; }
.prose :deep(.ogg-image-transcript span) { color:var(--muted); font-size:.76rem; }
.exam-note-stack { display:grid; gap:12px; margin:22px 0 0; }
.exam-note { padding:16px; border:1px solid color-mix(in srgb,#b78638 48%,var(--line)); border-radius:14px; background:color-mix(in srgb,#b78638 7%,var(--surface-solid)); }
.exam-note blockquote { margin:10px 0 0; padding:12px 14px; border-left:3px solid #b78638; background:color-mix(in srgb,#b78638 6%,transparent); font-weight:720; line-height:1.55; }
.exam-note-academic { margin-top:12px; padding-top:12px; border-top:1px solid color-mix(in srgb,#b78638 24%,var(--line)); }
.exam-note-academic strong { display:block; margin-bottom:5px; color:var(--muted); font-family:var(--tech); font-size:.64rem; letter-spacing:.06em; text-transform:uppercase; }
.exam-note-academic p { margin:0; color:var(--muted); font-size:.82rem; line-height:1.62; }
.category-top { display:inline-flex; margin-top:18px; color:var(--muted); font-size:.7rem; text-decoration:none; }
.lesson-references { margin-bottom:18px; padding:22px; border:1px solid var(--line); border-radius:16px; background:var(--surface-solid); }
.lesson-references h2 { margin:8px 0 16px; font-size:1.35rem; letter-spacing:-.03em; }
.lesson-references>div { display:grid; gap:8px; }
.lesson-references a { min-height:46px; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:0 12px; border:1px solid var(--line); border-radius:10px; color:var(--text); font-size:.78rem; text-decoration:none; }
.lesson-references a:hover { border-color:var(--accent); }
.lesson-references b { color:var(--accent); }
.lesson-source-note { padding:22px; border:1px solid var(--line); border-radius:16px; background:var(--surface-solid); }
.lesson-source-note p:not(.tech-label) { margin:12px 0; color:var(--muted); font-size:.84rem; line-height:1.65; }
.lesson-source-note a { color:var(--text); font-size:.78rem; }
.lesson-missing { padding:120px 0; }
@media(max-width:900px){ .lesson-layout{grid-template-columns:1fr}.lesson-toc{display:none}.lesson-author-mobile{display:block;margin-top:18px} }
@media(max-width:720px){
  .lesson-hero{padding:62px 0 34px}
  .lesson-back{margin-bottom:22px}
  .lesson-hero h1{font-size:clamp(2.45rem,12vw,4rem)}
  .lesson-layout{padding-top:34px}
  .lesson-category{padding-bottom:62px}
  .lesson-category>header{grid-template-columns:1fr; gap:10px}
  .lesson-category>header>span{width:48px;height:36px}
  .prose{font-size:.96rem;line-height:1.74}
  .prose :deep(h3){font-size:1.32rem}
  .prose :deep(h4){font-size:1.12rem}
}
</style>
