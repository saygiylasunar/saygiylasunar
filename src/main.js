import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/global.css'
import './styles/additions.css'
import './styles/phase2.css'
import './styles/tools.css'
import './styles/webp-bulk.css'
import './styles/lands-kiss.css'
import './styles/lands-final.css'
import './styles/lands-earth.css'

const app = createApp(App)
const revealObservers = new WeakMap()

app.directive('reveal', {
  mounted(element) {
    element.classList.add('reveal')

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      element.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.classList.add('is-visible')
        observer.disconnect()
        revealObservers.delete(element)
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    )

    revealObservers.set(element, observer)
    window.requestAnimationFrame(() => observer.observe(element))
  },
  unmounted(element) {
    revealObservers.get(element)?.disconnect()
    revealObservers.delete(element)
  },
})

app.use(router)
app.mount('#app')
