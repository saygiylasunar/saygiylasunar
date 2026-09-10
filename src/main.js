import { createApp } from 'vue'
import '@fontsource-variable/inter'
import App from './App.vue'
import router from './router/index.js'
import { installAnimationFoundation, revealOnScroll } from './lib/animation.js'
import './styles/foundation.css'
import './styles/global.css'
import './styles/additions.css'
import './styles/phase2.css'
import './styles/tools.css'
import './styles/webp-bulk.css'
import './styles/lands-kiss.css'
import './styles/lands-final.css'
import './styles/lands-earth.css'
import './styles/compact-scale.css'
import './styles/lands-fab.css'
import './styles/palette-purple.css'
import './styles/lands-density.css'
import './styles/lands-mobile.css'
import './styles/music.css'

installAnimationFoundation()

const app = createApp(App)
const revealAnimations = new WeakMap()

app.directive('reveal', {
  mounted(element) {
    const animation = revealOnScroll(element)
    if (animation) revealAnimations.set(element, animation)
  },
  unmounted(element) {
    const animation = revealAnimations.get(element)
    animation?.scrollTrigger?.kill()
    animation?.kill()
    revealAnimations.delete(element)
  },
})

app.use(router)
app.mount('#app')
