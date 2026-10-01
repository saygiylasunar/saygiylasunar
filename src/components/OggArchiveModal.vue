<template>
  <Teleport to="body">
    <Transition name="ogg-modal">
      <div v-if="modelValue" class="ogg-about-backdrop" @click.self="close">
        <section class="ogg-about-modal" role="dialog" aria-modal="true" aria-labelledby="ogg-about-title">
          <button class="ogg-about-close" type="button" aria-label="Kapat" @click="close">×</button>

          <p class="ogg-about-kicker">ÖGG // KÜNYE & KAYNAK</p>
          <h2 id="ogg-about-title">Bu arşiv hakkında</h2>
          <p class="ogg-about-lead">
            Silahlı özel güvenlik temel eğitiminde işlenen derslerin; ders notları,
            eğitim materyalleri ve ilgili resmî kaynaklarla birlikte düzenlenmiş çalışma arşividir.
          </p>

          <div class="ogg-about-grid">
            <article>
              <small>HAZIRLAYAN</small>
              <strong>Ersen Filiz · saygiylasunar</strong>
              <p>Notların derlenmesi, konu yapısının düzenlenmesi ve web uygulaması.</p>
            </article>

            <article>
              <small>EĞİTİM KURUMU</small>
              <strong>Yavuz Özel Güvenlik Hizmetleri</strong>
              <p>Akşehir / Konya · Silahlı Özel Güvenlik Temel Eğitimi</p>
            </article>
          </div>

          <details class="ogg-about-details">
            <summary>Eğitim kadrosu</summary>
            <div class="ogg-instructors">
              <p><strong>Dede Yaşar</strong><span>Özel Güvenlik Hukuku · Kalabalık Yönetimi · Genel Kolluk İlişkileri</span></p>
              <p><strong>Levent Yıldız</strong><span>Güvenlik Tedbirleri · Silah Bilgisi ve Atış · Kişi Koruma</span></p>
              <p><strong>Ömer Evran</strong><span>Temel İlk Yardım</span></p>
              <p><strong>Fatih Özkan</strong><span>Güvenlik Sistem ve Cihazları</span></p>
              <p><strong>Kadri Kutlukız</strong><span>Uyuşturucu Madde Bilgileri</span></p>
              <p><strong>M.T. Şakir Büyükkoşucu</strong><span>Yangın Güvenliği ve Tabii Afet</span></p>
              <p><strong>Fatime Şule Doğancı</strong><span>Etkili İletişim</span></p>
            </div>
          </details>

          <div class="ogg-about-sources">
            <small>KAYNAKLAR</small>
            <p>Ders anlatımları · Eğitim materyalleri · Ders sırasında tutulan notlar · EGM / Özel Güvenlik Denetleme Başkanlığı kaynakları · İlgili mevzuat</p>
          </div>

          <p class="ogg-about-disclaimer">
            Bu çalışma bağımsız bir öğrenci çalışma arşividir; eğitim kurumunun,
            eğitmenlerin veya herhangi bir kamu kurumunun resmî yayını değildir.
          </p>

          <div class="ogg-about-actions">
            <button type="button" class="primary" @click="close">Arşive geç</button>
            <a href="https://yavuzozelguvenlik.netlify.app" target="_blank" rel="noopener noreferrer">
              Yavuz ÖGG web görünümü ↗
            </a>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

defineProps({
  modelValue: { type: Boolean, default: false },
})

const emit=defineEmits(['update:modelValue'])

function close(){ emit('update:modelValue',false) }
function onKeydown(event){ if(event.key==='Escape') close() }

onMounted(()=>window.addEventListener('keydown',onKeydown))
onBeforeUnmount(()=>window.removeEventListener('keydown',onKeydown))
</script>

<style scoped>
.ogg-about-backdrop{
  position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:18px;
  background:color-mix(in srgb,#05080a 72%,transparent);backdrop-filter:blur(12px)
}
.ogg-about-modal{
  --tech:"EFSS","Saygiyla Sunar",ui-monospace,"Cascadia Code","SFMono-Regular",Menlo,monospace;
  --accent:#278c91;position:relative;width:min(720px,100%);max-height:min(850px,calc(100vh - 36px));
  overflow:auto;padding:clamp(24px,5vw,42px);border:1px solid var(--line-strong);border-radius:22px;
  background:var(--surface-solid);box-shadow:0 28px 90px rgba(0,0,0,.28)
}
.ogg-about-close{
  position:absolute;top:14px;right:14px;width:36px;height:36px;border:1px solid var(--line);border-radius:50%;
  background:var(--bg-soft);color:var(--text);font-size:1.2rem;cursor:pointer
}
.ogg-about-kicker{margin:0;color:var(--accent);font-family:var(--tech);font-size:.66rem;font-weight:800;letter-spacing:.1em}
.ogg-about-modal h2{max-width:620px;margin:9px 42px 12px 0;font-size:clamp(2rem,6vw,3.5rem);letter-spacing:-.06em;line-height:1}
.ogg-about-lead{max-width:620px;margin:0;color:var(--muted);line-height:1.72}
.ogg-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:26px}
.ogg-about-grid article,.ogg-about-sources{padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--bg-soft)}
.ogg-about-grid small,.ogg-about-sources small{display:block;margin-bottom:7px;color:var(--accent);font-family:var(--tech);font-size:.61rem;font-weight:800;letter-spacing:.08em}
.ogg-about-grid strong{display:block;font-size:.92rem;line-height:1.35}
.ogg-about-grid p,.ogg-about-sources p{margin:7px 0 0;color:var(--muted);font-size:.76rem;line-height:1.58}
.ogg-about-details{margin-top:10px;border:1px solid var(--line);border-radius:14px;background:var(--surface-solid)}
.ogg-about-details summary{padding:14px 16px;cursor:pointer;font-size:.8rem;font-weight:760}
.ogg-instructors{display:grid;gap:0;padding:0 16px 14px}
.ogg-instructors p{display:grid;grid-template-columns:minmax(140px,.7fr) minmax(0,1.3fr);gap:14px;margin:0;padding:9px 0;border-top:1px solid var(--line)}
.ogg-instructors strong{font-size:.72rem}.ogg-instructors span{color:var(--muted);font-size:.7rem;line-height:1.45}
.ogg-about-sources{margin-top:10px}
.ogg-about-disclaimer{margin:14px 2px 0;color:var(--muted);font-size:.7rem;line-height:1.55}
.ogg-about-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}
.ogg-about-actions button,.ogg-about-actions a{
  min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 16px;border-radius:999px;
  font:inherit;font-size:.76rem;font-weight:760;text-decoration:none;cursor:pointer
}
.ogg-about-actions .primary{border:1px solid var(--text);background:var(--text);color:var(--bg)}
.ogg-about-actions a{border:1px solid var(--line-strong);background:var(--bg-soft);color:var(--text)}
.ogg-modal-enter-active,.ogg-modal-leave-active{transition:opacity .18s ease}
.ogg-modal-enter-active .ogg-about-modal,.ogg-modal-leave-active .ogg-about-modal{transition:transform .18s ease,opacity .18s ease}
.ogg-modal-enter-from,.ogg-modal-leave-to{opacity:0}
.ogg-modal-enter-from .ogg-about-modal,.ogg-modal-leave-to .ogg-about-modal{transform:translateY(8px) scale(.99);opacity:0}
@media(max-width:620px){
  .ogg-about-grid{grid-template-columns:1fr}
  .ogg-instructors p{grid-template-columns:1fr;gap:3px}
  .ogg-about-actions{display:grid}.ogg-about-actions>*{width:100%}
}
</style>
